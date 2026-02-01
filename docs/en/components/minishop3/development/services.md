---
title: Service layer
description: Business logic services and DI
---
# Service layer

MiniShop3 uses a service layer to separate business logic from ORM models. This improves testability, reusability, and extensibility.

## Architecture pattern

### Separation principle

In the classic approach (used in miniShop2) business logic lived in models:

```php
// miniShop2 — fat models
class msProduct extends modResource
{
    public function duplicate($options = []) { /* 200+ lines of logic */ }
    public function getPrice() { /* price calculation */ }
    public function updateImages() { /* image handling */ }
}
```

In MiniShop3 models only handle database access (xPDO ORM), and business logic lives in services:

```php
// MiniShop3 — thin models + services
class msProduct extends modResource
{
    // Only xPDO relations and basic DB operations
}

class ProductService
{
    public function duplicate($product, $options) { /* logic */ }
    public function processForDisplay($product) { /* logic */ }
}
```

### Benefits

| Aspect | Fat models | Service layer |
|--------|------------|---------------|
| Testing | Hard to mock | Easy to isolate |
| Reuse | Tied to ORM | Independent services |
| Extension | Inheritance | Replace via DI |
| File size | 1000+ lines | 100–300 lines |

::: info Compromise with MODX architecture
MODX commonly puts business logic in models (`modResource`, `modUser`, etc.). Since some MiniShop3 models extend MODX classes (`msProduct extends modResource`), they must follow similar patterns.

Therefore MiniShop3 models reference services for business logic — a pragmatic compromise for MODX ecosystem compatibility.
:::

## DI container

MiniShop3 uses MODX’s built-in DI container (`$modx->services`) to register and resolve services.

### Registering services

All services are registered via `ServiceRegistry` when the component initializes:

```php
// bootstrap.php
$serviceRegistry = new \MiniShop3\ServiceRegistry($modx);
$serviceRegistry->register();
```

### Resolving services

```php
// Via DI container (recommended)
$orderService = $modx->services->get('ms3_order_service');
$authManager = $modx->services->get('ms3_auth_manager');
$cart = $modx->services->get('ms3_cart');

// Via main MiniShop3 class
$ms3 = $modx->services->get('ms3');
$ms3->cart->add($productId, 1);
$ms3->order->submit();
```

### Lazy loading

Services are created on first use:

```php
// Service not created yet
$modx->services->add('ms3_order_service', function() use ($modx) {
    // This runs only on first get()
    return new \MiniShop3\Services\Order\OrderService($modx);
});

// First call — create instance
$service1 = $modx->services->get('ms3_order_service');

// Second call — same instance (singleton)
$service2 = $modx->services->get('ms3_order_service');
// $service1 === $service2
```

### Naming convention

All MiniShop3 services use the `ms3_` prefix:

```php
'ms3_order_service'      // OrderService
'ms3_auth_manager'       // AuthManager
'ms3_cart'               // Cart controller
'ms3_product_image'      // ProductImageService
```

This avoids conflicts with other MODX components.

## Service map

### Controllers

Controllers are high-level services for main store entities.

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_cart` | `Controllers\Cart\Cart` | Cart management |
| `ms3_order` | `Controllers\Order\Order` | Checkout |
| `ms3_customer` | `Controllers\Customer\Customer` | Customer handling |

```php
// Usage
$ms3 = $modx->services->get('ms3');

// Add to cart
$result = $ms3->cart->add($productId, 2, ['color' => 'red']);

// Submit order
$result = $ms3->order->submit();

// Get customer data
$customer = $ms3->customer->getFields();
```

### Product services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_product_data_service` | `Services\Product\ProductDataService` | Product data |
| `ms3_product_image` | `Services\Product\ProductImageService` | Product images |

```php
$productService = $modx->services->get('ms3_product_data_service');
$imageService = $modx->services->get('ms3_product_image');
```

