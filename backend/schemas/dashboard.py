from pydantic import BaseModel, Field
from typing import List
import datetime

class DashboardOverviewResponse(BaseModel):
    active_donations: int = Field(..., description="Number of currently active food donations", json_schema_extra={"example": 5})
    pending_claims: int = Field(..., description="Number of claims awaiting pickup or approval", json_schema_extra={"example": 2})
    total_meals_saved: int = Field(..., description="Total meals saved by the user's organization", json_schema_extra={"example": 1540})
    total_co2_reduced_kg: float = Field(..., description="Total CO2 emissions prevented in kg", json_schema_extra={"example": 450.5})

class TrendPoint(BaseModel):
    date: datetime.date = Field(..., description="Date of the metric", json_schema_extra={"example": "2026-05-01"})
    meals_saved: int = Field(..., description="Meals saved on this date", json_schema_extra={"example": 45})
    co2_reduced_kg: float = Field(..., description="CO2 reduced on this date in kg", json_schema_extra={"example": 12.5})

class AnalyticsResponse(BaseModel):
    platform_total_meals: int = Field(..., description="Total meals saved across the entire platform", json_schema_extra={"example": 150430})
    platform_total_co2: float = Field(..., description="Total CO2 reduced across the platform", json_schema_extra={"example": 45000.2})
    active_ngos: int = Field(..., description="Number of active NGOs on the platform", json_schema_extra={"example": 120})
    active_providers: int = Field(..., description="Number of active Food Providers", json_schema_extra={"example": 350})
    trends: List[TrendPoint] = Field(..., description="Time-series data for the last 30 days")
