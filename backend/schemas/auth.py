from pydantic import BaseModel, EmailStr, Field

class LoginRequest(BaseModel):
    email: EmailStr = Field(..., description="User's email address", json_schema_extra={"example": "user@example.com"})
    password: str = Field(..., min_length=8, description="User's password", json_schema_extra={"example": "securepassword123"})

class RegisterProviderRequest(BaseModel):
    email: EmailStr = Field(..., description="Provider's email address", json_schema_extra={"example": "contact@foodies.com"})
    password: str = Field(..., min_length=8, description="Secure password", json_schema_extra={"example": "securepassword123"})
    business_name: str = Field(..., min_length=2, description="Name of the restaurant or hostel", json_schema_extra={"example": "The Grand Hotel"})
    provider_type: str = Field(..., pattern="^(RESTAURANT|HOSTEL)$", description="Type of provider (RESTAURANT or HOSTEL)", json_schema_extra={"example": "RESTAURANT"})
    address: str = Field(..., min_length=5, description="Physical address of the provider", json_schema_extra={"example": "123 Main St, Cityville"})

class RegisterNGORequest(BaseModel):
    email: EmailStr = Field(..., description="NGO's email address", json_schema_extra={"example": "contact@helpinghands.org"})
    password: str = Field(..., min_length=8, description="Secure password", json_schema_extra={"example": "securepassword123"})
    ngo_name: str = Field(..., min_length=2, description="Official name of the NGO", json_schema_extra={"example": "Helping Hands Initiative"})
    registration_number: str = Field(..., min_length=5, description="Official government registration number", json_schema_extra={"example": "NGO-123456789"})
    service_radius_km: float = Field(..., gt=0, le=100, description="Service area radius in kilometers", json_schema_extra={"example": 25.5})

class RegisterVolunteerRequest(BaseModel):
    email: EmailStr = Field(..., description="Volunteer's email address")
    password: str = Field(..., min_length=8, description="Secure password")
    full_name: str = Field(..., min_length=2, description="Volunteer's full name")

class GenericRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: str = Field(..., min_length=2)
    role: str # donor | ngo | volunteer

class AuthResponse(BaseModel):
    access_token: str = Field(..., description="JWT Bearer token for API access", json_schema_extra={"example": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."})
    token_type: str = Field(default="bearer", description="Type of the token", json_schema_extra={"example": "bearer"})
    user_id: str = Field(..., description="Unique ID of the authenticated user", json_schema_extra={"example": "60d5ecb8b392d244f8b1a3b5"})
    role: str = Field(..., description="Role of the authenticated user (PROVIDER, NGO, or VOLUNTEER)", json_schema_extra={"example": "PROVIDER"})
