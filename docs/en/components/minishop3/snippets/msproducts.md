---
title: msProducts
---
# msProducts

Snippet for outputting a list of products. It is based on pdoTools and supports all its filtering, sorting, and pagination capabilities.

## Parameters

### Main

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msProducts.row` | Chunk for outputting each product |
| **limit** | `10` | Number of products per page |
| **offset** | `0` | Number of products to skip from the start |
| **depth** | `10` | Search depth in child categories |
| **parents** | current resource | Comma-separated parent category IDs |
| **resources** | | Comma-separated specific product IDs |

### Sorting

| Parameter | Default | Description |
|-----------|---------|-------------|
| **sortby** | `id` | Sort field |
| **sortdir** | `ASC` | Direction: `ASC` or `DESC` |
| **sortbyOptions** | | Sort by product option (see below) |

### Related products

| Parameter | Default | Description |
|-----------|---------|-------------|
| **link** | | Link type ID (from `ms3_links`) |
| **master** | | Master product ID (products linked to it) |
| **slave** | | Slave product ID (products it is linked to) |

::: warning parents=0
When using `link` for related products, set **`parents => 0`** to disable category filtering. Otherwise only related products from the same category are returned.
:::

### Filtering

| Parameter | Default | Description |
|-----------|---------|-------------|
| **where** | | JSON extra conditions |
| **optionFilters** | | JSON filters by product options |
| **showZeroPrice** | `true` | Show zero-price products |
| **showUnpublished** | `false` | Show unpublished |
| **showDeleted** | `false` | Show deleted |
| **showHidden** | `true` | Show hidden in menu |

### Extra data

| Parameter | Default | Description |
|-----------|---------|-------------|
| **includeContent** | `false` | Include `content` |
| **includeTVs** | | Comma-separated TV list |
| **includeThumbs** | | Comma-separated thumbnail sizes |
| **includeVendorFields** | `*` | Vendor fields (`*` = all) |
| **includeOptions** | | Comma-separated options to include |
| **formatPrices** | `false` | Format prices via `$ms3->format->price()` |
| **withCurrency** | `false` | Add currency symbol (with `formatPrices`) |
| **usePackages** | | Comma-separated external packages (see [Integration](#integration-with-external-packages)) |

### Output

| Parameter | Default | Description |
|-----------|---------|-------------|
| **return** | `data` | Format: `data`, `json`, `ids`, `sql` |
| **returnIds** | `false` | Return only IDs |
| **toPlaceholder** | | Save to placeholder |
| **toSeparatePlaceholders** | | Prefix for separate placeholders |
| **outputSeparator** | `\n` | Separator between products |
| **tplWrapper** | | Wrapper chunk |
| **wrapIfEmpty** | `true` | Use wrapper when empty |
| **showLog** | `false` | Show execution log |

## Table aliases

The msProducts snippet automatically joins related product tables. Fields of the main table (msProduct) are available without a prefix; for joined tables you need the alias.

### Tables and their fields

| Table | Alias | Fields |
|-------|-------|--------|
| msProduct | — | id, pagetitle, longtitle, alias, uri, parent, createdon, publishedon, template... |
| msProductData | `Data` | price, old_price, article, weight, vendor_id, new, popular, favorite, color, size, tags... |
| msVendor | `Vendor` | name, country, logo, address, phone, email (when `includeVendorFields` is set) |

### Dynamic aliases

| Alias | When used | Description |
|-------|-----------|-------------|
| `Link` | With **link** + **master** or **slave** | Product links table |
| `{size}` | With **includeThumbs** | Thumbnails; alias is the size name (small, medium, …) |
| `{option}` | With **optionFilters** or **sortbyOptions** | Product option; alias is the option key (color, size, …) |

::: warning
Product fields (price, article, new, popular, etc.) are in table `Data`. Without the alias the query will fail: use `'Data.price:>' => 1000`, not `'price:>' => 1000`.
:::

## Examples

### Basic output

```fenom
{'msProducts' | snippet: [
    'parents' => 5,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}
```

### Sort by price

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'sortby' => 'Data.price',
    'sortdir' => 'ASC'
]}
```

### New products (sort by date)

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'sortby' => 'createdon',
    'sortdir' => 'DESC',
    'limit' => 8,
    'where' => ['Data.new' => 1]
]}
```

### Popular products

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'where' => ['Data.popular' => 1],
    'limit' => 4
]}
```

### Filter by options

```fenom
{* Products that are red and size M *}
{'msProducts' | snippet: [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'size' => 'M']
]}
```

### OR in options

```fenom
{* Red OR blue products *}
{'msProducts' | snippet: [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'OR:color' => 'blue']
]}
```

### Vendor products

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'where' => ['Data.vendor_id' => 5]
]}
```

### Related products

Product links let you output accessories, related products, alternatives, etc.

```fenom
{* Accessories for the current product *}
{'msProducts' | snippet: [
    'link' => 2,
    'master' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4,
    'tpl' => 'tpl.msProducts.related'
]}
```

Parameter **master** is the product for which linked products are searched. The link id (**link**) corresponds to the link type in MiniShop3 settings.

### Reverse link (products for which the current one is an accessory)

```fenom
{'msProducts' | snippet: [
    'link' => 2,
    'slave' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4
]}
```

### Link types

Default link types in MiniShop3:

| ID | Name |
|----|------|
| 1 | Similar (Related) |
| 2 | Accessories |
| 3 | Alternatives |

Add types in **Settings → Link types**.

### Sort by option

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'sortby' => 'weight',
    'sortbyOptions' => 'weight:number',
    'sortdir' => 'ASC'
]}
```

