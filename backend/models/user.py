from typing import Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime

class UserDocument(BaseModel):
    """Represents the raw MongoDB document for a platform user."""
    id: Optional[str] = Field(None, alias="_id")
    email: EmailStr
    hashed_password: str
    full_name: str
    role: str                    # PROVIDER | NGO | VOLUNTEER
    provider_type: Optional[str] = None   # RESTAURANT | HOSTEL
    ngo_name: Optional[str] = None
    registration_number: Optional[str] = None
    address: Optional[str] = None
    service_radius_km: Optional[float] = None
    is_active: bool = True
    is_verified: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {"populate_by_name": True}

USERS_COLLECTION = "users"
