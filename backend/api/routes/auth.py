from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.schemas.auth import LoginRequest, RegisterProviderRequest, RegisterNGORequest, RegisterVolunteerRequest, GenericRegisterRequest, AuthResponse
from backend.api.dependencies.auth import get_current_user
from backend.services.auth_service import auth_service
from backend.database.connection import get_db
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/auth",
    tags=["Authentication & Identity"]
)

@router.post("/register/provider", response_model=AuthResponse, status_code=201, summary="Register a Food Provider")
async def register_provider(provider_in: RegisterProviderRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Registers a new Food Provider (Restaurant or Hostel) and returns a JWT token."""
    return await auth_service.register_provider(db, provider_in)

@router.post("/register/ngo", response_model=AuthResponse, status_code=201, summary="Register an NGO")
async def register_ngo(ngo_in: RegisterNGORequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Registers a new Non-Governmental Organization and returns a JWT token."""
    return await auth_service.register_ngo(db, ngo_in)

@router.post("/register/volunteer", response_model=AuthResponse, status_code=201, summary="Register a Volunteer")
async def register_volunteer(volunteer_in: RegisterVolunteerRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Registers a new Volunteer and returns a JWT token."""
    return await auth_service.register_volunteer(db, volunteer_in.email, volunteer_in.password, volunteer_in.full_name)

@router.post("/register", response_model=AuthResponse, status_code=201, summary="Generic registration endpoint")
async def register_generic(data: GenericRegisterRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Generic registration router based on role."""
    role = data.role.lower()
    if role == "provider" or role == "donor":
        from backend.schemas.auth import RegisterProviderRequest
        return await auth_service.register_provider(db, RegisterProviderRequest(
            email=data.email,
            password=data.password,
            business_name=data.full_name,
            provider_type="RESTAURANT",
            address="Address not provided"
        ))
    elif role == "ngo":
        from backend.schemas.auth import RegisterNGORequest
        return await auth_service.register_ngo(db, RegisterNGORequest(
            email=data.email,
            password=data.password,
            ngo_name=data.full_name,
            registration_number="DEMO-123",
            service_radius_km=10.0
        ))
    else: # volunteer
        return await auth_service.register_volunteer(db, data.email, data.password, data.full_name)

@router.post("/login", response_model=AuthResponse, summary="Authenticate and get JWT token")
async def login(login_request: LoginRequest, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Authenticates a user by email and password, issuing a JWT Bearer token."""
    return await auth_service.login(db, login_request)

@router.post("/token", response_model=AuthResponse, summary="OAuth2 standard login (for Swagger UI)")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncIOMotorDatabase = Depends(get_db)):
    """Standard OAuth2 token endpoint. Used by Swagger UI 'Authorize' button."""
    from backend.schemas.auth import LoginRequest as LR
    return await auth_service.login(db, LR(email=form_data.username, password=form_data.password))

@router.get("/me", response_model=AuthResponse, summary="Get current user profile")
async def get_my_profile(current_user: dict = Depends(get_current_user)):
    """Returns the profile of the currently authenticated user."""
    return AuthResponse(
        access_token="[use /login to get a token]",
        user_id=current_user["id"],
        role=current_user["role"]
    )

@router.post("/forgot-password", summary="Initiate password reset")
async def forgot_password(data: dict, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Mocks a password reset initiation."""
    email = data.get("email")
    if not email:
        return {"error": "Email is required"}
    return {"message": f"Password reset instructions have been sent to {email}"}