**Supported types for `sortbyOptions`:**

| Type | Example | Use when |
|------|---------|----------|
| `number` / `decimal` | `weight:number` | Decimals: price, weight, volume |
| `int` / `integer` | `quantity:int` | Integers: quantity, rating, age |
| `date` / `datetime` | `release_date:date` | Dates: release date, arrival date |
| (no type) | `color` | Text: alphabetical sort |

### With image thumbnails

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'includeThumbs' => 'small,medium'
]}
```

In the chunk you get `{$small}`, `{$medium}` — URL of the first image of each size.

### Multiple product images

Parameter **includeThumbs** returns only the first image (position = 0). To get 2–3 images for a carousel or gallery, use **leftJoin** and **select**:

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'leftJoin' => [
        'Img1' => [
            'class' => 'MiniShop3\\Model\\msProductFile',
            'on' => 'Img1.product_id = msProduct.id AND Img1.position = 0 AND Img1.path LIKE "%/small/%"'
        ],
        'Img2' => [
            'class' => 'MiniShop3\\Model\\msProductFile',
            'on' => 'Img2.product_id = msProduct.id AND Img2.position = 1 AND Img2.path LIKE "%/small/%"'
        ],
        'Img3' => [
            'class' => 'MiniShop3\\Model\\msProductFile',
            'on' => 'Img3.product_id = msProduct.id AND Img3.position = 2 AND Img3.path LIKE "%/small/%"'
        ]
    ],
    'select' => [
        'Img1' => 'Img1.url as img1',
        'Img2' => 'Img2.url as img2',
        'Img3' => 'Img3.url as img3'
    ]
]}
```

In the chunk you get `{$img1}`, `{$img2}`, `{$img3}` — image URLs in gallery order.

::: tip Image position
`position = 0` is the first image, `position = 1` the second, etc. Order is defined by the product gallery sort.
:::

### Return only IDs

```fenom
{set $productIds = 'msProducts' | snippet: [
    'parents' => 5,
    'returnIds' => 1
]}

{* $productIds = "1,2,3,4,5" *}
```

### JSON output (for AJAX)

```fenom
{'msProducts' | snippet: [
    'parents' => 0,
    'return' => 'json',
    'limit' => 20
]}
```

### With pagination (pdoPage)

```fenom
{'pdoPage' | snippet: [
    'element' => 'msProducts',
    'parents' => 0,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}

{$_modx->getPlaceholder('page.nav')}
```

## Placeholders in the chunk

In the **tpl** chunk all product fields are available:

### Resource fields

- `{$id}` — product ID
- `{$pagetitle}` — title
- `{$longtitle}` — long title
- `{$description}` — description
- `{$introtext}` — summary
- `{$content}` — content (if `includeContent`)
- `{$alias}` — URL alias
- `{$uri}` — full URI
- `{$parent}` — parent ID
- `{$template}` — template ID
- `{$published}` — published
- `{$createdon}` — created date
- `{$editedon}` — edited date

### Product fields (Data)

- `{$article}` — article/sku
- `{$price}` — price
- `{$old_price}` — previous price
- `{$weight}` — weight
- `{$image}` — main image
- `{$thumb}` — thumbnail
- `{$vendor_id}` — vendor ID
- `{$made_in}` — country of origin
- `{$new}` — "new" flag
- `{$popular}` — "popular" flag
- `{$favorite}` — "favorite" flag
- `{$color}` — color (JSON)
- `{$size}` — size (JSON)
- `{$tags}` — tags (JSON)
- `{$discount}` — discount percent (computed)

### Vendor fields

With `includeVendorFields`:

- `{$vendor_position}` — position
- `{$vendor_name}` — name
- `{$vendor_resource_id}` — resource ID
- `{$vendor_country}` — country
- `{$vendor_logo}` — logo
- `{$vendor_address}` — address
- `{$vendor_phone}` — phone
- `{$vendor_email}` — email
- `{$vendor_description}` — description
- `{$vendor_properties}` — properties

### Other

- `{$idx}` — index in the result set

## Integration with external packages

The msProducts snippet supports integration with third-party packages (ms3Variants, msBrands, etc.) via the event system. This lets you extend product data without modifying MiniShop3 core.

### usePackages parameter

To load data from an external package, pass its name in the `usePackages` parameter:

```fenom
{* Load product variants *}
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants'
]}

{* Load variants and brands *}
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants,msBrands'
]}
```

Without `usePackages`, external package data is not loaded — which saves resources on pages that do not need it.

### Available placeholders

Each package adds its own placeholders. For example, ms3Variants adds:

| Placeholder | Type | Description |
|-------------|------|-------------|
| `{$has_variants}` | bool | Whether the product has variants |
| `{$variants_count}` | int | Number of variants |
| `{$variants_json}` | string | JSON array for JavaScript |
| `{$variants}` | array | Array of variants for Fenom |

### Example with variants

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants',
    'tpl' => 'tpl.msProducts.variants'
]}
```

**Chunk tpl.msProducts.variants:**

```fenom
<div class="product-card" data-product-id="{$id}">
    <h3>{$pagetitle}</h3>
    <div class="price">{$price}</div>

    {if $has_variants}
        <div class="variants-selector" data-variants='{$variants_json}'>
            {* JavaScript initializes selectors from JSON *}
        </div>
    {/if}

    <form method="post" class="ms-product-form">
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="variant_id" value="">
        <button type="submit">Add to cart</button>
    </form>
</div>
```

### Events for developers

Third-party packages use the `msOnProductsLoad` and `msOnProductPrepare` events for integration. See [Events](/en/components/minishop3/development/events).
