---
title: msOrderTotal
---
# msOrderTotal

Cart and order totals for a mini-cart in the site header. The widget is re-rendered when the cart changes, provided `selector` is set.

::: warning Caching
The snippet uses the user session and must be called **uncached** (`!msOrderTotal`).
:::

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msOrderTotal` | Layout chunk |
| **return** | `tpl` | Format: `data` (array), `tpl` (chunk output) |
| **selector** | — | CSS selector of the container. Required for auto-update. Not declared in the snippet properties ([#805](https://github.com/modx-pro/MiniShop3/issues/805)) |

::: warning The formatPrices / withCurrency properties
The admin may show `formatPrices` and `withCurrency` for this snippet. The code reads neither: `*_formatted` always carries the currency or weight unit ([#825](https://github.com/modx-pro/MiniShop3/issues/825)).
:::

## Default chunk

The component ships the `tpl.msOrderTotal` chunk:

```fenom
<span class="ms3-order-total">
    <span class="ms3-order-total__count">{$total_count}</span>
    {if $total_count > 0}
        <span class="ms3-order-total__cost">{$total_cost_formatted}</span>
    {/if}
</span>
```

## Widget auto-update

Set `selector` on every call — without it the widget does not update:

```fenom
<div id="header-cart">
    {'!msOrderTotal' | snippet : [
        'selector' => '#header-cart'
    ]}
</div>
```

::: warning Without `selector` the widget does not update
There is no container auto-detection for msOrderTotal. When the selector is not set, the script walks a fallback list — `#ms3oc-cart-live`, `#msb-test-cart`, `#msCart`, `[data-ms-cart]`, `.msCart`. Those are **cart** roots; no widget selector is among them.

Two outcomes, both silent: several matches — nothing updates; a single match (the page has a cart) — the widget HTML is written **into the cart** and wipes it.

The «+» and «−» buttons never update the widget without `selector`: the quantity handler has no fallback list at all.
:::

### How it works

1. On call the snippet registers itself in `ms3Config.render.cart`
2. When the cart changes, JavaScript sends a request to the server
3. The server re-runs the snippet with the same parameters
4. The new HTML replaces everything inside the container from `selector`

### Several widgets on a page

```fenom
{* Mini-cart in the header *}
<div id="header-minicart">
    {'!msOrderTotal' | snippet : [
        'tpl' => 'tpl.headerMiniCart',
        'selector' => '#header-minicart'
    ]}
</div>

{* Counter in the mobile menu *}
<div id="mobile-cart-count">
    {'!msOrderTotal' | snippet : [
        'tpl' => 'tpl.mobileCartCount',
        'selector' => '#mobile-cart-count'
    ]}
</div>
```

::: warning Calls must differ in their parameters
The re-render token is a hash of the call's parameter set. Two calls with entirely identical parameters get the same token, and the client takes the first container it finds for it. Only that one updates; the second keeps the old numbers.

A different `selector` solves this — it is part of the parameter set. That is why the widgets in the example above have different `selector` and different `tpl`.
:::

### When the widget does not update

Only cart operations trigger a re-render: adding, removing, changing quantity, changing an option, emptying.

| What the customer does | What happens to the widget |
| --- | --- |
| Picks a delivery or payment method | No update. The recalculation bypasses the widget — the text goes into three fixed elements of the checkout page: `#ms3_order_cart_cost`, `#ms3_order_delivery_cost`, `#ms3_order_cost` |
| Clears the order form | No update |

So the `cost`, `delivery_cost` and `payment_cost` fields are correct only as of page render: after a delivery method is picked they go stale. In a mini-cart show the product cost (`cart_cost`), not the payable total.

::: warning Call parameters live in a cache
The server keeps them for as many seconds as `ms3_snippet_cache_ttl` sets — an hour by default. If the page stays open longer or the cache is cleared, the server does not find the parameters and simply returns no HTML — the widget stops updating with nothing to show for it on the page. The only diagnostic is a `Snippet parameters not found for token: …` line in the MODX error log.
:::

