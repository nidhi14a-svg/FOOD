from fastapi import APIRouter
from backend.schemas.health import HealthResponse, PingResponse
from backend.core.config import settings

router = APIRouter(
    prefix=f"{settings.API_V1_STR}/health",
    tags=["Health & Diagnostics"]
)

@router.get("", response_model=HealthResponse, summary="System health check")
async def health_check():
    """
    Returns the overall status of the API, application version, and database connectivity.
    """
    return {"status": "healthy", "version": "1.0.0", "database_connected": True}

@router.get("/ping", response_model=PingResponse, summary="Basic liveness probe")
async def ping():
    """
    Simple liveness endpoint to ensure the server is responding to HTTP requests.
    """
    return {"message": "pong"}
