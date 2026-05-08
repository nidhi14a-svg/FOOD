from fastapi import APIRouter, Depends, Query
from typing import List
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.schemas.claims import ClaimFoodRequest, ClaimResponse
from backend.api.dependencies.auth import get_current_user, require_ngo_role
from backend.services.claim_service import claim_service
from backend.database.connection import get_db
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/claims",
    tags=["Claims & Logistics"]
)

@router.post("", response_model=ClaimResponse, status_code=201, summary="Initiate a claim for food")
async def create_claim(
    request: ClaimFoodRequest,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(require_ngo_role)
):
    """NGO initiates a claim on an available food listing. Requires NGO role."""
    return await claim_service.create_claim(db, request, current_user["id"])

@router.get("", response_model=List[ClaimResponse], summary="List my claims")
async def list_claims(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Returns all claims made by the currently authenticated NGO."""
    return await claim_service.list_my_claims(db, current_user["id"])

@router.get("/{claim_id}", response_model=ClaimResponse, summary="Get claim details")
async def get_claim(
    claim_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Detailed view of a specific claim and its current logistics status."""
    return await claim_service.get_claim(db, claim_id, current_user["id"])
