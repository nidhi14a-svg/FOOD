from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import auth, food, claim, analytics, notifications

app = FastAPI(title="Food Waste Management Platform")

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(food.router, prefix="/food", tags=["food"])
app.include_router(claim.router, prefix="/claim", tags=["claim"])
app.include_router(analytics.router, prefix="/analytics", tags=["analytics"])
app.include_router(notifications.router, prefix="/notifications", tags=["notifications"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}
