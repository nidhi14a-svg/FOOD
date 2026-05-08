# Architecture

The Food Waste Management Platform is a modern web application built on a decoupled client-server architecture.

## 1. Backend Service (FastAPI)
The backend is an asynchronous Python service built using FastAPI. It is designed to be lightweight, performant, and easily scalable.

- **Framework**: FastAPI (async).
- **Database Engine**: MongoDB via `motor` asynchronous driver.
- **Routing**: Separated via `APIRouter` into domain-driven modules (`auth.py`, `food.py`, `claim.py`, `analytics.py`, `notifications.py`).
- **Security**: Stateless JSON Web Tokens (JWT) are used for authentication. Password hashing uses raw `bcrypt` for compatibility.
- **Dependency Injection**: Role-based access control (RBAC) is enforced at the router level via FastAPI `Depends()` mechanisms.

## 2. Frontend Application (React)
The client interface is a Single Page Application (SPA) built with React.

- **Framework**: React.js
- **Routing**: `react-router-dom` handles client-side page transitions.
- **State Management**: React Hooks (`useState`, `useEffect`) manage localized component state.
- **Styling**: Vanilla CSS leveraging modern features like CSS Variables, Grid/Flexbox layouts, and glassmorphism UI patterns (`App.css`).
- **API Integration**: Encapsulated service layer (`services/api.jsx`) abstracts `fetch` calls and manages `sessionStorage` token caching.

## 3. Deployment
- The system uses lightweight shell scripts (`setup.sh`, `run_backend.sh`, `run_frontend.sh`) for cross-platform local development.

## 4. Key Workflows
- Providers add surplus food entries (verified via Auth tokens).
- The AI Engine (`prioritizer.py`) computes a priority score based on quantity, expiry, and location.
- NGOs query listings sorted by priority and create Claims.
- Finalization endpoints complete the food lifecycle.
