---
title: Order API
description: 'Programmatic order creation, checkout, status/cost/address management and logging'
---
# Order API

Programmatic interface for working with MiniShop3 orders from PHP.

An order in MiniShop3 is made up of several models:

- **msOrder** — main order model (cost, status, delivery, payment)
- **msOrderAddress** — order address and contact data
- **msOrderProduct** — order lines (products)
- **msOrderLog** — order change log

Order lifecycle: **draft** → **submit** → **status changes**.

## Order controller (facade)

The `Order` facade controller is the main way to work with orders from PHP: a single entry point backed by dedicated services.

::: warning The result comes in an envelope
Every controller method that returns an `array` returns the envelope `['success' => bool, 'message' => string, 'data' => array]` — the same `Utils::success()` / `Utils::error()` shape the Web API uses. The values you need are in `data`; for `get()` they sit one level deeper, in `data['order']`.

Only these return a value directly: `initialize()`, `initDraft()`, `remove()` and `hasPayment()` — `bool`; `getDraft()` — an `msOrder` object or `null`; `getUserId()` — `int`.
:::

```php
$ms3 = $modx->services->get('ms3');

// Get current order data
$response = $ms3->order->get();
$order = $response['data']['order'];

// Add field
$result = $ms3->order->add('email', 'user@example.com');

// Set multiple fields
$result = $ms3->order->set([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
    'first_name' => 'John',
    'delivery_id' => 1,
    'payment_id' => 1,
    'order_comment' => 'Call before delivery',
]);

// Submit order
$result = $ms3->order->submit();
// ['success' => true, 'data' => ['order_id' => 15, 'order_num' => '26/02-15', ...]]

// Clear draft
$ms3->order->clean();

```

::: info Initialization
Initialize the controller with the client token before the first call:

```php
$ms3->order->initialize($token);
$ms3->order->initDraft();

```

In the REST API and in snippets this happens automatically.
:::

### Controller methods

| Method | Description |
| --- | --- |
| `initialize($token, $config)` | Initialize with client token |
| `initDraft()` | Load existing draft |
| `get()` | Order data (fields + address) |
| `add($key, $value)` | Add/update field |
| `set($fields)` | Set multiple fields |
| `remove($key)` | Remove field (set to null) |
| `validate($key, $value)` | Validate field value |
| `submit($data)` | Submit order |
| `clean()` | Clear draft |
| `getCost($onlyCost)` | Total cost (cart + delivery + payment) |
| `getCartCost()` | Cart cost |
| `getDeliveryCost()` | Delivery cost |
| `getPaymentCost()` | Payment fee |
| `setCustomerAddress($hash)` | Apply saved customer address |
| `cleanCustomerAddress()` | Clear address fields |
| `getDeliveryValidationRules($deliveryId)` | Delivery validation rules |
| `getDeliveryRequiresFields($deliveryId)` | Required delivery fields |
| `getDraft()` | Get the draft `msOrder` object |
| `hasPayment($deliveryId, $paymentId)` | Check whether the delivery–payment pair is allowed |
| `getUserId()` | MODX user ID for the current order; registers a user if there is none |

## Drafts (OrderDraftManager)

A draft is an `msOrder` in `draft` status. It appears on the first cart request and holds the data until submit.

```php
$draftManager = $modx->services->get('ms3_order_draft_manager');

// Get or create draft
$draft = $draftManager->getOrCreateDraft($token, 'web');

// Get existing draft (no create)
$draft = $draftManager->getDraft($token, 'web');

// Get draft by customer ID (restore after login)
$draft = $draftManager->getDraftByCustomer($customerId, 'web');

// Draft data as array (order + address)
$data = $draftManager->toArray($draft);
// Address fields have prefix address_:
// ['email' => '...', 'address_city' => 'Moscow', 'address_street' => '...']

// Update one field
$draftManager->updateField($draft, 'order_comment', 'Call before delivery');

// Attach customer to draft
$draftManager->attachCustomer($draft, $customerId);

// Recalculate cost
$draftManager->recalculate($draft);

// Set delivery cost
$draftManager->setDeliveryCost($draft, 350.00);

// Check if cart is empty
if ($draftManager->isEmpty($draft)) {
    // No products
}

// Clear all fields
$draftManager->clean($draft);

// Delete draft (with products and address)
$draftManager->deleteDraft($draft);

```

