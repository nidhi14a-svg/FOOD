"""
core/errors.py
──────────────
Standardised exception hierarchy for the Foodies platform.
"""

from typing import Any, Dict, Optional


class AppError(Exception):
    """
    Base class for all application-specific errors.
    
    Attributes:
        message: Human-readable error description.
        status_code: Suggested HTTP status code.
        error_code: A machine-readable string (e.g., 'AUTH_FAILED').
        details: Optional dictionary of extra context.
    """
    def __init__(
        self, 
        message: str, 
        status_code: int = 400, 
        error_code: str = "INTERNAL_ERROR",
        details: Optional[Dict[str, Any]] = None
    ):
        super().__init__(message)
        self.message = message
        self.status_code = status_code
        self.error_code = error_code
        self.details = details or {}


# ── Auth Errors ──────────────────────────────────────────────────
class AuthenticationError(AppError):
    def __init__(self, message: str = "Authentication failed"):
        super().__init__(message, status_code=401, error_code="UNAUTHORIZED")

class AuthorizationError(AppError):
    def __init__(self, message: str = "Permission denied"):
        super().__init__(message, status_code=403, error_code="FORBIDDEN")


# ── Resource Errors ──────────────────────────────────────────────
class ResourceNotFoundError(AppError):
    def __init__(self, resource: str, identifier: str):
        super().__init__(
            f"{resource} with ID '{identifier}' not found", 
            status_code=404, 
            error_code="NOT_FOUND"
        )

class ResourceConflictError(AppError):
    def __init__(self, message: str):
        super().__init__(message, status_code=409, error_code="CONFLICT")


# ── Business Logic Errors ────────────────────────────────────────
class ValidationError(AppError):
    def __init__(self, message: str, details: Optional[Dict] = None):
        super().__init__(message, status_code=422, error_code="VALIDATION_ERROR", details=details)

class BusinessRuleError(AppError):
    def __init__(self, message: str):
        super().__init__(message, status_code=400, error_code="BUSINESS_RULE_VIOLATION")
