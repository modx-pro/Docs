# Programmatic API

## Processors

### coupons/create

Example of creating a promo code via processor:

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$tools = $mspc2->getTools();

// Promo code data
$data = [
  'code' => 'coupon_code', // Code
  'list' => 'default', // List

  'discount' => '50%', // Discount
  'count' => 20, // Count

  'startedon' => 0, // Start (timestamp)
  'stoppedon' => 0, // End (timestamp)

  'description' => '', // Description

  'active' => true, // Enabled

  'showinfo' => true, // Show warnings

  'oneunit' => false, // Per product unit

  'onlycart' => true, // Only in cart

  'unsetifnull' => true, // Don't apply without discount
  'unsetifnull_msg' => '', // Unset message

  'oldprice' => false, // Without old price
];

$response = $tools->runProcessor('mgr/coupons/create', $data);
if ($errors = $tools->formatProcessorErrors($response)) {
  // Print error
  print_r($errors);
} else {
  // Print promo code array
  print_r($response->getObject());
}
```

### coupons/remove

Example of removing a promo code via processor:

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$tools = $mspc2->getTools();

$data = [
  'id' => 22, // Promo code ID to remove
];

$response = $tools->runProcessor('mgr/coupons/remove', $data);
if ($errors = $tools->formatProcessorErrors($response)) {
  print_r($errors);
} else {
  print_r('Removed!');
}
```

## mspc2Randexp service

Generates a string from a template. Uses the RegRev library.

### Loading

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$randexp = $mspc2->getRandexp();
```

### Generating unique code

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$randexp = $mspc2->getRandexp();

$code = '';
$format = '[0-9]{4}-[a-zA-Z0-9]{12}'; // regex-like pattern
while (empty($code)) {
  $tmp = $randexp->get($format);
  if (!$modx->getCount('mspc2Coupon', ['code' => $tmp])) {
    $code = $tmp;
  }
  unset($tmp);
}

print_r($code);
```

## mspc2Manager service

This service handles promo code validation, apply and unset for the cart in the public API.

### Loading mspc2Manager

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();
```

### getCoupon

Returns `array` with the current cart promo code or `string` with an error if the promo code is invalid or not found.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

$coupon_id = 8; // int
$coupon_code = 'code'; // string

// Get coupon by code — pass string as first parameter
$result = $manager->getCoupon($coupon_code);

// or

// Get coupon by id — pass integer as first parameter
$result = $manager->getCoupon($coupon_id);

// Check if we got the promo code
if (is_array($result)) {
  print_r('Promo code: ' . print_r($result, 1));
} else {
  print_r('Error: ' . $result);
}
```

### getCurrentCoupon

Returns `array` with the current promo code or `null` if none is applied.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

//
$result = $manager->getCurrentCoupon();
if (is_array($result)) {
  print_r('Current promo code: ' . print_r($result, 1));
} else {
  print_r('No current promo code: ' . print_r($result, 1));
}
```

### setCoupon

Applies the coupon to the cart.

Returns `array` with the promo code on success, otherwise `string` with error.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

$coupon_id = 8; // int
$coupon_code = 'code'; // string

// Apply coupon by code — pass string as first parameter
$result = $manager->setCoupon($coupon_code);

// or

// Apply coupon by id — pass integer as first parameter
$result = $manager->setCoupon($coupon_id);

// Check if promo code was applied
if (is_array($result)) {
  print_r('Applied promo code: ' . print_r($result, 1));
} else {
  print_r('Error: ' . $result);
}
```

### unsetCoupon

Removes the promo code from the cart.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

//
$manager->unsetCoupon();
```

### generateCoupon

Generates a promo code with format `string $format` and parameters `array $data`.

Returns `array` with the promo code on success, otherwise `string` with error.

```php
$mspc2 = $modx->getService('mspromocode2', 'msPromoCode2',
    MODX_CORE_PATH . 'components/mspromocode2/model/mspromocode2/');
$mspc2->initialize($modx->context->key);
$manager = $mspc2->getManager();

// Promo code format as regex-like syntax
$format = '[a-zA-Z0-9]{12}';

// Promo code parameters
$data = [
  // Main
  'list' => 'custom-list', // Promo code "List" field
  'count' => 1, // How many times the generated promo code can be applied
  'discount' => '10%', // Discount for generated promo code
  'description' => '', // Promo code description

  // Config
  'showinfo' => true, // Show warnings
  'oneunit' => false, // Per product unit
  'onlycart' => true, // Only in cart
  'unsetifnull' => false, // Don't apply without discount
  'unsetifnull_msg' => '', // Unset message
  'oldprice' => false, // Without old price

  // Validity
  // 'lifetime' => 60 * 20, // In seconds
  // or
  // 'startedon' => '', // Start, timestamp
  // 'stoppedon' => '', // End, timestamp
];

//
$result = $manager->generateCoupon($format, $data);
if (is_array($result)) {
  print_r('Generated promo code: ' . print_r($result, 1));
} else {
  print_r('Error creating promo code: ' . print_r($result, 1));
}
```

## Plugin events

Described in the [events section][14] of the docs.

## jQuery events

Described in the [jQuery events section][15] of the docs.

[14]: /en/components/mspromocode2/events/
[15]: /en/components/mspromocode2/jquery-events
