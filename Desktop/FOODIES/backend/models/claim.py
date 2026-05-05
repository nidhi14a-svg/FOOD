from datetime import datetime
from pydantic import BaseModel, Field

class ClaimBase(BaseModel):
    food_id: str
    ngo_id: str
    requested_quantity: int

class ClaimCreate(ClaimBase):
    pass

class ClaimInDB(ClaimBase):
    id: str = Field(..., alias="_id")
    provider_id: str
    claimed_quantity: int
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        allow_population_by_field_name = True
        orm_mode = True

class ClaimOut(ClaimInDB):
    pass
