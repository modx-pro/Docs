# Events

The following events are available:

- `PasOnBeforeChangeStatus`
- `PasOnChangeStatus` — entity status change
  - `instance` — entity object
  - `status` — status ID
- `PasOnBeforeChangeTerm`
- `PasOnChangeTerm` — subscription term change
  - `subscription` — subscription object
  - `action` — action
  - `term` — term
- `PasOnClientBeforeSave`
- `PasOnClientSave` — save client
  - `client` — client object
- `PasOnSubscriptionBeforeSave`
- `PasOnSubscriptionSave` — save subscription
  - `subscription` — subscription object
- `PasOnRateBeforeSave`
- `PasOnRateSave` — save rate
  - `rate` — rate object
- `PasOnGetRateCost` — get rate cost
  - `rate` — rate object
  - `data` — data array
- `PasOnContentBeforeSave`
- `PasOnContentSave` — save content
  - `content` — content object
- `PasOnGetContentRate` — get content rate
  - `content` — content object
  - `rate` — rate object
  - `data` — data array
- `PasOnBeforeAddToOrder`
- `PasOnAddToOrder` — add order field
  - `key` — field key
  - `value` — field value
- `PasOnBeforeValidateOrderValue`
- `PasOnValidateOrderValue` — validate order field
  - `key` — field key
  - `value` — field value
- `PasOnBeforeRemoveFromOrder`
- `PasOnRemoveFromOrder` — remove order field
  - `key` — field key
  - `order` — order object
- `PasOnBeforeEmptyOrder`
- `PasOnEmptyOrder` — clear order
  - `order` — order object
- `PasOnBeforeGetOrderCost`
- `PasOnGetOrderCost` — get order cost
  - `order` — order object
  - `cost` — cost
- `PasOnSubmitOrder` — process order
  - `order` — order object
  - `data` — data array
- `PasOnBeforeCreateOrder`
- `PasOnCreateOrder` — create order
  - `msOrder` — order object
  - `order` — order object

## Examples

Create a rate for content with 2-day term and cost 100:

```php
<?php

switch ($modx->event->name) {

  case 'PasOnGetContentRate':
    /** @var PasContent $content */
    /** @var PasRate $rate */
    if ($content AND !$rate) {
      $rate = $modx->newObject('PasRate');
      $rate->fromArray(array(
        'content'    => $content->get('id'),
        'cost'       => '100',
        'term_value' => '2',
        'term_unit'  => 'd',
        'active'     => 1,
      ));
      $scriptProperties['rate'] = $rate;
    }

    break;
}
?>
```

Change order cost and return values from a plugin. This example overrides the order cost:

```php
<?php

switch ($modx->event->name) {

  case 'PasOnGetOrderCost':
    $values = $modx->event->returnedValues;
    $values['cost'] = 5000;
    $modx->event->returnedValues = $values;
    break;
}
?>
```
