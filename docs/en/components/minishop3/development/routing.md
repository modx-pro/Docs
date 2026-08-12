---
title: API Router
description: FastRoute-based API routing
---
# API Router

MiniShop3 uses [FastRoute](https://github.com/nikic/FastRoute) for API request routing. The component provides two separate APIs with different authorization mechanisms.

## Architecture

### Two API types

| Parameter | Manager API | Web API |
| --- | --- | --- |
| **Prefix** | `/api/mgr/*` | `/api/v1/*` |
| **Purpose** | MODX manager | Store frontend |
| **Entry point** | `connector.php` | `assets/.../api.php` |
| **Authorization** | MODX session + HTTP_MODAUTH | MS3TOKEN tokens |
| **Middleware** | AuthMiddleware, PermissionMiddleware | TokenMiddleware, CorsMiddleware, RateLimitMiddleware |
| **Routes file** | `config/routes/manager.php` | `config/routes/web.php` |

### File structure

```
core/components/minishop3/
├── config/
│   ├── routes/
│   │   ├── manager.php                    # Manager API system routes
│   │   └── web.php                        # Web API system routes
│   ├── ms3.routes.d/
│   │   ├── manager/example-addon.php.dist # Addon example (Manager)
│   │   └── web/example-addon.php.dist     # Addon example (Web)
│   └── routes_manager.custom.example.php  # Custom routes example

core/config/
├── ms3_routes_manager.custom.php          # Custom Manager routes
├── ms3_routes_web.custom.php              # Custom Web routes
└── ms3.routes.d/                          # Modular addon routes
    ├── manager/                           # Manager API fragments
    └── web/                               # Web API fragments
```

## Basic usage

### Defining routes

```php
use MiniShop3\Router\Response;

// Simple GET route
$router->get('/api/mgr/my-endpoint', function($params) use ($modx) {
    return Response::success(['data' => 'value']);
});

// POST route
$router->post('/api/mgr/items', function($params) use ($modx) {
    $data = json_decode(file_get_contents('php://input'), true);
    return Response::success(['created' => true]);
});

// PUT route
$router->put('/api/mgr/items/{id}', function($params) use ($modx) {
    $id = $params['id'];
    return Response::success(['updated' => $id]);
});

// DELETE route
$router->delete('/api/mgr/items/{id}', function($params) use ($modx) {
    return Response::success(['deleted' => true]);
});
```

### URL parameters

```php
// Single parameter
$router->get('/api/mgr/products/{id}', function($params) use ($modx) {
    $id = $params['id'];  // Value from URL
    return Response::success(['product_id' => $id]);
});

// Multiple parameters
$router->get('/api/mgr/orders/{order_id}/products/{product_id}', function($params) use ($modx) {
    $orderId = $params['order_id'];
    $productId = $params['product_id'];
    return Response::success([
        'order_id' => $orderId,
        'product_id' => $productId
    ]);
});
```

### Route groups

```php
use MiniShop3\Router\Middleware\AuthMiddleware;
use MiniShop3\Router\Middleware\PermissionMiddleware;

$router->group('/api/mgr/catalog', function($router) use ($modx) {

    // GET /api/mgr/catalog/products
    $router->get('/products', function($params) use ($modx) {
        return Response::success(['products' => []]);
    });

    // GET /api/mgr/catalog/categories
    $router->get('/categories', function($params) use ($modx) {
        return Response::success(['categories' => []]);
    });

    // POST /api/mgr/catalog/products
    $router->post('/products', function($params) use ($modx) {
        return Response::success(['created' => true]);
    });

}, [
    // Middleware for the whole group
    new AuthMiddleware($modx, 'mgr'),
    new PermissionMiddleware($modx, 'msproduct_save')
]);
```

### Controllers

For complex logic use controllers:

```php
$router->group('/api/mgr/orders', function($router) use ($modx) {

    $router->get('', function($params) use ($modx) {
        $controller = new \MiniShop3\Controllers\Api\Manager\OrdersController($modx);
        return $controller->getList($params);
    });

    $router->get('/{id}', function($params) use ($modx) {
        $controller = new \MiniShop3\Controllers\Api\Manager\OrdersController($modx);
        return $controller->get($params);
    });

    $router->put('/{id}', function($params) use ($modx) {
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        $allParams = array_merge($params, $body);

        $controller = new \MiniShop3\Controllers\Api\Manager\OrdersController($modx);
        return $controller->update($allParams);
    });

});
```

## Response

All API endpoints return JSON via `MiniShop3\Router\Response`:

```php
use MiniShop3\Router\Response;

// Success response
Response::success($data, $message, $statusCode);

// Error response
Response::error($message, $statusCode, $errors);
```

### Response format

**Success:**

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {
    "id": 123,
    "name": "Product"
  }
}
```

**Error:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": "Field is required"
  }
}
```

