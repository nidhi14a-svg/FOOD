from datetime import datetime
from typing import Optional
from bson import ObjectId

from backend.core.db import db
from backend.models.user import UserCreate, UserOut, TokenResponse
from backend.security import create_access_token, hash_password, verify_password
from backend.errors import BadRequestError, ConflictError

USER_COLLECTION = "users"

async def find_user_by_email(email: str) -> Optional[dict]:
    return await db[USER_COLLECTION].find_one({"email": email})

async def save_user(data: UserCreate) -> dict:
    existing = await find_user_by_email(data.email)
    if existing:
        raise ConflictError("Email already registered")

    now = datetime.utcnow()
    user_doc = {
        "name": data.name,
        "email": data.email,
        "role": data.role,
        "password_hash": hash_password(data.password),
        "created_at": now,
        "updated_at": now,
    }
    result = await db[USER_COLLECTION].insert_one(user_doc)
    user_doc["_id"] = str(result.inserted_id)
    return user_doc

async def register_user(data: UserCreate) -> TokenResponse:
    if data.role not in ["admin", "provider", "ngo"]:
        raise BadRequestError("Invalid role")

    user = await save_user(data)
    token = create_access_token(subject=user["_id"], email=user["email"], role=user["role"])
    return TokenResponse(access_token=token, user=UserOut(id=user["_id"], name=user["name"], email=user["email"], role=user["role"]))

async def authenticate_user(email: str, password: str) -> TokenResponse:
    user = await find_user_by_email(email)
    if not user or not verify_password(password, user["password_hash"]):
        raise BadRequestError("Invalid email or password")
    token = create_access_token(subject=str(user["_id"]), email=user["email"], role=user["role"])
    return TokenResponse(access_token=token, user=UserOut(id=str(user["_id"]), name=user["name"], email=user["email"], role=user["role"]))
