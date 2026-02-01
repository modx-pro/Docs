---
title: Order events
---
# Order events

Events for managing order fields: adding, validation, removing fields, order submission.

## msOnBeforeAddToOrder

Fired **before** adding or changing an order field.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Field value |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToOrder':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        // Disallow selecting a specific delivery method
        if ($key === 'delivery_id' && $value == 5) {
            $modx->event->output('Delivery is temporarily unavailable');
            return;
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToOrder':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        if ($key === 'phone') {
            $values['value'] = preg_replace('/\D/', '', $value);
        }
        if ($key === 'email') {
            $values['value'] = strtolower(trim($value));
        }
        break;
}
```

---

## msOnAddToOrder

Fired **after** adding a field to the order (after successful validation).

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Validated value |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddToOrder':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $modx->log(modX::LOG_LEVEL_INFO, "[Order] Field {$key} set: {$value}");

        if ($key === 'delivery_id' && !empty($value)) {
            $controller = $scriptProperties['controller'];
            // Auto-select first payment...
        }
        break;
}
```

---

## msOnBeforeValidateOrderValue

Fired **before** validating a field value.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Value to validate |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeValidateOrderValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        if ($key === 'index') {
            $values['value'] = str_replace(' ', '', $value);
        }
        break;
}
```

---

## msOnValidateOrderValue

Fired **after** successful field validation.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Validated value |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnValidateOrderValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        if ($key === 'city') {
            $values['value'] = $value . ', Moscow Region';
        }
        break;
}
```

---

## msOnErrorValidateOrderValue

Fired on validation **error**. Lets you change the error message or clear the error.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Invalid value |
| `error` | `array` | Errors array `['field' => 'message']` |

### Customizing error message

```php
<?php
switch ($modx->event->name) {
    case 'msOnErrorValidateOrderValue':
        $key = $scriptProperties['key'];
        $error = $scriptProperties['error'];

        $values = &$modx->event->returnedValues;

        if ($key === 'email') {
            $values['error'] = [$key => 'Enter a valid email to receive the receipt'];
        }
        if ($key === 'phone') {
            $values['error'] = [$key => 'Phone is required for courier contact'];
        }
        break;
}
```

### Clearing the error

```php
<?php
switch ($modx->event->name) {
    case 'msOnErrorValidateOrderValue':
        $key = $scriptProperties['key'];

        if ($key === 'comment') {
            $values = &$modx->event->returnedValues;
            $values['error'] = [];
        }
        break;
}
```

---

## msOnBeforeRemoveFromOrder

Fired **before** removing a field from the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Field key to remove |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveFromOrder':
        $key = $scriptProperties['key'];

        $required = ['delivery_id', 'payment_id', 'email'];
        if (in_array($key, $required)) {
            $modx->event->output('This field cannot be removed');
            return;
        }
        break;
}
```

---

## msOnRemoveFromOrder

Fired **after** removing a field from the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `key` | `string` | Removed field key |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveFromOrder':
        $key = $scriptProperties['key'];

        if ($key === 'delivery_id') {
            $controller = $scriptProperties['controller'];
            // Reset payment...
        }
        break;
}
```

---

## msOnSubmitOrder

Fired on order **submission** (Submit button). Lets you validate data and add extra info.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `data` | `array` | Extra form data |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnSubmitOrder':
        $controller = $scriptProperties['controller'];
        $data = $scriptProperties['data'];

        $response = $controller->getCost();
        if ($response['success'] && $response['data']['cart_cost'] < 1000) {
            $modx->event->output('Minimum order amount is 1000');
            return;
        }

        $hour = (int)date('G');
        if ($hour < 9 || $hour > 21) {
            $modx->event->output('Orders accepted from 9:00 to 21:00');
            return;
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnSubmitOrder':
        $data = $scriptProperties['data'];

        $values = &$modx->event->returnedValues;

        if (!empty($_SESSION['utm'])) {
            $data['properties']['utm'] = $_SESSION['utm'];
            $values['data'] = $data;
        }

        $data['properties']['source'] = $_SERVER['HTTP_REFERER'] ?? 'direct';
        $values['data'] = $data;
        break;
}
```

---

## msOnBeforeCreateOrder

Fired **before** final order creation (assigning "New" status).

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `msOrder` | `msOrder` | Order object |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrder':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];

        foreach ($order->getMany('Products') as $product) {
            $msProduct = $product->getOne('Product');
            $remains = $msProduct->get('remains') ?? 0;
            if ($product->get('count') > $remains) {
                $modx->event->output(sprintf(
                    'Product "%s" is not available in the requested quantity',
                    $msProduct->get('pagetitle')
                ));
                return;
            }
        }
        break;
}
```

### Modifying the order

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrder':
        $order = $scriptProperties['msOrder'];

        $properties = $order->get('properties') ?? [];
        $properties['manager_note'] = 'Order created ' . date('d.m.Y H:i');
        $order->set('properties', $properties);
        break;
}
```

---

## msOnCreateOrder

Fired **after** successful order creation.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `msOrder` | `msOrder` | Created order |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrder':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Created order #%s, amount: %s',
            $order->get('num'),
            $order->get('cost')
        ));

        // $crm->createOrder($order->toArray());

        foreach ($order->getMany('Products') as $product) {
            $msProduct = $product->getOne('Product');
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', max(0, $remains - $product->get('count')));
            $msProduct->save();
        }

        if ($customer = $order->getOne('Customer')) {
            $bonus = floor($order->get('cost') / 100);
            $currentBonus = $customer->get('bonus') ?? 0;
            $customer->set('bonus', $currentBonus + $bonus);
            $customer->save();
        }
        break;
}
```

### External service integration

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrder':
        $order = $scriptProperties['msOrder'];
        $address = $order->getOne('Address');

        $deliveryData = [
            'order_id' => $order->get('num'),
            'recipient' => [
                'name' => $address->get('first_name') . ' ' . $address->get('last_name'),
                'phone' => $address->get('phone'),
                'email' => $address->get('email'),
            ],
            'address' => [
                'city' => $address->get('city'),
                'street' => $address->get('street'),
                'building' => $address->get('building'),
            ],
            'items' => [],
        ];

        foreach ($order->getMany('Products') as $product) {
            $deliveryData['items'][] = [
                'name' => $product->get('name'),
                'count' => $product->get('count'),
                'price' => $product->get('price'),
            ];
        }

        // $deliveryApi->createShipment($deliveryData);
        break;
}
```
