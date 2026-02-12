# jQuery events

This allows you to attach your own JS code to coupon apply and show users extra discount-related info.

## mspc_set

Fires when a promo code is applied successfully or not.

### mspc_set example

```js
$(document).ready(function () {
  $(document).on('mspc_set', function (e, response) {
    console.log('mspc_set response', response);
  });
});
```

## mspc_remove

Fires when a promo code is removed.

### mspc_remove example

```js
$(document).ready(function () {
  $(document).on('mspc_remove', function (e, response) {
    console.log('mspc_remove response', response);
  });
});
```
