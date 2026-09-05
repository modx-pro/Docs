---
title: REST API
---
# REST API

MiniShop3 Web API (`api.php`) serves the storefront and headless clients: cart, checkout, customer account, public catalog. Manager API (`connector.php`) is separate, under a MODX session for the Vue admin.

Storefront route source: `core/components/minishop3/config/routes/web.php`. Custom: `core/config/ms3_routes_web.custom.php`, add-on fragments: `core/config/ms3.routes.d/web/*.php`.

## Entry points

| Purpose | URL | Authorization |
| --- | --- | --- |
| Web API (storefront / headless) | `/assets/components/minishop3/api.php` | Token: `ms3_token` cookie, `Authorization: Bearer`, legacy `MS3TOKEN` |
| Manager API (manager) | `/assets/components/minishop3/connector.php` | MODX session |

This page documents the **Web API**. Manager REST: [Backend API](/en/components/minishop3/development/backend-api/), [Routing](/en/components/minishop3/development/routing).

## Base URL

```
/assets/components/minishop3/api.php?route=/api/v1/{endpoint}
```

All requests pass the route via the `route` parameter. For cookie tokens use `credentials: 'include'`. CORS and rate limit use `ms3_cors_*` and `ms3_rate_limit_*` ([System settings](/en/components/minishop3/settings#api)).

## Endpoint map

Source: `config/routes/web.php`. The `/api/v1` group always runs CORS, rate limit, and ServiceCheck.

| Method | Path | Token |
| --- | --- | --- |
| `POST` | `/cart/add` | guest |
| `POST` | `/cart/remove` | guest |
| `POST` | `/cart/change` | guest |
| `POST` | `/cart/change-option` | guest |
| `GET` | `/cart/get` | guest |
| `POST` | `/cart/clean` | guest |
| `GET` | `/order/get` | guest |
| `POST` | `/order/add` | guest |
| `POST` | `/order/set` | guest |
| `POST` | `/order/remove` | guest |
| `POST` | `/order/submit` | guest |
| `POST` | `/order/clean` | guest |
| `GET` | `/order/cost` | guest |
| `GET` | `/order/cost/cart` | guest |
| `GET` | `/order/cost/delivery` | guest |
| `GET` | `/order/cost/payment` | guest |
| `POST` | `/order/address/set` | guest |
| `POST` | `/order/address/clean` | guest |
| `GET` | `/order/delivery/validation-rules` | guest |
| `GET` | `/order/delivery/required-fields` | guest |
| `POST` | `/customer/login` | none |
| `POST` | `/customer/register` | none |
| `POST` | `/customer/logout` | authorized |
| `POST` | `/customer/forgot-password` | none |
| `POST` | `/customer/reset-password` | none |
| `POST` | `/customer/add` | authorized |
| `GET` | `/customer/token/get` | none |
| `GET` | `/customer/addresses` | authorized |
| `GET` | `/customer/addresses/{id}` | authorized |
| `POST` | `/customer/addresses` | authorized |
| `PUT` | `/customer/addresses/{id}` | authorized |
| `DELETE` | `/customer/addresses/{id}` | authorized |
| `PUT` | `/customer/addresses/{id}/set-default` | authorized |
| `PUT` | `/customer/profile` | authorized |
| `POST` | `/customer/changeAddress` | guest |
| `POST` | `/customer/email/resend-verification` | authorized |
| `GET` | `/customer/email/verify` | none |
| `GET` | `/customer/orders` | authorized |
| `GET` | `/customer/orders/{id}` | authorized |
| `POST` | `/customer/orders/{id}/cancel` | authorized |
| `GET` | `/product/get/{id}` | none |
| `GET` | `/product/list` | none |
| `GET` | `/health` | none |

“Guest” token: `GET /customer/token/get` (cart and order draft). “Authorized”: after `login` / `register`.

Programmatic order creation without an HTTP session (extras/cron) is **not** Web HTTP. See [ProgrammaticOrderService](/en/components/minishop3/development/backend-api/order#programmatic-order-creation-programmaticorderservice).

## Authorization

### Getting a token

Before working with the cart and orders you need to get a client token:

```http
GET /api/v1/customer/token/get
```

**Response:**

```json
{
  "success": true,
  "data": {
    "token": "abc123def456..."
  },
  "message": ""
}
```

### Token storage (httpOnly cookie)

As of v1.6, the token is stored in an httpOnly cookie `ms3_token`. The server sets the cookie when the token is obtained or refreshed.

::: info Security
The httpOnly cookie is not accessible from JavaScript, which protects the token from XSS. The browser sends the cookie with every request.
:::

**Token resolution order on the server (TokenMiddleware):**

1. `Authorization: Bearer {token}` header (for mobile apps)
2. `HTTP_MS3TOKEN` header (legacy)
3. httpOnly cookie `ms3_token` (primary for web)

The cookie is configured using MODX session parameters: `session_cookie_domain`, `session_cookie_path`, `session_cookie_secure`, `session_cookie_samesite`.

## Response format

All responses use a single format:

**Success:**

```json
{
  "success": true,
  "data": { ... },
  "message": "Success message"
}
```

**Error:**

```json
{
  "success": false,
  "message": "Error description",
  "code": 400
}
```

## Cart

### Add product

```http
POST /api/v1/cart/add
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | int | Yes | Product ID |
| `count` | int | No | Quantity (default 1) |
| `options` | object | No | Product options (color, size, etc.) |
| `render` | array | No | Snippet tokens for SSR |

**Request example:**

```javascript
fetch('/assets/components/minishop3/api.php?route=/api/v1/cart/add&ms3_token=' + token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        id: 123,
        count: 2,
        options: {
            color: 'Red',
            size: 'XL'
        }
    })
})
```

**Response:**

```json
{
  "success": true,
  "data": {
    "last_key": "123_a1b2c3d4",
    "cart": [
      {
        "key": "123_a1b2c3d4",
        "id": 123,
        "count": 2,
        "price": 1500,
        "cost": 3000,
        "weight": 0.5,
        "options": {"color": "Red", "size": "XL"},
        "name": "Product",
        "thumb": "/assets/images/product.jpg"
      }
    ],
    "status": {
      "total_count": 2,
      "total_cost": 3000,
      "total_weight": 1.0,
      "total_positions": 1
    }
  },
  "message": "Product added to cart"
}
```

### Change quantity

```http
POST /api/v1/cart/change
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `product_key` | string | Yes | Unique product key in cart |
| `count` | int | Yes | New quantity |

