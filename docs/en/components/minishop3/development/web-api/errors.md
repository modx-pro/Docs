---
title: Web API errors
description: "MiniShop3 error envelope: code, errors, error_code, HTTP"
---

# Errors

## Shape

```json
{
  "success": false,
  "message": "…",
  "code": 400,
  "errors": null,
  "error_code": "bad_request"
}
```

| Field | Meaning |
| --- | --- |
| `code` | HTTP status |
| `errors` | Field map or `null` (key always present) |
| `error_code` | Machine code |
| `data` | Optional when passed |

Error bodies always include an `errors` key (often `null`) and usually `error_code`. Some scenarios put validation fields in `errors` or in `data`.

## Typical error_code

Examples from `Response` / `ApiErrorCode`: `validation_failed`, `unauthorized`, `token_required`, `token_expired`, `token_invalid`, `not_found`, `conflict`, `rate_limited`, `business_rule`, `bad_request`, `forbidden`, `internal_error`.

## HTTP

| Status | When |
| --- | --- |
| 400 | Validation / bad request |
| 401 | Missing / expired / invalid token |
| 404 | Entity not found |
| 409 | Conflict |
| 429 | Rate limit |
| 500 | Internal error |

403 is less common on the storefront than 401/400. TypeScript client: union success | error with `error_code` and optional `errors`.

## Rate limit

`RateLimitMiddleware`: settings `ms3_rate_limit_max_attempts`, `ms3_rate_limit_decay_seconds`. Exceeded → 429 / `rate_limited`.

See [CORS and rate limit](cors).
