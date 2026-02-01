---
title: Customer events
---
# Customer events

Events for managing customer data: adding fields, validation, creating customer, managing addresses.

## msOnBeforeGetOrderCustomer

Fired **before** getting the customer for the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `msCustomer` | `msCustomer\|null` | Customer object (may be null) |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetOrderCustomer':
        // Require login for checkout
        if (!$modx->user->isAuthenticated()) {
            $modx->event->output('You must be logged in to place an order');
            return;
        }
        break;
}
```

---

## msOnGetOrderCustomer

Fired **after** getting the customer for the order.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Order controller |
| `msCustomer` | `msCustomer\|null` | Customer object |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetOrderCustomer':
        /** @var \MiniShop3\Model\msCustomer $customer */
        $customer = $scriptProperties['msCustomer'];

        if ($customer) {
            // Update visit stats
            $visits = $customer->get('visits') ?? 0;
            $customer->set('visits', $visits + 1);
            $customer->set('last_visit', date('Y-m-d H:i:s'));
            $customer->save();
        }
        break;
}
```

---

## msOnBeforeAddToCustomer

Fired **before** adding or changing a customer field.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Field value |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCustomer':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        // Block certain email domains
        if ($key === 'email') {
            $blockedDomains = ['tempmail.com', 'throwaway.com'];
            $domain = substr($value, strpos($value, '@') + 1);

            if (in_array($domain, $blockedDomains)) {
                $modx->event->output('Temporary email addresses are not accepted');
                return;
            }
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCustomer':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Format phone
        if ($key === 'phone') {
            $values['value'] = '+7' . preg_replace('/\D/', '', $value);
        }

        // Capitalize name
        if ($key === 'first_name' || $key === 'last_name') {
            $values['value'] = mb_convert_case($value, MB_CASE_TITLE, 'UTF-8');
        }
        break;
}
```

---

## msOnAddToCustomer

Fired **after** adding a field to the customer.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Saved value |
| `msCustomer` | `msCustomer` | Customer object |
| `isNew` | `bool` | Whether customer is new |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddToCustomer':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];
        $customer = $scriptProperties['msCustomer'];
        $isNew = $scriptProperties['isNew'];

        // Log new customers
        if ($isNew) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Customer] Created customer #%d: %s = %s',
                $customer->get('id'),
                $key,
                $value
            ));
        }
        break;
}
```

---

## msOnBeforeValidateCustomerValue

Fired **before** validating a customer field value.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Value to validate |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeValidateCustomerValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Normalize email before validation
        if ($key === 'email') {
            $values['value'] = strtolower(trim($value));
        }
        break;
}
```

---

## msOnValidateCustomerValue

Fired **after** successful validation of a field value.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Validated value |

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnValidateCustomerValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Post-process phone
        if ($key === 'phone') {
            // Format for display
            $values['value'] = preg_replace(
                '/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/',
                '+$1 ($2) $3-$4-$5',
                preg_replace('/\D/', '', $value)
            );
        }
        break;
}
```

---

## msOnErrorValidateCustomerValue

Fired on validation **error** for a customer field.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `key` | `string` | Field key |
| `value` | `mixed` | Invalid value |
| `errors` | `array` | Errors array |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnErrorValidateCustomerValue':
        $key = $scriptProperties['key'];
        $errors = $scriptProperties['errors'];

        // Customize error messages
        $modx->log(modX::LOG_LEVEL_WARN, sprintf(
            '[Customer] Validation error %s: %s',
            $key,
            json_encode($errors)
        ));
        break;
}
```

---

## msOnBeforeCreateCustomer

Fired **before** creating a new customer.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `customerData` | `array` | Data for creation |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateCustomer':
        $data = $scriptProperties['customerData'];

        // Check for duplicate
        $existing = $modx->getObject(\MiniShop3\Model\msCustomer::class, [
            'email' => $data['email'],
        ]);

        if ($existing) {
            $modx->event->output('A customer with this email already exists');
            return;
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateCustomer':
        $data = $scriptProperties['customerData'];

        $values = &$modx->event->returnedValues;

        // Add extra fields
        $data['createdon'] = date('Y-m-d H:i:s');
        $data['source'] = $_SERVER['HTTP_REFERER'] ?? 'direct';
        $data['ip'] = $_SERVER['REMOTE_ADDR'] ?? '';

        $values['customerData'] = $data;
        break;
}
```

