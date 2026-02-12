---
title: msOrderTotal
---
# msOrderTotal

Snippet for cart and order totals. Used for mini-cart in the site header.

::: warning Caching
The snippet uses the user session and must be called **uncached** (`!msOrderTotal`).
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msOrderTotal` | Layout chunk |
| **return** | `tpl` | Format: `data` (array), `tpl` (chunk output) |

::: info Default chunk
Chunk `tpl.msOrderTotal` is not shipped with the component. Create your own or use `return=data`.
:::

## Examples

### Get data

```fenom
{set $total = '!msOrderTotal' | snippet: ['return' => 'data']}

{if $total.total_count > 0}
    In cart: {$total.total_count} items, {$total.cart_cost} total
{/if}
```

### Header mini-cart

```fenom
{set $cart = '!msOrderTotal' | snippet: ['return' => 'data']}

<a href="/cart/" class="header-cart">
    <span class="cart-icon">🛒</span>
    <span class="cart-count" data-ms-cart-count>{$cart.total_count}</span>
    <span class="cart-total" data-ms-cart-total>{$cart.cart_cost}</span>
</a>
```

### With chunk

```fenom
{'!msOrderTotal' | snippet: [
    'tpl' => 'tpl.myMiniCart'
]}
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
