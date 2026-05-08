from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List
from backend.schemas.ngos import NGOResponse, NGOUpdate
from backend.api.dependencies.auth import get_current_user
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/ngos",
    tags=["NGOs & Distributors"]
)

@router.get("", response_model=List[NGOResponse], summary="List registered NGOs")
async def list_ngos(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=100)):
    """
    Retrieve a paginated list of registered Non-Governmental Organizations.
    """
    raise HTTPException(status_code=501, detail="Not implemented")

@router.get("/{ngo_id}", response_model=NGOResponse, summary="Get NGO details")
async def get_ngo(ngo_id: str):
    """
    Get detailed profile and capacity information for a specific NGO.
    """
    raise HTTPException(status_code=501, detail="Not implemented")

@router.patch("/{ngo_id}", response_model=NGOResponse, summary="Update NGO profile")
async def update_ngo(ngo_id: str, ngo_in: NGOUpdate, current_user: dict = Depends(get_current_user)):
    """
    Update the operational details and capabilities of an NGO.
    """
    raise HTTPException(status_code=501, detail="Not implemented")
