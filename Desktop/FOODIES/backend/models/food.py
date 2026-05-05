from datetime import datetime
from pydantic import BaseModel, Field

class FoodBase(BaseModel):
    provider_id: str
    title: str
    description: str
    quantity: int
    type: str
    expiry: datetime
    location: str

class FoodCreate(FoodBase):
    pass

class FoodUpdateStatus(BaseModel):
    status: str

class FoodInDB(FoodBase):
    id: str = Field(..., alias="_id")
    status: str
    priority_score: float
    created_at: datetime
    updated_at: datetime

    class Config:
        allow_population_by_field_name = True
        orm_mode = True

class FoodOut(FoodInDB):
    pass
