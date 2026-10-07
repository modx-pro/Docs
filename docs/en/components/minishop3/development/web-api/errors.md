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
| `data` | Present only when it is passed |

Error bodies always include an `errors` key (often `null`) and usually `error_code`. Validation fields arrive either in `errors` or in `data`, depending on the scenario.

## error_code values

The complete list from `ApiErrorCode` — twelve values: `validation_failed`, `unauthorized`, `token_required`, `token_expired`, `token_invalid`, `not_found`, `conflict`, `rate_limited`, `business_rule`, `bad_request`, `forbidden`, `internal_error`. The core emits no others; an add-on can send its own code through `Response::errorWithCode()`.

## HTTP

| Status | When |
| --- | --- |
| 400 | Validation, bad request |
| 401 | Token missing, expired, or invalid |
| 404 | Entity not found |
| 409 | Conflict |
| 429 | Rate limit |
| 500 | Internal error |

403 is less common on the storefront than 401 and 400.

In TypeScript, type the response as a union: success | error with `error_code` and an optional `errors`.

## Rate limit

`RateLimitMiddleware`: settings `ms3_rate_limit_max_attempts`, `ms3_rate_limit_decay_seconds`. Exceeded → 429 / `rate_limited`.

See [CORS and rate limit](cors).
