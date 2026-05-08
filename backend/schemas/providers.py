from pydantic import BaseModel, EmailStr
from typing import List, Optional

class ProviderBase(BaseModel):
    name: str
    address: str
    contact_number: str
    business_type: str # RESTAURANT or HOSTEL

class ProviderUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    contact_number: Optional[str] = None

class ProviderResponse(ProviderBase):
    id: str
    email: EmailStr
    is_verified: bool
    rating: float

class ProviderMetrics(BaseModel):
    total_donations: int
    meals_saved: int
    carbon_footprint_saved_kg: float
