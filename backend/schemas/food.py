from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class LocationSchema(BaseModel):
    latitude: float = Field(..., ge=-90, le=90, description="Latitude coordinate", json_schema_extra={"example": 40.7128})
    longitude: float = Field(..., ge=-180, le=180, description="Longitude coordinate", json_schema_extra={"example": -74.0060})
    address: str = Field(..., min_length=5, description="Human-readable address", json_schema_extra={"example": "123 Food Ave, NY"})

class CreateFoodRequest(BaseModel):
    title: str = Field(..., min_length=3, max_length=100, description="Title of the food listing", json_schema_extra={"example": "50 Servings of Pasta"})
    description: str = Field(..., min_length=10, max_length=500, description="Detailed description of the food", json_schema_extra={"example": "Freshly cooked tomato basil pasta left over from a catered event."})
    quantity_kg: float = Field(..., gt=0, description="Estimated total weight in kilograms", json_schema_extra={"example": 15.5})
    food_type: str = Field(..., pattern="^(PREPARED|PRODUCE|PACKAGED)$", description="Type of food", json_schema_extra={"example": "PREPARED"})
    expiry_time: datetime = Field(..., description="Estimated time when the food will no longer be safe to consume", json_schema_extra={"example": "2026-05-07T12:00:00Z"})
    pickup_location: LocationSchema
    image_url: Optional[str] = Field(None, description="URL of the food image")

class FoodStatusUpdateRequest(BaseModel):
    status: str = Field(..., pattern="^(AVAILABLE|CLAIMED|PICKED_UP|EXPIRED)$", description="New status of the food listing", json_schema_extra={"example": "CLAIMED"})

class FoodResponse(CreateFoodRequest):
    id: str = Field(..., description="Unique ID of the food listing", json_schema_extra={"example": "5f8f8c44b54764421b7156d1"})
    provider_id: str = Field(..., description="ID of the provider who posted the listing", json_schema_extra={"example": "60d5ecb8b392d244f8b1a3b5"})
    status: str = Field(..., description="Current status", json_schema_extra={"example": "AVAILABLE"})
    created_at: datetime = Field(..., description="Timestamp of listing creation", json_schema_extra={"example": "2026-05-06T19:00:00Z"})

class FoodListResponse(BaseModel):
    total_count: int = Field(..., description="Total number of listings matching the query", json_schema_extra={"example": 42})
    items: List[FoodResponse] = Field(..., description="List of food items")
