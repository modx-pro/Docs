---
title: Errors
description: RFC 9457 problem+json and mxHeadless error codes
---

# Errors

Failed requests return [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457) (`application/problem+json`). No `{data, meta}` wrapper.

## Format

```json
{
  "type": "https://mxheadless.dev/problems/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Authentication required",
  "instance": "/api/v1/resources",
  "code": "token_required"
}
```

| Field | Role |
| --- | --- |
| `type` | Category URI |
| `title` | Short title |
| `status` | HTTP code |
| `detail` | Production-safe text |
| `instance` | Request path |
| `code` | Stable code for clients |
| `errors` | Optional: field errors |

## Codes

| `code` | HTTP | When |
| --- | --- | --- |
| `service_disabled` | 503 | `mxheadless_enabled=false` |
| `token_required` | 401 | No credentials |
| `invalid_token` | 401 | Invalid / expired / revoked |
| `scope_denied` | 403 | Missing scope |
| `rate_limited` | 429 | Rate limit |
| `idempotency_conflict` | 409 | Idempotency-Key conflict |
| `invalid_grant` | 400 | OAuth rejected |

Not every error has a `code`. For generic handling, use `status` + `type`.

## HTTP

| Code | When |
| --- | --- |
| 400 | Unsupported media type |
| 401 / 403 | Auth |
| 404 | Route or entity |
| 405 | Method |
| 422 | Validation, unknown filter/field/sort |
| 429 | Rate limit |
| 500 | Server |
| 503 | Kill switch |

When `mxheadless_debug=false`, responses omit SQL, stack traces, and file paths.
