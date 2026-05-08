from pydantic import BaseModel
from typing import Optional

class HealthResponse(BaseModel):
    status: str
    version: str
    database_connected: bool

class PingResponse(BaseModel):
    message: str
