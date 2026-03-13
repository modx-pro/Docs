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

The main way to work with orders from PHP is the facade controller `Order`. It delegates to dedicated services but exposes a single interface.

```php
$ms3 = $modx->services->get('ms3');

// Get current order data
$data = $ms3->order->get();

// Add field
$result = $ms3->order->add('email', 'user@example.com');

// Set multiple fields
$result = $ms3->order->set([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
    'delivery' => 1,
    'payment' => 1,
]);

// Submit order
$result = $ms3->order->submit();
// ['success' => true, 'data' => ['order_id' => 15, 'order_num' => '26/02-15', ...]]

// Clear draft
$ms3->order->clean();
```

::: info Initialization
Before using the controller you must initialize with the client token:
```php
$ms3->order->initialize($token);
$ms3->order->initDraft();
```
In REST API and snippet context this is done automatically.
:::

### Controller methods

| Method | Description |
|-------|----------|
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
| `getDraft()` | Get draft msOrder object |

## Drafts (OrderDraftManager)

A draft is an `msOrder` with draft status. It is created on first cart interaction and holds data until submit.

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

The service manages order fields, validation and fires system events on change.

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

By default `delivery_id` and `payment_id` are validated as `required|numeric`. Extra rules come from delivery settings.

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

Each method fires `msOnBefore...` / `msOn...` events so plugins can modify costs.

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
|------------------|-----------|
| `final = true` | Cannot change to another status |
| `fixed = true` | Can only switch to status with higher `position` |

### Notifications

On status change, notifications are sent via `NotificationManager`:

- **To customer** — email, phone from `msCustomer` or `modUserProfile`
- **To managers** — from settings `ms3_email_manager`, `ms3_phone_manager`, `ms3_telegram_manager`

## Order products (msOrderProduct)

Products in an order are stored in model `msOrderProduct` (table `ms3_order_products`).

### msOrderProduct fields

| Field | Type | Description |
|------|-----|----------|
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
After adding, removing or changing products call `$order->updateProducts()`. It recalculates `cart_cost`, `weight` and `cost` from all `msOrderProduct`.
:::

## Order address (msOrderAddress)

Each order has one related `msOrderAddress` (table `ms3_order_addresses`).

### msOrderAddress fields

| Field | Type | Description |
|------|-----|----------|
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

Service for addresses in draft context:

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

The log records all order changes: status, fields, products.

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
|-----------|----------|----------|
| `msOrderLog::ACTION_STATUS` | `status` | Status change |
| `msOrderLog::ACTION_PAYMENT` | `payment` | Payment change |
| `msOrderLog::ACTION_PRODUCTS` | `products` | Products change |
| `msOrderLog::ACTION_ADDRESS` | `address` | Address change |
| `msOrderLog::ACTION_FIELD` | `field` | Order field change |

Setting `ms3_order_log_actions` controls which actions are logged (default: `status,products,field,address`; `*` to log all).

## Finalize from manager (OrderFinalizeService)

`OrderFinalizeService` is used to finalize orders created in the manager.

```php
$finalizeService = $modx->services->get('ms3_order_finalize');

$result = $finalizeService->finalize($orderId, [
    'skip_validation' => false,      // Skip field validation
    'skip_notifications' => false,   // Skip notifications
    'skip_payment' => true,          // Skip payment call
    'create_customer' => true,       // Create msCustomer
    'force_create_customer' => false, // Create even if duplicate
]);
```

Finalize runs the same steps as `submit` but for manager context: you can skip steps and it works with an existing order (not a draft).

## User resolution (OrderUserResolver)

The service finds or creates the MODX user from order data.

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

Setting `ms3_order_user_groups` defines groups for new users (format: `group_id:role_id`, comma-separated).

## msOrder fields

| Field | Type | Default | Description |
|------|-----|--------------|----------|
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
| `properties` | json | null | Extra properties |

### msOrder relations

| Relation | Model | Type | Description |
|-------|--------|-----|----------|
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
|---------|-----------------|
| `msOnBeforeSaveOrder` / `msOnSaveOrder` | Order save |
| `msOnBeforeRemoveOrder` / `msOnRemoveOrder` | Order remove |
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
| `msOnBeforeFinalizeOrder` / `msOnFinalizeOrder` | Finalize from manager |

Event parameter details: [Events](../events).
