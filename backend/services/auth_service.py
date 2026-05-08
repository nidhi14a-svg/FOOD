"""
services/auth_service.py
─────────────────────────
Authentication & Identity business logic.

Responsibilities:
  - Provider and NGO registration with duplicate-email guard
  - Admin account bootstrapping
  - Login credential validation
  - JWT token issuance
  - Account status enforcement

What this service does NOT do:
  - Handle HTTP requests or responses (no FastAPI imports)
  - Interact with MongoDB directly (delegates to user_repo)
  - Define routes or middleware
"""

from datetime import timedelta
from typing import Optional

from motor.motor_asyncio import AsyncIOMotorDatabase

from backend.core.config import settings
from backend.core.security import verify_password, get_password_hash, create_access_token
from backend.repositories.user_repo import user_repo
from backend.schemas.auth import (
    LoginRequest,
    RegisterProviderRequest,
    RegisterNGORequest,
    AuthResponse,
)
from backend.services.exceptions import (
    DuplicateEmailError,
    InvalidCredentialsError,
    AccountDeactivatedError,
)


class AuthService:
    """
    Handles all authentication and identity business logic.
    Stateless — every method receives `db` as an argument.
    """

    # ── Registration ─────────────────────────────────────────────
    async def register_provider(
        self,
        db: AsyncIOMotorDatabase,
        request: RegisterProviderRequest,
    ) -> AuthResponse:
        """
        Register a new Food Provider (Restaurant or Hostel).

        Raises:
            DuplicateEmailError: if the email is already in use.
        """
        await self._guard_unique_email(db, request.email)

        doc = {
            "email":           request.email,
            "hashed_password": get_password_hash(request.password),
            "full_name":       request.business_name,
            "role":            "provider",
            "provider_type":   request.provider_type,
            "address":         request.address,
            "is_active":       True,
            "is_verified":     False,
        }
        created = await user_repo.create(db, doc)
        return self._make_token_response(created)

    async def register_ngo(
        self,
        db: AsyncIOMotorDatabase,
        request: RegisterNGORequest,
    ) -> AuthResponse:
        """
        Register a new NGO.

        Raises:
            DuplicateEmailError: if the email is already in use.
        """
        await self._guard_unique_email(db, request.email)

        doc = {
            "email":               request.email,
            "hashed_password":     get_password_hash(request.password),
            "full_name":           request.ngo_name,
            "role":                "ngo",
            "ngo_name":            request.ngo_name,
            "registration_number": request.registration_number,
            "service_radius_km":   request.service_radius_km,
            "is_active":           True,
            "is_verified":         False,
        }
        created = await user_repo.create(db, doc)
        return self._make_token_response(created)

    async def register_volunteer(
        self,
        db: AsyncIOMotorDatabase,
        email: str,
        password: str,
        full_name: str,
    ) -> AuthResponse:
        """
        Register a new Volunteer.

        Raises:
            DuplicateEmailError: if the email is already in use.
        """
        await self._guard_unique_email(db, email)

        doc = {
            "email":           email,
            "hashed_password": get_password_hash(password),
            "full_name":       full_name,
            "role":            "volunteer",
            "is_active":       True,
            "is_verified":     False,
        }
        created = await user_repo.create(db, doc)
        return self._make_token_response(created)

    async def register_admin(
        self,
        db: AsyncIOMotorDatabase,
        email: str,
        password: str,
        full_name: str,
    ) -> AuthResponse:
        """
        Internal admin account bootstrapping.
        Not exposed via a public API endpoint.

        Raises:
            DuplicateEmailError: if the email is already in use.
        """
        await self._guard_unique_email(db, email)

        doc = {
            "email":           email,
            "hashed_password": get_password_hash(password),
            "full_name":       full_name,
            "role":            "admin",
            "is_active":       True,
            "is_verified":     True,
        }
        created = await user_repo.create(db, doc)
        return self._make_token_response(created)

    # ── Login ─────────────────────────────────────────────────────
    async def login(
        self,
        db: AsyncIOMotorDatabase,
        request: LoginRequest,
    ) -> AuthResponse:
        """
        Validate credentials and issue a JWT access token.

        Raises:
            InvalidCredentialsError: if email or password is wrong.
            AccountDeactivatedError: if the account is disabled.
        """
        user = await user_repo.get_by_email(db, request.email)

        if not user or not verify_password(request.password, user["hashed_password"]):
            raise InvalidCredentialsError()

        if not user.get("is_active", True):
            raise AccountDeactivatedError()

        return self._make_token_response(user)

    # ── Account management ────────────────────────────────────────
    async def get_profile(self, db: AsyncIOMotorDatabase, user_id: str) -> dict:
        """Return the raw user document for a given user_id."""
        return await user_repo.get_by_id(db, user_id)

    async def deactivate_account(self, db: AsyncIOMotorDatabase, user_id: str) -> None:
        """Soft-delete an account by setting is_active = False."""
        await user_repo.update(db, user_id, {"is_active": False})

    # ── Private helpers ───────────────────────────────────────────
    async def _guard_unique_email(self, db: AsyncIOMotorDatabase, email: str) -> None:
        if await user_repo.email_exists(db, email):
            raise DuplicateEmailError(email)

    @staticmethod
    def _make_token_response(user: dict) -> AuthResponse:
        token = create_access_token(
            subject=user["id"],
            role=user["role"],
            expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
        )
        return AuthResponse(
            access_token=token,
            token_type="bearer",
            user_id=user["id"],
            role=user["role"],
        )


# Module-level singleton — import and use directly in routes
auth_service = AuthService()
