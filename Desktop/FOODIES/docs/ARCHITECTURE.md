# Architecture Reference

## High-Level Architecture

The platform follows a Clean Architecture design with explicit separation:

- **Presentation**: FastAPI routes and React pages.
- **Domain**: Pydantic models and business rules.
- **Application**: Services implementing core operations and AI scoring.
- **Infrastructure**: MongoDB client, authentication utilities, notification handlers.

### Backend Modules

- `backend/main.py`: FastAPI application factory and router registration.
- `backend/config.py`: Environment and database configuration.
- `backend/security.py`: JWT handling and auth dependency extraction.
- `backend/errors.py`: HTTP errors and exception translation.
- `backend/models/`: Domain models for users, food items, claims, notifications.
- `backend/routes/`: Route modules for auth, food, claim, analytics, notifications.
- `backend/services/`: Core business services and persistence orchestration.
- `backend/ai_engine/`: Prioritization logic for distribution recommendations.

## Data Flow

1. HTTP request enters FastAPI application.
2. Route handler extracts payload, headers, and auth claims.
3. Service performs domain logic and persistence operations.
4. AI engine may compute priority scores for food listings.
5. Response is returned to client.

## Deployment Considerations

- Backend runs as a FastAPI process behind a production server (e.g. Uvicorn/Gunicorn).
- MongoDB runs as a managed cluster or container.
- Frontend is a static React app served by a CDN or web server.
- Environment variables drive database connection and JWT secrets.