**Example:**

```json
{
  "product_key": "123_a1b2c3d4",
  "count": 5
}
```

### Remove product

```http
POST /api/v1/cart/remove
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `product_key` | string | Yes | Unique product key |

### Change product options

```http
POST /api/v1/cart/change-option
```

Updates options of a cart line (the line key may change).

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `product_key` | string | Yes | Cart line key |
| `options` | object | Yes | New options (non-empty object) |

**Example:**

```json
{
  "product_key": "123_a1b2c3d4",
  "options": {
    "color": "red",
    "size": "L"
  }
}
```

### Get cart

```http
GET /api/v1/cart/get
```

**Response:**

```json
{
  "success": true,
  "data": {
    "cart": [...],
    "status": {
      "total_count": 5,
      "total_cost": 7500,
      "total_weight": 2.5,
      "total_positions": 3
    }
  }
}
```

### Clear cart

```http
POST /api/v1/cart/clean
```

## Order

### Get order draft

```http
GET /api/v1/order/get
```

**Response:**

```json
{
  "success": true,
  "data": {
    "order": {
      "id": 0,
      "delivery_id": 1,
      "payment_id": 1,
      "order_comment": "",
      "cart_cost": 1500,
      "delivery_cost": 300,
      "cost": 1800,
      "address_email": "user@example.com",
      "address_phone": "+79991234567",
      "address_first_name": "John",
      "address_last_name": "Doe",
      "address_city": "Moscow",
      "address_street": "Main St",
      "address_comment": ""
    }
  }
}
```

`data` contains only the `order` object (`msOrder` fields + address with `address_` prefix). This endpoint does not return delivery or payment method lists.

### Add/update field

```http
POST /api/v1/order/add
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | Yes | Field name |
| `value` | mixed | Yes | Value |

