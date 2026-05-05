# API Reference

## Authentication

### POST /auth/register
Creates a new user and returns an access token.

### POST /auth/login
Authenticates a registered user and returns JWT token and user details.

## Food

### POST /food/add
Adds a new food donation item for a provider.

### GET /food/list
Returns available food items, optionally filtered by status, type, or location.

### POST /food/{food_id}/complete
Marks a food item as completed after donation or pickup.

## Claim

### POST /claim
Creates a claim reservation request by an NGO for an available food item.

### GET /claim/list
Lists claims by NGO or provider filter.

### POST /claim/{claim_id}/complete
Marks a claim as completed when the collection is successfully fulfilled.

## Analytics

### GET /analytics/summary
Returns summary metrics such as meals saved, active claims, and top priority items.

## Notifications

### GET /notifications
Gets notifications relevant to the current user.

## Authorization

All protected endpoints require `Authorization: Bearer <token>`.
Role restrictions are enforced by backend dependencies.
