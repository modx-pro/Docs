---
title: Snippets
---
# Snippets

## msProductVariants

Outputs product variants on the product page: ready HTML from chunks, or a data array for your own markup.

::: warning Call the snippet uncached
Write `'!msProductVariants'`, with the exclamation mark. Without it, variant prices and stock are stored in the page cache: editing a variant in the manager and deducting stock do not clear that cache, so the customer sees an old price and availability. With the `returnData` parameter, a cached call causes an error 500 when the page is loaded again.
:::

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **product** | current resource | Product ID. If the resource is not a product, the output is empty (see [below](#empty)) |
| **tpl** | `ms3_variants` | Wrapper chunk for all variants |
| **tplRow** | `ms3_variants_row` | Chunk for one variant |
| **activeOnly** | `1` | `1` — active variants only, `0` — all. An inactive variant counts as out of stock, so with [`ms3variants_show_out_of_stock`](settings#ms3variants_show_out_of_stock) = No it is hidden even with `0`. The setting defaults to Yes |
| **sortby** | `position` | Any variant field: `position`, `price`, `old_price`, `sku`, `count`, `weight`, `id`. A typo in the field name makes the snippet output nothing, and an `Error … executing query` entry appears in the MODX error log |
| **sortdir** | `ASC` | Direction: `ASC` or `DESC` |
| **includeJs** | `1` | Include JavaScript (1/0). Not included with `returnData` |
| **includeCss** | `1` | Include CSS (1/0). Not included with `returnData` |
| **outputSeparator** | `\n` | Separator between variants |
| **returnData** | `0` | Return a data array instead of HTML (1/0) |

### Call

```fenom
{'!msProductVariants' | snippet}
```

Custom chunks, sorting, another product:

```fenom
{'!msProductVariants' | snippet : [
    'tpl' => 'my_variants_wrapper',
    'tplRow' => 'my_variant_item',
    'sortby' => 'price',
    'sortdir' => 'ASC',
    'product' => 42
]}
```

### Data into a variable {#return-data}

With `returnData` the snippet returns an array, and you write the markup yourself.

```fenom
{set $variantsData = '!msProductVariants' | snippet : ['returnData' => 1]}

{if $variantsData.total > 0}
    {foreach $variantsData.variants as $variant}
        <div>{$variant.sku} — {$variant.price}</div>
    {/foreach}
{/if}
```

| Key | Type | Description |
|-----|------|-------------|
| `product_id` | int | Product ID |
| `variants` | array | Variants with all fields of the [variant row](#row), including `idx` and `options_string` |
| `available_options` | array | Variant option values — as in the [wrapper](#wrapper) |
| `total` | int | Number of variants |

JavaScript and CSS are not included in this mode. If your markup uses `data-ms3v-*`, include `assets/components/ms3variants/js/web/ms3variants.js` and `assets/components/ms3variants/css/web/ms3variants.css` yourself.

### When there are no variants {#empty}

| Case | Regular call | With `returnData` |
|------|--------------|-------------------|
| The product has no variants, or all are hidden | empty string, the `tpl` chunk is not output | empty array `[]` |
| The resource is not a product | empty string and an entry in the MODX error log | empty string, not an array |

Only a resource with `class_key` = `MiniShop3\Model\msProduct` counts as a product. Do not call the snippet in a template shared by all pages: every non-product page adds an entry to the error log.

### Placeholders in tpl (wrapper) {#wrapper}

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$product_id}` | int | Product ID |
| `{$rows}` | string | Variant rows rendered with the `tplRow` chunk |
| `{$variants}` | array | Variants array for Fenom |
| `{$available_options}` | array | Variant option values by key: `{color: ['Red', 'Blue']}` |
| `{$total}` | int | Number of variants |
| `{$options_json}` | string | `available_options` as JSON |
| `{$variants_json}` | string | Options of each variant as JSON: `{"12": {"color": "Red"}}` |

`available_options` is built from all active variants of the product. It ignores the `ms3variants_show_out_of_stock` setting: a value whose variants are all out of stock stays in it, although there are no rows with it.

### Placeholders in tplRow (variant row) {#row}

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$id}` | int | Variant ID |
| `{$product_id}` | int | Product ID |
| `{$sku}` | string, may be empty | SKU |
| `{$price}` | float | Price |
| `{$old_price}` | float, may be empty | Old price |
| `{$count}` | int | Stock |
| `{$weight}` | float, may be empty | Weight |
| `{$active}` | bool | The variant is active |
| `{$position}` | int | Position |
| `{$in_stock}` | bool | In stock: the variant is active and its stock is above zero. With [`ms3variants_check_stock`](settings#ms3variants_check_stock) = No — any active variant. The setting defaults to Yes |
| `{$file_id}` | int, may be empty | ID of the image from the product gallery |
| `{$image_url}` | string, may be empty | Image URL. Empty if no image is selected |
| `{$options}` | array | Variant options as a list: `[{key, value}, ...]` |
| `{$options_string}` | string | Option values as a string: "Red, XL" |
| `{$options_array}` | array | Options by key: `{color: 'Red', size: 'XL'}` |
| `{$created_at}`, `{$updated_at}` | string | Creation and update dates |
| `{$idx}` | int | Sequence number, starting from 0 |

Prices are plain numbers without formatting.

## Variants in the catalog (msProducts)

To output variants in the catalog, pass the `usePackages` parameter to the standard `msProducts` snippet:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'ms3_products_row_variants'
]}
```

The value `ms3Variants` is case-sensitive: with `ms3variants`, variants are not loaded.

The catalog gets only active variants ordered by `position`. The `activeOnly` and `sortby` parameters of `msProductVariants` do not apply here. Out-of-stock variants are hidden by the same `ms3variants_show_out_of_stock` setting as on the product page.

::: warning Without replacing ProductCardUI, the cart gets the product, not the variant
For the catalog buttons to add the selected variant, replace the standard MiniShop3 module with the ms3Variants module — see the "ProductCardUI module" section on the [Product catalog](frontend/catalog) page.
:::

### Product placeholders with variants

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$has_variants}` | bool | Whether the product has variants |
| `{$variants_count}` | int | Number of variants |
| `{$variants_json}` | string | The same data as in `{$variants}`, as a JSON array. The structure differs from `{$variants_json}` in the `msProductVariants` wrapper |
| `{$variants}` | array | Variants array for Fenom |

A product without variants has `{$has_variants}` = false, `{$variants_count}` = 0, `{$variants}` — an empty array, `{$variants_json}` — `[]`.

### Variant fields in `{$variants}`

```php
[
    'id' => 1,
    'product_id' => 42,
    'sku' => 'ABC-123-red-XL',
    'price' => 1500.00,
    'old_price' => 2000.00,
    'count' => 10,
    'weight' => 0.5,
    'active' => true,
    'position' => 0,
    'in_stock' => true,
    'file_id' => 7,
    'image_url' => '/assets/images/products/42/product.jpg',
    'small' => '/assets/images/products/42/small/product.jpg', // only with includeThumbs
    'options' => [['key' => 'color', 'value' => 'red'], ['key' => 'size', 'value' => 'XL']],
    'options_array' => ['color' => 'red', 'size' => 'XL'],
]
```

### With image thumbnails

`includeThumbs` is a standard `msProducts` parameter. Variant thumbnails are loaded only if `usePackages` is set too. Pass thumbnail names from the product media source settings:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium'
]}
```

A variant with an image gets `small` and `medium` fields with thumbnail URLs. A variant without an image has no such fields. The `msProductVariants` snippet does not load thumbnails.
