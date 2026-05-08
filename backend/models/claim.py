from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class ClaimDocument(BaseModel):
    """Represents the raw MongoDB document for an NGO food claim."""
    id: Optional[str] = Field(None, alias="_id")
    listing_id: str
    ngo_id: str
    estimated_pickup_time: datetime
    vehicle_type: str
    contact_phone: str
    status: str = "PENDING_APPROVAL"  # PENDING_APPROVAL | ACCEPTED | PICKED_UP | DELIVERED
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    model_config = {"populate_by_name": True}

CLAIMS_COLLECTION = "claims"
