---
title: Product page
---
# Product page

How to output variants on the product page and connect them to the price, the cart form and the gallery.

## Variant output

```fenom
{'!msProductVariants' | snippet}
```

The snippet outputs the variant list with the standard `ms3_variants` and `ms3_variants_row` chunks and includes `ms3variants.js` and `ms3variants.css` (the `includeJs`, `includeCss` parameters). The call must be uncached — see [Snippets](../snippets) for why.

On page load, the variant the customer chose before is selected (stored in `localStorage` under the `ms3v_selected_{product ID}` key), otherwise the first one in the list. The first one may be an out-of-stock variant. The price, SKU and other data on the page are immediately replaced with the selected variant's data.

A ready product page template with the attributes in place is in the file `core/components/ms3variants/elements/templates/product_variants.tpl`. Installation does not create it as a MODX template — copy its content into your template.

## Your own variant markup {#markup}

Your own chunks in the `tpl` and `tplRow` parameters work if they contain the attributes JavaScript reads:

| Where | Attribute | Required | What it does |
|-------|-----------|----------|--------------|
| Wrapper | `data-ms3v-init` | yes | Starts variant selection |
| Wrapper | `id` | yes | Any unique value. Without it, nothing starts, silently |
| Wrapper | `data-ms3v-product-id` | yes | Product ID |
| Row | `data-ms3v-variant` | yes | Variant ID; a click on the row selects the variant |
| Row | `data-variant-price`, `data-variant-old-price`, `data-variant-count`, `data-variant-sku`, `data-variant-weight` | no | Data put on the page and into the event |
| Row | `data-variant-file-id` | no | Image ID for gallery switching. The standard chunk does not output it |
| Row | `<img>` inside `.ms3-variant-image` | no | Variant image URL |

Chunk placeholders are listed on the [Snippets](../snippets) page.

```fenom
{* tpl *}
<div id="ms3variants-{$product_id}" data-ms3v-init data-ms3v-product-id="{$product_id}">
    {$rows}
</div>

{* tplRow *}
<div data-ms3v-variant="{$id}" data-variant-price="{$price}" data-variant-file-id="{$file_id}">
    {$options_string} — {$price}
</div>
```

## Price and SKU on the page {#page-fields}

When a variant is selected, JavaScript updates page elements with `data-ms3v-*` attributes:

