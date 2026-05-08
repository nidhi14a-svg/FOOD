# System Design

## Architecture Overview

The Food Waste Management Platform is designed using Clean Architecture with layered separation:

- `backend/`: FastAPI application, route controllers, services, domain models, AI prioritization, and infrastructure integration.
- `frontend/`: React SPA with pages, reusable components, and API service layer.
- `specs/`: Formal system design and API contracts.
- `docs/`: Handoff documentation and architecture reference.
- `tests/`: Unit and integration testing for backend and frontend.

### Clean Layers

- `routes/`: HTTP controllers that validate requests and delegate to services.
- `services/`: Business logic, orchestration of domain operations, and persistence access.
- `models/`: Pydantic request/response models and domain document schemas.
- `core/`: Shared infrastructure, database client, common utilities.
- `ai_engine/`: Distribution prioritization logic to recommend high-priority food items.

## Data Flow

1. Client issues request to FastAPI route.
2. Route parses request body and headers into Pydantic schemas.
3. Security layer validates JWT and role claims.
4. Route delegates to service class to execute domain operation.
5. Service uses repository-style access to MongoDB via the database client.
6. AI prioritization may score items and return sorted results.
7. Service returns domain object; route serializes response.
8. Frontend fetches API responses, stores tokens, and updates UI state.

## Flow Diagram (Text)

```
[React Frontend] --> [HTTP Request] --> [FastAPI Routes] --> [Auth/Security]
                                              |                        
                                              v                        
                                       [Service Layer]                 
                                        /         \                  
                            [MongoDB Access]   [AI Prioritizer]        
                                        \         /                  
                                         [Domain Models]              
                                              |                        
                                              v                        
                                       [HTTP Response]                
                                              |                        
                                              v                        
                                   [React State/UI render]            
```

## Key Subsystems

- Authentication: JWT issued at login, renewed per session, role-based guard for protected endpoints.
- Food lifecycle: Items transition from `Available` to `Claimed` to `Completed`.
- Claim engine: NGOs reserve food, and providers or admins can complete deliveries.
- Analytics: Aggregated counts for meals saved and waste reduction surfaced in dashboard.
- Notification: Simple notification records stored with events; can extend to email/SMS.
