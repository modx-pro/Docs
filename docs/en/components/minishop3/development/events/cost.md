---
title: Cost events
---
# Cost events

Calculating and modifying the cost of the cart, the delivery and the payment.

::: warning The cart controller arrives under two different names
In the cart and order-total events the parameter is called `cart`, while in the delivery and payment events it is `cartController`. This is a historical inconsistency of the core: a plugin copied from `msOnGetCartCost` to `msOnGetDeliveryCost` receives `null` instead of the controller. Check the parameter table of the event you need.
:::

## msOnBeforeGetCartCost

Fired **before** calculating cart cost.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` \| `null` | Order draft (`null` when the cart is empty) |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetCartCost':
        // Disallow calculation for certain users
        if (!$modx->user->isMember('Customers')) {
            $modx->event->output('Calculation not available');
            return;
        }
        break;
}
```

---

## msOnGetCartCost

Fired **after** calculating cart cost. Lets you modify the total.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` \| `null` | Order draft |
| `cost` | `float` | Calculated cost |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];

        $values = &$modx->event->returnedValues;

        // 10% discount for authenticated users
        if ($modx->user->isAuthenticated()) {
            $values['cost'] = $cost * 0.9;
        }
        break;
}
```

### Applying promo code

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];

        // Check promo code in session
        if (empty($_SESSION['ms3']['promocode'])) {
            return;
        }

        $promocode = $modx->getObject('msPromocode', [
            'code' => $_SESSION['ms3']['promocode'],
            'active' => 1,
        ]);

        if (!$promocode) {
            unset($_SESSION['ms3']['promocode']);
            return;
        }

        $discount = 0;
        $type = $promocode->get('type');
        $value = $promocode->get('value');

        switch ($type) {
            case 'percent':
                $discount = $cost * ($value / 100);
                break;
            case 'fixed':
                $discount = $value;
                break;
        }

        $values = &$modx->event->returnedValues;
        $values['cost'] = max(0, $cost - $discount);

        // Save discount info
        $modx->eventData['promocode'] = [
            'code' => $promocode->get('code'),
            'discount' => $discount,
        ];
        break;
}
```

---

## msOnBeforeGetDeliveryCost

Fired **before** calculating delivery cost.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetDeliveryCost':
        // Check if delivery method is selected
        // If not — do not calculate delivery cost
        break;
}
```

---

## msOnGetDeliveryCost

Fired **after** calculating delivery cost. Lets you modify the cost.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft |
| `cost` | `float` | Calculated delivery cost |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $cartController = $scriptProperties['cartController'];

        // Get cart cost
        $response = $cartController->status();
        $cartCost = $response['data']['total_cost'] ?? 0;

        $values = &$modx->event->returnedValues;

        // Free delivery for orders over 5000
        if ($cartCost >= 5000) {
            $values['cost'] = 0;
            return;
        }

        // 50% delivery discount for orders over 3000
        if ($cartCost >= 3000) {
            $values['cost'] = $cost * 0.5;
            return;
        }
        break;
}
```

### Weight-based delivery calculation

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $cartController = $scriptProperties['cartController'];

        // Get cart status with weight
        $response = $cartController->status();
        $totalWeight = $response['data']['total_weight'] ?? 0;

        // Base rate + weight surcharge
        $baseCost = 300;
        $weightCost = ceil($totalWeight / 1000) * 50; // 50 per kg

        $values = &$modx->event->returnedValues;
        $values['cost'] = $baseCost + $weightCost;
        break;
}
```

### Zone-based calculation

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];
        $draft = $scriptProperties['draft'];

        // Get the delivery city from the draft address
        $address = $draft ? $draft->getOne('Address') : null;
        $city = $address ? $address->get('city') : '';

        // Delivery zones
        $zones = [
            'Moscow' => 0,
            'Saint Petersburg' => 200,
            'Kazan' => 350,
            'Novosibirsk' => 500,
        ];

        $zoneCost = $zones[$city] ?? 700; // Default

        $values = &$modx->event->returnedValues;
        $values['cost'] = $cost + $zoneCost;
        break;
}
```

---

## msOnBeforeGetPaymentCost

Fired **before** calculating payment method fee.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft |

---

## msOnGetPaymentCost

Fired **after** calculating payment method fee. Lets you modify the fee.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cartController` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` | Order draft |
| `cost` | `float` | Calculated fee |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetPaymentCost':
        $cost = $scriptProperties['cost'];

        $values = &$modx->event->returnedValues;

        // No fee for regular customers
        if ($modx->user->isAuthenticated()) {
            $profile = $modx->user->getOne('Profile');
            $ordersCount = $modx->getCount(\MiniShop3\Model\msOrder::class, [
                'user_id' => $modx->user->get('id'),
                'status_id:>' => 1, // Exclude drafts
            ]);

            if ($ordersCount >= 5) {
                $values['cost'] = 0; // No fee
            }
        }
        break;
}
```

