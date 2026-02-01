# Events

The following events are available:

- `UserEventsOnEventBeforeSave`
- `UserEventsOnEventSave` — save event
  - `event` — event object
- `UserEventsOnEventBeforeRemove`
- `UserEventsOnEventRemove` — remove event
  - `event` — event object
- `UserEventsOnBeforeChangeStatus`
- `UserEventsOnChangeStatus` — event status change
  - `instance` — event entity
  - `status` — status ID
- `UserEventsOnBeforeAddToOrder`
- `UserEventsOnAddToOrder` — add order field
  - `key` — field key
  - `value` — field value
- `UserEventsOnBeforeValidateOrderValue`
- `UserEventsOnValidateOrderValue` — validate order field
  - `key` — field key
  - `value` — field value
- `UserEventsOnBeforeRemoveFromOrder`
- `UserEventsOnRemoveFromOrder` — remove order field
  - `key` — field key
  - `order` — order object
- `UserEventsOnBeforeEmptyOrder`
- `UserEventsOnEmptyOrder` — clear order
  - `order` — order object
- `UserEventsOnBeforeGetOrderCost`
- `UserEventsOnGetOrderCost` — get order cost
  - `order` — order object
  - `cost` — cost
- `UserEventsOnSubmitOrder` — process order
  - `order` — order object
  - `data` — data array
- `UserEventsOnBeforeCreateOrder`
- `UserEventsOnCreateOrder` — create order
  - `msOrder` — order object
  - `order` — order object
- `UserEventsOnDaysState` — day state
  - `state` — state array
  - `order` — order object
- `UserEventsOnTimesState` — time state
  - `state` — state array
  - `order` — order object

## Examples

Calculate event cost:

```php
<?php

switch ($modx->event->name) {

  case "UserEventsOnBeforeGetOrderCost":
    /** @var UserEventsOrderInterface $orderHandler */
    $orderHandler = $modx->getOption("order", $scriptProperties);
    if (!$orderHandler OR !($orderHandler instanceof UserEventsOrderInterface)) {
      return;
    }
    $values = $modx->Event->returnedValues;
    $data = $orderHandler->get();
    $rid = $modx->getOption("resource", $data);

    $cost = 0;
    // calculate cost with your own logic
    if ($resource = $modx->getObject("modResource", $rid)) {
      $cost = $resource->get("id") * 100;
    }
    $values["cost"] = $cost;

    $modx->event->returnedValues = $values;
    break;

}
?>
```
