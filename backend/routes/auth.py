from fastapi import APIRouter

from backend.models.user import UserCreate, UserLogin, TokenResponse, RegisterResponse
from backend.services.auth_service import register_user, authenticate_user

router = APIRouter()

@router.post("/register", response_model=RegisterResponse)
async def register(data: UserCreate):
    return await register_user(data)

@router.post("/login", response_model=TokenResponse)
async def login(data: UserLogin):
    return await authenticate_user(data.email, data.password)
