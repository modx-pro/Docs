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

Router responses always carry `errors` and `error_code` (`errors` is often `null`). Before the router runs — on an empty `route` — neither key is present. A validation field map arrives in `errors` with status 422 and code `validation_failed`; an empty `fields` on `order/set` and an empty cart key stay 400.

## error_code values

| `error_code` | When |
| --- | --- |
| `validation_failed` | 422, field map |
| `unauthorized` | 401, no customer where one is required |
| `token_required` | 401, a token is required and no guest token was minted |
| `token_expired` | 401, the token has expired |
| `token_invalid` | 401, the token is missing from the database or corrupted |
| `not_found` | 404 |
| `conflict` | 409 |
| `rate_limited` | 429 |
| `business_rule` | A shop rule; the status comes from the calling code |
| `bad_request` | 400 |
| `forbidden` | 403. Web API controllers never return this code |
| `internal_error` | 500 and 503 |

The core emits no other codes. An add-on can send its own through `Response::errorWithCode()`.

## HTTP

| Status | When |
| --- | --- |
| 400 | Malformed request with no field map: empty `route`, empty `fields`, empty line key |
| 401 | Token expired, invalid, or required where the server minted no guest token: `token_expired`, `token_invalid`, `token_required`, `unauthorized` |
| 404 | Entity not found |
| 409 | Conflict |
| 422 | Field map: address, profile, `validation_failed` |
| 429 | Rate limit |
| 500 | Internal error |
| 503 | The `ms3` service did not start; `error_code` is `internal_error` |

403 is set only by the Manager API permission middleware.

In TypeScript, type the response as a union: success | error with `error_code` and an optional `errors`.

## A closed draft field

Since 1.14.2-beta1 the internal columns of the order draft are closed for storefront writes. An attempt returns the `ms3_err_field_protected` lexicon entry: `POST /order/add` answers 400 with `business_rule`, `POST /order/set` answers 422 with `validation_failed` and the key in `errors`. `POST /order/remove` answers 404 `ms3_err_field_nf` on such a key, and `POST /order/submit` drops it silently.

The list of closed columns and how to extend it: see [checkout](checkout#protected-fields).

## Rate limit

`RateLimitMiddleware`: settings `ms3_rate_limit_max_attempts`, `ms3_rate_limit_decay_seconds`. Exceeded → 429 / `rate_limited`.

See [CORS and rate limit](cors).
