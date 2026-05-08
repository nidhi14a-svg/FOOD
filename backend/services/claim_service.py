"""
services/claim_service.py
─────────────────────────
Business logic for NGO food claims.

Responsibilities:
  - Initiating a claim on an available listing
  - Enforcing "one claim per listing" rule
  - Managing claim lifecycle (Pending -> Accepted -> Delivered)
  - NGO-specific claim management

What this service does NOT do:
  - Access HTTP context
  - Direct DB access (uses repositories)
"""

from datetime import datetime
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase

from backend.repositories.claim_repo import claim_repo
from backend.repositories.food_repo import food_repo
from backend.schemas.claims import ClaimFoodRequest, ClaimResponse, ClaimUpdate
from backend.services.exceptions import (
    ClaimNotFoundError,
    FoodListingNotFoundError,
    FoodListingUnavailableError,
    DuplicateClaimError,
    InvalidClaimTransitionError
)


class ClaimService:
    """
    Handles all food claim business logic.
    """

    async def create_claim(
        self, 
        db: AsyncIOMotorDatabase, 
        request: ClaimFoodRequest, 
        ngo_id: str
    ) -> ClaimResponse:
        """
        NGO initiates a claim on a food listing.
        
        Logic:
        1. Verify listing exists and is AVAILABLE.
        2. Verify no existing claim exists for this listing.
        3. Create claim doc.
        4. Atomic-like update: Set listing status to CLAIMED.
        """
        # 1. Verify listing
        listing = await food_repo.get_by_id(db, request.listing_id)
        if not listing:
            raise FoodListingNotFoundError(request.listing_id)
            
        if listing["status"] != "AVAILABLE":
            raise FoodListingUnavailableError(listing["status"])

        # 2. Check for duplicate claim
        # Since we have a unique index on listing_id in claims collection, 
        # MongoDB will also protect us, but we check here for better error message.
        if await claim_repo.exists(db, {"listing_id": request.listing_id}):
            raise DuplicateClaimError()

        # 3. Create claim
        claim_doc = {
            "listing_id": request.listing_id,
            "ngo_id": ngo_id,
            "estimated_pickup_time": request.estimated_pickup_time,
            "vehicle_type": request.vehicle_type,
            "contact_phone": request.contact_phone,
            "status": "PENDING_APPROVAL",
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        
        created = await claim_repo.create(db, claim_doc)
        
        # 4. Update food listing status
        await food_repo.update(db, request.listing_id, {"status": "CLAIMED"})
        
        return ClaimResponse(**created)

    async def list_ngo_claims(
        self, 
        db: AsyncIOMotorDatabase, 
        ngo_id: str,
        skip: int = 0,
        limit: int = 100
    ) -> List[ClaimResponse]:
        """
        Retrieve all claims made by a specific NGO.
        """
        items = await claim_repo.get_all(
            db, 
            filter_query={"ngo_id": ngo_id},
            skip=skip,
            limit=limit,
            sort_field="created_at",
            sort_dir=-1
        )
        return [ClaimResponse(**item) for item in items]

    async def get_claim(self, db: AsyncIOMotorDatabase, claim_id: str) -> ClaimResponse:
        """
        Get specific claim details.
        """
        doc = await claim_repo.get_by_id(db, claim_id)
        if not doc:
            raise ClaimNotFoundError(claim_id)
        return ClaimResponse(**doc)

    async def update_claim_status(
        self, 
        db: AsyncIOMotorDatabase, 
        claim_id: str, 
        request: ClaimUpdate
    ) -> ClaimResponse:
        """
        Update the status of a claim (e.g., mark as PICKED_UP or DELIVERED).
        """
        claim = await claim_repo.get_by_id(db, claim_id)
        if not claim:
            raise ClaimNotFoundError(claim_id)
            
        # Optional: Add complex state machine logic here
        # e.g. cannot go from DELIVERED back to PENDING_APPROVAL
        
        updated = await claim_repo.update(db, claim_id, {"status": request.status})
        
        # If status is DELIVERED, we might want to update the food listing status too
        if request.status == "DELIVERED":
            await food_repo.update(db, claim["listing_id"], {"status": "PICKED_UP"})
            
        return ClaimResponse(**updated)


claim_service = ClaimService()
