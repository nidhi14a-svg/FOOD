from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi

from backend.core.config import settings
from backend.database.connection import connect_db, close_db, get_db
from backend.database.collections import ensure_indexes
from backend.middleware.auth import JWTLoggingMiddleware
from backend.middleware.error_handler import register_error_handlers
from backend.api.routes import health, auth, providers, ngos, food, claims, dashboard, analytics

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Manage startup and shutdown of the application resources."""
    await connect_db()
    # Bootstrap all MongoDB indexes (idempotent)
    db = await get_db().__anext__()
    await ensure_indexes(db)
    yield
    await close_db()

DESCRIPTION = """
## 🍎 Food Waste Management Platform API

A highly available, production-grade REST API that connects food surplus from **Restaurants** and **Hostels** directly to **NGOs** and community distributors — reducing waste and feeding communities.

---

### Core Capabilities

| Domain | Description |
|---|---|
| **Food Listings** | Providers post surplus food available for pickup |
| **Claims** | NGOs claim and track food collection logistics |
| **Analytics** | Real-time ESG reporting and platform-wide impact metrics |
| **Dashboard** | Role-specific overview for Providers and NGOs |

---

### Authentication

All secured endpoints require a **JWT Bearer Token**.  
Use the `/auth/login` or `/auth/token` endpoints to authenticate, then click **Authorize** above.

```
Authorization: Bearer <your_token>
```
"""

tags_metadata = [
    {"name": "Health & Diagnostics", "description": "System health checks, liveness probes, and operational monitoring."},
    {"name": "Authentication & Identity", "description": "User registration, secure JWT token generation, and profile management."},
    {"name": "Food Providers", "description": "Operations for Restaurants, Hostels, and surplus food donors — listing management and impact metrics."},
    {"name": "NGOs & Distributors", "description": "Operations for Non-Governmental Organizations — profile management and service coverage."},
    {"name": "Food Surplus Listings", "description": "Post, browse, filter, and manage available food donations with geospatial query support."},
    {"name": "Claims & Logistics", "description": "Claim food donations, track pickup lifecycle, and manage delivery status."},
    {"name": "Dashboard Operations", "description": "Role-specific high-level metrics and activity feed for the homepage."},
    {"name": "Platform Analytics & Reporting", "description": "Platform-wide ESG impact, time-series trends, and compliance report generation."},
]

app = FastAPI(
    title="Foodies Enterprise API",
    description=DESCRIPTION,
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan,
    contact={
        "name": "Platform Operations Support",
        "url": "https://foodies-platform.com/support",
        "email": "operations@foodies-platform.com",
    },
    license_info={"name": "Proprietary", "url": "https://foodies-platform.com/terms"},
)

# ─────────────────────────────────────────────
# Centralised Error Handling
# ─────────────────────────────────────────────
register_error_handlers(app)

# ─────────────────────────────────────────────
# OpenAPI Customization
# ─────────────────────────────────────────────
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    schema = get_openapi(
        title=app.title,
        version=app.version,
        description=app.description,
        routes=app.routes,
        tags=tags_metadata,
        contact=app.contact,
        license_info=app.license_info,
    )
    # Inject JWT Bearer security scheme
    schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
            "description": "Paste your JWT token here. Obtain it from `/auth/login`.",
        }
    }
    # Apply security globally to every route except health and auth
    for path, path_item in schema.get("paths", {}).items():
        for method, operation in path_item.items():
            if not any(path.startswith(f"{settings.API_V1_STR}/{p}") for p in ["auth", "health"]):
                operation.setdefault("security", [{"BearerAuth": []}])
    app.openapi_schema = schema
    return app.openapi_schema

app.openapi = custom_openapi

# ─────────────────────────────────────────────
# Middleware Stack
# ─────────────────────────────────────────────
app.add_middleware(JWTLoggingMiddleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─────────────────────────────────────────────
# Router Inclusion
# ─────────────────────────────────────────────
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(providers.router)
app.include_router(ngos.router)
app.include_router(food.router)
app.include_router(claims.router)
app.include_router(dashboard.router)
app.include_router(analytics.router)

@app.on_event("startup")
async def print_routes():
    for route in app.routes:
        print(f"Route: {getattr(route, 'path', 'N/A')} [{getattr(route, 'methods', 'N/A')}]")

