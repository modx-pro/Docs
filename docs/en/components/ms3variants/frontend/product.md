---
title: Product page
---
# Product page

Output and selection of variants on the product page.

## Basic output

```fenom
{'msProductVariants' | snippet}
```

The snippet outputs:
- Variant list
- Hidden field for the selected variant
- Loads JS and CSS

## Default chunks

### ms3_variants (wrapper)

```fenom
{if $variants?}
    <div class="ms3-variants"
         id="ms3variants-{$product_id}"
         data-ms3v-init
         data-ms3v-product-id="{$product_id}">

        {* Hidden field for variant ID *}
        <input type="hidden" name="_variant_id" data-ms3v-variant-id value="">

        {* Variant list *}
        <div class="ms3-variants-list">
            {$rows}
        </div>
    </div>
{/if}
```

### ms3_variants_row (variant row)

```fenom
<div class="ms3-variant-row {if !$in_stock}ms3-variant-out-of-stock{/if}"
     data-ms3v-variant="{$id}"
     data-variant-price="{$price}"
     data-variant-old-price="{$old_price}"
     data-variant-count="{$count}"
     data-variant-sku="{$sku}"
     data-variant-weight="{$weight}">

    {* Image *}
    {if $image_url?}
        <div class="ms3-variant-image">
            <img src="{$image_url}" alt="{$sku}" loading="lazy">
        </div>
    {/if}

    {* Options *}
    <div class="ms3-variant-options">
        {foreach $options as $opt}
            <span class="ms3-variant-option">{$opt.value}</span>
        {/foreach}
    </div>

    {* Price *}
    <div class="ms3-variant-price">
        {if $old_price > 0}
            <span class="ms3-variant-old-price">{$old_price}</span>
        {/if}
        <span class="ms3-variant-current-price">{$price}</span>
    </div>

    {* Stock *}
    <div class="ms3-variant-stock">
        {if $in_stock}
            <span class="ms3-variant-in-stock">In stock: {$count}</span>
        {else}
            <span class="ms3-variant-out">Out of stock</span>
        {/if}
    </div>
</div>
```

## Updating page data

When a variant is selected, JavaScript automatically updates elements with `data-ms3v-*` attributes on the page:

| Attribute | Description | Updated value |
|-----------|-------------|---------------|
| `data-ms3v-price` | Current price | Formatted variant price |
| `data-ms3v-old-price` | Old price | Shown/hidden automatically |
| `data-ms3v-sku` | SKU | Variant SKU |
| `data-ms3v-weight` | Weight | Shown/hidden automatically |
| `data-ms3v-stock` | Stock | Quantity in stock |
| `data-ms3v-image` | Image | Variant image URL |
| `data-ms3v-field="{field}"` | Custom field | Value from variant data |

### Markup example

Add these attributes to elements in the product page template:

```fenom
{* SKU — always in DOM, updated on variant change *}
<span class="text-muted">SKU: <strong data-ms3v-sku>{$article}</strong></span>

{* Price *}
<div class="product-price">
    <div data-ms3v-old-price
         {if !$old_price || $old_price <= 0}style="display:none"{/if}>
        {if $old_price? && $old_price > 0}{$old_price} ₽{/if}
    </div>
    <div data-ms3v-price>
        {$price ?: 0} ₽
    </div>
</div>

{* Weight *}
<strong data-ms3v-weight>{$weight} kg</strong>
```

::: warning Elements must be in the DOM
The element with `data-ms3v-old-price` must always be present in the HTML (not inside `{if}`). JS controls its visibility via `style.display`. If the element is wrapped in a Fenom condition and not rendered — JS cannot update it.
:::

An example product page template with these attributes is included at:
`core/components/ms3variants/elements/templates/product_variants.tpl`

## Cart form integration

The snippet is called next to the cart form. When a variant is selected, JS finds the `.ms3_form` form on the page and updates the `options` field:

