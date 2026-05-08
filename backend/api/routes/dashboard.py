from fastapi import APIRouter, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.schemas.dashboard import DashboardOverviewResponse
from backend.api.dependencies.auth import get_current_user
from backend.services.analytics_service import analytics_service
from backend.database.connection import get_db
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/dashboard",
    tags=["Dashboard Operations"]
)

@router.get("/overview", response_model=DashboardOverviewResponse, summary="Get dashboard metrics")
async def get_dashboard_overview(
    db: AsyncIOMotorDatabase = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Returns high-level overview metrics tailored to the user's role (Provider or NGO).
    Includes active donations, pending claims, and total impact.
    """
    return await analytics_service.get_dashboard_overview(
        db, 
        user_id=current_user["id"], 
        role=current_user["role"]
    )
