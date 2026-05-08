"""
middleware/auth.py
──────────────────
JWT Authentication Middleware & Role-Based Access Control (RBAC).

Provides:
  - get_current_user   : Validates the Bearer token and returns the live user doc.
  - require_role()     : Role-based guard factory (admin | provider | ngo).
  - require_admin      : Shortcut dependency – admin only.
  - require_provider   : Shortcut dependency – provider only.
  - require_ngo        : Shortcut dependency – ngo only.
  - require_admin_or_provider : Multi-role shortcut.
"""

from typing import List
from fastapi import Depends, HTTPException, Request, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError
from motor.motor_asyncio import AsyncIOMotorDatabase

from backend.core.config import settings
from backend.core.security import decode_token
from backend.database.connection import get_db
from backend.repositories.user_repo import user_repo

# ─────────────────────────────────────────────
# OAuth2 Bearer scheme (points Swagger UI to our login endpoint)
# ─────────────────────────────────────────────
oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/token",
    description="Paste the JWT token obtained from **/auth/login**.",
)

# ─────────────────────────────────────────────
# Core: token → user document
# ─────────────────────────────────────────────
async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncIOMotorDatabase = Depends(get_db),
) -> dict:
    """
    FastAPI dependency that:
    1. Extracts the Bearer token from the Authorization header.
    2. Decodes and validates the JWT signature and expiry.
    3. Fetches the live user record from MongoDB.
    4. Ensures the account is active.

    Returns the full user document dict.
    """
    unauthorized = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials. Token may be expired or invalid.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = decode_token(token)
        user_id: str = payload.get("sub")
        token_type: str = payload.get("type")
        if not user_id or token_type != "access":
            raise unauthorized
    except JWTError:
        raise unauthorized

    user = await user_repo.get_by_id(db, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Authenticated user record no longer exists.",
        )
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This account has been deactivated.",
        )
    return user

# ─────────────────────────────────────────────
# RBAC: role guard factory
# ─────────────────────────────────────────────
def require_role(*allowed_roles: str):
    """
    Dependency factory for Role-Based Access Control.

    Usage:
        @router.get("/admin-only", dependencies=[Depends(require_role("admin"))])

        # Or inline to access the user object:
        @router.post("/food")
        async def create_food(user = Depends(require_role("admin", "provider"))):
            ...

    Raises 403 if the authenticated user's role is not in *allowed_roles*.
    """
    async def _guard(current_user: dict = Depends(get_current_user)) -> dict:
        if current_user.get("role") not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access denied. Required role(s): {list(allowed_roles)}. "
                       f"Your role: {current_user.get('role')}.",
            )
        return current_user
    return _guard

# ─────────────────────────────────────────────
# Shortcut dependency instances
# ─────────────────────────────────────────────
require_admin             = require_role("admin")
require_provider          = require_role("provider")
require_ngo               = require_role("ngo")
require_admin_or_provider = require_role("admin", "provider")
require_admin_or_ngo      = require_role("admin", "ngo")
require_any_role          = require_role("admin", "provider", "ngo")

# ─────────────────────────────────────────────
# Optional: Starlette middleware for request-level logging
# ─────────────────────────────────────────────
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request as StarletteRequest
from starlette.responses import Response
import time
import logging

logger = logging.getLogger("foodies.auth")

class JWTLoggingMiddleware(BaseHTTPMiddleware):
    """
    Lightweight middleware that logs every request's method, path,
    status code, and processing duration. Useful for audit trails.
    """

    async def dispatch(self, request: StarletteRequest, call_next) -> Response:
        start = time.perf_counter()
        response = await call_next(request)
        duration_ms = (time.perf_counter() - start) * 1000

        logger.info(
            "%s %s → %s  (%.1f ms)",
            request.method,
            request.url.path,
            response.status_code,
            duration_ms,
        )
        return response
