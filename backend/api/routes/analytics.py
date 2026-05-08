from fastapi import APIRouter, Depends, Query
from motor.motor_asyncio import AsyncIOMotorDatabase
from backend.schemas.dashboard import AnalyticsResponse
from backend.api.dependencies.auth import require_admin
from backend.services.analytics_service import analytics_service
from backend.database.connection import get_db
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/analytics",
    tags=["Platform Analytics & Reporting"]
)

@router.get("", response_model=AnalyticsResponse, summary="Get platform-wide analytics")
async def get_platform_analytics(
    days: int = Query(30, ge=1, le=365),
    db: AsyncIOMotorDatabase = Depends(get_db),
    # Optional: Restrict this to admins or make it public if desired
    # current_user: dict = Depends(require_admin) 
):
    """
    Returns platform-wide impact metrics and historical trends.
    Useful for ESG reporting and public transparency.
    """
    return await analytics_service.get_platform_analytics(db, days=days)
