from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class LocationDocument(BaseModel):
    latitude: float
    longitude: float
    address: str

class FoodDocument(BaseModel):
    """Represents the raw MongoDB document for a food surplus listing."""
    id: Optional[str] = Field(None, alias="_id")
    provider_id: str
    title: str
    description: str
    quantity_kg: float
    food_type: str           # PREPARED | PRODUCE | PACKAGED
    expiry_time: datetime
    pickup_location: LocationDocument
    image_url: Optional[str] = None
    status: str = "AVAILABLE"  # AVAILABLE | CLAIMED | PICKED_UP | EXPIRED
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {"populate_by_name": True}

FOOD_COLLECTION = "food_listings"