```fenom
{* Variants *}
{'msProductVariants' | snippet}

{* Add to cart form *}
<form method="post" class="ms3_form" data-cart-state="add">
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">

    <button type="submit">Add to cart</button>
</form>
```

When a variant is selected, JavaScript automatically:
1. Fills the hidden `_variant_id` field
2. Updates the `options` field with the selected variant's `_variant_id`
3. Updates elements with `data-ms3v-*` attributes

## JavaScript API

### Initialization

JavaScript initializes automatically for elements with `data-ms3v-init`.

For manual initialization:

```javascript
const variants = new ms3Variants({
    productId: 42,
    containerId: 'ms3variants-42',
    priceFormat: {
        decimals: 0,
        decPoint: ',',
        thousandsSep: ' ',
        currency: '₽',
        currencyPosition: 'after'
    },
    onSelect: function(variantData) {
        console.log('Selected variant:', variantData);
    }
});
```

### Price format configuration

Price format can be set via data attributes on the container:

```fenom
<div data-ms3v-init
     data-ms3v-product-id="{$product_id}"
     data-ms3v-price-decimals="0"
     data-ms3v-price-currency="₽"
     data-ms3v-price-currency-position="after"
     data-ms3v-price-thousands-sep=" "
     data-ms3v-price-dec-point=",">
```

### Methods

```javascript
// Get ID of currently selected variant
const currentId = variants.getSelectedVariant();

// Select variant programmatically
variants.setVariant(variantId);

// Reset selection
variants.reset();
```

### Events

When a variant is selected, the `ms3variants:selected` event is fired:

```javascript
document.addEventListener('ms3variants:selected', function(e) {
    console.log('Product ID:', e.detail.productId);
    console.log('Variant ID:', e.detail.id);
    console.log('Price:', e.detail.price);
    console.log('Old price:', e.detail.old_price);
    console.log('SKU:', e.detail.sku);
    console.log('Count:', e.detail.count);
    console.log('Weight:', e.detail.weight);
});
```

## Gallery integration

When a variant with an image is selected, the `ms3variants:image-change` event is fired:

```javascript
document.addEventListener('ms3variants:image-change', function(e) {
    console.log('Image URL:', e.detail.imageUrl);
    console.log('File ID:', e.detail.fileId);
});
```

### Splide adapter

An adapter for the Splide gallery is included:

```fenom
{* Load adapter *}
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/splide-adapter.js"></script>
```

The adapter automatically:
- Listens for `ms3variants:image-change`
- Finds the slide with the target image
- Switches the gallery to that slide

### GLightbox adapter

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/glightbox-adapter.js"></script>
```

### Custom integration

For other galleries, subscribe to the event:

```javascript
document.addEventListener('ms3variants:image-change', function(e) {
    const imageUrl = e.detail.imageUrl;

    // Your gallery switch code
    myGallery.goToSlide(imageUrl);
});
```

## Option selectors

To build an interface with separate option selectors (instead of a variant list):

```fenom
{set $data = 'msProductVariants' | snippet : ['returnData' => 1]}

{if $data.total > 0}
    <div class="variant-selectors" data-ms3v-selectors>
        {foreach $data.available_options as $key => $values}
            <div class="variant-option-group">
                <label>{$key}</label>
                <select data-option-key="{$key}">
                    <option value="">Select {$key}</option>
                    {foreach $values as $value}
                        <option value="{$value}">{$value}</option>
                    {/foreach}
                </select>
            </div>
        {/foreach}
    </div>

    <input type="hidden" name="_variant_id" data-ms3v-variant-id>
{/if}
```

JavaScript to handle the selectors:

```javascript
document.querySelectorAll('[data-option-key]').forEach(select => {
    select.addEventListener('change', findMatchingVariant);
});

function findMatchingVariant() {
    const selected = {};
    document.querySelectorAll('[data-option-key]').forEach(select => {
        if (select.value) {
            selected[select.dataset.optionKey] = select.value;
        }
    });

    // Find variant with these options
    // and set its ID in the hidden field
}
```
