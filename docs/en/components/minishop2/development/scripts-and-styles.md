# Scripts and styles

When miniShop2 is initialized on the site frontend, scripts and styles from system settings are registered:

- **ms2_frontend_js** - path to scripts, default `[[+jsUrl]]web/default.js`
- **ms2_frontend_css** - path to styles, default `[[+cssUrl]]web/default.css`

These settings are shared by all snippets and you can use the following placeholders in their paths:

- **assetsUrl** - path to miniShop2 assets directory
- **jsUrl** - path to miniShop2 assets/js directory
- **cssUrl** - path to miniShop2 assets/css directory

If **ms2_frontend_js** is not empty, the **miniShop2Config** variable is also registered on the frontend with the system configuration:

```js
miniShop2Config = {
  cssUrl: '/assets/components/minishop2/css/web/',
  jsUrl: '/assets/components/minishop2/js/web/',
  actionUrl: '/assets/components/minishop2/action.php',
  ctx: 'web',
  close_all_message: 'close all',
  price_format: [2, '.', ' '],
  price_format_no_zeros: true,
  weight_format: [3, '.', ' '],
  weight_format_no_zeros: true,
}
```

These are some of the system values used by the default script. If you do not include it, they will not be there.

If you want to change the built-in scripts or styles, rename those files, edit them, and set the new names in system settings — then they will not be overwritten on update.

## Callback functions

On different frontend operations, javascript callback functions (**callbacks**) can run.

They are provided for cart and order operations. List:

- **Cart** - cart actions
  - **add** - adding product to cart
  - **remove** - removing product from cart
  - **change** - changing product quantity in cart
  - **clean** - clearing cart (removing all added products)
- **Order** - order actions
  - **add** - adding field to order (name, email, address, etc.)
  - **getcost** - getting current order cost
  - **getrequired** - getting list of required fields for order submission
  - **submit** - submitting order for processing
  - **clean** - clearing all order fields

**Each** of these actions has several stages you can use for your logic.
Each stage is a function or array of functions that run at the right time:

- **before** - runs before the operation starts. If you return `false` here, the operation is aborted.
- **ajax** - request to the server
  - **done** - request completed successfully, server returned a response.
  - **fail** - a technical error occurred on the server, e.g. it returned 500.
  - **always** - runs on any server response.
- **response** - response received from server (i.e. ajax returned done)
  - **success** - server says everything is ok
  - **error** - a logic error occurred, e.g. required order fields are not filled

To add a callback to the array you need to specify the path, name and function body:

```js
miniShop2.Callbacks.add('Cart.add.before', 'restrict_cart', function () {
  miniShop2.Message.error('Adding products to cart is not allowed!');

  return false;
});
```

To remove one you only need the path and name

```js
miniShop2.Callbacks.remove('Cart.add.before', 'restrict_cart');
```

Both functions return `true` or `false` depending on the result.

## Examples

Two functions that show popups with the result of adding a field to the order:

```js
miniShop2.Callbacks.add('Order.add.response.success', 'orders_add_ok', function (response) {
  miniShop2.Message.success('All good!');
  console.log(response);
});
miniShop2.Callbacks.add('Order.add.response.error', 'orders_add_err', function (response) {
  miniShop2.Message.error('An error occurred :-(');
  console.log(response);
});
```

Log all ajax requests for adding products to cart

```js
miniShop2.Callbacks.add('Cart.add.ajax.always', 'ajax_log', function (xhr) {
  console.log(xhr);
});
```
