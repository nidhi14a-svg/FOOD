from datetime import datetime, timedelta
from typing import Any, Optional, Union
from jose import JWTError, jwt
from backend.core.config import settings

# ─────────────────────────────────────────────
# Password Hashing
# ─────────────────────────────────────────────
import bcrypt

def verify_password(plain: str, hashed: str) -> bool:
    """Verify a plaintext password against its bcrypt hash."""
    return bcrypt.checkpw(plain.encode('utf-8'), hashed.encode('utf-8'))

def get_password_hash(password: str) -> str:
    """Hash a plaintext password using bcrypt."""
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

# ─────────────────────────────────────────────
# JWT Token Creation
# ─────────────────────────────────────────────
def create_access_token(
    subject: Union[str, Any],
    role: str,
    expires_delta: Optional[timedelta] = None,
    extra_claims: Optional[dict] = None,
) -> str:
    """
    Create a signed JWT access token.

    Args:
        subject:      The unique identifier to embed (e.g. user_id).
        role:         User role embedded in the token (admin | provider | ngo).
        expires_delta: Optional custom TTL. Defaults to settings.ACCESS_TOKEN_EXPIRE_MINUTES.
        extra_claims: Any additional key-value pairs to embed in the payload.

    Returns:
        Encoded JWT string.
    """
    expire = datetime.utcnow() + (
        expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    payload: dict = {
        "sub": str(subject),
        "role": role,
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "access",
    }
    if extra_claims:
        payload.update(extra_claims)

    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def create_refresh_token(subject: Union[str, Any], role: str) -> str:
    """
    Create a longer-lived refresh token (7 days).
    """
    expire = datetime.utcnow() + timedelta(days=7)
    payload = {
        "sub": str(subject),
        "role": role,
        "exp": expire,
        "iat": datetime.utcnow(),
        "type": "refresh",
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

# ─────────────────────────────────────────────
# JWT Token Decoding & Validation
# ─────────────────────────────────────────────
def decode_token(token: str) -> dict:
    """
    Decode and validate a JWT token.

    Returns:
        The decoded payload dict.

    Raises:
        JWTError if the token is invalid, expired, or tampered.
    """
    return jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
