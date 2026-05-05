# Data Models

## User

- `id`: string
- `name`: string
- `email`: string
- `password_hash`: string
- `role`: string (`admin`, `provider`, `ngo`)
- `created_at`: datetime
- `updated_at`: datetime

## FoodItem

- `id`: string
- `provider_id`: string
- `title`: string
- `description`: string
- `quantity`: integer
- `type`: string
- `expiry`: datetime
- `location`: string
- `status`: string (`Available`, `Claimed`, `Completed`)
- `priority_score`: float
- `created_at`: datetime
- `updated_at`: datetime

## Claim

- `id`: string
- `food_id`: string
- `ngo_id`: string
- `provider_id`: string
- `requested_quantity`: integer
- `claimed_quantity`: integer
- `status`: string (`Pending`, `Confirmed`, `Completed`)
- `created_at`: datetime
- `updated_at`: datetime

## Notification

- `id`: string
- `user_id`: string
- `title`: string
- `message`: string
- `type`: string (`info`, `success`, `warning`, `alert`)
- `created_at`: datetime
- `read`: boolean

## AnalyticsSummary

- `meals_saved`: integer
- `total_food_items`: integer
- `active_claims`: integer
- `expired_items`: integer
- `top_priority_items`: array of strings
