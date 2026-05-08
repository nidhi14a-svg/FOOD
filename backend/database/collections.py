"""
database/collections.py
────────────────────────
Centralised collection name registry and typed collection accessors.

Why a separate file?
  - Single source of truth for every collection name string.
  - Prevents typos scattering across repository files.
  - Makes renaming a collection a one-line change.
  - Provides optionally typed Motor Collection helpers for IDEs.
"""

from motor.motor_asyncio import AsyncIOMotorCollection, AsyncIOMotorDatabase

# ─────────────────────────────────────────────
# Collection name constants
# ─────────────────────────────────────────────
class Collections:
    """String constants for every MongoDB collection in the platform."""
    USERS         = "users"
    FOOD_LISTINGS = "food_listings"
    CLAIMS        = "claims"
    ANALYTICS     = "analytics_snapshots"
    AUDIT_LOGS    = "audit_logs"


# ─────────────────────────────────────────────
# Typed collection accessor helpers
# ─────────────────────────────────────────────
def users_col(db: AsyncIOMotorDatabase) -> AsyncIOMotorCollection:
    """Return the `users` collection from the given database instance."""
    return db[Collections.USERS]

def food_col(db: AsyncIOMotorDatabase) -> AsyncIOMotorCollection:
    """Return the `food_listings` collection from the given database instance."""
    return db[Collections.FOOD_LISTINGS]

def claims_col(db: AsyncIOMotorDatabase) -> AsyncIOMotorCollection:
    """Return the `claims` collection from the given database instance."""
    return db[Collections.CLAIMS]

def analytics_col(db: AsyncIOMotorDatabase) -> AsyncIOMotorCollection:
    """Return the `analytics_snapshots` collection from the given database instance."""
    return db[Collections.ANALYTICS]

def audit_col(db: AsyncIOMotorDatabase) -> AsyncIOMotorCollection:
    """Return the `audit_logs` collection from the given database instance."""
    return db[Collections.AUDIT_LOGS]


# ─────────────────────────────────────────────
# Index bootstrap
# ─────────────────────────────────────────────
async def ensure_indexes(db: AsyncIOMotorDatabase) -> None:
    """
    Create all required MongoDB indexes on startup.
    This is idempotent — safe to run every time the server boots.

    Call this from the FastAPI lifespan after connect_db().
    """
    from pymongo import ASCENDING, DESCENDING, GEOSPHERE

    # users — enforce unique email
    await users_col(db).create_index(
        [("email", ASCENDING)],
        unique=True,
        name="idx_users_email_unique",
    )

    # food_listings — fast status + created_at queries
    await food_col(db).create_index(
        [("status", ASCENDING), ("created_at", DESCENDING)],
        name="idx_food_status_created",
    )
    # food_listings — filter by provider
    await food_col(db).create_index(
        [("provider_id", ASCENDING)],
        name="idx_food_provider",
    )

    # claims — filter by NGO
    await claims_col(db).create_index(
        [("ngo_id", ASCENDING), ("created_at", DESCENDING)],
        name="idx_claims_ngo_created",
    )
    # claims — one claim per listing
    await claims_col(db).create_index(
        [("listing_id", ASCENDING)],
        unique=True,
        name="idx_claims_listing_unique",
    )

    import logging
    logging.getLogger("foodies.database").info("✅  MongoDB indexes ensured.")
