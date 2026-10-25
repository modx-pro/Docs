---
title: CORS and rate limit
description: "ms3_cors_allowed_origins, credentials, and Web API rate limit"
---

# CORS and rate limit

Settings in namespace `minishop3`: [System settings → API](/en/components/minishop3/settings#api).

## CORS

| `ms3_cors_allowed_origins` value | Behavior |
| --- | --- |
| empty (this is what the installer writes) | Same-origin only: CORS headers are not set |
| `*` | `Access-Control-Allow-Origin: *`, credentials are turned off |
| comma-separated list | The server echoes the request Origin and adds `Vary: Origin` and `Allow-Credentials: true` |

`web.php` creates `CorsMiddleware` with `allow_credentials => true`.

Allowed methods: GET, POST, PUT, DELETE, OPTIONS. Allowed headers: `Content-Type`, `Authorization`, `X-Requested-With`, `MS3TOKEN`. `max_age` is 86400.

In a pattern such as `https://*.example.com` the asterisk replaces one DNS label, not an arbitrary part of the address.

OPTIONS preflight returns 200 without token mint.

## Rate limit

Over the quota:

```http
HTTP/1.1 429 Too Many Requests
Retry-After: 42
```

```json
{
  "success": false,
  "message": "ms3_err_rate_limit",
  "code": 429,
  "errors": null,
  "error_code": "rate_limited"
}
```

`Retry-After` is sent only with a 429. `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` go out on requests that are still inside the window. The bucket is counted per IP, and `OPTIONS` does not consume the quota.

| Setting | Default | What it sets |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Number of requests in the window |
| `ms3_rate_limit_decay_seconds` | 60 | Window length in seconds |

`ms3_rate_limit_store` picks the counter storage (default `file`). The installer also creates the redis and memcached keys and the file path next to it. The error body is described in [Errors](errors).

## Nuxt on another origin

1. List the frontend origin (or BFF) in `ms3_cors_allowed_origins`.
2. Requests with `credentials: 'include'` or Bearer without cookie.
3. Do not set `*` together with a cookie session: with that value a cookie from another origin will not work.
