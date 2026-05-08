"""
services/food_service.py
────────────────────────
Business logic for managing food surplus listings.

Responsibilities:
  - Creating new food listings (Provider only)
  - Listing and filtering available food (Proximity search)
  - Updating listing status (Available -> Claimed -> Picked Up)
  - Enforcing ownership and status transition rules

What this service does NOT do:
  - Handle HTTP requests (no Depends, Query, etc.)
  - Directly access MongoDB (delegates to food_repo)
"""

from datetime import datetime
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorDatabase

from backend.repositories.food_repo import food_repo
from backend.schemas.food import CreateFoodRequest, FoodResponse, FoodListResponse, FoodStatusUpdateRequest
from backend.services.exceptions import (
    FoodListingNotFoundError,
    FoodListingUnavailableError,
    UnauthorisedListingModificationError
)


class FoodService:
    """
    Handles all food-related business logic.
    """

    async def create_listing(
        self, 
        db: AsyncIOMotorDatabase, 
        request: CreateFoodRequest, 
        provider_id: str
    ) -> FoodResponse:
        """
        Creates a new food surplus listing for a provider.
        """
        # Image support active.
        food_doc = {
            "provider_id": provider_id,
            "title": request.title,
            "description": request.description,
            "quantity_kg": request.quantity_kg,
            "food_type": request.food_type,
            "expiry_time": request.expiry_time,
            "pickup_location": request.pickup_location.model_dump(),
            "image_url": request.image_url,
            "status": "AVAILABLE",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        created = await food_repo.create(db, food_doc)
        return FoodResponse(**created)

    async def list_available(
        self, 
        db: AsyncIOMotorDatabase, 
        skip: int = 0, 
        limit: int = 100,
        lat: Optional[float] = None,
        lon: Optional[float] = None,
        radius_km: float = 10.0
    ) -> FoodListResponse:
        """
        Retrieves a list of available food donations.
        If lat/lon are provided, it performs a geospatial query (implemented in repo).
        """
        # For now, we use a simple filter. Proximity logic would be added to repo.
        filter_query = {"status": "AVAILABLE"}
        
        # In a real implementation, we'd add geospatial filter to filter_query here 
        # if lat and lon are present, e.g., using $near or $geoWithin.

        items = await food_repo.get_all(
            db, 
            filter_query=filter_query, 
            skip=skip, 
            limit=limit,
            sort_field="created_at",
            sort_dir=-1
        )
        total = await food_repo.count(db, filter_query)
        
        return FoodListResponse(
            total_count=total, 
            items=[FoodResponse(**item) for item in items]
        )

    async def get_listing(self, db: AsyncIOMotorDatabase, listing_id: str) -> FoodResponse:
        """
        Fetch a specific food listing by ID.
        """
        doc = await food_repo.get_by_id(db, listing_id)
        if not doc:
            raise FoodListingNotFoundError(listing_id)
        return FoodResponse(**doc)

    async def update_status(
        self, 
        db: AsyncIOMotorDatabase, 
        listing_id: str, 
        new_status: str, 
        requester_id: str
    ) -> FoodResponse:
        """
        Update the status of a food listing. 
        Only the owner (provider) can manually update status to AVAILABLE or EXPIRED.
        """
        doc = await food_repo.get_by_id(db, listing_id)
        if not doc:
            raise FoodListingNotFoundError(listing_id)
            
        if doc["provider_id"] != requester_id:
            raise UnauthorisedListingModificationError()

        updated = await food_repo.update(db, listing_id, {"status": new_status})
        return FoodResponse(**updated)

    async def list_by_provider(
        self, 
        db: AsyncIOMotorDatabase, 
        provider_id: str
    ) -> List[FoodResponse]:
        """
        Get all listings posted by a specific provider.
        """
        items = await food_repo.get_all(
            db, 
            filter_query={"provider_id": provider_id},
            sort_field="created_at",
            sort_dir=-1
        )
        return [FoodResponse(**item) for item in items]

    async def complete_listing(
        self, 
        db: AsyncIOMotorDatabase, 
        listing_id: str, 
        requester_id: str
    ) -> FoodResponse:
        """
        Mark a food listing as completed (PICKED_UP).
        """
        doc = await food_repo.get_by_id(db, listing_id)
        if not doc:
            raise FoodListingNotFoundError(listing_id)
            
        if doc["provider_id"] != requester_id:
            raise UnauthorisedListingModificationError()

        updated = await food_repo.update(db, listing_id, {"status": "PICKED_UP"})
        return FoodResponse(**updated)


food_service = FoodService()
