---
title: REST API
---
# REST API

MiniShop3 provides a REST API for integration with the frontend and external systems.

## Entry points

| Purpose | URL | Authorization |
|---------|-----|---------------|
| Web API (frontend) | `/assets/components/minishop3/api.php` | MS3TOKEN token |
| Manager API (manager) | `/assets/components/minishop3/connector.php` | MODX session |

This documentation describes the **Web API** for the frontend.

## Base URL

```
/assets/components/minishop3/api.php?route=/api/v1/{endpoint}
```

All requests pass the route via the `route` parameter.

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

### Using the token

The token is passed in every request via the `ms3_token` parameter:

```http
POST /api/v1/cart/add?ms3_token=abc123def456...
Content-Type: application/json

{
  "id": 123,
  "count": 1
}
```

Or via the `MS3TOKEN` cookie (set automatically by the JavaScript library).

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
|-----------|------|----------|-------------|
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
|-----------|------|----------|-------------|
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
|-----------|------|----------|-------------|
| `product_key` | string | Yes | Unique product key |

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
      "email": "user@example.com",
      "phone": "+7 999 123-45-67",
      "first_name": "John",
      "delivery": 1,
      "payment": 1,
      "address_city": "Moscow",
      "address_street": "Main St",
      "comment": ""
    },
    "deliveries": [...],
    "payments": [...]
  }
}
```

### Add/update field

```http
POST /api/v1/order/add
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `key` | string | Yes | Field name |
| `value` | mixed | Yes | Value |

**Available fields:**

| Field | Description |
|-------|-------------|
| `email` | Customer email |
| `phone` | Phone |
| `first_name` | First name |
| `last_name` | Last name |
| `delivery` | Delivery method ID |
| `payment` | Payment method ID |
| `comment` | Order comment |
| `city` | City |
| `street` | Street |
| `building` | Building |
| `room` | Apartment/office |
| `index` | Postal code |
| `address_hash` | Saved address hash |

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
|-----------|------|----------|-------------|
| `fields` | object | Yes | Object with fields |

**Example:**

```json
{
  "fields": {
    "email": "user@example.com",
    "phone": "+79991234567",
    "first_name": "John",
    "delivery": 1
  }
}
```

### Remove field

```http
POST /api/v1/order/remove
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
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
|-----------|------|----------|-------------|
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
|-----------|------|----------|-------------|
| `email` | string | Yes | Email |
| `password` | string | Yes | Password |
| `first_name` | string | No | First name |
| `last_name` | string | No | Last name |
| `phone` | string | No | Phone |
| `privacy_accepted` | bool | Depends on settings | Data processing consent |

**Response:**

```json
{
  "success": true,
  "data": {
    "customer_id": 5,
    "token": "new_token_abc123"
  },
  "message": "Registration successful"
}
```

### Login

```http
POST /api/v1/customer/login
```

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `email` | string | Yes | Email |
| `password` | string | Yes | Password |

**Response:**

```json
{
  "success": true,
  "data": {
    "customer_id": 5,
    "token": "session_token_xyz789",
    "customer": {
      "id": 5,
      "email": "user@example.com",
      "first_name": "John"
    }
  }
}
```

### Update profile

```http
PUT /api/v1/customer/profile
```

**Requires authorization** (authenticated customer token)

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `phone` | string | Phone |

### Email verification

```http
GET /api/v1/customer/email/verify?token=verification_token
```

### Resend verification

```http
POST /api/v1/customer/email/resend-verification
```

**Requires authorization**

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
|-----------|------|-------------|
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

DDoS protection via system settings:

- `ms3_rate_limit_max_attempts` — max requests (default 60)
- `ms3_rate_limit_decay_seconds` — period in seconds (default 60)

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
ms3.cart.add(123, 2, {color: 'red'});

// Submit order
ms3.order.submit();

// Handle responses via hooks
ms3.hooks.add('afterAddToCart', ({response}) => {
    console.log('Product added', response.data);
});
```

See [Frontend JavaScript](frontend-js) for details.

## Error codes

| Code | Description |
|------|-------------|
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
