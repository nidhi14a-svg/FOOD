from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ClaimFoodRequest(BaseModel):
    listing_id: str = Field(..., description="ID of the food listing being claimed", json_schema_extra={"example": "5f8f8c44b54764421b7156d1"})
    estimated_pickup_time: datetime = Field(..., description="When the NGO expects to pick up the food", json_schema_extra={"example": "2026-05-07T08:00:00Z"})
    vehicle_type: str = Field(..., description="Type of vehicle used for pickup", json_schema_extra={"example": "Refrigerated Van"})
    contact_phone: str = Field(..., min_length=10, description="Phone number of the driver/contact person", json_schema_extra={"example": "+15551234567"})

class ClaimResponse(ClaimFoodRequest):
    id: str = Field(..., description="Unique ID of the claim", json_schema_extra={"example": "61a7c3b8c392d244f8b1a5e9"})
    ngo_id: str = Field(..., description="ID of the NGO making the claim", json_schema_extra={"example": "60d5efd8b392d244f8b1a8c2"})
    status: str = Field(..., description="Current status of the claim", json_schema_extra={"example": "PENDING_APPROVAL"})
    created_at: datetime = Field(..., description="Timestamp of when the claim was initiated", json_schema_extra={"example": "2026-05-06T19:30:00Z"})

class ClaimUpdate(BaseModel):
    status: str = Field(..., description="New status for the claim", json_schema_extra={"example": "PICKED_UP"})
