# Events

## Available events

- `msOnBeforeAddToCart`
  - `product` - *msProduct* object
  - `count` - product quantity
  - `options` - options array
  - `cart` - *cart* class instance
- `msOnAddToCart` - adding product to cart
  - `key` - product key
  - `cart` - *cart* class instance
- `msOnBeforeChangeInCart`
- `msOnChangeInCart` - changing product in cart
  - `key` - product key
  - `count` - product quantity
  - `cart` - *cart* class instance
- `msOnBeforeRemoveFromCart`
- `msOnRemoveFromCart` - removing product from cart
  - `key` - product key
  - `cart` - *cart* class instance
- `msOnBeforeEmptyCart`
- `msOnEmptyCart` - clearing cart
  - `cart` - *cart* class instance
- `msOnGetStatusCart` - cart status
  - `status` - status
  - `cart` - *cart* class instance
- `msOnBeforeAddToOrder`
- `msOnAddToOrder` - adding order field
  - `key` - field key
  - `value` - field value
  - `order` - *order* class instance
- `msOnBeforeValidateOrderValue`
- `msOnValidateOrderValue` - order field validation
  - `key` - field key
  - `value` - field value
  - `order` - *order* class instance
- `msOnBeforeRemoveFromOrder`
- `msOnRemoveFromOrder` - removing order field
  - `key` - field key
  - `order` - *order* class instance
- `msOnBeforeEmptyOrder`
- `msOnEmptyOrder` - clearing order
  - `order` - *order* class instance
- `msOnBeforeGetOrderCost`
  - `order` - *order* class instance
  - `cart` - *cart* class instance
  - `with_cart` - *include cart* flag
  - `only_cost` - *cost only* flag
- `msOnGetOrderCost` - getting order cost
  - `order` - *order* class instance
  - `cart` - *cart* class instance
  - `with_cart` - *include cart* flag
  - `only_cost` - *cost only* flag
  - `cost` - cost
  - `delivery_cost` - delivery cost
- `msOnSubmitOrder` - order submission
  - `data` - order data
  - `order` - *order* class instance
- `msOnBeforeChangeOrderStatus`
- `msOnChangeOrderStatus` - order status change
  - `order` - *msOrder* object
  - `status` - status id
- `msOnBeforeGetOrderCustomer`
- `msOnGetOrderCustomer` - getting order customer
  - `order` - *order* class instance
  - `customer` - *modUser* object
- `msOnBeforeCreateOrder`
- `msOnCreateOrder` - creating order
  - `order` - *order* class instance
  - `msOrder` - *msOrder* object
- `msOnBeforeUpdateOrder`
- `msOnUpdateOrder` - updating order
  - `msOrder` - *msOrder* object
- `msOnBeforeSaveOrder`
- `msOnSaveOrder` - saving order
  - `mode` - save mode new or upd
  - `object` - *msOrder* object
  - `msOrder` - *msOrder* object
  - `cacheFlag` - cache flag
- `msOnBeforeRemoveOrder`
- `msOnRemoveOrder` - removing order
  - `id` - record id
  - `object` - *msOrder* object
  - `msOrder` - *msOrder* object
  - `ancestors` - where array passed to the method
- `msOnBeforeCreateOrderProduct`
- `msOnCreateOrderProduct` - creating order product
  - `msOrderProduct` - *msOrderProduct* object
- `msOnBeforeUpdateOrderProduct`
- `msOnUpdateOrderProduct` - updating order product
  - `msOrderProduct` - *msOrderProduct* object
- `msOnBeforeRemoveOrderProduct`
- `msOnRemoveOrderProduct` - removing order product
  - `msOrderProduct` - *msOrderProduct* object

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
