---
title: msCart
---
# msCart

Snippet for displaying the shopping cart. Shows cart items with options to change quantity and remove lines.

::: warning Caching
The snippet uses the user session and must be called **uncached**.
:::

## Parameters

| Parameter | Default | Description |
|----------|--------------|----------|
| **tpl** | `tpl.msCart` | Cart layout chunk |
| **selector** | | CSS selector for auto-updating cart HTML |
| **includeTVs** | | Comma-separated product TV parameters |
| **includeThumbs** | | Comma-separated thumbnail sizes |
| **includeContent** | | Include product `content` field in query |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show execution log (managers only) |
| **return** | `tpl` | Output format: `tpl` or `data` |
| **customer_token** | | Customer token (default from session) |
| **hideOnThanks** | `false` | When `1` / `true`, the snippet returns an empty string on the thank-you page (detected by URL parameter `?msorder=...`). By default (`false`) the cart renders as usual — a mini cart in the shared layout keeps working. Before 1.11.0, empty output on the thanks page was the default and could not be disabled (#249). |

### pdoTools parameters

The snippet inherits pdoTools parameters:

| Parameter | Description |
|----------|----------|
| **where** | Extra query conditions (JSON) |
| **leftJoin** | Extra JOINs (JSON) |
| **select** | Extra fields for query (JSON) |
| **sortby** | Sort field (default `msProduct.id`) |
| **sortdir** | Sort direction (default `ASC`) |

## Examples

### Basic output

```fenom
{'!msCart' | snippet}
```

### With thumbnails

```fenom
{'!msCart' | snippet : [
    'includeThumbs' => 'small'
]}
```

### Multiple thumbnail sizes

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

### Auto-update into a target element

```fenom
{'!msCart' | snippet : [
    'selector' => '#header-mini-cart'
]}
```

When the cart changes, JavaScript re-renders the HTML and updates the `#header-mini-cart` element.

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

With `return=data` the snippet returns an array:

```php
[
    'products' => [
        [
            'key' => 'abc123',           // Unique line key
            'id' => 15,                  // Product ID
            'product_id' => 15,          // Product ID (duplicate)
            'count' => 2,                // Quantity
            'price' => 1500,             // Unit price
            'weight' => 500,             // Unit weight
            'options' => ['size' => 'M'], // Selected options
            'option_size' => 'M',        // Options as separate fields
            'pagetitle' => 'T-shirt',    // Product title
            'article' => 'ART-001',      // SKU
            'old_price' => 2000,         // Old price
            'discount_price' => 500,     // Discount per unit
            'discount_cost' => 1000,     // Line discount
            // ... other product fields
        ],
        // ...
    ],
    'total' => [
        'count' => 5,                    // Total quantity
        'weight' => 2500,                // Total weight
        'cost' => 7500,                  // Total cost
        'discount' => 0,                 // Total discount
        'positions' => 3,                // Number of lines
        'cost_formatted' => '7 500 ₽',  // Cost with currency
        'weight_formatted' => '2.5 kg',  // Weight with unit
    ],
    'status' => [
        'total_count' => 5,              // Quantity from Cart::get()
        'total_cost' => 7500,            // Cost from Cart::get()
        'total_weight' => 2500,          // Weight from Cart::get()
        'total_discount' => 0,           // Discount from Cart::get()
        'total_positions' => 3,          // Lines from Cart::get()
    ],
]
```

## Chunk placeholders

### Cart products

Loop over products in the chunk:

```fenom
{foreach $products as $product}
    {$product.pagetitle} — {$product.count} pcs. × {$product.price}
{/foreach}
```

For each product:

- `{$product.key}` — Unique line key
- `{$product.id}` — Product ID
- `{$product.count}` — Quantity
- `{$product.price}` — Unit price
- `{$product.weight}` — Unit weight
- `{$product.old_price}` — Old price
- `{$product.discount_price}` — Discount per unit
- `{$product.discount_cost}` — Line discount (quantity × discount)
- `{$product.price_formatted}` — Price with currency (e.g. `1 234 ₽`)
- `{$product.old_price_formatted}` — Old price with currency
- `{$product.cost_formatted}` — Line cost with currency
- `{$product.old_cost_formatted}` — Old line cost with currency
- `{$product.weight_formatted}` — Weight with unit (e.g. `500 g`)
- `{$product.discount_price_formatted}` — Discount per unit with currency
- `{$product.discount_cost_formatted}` — Line discount with currency
- `{$product.options}` — Options array
- `{$product.option_*}` — Options as separate fields (e.g. `option_size`)
- All product fields (`pagetitle`, `article`, `thumb`, etc.)
- All vendor fields with prefix `vendor.` (`vendor.name`, `vendor.logo`, etc.)

### Totals

- `{$total.count}` — Total quantity
- `{$total.positions}` — Number of lines (unique products)
- `{$total.weight}` — Total weight
- `{$total.cost}` — Total cost
- `{$total.discount}` — Total discount
- `{$total.cost_formatted}` — Cost with currency symbol
- `{$total.weight_formatted}` — Weight with unit

::: tip Sync with plugins
If a plugin on `msOnGetStatusCart` changes aggregates in `status` (for example, recalculates discount or adds delivery cost), the snippet automatically syncs `total` with `status` data. Fields `total.cost`, `total.count`, `total.weight`, `total.discount`, and `total.positions` match values from `status`, not a simple sum of cart lines.
:::

### Cart status

Since **v1.9.0**, the chunk and `return=data` expose a `status` array — data from `Cart::get()` after plugin processing:

- `{$status.total_cost}` — Final cost (after plugins)
- `{$status.total_count}` — Product quantity
- `{$status.total_weight}` — Total weight
- `{$status.total_discount}` — Total discount
- `{$status.total_positions}` — Number of lines

## Example chunk

```fenom
{* tpl.msCart *}
<div class="ms-cart" data-ms-cart>
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
                    <tr data-ms-cart-item="{$product.key}">
                        <td>
                            {if $product.thumb?}
                                <img src="{$product.thumb}" alt="{$product.pagetitle}" width="60">
                            {/if}
                            <a href="{$product.id | resource : 'uri'}">{$product.pagetitle}</a>

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
                                <del>{$product.old_price}</del>
                            {/if}
                            {$product.price}
                        </td>
                        <td>
                            <input type="number"
                                   name="count"
                                   value="{$product.count}"
                                   min="1"
                                   data-ms-action="cart/change"
                                   data-key="{$product.key}">
                        </td>
                        <td>{$product.count * $product.price}</td>
                        <td>
                            <button type="button"
                                    data-ms-action="cart/remove"
                                    data-key="{$product.key}">
                                ✕
                            </button>
                        </td>
                    </tr>
                {/foreach}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3">Total:</td>
                    <td colspan="2">
                        <strong data-ms-cart-total-cost>{$total.cost}</strong>
                    </td>
                </tr>
            </tfoot>
        </table>

        <a href="{'ms3_order_page' | option}" class="btn btn-primary">
            Checkout
        </a>
    {else}
        <p>Cart is empty</p>
    {/if}
</div>
```

## JavaScript interaction

The cart is updated via the MiniShop3 JavaScript API:

```javascript
// Add product
ms3.cart.add(productId, count, options);

// Change quantity
ms3.cart.change(key, count);

// Remove product
ms3.cart.remove(key);

// Clear cart
ms3.cart.clean();
```

### Events

Cart changes fire an event:

```javascript
document.addEventListener('ms3:cart:updated', function(e) {
    console.log('Cart updated:', e.detail);
});
```

### Data attributes

Use data attributes for automatic interaction:

```html
<!-- Add to cart -->
<button data-ms-action="cart/add" data-id="15" data-count="1">
    Add to cart
</button>

<!-- With options -->
<button data-ms-action="cart/add"
        data-id="15"
        data-options='{"size":"M","color":"red"}'>
    Add to cart
</button>

<!-- Change quantity -->
<input type="number"
       data-ms-action="cart/change"
       data-key="abc123"
       value="2">

<!-- Remove from cart -->
<button data-ms-action="cart/remove" data-key="abc123">
    Remove
</button>
```
