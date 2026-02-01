# JavaScript

## Events

:::warning
Events other than *msac:init* fire once per cart on the page.
:::
:::tip
Events are for DOM interaction, not for cancelling server actions. To cancel an action use **si:send:before**.

```js:line-numbers
document.addEventListener('si:send:before', (e) => {
  if (['cart_add','cart_remove','cart_clean'].includes(e.detail.headers['X-SIPRESET'])) {
    e.preventDefault();
    SendIt.Notify.error('It impossible!');
  }
})
```

:::

### msac:init — component initialization

Fired after all modules from the JS config are loaded. No parameters. Cannot be cancelled. Subscribe to this event to use all modules; after it fires, **MsAltCart** and its modules are available.
::: details Example

```js:line-numbers
document.addEventListener('msac:init', (e) => {
  console.log(MsAltCart);
});
```

:::

### msac:row:replace:after — row replaced

Fired after a product row was replaced (old key with new key). Cannot be cancelled.

::: details Parameters

* **cartName** — cart name (placeholder name).
* **cart** — cart DOM element.
* **keyNew** — new product key.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:row:replace:after', (e) => {
  const {cart, cartName, keyNew} = e.detail;

  const newRow = cart.querySelector(`data-msac-product="${keyNew}"`); // get inserted row

  // init plugins here, e.g. for custom select
});
```

:::

### msac:row:update:before — row update

Fired before a product row is updated. Cannot be cancelled.

::: details Parameters

* **cartName** — cart name (placeholder name).
* **cart** — cart DOM element.
* **data** — server response.
* **row** — row DOM element being updated.
* **html** — HTML that will be inserted.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:row:update:before', (e) => {
  const {cart, cartName, data, row, html} = e.detail;

  // init plugins here, e.g. for custom select
});
```

:::

### msac:totals:update:before — totals update

Fired before totals are updated. Cannot be cancelled.

::: details Parameters

* **cart** — cart DOM element.
* **data** — server response.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:totals:update:before', (e) => {
  const {cart, data} = e.detail;

  // modify data here if needed
});
```

:::

### msac:row:add:after — product added

Fired after a new product is added. Cannot be cancelled.

::: details Parameters

* **cartName** — cart name (placeholder name).
* **cart** — cart DOM element.
* **newRow** — added row DOM element.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:row:add:after', (e) => {
  const {cart, cartName, newRow} = e.detail;

  // init plugins here or show modal for the added product
  const modalCartEl = document.getElementById('modalCart');
  if (e.detail.cartName === 'modal' && modalCartEl) {
    const modalCart = new bootstrap.Modal(modalCartEl, {})
    modalCart.show();
  }
});
```

:::

### msac:row:remove:before — product row removal

Fired before a product row is removed from the DOM. Can be cancelled.

::: details Parameters

* **cartName** — cart name (placeholder name).
* **cart** — cart DOM element.
* **row** — row DOM element being removed.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:row:remove:before', (e) => {
  const {cart, cartName, row} = e.detail;

  // run cleanup or other logic
});
```

:::

### msac:html:prepare:after — HTML prepared

Fired after HTML for insertion is prepared. Cannot be cancelled.

::: details Parameters

* **element** — prepared DOM element.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:html:prepare:after', (e) => {
  const {element} = e.detail;

  // init plugins or other logic
});
```

:::

### msac:cart:clean:before — cart clear

Fired before the cart block is cleared and the empty-cart chunk is shown. Can be cancelled.

::: details Parameters

* **cartName** — cart name (placeholder name).
* **cart** — cart DOM element.

:::

::: details Example

```js:line-numbers
document.addEventListener('msac:cart:clean:before', (e) => {
  const {cartName, cart} = e.detail;

  // run logic before clear
});
```

:::

## API

The component exposes simple methods to control the cart from JavaScript.

### Add product

```js:line-numbers
MsAltCart.add(product_id, count, {
  option_key: option_value,
})
```

The options object is optional.

### Change product

```js:line-numbers
MsAltCart.change(product_cart_key, count, {
  option_key: option_value,
})
```

The options object is optional.

### Remove product

```js:line-numbers
MsAltCart.remove(product_cart_key)
```

### Get cart status and contents

```js:line-numbers
const promise = MsAltCart.status();
promise.then((result) => console.log(result));
```
