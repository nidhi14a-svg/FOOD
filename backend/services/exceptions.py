"""
services/exceptions.py
───────────────────────
Domain-level service exceptions, now integrated with the core error system.
"""

from backend.core.errors import (
    AppError, 
    ResourceConflictError, 
    AuthenticationError, 
    AuthorizationError, 
    ResourceNotFoundError,
    BusinessRuleError
)


class ServiceError(AppError):
    """Base class for all service-layer exceptions."""
    def __init__(self, message: str, status_code: int = 400, error_code: str = "SERVICE_ERROR"):
        super().__init__(message, status_code=status_code, error_code=error_code)


# ── Auth Exceptions ────────────────────────────────────────────────
class DuplicateEmailError(ResourceConflictError):
    def __init__(self, email: str = ""):
        super().__init__(f"The email '{email}' is already registered.")

class InvalidCredentialsError(AuthenticationError):
    def __init__(self):
        super().__init__("Invalid email or password.")

class AccountDeactivatedError(AuthorizationError):
    def __init__(self):
        super().__init__("This account has been deactivated. Please contact support.")


# ── Food Exceptions ────────────────────────────────────────────────
class FoodListingNotFoundError(ResourceNotFoundError):
    def __init__(self, listing_id: str = ""):
        super().__init__("Food Listing", listing_id)

class FoodListingUnavailableError(BusinessRuleError):
    def __init__(self, current_status: str = ""):
        super().__init__(f"Food listing is not available (current status: {current_status}).")

class UnauthorisedListingModificationError(AuthorizationError):
    def __init__(self):
        super().__init__("You are not authorised to modify this food listing.")


# ── Claim Exceptions ───────────────────────────────────────────────
class ClaimNotFoundError(ResourceNotFoundError):
    def __init__(self, claim_id: str = ""):
        super().__init__("Claim", claim_id)

class DuplicateClaimError(ResourceConflictError):
    def __init__(self):
        super().__init__("This food listing has already been claimed by another NGO.")

class InvalidClaimTransitionError(BusinessRuleError):
    def __init__(self, from_status: str, to_status: str):
        super().__init__(f"Cannot transition claim from '{from_status}' to '{to_status}'.")
