# jQuery events

You can hook your own code to bonus apply/cancel and show extra information to users.

## msb2_set

Fires when bonuses are applied to the cart, including on error.

### Example msb2_set

```js
$(document).ready(function () {
  $(document).on('msb2_set', function (e, response) {
    console.log('msb2_set response', response);
  });
});
```

## msb2_unset

Fires when bonuses are removed.

### Example msb2_unset

```js
$(document).ready(function () {
  $(document).on('msb2_unset', function (e, response) {
    console.log('msb2_unset response', response);
  });
});
```