| Attribute | What is put in |
|-----------|----------------|
| `data-ms3v-price` | Variant price in the format from [Price format](#price-format) |
| `data-ms3v-old-price` | Old price; if there is none, the element is hidden |
| `data-ms3v-sku` | SKU |
| `data-ms3v-weight` | Weight as a number; with weight 0 the element is hidden |
| `data-ms3v-stock` | Stock; empty when zero |
| `data-ms3v-image` | Image URL: into `src` of the `<img>` itself or a nested one |
| `data-ms3v-field="key"` | Key value without formatting: `id`, `price`, `old_price`, `count`, `sku`, `weight`, `image`, `file_id` |

Every attribute except `data-ms3v-field` is updated only on the first such element on the page. The element's content is replaced entirely, so put units outside it:

```fenom
<span data-ms3v-sku>{$article}</span>
<span data-ms3v-old-price {if !($old_price > 0)}style="display:none"{/if}>{$old_price}</span>
<span data-ms3v-price>{$price}</span>
<span data-ms3v-weight>{$weight}</span> kg
```

::: warning The old price element must always be in the markup
Do not wrap the `data-ms3v-old-price` element in an `{if}` condition. If it is not in the HTML, JavaScript cannot show the old price for a variant that has one. JavaScript controls the element's visibility itself.
:::

## Cart form {#cart-form}

When a variant is selected, JavaScript writes `{"_variant_id": ID}` into the `options` field of the add-to-cart form:

```fenom
{'!msProductVariants' | snippet}

<form method="post" class="ms3_form" data-cart-state="add">
    <input type="hidden" name="id" value="{$_modx->resource.id}">
    <input type="hidden" name="options" value="[]">
    <input type="hidden" name="ms3_action" value="cart/add">
    <button type="submit">Add to cart</button>
</form>
```

The variant is written into the first `.ms3_form[data-cart-state="add"]` form on the page, and if there is none — into the first `.ms3_form` of any kind. If other cart forms are higher on the page, for example in a related products block, the variant is written to the wrong one.

If the page has a `data-cart-state="change"` form and the selected variant is already in the cart, the add form is hidden and the change form is shown: its `product_key` and `count` fields get the data of that cart item. When a variant that is not in the cart is selected, the add form is shown again with quantity 1. The state is updated without a page reload — on the MiniShop3 cart event `ms3:cart:updated`.

::: warning Standard MiniShop3 options in the same form are not sent
If the form has standard MiniShop3 option fields (`options[color]`) besides the variant, they do not reach the cart: MiniShop3 takes a non-empty `options` field and ignores the `options[...]` fields. The cart gets the variant without the chosen color.
:::

## Row states {#states}

| Class | When |
|-------|------|
| `active` | Row of the selected variant |
| `in-cart` | The variant is in the cart; a `.ms3-variant-cart-badge` is added to the row with the count in the cart. Its text is always in Russian ("В корзине: N шт."): it is fixed in the script |
| `ms3-variant-out-of-stock` | The variant is out of stock. Set by the chunk; in your own `tplRow` — `{if !$in_stock}ms3-variant-out-of-stock{/if}` |

An out-of-stock variant can be selected, and the add button stays available. If stock control is on ([`ms3variants_check_stock`](../settings#ms3variants_check_stock), Yes by default), the server refuses adding it to the cart with the message "Variant is out of stock".

## Starting JavaScript {#init}

Automatic start is by `data-ms3v-init` on the `DOMContentLoaded` event. The snippet includes the script itself. If you include `ms3variants.js` yourself (with `returnData` or `includeJs` = 0), use a regular `<script>` without `async`: a script loaded after this event does not start.

The automatically started instance is not accessible from outside. To call methods, start it manually once the wrapper is on the page. The standard `ms3_variants` chunk outputs `data-ms3v-init`, so you need your own `tpl` without this attribute, otherwise there will be two instances on the wrapper:

```javascript
const variants = new ms3Variants({
    productId: 42,
    containerId: 'ms3variants-42',
    onSelect: function (data) { /* data — as in the selected event */ }
});
```

Parameters: `productId`, `containerId` (the wrapper `id`), `priceFormat` (see [Price format](#price-format)), `onSelect`.

| Method | What it does |
|--------|--------------|
| `getSelectedVariant()` | ID of the selected variant |
| `setVariant(id)` | Selects a variant and remembers the choice |
| `reset()` | Removes the selection and forgets the choice. It does not clear the form's `options` field: the previous variant is still added to the cart |

## Price format {#price-format}

The format is set with wrapper attributes or with the `priceFormat` parameter on [manual start](#init). The standard `ms3_variants` chunk does not output these attributes, and the snippet has no format parameters: a custom format needs your own `tpl`.

| Attribute | `priceFormat` key | Default |
|-----------|-------------------|---------|
| `data-ms3v-price-decimals` | `decimals` | `0` |
| `data-ms3v-price-dec-point` | `decPoint` | `,` |
| `data-ms3v-price-thousands-sep` | `thousandsSep` | space |
| `data-ms3v-price-currency` | `currency` | `₽` |
| `data-ms3v-price-currency-position` | `currencyPosition` | `after` (or `before`) |

::: warning Set all five values at once
If only some are set, the rest are not taken from the defaults but are lost: the price shows the text `undefined`.
:::

## Events {#events}

`ms3variants:selected` — a variant is selected, including automatically on page load. `e.detail` fields: `productId`, `id`, `price`, `old_price`, `count`, `sku`, `weight`, `image`, `file_id`.

Subscribe on the variants wrapper: a handler on `document` fires twice for one selection.

```javascript
document.getElementById('ms3variants-42').addEventListener('ms3variants:selected', function (e) {
    console.log(e.detail.id, e.detail.price);
});
```

## Gallery {#gallery}

`ms3variants:image-change` is sent to `document` if the selected variant has an image, including on page load. `e.detail` fields: `productId`, `variantId`, `fileId`, `imageUrl`. With the standard chunk `fileId` is always `0` — find the gallery slide by the file name from `imageUrl`.

```javascript
document.addEventListener('ms3variants:image-change', function (e) {
    myGallery.goToImage(e.detail.fileId || e.detail.imageUrl);
});
```

### Splide adapter

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/splide-adapter.js"></script>
```

The adapter works if:

- slides are `#ms3-gallery-main .splide__slide` elements; the right one is found by `data-file-id`, then by file name;
- the Splide instance is in `element.splide` of the `#ms3-gallery-main` element or is passed with `window.ms3VariantsSetSplide(splide)`.

A variant is selected right on page load, so call `ms3VariantsSetSplide()` right after creating Splide: the adapter misses events before the call. If the gallery is built differently, the adapter silently does nothing. Ready markup is in the file `core/components/ms3variants/elements/chunks/ms3_gallery_splide.tpl`; installation does not create it as a chunk.

### GLightbox adapter

```fenom
<script src="{'assets_url' | option}components/ms3variants/js/web/adapters/glightbox-adapter.js"></script>
```

Include the adapter after the GLightbox library: without it, the adapter fails with a console error as soon as it finds a gallery element.

The adapter searches the whole page: by `data-file-id`, then `a.glightbox` by address or file name. It sets the `active` class on the found element and scrolls the page to it, including on page load.

The `active` class is removed from all `.glightbox` and `[data-file-id]` elements on the page at the same time. If your gallery shows slides by the `active` class, the adapter conflicts with it.