### Fee discount

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetPaymentCost':
        $cost = $scriptProperties['cost'];
        $cartController = $scriptProperties['cartController'];

        // Get cart cost
        $response = $cartController->status();
        $cartCost = $response['data']['total_cost'] ?? 0;

        $values = &$modx->event->returnedValues;

        // For orders over 10000 — no fee
        if ($cartCost >= 10000) {
            $values['cost'] = 0;
        }
        break;
}
```

---

## msOnBeforeGetOrderCost

Fired **before** the order total is assembled in `OrderCostCalculator`: after the event the core calculates the cart, delivery and payment cost and composes the breakdown.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` \| `null` | Order draft |
| `with_cart` | `bool` | Always `true` in the current call path |
| `only_cost` | `bool` | “Amount only” mode (no UI side effects) |

Abort with `$modx->event->output('...')` — the calculator returns an error.

---

## msOnGetOrderCost

Fired **after** the breakdown is composed. Override any of the four amounts via `returnedValues` — the core recomposes the final `cost`.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `calculator` | `\MiniShop3\Services\Order\OrderCostCalculator` | Cost calculator |
| `cart` | `\MiniShop3\Controllers\Cart\Cart` | Cart controller |
| `draft` | `msOrder` \| `null` | Order draft |
| `with_cart` | `bool` | Cart-included calculation flag |
| `only_cost` | `bool` | “Amount only” mode |
| `cost` | `float` | Total before plugin overrides |
| `cart_cost` | `float` | Products subtotal |
| `delivery_cost` | `float` | Delivery |
| `payment_cost` | `float` | Payment fee |

### Override the total

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetOrderCost':
        $values = &$modx->event->returnedValues;
        $cartCost = (float) $scriptProperties['cart_cost'];
        $deliveryCost = (float) $scriptProperties['delivery_cost'];
        $paymentCost = (float) $scriptProperties['payment_cost'];

        // Fixed discount on the whole order (not cart-only)
        if ($cartCost >= 5000) {
            $values['cart_cost'] = max(0, $cartCost - 500);
        }

        // Free delivery for large orders
        if (($values['cart_cost'] ?? $cartCost) >= 3000) {
            $values['delivery_cost'] = 0;
        }

        break;
}
```

::: warning `cost` in returnedValues has no effect
The core **always** recomposes the final `cost` from `cart_cost`/`delivery_cost`/`payment_cost` after the event — any `$values['cost'] = ...` set by a plugin is silently discarded. To influence the total, change `cart_cost`/`delivery_cost`/`payment_cost`, as shown above.
:::

::: tip A partial event or the total one
For a products-only discount prefer `msOnGetCartCost`. For a rule that must touch cart + delivery + payment together, use `msOnGetOrderCost`.
:::

---

## Full example: discount system

```php
<?php
/**
 * Plugin: Discount system
 * Events: msOnGetCartCost, msOnGetDeliveryCost
 */

switch ($modx->event->name) {

    case 'msOnGetCartCost':
        $cost = $scriptProperties['cost'];
        $values = &$modx->event->returnedValues;

        $discount = 0;
        $discountInfo = [];

        // 1. Promo code discount
        if (!empty($_SESSION['ms3']['promocode'])) {
            $promocode = $modx->getObject('msPromocode', [
                'code' => $_SESSION['ms3']['promocode'],
                'active' => 1,
            ]);
            if ($promocode && $promocode->get('type') === 'percent') {
                $promoDiscount = $cost * ($promocode->get('value') / 100);
                $discount += $promoDiscount;
                $discountInfo['promocode'] = $promoDiscount;
            }
        }

        // 2. VIP customer discount
        if ($modx->user->isMember('VIP')) {
            $vipDiscount = $cost * 0.15;
            $discount += $vipDiscount;
            $discountInfo['vip'] = $vipDiscount;
        }

        // 3. Volume discount (10+ products)
        $cart = $scriptProperties['cart'];
        $response = $cart->status();
        $totalCount = $response['data']['total_count'] ?? 0;
        if ($totalCount >= 10) {
            $volumeDiscount = $cost * 0.05;
            $discount += $volumeDiscount;
            $discountInfo['volume'] = $volumeDiscount;
        }

        // Apply discount
        $values['cost'] = max(0, $cost - $discount);

        // Save for display
        $modx->eventData['discounts'] = $discountInfo;
        $modx->eventData['total_discount'] = $discount;
        break;

    case 'msOnGetDeliveryCost':
        $cost = $scriptProperties['cost'];

        // Free delivery when discount >= 1000
        $totalDiscount = $modx->eventData['total_discount'] ?? 0;
        if ($totalDiscount >= 1000) {
            $values = &$modx->event->returnedValues;
            $values['cost'] = 0;
        }
        break;
}
```
