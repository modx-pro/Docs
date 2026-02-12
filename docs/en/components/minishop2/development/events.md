# Events

## Available events

### Cart events

- `msOnBeforeAddToCart` - before adding product to cart
  - `product` - *msProduct* object
  - `count` - product quantity
  - `options` - options array
  - `cart` - *cart* class instance
- `msOnAddToCart` - after adding product to cart
  - `key` - product key
  - `cart` - *cart* class instance
- `msOnBeforeChangeInCart` - before changing product in cart
  - `key` - product key
  - `count` - product quantity
  - `cart` - *cart* class instance
- `msOnChangeInCart` - after changing product in cart
  - `key` - product key
  - `count` - product quantity
  - `cart` - *cart* class instance
- `msOnBeforeRemoveFromCart` - before removing product from cart
  - `key` - product key
  - `cart` - *cart* class instance
- `msOnRemoveFromCart` - after removing product from cart
  - `key` - product key
  - `cart` - *cart* class instance
- `msOnBeforeEmptyCart` - before clearing cart
  - `cart` - *cart* class instance
- `msOnEmptyCart` - after clearing cart
  - `cart` - *cart* class instance
- `msOnGetStatusCart` - getting cart status
  - `status` - status
  - `cart` - *cart* class instance

### Order events

- `msOnBeforeAddToOrder` - before adding order field
  - `key` - field key
  - `value` - field value
  - `order` - *msOrderHandler* class instance
- `msOnAddToOrder` - after adding order field
  - `key` - field key
  - `value` - field value
  - `order` - *msOrderHandler* class instance
- `msOnBeforeValidateOrderValue` - before order field validation
  - `key` - field key
  - `value` - field value
  - `order` - *msOrderHandler* class instance
- `msOnValidateOrderValue` - after order field validation
  - `key` - field key
  - `value` - field value
  - `order` - *msOrderHandler* class instance
- `msOnBeforeRemoveFromOrder` - before removing order field
  - `key` - field key
  - `order` - *msOrderHandler* class instance
- `msOnRemoveFromOrder` - after removing order field
  - `key` - field key
  - `order` - *msOrderHandler* class instance
- `msOnBeforeEmptyOrder` - before clearing order
  - `order` - *msOrderHandler* class instance
- `msOnEmptyOrder` - after clearing order
  - `order` - *msOrderHandler* class instance
- `msOnBeforeGetOrderCost` - before getting order cost
  - `order` - *msOrderHandler* class instance
  - `cart` - *cart* class instance
  - `with_cart` - *include cart* flag
  - `only_cost` - *cost only* flag
- `msOnGetOrderCost` - after getting order cost
  - `order` - *msOrderHandler* class instance
  - `cart` - *cart* class instance
  - `with_cart` - *include cart* flag
  - `only_cost` - *cost only* flag
  - `cost` - cost
  - `delivery_cost` - delivery cost
- `msOnSubmitOrder` - order submission
  - `data` - order data
  - `order` - *msOrderHandler* class instance
- `msOnBeforeChangeOrderStatus` - before order status change
  - `order` - *msOrder* object
  - `status` - new status id
  - `old_status` - current status id
- `msOnChangeOrderStatus` - after order status change
  - `order` - *msOrder* object
  - `status` - new status id
  - `old_status` - previous status id
- `msOnBeforeGetOrderCustomer` - before getting order customer
  - `order` - *msOrderHandler* class instance
  - `customer` - `null` (customer not yet determined)
- `msOnGetOrderCustomer` - after getting order customer
  - `order` - *msOrderHandler* class instance
  - `customer` - *modUser* object (or `null`)
- `msOnBeforeCreateOrder` - before creating order
  - `msOrder` - *msOrder* object
  - `order` - *msOrderHandler* class instance
- `msOnCreateOrder` - after creating order
  - `msOrder` - *msOrder* object
  - `order` - *msOrderHandler* class instance
- `msOnBeforeMgrCreateOrder` - before creating order from the manager panel
  - `object` - *msOrder* object
- `msOnMgrCreateOrder` - after creating order from the manager panel
  - `object` - *msOrder* object
- `msOnBeforeUpdateOrder` - before updating order from the manager panel
  - `object` - *msOrder* object
- `msOnUpdateOrder` - after updating order from the manager panel
  - `object` - *msOrder* object
- `msOnBeforeSaveOrder` - before saving order (model)
- `msOnSaveOrder` - after saving order (model)
  - `mode` - save mode new or upd
  - `object` - *msOrder* object
  - `msOrder` - *msOrder* object
  - `cacheFlag` - cache flag
- `msOnBeforeRemoveOrder` - before removing order (model)
- `msOnRemoveOrder` - after removing order (model)
  - `id` - record id
  - `object` - *msOrder* object
  - `msOrder` - *msOrder* object
  - `ancestors` - where array passed to the method

### Order product events