---

## msOnCreateCustomer

Fired **after** creating a new customer.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `customerData` | `array` | Customer data |
| `msCustomer` | `msCustomer` | Created customer object |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateCustomer':
        /** @var \MiniShop3\Model\msCustomer $customer */
        $customer = $scriptProperties['msCustomer'];

        // Log
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Customer] Created customer #%d: %s %s (%s)',
            $customer->get('id'),
            $customer->get('first_name'),
            $customer->get('last_name'),
            $customer->get('email')
        ));

        // Send to CRM
        // $crm->createContact($customer->toArray());

        // Newsletter signup
        // $mailService->subscribe($customer->get('email'));
        break;
}
```

---

## msOnBeforeAddCustomerAddress

Fired **before** adding an address to the customer.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `addressData` | `array` | Address data |

### Aborting the operation

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddCustomerAddress':
        $data = $scriptProperties['addressData'];

        // Limit number of addresses
        $count = $modx->getCount(\MiniShop3\Model\msCustomerAddress::class, [
            'customer_id' => $data['customer_id'],
        ]);

        if ($count >= 5) {
            $modx->event->output('Maximum 5 addresses per customer');
            return;
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddCustomerAddress':
        $data = $scriptProperties['addressData'];

        $values = &$modx->event->returnedValues;

        // Geocode address
        $fullAddress = implode(', ', array_filter([
            $data['city'],
            $data['street'],
            $data['building'],
        ]));

        // $coordinates = $geocoder->geocode($fullAddress);
        // $data['lat'] = $coordinates['lat'];
        // $data['lng'] = $coordinates['lng'];

        $values['addressData'] = $data;
        break;
}
```

---

## msOnAddCustomerAddress

Fired **after** adding an address to the customer.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Customer controller |
| `addressData` | `array` | Address data |
| `msCustomerAddress` | `msCustomerAddress` | Created address object |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddCustomerAddress':
        $address = $scriptProperties['msCustomerAddress'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Customer] Added address #%d for customer #%d: %s',
            $address->get('id'),
            $address->get('customer_id'),
            $address->get('name')
        ));
        break;
}
```

---

## Full example: customer verification

```php
<?php
/**
 * Plugin: Customer verification
 * Events: msOnBeforeCreateCustomer, msOnCreateCustomer
 */

switch ($modx->event->name) {

    case 'msOnBeforeCreateCustomer':
        $data = $scriptProperties['customerData'];

        // Check if email exists
        $existing = $modx->getObject(\MiniShop3\Model\msCustomer::class, [
            'email' => $data['email'],
        ]);

        if ($existing) {
            // Update token for existing customer
            $existing->set('token', $data['token']);
            $existing->save();
            $modx->event->output('Customer found by email');
            return;
        }

        // Check phone
        if (!empty($data['phone'])) {
            $existingByPhone = $modx->getObject(\MiniShop3\Model\msCustomer::class, [
                'phone' => $data['phone'],
            ]);

            if ($existingByPhone) {
                $existingByPhone->set('token', $data['token']);
                $existingByPhone->save();
                $modx->event->output('Customer found by phone');
                return;
            }
        }

        // Add metadata
        $values = &$modx->event->returnedValues;
        $data['verified'] = false;
        $data['verification_code'] = substr(md5(uniqid()), 0, 6);
        $data['createdon'] = date('Y-m-d H:i:s');
        $values['customerData'] = $data;
        break;

    case 'msOnCreateCustomer':
        $customer = $scriptProperties['msCustomer'];
        $data = $scriptProperties['customerData'];

        // Send verification code
        if (!empty($data['verification_code']) && !empty($customer->get('email'))) {
            // Send email with code
            // $mailer->send($customer->get('email'), 'Verification code: ' . $data['verification_code']);

            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Verification] Code %s sent to %s',
                $data['verification_code'],
                $customer->get('email')
            ));
        }
        break;
}
```