**Available fields:**

| Field | Description |
| --- | --- |
| `email` | Email (written to address) |
| `phone` | Phone (address) |
| `first_name` | First name (address) |
| `last_name` | Last name (address) |
| `delivery_id` | Delivery method ID |
| `payment_id` | Payment method ID |
| `order_comment` | Order comment (`msOrder`) |
| `comment` | Address comment (`msOrderAddress`) |
| `city` | City |
| `street` | Street |
| `building` | Building |
| `room` | Apartment/office |
| `index` | Postal code |
| `address_hash` | Saved address hash |

In `add` / `set`, address keys have no prefix (`city`, `first_name`). In the `order/get` response the same fields arrive as `address_city`, `address_first_name`.

**Example:**

```json
{
  "key": "email",
  "value": "user@example.com"
}
```

### Set multiple fields

```http
POST /api/v1/order/set
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `fields` | object | Yes | Object with fields |

**Example:**

```json
{
  "fields": {
    "email": "user@example.com",
    "phone": "+79991234567",
    "first_name": "John",
    "delivery_id": 1,
    "payment_id": 2,
    "order_comment": "Call before delivery"
  }
}
```

If any field fails, the response is `success: false`, message `ms3_order_err_validation`, and `data`:

```json
{
  "order": { },
  "errors": {
    "email": "…",
    "delivery_id": "…"
  }
}
```

Each field still goes through `add()` and events `msOnBeforeAddToOrder` / `msOnAddToOrder`. `set()` only aggregates errors.

### Remove field

```http
POST /api/v1/order/remove
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | Yes | Field name |

### Submit order

```http
POST /api/v1/order/submit
```

**Response (success):**

```json
{
  "success": true,
  "data": {
    "order_id": 15,
    "order_num": "24/12-15",
    "redirect_url": "/thank-you?msorder=15"
  },
  "message": "Order submitted successfully"
}
```

**Response (validation error):**

```json
{
  "success": false,
  "message": "Fill required fields",
  "data": {
    "errors": {
      "email": "Enter email",
      "phone": "Enter phone"
    }
  },
  "code": 400
}
```

### Clear order

```http
POST /api/v1/order/clean
```

## Cost

### Total cost

```http
GET /api/v1/order/cost
```

**Response:**

```json
{
  "success": true,
  "data": {
    "cart_cost": 5000,
    "delivery_cost": 300,
    "payment_cost": 0,
    "total_cost": 5300,
    "discount": 0
  }
}
```

### Cart cost

```http
GET /api/v1/order/cost/cart
```

### Delivery cost

```http
GET /api/v1/order/cost/delivery
```

### Payment fee

```http
GET /api/v1/order/cost/payment
```

## Delivery addresses

### Set saved address

```http
POST /api/v1/order/address/set
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `address_hash` | string | Yes | Address MD5 hash |

### Clear address

```http
POST /api/v1/order/address/clean
```

## Delivery validation

### Validation rules

```http
GET /api/v1/order/delivery/validation-rules
```

**Response:**

```json
{
  "success": true,
  "data": {
    "city": {"required": true, "min": 2},
    "street": {"required": true},
    "building": {"required": true},
    "phone": {"required": true, "pattern": "^\\+?[0-9]+$"}
  }
}
```

### Required fields

```http
GET /api/v1/order/delivery/required-fields
```

**Response:**

```json
{
  "success": true,
  "data": ["city", "street", "building", "phone"]
}
```

## Customer

### Registration

```http
POST /api/v1/customer/register
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | Email |
| `password` | string | Yes | Password |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `phone` | string | No | Phone |
| `privacy_accepted` | bool | Depends on settings | Data processing consent |

