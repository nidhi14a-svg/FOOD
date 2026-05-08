from pydantic import BaseModel
from typing import List
from datetime import date

class ImpactMetrics(BaseModel):
    total_meals_saved: int
    total_co2_reduced_kg: float
    active_participants: int

class TrendDataPoint(BaseModel):
    date: date
    food_saved_kg: float

class TrendsReport(BaseModel):
    timeline: List[TrendDataPoint]
