# Order

Checkout is handled by **PasOrderHandler**, which implements **PasOrderInterface**.
You can use your own order class and set it in the system setting **order_handler_class**.

![Order](https://file.modx.pro/files/4/8/3/483ef49c65873a11583048dd19e9eb85.png)

Required methods of `PasOrderInterface`:

- `initialize` — initialize the class in the context. Can load scripts and styles.
- `add` — add one field to the order.
- `remove` — remove one field from the order.
- `validate` — validate a field on add and return the filtered value.
- `get` — return full order contents.
- `set` — replace order contents with the given array.
- `submit` — process checkout; delivery and required fields must already be present.
- `clean` — clear the order completely.
- `getcost` — get cost.
- `getDeliveryCost` — get delivery cost.
- `getPaymentCost` — get payment cost.
- `getDeliveries` — get delivery options.
- `getPayments` — get payment options.

## System events

`PasOrderInterface` fires events when working with the order. Template plugin:

```php
<?php

switch ($modx->event->name) {
  // Add fields to order
  case 'PasOnBeforeAddToOrder'; break; // receives $key (field name), $value (field value)
  case 'PasOnAddToOrder'; break; // receives $key, $value

  // Remove fields from order
  case 'PasOnBeforeRemoveFromOrder'; break; // receives $key
  case 'PasOnRemoveFromOrder'; break; // receives $key

  // Submit order
  case 'PasOnSubmitOrder'; break; // optional $data array to override fields

  // Create order
  case 'PasOnBeforeCreateOrder'; break; // receives $order with related objects
  case 'PasOnCreateOrder'; break; // same

  // Clear order
  case 'PasOnBeforeEmptyOrder'; break; // receives $order only
  case 'PasOnEmptyOrder'; break; // receives $order only

  // Order status change (payment, cancel, etc.)
  case 'msOnBeforeChangeOrderStatus': break; // receives $order and status id in $status
  case 'msOnChangeOrderStatus': break; // receives $order and status id in $status
}
?>
```

All events also receive the `$order` object.
