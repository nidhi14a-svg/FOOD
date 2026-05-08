from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List
from backend.schemas.providers import ProviderResponse, ProviderUpdate, ProviderMetrics
from backend.api.dependencies.auth import get_current_user
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/providers",
    tags=["Food Providers"]
)

@router.get("", response_model=List[ProviderResponse], summary="List registered providers")
async def list_providers(skip: int = Query(0, ge=0), limit: int = Query(100, ge=1, le=100)):
    """
    Retrieve a paginated list of registered food providers.
    """
    raise HTTPException(status_code=501, detail="Not implemented")

@router.get("/{provider_id}", response_model=ProviderResponse, summary="Get provider details")
async def get_provider(provider_id: str):
    """
    Get detailed profile information for a specific provider.
    """
    raise HTTPException(status_code=501, detail="Not implemented")

@router.patch("/{provider_id}", response_model=ProviderResponse, summary="Update provider profile")
async def update_provider(provider_id: str, provider_in: ProviderUpdate, current_user: dict = Depends(get_current_user)):
    """
    Update the operational details of a provider.
    """
    raise HTTPException(status_code=501, detail="Not implemented")

@router.get("/{provider_id}/metrics", response_model=ProviderMetrics, summary="Get provider impact metrics")
async def get_provider_metrics(provider_id: str):
    """
    Retrieve impact metrics (meals saved, donations made) for a specific provider.
    """
    raise HTTPException(status_code=501, detail="Not implemented")
