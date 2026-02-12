---
title: msCart
---
# msCart

Snippet for displaying the shopping cart. Shows cart items with quantity change and remove options.

::: warning Caching
The snippet uses the user session and must be called **uncached**.
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msCart` | Cart layout chunk |
| **selector** | | CSS selector for auto-updating cart HTML |
| **includeTVs** | | Comma-separated TV parameters for products |
| **includeThumbs** | | Comma-separated thumbnail sizes |
| **includeContent** | | Include product `content` in query |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show execution log (managers only) |
| **return** | `tpl` | Output format: `tpl` or `data` |
| **customer_token** | | Customer token (default from session) |

### pdoTools parameters

The snippet inherits pdoTools parameters:

| Parameter | Description |
|-----------|-------------|
| **where** | Extra query conditions (JSON) |
| **leftJoin** | Extra JOINs (JSON) |
| **select** | Extra fields (JSON) |
| **sortby** | Sort field (default `msProduct.id`) |
| **sortdir** | Sort direction (default `ASC`) |

## Examples

### Basic output

```fenom
{'!msCart' | snippet}
```

### With thumbnails

```fenom
{'!msCart' | snippet: [
    'includeThumbs' => 'small'
]}
```

### Multiple thumbnail sizes

```fenom
{'!msCart' | snippet: [
    'includeThumbs' => 'small,medium'
]}
```

### With TV parameters

```fenom
{'!msCart' | snippet: [
    'includeTVs' => 'my_tv,another_tv'
]}
```

### Auto-update into element

```fenom
{'!msCart' | snippet: [
    'selector' => '#header-mini-cart'
]}
```

When the cart changes, JavaScript re-renders and updates `#header-mini-cart`.

### Get data as array

```fenom
{var $cart = '!msCart' | snippet: ['return' => 'data']}
{$cart.total.cost}
```

### Output to placeholder

```fenom
{'!msCart' | snippet: [
    'toPlaceholder' => 'cart'
]}

{* Use *}
{$_modx->getPlaceholder('cart')}
```

## Cart data structure

With `return=data` the snippet returns:

```php
[
    'products' => [
        [
            'key' => 'abc123',           // Line key
            'id' => 15,                  // Product ID
            'product_id' => 15,
            'count' => 2,
            'price' => 1500,
            'weight' => 500,
            'options' => ['size' => 'M'],
            'option_size' => 'M',
            'pagetitle' => 'T-shirt',
            'article' => 'ART-001',
            'old_price' => 2000,
            'discount_price' => 500,
            'discount_cost' => 1000,
            // ... other product fields
        ],
    ],
    'total' => [
        'count' => 5,
        'weight' => 2500,
        'cost' => 7500,
        'discount' => 0,
        'positions' => 3,
    ],
]
```

## Chunk placeholders

### Cart products

Loop over products:

```fenom
{foreach $products as $product}
    {$product.pagetitle} — {$product.count} × {$product.price}
{/foreach}
```

For each product:

- `{$product.key}` — Line key
- `{$product.id}` — Product ID
- `{$product.count}` — Quantity
- `{$product.price}` — Unit price
- `{$product.weight}` — Unit weight
- `{$product.old_price}` — Old price
- `{$product.discount_price}` — Unit discount
- `{$product.discount_cost}` — Line discount
- `{$product.options}` — Options array
- `{$product.option_*}` — Option fields (e.g. `option_size`)
- All product fields (`pagetitle`, `article`, `thumb`, etc.)
- Vendor fields with prefix `vendor.` (`vendor.name`, `vendor.logo`, etc.)

### Totals

- `{$total.count}` — Total quantity
- `{$total.positions}` — Number of lines
- `{$total.weight}` — Total weight
- `{$total.cost}` — Total cost
- `{$total.discount}` — Total discount

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

## JavaScript

Cart updates via MiniShop3 JavaScript API:

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

Cart changes fire:

```javascript
document.addEventListener('ms3:cart:updated', function(e) {
    console.log('Cart updated:', e.detail);
});
```

### Data attributes

Use data attributes for automatic behavior:

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
