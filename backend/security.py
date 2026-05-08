from datetime import datetime, timedelta
from typing import Optional

from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

from backend.config import settings

import bcrypt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

class TokenPayload(BaseModel):
    sub: str
    email: str
    role: str
    exp: int

class TokenData(BaseModel):
    user_id: str
    email: str
    role: str

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))
    except ValueError:
        return False

def create_access_token(subject: str, email: str, role: str, expires_delta: Optional[timedelta] = None) -> str:
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=settings.jwt_expiration_minutes))
    payload = {
        "sub": subject,
        "email": email,
        "role": role,
        "exp": expire,
    }
    return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)

def decode_access_token(token: str) -> TokenData:
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return TokenData(user_id=payload.get("sub"), email=payload.get("email"), role=payload.get("role"))
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

async def get_current_user(token: str = Depends(oauth2_scheme)) -> TokenData:
    return decode_access_token(token)

def require_role(required_roles: list[str]):
    async def wrapper(current_user: TokenData = Depends(get_current_user)) -> TokenData:
        if current_user.role not in required_roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient privileges")
        return current_user
    return wrapper
