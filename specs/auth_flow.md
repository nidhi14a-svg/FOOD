# Authentication Flow

## JWT Lifecycle

1. User submits credentials to `/auth/login`.
2. Backend validates email and password against stored hash.
3. Backend generates JWT with payload:
   - `sub`: user id
   - `email`: user email
   - `role`: user role
   - `exp`: expiration timestamp
4. JWT is returned to client as `access_token`.
5. Client stores token in memory or secure storage and sends it on each request in `Authorization: Bearer <token>` header.
6. Backend middleware verifies token signature and expiration before every protected endpoint.
7. If the token expires, the client must prompt the user to log in again.

## Signup / Login Flow

- `POST /auth/register`
  - Accepts role-aware user data
  - Stores secure hashed password
  - Returns access token and initial user metadata

- `POST /auth/login`
  - Validates credentials
  - Responds with user object and access token

## Role Authorization

Routes are protected based on user role:
- `admin`: full access to all analytics, food lifecycle, and claim completion.
- `provider`: create food, list provider items, complete food and claims.
- `ngo`: view available food, create claims, track claim status.

## Token Storage Guidelines

- Store token in client-side memory or session storage for security.
- Avoid persistent local storage for production; use secure cookies for real deployments.
- Attach token to every API request using `Authorization` header.
