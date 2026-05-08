from pydantic import BaseModel, Field
from typing import List

class ErrorDetail(BaseModel):
    loc: List[str] = Field(..., description="Location of the error in the request")
    msg: str = Field(..., description="Error message explaining why validation failed")
    type: str = Field(..., description="Error type identifier")

class ErrorResponse(BaseModel):
    detail: str = Field(..., description="High-level error message", json_schema_extra={"example": "Resource not found"})

class ValidationErrorResponse(BaseModel):
    detail: List[ErrorDetail] = Field(..., description="List of validation errors")
