---
title: CORS and rate limit
description: "ms3_cors_allowed_origins, credentials, and Web API rate limit"
---

# CORS and rate limit

Settings in namespace `minishop3`: [System settings → API](/en/components/minishop3/settings#api).

## CORS

`web.php` creates `CorsMiddleware` with `allow_credentials => true`. Origins come from `ms3_cors_allowed_origins` (transport default: empty string).

| Setting value | Behavior |
| --- | --- |
| empty | Same-origin only: no CORS headers |
| `*` | `Access-Control-Allow-Origin: *`. Credentials disabled (`CorsConfig` forces `allow_credentials=false`) |
| comma-separated list | Echo Origin + `Vary: Origin` + `Allow-Credentials: true` |

With `*`, cookies from Nuxt on another origin will not work. Use explicit origins and `credentials: 'include'` on the client.

Allowed methods: GET, POST, PUT, DELETE, OPTIONS. Headers: `Content-Type`, `Authorization`, `X-Requested-With`, `MS3TOKEN`. `max_age` 86400.

Pattern like `https://*.example.com` matches one DNS label, not arbitrary `.*`.

OPTIONS preflight returns 200 without token mint.

## Rate limit

| Key | Default | Meaning |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Requests |
| `ms3_rate_limit_decay_seconds` | 60 | Window |

Exceeded → HTTP 429, `error_code` `rate_limited`. See [Errors](errors).

## Nuxt on another origin

1. List the frontend origin (or BFF) in `ms3_cors_allowed_origins`.
2. Requests with `credentials: 'include'` or Bearer without cookie.
3. Do not use `*` together with a cookie session.
