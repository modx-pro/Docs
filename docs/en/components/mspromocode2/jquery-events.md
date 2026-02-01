# jQuery events

This lets you attach your own code to coupon apply and show users extra discount-related info.

## mspc2_set

Fires when a promo code is applied, including on error.

### mspc2_set example

```js
$(document).ready(function () {
  $(document).on('mspc2_set', function (e, response) {
    console.log('mspc2_set response', response);
  });
});
```

## mspc2_unset

Fires when a promo code is removed.

### mspc2_unset example

```js
$(document).ready(function () {
  $(document).on('mspc2_unset', function (e, response) {
    console.log('mspc2_unset response', response);
  });
});
```
