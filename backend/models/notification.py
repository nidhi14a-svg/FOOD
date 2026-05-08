from datetime import datetime
from pydantic import BaseModel, Field

class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    type: str = "info"

class NotificationInDB(NotificationCreate):
    id: str = Field(..., alias="_id")
    created_at: datetime
    read: bool

    class Config:
        allow_population_by_field_name = True
        orm_mode = True

class NotificationOut(NotificationInDB):
    pass

from typing import List

class NotificationListResponse(BaseModel):
    notifications: List[NotificationOut]