### Customer services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_auth_manager` | `Services\Customer\AuthManager` | Authentication |
| `ms3_register_service` | `Services\Customer\RegisterService` | Registration |
| `ms3_email_verification_service` | `Services\Customer\EmailVerificationService` | Email verification |
| `ms3_sms_verification_service` | `Services\Customer\SmsVerificationService` | SMS verification |
| `ms3_rate_limiter` | `Services\Customer\RateLimiter` | Rate limiting |
| `ms3_customer_address_manager` | `Services\Customer\CustomerAddressManager` | Address management |
| `ms3_customer_duplicate_checker` | `Services\CustomerDuplicateChecker` | Duplicate check |
| `ms3_customer_factory` | `Services\CustomerFactory` | Customer factory |

```php
// Authentication
$authManager = $modx->services->get('ms3_auth_manager');
$customer = $authManager->authenticate([
    'email' => 'user@example.com',
    'password' => 'secret123'
]);

// Create token
$token = $authManager->createToken($customer, 'api', 86400);

// Register auth provider
$authManager->registerProvider(new SmsAuthProvider($modx));
```

### Order services

::: info Facade architecture
The `Order.php` controller is a **facade** — it keeps all public methods for backward compatibility but delegates logic to dedicated services. This lets you override parts of the logic without changing the whole controller.
:::

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_order_service` | `Services\Order\OrderService` | Order business logic |
| `ms3_order_draft_manager` | `Services\Order\OrderDraftManager` | Order draft CRUD |
| `ms3_order_cost_calculator` | `Services\Order\OrderCostCalculator` | Cost calculation |
| `ms3_order_field_manager` | `Services\Order\OrderFieldManager` | Field CRUD + validation |
| `ms3_order_address_manager` | `Services\Order\OrderAddressManager` | Order addresses |
| `ms3_order_user_resolver` | `Services\Order\OrderUserResolver` | MODX user resolution |
| `ms3_order_submit_handler` | `Services\Order\OrderSubmitHandler` | Checkout |
| `ms3_order_log` | `Services\Order\OrderLogService` | Order change log |
| `ms3_order_status` | `Services\Order\OrderStatusService` | Status change + notifications |
| `ms3_order_finalize` | `Services\Order\OrderFinalizeService` | Order finalization (validation, customer creation) |

```php
// Get services directly
$draftManager = $modx->services->get('ms3_order_draft_manager');
$costCalculator = $modx->services->get('ms3_order_cost_calculator');
$submitHandler = $modx->services->get('ms3_order_submit_handler');

// Work with draft
$draft = $draftManager->getOrCreateDraft($token, 'web');
$draftManager->attachCustomer($draft, $customerId);

// Calculate cost
$cost = $costCalculator->calculate($order);

// Logging
$logService = $modx->services->get('ms3_order_log');
$logService->addEntry($order, 'status_changed', ['old' => 1, 'new' => 2]);
```

### Cart services

::: info Facade architecture
The `Cart.php` controller is also a **facade**. It uses `OrderDraftManager` for draft operations (cart and order share the same `msOrder` model).
:::

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_cart_item_manager` | `Services\Cart\CartItemManager` | Cart item CRUD, validation, totals |

```php
$itemManager = $modx->services->get('ms3_cart_item_manager');

// Add item
$result = $itemManager->addItem($draft, $productId, $count, $options);

// Change quantity
$itemManager->updateItemCount($draft, $key, $newCount);

// Calculate cart totals
$status = $itemManager->calculateStatus($draft);
```

**Cart vs Order responsibility:**

```
OrderDraftManager    — draft lifecycle (shared by Cart and Order)
CartItemManager     — cart line items (Cart-specific)
OrderCostCalculator — order cost (Order-specific)
OrderFieldManager   — order fields (Order-specific)
```

### Delivery and payment services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_delivery_service` | `Services\Delivery\DeliveryService` | Delivery methods |
| `ms3_payment_service` | `Services\Payment\PaymentService` | Payment methods |

### Category services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_category_service` | `Services\Category\CategoryService` | Categories |
| `ms3_category_option_service` | `Services\Category\CategoryOptionService` | Category options |

### Option services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_option_service` | `Services\Option\OptionService` | EAV option system |

### Config services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_config_manager` | `Services\ConfigManager` | Config management |
| `ms3_field_config_manager` | `Services\FieldConfigManager` | Field config |
| `ms3_config_service` | `Services\ConfigService` | Config facade |
| `ms3_grid_config` | `Services\GridConfigService` | Grid config |