The controller passes only these fields to the processor. `password_confirm` is not used for Web API registration (it is required for `reset-password`).

**Response:**

```json
{
  "success": true,
  "object": {
    "customer": {
      "id": 5,
      "email": "user@example.com",
      "first_name": "John",
      "last_name": "Doe",
      "phone": "+79991234567",
      "email_verified": false
    },
    "token": "abc123def456...",
    "expires_at": "2026-03-16 12:34:56",
    "email_verification_required": false,
    "redirect_url": ""
  },
  "message": "Registration successful"
}
```

::: warning Breaking change (v1.6)
Registration response format changed:

- **Before** (v1.5): `token` — object `{token: "...", expires_at: "..."}`
- **After** (v1.6): `token` — string, `expires_at` at top level

Custom themes that use `result.object.token.token` should switch to `result.object.token`.
:::

### Login

```http
POST /api/v1/customer/login
```

**Parameters:**

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | Email |
| `password` | string | Yes | Password |

**Response:**

```json
{
  "success": true,
  "data": {
    "customer_id": 5,
    "token": "session_token_xyz789",
    "expires_at": "2026-08-19 12:00:00",
    "customer": {
      "id": 5,
      "email": "user@example.com",
      "first_name": "John"
    }
  }
}
```

::: warning Token rotation
After `login` / `register` / successful `email/verify`, the server always issues a **new** API token (`AuthManager::establishCustomerSession`). The old guest or previous `ms3_token` cookie is revoked. The cart draft moves to the new token (`transferDraftToToken` / `bindDraftToCustomer`), then `session_regenerate_id(true)`.

A headless client must persist the new `token` / `expires_at` from the response. On a storefront with an httpOnly cookie, the browser updates the cookie itself.

```javascript
const res = await fetch('/api/v1/customer/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'ms3-token': guestToken, // current guest token
  },
  body: JSON.stringify({ email, password }),
})
const json = await res.json()
if (!json.success) throw new Error(json.message)

// Replace the token for all subsequent requests
const { token, expires_at, customer_id } = json.data
localStorage.setItem('ms3_token', token)
localStorage.setItem('ms3_token_expires', expires_at)
```

:::

### Logout

```http
POST /api/v1/customer/logout
```

Requires an authorized token. Ends the customer session.

### Forgot password

```http
POST /api/v1/customer/forgot-password
```

No token required. Rate limit per email (1 request / 5 minutes).

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `email` | string | Yes | Customer email |

The response stays success-shaped for UX (does not reveal whether the account exists). Email is sent only if the customer exists.

### Reset password

```http
POST /api/v1/customer/reset-password
```

No auth token required (reset token comes from the email).

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `token` | string | Yes | Token from email |
| `password` | string | Yes | New password |
| `password_confirm` | string | Yes | Password confirmation |

### Update profile

```http
PUT /api/v1/customer/profile
```

Requires authorization (authenticated customer token).

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `phone` | string | Phone |

### Quick profile field update

```http
POST /api/v1/customer/add
```

Requires authorization. Updates one `msCustomer` field (`key` + `value`). Allowed editable keys come from the xPDO map (with a denylist of system fields). Changing `email` resets `email_verified_at`.

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | Yes | Field name |
| `value` | mixed | Yes | New value |

### Select saved address in draft

```http
POST /api/v1/customer/changeAddress
```

Requires a guest token. Same as `POST /order/address/set`: applies an address by `address_hash` (legacy `value` is also accepted).

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `address_hash` | string | Yes | Customer address hash |

### Email verification

```http
GET /api/v1/customer/email/verify?token=verification_token
```

### Resend verification