## Fields and validation (OrderFieldManager)

The service manages order fields and their validation, and fires events on every change.

```php
$fieldManager = $modx->services->get('ms3_order_field_manager');

// Add field (with validation and events)
$result = $fieldManager->add($draft, $orderData, 'email', 'user@example.com');
// ['success' => true, 'data' => [...]]

// Remove field
$fieldManager->remove($draft, $orderData, 'email');

// Validate without saving
$result = $fieldManager->validate($orderData, 'phone', '+79991234567');
// ['success' => true] or ['success' => false, 'message' => 'Error']

```

### Validation rules

By default `delivery_id` and `payment_id` are validated as `required|numeric`. The rest of the rules come from the delivery settings.

```php
// Get validation rules for delivery
$rules = $fieldManager->getDeliveryValidationRules($deliveryId);
// ['city' => 'required|min:2', 'street' => 'required', ...]

// Get required fields list
$required = $fieldManager->getDeliveryRequiredFields($deliveryId);
// ['city', 'street', 'building', 'phone']

// Add custom rules
$fieldManager->setValidationRules([
    'company_name' => 'required|min:3',
]);

```

## Cost calculation (OrderCostCalculator)

```php
$calculator = $modx->services->get('ms3_order_cost_calculator');

// Cart cost
$result = $calculator->getCartCost($draft, $token);
// ['cost' => 5000.00]

// Delivery cost
$result = $calculator->getDeliveryCost($draft, $orderData, $token);
// ['cost' => 300.00]

// Payment fee
$result = $calculator->getPaymentCost($draft, $orderData, $token);
// ['cost' => 150.00]

// Total cost
$result = $calculator->getTotalCost($draft, $orderData, $token);
// ['cost' => 5450.00, 'cart_cost' => 5000.00, 'delivery_cost' => 300.00, 'payment_cost' => 150.00]

```

Each method fires a pair of `msOnBefore...` / `msOn...` events — that is where a plugin changes the cost.

### Manager cost recalculation — `POST /api/mgr/orders/{id}/recalculate-cost`

Added in 1.11.0. The `ManagerOrderCostRecalculator` service recalculates `cart_cost`, `weight`, `delivery_cost` and the total `cost` from the saved order lines and the current `delivery_id` / `payment_id`. It touches no other order field.

Request body:

```json
{
  "mode": "auto",
  "manual_delivery_cost": 500.0
}

```

Modes (`mode`):

| Mode | Behavior |
| --- | --- |
| `auto` (default) | Recalculates only for `DefaultDelivery` / `DefaultPayment` (from `price`, `weight_price`, `free_delivery_amount` and the percentages). For custom handlers it returns the warning `delivery_manual_required` / `payment_manual_required` and keeps the previous `delivery_cost` and a fee of 0 — it calls no external API. |
| `manual` | Takes the `manual_delivery_cost` you pass. The payment fee is still calculated automatically, from the field. |
| `force_provider` | Explicitly calls `loadController()` → `getCost()` and `loadHandler()` → `getCost()` in `try/catch`. On failure — the warning `delivery_provider_error` / `payment_provider_error`, and the previous values stay. |

The response repeats the order data from `GET /api/mgr/orders/{id}` and adds:

```json
{
  "breakdown": {
    "cart_cost": 5000.0,
    "weight": 1.5,
    "delivery_cost": 300.0,
    "payment_cost": 150.0,
    "cost": 5450.0
  },
  "warnings": ["delivery_manual_required"]
}

```

The total passes through the shared clamp `OrderService::clampComputedTotal()`, so it never goes below zero. Delivery and payment discounts and markups (negative `price`, see 1.11.0) go through `MiniShop3\Utils\PriceAdjustment`.

Example call from JS (the order card in the manager):

