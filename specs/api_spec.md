# API Specification

## Authentication

### POST /auth/register
- Request JSON:
  - `name`: string
  - `email`: string
  - `password`: string
  - `role`: string (`admin`, `provider`, `ngo`)
- Response JSON:
  - `id`: string
  - `name`: string
  - `email`: string
  - `role`: string
  - `access_token`: string
  - `token_type`: string

### POST /auth/login
- Request JSON:
  - `email`: string
  - `password`: string
- Response JSON:
  - `access_token`: string
  - `token_type`: string
  - `user`: object

## Food Management

### POST /food/add
- Auth: provider or admin
- Request JSON:
  - `provider_id`: string
  - `title`: string
  - `description`: string
  - `quantity`: integer
  - `type`: string
  - `expiry`: string (ISO 8601)
  - `location`: string
- Response JSON:
  - `id`: string
  - `status`: string
  - `created_at`: string

### GET /food/list
- Auth: any authenticated user
- Query params:
  - `status`: string (optional)
  - `type`: string (optional)
  - `location`: string (optional)
- Response JSON:
  - `items`: array of food objects

### POST /food/{food_id}/complete
- Auth: provider or admin
- Response JSON:
  - `id`: string
  - `status`: `Completed`

## Claim / Reservation

### POST /claim
- Auth: NGO
- Request JSON:
  - `food_id`: string
  - `ngo_id`: string
  - `requested_quantity`: integer
- Response JSON:
  - `claim_id`: string
  - `status`: string
  - `food_id`: string
  - `ngo_id`: string

### GET /claim/list
- Auth: authenticated user
- Query params:
  - `ngo_id`: string (optional)
  - `provider_id`: string (optional)
- Response JSON:
  - `claims`: array of claim objects

### POST /claim/{claim_id}/complete
- Auth: provider or admin
- Response JSON:
  - `claim_id`: string
  - `status`: string

## Analytics

### GET /analytics/summary
- Auth: admin/provider
- Response JSON:
  - `meals_saved`: integer
  - `total_food_items`: integer
  - `active_claims`: integer
  - `expired_items`: integer
  - `top_priority_items`: array

## Notifications

### GET /notifications
- Auth: authenticated user
- Response JSON:
  - `notifications`: array of notification objects

## Response conventions

- Success: HTTP 200 or 201
- Error: HTTP 400, 401, 403, 404, or 500 with `detail` field
- Auth header: `Authorization: Bearer <token>`
