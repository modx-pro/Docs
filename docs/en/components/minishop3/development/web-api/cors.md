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

The window is fixed: it starts with the first request, `reset_at` is set once as «now plus `ms3_rate_limit_decay_seconds`» and never slides. Once the window is over, the counter resets completely.

| Header | When it is sent | What it holds |
| --- | --- | --- |
| `Retry-After` | with a 429 only | seconds until the window ends |
| `X-RateLimit-Limit` | while the request fits the quota | the value of `ms3_rate_limit_max_attempts` |
| `X-RateLimit-Remaining` | the same | how many requests are left |
| `X-RateLimit-Reset` | the same | a **Unix timestamp** of the window end, not a number of seconds |


::: warning Behind a reverse proxy the counter is shared
The bucket key is `md5()` of `REMOTE_ADDR`. The middleware deliberately ignores headers such as `X-Forwarded-For`: the client controls them, so the limit could be bypassed by forging one. If the site sits behind a reverse proxy, a CDN or a Nuxt server and the web server does not replace `REMOTE_ADDR` with the visitor address, every customer shares one bucket and hits a common limit. Configure the real address at the web-server level.
:::

`Retry-After` is sent only with a 429. `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` go out on requests that are still inside the window. The bucket is counted per IP, and `OPTIONS` does not consume the quota.

| Key | Default | Meaning |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Requests |
| `ms3_rate_limit_decay_seconds` | 60 | Window |

Exceeded → HTTP 429, `error_code` `rate_limited`. See [Errors](errors).

## Nuxt on another origin

1. List the frontend origin (or BFF) in `ms3_cors_allowed_origins`.
2. Requests with `credentials: 'include'` or Bearer without cookie.
3. Do not use `*` together with a cookie session.