### HTTP status codes

| Code | Description | Usage |
| --- | --- | --- |
| 200 | OK | Successful request |
| 400 | Bad Request | Validation error |
| 401 | Unauthorized | Not authenticated |
| 403 | Forbidden | No permission |
| 404 | Not Found | Route or resource not found |
| 405 | Method Not Allowed | Method not allowed |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

## Middleware

Middleware runs in sequence before the route handler. If middleware returns a `Response`, execution stops.

### Interface

```php
namespace MiniShop3\Router\Middleware;

interface MiddlewareInterface
{
    /**
     * @param array $params URL parameters
     * @return Response|null Response to stop, null to continue
     */
    public function handle(array $params);
}
```

### Built-in middleware

#### AuthMiddleware

Checks MODX user authentication. For `mgr` context also validates `HTTP_MODAUTH` token.

```php
use MiniShop3\Router\Middleware\AuthMiddleware;

// Auth check in manager
$router->get('/api/mgr/secure', function($params) use ($modx) {
    return Response::success(['user' => $modx->user->get('username')]);
}, [
    new AuthMiddleware($modx, 'mgr')  // 'mgr' or 'web'
]);
```

**Checks:**

- Authenticated user `$modx->user`
- For `mgr`: valid `HTTP_MODAUTH` token

#### PermissionMiddleware

Checks permissions via `$modx->hasPermission()`.

```php
use MiniShop3\Router\Middleware\PermissionMiddleware;

$router->post('/api/mgr/products', function($params) use ($modx) {
    // Create product
}, [
    new PermissionMiddleware($modx, 'msproduct_save')
]);
```

**Main MiniShop3 permissions:**

- `msproduct_save` — create/edit products
- `mssetting_save` — manage settings (deliveries, payments, vendors, notifications)
- `view_document` — read categories and category product grids
- `msorder_list` — order and customer lists, customer addresses (GET)
- `msorder_view` — view customer card
- `msorder_save` — edit orders and customers, order line mutations
- `msorder_remove` — delete orders, customers, bulk delete

#### TokenMiddleware

Validates auth token for Web API. Token is sent in `MS3TOKEN` header.

```php
use MiniShop3\Middleware\TokenMiddleware;

$tokenMiddleware = new TokenMiddleware($modx);

$router->group('/api/v1/cart', function($router) use ($modx) {
    // Cart routes
}, [$tokenMiddleware]);
```

**Public routes** (no token required):

- `/api/v1/cart/get`
- `/api/v1/product/get`
- `/api/v1/product/list`
- `/api/v1/customer/token/get`
- `/api/v1/health`

#### CorsMiddleware

Sets CORS headers for cross-origin requests.

```php
use MiniShop3\Middleware\CorsMiddleware;

$corsMiddleware = new CorsMiddleware([
    'allowed_origins' => ['https://shop.example.com', 'https://admin.example.com'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowed_headers' => ['Content-Type', 'Authorization', 'MS3TOKEN'],
    'allow_credentials' => true,
    'max_age' => 86400  // Preflight cache (24 hours)
]);
```