```javascript
const response = await fetch(`/api/mgr/orders/${orderId}/recalculate-cost`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'modAuth': MODx.modxConfig.auth, // or the current mgr-auth header
  },
  body: JSON.stringify({
    mode: 'manual',
    manual_delivery_cost: 500,
  }),
})
const json = await response.json()
// json.data.breakdown — cart_cost / delivery_cost / payment_cost / cost
// json.data.warnings — e.g. delivery_manual_required
```

Via HTTP (Manager API):

```bash
curl -X POST 'https://example.com/api/mgr/orders/42/recalculate-cost' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: …' \
  -d '{"mode":"auto"}'
```

See also [API Router](/en/components/minishop3/development/routing).

## Order submit (OrderSubmitHandler)

`OrderSubmitHandler` runs the full submit flow: validation → create customer → calculate cost → generate number → change status → call payment.

```php
$submitHandler = $modx->services->get('ms3_order_submit_handler');

$result = $submitHandler->submit($draft, $orderData, $token);
// Success:
// [
//     'success' => true,
//     'data' => [
//         'order_id' => 15,
//         'order_num' => '26/02-15',
//         'redirect_url' => '/thank-you?msorder=15',
//     ],
//     'message' => 'Order submitted successfully'
// ]

```

### Submit steps

1. Event `msOnSubmitOrder`
2. Check: cart not empty
3. Validate `delivery_id`, `payment_id` and required delivery fields
4. Find/create customer (`msCustomer`)
5. Optionally: create MODX user (setting `ms3_order_register_user_on_submit`)
6. Calculate cost (cart + delivery + payment)
7. Generate order number
8. Save customer address
9. Events `msOnBeforeCreateOrder` / `msOnCreateOrder`
10. Set status to `ms3_status_new` (default: 2)
11. Call `$msPayment->send()` — redirect to payment
12. Return thank-you page URL

### Order number generation

```php
$num = $submitHandler->getNewOrderNum();
// "26/02-15" — format is configurable:
// ms3_order_format_num — date format (default 'ym')
// ms3_order_format_num_separator — separator (default '/')

```

## Status management (OrderStatusService)

```php
$statusService = $modx->services->get('ms3_order_status');

// Change order status
$result = $statusService->change($orderId, $newStatusId);
// true — success
// string — error message from lexicon

// Change status without notifications
$result = $statusService->change($orderId, $newStatusId, true);

```

### Status constraints

| Status property | Behavior |
| --- | --- |
| `final = true` | Cannot change to another status |
| `fixed = true` | Can only switch to status with higher `position` |

On top of those two rules sits a list of allowed transitions — the `ms3_order_status_transitions` system setting. While it is empty, only `final` and `fixed` apply. Once the list is filled in, a transition has to be in it and must not break `final` or `fixed`.

The format is "from status : to status" pairs, comma-separated or as a JSON array:

```text
2:3,3:4,2:5
```

```json
[[2,3],[3,4]]
```

If the setting cannot be parsed, **every** status change is blocked with the `ms3_err_status_transitions_invalid` error. A typo in the list is not ignored: it halts order processing.

### Notifications

On a status change, `NotificationManager` sends the notifications itself:

- **To customer** — email, phone from `msCustomer` or `modUserProfile`
- **To managers** — from settings `ms3_email_manager`, `ms3_phone_manager`, `ms3_telegram_manager`

## Order products (msOrderProduct)

An order's products are stored in the `msOrderProduct` model (table `ms3_order_products`), one row per line.

### msOrderProduct fields

| Field | Type | Description |
| --- | --- | --- |
| `product_id` | integer | Product ID (msProduct) |
| `order_id` | integer | Order ID |
| `product_key` | string | Unique line key (e.g. `123_a1b2c3d4`) |
| `name` | string | Product name |
| `count` | integer | Quantity |
| `price` | float | Unit price |
| `weight` | float | Unit weight |
| `cost` | float | Line cost (price × count) |
| `options` | json | Selected options |
| `properties` | json | Extra properties |

### Working with products in code