::: warning The `ms3_register_global_config` setting is required
When it is off, the `ms3Config` object is not printed on the page, while the widget registration is printed regardless. The console gets `ms3Config is not defined`, and re-rendering works neither for the widget nor for the cart. The setting is on by default.
:::

## Examples

### Basic call

```fenom
{'!msOrderTotal' | snippet}
```

### Getting data without output

```fenom
{set $total = '!msOrderTotal' | snippet : ['return' => 'data']}

{if $total.total_count > 0}
    In the cart: {$total.total_count} products for {$total.cart_cost_formatted}
{/if}
```

::: warning Do not set `selector` with `return=data`
The data is taken once — re-rendering is not provided for this mode. But registration happens before the snippet looks at `return`, so a call with `selector` still lands in the re-render list. The server returns an array instead of HTML, and its text representation is written into the container.
:::

### A chunk inside the call

For short markup there is no need for a separate chunk — pass it to `tpl` through `@INLINE`:

```fenom
<div id="header-cart">
    {'!msOrderTotal' | snippet : [
        'selector' => '#header-cart',
        'tpl' => '@INLINE {$total_count} pcs. for {$cart_cost_formatted}'
    ]}
</div>
```

## Data structure and placeholders

With `return=data` the snippet returns an array of these fields; with `return=tpl` it passes them to the chunk as placeholders (`{$total_count}`, `{$cost_formatted}`). Output amounts and weight on the site through `*_formatted`.

| Field | Description |
| --- | --- |
| `cost` | Total payable (products + delivery + payment fee) |
| `cost_formatted` | Total with the currency symbol |
| `cart_cost` | Product cost |
| `cart_cost_formatted` | Product cost with currency |
| `delivery_cost` | Delivery cost |
| `delivery_cost_formatted` | Delivery cost with currency |
| `payment_cost` | Payment method fee |
| `payment_cost_formatted` | Fee with currency |
| `total_count` | Total product quantity |
| `total_cost` | Product cost by cart. Matches `cart_cost` until a plugin changes it through `msOnGetCartCost` |
| `total_cost_formatted` | Product cost with currency |
| `total_weight` | Total weight |
| `total_weight_formatted` | Total weight with the unit |
| `total_discount` | Discount amount |
| `total_discount_formatted` | Discount with currency |
| `total_positions` | Number of lines (unique products) |

## CSS classes

Styles for the default chunk live in `assets/components/minishop3/css/web/default.css`.

| Class | Description |
| --- | --- |
| `.ms3-order-total` | Widget container |
| `.ms3-order-total__count` | Product quantity counter |
| `.ms3-order-total__cost` | Order total |

::: tip The file is not loaded on its own
`default.css` is not part of the `ms3_frontend_assets` system setting — that list holds only the notification styles and the scripts. Only the demo template `base.tpl` loads it. On your own markup add the file to the template or to `ms3_frontend_assets`, otherwise the widget stays unstyled.
:::

## A counter without re-rendering

The snippet refreshes the whole widget: the server re-renders the chunk and returns ready HTML. For a couple of numbers in the header that is heavy — if all you need is a counter, update it yourself on the `ms3:cart:updated` event. No snippet call is needed then: the data comes with the server response to any cart action.

```html
<span class="cart-count">0</span>
<span class="cart-cost">0</span>
```

```javascript
document.addEventListener('ms3:cart:updated', function (e) {
    // detail does not always arrive — check before reading it
    const status = e.detail && e.detail.status;
    if (!status) {
        return;
    }
    document.querySelector('.cart-count').textContent = status.total_count;
    document.querySelector('.cart-cost').textContent = status.total_cost;
});
```

::: tip These numbers carry no formatting
`status` holds raw values, without a currency symbol or thousands separators. Ready-made strings like `1,500 $` come only from the chunk, in the `*_formatted` fields.
:::

The composition of `detail` and the other frontend events are on the [Cart](/en/components/minishop3/frontend/cart) page.

## Difference from msCart

| msOrderTotal | [msCart](mscart) |
| --- | --- |
| Totals only: amounts, quantity, weight | All product fields, options, thumbnails |
| For a header mini-cart | For the cart page |
| Widget auto-update | Cart auto-update |