**System setting:** `ms3_cors_allowed_origins` — allowed origins.

#### RateLimitMiddleware

Limits request rate to prevent abuse.

```php
use MiniShop3\Middleware\RateLimitMiddleware;

$rateLimitMiddleware = new RateLimitMiddleware(
    60,   // Max 60 requests
    60    // Per 60 seconds
);
```

**System settings:**

- `ms3_rate_limit_max_attempts` — max requests (default: 60)
- `ms3_rate_limit_decay_seconds` — window in seconds (default: 60)

**Response headers:**

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1703001234
```

### Custom middleware

```php
<?php
namespace MyComponent\Middleware;

use MiniShop3\Router\Middleware\MiddlewareInterface;
use MiniShop3\Router\Response;
use MODX\Revolution\modX;

class LoggingMiddleware implements MiddlewareInterface
{
    private modX $modx;

    public function __construct(modX $modx)
    {
        $this->modx = $modx;
    }

    public function handle(array $params)
    {
        // Log request
        $this->modx->log(
            modX::LOG_LEVEL_INFO,
            sprintf(
                '[API] %s %s from %s',
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER['REMOTE_ADDR']
            )
        );

        // null = continue
        return null;
    }
}
```

Usage:

```php
use MyComponent\Middleware\LoggingMiddleware;

