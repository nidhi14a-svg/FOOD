from fastapi import APIRouter, Depends, Path, Query
from typing import List, Optional

from backend.models.food import FoodCreate, FoodOut, FoodAddResponse, FoodListResponse, FoodCompleteResponse
from backend.services.food_service import add_food, list_food, complete_food
from backend.security import require_role

router = APIRouter()

@router.post("/add", response_model=FoodAddResponse)
async def create_food(item: FoodCreate, current_user=Depends(require_role(["admin", "provider"]))):
    return await add_food(item)

@router.get("/list", response_model=FoodListResponse)
async def get_food_list(
    status: Optional[str] = Query(None),
    type: Optional[str] = Query(None),
    location: Optional[str] = Query(None),
    current_user=Depends(require_role(["admin", "provider", "ngo"])),
):
    return await list_food(status=status, type=type, location=location)

@router.post("/{food_id}/complete", response_model=FoodCompleteResponse)
async def mark_food_complete(
    food_id: str = Path(...), current_user=Depends(require_role(["admin", "provider"]))
):
    return await complete_food(food_id)
