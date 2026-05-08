from pydantic import BaseModel, EmailStr
from typing import List, Optional

class NGOServiceArea(BaseModel):
    city: str
    radius_km: float

class NGOBase(BaseModel):
    name: str
    registration_number: str
    contact_person: str
    service_area: NGOServiceArea

class NGOUpdate(BaseModel):
    contact_person: Optional[str] = None
    service_area: Optional[NGOServiceArea] = None

class NGOResponse(NGOBase):
    id: str
    email: EmailStr
    is_verified: bool
    total_food_claimed_kg: float