- `msOnBeforeCreateOrderProduct` - before creating order product
  - `object` - *msOrderProduct* object
- `msOnCreateOrderProduct` - after creating order product
  - `object` - *msOrderProduct* object
- `msOnBeforeUpdateOrderProduct` - before updating order product
  - `object` - *msOrderProduct* object
- `msOnUpdateOrderProduct` - after updating order product
  - `object` - *msOrderProduct* object
- `msOnBeforeRemoveOrderProduct` - before removing order product
  - `object` - *msOrderProduct* object
- `msOnRemoveOrderProduct` - after removing order product
  - `object` - *msOrderProduct* object

### Product events

- `msOnGetProductFields` - product output manipulation
  - `product` - *msProductData* object
  - `data` - data array
- `msOnGetProductPrice` - getting product price
  - `product` - *msProductData* object
  - `data` - product data
  - `price` - product price
- `msOnGetProductWeight` - getting product weight
  - `product` - *msProductData* object
  - `data` - product data
  - `weight` - product weight

### Manager events

- `msOnManagerCustomCssJs` - loading *minishop2* scripts
  - `controller` - *controller* class instance
  - `page` - page id

- `msOnBeforeVendorCreate` - before creating new vendor
  - `mode` - for this event = new
  - `data` - vendor data
  - `object` - *msVendor* object

- `msOnAfterVendorCreate` - after creating new vendor
  - `mode` - for this event = new
  - `id` - created vendor id
  - `data` - vendor data
  - `object` - *msVendor* object

- `msOnBeforeVendorUpdate` - before updating vendor
  - `mode` - for this event = upd
  - `data` - vendor data
  - `id` - vendor id
  - `object` - *msVendor* object

- `msOnAfterVendorUpdate` - after updating vendor
  - `mode` - for this event = upd
  - `id` - vendor id
  - `object` - *msVendor* object

- `msOnBeforeVendorDelete` - before deleting vendor
  - `id` - vendor id
  - `object` - *msVendor* object

- `msOnAfterVendorDelete` - after deleting vendor
  - `id` - vendor id
  - `object` - *msVendor* object

## Working with events

For the most part, events and the data passed to them let you hook into the process without editing the original PHP class and change data on the fly.
Some events allow stopping the process and returning an error. It all depends on how the event is invoked and what happens with the result of that event, if any.

Consider a few examples.

*You can prevent adding a product to the cart by creating a plugin on the `msOnBeforeAddToCart` event*
Simply return any text in the
`$modx->event->_output`
method

```php
<?php

if ($modx->event->name = 'msOnBeforeAddToCart') {
  $modx->event->output('Error');
}
```

Another example. You can modify the `$count` and `$options` variables on the fly by adding the needed values to `$modx->event->returnedValues`

```php
<?php

if ($modx->event->name = 'msOnBeforeAddToCart') {
  $values = & $modx->event->returnedValues;
  $values['count'] = $count + 10;
  $values['options'] = array('size' => '99');
}
```

General rule for plugins. All incoming data goes into `$modx->event->returnedValues`

You can work with numbers, strings and data arrays.
If you want to change something on the fly, just change it in `$modx->event->returnedValues`

For convenience you can create a reference variable `$values = & $modx->event->returnedValues;`
Note. The reference with the & sign means that whatever you write to `$values` will immediately appear in `$modx->event->returnedValues` without extra saving and will be returned to the class that invoked the event.

### How to get a list of all incoming variables

This rule works everywhere, with any MODX event. Just log this code

```php
<?php
$modx->log(1, print_r(array_keys($scriptProperties), 1));
```

### How to invoke the needed event in your own PHP class

Invoke the needed event and pass the required parameters to it.
Note! The plugin event does not dictate which parameters to pass.
Nothing stops you from passing an arbitrary parameter to a known, registered event, or passing fewer parameters than documented.

```php
<?php
$params = array(
  'count' => 2,
);
$eventName = 'msOnAddToCart';
$modx->invokeEvent($eventName, $params);
```

In the plugin we modify the incoming `$count`
We have two equivalent approaches. Both aim to change the global array `$modx->event->returnedValues`

```php
<?php
switch ($modx->event->name) {
case "msOnAddToCart":
  $sp = &$scriptProperties;
  $sp['count'] = 100;
  $modx->event->returnedValues = $sp;
  break;
}
```

```php
<?php
if ($modx->event->name = 'msOnAddToCart') {
  $values = & $modx->event->returnedValues;
  $values['count'] = $count + 10;
}
```

Then we return to the code that invoked the event. You need to check not $response, but the globally available `$modx->event->returnedValues`

```php
<?php
//  Here count = 2
$params = array(
  'count' => 2,
);
$eventName = 'msOnAddToCart';
$modx->invokeEvent($eventName, $params);

// and here count has already been changed by the plugin
$count = $modx->event->returnedValues['count']
```
