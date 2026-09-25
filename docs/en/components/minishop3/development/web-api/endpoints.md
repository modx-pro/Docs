---
title: Endpoint map
description: "Full MiniShop3 Web API table = config/routes/web.php"
---

# Endpoint map

Full path table. Source: `core/components/minishop3/config/routes/web.php`. Path prefix: `/api/v1`. Call via `api.php?route=/api/v1/...`.

Token column:

| Value | Meaning |
| --- | --- |
| none | No `TokenMiddleware` on the route |
| auto-mint | Middleware present: without a valid token the server creates a guest token |
| optional | Middleware present, path in `publicRoutes`: no mint and no 401 without a token |

Request and response bodies: [auth](auth), [catalog](catalog), [cart](cart), [checkout](checkout), [customer](customer).

## Cart

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `POST` | `/cart/add` | auto-mint | Add product |
| `POST` | `/cart/remove` | auto-mint | Remove line |
| `POST` | `/cart/change` | auto-mint | Change quantity |
| `POST` | `/cart/change-option` | auto-mint | Change line options |
| `GET` | `/cart/get` | auto-mint | Cart contents |
| `POST` | `/cart/clean` | auto-mint | Clear |

## Order

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `GET` | `/order/get` | auto-mint | Order draft |
| `POST` | `/order/add` | auto-mint | One draft field |
| `POST` | `/order/set` | auto-mint | Multiple fields |
| `POST` | `/order/remove` | auto-mint | Remove field |
| `POST` | `/order/submit` | auto-mint | Submit |
| `POST` | `/order/clean` | auto-mint | Clear draft |
| `GET` | `/order/cost` | auto-mint | Full cost |
| `GET` | `/order/cost/cart` | auto-mint | Cart cost |
| `GET` | `/order/cost/delivery` | auto-mint | Delivery cost |
| `GET` | `/order/cost/payment` | auto-mint | Payment fee |
| `POST` | `/order/address/set` | auto-mint | Address from saved |
| `POST` | `/order/address/clean` | auto-mint | Clear draft address |
| `GET` | `/order/delivery/validation-rules` | auto-mint | Delivery field rules |
| `GET` | `/order/delivery/required-fields` | auto-mint | Required fields |

## Customer

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `POST` | `/customer/login` | none | Login |
| `POST` | `/customer/register` | none | Register |
| `GET` | `/customer/me` | auto-mint | Session / token profile |
| `POST` | `/customer/logout` | optional | Logout |
| `POST` | `/customer/forgot-password` | none | Request reset |
| `POST` | `/customer/reset-password` | none | Reset via email token |
| `POST` | `/customer/add` | auto-mint | Quick profile field |
| `GET` | `/customer/token/get` | none | Guest / current API token |
| `POST` | `/customer/token/refresh` | auto-mint | Token rotation |
| `GET` | `/customer/addresses` | auto-mint | Address list |
| `GET` | `/customer/addresses/{id}` | auto-mint | Single address |
| `POST` | `/customer/addresses` | auto-mint | Create |
| `PUT` | `/customer/addresses/{id}` | auto-mint | Update |
| `DELETE` | `/customer/addresses/{id}` | auto-mint | Delete |
| `PUT` | `/customer/addresses/{id}/set-default` | auto-mint | Default address |
| `PUT` | `/customer/profile` | auto-mint | Profile |
| `POST` | `/customer/changeAddress` | auto-mint | Address into order draft |
| `POST` | `/customer/email/resend-verification` | auto-mint | Resend email |
| `GET` | `/customer/email/verify` | none | Email verification |
| `GET` | `/customer/orders` | auto-mint | Account orders |
| `GET` | `/customer/orders/{id}` | auto-mint | Order detail |
| `POST` | `/customer/orders/{id}/cancel` | auto-mint | Cancel |

Account endpoints with auto-mint need a customer on the token: otherwise the controller returns unauthorized / business error. See [Customer](customer).

## Product (public)

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `GET` | `/product/get` | none | Resolve by `alias` / `uri` |
| `GET` | `/product/get/{id}` | none | Product by ID |
| `GET` | `/product/list` | none | List / PLP |
| `GET` | `/product/filters` | none | Facets |
| `GET` | `/product/{id}/images` | none | Gallery |

## Category (public)

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `GET` | `/category/get` | none | Resolve by `alias` / `uri` |
| `GET` | `/category/get/{id}` | none | Category by ID |
| `GET` | `/category/list` | none | List |
| `GET` | `/category/tree` | none | Tree |

## Delivery / Payment (public)

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `GET` | `/delivery/get/{id}` | none | Delivery method |
| `GET` | `/delivery/list` | none | Active deliveries |
| `POST` | `/delivery/webhook/{delivery_id}` | none | Provider webhook (signature, not customer token) |
| `GET` | `/payment/get/{id}` | none | Payment method |
| `GET` | `/payment/list` | none | Active payments |

## Health

| Method | Path | Token | Purpose |
| --- | --- | --- | --- |
| `GET` | `/health` | none | API status |

Programmatic order creation from PHP (cron/extra) is not Web HTTP: [ProgrammaticOrderService](/en/components/minishop3/development/backend-api/order#programmatic-order-creation-programmaticorderservice).