```http
POST /api/v1/customer/email/resend-verification
```

Requires authorization.

## Customer addresses

All endpoints require authorization.

### List addresses

```http
GET /api/v1/customer/addresses
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hash": "abc123...",
      "city": "Moscow",
      "street": "Main St",
      "building": "10",
      "room": "5",
      "is_default": true
    }
  ]
}
```

### Get address

```http
GET /api/v1/customer/addresses/{id}
```

### Create address

```http
POST /api/v1/customer/addresses
```

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `city` | string | City |
| `street` | string | Street |
| `building` | string | Building |
| `room` | string | Apartment/office |
| `index` | string | Postal code |
| `country` | string | Country |
| `region` | string | Region |
| `is_default` | bool | Default address |

### Update address

```http
PUT /api/v1/customer/addresses/{id}
```

### Delete address

```http
DELETE /api/v1/customer/addresses/{id}
```

### Set default address

```http
PUT /api/v1/customer/addresses/{id}/set-default
```

## Customer orders

Requires an **authorized** customer token. Drafts are not returned in the list or detail.

### Order list

```http
GET /api/v1/customer/orders?limit=20&offset=0&status=2
```

| Parameter | Type | Description |
| --- | --- | --- |
| `limit` | int | Page size (default 20, max 100) |
| `offset` | int | Offset |
| `status` | int | Filter by `status_id`. Draft and invalid IDs are ignored |

**Response `data`:**

```json
{
  "orders": [
    {
      "id": 15,
      "uuid": "...",
      "num": "2603/1",
      "cost": 3500,
      "status_id": 2,
      "status_name": "New",
      "can_cancel": true
    }
  ],
  "total": 1,
  "limit": 20,
  "offset": 0
}
```

### Order detail

```http
GET /api/v1/customer/orders/{id}
```

Returns the customer order with products and related entities. `404` if the order belongs to someone else, is missing, or is a draft.

### Cancel order

```http
POST /api/v1/customer/orders/{id}/cancel
```

Cancels the order if the current status is in `ms3_customer_cancel_allowed_statuses`.

**Response (success):**

```json
{
  "success": true,
  "message": "Order canceled",
  "data": {
    "order_id": 15,
    "status_id": 5
  }
}
```

Errors: `400` (status not allowed), `404` (not found), `401` (unauthorized).

**Related settings:**

| Setting | Description |
| --- | --- |
| `ms3_customer_cancel_allowed_statuses` | Status IDs for which cancellation is allowed (default `2,3`) |
| `ms3_status_canceled` | Target status ID for canceled orders |

## Product catalog

Public endpoints. **No token required.** Only published, non-deleted, non-`hidemenu` products in the requested (or current) context are returned.

`ProductCatalogService` builds the response and **trims** it with an allowlist of resource and `msProductData` fields. A plugin on `msOnGetProductFields` can change values of existing keys but cannot add arbitrary fields to the catalog JSON. For a headless storefront without msProducts see also [Catalog](/en/components/minishop3/frontend/catalog).

### Single product

```http
GET /api/v1/product/get/{id}
```

| Path parameter | Description |
| --- | --- |
| `id` | Product resource ID |

`400` without id, `404` if the product is missing or not public.

### Product list

```http
GET /api/v1/product/list?parent=5&limit=20&page=1&sort=price&dir=ASC
```

| Parameter | Type | Description |
| --- | --- | --- |
| `parent` / `category` | int | Parent category ID (resource primary parent) |
| `limit` | int | Default 20, max 100 |
| `offset` | int | Offset. Alternative: `page` (from 1) |
| `page` | int | Page number when `offset` is omitted |
| `sort` | string | `id`, `pagetitle`, `menuindex`, `createdon`, `publishedon`, `price`, `article` |
| `dir` / `sortdir` | string | `ASC` or `DESC` |
| `query` | string | Search by `pagetitle` / `article` |
| `context` | string | MODX context key |
| `include_options` | 0 / 1 | Include options (default 0) |
| `include_content` | 0 / 1 | Include `content` (default 0) |