```php
use MiniShop3\Model\msOrder;
use MiniShop3\Model\msOrderProduct;

$order = $modx->getObject(msOrder::class, $orderId);

// Get all order products
$products = $order->getMany('Products');
foreach ($products as $product) {
    echo $product->get('name') . ': ' . $product->get('count') . ' × ' . $product->get('price');
}

// Add product
$item = $modx->newObject(msOrderProduct::class);
$item->set('order_id', $orderId);
$item->set('product_id', $productId);
$item->set('product_key', $productId . '_' . md5(json_encode($options)));
$item->set('name', 'Product');
$item->set('count', 2);
$item->set('price', 1500.00);
$item->set('cost', 3000.00);
$item->set('weight', 0.5);
$item->set('options', $options);
$item->save();

// Recalculate order totals after changing products
$order->updateProducts();

```

::: warning Recalculating totals
After adding, removing or changing products call `$order->updateProducts()`. It recalculates `cart_cost`, `weight` and `cost` from all `msOrderProduct` of the order.
:::

## Order address (msOrderAddress)

Every order has exactly one related `msOrderAddress` (table `ms3_order_addresses`).

### msOrderAddress fields

| Field | Type | Description |
| --- | --- | --- |
| `order_id` | integer | Order ID |
| `first_name` | string | First name |
| `last_name` | string | Last name |
| `phone` | string | Phone |
| `email` | string | Email |
| `country` | string | Country |
| `index` | string | Postal code |
| `region` | string | Region |
| `city` | string | City |
| `metro` | string | Metro station |
| `street` | string | Street |
| `building` | string | Building |
| `entrance` | string | Entrance |
| `floor` | string | Floor |
| `room` | string | Apartment/office |
| `comment` | string | Address comment |
| `text_address` | string | Full address as single line |
| `properties` | json | Extra properties |

### Working with address in code

```php
use MiniShop3\Model\msOrder;

$order = $modx->getObject(msOrder::class, $orderId);
$address = $order->getOne('Address');

// Read
echo $address->get('city');       // "Moscow"
echo $address->get('street');     // "Lenina"

// Update
$address->set('city', 'Saint Petersburg');
$address->save();

```

### OrderAddressManager

The service works with the addresses of a draft:

```php
$addressManager = $modx->services->get('ms3_order_address_manager');

// Apply saved customer address to draft
$result = $addressManager->setCustomerAddress($draft, $orderData, $addressHash);

// Clear all address fields
$result = $addressManager->cleanCustomerAddress($draft, $orderData);

// Save order address to customer addresses
$savedAddress = $addressManager->saveToCustomerAddresses($customerId, $orderData);

```

## Order log (OrderLogService)

The log records order changes: status, fields, products.

```php
$logService = $modx->services->get('ms3_order_log');

// Add log entry
$logService->addEntry($orderId, 'status', [
    'old' => 1,
    'new' => 2,
]);

// Add custom action entry
$logService->addEntry($orderId, 'field', [
    'key' => 'delivery_id',
    'old_value' => 1,
    'new_value' => 2,
], true);  // visible = true (shown to customer)

// Get log entries
$entries = $logService->getEntries($orderId);
// Only customer-visible
$entries = $logService->getEntries($orderId, true);
// With limit
$entries = $logService->getEntries($orderId, false, 50);

// Check if action is logged (setting ms3_order_log_actions)
if ($logService->shouldLog('status')) {
    // ...
}

```

### Action types

| Constant | Value | Description |
| --- | --- | --- |
| `msOrderLog::ACTION_STATUS` | `status` | Status change |
| `msOrderLog::ACTION_PAYMENT` | `payment` | Payment change |
| `msOrderLog::ACTION_PRODUCTS` | `products` | Products change |
| `msOrderLog::ACTION_ADDRESS` | `address` | Address change |
| `msOrderLog::ACTION_FIELD` | `field` | Order field change |

The `ms3_order_log_actions` setting lists the actions to log. The default is `status,products,field,address`; `*` logs everything.

## Finalize from manager (OrderFinalizeService)

`OrderFinalizeService` finalizes orders created in the manager.

```php
use MiniShop3\Services\Order\OrderOrigin;

$finalizeService = $modx->services->get('ms3_order_finalize');

$result = $finalizeService->finalize($orderId, [
    'skip_validation' => false,
    'skip_notifications' => false,
    'create_customer' => true,
    'force_create_customer' => false,
    'origin' => OrderOrigin::MANAGER, // default; for CRM use OrderOrigin::INTEGRATION
]);
```

