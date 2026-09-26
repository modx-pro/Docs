---
title: msCart
---
# msCart

Outputs the contents of the cart: product lines with quantities, prices and totals.

::: warning Caching
The snippet uses the user session and must be called **uncached**.
:::

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msCart` | Cart layout chunk |
| **selector** | | CSS selector for auto-updating cart HTML |
| **includeTVs** | | Comma-separated product TV parameters |
| **includeThumbs** | | Comma-separated thumbnail sizes |
| **includeContent** | | Include product `content` field in query |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show the execution log. Visible only to a signed-in manager |
| **return** | `tpl` | Output format: `tpl` or `data` |
| **customer_token** | | Customer token (default from session) |
| **hideOnThanks** | `false` | When `1` / `true`, the snippet returns an empty string on the thank-you page (identified by the URL parameter `?msorder=...`). When `false`, the cart is output as usual — a mini cart in the shared template keeps working. Before 1.11.0, empty output on that page was the default and could not be disabled. |

### pdoTools parameters

| Parameter | Description |
| --- | --- |
| **where** | Extra query conditions (JSON) |
| **leftJoin** | Extra JOINs (JSON) |
| **select** | Extra fields for query (JSON) |

::: info Product order is not configurable
Products come out in the order they sit in the cart — the snippet walks its contents instead of running a sorted query. pdoTools sorting parameters have no effect here.
:::

## Examples

### Basic output

```fenom
{'!msCart' | snippet}
```

### With thumbnails

```fenom
{'!msCart' | snippet : [
    'includeThumbs' => 'small,medium'
]}
```

### With TV parameters

```fenom
{'!msCart' | snippet : [
    'includeTVs' => 'my_tv,another_tv'
]}
```

### Get data as array

```fenom
{var $cart = '!msCart' | snippet : ['return' => 'data']}
{$cart.total.cost}
```

### Output to placeholder

```fenom
{'!msCart' | snippet : [
    'toPlaceholder' => 'cart'
]}

{* Usage *}
{$_modx->getPlaceholder('cart')}
```

## Cart data structure

With `return=data` the snippet returns an array of three keys; their fields are listed in the tables under [Chunk placeholders](#chunk-placeholders).

```php
[
    'products' => [
        [
            'product_key' => 'abc123',    // Unique line key
            'id' => 42,                   // Order line ID, NOT the product
            'product_id' => 15,           // Product ID — use this one
            'count' => 2,
            'price' => 1500,
            'options' => ['size' => 'M'],
            // ... other line and product fields
        ],
        // ...
    ],
    'total'  => [ /* cart totals */ ],
    'status' => [ /* aggregates from Cart::get() */ ],
]
```

## Chunk placeholders

### Cart products

```fenom
{foreach $products as $product}
    {$product.pagetitle} — {$product.count} pcs. × {$product.price}
{/foreach}
```

| Placeholder | Value |
| --- | --- |
| `{$product.product_key}` | Unique line key |
| `{$product.product_id}` | Product ID. Link to the product page: `{$product.product_id \| url}` |
| `{$product.id}` | Order line ID, not the product. Do not build links from it |
| `{$product.count}` | Quantity |
| `{$product.price}` | Unit price |
| `{$product.weight}` | Unit weight |
| `{$product.old_price}` | Old price |
| `{$product.discount_price}` | Discount per unit |
| `{$product.discount_cost}` | Line discount (quantity × discount) |
| `{$product.price_formatted}` | Price with currency (e.g. `1 234 ₽`) |
| `{$product.old_price_formatted}` | Old price with currency |
| `{$product.cost_formatted}` | Line cost with currency |
| `{$product.old_cost_formatted}` | Old line cost with currency |
| `{$product.weight_formatted}` | Weight with unit (e.g. `500 g`) |
| `{$product.discount_price_formatted}` | Discount per unit with currency |
| `{$product.discount_cost_formatted}` | Line discount with currency |
| `{$product.options}` | Options array |
| `{$product.option_*}` | Options as separate fields (e.g. `option_size`) |

Besides these, all product fields (`pagetitle`, `article`, `thumb` and others) and all vendor fields are available. Vendor field names contain a dot — these are flat keys, not a nested array, so write `{$product['vendor.name']}`, not `{$product.vendor.name}`.

### Totals

| Placeholder | Value |
| --- | --- |
| `{$total.count}` | Total quantity |
| `{$total.positions}` | Number of lines (unique products) |
| `{$total.weight}` | Total weight |
| `{$total.cost}` | Total cost |
| `{$total.discount}` | Total discount |
| `{$total.cost_formatted}` | Cost with currency symbol |
| `{$total.weight_formatted}` | Weight with unit |

### Cart status

Since **v1.9.0**, the chunk and `return=data` expose a `status` array — data from `Cart::get()` after plugin processing.

| Placeholder | Value | Synced into |
| --- | --- | --- |
| `{$status.total_count}` | Product quantity | `total.count` |
| `{$status.total_cost}` | Final cost (after plugins) | `total.cost` |
| `{$status.total_weight}` | Total weight | `total.weight` |
| `{$status.total_discount}` | Total discount | `total.discount` |
| `{$status.total_positions}` | Number of lines | `total.positions` |

::: tip Sync with plugins
If a plugin on `msOnGetStatusCart` changes aggregates in `status` (for example, recalculates discount or adds delivery cost), the snippet automatically syncs `total` with `status` data. The fields in the third column match values from `status`, not a simple sum of cart lines.
:::

## Auto-update HTML

The snippet registers via `registerSnippet()` for re-render on cart changes (same as [msOrderTotal](msordertotal)). Set `selector` when multiple cart blocks are on the page:

```fenom
<div id="sidebar-cart">
    {'!msCart' | snippet : [
        'selector' => '#sidebar-cart'
    ]}