**Response `data`:**

```json
{
  "items": [ { "id": 10, "pagetitle": "Product", "price": 1500 } ],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

## Health Check

```http
GET /api/v1/health
```

**Response:**

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "version": "1.0.0",
    "timestamp": 1703952000,
    "api": "web"
  }
}
```

## Middleware

### CORS

Configured via system setting `ms3_cors_allowed_origins`:

- `*` — allow all domains
- `https://example.com,https://shop.example.com` — list of domains

### Rate Limiting

Abuse protection via system settings:

- `ms3_rate_limit_max_attempts` — max requests (default 60)
- `ms3_rate_limit_decay_seconds` — period in seconds (default 60)
- `ms3_rate_limit_store` — counter store: `file`, `redis`, `memcached` (default `file`)
- `ms3_rate_limit_storage_path` — directory for `file` (empty = system temp)
- `ms3_rate_limit_redis_dsn` — Redis DSN (overrides host/port when set)
- `ms3_rate_limit_redis_host` / `ms3_rate_limit_redis_port` / `ms3_rate_limit_redis_password` / `ms3_rate_limit_redis_database`
- `ms3_rate_limit_memcached_servers` — Memcached servers (default `127.0.0.1:11211`)

When limit is exceeded:

```json
{
  "success": false,
  "message": "Too many requests",
  "code": 429
}
```

## SSR (Server-Side Rendering)

The API supports server-side HTML rendering for updating parts of the page.

### Usage

Pass an array of snippet tokens in the `render` parameter:

```javascript
fetch('/api/v1/cart/add?ms3_token=' + token, {
    method: 'POST',
    body: JSON.stringify({
        id: 123,
        render: ['ms3_abc123...', 'ms3_def456...']
    })
})
```

**Response includes HTML:**

```json
{
  "success": true,
  "data": {
    "cart": [...],
    "status": {...},
    "render": {
      "ms3_abc123...": "<div class=\"cart\">...</div>",
      "ms3_def456...": "<span class=\"count\">5</span>"
    }
  }
}
```

### Registering snippets

Tokens are generated automatically when calling snippets with the `selector` parameter:

```fenom
{'msCart' | snippet: [
    'tpl' => 'tpl.msCart',
    'selector' => '#cart-container'
]}
```

## Custom routes

To add your own endpoints create a file:

```
core/config/ms3_routes_web.custom.php
```

**Example:**

```php
<?php
use MiniShop3\Router\Response;

$router->group('/api/v1', function($router) use ($modx) {

    $router->get('/custom/endpoint', function($params) use ($modx) {
        return Response::success(['custom' => 'data']);
    });

});
```

Custom routes are loaded after system routes and can override them.

## JavaScript client

MiniShop3 provides a JavaScript library for working with the API:

```javascript
// Add to cart
await ms3.cartAPI.add(123, 2, { color: 'red' })

// Submit order
const result = await ms3.orderAPI.submit()

// Hooks
ms3Hooks.addHook('afterAddCart', async ({ response }) => {
  console.log('Product added', response.data)
})
```

See [Frontend JavaScript](frontend-js) for details.

## Error codes

| Code | Description |
| --- | --- |
| 400 | Bad request (missing parameters, validation error) |
| 401 | Authorization token required |
| 403 | Access denied |
| 404 | Resource not found |
| 429 | Too many requests |
| 500 | Internal server error |

## Debugging

Enable debug mode via the `ms3_api_debug` setting:

```json
{
  "success": false,
  "message": "Internal server error",
  "code": 500,
  "debug": {
    "exception": "Exception",
    "message": "Detailed error message",
    "file": "/path/to/file.php",
    "line": 123
  }
}
```

::: warning Security
Do not enable debug mode in production — it exposes the application's internal structure.
:::