$router->get('/api/mgr/logged-endpoint', function($params) use ($modx) {
    return Response::success(['logged' => true]);
}, [
    new LoggingMiddleware($modx),
    new AuthMiddleware($modx, 'mgr')
]);
```

### Middleware order

Middleware runs in the order they are listed:

```php
$router->get('/api/mgr/endpoint', $handler, [
    new CorsMiddleware(),        // 1. CORS first
    new RateLimitMiddleware(),   // 2. Rate limit
    new AuthMiddleware($modx),   // 3. Auth
    new PermissionMiddleware(),  // 4. Permissions
]);
```

If middleware returns a `Response`, the rest of the middleware and the handler are **not run**.

## Route map

### Manager API (`/api/mgr/*`)

#### General

| Method | Route | Description |
| --- | --- | --- |
| GET | `/health` | API health check |
| GET | `/user/info` | Current user info |

#### Config (`/config`)

| Method | Route | Description |
| --- | --- | --- |
| GET | `/page-fields/{page_key}` | Get page fields |
| GET | `/page-fields/{page_key}/all` | All page fields |
| PUT | `/page-fields/{page_key}` | Update fields |
| DELETE | `/page-fields/{page_key}/{field_name}` | Remove field override |
| GET | `/sections/{page_key}` | Get sections |
| PUT | `/sections/{page_key}` | Update sections |

#### Grid config (`/grid-config`)

CRUD for admin grid column configuration. All requests require permission `mssetting_save`.

| Method | Route | Description |
| --- | --- | --- |
| GET | `/{grid_key}` | Get grid configuration |
| PUT | `/{grid_key}` | Update grid configuration |
| POST | `/{grid_key}/field` | Add column |
| PUT | `/{grid_key}/field/{field_name}` | Update column |
| DELETE | `/{grid_key}/field/{field_name}` | Delete column |

**Known `grid_key` values:** `orders`, `customers`, `vendors`, `deliveries`, `payments`, `category-products`, `extra-fields`, `model-fields`, `notifications`, `option-groups`.

##### `GET /grid-config/{grid_key}` response

```json
{
  "columns": [
    { "name": "id", "label": "ID", "type": "model", "visible": true, ... }
  ],
  "direct_filter_keys": ["query", "status_id", "delivery_id", ...],
  "editor_references": [
    { "key": "vendors", "path": "/api/mgr/references/vendors" }
  ]
}
```

| Field | Type | Description |
| --- | --- | --- |
| `columns` | `array` | Grid columns with configuration (type, visibility, filtering, editor) |
| `direct_filter_keys` | `string[]` | Filter keys the controller expects as **direct** request parameters (no `filter_` prefix). Others must be sent with the prefix. Source of truth is the backend; the frontend reads the array from here. Added in MiniShop3 1.12.0 — removes duplication between frontend and controllers. |
| `editor_references` | `array<{key,path}>` | **Only for `grid_key=category-products`.** Whitelist of allowed reference keys for inline-edit combo editor. Each entry is a key/path pair to a reference API endpoint. Used by the column settings UI for select dropdown. Added in MiniShop3 1.12.0. |

##### Filter contract (`direct_filter_keys`)

Frontend code decides how to serialize a filter value:

```js
// Pseudocode: composable useGridFilterParams
function addFilterParam(params, key, value) {
    if (directFilterKeys.has(key)) {
        params[key] = value         // direct: ?status_id=2
    } else {
        params['filter_' + key] = value   // prefixed: ?filter_customer_name=...
    }
}
```

When adding a new direct filter on the backend, **always** add its key to the `DIRECT_FILTER_KEYS` constant in the corresponding controller. Otherwise the frontend sends it with a prefix and filtering will not work.

#### Orders (`/orders`)

Read and write are split into two middleware groups.

**Read** — permission `msorder_list`:

| Method | Route | Description |
| --- | --- | --- |
| GET | `` | List orders |
| GET | `/filters` | Filter config |
| GET | `/stats` | Aggregates for dashboard and filters |
| GET | `/{id}` | Get order |
| GET | `/{id}/products` | Order products |
| GET | `/{id}/logs` | Change history |

**Write** — permission `msorder_save`:

| Method | Route | Description |
| --- | --- | --- |
| POST | `` | Create order from manager |
| DELETE | `/bulk` | Bulk delete |
| POST | `/{id}/finalize` | Finalize draft |
| POST | `/{id}/recalculate-cost` | Recalculate cost |
| PUT | `/{id}` | Update order |
| DELETE | `/{id}` | Delete order |
| POST | `/{id}/products` | Add product |
| PUT | `/{id}/products/{product_id}` | Update line |
| DELETE | `/{id}/products/{product_id}` | Remove line |

**Form references** (no separate PermissionMiddleware, mgr session):

| Method | Route | Description |
| --- | --- | --- |
| GET | `/statuses-dropdown` | Statuses with translations |
| GET | `/deliveries-active` | Active deliveries for select |

#### Customers (`/customers`)

| Method | Route | Description | Permission |
| --- | --- | --- | --- |
| GET | `` | List customers | `msorder_list` |
| DELETE | `/bulk` | Bulk delete | `msorder_remove` |
| GET | `/{id}` | Get customer | `msorder_view` |
| PUT | `/{id}` | Update customer | `msorder_save` |
| DELETE | `/{id}` | Delete customer | `msorder_remove` |
| GET | `/{id}/addresses` | Customer addresses | `msorder_list` |
| POST | `/{id}/addresses` | Add address | `msorder_save` |
| PUT | `/{id}/addresses/{address_id}` | Update address | `msorder_save` |
| DELETE | `/{id}/addresses/{address_id}` | Delete address | `msorder_remove` |

#### Store settings

**Deliveries (`/deliveries`)**, **Payments (`/payments`)**, **Vendors (`/vendors`)**, **Statuses (`/statuses`)**, **Links (`/links`)** — CRUD with permission `mssetting_save`.

#### Product data (`/product-data`)

“Categories” and “Links” tabs on the product card (Vue). Permission `msproduct_save` / mgr session:

| Method | Route | Description |
| --- | --- | --- |
| GET | `/{id}/categories/tree` | Category tree (`ms3_product_category_tree`) |
| GET | `/{id}/links` | Link list |
| POST | `/{id}/links` | Add link `{ slave, link }` |
| DELETE | `/{id}/links` | Remove link `{ link, master, slave }` |
| GET | `/references/link-types` | `msLink` types (references group) |
| GET | `/references/products` | Product autocomplete |

#### Notifications (`/notifications`)

| Method | Route | Description | Permission |
| --- | --- | --- | --- |
| GET | `/references` | Form references | `mssetting_save` |
| GET | `` | List notifications | `mssetting_save` |
| GET | `/{id}` | Get notification | `mssetting_save` |
| POST | `` | Create notification | `mssetting_save` |
| PUT | `/{id}` | Update | `mssetting_save` |
| DELETE | `/{id}` | Delete | `mssetting_save` |

#### Import (`/import`)

| Method | Route | Description | Permission |
| --- | --- | --- | --- |
| GET | `/fields` | Mapping fields | `msproduct_save` |
| POST | `/upload` | Upload CSV | `msproduct_save` |
| POST | `/preview` | Preview | `msproduct_save` |
| POST | `/start` | Start import | `msproduct_save` |
| GET | `/progress/{import_id}` | Import progress | `msproduct_save` |

### Web API (`/api/v1/*`)

#### Cart (`/cart`)

| Method | Route | Description | Token |
| --- | --- | --- | --- |
| GET | `/get` | Get cart | Optional |
| POST | `/add` | Add product | Required |
| POST | `/change` | Change quantity | Required |
| POST | `/change-option` | Change line options | Required |
| POST | `/remove` | Remove product | Required |
| POST | `/clean` | Clear cart | Required |

#### Order (`/order`)

| Method | Route | Description | Token |
| --- | --- | --- | --- |
| GET | `/get` | Get order | Required |
| POST | `/add` | Add data | Required |
| POST | `/set` | Set fields | Required |
| POST | `/remove` | Remove field | Required |
| POST | `/submit` | Submit order | Required |
| POST | `/clean` | Clear draft | Required |
| GET | `/cost` | Full cost | Required |
| GET | `/cost/cart` | Cart cost | Required |
| GET | `/cost/delivery` | Delivery cost | Required |
| GET | `/cost/payment` | Payment fee | Required |
| POST | `/address/set` | Apply saved address | Required |
| POST | `/address/clean` | Clear address fields | Required |
| GET | `/delivery/validation-rules` | Delivery validation rules | Required |
| GET | `/delivery/required-fields` | Required delivery fields | Required |

#### Customer (`/customer`)

| Method | Route | Description | Token |
| --- | --- | --- | --- |
| POST | `/login` | Login | No |
| POST | `/register` | Register | No |
| POST | `/logout` | Logout | Required |
| POST | `/forgot-password` | Request password reset | No |
| POST | `/reset-password` | Change password by token | No |
| GET | `/token/get` | Get token | No |
| POST | `/add` | Update profile field | Required |
| POST | `/changeAddress` | Select address at checkout | Required |
| PUT | `/profile` | Update profile | Required |
| GET | `/addresses` | List addresses | Required |
| POST | `/addresses` | Add address | Required |
| PUT | `/addresses/{id}` | Update address | Required |
| DELETE | `/addresses/{id}` | Delete address | Required |

#### General

| Method | Route | Description |
| --- | --- | --- |
| GET | `/health` | Health check |

## Customizing routes

### Adding custom routes

Create `core/config/ms3_routes_manager.custom.php`:

```php
<?php
use MiniShop3\Router\Middleware\AuthMiddleware;
use MiniShop3\Router\Middleware\PermissionMiddleware;
use MiniShop3\Router\Response;

// Simple route
$router->get('/api/mgr/my-custom-endpoint', function() use ($modx) {
    return Response::success(['custom' => true]);
}, [
    new AuthMiddleware($modx, 'mgr')
]);

// Route group
$router->group('/api/mgr/my-module', function($router) use ($modx) {

    $router->get('/dashboard', function() use ($modx) {
        return Response::success([
            'stats' => ['orders' => 100, 'revenue' => 50000]
        ]);
    });

    $router->post('/action', function($params) use ($modx) {
        $data = json_decode(file_get_contents('php://input'), true);
        // Process...
        return Response::success(['processed' => true]);
    });

}, [
    new AuthMiddleware($modx, 'mgr'),
    new PermissionMiddleware($modx, 'my_module_permission')
]);
```

For Web API create `core/config/ms3_routes_web.custom.php`.

### Overriding system routes

Custom routes load **after** system routes and override them:

```php
<?php
// core/config/ms3_routes_manager.custom.php

use MiniShop3\Router\Response;

// Override system route /api/mgr/health
$router->get('/api/mgr/health', function() use ($modx) {
    return Response::success([
        'status' => 'custom_ok',
        'version' => '1.0.0-custom',
        'timestamp' => time()
    ]);
});
```

### Third-party integration

A third-party component can add routes via config:

```php
<?php
// core/config/ms3_routes_manager.custom.php

use MiniShop3\Router\Response;
use MiniShop3\Router\Middleware\AuthMiddleware;

// Routes for msPromoCode component
$router->group('/api/mgr/promocodes', function($router) use ($modx) {

    $router->get('', function($params) use ($modx) {
        $codes = $modx->getCollection('msPromoCode');
        $result = [];
        foreach ($codes as $code) {
            $result[] = $code->toArray();
        }
        return Response::success(['codes' => $result]);
    });

    $router->post('', function($params) use ($modx) {
        $data = json_decode(file_get_contents('php://input'), true);

        $code = $modx->newObject('msPromoCode');
        $code->fromArray($data);

        if ($code->save()) {
            return Response::success(['id' => $code->get('id')]);
        }
        return Response::error('Failed to create promo code', 400);
    });

    $router->delete('/{id}', function($params) use ($modx) {
        $code = $modx->getObject('msPromoCode', $params['id']);
        if ($code && $code->remove()) {
            return Response::success(['deleted' => true]);
        }
        return Response::error('Not found', 404);
    });

}, [
    new AuthMiddleware($modx, 'mgr')
]);
```

## Modular addon routes (`ms3.routes.d`)

`ms3_routes_*.custom.php` files suit manual customization but **not addons** — if two components write to the same file, install/uninstall conflicts occur.

Third-party components use the `core/config/ms3.routes.d/` directory — each addon creates its own file, so there are no conflicts.

::: tip Analogy
The pattern mirrors `ms3.services.d/` for [services](/en/components/minishop3/development/services).
:::

### Structure

```
core/config/ms3.routes.d/
├── web/                          # Web API routes (api.php)
│   ├── 50-mydelivery.php
│   └── 50-mypayment.php
└── manager/                      # Manager API routes (connector)
    ├── 50-mydelivery.php
    └── 50-myadmin.php
```

Files load in **alphabetical order**. Use a numeric prefix to control priority (`01-`, `50-`, `99-`).

### Load order

**Web API (`api.php`):**

1. `config/routes/web.php` — system routes
2. `core/config/ms3_routes_web.custom.php` — manual customizations
3. `core/config/ms3.routes.d/web/*.php` — addons
4. Dispatcher `build()`

**Manager API (`connector.php` → `Processors\Api\Router`):**

1. `config/routes/manager.php` — system routes
2. `core/config/ms3_routes_manager.custom.php` — manual customizations
3. `core/config/ms3.routes.d/manager/*.php` — addons
4. Dispatcher `build()`

Each subsequent level can override routes from the previous level by `METHOD:PATTERN` key.

### Example: delivery addon Web API routes

```php
<?php
// core/config/ms3.routes.d/web/50-mydelivery.php

use MiniShop3\Router\Response;
use MiniShop3\Middleware\TokenMiddleware;

$router->group('/api/v1/delivery/mydelivery', function ($router) use ($modx) {

    $router->post('/calculate', function (array $vars, \MODX\Revolution\modX $modx) {
        $input = json_decode(file_get_contents('php://input'), true) ?: [];
        $cost = MyDelivery::calculate($input['address'] ?? '', $input['weight'] ?? 0);
        return Response::success(['cost' => $cost]);
    });

    $router->get('/points', function (array $vars, \MODX\Revolution\modX $modx) {
        $city = $vars['city'] ?? '';
        $points = MyDelivery::getPickupPoints($city);
        return Response::success(['points' => $points]);
    });

}, [new TokenMiddleware($modx)]);
```

### Example: addon Manager API routes

```php
<?php
// core/config/ms3.routes.d/manager/50-mydelivery.php

use MiniShop3\Router\Middleware\AuthMiddleware;
use MiniShop3\Router\Response;

$router->group('/api/mgr/mydelivery', function ($router) use ($modx) {

    $router->get('/settings', function (array $vars, \MODX\Revolution\modX $modx) {
        return Response::success([
            'api_key' => $modx->getOption('mydelivery_api_key'),
            'enabled' => (bool) $modx->getOption('mydelivery_enabled'),
        ]);
    });

    $router->put('/settings', function (array $vars, \MODX\Revolution\modX $modx) {
        $data = json_decode(file_get_contents('php://input'), true) ?: [];
        // Save settings...
        return Response::success(['saved' => true]);
    });

}, [new AuthMiddleware($modx, 'mgr')]);
```

### Install and uninstall

In the addon resolver:

```php
<?php
// resolver on install
$routesDir = MODX_CORE_PATH . 'config/ms3.routes.d/';

// Copy route files
copy(
    $source . 'routes/web.php',
    $routesDir . 'web/50-mydelivery.php'
);
copy(
    $source . 'routes/manager.php',
    $routesDir . 'manager/50-mydelivery.php'
);
```

```php
<?php
// resolver on uninstall
@unlink(MODX_CORE_PATH . 'config/ms3.routes.d/web/50-mydelivery.php');
@unlink(MODX_CORE_PATH . 'config/ms3.routes.d/manager/50-mydelivery.php');
```

Each addon removes only its own file — other addons are unaffected.

### Error handling

If a route file has a syntax error or throws an exception, it is logged and skipped — **other files load normally**:

```
[MiniShop3 Router] Failed to load routes file /path/to/50-broken.php: syntax error...
```

### Custom file vs ms3.routes.d

| | `ms3_routes_*.custom.php` | `ms3.routes.d/` |
| --- | --- | --- |
| **For** | Site developer | Addon authors |
| **Files** | One per API type | One file per addon |
| **Conflicts** | Possible with multiple addons | None |
| **Install/uninstall** | Manual editing required | Atomic: create/delete file |
| **Created by** | On ms3 install (example) | Addon via resolver |

## System settings

| Setting | Default | Description |
| --- | --- | --- |
| `ms3_cors_allowed_origins` | `["*"]` | CORS allowed origins |
| `ms3_rate_limit_max_attempts` | `60` | Request limit |
| `ms3_rate_limit_decay_seconds` | `60` | Limit window (seconds) |

## Debugging

### Request logging

```php
$router->get('/api/mgr/debug', function($params) use ($modx) {
    $modx->log(
        \MODX\Revolution\modX::LOG_LEVEL_INFO,
        '[API Debug] ' . json_encode([
            'method' => $_SERVER['REQUEST_METHOD'],
            'uri' => $_SERVER['REQUEST_URI'],
            'params' => $params,
            'body' => file_get_contents('php://input')
        ])
    );

    return Response::success(['debug' => true]);
});
```

### Common errors

**401 Unauthorized:**

- Not logged in to MODX
- Missing or invalid `HTTP_MODAUTH` token
- For Web API: missing or expired `MS3TOKEN`

**403 Forbidden:**

- No permission (check user ACL)

**404 Not Found:**

- Route not registered
- URL typo

**405 Method Not Allowed:**

- Wrong HTTP method (e.g. GET instead of POST)

**429 Too Many Requests:**

- Rate limit exceeded; wait `Retry-After` seconds