</div>
```

## Example chunk

```fenom
{* tpl.msCart *}
<div class="ms-cart">
    {if $products?}
        <table class="cart-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {foreach $products as $product}
                    <tr id="{$product.product_key}">
                        <td>
                            {if $product.thumb?}
                                <img src="{$product.thumb}" alt="{$product.pagetitle}">
                            {/if}
                            <a href="{$product.product_id | url}">{$product.pagetitle}</a>

                            {if $product.options?}
                                <small>
                                    {foreach $product.options as $key => $value}
                                        {$key}: {$value}{if !$value@last}, {/if}
                                    {/foreach}
                                </small>
                            {/if}
                        </td>
                        <td>
                            {if $product.old_price > 0}
                                <del>{$product.old_price_formatted}</del>
                            {/if}
                            {$product.price_formatted}
                        </td>
                        <td>
                            {* Quantity changes go through a form: the script reads ms3_action inside it *}
                            <form method="post" class="ms3_form" data-ms3-form>
                                <input type="hidden" name="product_key" value="{$product.product_key}">
                                <input type="hidden" name="ms3_action" value="cart/change">
                                <input type="number" name="count" value="{$product.count}" min="0">
                            </form>
                        </td>
                        <td>{$product.cost_formatted}</td>
                        <td>
                            <form method="post" class="ms3_form" data-ms3-form>
                                <input type="hidden" name="product_key" value="{$product.product_key}">
                                <input type="hidden" name="ms3_action" value="cart/remove">
                                <button type="submit">&times;</button>
                            </form>
                        </td>
                    </tr>
                {/foreach}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total:</td>
                    <td colspan="2">
                        <strong>{$total.cost_formatted}</strong>
                    </td>
                </tr>
            </tfoot>
        </table>

        {set $order_page_id = 'ms3_order_page_id' | option}
        <a href="{$order_page_id | url}" class="btn btn-primary">
            Checkout
        </a>
    {else}
        <p>Cart is empty</p>
    {/if}
</div>
```

## Working from JavaScript

```javascript
// Add product
await ms3.cartAPI.add(productId, count, options)

// Change quantity
await ms3.cartAPI.change(productKey, count)

// Remove product
await ms3.cartAPI.remove(productKey)

// Clear the cart
await ms3.cartAPI.clean()
```

::: warning cartAPI does not re-render the markup
This is the HTTP layer only. The cart HTML is not refreshed and the `ms3:cart:updated` event does not fire — for any of these methods, not just `clean()`. Re-rendering is the job of `ms3.cartUI`: use `ms3.cartUI.handleClean()` instead of calling `cartAPI.clean()` directly.
:::

### Events

Cart changes fire an event:

```javascript
document.addEventListener('ms3:cart:updated', function(e) {
    console.log('Cart updated:', e.detail);
});
```

### Markup for cart actions

Actions are described by a form carrying the `ms3_form` class and a hidden `ms3_action` field; the line is addressed by `product_key`. The full markup walkthrough, the table of allowed actions and form examples live on the [Cart](/en/components/minishop3/frontend/cart#forms-and-actions) page.
