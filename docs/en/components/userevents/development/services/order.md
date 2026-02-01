# Order

Checkout is handled by **UserEventsOrderHandler**, which implements **UserEventsOrderInterface**.
You can use your own order class and set it in the system setting **order_handler_class**.

Required methods of `UserEventsOrderInterface`:

- `initialize` — initialize the class in the context. Can load scripts and styles.
- `add` — add one field to the order.
- `remove` — remove one field from the order.
- `validate` — validate a field on add and return the filtered value.
- `get` — return order contents.
- `set` — replace order contents with the given array.
- `submit` — process checkout; required fields must already be present.
- `clean` — clear the order completely.
- `getcost` — get cost.
- `getDaysState` — get calendar day states.
- `getTimesState` — get time-of-day states.
- `getDeliveryCost` — get delivery cost.
- `getPaymentCost` — get payment cost.
- `getDeliveries` — get delivery options.
- `getPayments` — get payment options.

## System events

`UserEventsOrderInterface` fires events when working with the order. Template plugin:

```php
<?php

switch ($modx->event->name) {
    // Add fields to order
  case 'UserEventsOnBeforeAddToOrder'; break; // receives $key (field name), $value (field value)
  case 'UserEventsOnAddToOrder'; break; // receives $key, $value

  // Remove fields from order
  case 'UserEventsOnBeforeRemoveFromOrder'; break; // receives $key
  case 'UserEventsOnRemoveFromOrder'; break; // receives $key

  // Submit order
  case 'UserEventsOnSubmitOrder'; break; // optional $data array to override fields

  // Create order
  case 'UserEventsOnBeforeCreateOrder'; break; // receives $order with related objects
  case 'UserEventsOnCreateOrder'; break; // same

  // Clear order
  case 'UserEventsOnBeforeEmptyOrder'; break; // receives $order only
  case 'UserEventsOnEmptyOrder'; break; // receives $order only

  // Order status change (payment, cancel, etc.)
  case 'msOnBeforeChangeOrderStatus': break; // receives $order and status id in $status
  case 'msOnChangeOrderStatus': break; // receives $order and status id in $status
}
?>
```

All events also receive the `$order` object.