Finalize accepts the `skip_*` keys and works with an existing draft. It never calls the payment service — unlike `submit` on the storefront.

The `origin` parameter (`OrderOrigin`): `manager` (default), `storefront`, `integration`. With `manager`, `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` also fire. The `from_manager` key in events is `true` only for `origin=manager`.

## Programmatic order creation (ProgrammaticOrderService)

An API without an HTTP session — for extras, cron and integrations. This is **not** the Web API: `routes/web.php` has no dedicated endpoint.

| | |
| --- | --- |
| Key | `ms3_programmatic_order` |
| Class | `MiniShop3\Services\Order\ProgrammaticOrderService` |
| Draft | `OrderDraftManager::createSessionlessDraft()` (no PHP session or cart token) |
| Finalization | `OrderFinalizeService::finalize(..., origin=integration)` |
| Idempotency | column `ms3_orders.idempotency_key` (unique, nullable) |

```php
use MiniShop3\Services\Order\OrderOrigin;

$orders = $modx->services->get('ms3_programmatic_order');

$result = $orders->create([
    'idempotency_key' => 'crm-invoice-10042', // required
    'products' => [
        ['product_id' => 15, 'count' => 2],
        // or a snapshot without a resource:
        // ['name' => 'Service', 'price' => 500, 'count' => 1, 'weight' => 0, 'options' => []],
    ],
    'customer_id' => 0,
    'delivery_id' => 1,
    'payment_id' => 1,
    'address' => [
        'first_name' => 'John',
        'email' => 'user@example.com',
        'phone' => '+79991234567',
    ],
    'order_comment' => 'From CRM',
    'context' => 'web',
    'origin' => OrderOrigin::INTEGRATION,
    // 'delivery_cost' => 300, // → cost_mode=manual on finalize
    // 'skip_notifications' => true,
    // 'skip_validation' => false,
    // 'properties' => ['source' => 'crm'],
]);

if (!$result['success']) {
    // Common messages:
    // ms3_order_err_idempotency_key_required
    // ms3_order_err_products_required
    // ms3_order_err_programmatic_create
    // or finalize / validation errors
    return $result;
}

// Success: data = { order_id, uuid, num, status_id }
// Same idempotency_key again:
//   already finalized order → success + ms3_order_programmatic_idempotent
//   draft with draft status → finalize again
```

Events: `msOnBeforeCreateOrder` / `msOnCreateOrder` with `origin=integration` and **without** `from_manager`. Events `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` are **not** fired.

Differs from `POST /api/mgr/orders` (a manager creates an empty or partial order in the UI) and from `POST /api/v1/order/submit` on the storefront (needs a token and a cart).

## User resolution (OrderUserResolver)

The service finds or creates the MODX user from the order data.

```php
$userResolver = $modx->services->get('ms3_order_user_resolver');

// Get or create MODX user_id
$userId = $userResolver->getUserId($orderData);

// Check if user exists
$user = $userResolver->checkUserExists([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
]);

// Create user
$user = $userResolver->createUser([
    'email' => 'user@example.com',
    'first_name' => 'John',
    'last_name' => 'Doe',
    'phone' => '+79991234567',
]);

```

The `ms3_order_user_groups` setting defines the groups for new users. The format is `group_id:role_id`, comma-separated.

## msOrder fields

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `user_id` | integer | 0 | MODX user ID |
| `customer_id` | integer | 0 | Customer ID (msCustomer) |
| `token` | string | — | Client session token |
| `uuid` | string | — | Order UUID |
| `createdon` | datetime | null | Created at |
| `updatedon` | datetime | null | Updated at |
| `num` | string | '' | Order number |
| `cost` | float | 0.0 | Total cost |
| `cart_cost` | float | 0.0 | Products cost |
| `delivery_cost` | float | 0.0 | Delivery cost |
| `weight` | float | 0.0 | Total weight |
| `status_id` | integer | 0 | Current status ID |
| `delivery_id` | integer | 0 | Delivery method ID |
| `payment_id` | integer | 0 | Payment method ID |
| `context` | string | 'web' | MODX context |
| `order_comment` | string | null | Order comment |
| `idempotency_key` | string | null | Idempotency key (programmatic orders, unique) |
| `properties` | json | null | Extra properties (incl. `origin` for integrations) |

