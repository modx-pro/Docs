---
title: Product catalog
---
# Product catalog

Outputting variants in catalog cards using SSR (Server-Side Rendering).

## Enabling variants

Use the `usePackages` parameter to load variants in the catalog:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'ms3_products_row_variants'
]}
```

## Chunk ms3_products_row_variants

A ready-made chunk for a product card with variants is included:

```fenom
<div class="product-card" data-product-id="{$id}">
    {* Image *}
    <div class="product-image">
        <img src="{$thumb}" class="product-image" alt="{$pagetitle}">
    </div>

    {* Title *}
    <h3><a href="/{$id | url}">{$pagetitle}</a></h3>

    {if $has_variants}
        {* ========== PRODUCT WITH VARIANTS ========== *}
        <div class="ms3v-catalog" data-product-id="{$id}">

            {* Variant selector *}
            <select class="ms3v-select">
                {foreach $variants as $idx => $variant}
                    {set $label = ''}
                    {foreach $variant.options_array as $optVal}
                        {if $label}{set $label = $label ~ ', '}{/if}
                        {set $label = $label ~ $optVal}
                    {/foreach}
                    <option value="{$variant.id}" {if $idx == 0}selected{/if}>
                        {$label} — {$variant.price | number : 0 : ',' : ' '} ₽
                    </option>
                {/foreach}
            </select>

            {* Variant blocks *}
            {foreach $variants as $idx => $variant}
                {set $variantImage = $variant.small ?: $variant.image_url}
                <div class="ms3v-variant-block"
                     data-variant-id="{$variant.id}"
                     data-variant-image="{$variantImage}"
                     {if $idx > 0}style="display:none"{/if}>

                    {* Price *}
                    <div class="variant-price">
                        {if $variant.old_price > $variant.price}
                            <span class="old-price">{$variant.old_price | number} ₽</span>
                        {/if}
                        <span class="current-price">{$variant.price | number} ₽</span>
                    </div>

                    {* Add to cart form *}
                    {set $variantOptions = ["_variant_id" => $variant.id]}
                    <form method="post" class="ms3_form">
                        <input type="hidden" name="id" value="{$id}">
                        <input type="hidden" name="count" value="1">
                        <input type="hidden" name="options" value='{$variantOptions | json_encode}'>
                        <input type="hidden" name="ms3_action" value="cart/add">

                        <button type="submit" {if !$variant.in_stock}disabled{/if}>
                            Add to cart
                        </button>
                    </form>
                </div>
            {/foreach}
        </div>

    {else}
        {* ========== PRODUCT WITHOUT VARIANTS ========== *}
        <div class="product-price">{$price} ₽</div>

        <form method="post" class="ms3_form">
            <input type="hidden" name="id" value="{$id}">
            <input type="hidden" name="count" value="1">
            <input type="hidden" name="options" value="{}">
            <input type="hidden" name="ms3_action" value="cart/add">
            <button type="submit">Add to cart</button>
        </form>
    {/if}
</div>
```

## Switching variants

### ProductCardUI module

The package includes the JavaScript module `ProductCardUI.js`, which replaces the default MiniShop3 module and adds variant support in the catalog.

To enable it, replace the default `ProductCardUI.js` entry in the system setting `ms3_frontend_assets`:

```
"[[+jsUrl]]web/ui/ProductCardUI.js"
```

with:

```
"/assets/components/ms3variants/js/web/ProductCardUI.js"
```

The module is fully compatible with the default one — cards without variants keep working as before. For cards with variants the module automatically:
- Handles changes to the `.ms3v-select` selector
- Shows/hides `.ms3v-variant-block` blocks
- Switches the product card image

### Image switching

When a variant is selected, the card image updates automatically if:
1. The variant block has the `data-variant-image` attribute
2. The card has an element with class `.product-image`

```fenom
<div class="ms3v-variant-block"
     data-variant-id="{$variant.id}"
     data-variant-image="{$variant.small}">
```

### With image thumbnails

For image switching to work correctly, pass `includeThumbs`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium',
    'tpl' => 'ms3_products_row_variants'
]}
```

Variant data will include `small` and `medium` fields with thumbnail URLs.

## Product placeholders

When using `usePackages => 'ms3Variants'` the following are added:

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$has_variants}` | bool | Whether product has variants |
| `{$variants_count}` | int | Number of variants |
| `{$variants}` | array | Array of variants |
| `{$variants_json}` | string | JSON of variants |

## Variant structure

```php
[
    'id' => 1,
    'sku' => 'ABC-123-red',
    'price' => 1500.00,
    'old_price' => 2000.00,
    'count' => 10,
    'in_stock' => true,
    'image_url' => '/assets/images/42/product.jpg',
    'small' => '/assets/images/42/small/product.jpg',
    'options_array' => [
        'color' => 'Red',
        'size' => 'XL'
    ]
]
```

## Out-of-stock filtering

The `ms3variants_show_out_of_stock` setting controls display:

**When `true` (default):**
- All variants are shown
- Variants with no stock have the button disabled

**When `false`:**
- Variants with no stock are hidden
- If a product has no available variants, `has_variants = false`

## Minimal chunk

Simplest chunk with variants:

```fenom
<div class="product" data-product-id="{$id}">
    <a href="/{$id | url}">
        <img src="{$thumb}" alt="{$pagetitle}">
        <h3>{$pagetitle}</h3>
    </a>

    {if $has_variants}
        <select class="ms3v-select" onchange="this.form.elements.options.value = JSON.stringify({_variant_id: this.value})">
            {foreach $variants as $v}
                <option value="{$v.id}">{$v.options_array | join : ', '} — {$v.price} ₽</option>
            {/foreach}
        </select>

        <form method="post" class="ms3_form">
            <input type="hidden" name="id" value="{$id}">
            <input type="hidden" name="options" value='{["_variant_id" => $variants[0].id] | json_encode}'>
            <input type="hidden" name="ms3_action" value="cart/add">
            <button type="submit">Add to cart</button>
        </form>
    {else}
        <span class="price">{$price} ₽</span>
        <form method="post" class="ms3_form">
            <input type="hidden" name="id" value="{$id}">
            <input type="hidden" name="ms3_action" value="cart/add">
            <button type="submit">Add to cart</button>
        </form>
    {/if}
</div>
```

## Performance

Variants are loaded in a single SQL query for all products on the page via the `msOnProductsLoad` event. This keeps performance high even with many products.

::: tip Optimization
The `usePackages` parameter loads variants only when specified. On pages where variants are not needed (home, landing), do not set this parameter.
:::
