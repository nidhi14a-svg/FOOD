from fastapi import APIRouter, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.schemas.food import CreateFoodRequest, FoodResponse, FoodListResponse, FoodStatusUpdateRequest
from backend.api.dependencies.auth import get_current_user, require_provider_role
from backend.services.food_service import food_service
from backend.database.connection import get_db
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/food",
    tags=["Food Surplus Listings"]
)

@router.post("", response_model=FoodResponse, status_code=201, summary="Create a food surplus listing")
async def create_food_listing(
    request: CreateFoodRequest,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(require_provider_role)
):
    """Creates a new food donation listing. Requires PROVIDER role."""
    return await food_service.create_listing(db, request, current_user["id"])

@router.get("", response_model=FoodListResponse, summary="Browse available food listings")
async def list_food_listings(
    lat: float = Query(None, description="Latitude for proximity search"),
    lon: float = Query(None, description="Longitude for proximity search"),
    radius_km: float = Query(10.0, description="Search radius in kilometers"),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=100),
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """Retrieves a paginated list of AVAILABLE food donations."""
    return await food_service.list_available(db, skip=skip, limit=limit)

@router.get("/{food_id}", response_model=FoodResponse, summary="Get a specific food listing")
async def get_food_listing(food_id: str, db: AsyncIOMotorDatabase = Depends(get_db)):
    """Retrieves details of a specific food listing by ID."""
    return await food_service.get_listing(db, food_id)

@router.patch("/{food_id}/status", response_model=FoodResponse, summary="Update food listing status")
async def update_food_status(
    food_id: str,
    status_update: FoodStatusUpdateRequest,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """Updates the status of a food listing (e.g., mark as EXPIRED). Must be the owner."""
    return await food_service.update_status(db, food_id, status_update.status, current_user["id"])
@router.post("/{food_id}/complete", response_model=FoodResponse, summary="Mark food listing as completed")
async def mark_food_complete(
    food_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(require_provider_role)
):
    """Marks a food listing as completed (PICKED_UP). Must be the owner."""
    return await food_service.complete_listing(db, food_id, current_user["id"])
