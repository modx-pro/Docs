---
title: Snippets
---
# Snippets

## msProductVariants

Snippet for outputting product variants on the product page.

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **product** | current resource | Product ID |
| **tpl** | `ms3_variants` | Wrapper chunk for all variants |
| **tplRow** | `ms3_variants_row` | Chunk for a single variant |
| **activeOnly** | `1` | Only active variants (1/0) |
| **sortby** | `position` | Sort field: `position`, `price`, `sku`, `count` |
| **sortdir** | `ASC` | Direction: `ASC` or `DESC` |
| **includeJs** | `1` | Include JavaScript (1/0) |
| **includeCss** | `1` | Include CSS (1/0) |
| **outputSeparator** | `\n` | Separator between variants |
| **returnData** | `0` | Return data as array instead of HTML (1/0) |

### Basic call

```fenom
{'msProductVariants' | snippet}
```

### With custom chunks

```fenom
{'msProductVariants' | snippet : [
    'tpl' => 'my_variants_wrapper',
    'tplRow' => 'my_variant_item'
]}
```

### Sort by price

```fenom
{'msProductVariants' | snippet : [
    'sortby' => 'price',
    'sortdir' => 'ASC'
]}
```

### For another product

```fenom
{'msProductVariants' | snippet : [
    'product' => 42
]}
```

### Get data into a variable

```fenom
{set $variantsData = 'msProductVariants' | snippet : ['returnData' => 1]}

{if $variantsData.total > 0}
    <p>{$variantsData.total} variants available</p>

    {foreach $variantsData.variants as $variant}
        <div>{$variant.sku} — {$variant.price} ₽</div>
    {/foreach}
{/if}
```

### Placeholders in tpl (wrapper)

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$product_id}` | int | Product ID |
| `{$rows}` | string | Rendered variant rows |
| `{$variants}` | array | Array of variants for Fenom |
| `{$available_options}` | array | Unique options with values |
| `{$total}` | int | Number of variants |
| `{$options_json}` | string | JSON of available options |
| `{$variants_json}` | string | JSON variant mapping |

### Placeholders in tplRow (variant row)

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$id}` | int | Variant ID |
| `{$product_id}` | int | Product ID |
| `{$sku}` | string | SKU |
| `{$price}` | float | Price |
| `{$old_price}` | float | Old price |
| `{$count}` | int | Stock |
| `{$weight}` | float | Weight |
| `{$active}` | bool | Active flag |
| `{$position}` | int | Position |
| `{$in_stock}` | bool | In stock |
| `{$image_url}` | string | Image URL |
| `{$options}` | array | Options array `[{key, value}, ...]` |
| `{$options_string}` | string | Options as string: "Red, XL" |
| `{$options_array}` | array | Associative array `{color: 'red', size: 'XL'}` |
| `{$idx}` | int | Index |

## Integration with msProducts

To output variants in the catalog, use the standard `msProducts` snippet with the `usePackages` parameter.

### usePackages parameter

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants'
]}
```

With `usePackages => 'ms3Variants'` the plugin loads variants for all products in one query and adds data to each product.

### Product placeholders with variants

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$has_variants}` | bool | Whether product has variants |
| `{$variants_count}` | int | Number of variants |
| `{$variants_json}` | string | JSON array of variants |
| `{$variants}` | array | Array of variants for Fenom |

### Catalog output example

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium',
    'tpl' => 'ms3_products_row_variants'
]}
```

### Variant structure in array

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
    'in_stock' => true,
    'image_url' => '/assets/images/products/42/product.jpg',
    'small' => '/assets/images/products/42/small/product.jpg',
    'medium' => '/assets/images/products/42/medium/product.jpg',
    'options_array' => [
        'color' => 'red',
        'size' => 'XL'
    ]
]
```

### With image thumbnails

To load variant thumbnails, pass `includeThumbs`:

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'includeThumbs' => 'small,medium'
]}
```

The variant array will include `small`, `medium`, etc. with thumbnail URLs.
