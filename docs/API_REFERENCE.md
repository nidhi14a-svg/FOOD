# API Reference

This document outlines the final, verified endpoints implemented in the MVP.

## Authentication

### `POST /auth/register`
- **Description**: Registers a new user (`admin`, `provider`, `ngo`).
- **Response**: `{ id, name, email, role, access_token, token_type }`

### `POST /auth/login`
- **Description**: Authenticates a user and returns a JWT.
- **Response**: `{ access_token, token_type, user: { ... } }`

---

## Food Management

### `POST /food/add`
- **Auth**: `admin`, `provider`
- **Description**: Adds a new surplus food item. Priority is calculated automatically.
- **Response**: `{ id, status, created_at }`

### `GET /food/list`
- **Auth**: Authenticated User
- **Description**: Retrieves available food, sorted by AI priority score descending.
- **Response**: `{ items: [ { id, title, quantity, priority_score, ... } ] }`

### `POST /food/{food_id}/complete`
- **Auth**: `admin`, `provider`
- **Description**: Marks food as fully handled/completed.
- **Response**: `{ id, status: "Completed" }`

---

## Claim System

### `POST /claim`
- **Auth**: `ngo`
- **Description**: Reserves a quantity of food.
- **Response**: `{ claim_id, status, food_id, ngo_id }`

### `GET /claim/list`
- **Auth**: Authenticated User
- **Description**: Lists existing claims.
- **Response**: `{ claims: [ ... ] }`

### `POST /claim/{claim_id}/complete`
- **Auth**: `admin`, `provider`
- **Description**: Marks a claim as completed.
- **Response**: `{ claim_id, status }`

---

## General

### `GET /analytics/summary`
- **Auth**: `admin`, `provider`
- **Description**: System-wide performance and priority metrics.
- **Response**: `{ meals_saved, total_food_items, active_claims, expired_items, top_priority_items }`

### `GET /notifications`
- **Auth**: Authenticated User
- **Description**: Returns unread alerts/events for the user.
- **Response**: `{ notifications: [ ... ] }`
