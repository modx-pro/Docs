---
title: Web API
description: "MiniShop3 Web API overview: api.php, envelope, and middleware"
---

# Web API

Frontend and headless entry point:

```text
/assets/components/minishop3/api.php?route=/api/v1/{path}
```

The `route` parameter is required. The `/api/v1` group runs three middleware layers: CORS → RateLimit → ServiceCheck. `TokenMiddleware` is not applied to the whole group; it is attached to cart, order, and part of customer.

One exception is the `OPTIONS` preflight: no route matches that method, so the router runs **only** the `CorsMiddleware` layers. RateLimit, ServiceCheck, `TokenMiddleware` and the handler itself are skipped.

Manager API (`connector.php`) is not documented on this page.

## Envelope

With an empty `route` the server answers 400 before the router runs:

```json
{
  "success": false,
  "message": "Route parameter is required",
  "code": 400
}
```

The second pre-router response is the emergency one. Any unhandled exception inside `api.php` produces a 500 of the same shape, with `message: "Internal server error"`. Neither has `errors` or `error_code`: those are added by the router, which the request never reached.

::: danger The MODX `debug` setting exposes the stack trace
With the MODX `debug` system setting on, the emergency response body gains a `debug` key holding the exception class, the message, the file, the line and the full stack trace. On a live site that goes to anyone who triggers a 500 — keep `debug` off.
:::

A router response carries `success`, `message` and `data`. An error adds `code`, `errors` and `error_code`.

**Success.** `message` is most often `null`: the catalog and account controllers do not pass it. An empty string arrives where the calling code passed `''`, for example `GET /customer/token/get`. Cart and order routes return the lexicon entry of the operation: `GET /cart/get` answers with `Cart data retrieved`.

```json
{
  "success": true,
  "message": null,
  "data": {}
}
```

**Error:**

```json
{
  "success": false,
  "message": "…",
  "code": 400,
  "errors": null,
  "error_code": "bad_request"
}
```

The `errors` and `error_code` keys are always present in a router response, although `errors` is often `null`. A response that never reaches the router does not have them. Details: [Errors](errors).

## Middleware

```mermaid
flowchart TD
  req["api.php?route="] --> method{"OPTIONS method?"}
  method -->|yes: preflight| corsonly["CORS layers only"]
  corsonly --> answer["Response without a handler"]
  method -->|no| cors["CORS"]
  cors --> limit["RateLimit"]
  limit --> service["ServiceCheck"]
  service --> token{"TokenMiddleware?"}
  token -->|no: catalog, health, login| handler["Handler"]
  token -->|yes, no token| mint["Guest token and cookie"]
  token -->|optional: token/get, logout| skip["No mint, no 401"]
  mint --> handler
  skip --> handler
```

| Order | Middleware | Purpose |
| --- | --- | --- |
| 1 | `CorsMiddleware` | Checks Origin against `ms3_cors_allowed_origins` |
| 2 | `RateLimitMiddleware` | Counts the request quota from `ms3_rate_limit_*` |
| 3 | `ServiceCheckMiddleware` | Checks that the MS3 services are available |
| (per route) | `TokenMiddleware` | Finds the token or issues a guest one (auto-mint) |

CORS and rate limit settings: [CORS](cors), [System settings](/en/components/minishop3/settings#api).

## Sections

1. [Authorization](auth)
2. [Endpoint map](endpoints)
3. [Catalog](catalog)
4. [Cart](cart)
5. [Checkout](checkout)
6. [Customer](customer)
7. [Errors](errors)
8. [CORS and rate limit](cors)
9. [Examples](examples)

Custom routes and FastRoute details: [API Router](/en/components/minishop3/development/routing).
