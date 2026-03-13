---
title: msOrderTotal
---
# msOrderTotal

Snippet for cart and order totals. Used for the mini-cart in the site header with automatic refresh when the cart changes.

::: warning Caching
The snippet works with the user session and must be called **uncached** (`!msOrderTotal`).
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msOrderTotal` | Output chunk |
| **return** | `tpl` | Format: `data` (array), `tpl` (chunk output) |
| **selector** | (auto) | CSS selector for the container used for auto-update |

## Default chunk

The component ships with a ready-made chunk `tpl.msOrderTotal`:

```fenom
<span class="ms3-order-total">
    <span class="ms3-order-total__count">{$total_count}</span>
    {if $total_count > 0}
        <span class="ms3-order-total__cost">{$total_cost} {'ms3_frontend_currency' | lexicon}</span>
    {/if}
</span>
```

The chunk comes with CSS in `default.css`.

## Auto-update of widgets

The snippet automatically registers for refresh when the cart changes. When products are added, removed, or updated, the widget **re-renders** with current data.

### How it works

1. On call, the snippet registers itself in `ms3Config.render.cart`
2. When the cart changes, JavaScript sends a request to the server
3. The server re-invokes the snippet with the same parameters
4. The new HTML replaces the widget content

### selector parameter

By default the widget updates inside a container chosen automatically. To target a specific container, use the `selector` parameter:

```fenom
<div id="header-cart">
    {'!msOrderTotal' | snippet : [
        'selector' => '#header-cart'
    ]}
</div>
```

On update, all HTML inside `#header-cart` is replaced with the new content.

### Multiple widgets on a page

You can place several widgets with different chunks:

```fenom
{* Mini-cart in header *}
<div id="header-minicart">
    {'!msOrderTotal' | snippet : [
        'tpl' => 'tpl.headerMiniCart',
        'selector' => '#header-minicart'
    ]}
</div>

{* Counter in mobile menu *}
<div id="mobile-cart-count">
    {'!msOrderTotal' | snippet : [
        'tpl' => 'tpl.mobileCartCount',
        'selector' => '#mobile-cart-count'
    ]}
</div>
```

Each widget updates independently with its own chunk.

## Examples

### Basic call with default chunk

```fenom
{'!msOrderTotal' | snippet}
```

Outputs the count and total in the styled widget.

### Get data without rendering

```fenom
{set $total = '!msOrderTotal' | snippet : ['return' => 'data']}

{if $total.total_count > 0}
    In cart: {$total.total_count} items, {$total.cart_cost} total
{/if}
```

::: warning No auto-update
With `return=data` auto-update does not run — data is fetched once on page load.
:::

### Custom chunk

```fenom
{'!msOrderTotal' | snippet : [
    'tpl' => 'tpl.myMiniCart'
]}
```

### Header mini-cart

```fenom
<a href="/cart/" class="header-cart-link">
    {'!msOrderTotal' | snippet : [
        'tpl' => '@INLINE <span class="cart-count">{$total_count}</span>
                  <span class="cart-sum">{$cart_cost}</span>'
    ]}
</a>
```

## Data structure

The snippet returns an array with cart/order totals:

| Field | Description |
|-------|-------------|
| `cost` | Total to pay (products + delivery + payment fee) |
| `cart_cost` | Products cost |
| `delivery_cost` | Delivery cost |
| `payment_cost` | Payment method fee |
| `total_count` | Total item count |
| `total_cost` | Products cost (same as `cart_cost`) |
| `total_weight` | Total weight |
| `total_discount` | Discount amount |
| `total_positions` | Number of lines (unique products) |

```php
[
    'cost' => 8100,            // Total to pay
    'cart_cost' => 7500,       // Products cost
    'delivery_cost' => 300,    // Delivery cost
    'payment_cost' => 300,     // Payment fee (e.g. 4%)
    'total_count' => 5,        // Total item count
    'total_cost' => 7500,      // Products cost
    'total_weight' => 2500,    // Total weight (grams)
    'total_discount' => 500,   // Discount amount
    'total_positions' => 3,    // Number of lines
]
```

::: tip cost vs cart_cost
- `cart_cost` — cost of products in the cart only
- `cost` — final amount to pay: products + delivery + payment fee
:::

## Placeholders in chunk

With `return=tpl`, all fields are passed to the chunk as placeholders:

```fenom
{* tpl.myMiniCart *}
<div class="mini-cart">
    {if $total_count > 0}
        <a href="/cart/" class="mini-cart-link">
            <span class="mini-cart-count">{$total_count}</span>
            <span class="mini-cart-cost">{$cart_cost}</span>
        </a>
    {else}
        <span class="mini-cart-empty">Cart is empty</span>
    {/if}
</div>
```

## CSS classes

The default chunk uses BEM-style classes:

| Class | Description |
|-------|-------------|
| `.ms3-order-total` | Widget container |
| `.ms3-order-total__count` | Item count |
| `.ms3-order-total__cost` | Order total |

### Built-in styles

From `default.css`:

```css
.ms3-order-total {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: #f8f9fa;
    border-radius: 2rem;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.ms3-order-total:hover {
    background: #e9ecef;
}

.ms3-order-total__count {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 1.5rem;
    height: 1.5rem;
    padding: 0 0.4rem;
    background: var(--bs-primary, #0d6efd);
    color: #fff;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
}

.ms3-order-total__count:empty,
.ms3-order-total__count[data-count="0"] {
    background: #6c757d;
}

.ms3-order-total__cost {
    font-weight: 500;
    color: #212529;
}
```

## Full mini-cart example

```fenom
<header class="site-header">
    <nav class="main-nav">
        {* ... menu ... *}
    </nav>

    <div id="header-cart" class="header-cart">
        {'!msOrderTotal' | snippet : [
            'selector' => '#header-cart',
            'tpl' => '@INLINE
                <a href="/cart/" class="header-cart__link">
                    <svg class="header-cart__icon" width="24" height="24">
                        <use xlink:href="#icon-cart"/>
                    </svg>
                    {if $total_count > 0}
                        <span class="header-cart__badge">{$total_count}</span>
                        <span class="header-cart__sum">{$cart_cost}</span>
                    {/if}
                </a>
            '
        ]}
    </div>
</header>
```

## Difference from msCart

| msOrderTotal | msCart |
|--------------|--------|
| Totals only | Full cart with products |
| Lightweight, fast | Loads all product data |
| For header mini-cart | For cart page |
| Minimal data | All product fields, options, thumbnails |
| Widget auto-update | Cart auto-update |

## Deprecated data attributes

::: warning Deprecated
The attributes `data-ms-cart-count`, `data-ms-cart-cost` are still supported for backward compatibility, but auto-update via the `selector` parameter is recommended.
:::

For compatibility with older code you can use:

```html
<span data-ms-cart-count>0</span>
<span data-ms-cart-cost>0</span>
```

MiniShop3 JavaScript will update these elements when the cart changes, but without full chunk re-render.
