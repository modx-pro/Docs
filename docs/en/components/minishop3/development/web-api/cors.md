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

`OPTIONS` requests do not consume the quota.

| Setting | Default | What it sets |
| --- | --- | --- |
| `ms3_rate_limit_max_attempts` | 60 | Number of requests in the window |
| `ms3_rate_limit_decay_seconds` | 60 | Window length in seconds |

`ms3_rate_limit_store` picks the counter storage (default `file`). The installer also creates the redis and memcached keys and the file path next to it. The error body is described in [Errors](errors).

## Nuxt on another origin

1. List the frontend origin (or BFF) in `ms3_cors_allowed_origins`.
2. Requests with `credentials: 'include'` or Bearer without cookie.
3. Do not set `*` together with a cookie session: with that value a cookie from another origin will not work.