### Notification services

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_notifications` | `Notifications\NotificationManager` | Notification hub |
| `ms3_notification_config` | `Services\Notification\NotificationConfigService` | Notification config |

### Utilities

| Key | Class | Purpose |
|------|-------|---------|
| `ms3_token_service` | `Services\TokenService` | Token operations |
| `ms3_image` | `Services\ImageService` | Image handling (Intervention Image) |
| `ms3_vendor_service` | `Services\Vendor\VendorService` | Vendors |

## Replacing services

MiniShop3 lets you replace default services with your own via config files.

### Load order

1. **Built-in classes** — component defaults
2. **Main config** — `core/config/ms3.services.php`
3. **Addon configs** — `core/config/ms3.services.d/*.php` (alphabetical)

Each level overrides the previous.

### Creating config

Copy the example:

```bash
cp core/components/minishop3/config/ms3.services.example.php \
   core/config/ms3.services.php
```

### Override example

```php
<?php
// core/config/ms3.services.php

return [
    // Custom cart with promo codes
    'ms3_cart' => [
        'class' => \MyProject\Controllers\PromoCart::class,
        'interface' => null,
    ],

    // Custom checkout handler (CRM integration)
    'ms3_order_submit_handler' => [
        'class' => \MyProject\Services\CRMOrderSubmitHandler::class,
        'interface' => null,
    ],

    // Custom delivery (e.g. CDEK)
    'ms3_delivery_service' => [
        'class' => \MyProject\Services\CdekDeliveryService::class,
        'interface' => null,
    ],
];
```

**Custom OrderSubmitHandler with CRM:**

```php
<?php
namespace MyProject\Services;

use MiniShop3\Services\Order\OrderSubmitHandler;

class CRMOrderSubmitHandler extends OrderSubmitHandler
{
    public function submit(
        \MiniShop3\Model\msOrder $draft,
        array $orderData,
        ?\MiniShop3\Model\msCustomer $customer
    ): array {
        // Custom logic BEFORE submit
        $this->validateWithCRM($orderData);

        // Call parent
        $result = parent::submit($draft, $orderData, $customer);

        // Custom logic AFTER success
        if ($result['success']) {
            $this->syncOrderToCRM($result['data']['order_id']);
        }

        return $result;
    }

    protected function syncOrderToCRM(int $orderId): void
    {
        // Send to CRM
    }
}
```

### Custom class requirements

A custom class **must**:

1. **Exist** and be loadable via autoloader
2. **Extend** the MiniShop3 base class

```php
<?php
namespace MyProject\Controllers;

use MiniShop3\Controllers\Cart\Cart;

class PromoCart extends Cart
{
    public function add(int $id, int $count = 1, array $options = []): array
    {
        // Check promo code
        $promoCode = $_SESSION['promo_code'] ?? null;
        if ($promoCode) {
            $options['promo_code'] = $promoCode;
        }

        return parent::add($id, $count, $options);
    }

    public function applyPromoCode(string $code): array
    {
        // Custom promo logic
        $_SESSION['promo_code'] = $code;
        return $this->success('Promo code applied');
    }
}
```

### Class validation

ServiceRegistry checks:

- **Class exists** — `class_exists()`
- **Inheritance** — `is_subclass_of($className, $baseClass)`
- **Interfaces** — `class_implements()` (if specified)

On validation failure the default class is used and a log entry is written:

```
[MiniShop3 ServiceRegistry] Class 'MyProject\Cart' must extend MiniShop3\Controllers\Cart\Cart, using fallback
```

## Third-party extensions

For components that extend MiniShop3, use the `ms3.services.d/` directory to avoid conflicts.

### Structure

```
core/config/ms3.services.d/
├── 01-base.php           # Base overrides (priority 01)
├── 50-mypromocode.php    # Promo component (priority 50)
├── 50-cdekdelivery.php   # CDEK delivery (priority 50)
└── 99-override.php       # Final overrides (priority 99)
```

### Benefits

- **No conflicts** — each component in its own file
- **Priority** — via file name (alphabetical)
- **Independent install** — components don’t overwrite each other’s config

### Component config example

```php
<?php
// core/config/ms3.services.d/50-mypromocode.php

return [
    'ms3_cart' => [
        'class' => \MyPromoCode\Controllers\PromoCart::class,
    ],
];
```

### Logging

ServiceRegistry logs loaded configs:

```
[MiniShop3 ServiceRegistry] Loaded 1 service(s) from addon: 50-mypromocode.php
[MiniShop3 ServiceRegistry] Using custom class: MyPromoCode\Controllers\PromoCart
```

## Usage examples

### Custom delivery cost

```php
<?php
namespace MyProject\Services;

use MiniShop3\Services\Delivery\DeliveryService;
use MiniShop3\Model\msOrder;

class CustomDeliveryService extends DeliveryService
{
    public function calculateCost(msOrder $order): float
    {
        $baseCost = parent::calculateCost($order);

        // Free delivery over 5000
        if ($order->get('cart_cost') >= 5000) {
            return 0;
        }

        // Surcharge for heavy orders
        if ($order->get('weight') > 10000) {
            $baseCost *= 1.5;
        }

        return $baseCost;
    }
}
```

### External CRM integration

```php
<?php
namespace MyProject\Services;

use MiniShop3\Services\Order\OrderService;
use MiniShop3\Model\msOrder;

class CRMOrderService extends OrderService
{
    public function handleOrderSave(msOrder $order, ?bool $cacheFlag = null): bool
    {
        $result = parent::handleOrderSave($order, $cacheFlag);

        // Sync to CRM on status change
        if ($order->isDirty('status_id')) {
            $this->syncToCRM($order);
        }

        return $result;
    }

    protected function syncToCRM(msOrder $order): void
    {
        $client = new \GuzzleHttp\Client();
        $client->post('https://crm.example.com/api/orders', [
            'json' => [
                'order_id' => $order->get('id'),
                'status' => $order->get('status_id'),
                'total' => $order->get('cost'),
            ]
        ]);
    }
}
```

### Custom auth provider

```php
<?php
namespace MyProject\Auth;

use MiniShop3\Controllers\Auth\AuthProviderInterface;
use MiniShop3\Model\msCustomer;
use MODX\Revolution\modX;

class TelegramAuthProvider implements AuthProviderInterface
{
    protected modX $modx;

    public function __construct(modX $modx)
    {
        $this->modx = $modx;
    }

    public function getName(): string
    {
        return 'telegram';
    }

    public function supports(array $credentials): bool
    {
        return isset($credentials['telegram_hash'])
            && isset($credentials['telegram_id']);
    }

    public function authenticate(array $credentials): ?msCustomer
    {
        // Verify Telegram signature
        if (!$this->verifyTelegramHash($credentials)) {
            return null;
        }

        // Find or create customer
        return $this->modx->getObject(msCustomer::class, [
            'telegram_id' => $credentials['telegram_id']
        ]);
    }

    protected function verifyTelegramHash(array $data): bool
    {
        // Telegram signature verification
        return true;
    }
}
```

Register provider:

```php
$authManager = $modx->services->get('ms3_auth_manager');
$authManager->registerProvider(new TelegramAuthProvider($modx));
```

## System settings

| Setting | Default | Description |
|-----------|--------------|-------------|
| `ms3_services_config` | `core/config/ms3.services.php` | Main config path |
| `ms3_services_addons_dir` | `core/config/ms3.services.d/` | Addon config directory |

## Troubleshooting

### Service not found

```
Service 'ms3_my_service' not found
```

**Fixes:**

1. Ensure `ServiceRegistry::register()` runs on init
2. Check service key (must include `ms3_` prefix)
3. Ensure class exists and is autoloadable

### Custom class not used

```
[MiniShop3 ServiceRegistry] Class 'MyClass' must extend BaseClass, using fallback
```

**Fixes:**

1. Ensure custom class extends the MiniShop3 base class
2. Check namespace and use statements
3. Clear MODX cache

### Component conflict

If two components override the same service, the one whose file loads last (by name) wins.

**Fix:** Use numeric prefixes to control order:

- `10-base-component.php` — loads first
- `90-override-component.php` — loads last and wins
