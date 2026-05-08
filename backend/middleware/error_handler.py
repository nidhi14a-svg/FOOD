"""
middleware/error_handler.py
───────────────────────────
Centralised exception handling logic for FastAPI.
Formats all errors into a consistent JSON structure.
"""

import logging
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException

from backend.core.errors import AppError

logger = logging.getLogger("foodies.errors")

def register_error_handlers(app: FastAPI) -> None:
    """
    Registers custom exception handlers to the FastAPI application.
    Ensures every error returns a consistent JSON body:
    {
        "success": False,
        "error": {
            "code": "ERROR_CODE",
            "message": "Human readable message",
            "details": {}
        }
    }
    """

    @app.exception_handler(AppError)
    async def app_error_handler(request: Request, exc: AppError):
        """Handle our custom AppError hierarchy."""
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": exc.error_code,
                    "message": exc.message,
                    "details": exc.details
                }
            }
        )

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(request: Request, exc: RequestValidationError):
        """Handle Pydantic / FastAPI request validation errors."""
        details = {}
        for error in exc.errors():
            # Simplifies the error location for the frontend
            loc = " -> ".join(str(l) for l in error.get("loc", []))
            details[loc] = error.get("msg")

        return JSONResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            content={
                "success": False,
                "error": {
                    "code": "VALIDATION_ERROR",
                    "message": "Invalid request parameters or body.",
                    "details": details
                }
            }
        )

    @app.exception_handler(StarletteHTTPException)
    async def http_exception_handler(request: Request, exc: StarletteHTTPException):
        """Handle standard FastAPI/Starlette HTTPExceptions (like 404 routes)."""
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "error": {
                    "code": "HTTP_ERROR",
                    "message": str(exc.detail),
                    "details": {}
                }
            }
        )

    @app.exception_handler(Exception)
    async def general_exception_handler(request: Request, exc: Exception):
        """Catch-all for unhandled server-side exceptions."""
        logger.exception("Unhandled Exception: %s", str(exc))
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "success": False,
                "error": {
                    "code": "INTERNAL_SERVER_ERROR",
                    "message": "An unexpected error occurred on the server.",
                    "details": {}
                }
            }
        )
