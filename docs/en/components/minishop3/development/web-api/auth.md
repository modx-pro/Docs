---
title: Web API authorization
description: "MiniShop3 token: cookie, Bearer, auto-mint, login, me, refresh"
---

# Authorization

Web API does not use the MODX manager session. The client sends a customer API token (guest or authenticated).

## Resolve order

`TokenService::resolveTokenFromRequest()`:

1. `Authorization: Bearer {token}`
2. `MS3TOKEN` header (legacy)
3. httpOnly cookie `ms3_token`
4. `$_REQUEST['ms3_token']` (after cookie inject middleware)
5. `$_SESSION['ms3']['customer_token']`

Query parameters `token` and `ms3_token` are stripped and not accepted as credentials. Do not copy old examples with `?ms3_token=` in the URL.

## Cookie vs Bearer

| Mode | How to send | When |
| --- | --- | --- |
| Same-site storefront | cookie `ms3_token` + `credentials: 'include'` | Browser on the same site |
| Nuxt BFF / mobile | `Authorization: Bearer` | Different origin or server proxy |

Do not store the API token in `localStorage`: since 1.6 the main browser approach is an httpOnly cookie. Same-origin storefront JS: [Frontend JavaScript](/en/components/minishop3/development/frontend-js).

The cookie inherits MODX session parameters: `session_cookie_domain`, `session_cookie_path`, `session_cookie_secure`, `session_cookie_samesite`.

## Auto-mint

On routes with `TokenMiddleware` (cart, order, part of customer), without a valid token the server creates a guest token and sets a cookie. Catalog, health, and `GET /customer/token/get` do not use the middleware.

`POST /customer/logout` uses the middleware, but the path is in `publicRoutes`: no mint and no 401 without a token.

## GET /customer/token/get

Public. Returns the current or a new token.

```json
{
  "success": true,
  "message": "",
  "data": {
    "token": "…",
    "lifetime": 604800000
  }
}
```

`lifetime` is milliseconds until expiry (from `ms3_customer_token_ttl`, default 7 days → ~`604800000` for a fresh token). The internal generator has an `expires` field; it is not returned in HTTP `data`.

The server also sets an httpOnly cookie.

## Login / register

`POST /customer/login` and `POST /customer/register` run without TokenMiddleware. JSON body: `email`, `password` (+ registration fields).

After success the server rotates the token (fixation protection): the old guest token is revoked, the cart draft moves to the customer session, the new token goes into the cookie.

For cart binding on headless login, pass the current guest token via Bearer or cookie before the call.

## GET /customer/me

`TokenMiddleware` + auto-mint. The response is built from the current token: `authenticated`, `customer` (or `null`), token metadata (`expires_at`, `customer_id`). Invalid token → 401.

## POST /customer/token/refresh

Rotation: requires a valid token. Success returns a new token and metadata (`expires_at`, `customer_id`).

## CORS and credentials

For cookies from another origin, set explicit origins in `ms3_cors_allowed_origins` and use `credentials: 'include'`. The value `*` is incompatible with credentials: see [CORS](cors).

## See also

- [Endpoint map](endpoints)
- [Examples](examples)
- [Customer](customer)
