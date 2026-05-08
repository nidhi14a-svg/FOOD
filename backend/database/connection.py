"""
database/connection.py
───────────────────────
Async MongoDB connection management using Motor.

Responsibilities:
  - Boot the AsyncIOMotorClient on application startup.
  - Gracefully close the connection pool on shutdown.
  - Expose a FastAPI dependency `get_db()` for injection into route handlers.
  - Expose `get_collection()` for raw collection access from non-route code.
"""

import logging
from typing import AsyncGenerator

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
from pymongo.errors import ConnectionFailure, ConfigurationError

from backend.core.config import settings

logger = logging.getLogger("foodies.database")

# ─────────────────────────────────────────────
# Singleton state — intentionally module-level
# ─────────────────────────────────────────────
class _MongoDB:
    """Internal holder for the Motor client and active database reference."""
    client: AsyncIOMotorClient = None
    db: AsyncIOMotorDatabase = None

_mongo = _MongoDB()


# ─────────────────────────────────────────────
# Lifecycle helpers (called from main.py lifespan)
# ─────────────────────────────────────────────
async def connect_db() -> None:
    """
    Open the Motor connection pool and verify connectivity.
    Called once during FastAPI application startup.

    Raises:
        ConnectionFailure  – if MongoDB is unreachable.
        ConfigurationError – if the URI is malformed.
    """
    try:
        _mongo.client = AsyncIOMotorClient(
            settings.MONGO_URI,
            serverSelectionTimeoutMS=5_000,   # fail fast if Mongo is down
            maxPoolSize=50,
            minPoolSize=5,
        )
        _mongo.db = _mongo.client[settings.DATABASE_NAME]

        # Verify the connection is alive
        await _mongo.client.admin.command("ping")
        logger.info("✅  MongoDB connected  →  db='%s'  uri='%s'", settings.DATABASE_NAME, _masked_uri())
    except (ConnectionFailure, ConfigurationError) as exc:
        logger.critical("❌  MongoDB connection failed: %s", exc)
        raise


async def close_db() -> None:
    """
    Close the Motor connection pool.
    Called once during FastAPI application shutdown.
    """
    if _mongo.client is not None:
        _mongo.client.close()
        _mongo.client = None
        _mongo.db = None
        logger.info("🔌  MongoDB connection closed.")


# ─────────────────────────────────────────────
# FastAPI dependency
# ─────────────────────────────────────────────
async def get_db() -> AsyncGenerator[AsyncIOMotorDatabase, None]:
    """
    FastAPI dependency that yields the active MongoDB database instance.

    Usage in a route:
        async def my_route(db: AsyncIOMotorDatabase = Depends(get_db)):
            ...
    """
    if _mongo.db is None:
        raise RuntimeError(
            "Database is not initialised. Ensure connect_db() is called during app startup."
        )
    yield _mongo.db


# ─────────────────────────────────────────────
# Utility for non-dependency access
# ─────────────────────────────────────────────
def get_collection(name: str):
    """
    Return a raw Motor collection by name.
    For use inside repository classes or background tasks where
    FastAPI dependency injection is not available.
    """
    if _mongo.db is None:
        raise RuntimeError("Database not initialised.")
    return _mongo.db[name]


# ─────────────────────────────────────────────
# Internal helper
# ─────────────────────────────────────────────
def _masked_uri() -> str:
    """Return the MongoDB URI with the password replaced by ***."""
    uri = settings.MONGO_URI
    try:
        if "@" in uri:
            proto, rest = uri.split("//", 1)
            creds, host = rest.split("@", 1)
            user = creds.split(":")[0]
            return f"{proto}//{user}:***@{host}"
    except Exception:
        pass
    return uri
