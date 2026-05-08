"""
api/dependencies/auth.py
─────────────────────────
Re-exports all auth dependencies from middleware/auth.py for clean route imports.
Provides aliases for backward compatibility with existing routes.
"""
from backend.middleware.auth import (
    get_current_user,
    require_role,
    require_admin,
    require_provider,
    require_ngo,
    require_admin_or_provider,
    require_admin_or_ngo,
    require_any_role,
)

# Aliases for backward compatibility
require_provider_role = require_provider
require_ngo_role = require_ngo
require_admin_role = require_admin

__all__ = [
    "get_current_user",
    "require_role",
    "require_admin",
    "require_provider",
    "require_ngo",
    "require_admin_or_provider",
    "require_admin_or_ngo",
    "require_any_role",
    "require_provider_role",
    "require_ngo_role",
    "require_admin_role",
]