### msOrder relations

| Relation | Model | Type | Description |
| --- | --- | --- | --- |
| `Address` | msOrderAddress | composite (one) | Order address |
| `Products` | msOrderProduct | composite (many) | Order products |
| `Log` | msOrderLog | composite (many) | Change log |
| `Customer` | msCustomer | aggregate | Customer |
| `Status` | msOrderStatus | aggregate | Status |
| `Delivery` | msDelivery | aggregate | Delivery method |
| `Payment` | msPayment | aggregate | Payment method |
| `User` | modUser | aggregate | MODX user |

::: info Composite vs Aggregate
Composite relations are deleted with the order (address, products, log). Aggregate relations are references only; related objects are not deleted.
:::

## Events

| Event | When fired |
| --- | --- |
| `msOnBeforeSaveOrder` / `msOnSaveOrder` | Order save |
| `msOnBeforeRemoveOrder` / `msOnRemoveOrder` | Order remove |
| `msOnBeforeGetOrderCost` / `msOnGetOrderCost` | Order total composition |
| `msOnBeforeGetCartCost` / `msOnGetCartCost` | Cart cost calculation |
| `msOnBeforeGetDeliveryCost` / `msOnGetDeliveryCost` | Delivery cost calculation |
| `msOnBeforeGetPaymentCost` / `msOnGetPaymentCost` | Payment cost calculation |
| `msOnBeforeAddToOrder` / `msOnAddToOrder` | Add/update field |
| `msOnBeforeRemoveFromOrder` / `msOnRemoveFromOrder` | Remove field |
| `msOnBeforeValidateOrderValue` / `msOnValidateOrderValue` | Value validation |
| `msOnErrorValidateOrderValue` | Validation error |
| `msOnSubmitOrder` | Start submit |
| `msOnBeforeCreateOrder` / `msOnCreateOrder` | Order creation |
| `msOnBeforeChangeOrderStatus` / `msOnChangeOrderStatus` | Status change |
| `msOnBeforeGetOrderUser` / `msOnGetOrderUser` | Find/create user |
| `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` | Finalize from manager (only `origin=manager`) |

## Manager REST API

Endpoints of the Vue orders UI. They run under an mgr session — see [API Router](../routing).

| Method | Path | Description |
| --- | --- | --- |
| `GET` | `/api/mgr/orders` | Order list |
| `GET` | `/api/mgr/orders/filters` | Grid filter values |
| `GET` | `/api/mgr/orders/stats` | Aggregates for filters and the dashboard |
| `GET` | `/api/mgr/orders/{id}` | Order card |
| `PUT` | `/api/mgr/orders/{id}` | Update order |
| `DELETE` | `/api/mgr/orders/{id}` | Delete order |
| `DELETE` | `/api/mgr/orders/bulk` | Bulk delete |
| `POST` | `/api/mgr/orders` | Create order from the manager |
| `POST` | `/api/mgr/orders/{id}/finalize` | Finalize draft |
| `POST` | `/api/mgr/orders/{id}/recalculate-cost` | Recalculate via `ManagerOrderCostRecalculator` |
| `GET` | `/api/mgr/orders/{id}/logs` | Order log |
| `GET` | `/api/mgr/orders/{id}/products` | Order products |
| `POST` | `/api/mgr/orders/{id}/products` | Add a product |
| `PUT` | `/api/mgr/orders/{id}/products/{product_id}` | Update a product |
| `DELETE` | `/api/mgr/orders/{id}/products/{product_id}` | Delete a product |
| `GET` | `/api/mgr/orders/{id}/shipment` | Order shipment |
| `PUT` | `/api/mgr/orders/{id}/shipment` | Update shipment |

Create and finalize from the manager go through `OrderFinalizeService` and fire `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder`.

Event parameters: [Events](../events).
