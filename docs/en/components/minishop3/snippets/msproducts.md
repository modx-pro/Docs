---
title: msProducts
---
# msProducts

Snippet for outputting a list of products. Based on pdoTools and supports all of its filtering, sorting, and pagination features.

## Parameters

### Main

| Parameter | Default | Description |
| --- | --- | --- |
| **tpl** | `tpl.msProducts.row` | Chunk for each product |
| **limit** | `10` | Number of products per page |
| **offset** | `0` | Skip this many products |
| **depth** | `10` | Search depth in child categories |
| **parents** | current resource | Comma-separated parent category IDs |
| **resources** | | Comma-separated specific product IDs |

### Sorting

| Parameter | Default | Description |
| --- | --- | --- |
| **sortby** | `id` | Sort field |
| **sortdir** | `ASC` | Direction: `ASC` or `DESC` |
| **sortbyOptions** | | Sort by product option (see below) |

### Related products

| Parameter | Default | Description |
| --- | --- | --- |
| **link** | | Link type ID (from `ms3_links` table) |
| **master** | | Master product ID (output products linked to it) |
| **slave** | | Slave product ID (output products it is linked to) |

::: info Category filter with link
When `link` is set, the snippet automatically sets `parents => 0` and `depth => 0` so linked products are searched across the whole catalog. You do not need to pass `parents => 0` explicitly.
:::

### Filtering

| Parameter | Default | Description |
| --- | --- | --- |
| **where** | | JSON with extra conditions |
| **optionFilters** | | JSON filters by product options |
| **showZeroPrice** | `true` | Show zero-price products |
| **showUnpublished** | `false` | Show unpublished |
| **showDeleted** | `false` | Show deleted |
| **showHidden** | `true` | Show hidden in menu |

### Extra data

| Parameter | Default | Description |
| --- | --- | --- |
| **includeContent** | `false` | Include the `content` field |
| **includeTVs** | | Comma-separated TV list |
| **includeThumbs** | | Comma-separated thumbnail sizes |
| **includeVendorFields** | `*` | Vendor fields (`*` = all) |
| **includeOptions** | | Comma-separated product options to include |
| **tvPrefix** | | Prefix for TV placeholders (pdoTools) |
| **withCurrency** | `false` | Add currency symbol to `price_formatted` and `old_price_formatted` |
| **usePackages** | | Comma-separated external packages (see [Integration](#integration-with-external-packages)) |

### Output

| Parameter | Default | Description |
| --- | --- | --- |
| **return** | `data` | Format: `data`, `json`, `ids`, `sql` |
| **returnIds** | `false` | Return only product IDs |
| **toPlaceholder** | | Save result to a placeholder |
| **toSeparatePlaceholders** | | Prefix for separate placeholders |
| **outputSeparator** | `\n` | Separator between products |
| **tplWrapper** | | Wrapper chunk for the full output |
| **wrapIfEmpty** | `true` | Use wrapper when result is empty |
| **showLog** | `false` | Show execution log (managers in mgr context only) |

### Category scope (#481)

pdoTools filters products by `parent` but ignores extra categories from `msCategoryMember`. The snippet uses `CategoryProductScopeService`: when `parents` is not `0`, it builds a `WHERE` for primary and extra categories and resets `parents` to `0` so pdoTools does not drop products from linked categories.

### Output with `return=data`

With `return=data` (the default) the snippet does **not** return a PHP array. For each row it picks a chunk (`tpl` or `@FILE`) and joins the result with `outputSeparator`. For an array use Fenom `{set $rows = 'msProducts' | snippet : ['return' => 'json']}` and `json_decode`, or `return=ids`.

With `showLog=1` and a manager session, the pdoTools log is available in the `msProducts.log` placeholder.

## Table aliases

The msProducts snippet automatically joins related product tables. Fields from the main table (msProduct) are available without a prefix; joined tables require an alias.

### Tables and their fields

| Table | Alias | Fields |
| --- | --- | --- |
| msProduct | — (not needed) | id, pagetitle, longtitle, alias, uri, parent, createdon, publishedon, template... |
| msProductData | `Data` | price, old_price, article, weight, vendor_id, new, popular, favorite, color, size, tags... |
| msVendor | `Vendor` | name, country, logo, address, phone, email (with `includeVendorFields`) |

### Dynamic aliases

| Alias | When available | Description |
| --- | --- | --- |
| `Link` | With `link` + `master`/`slave` | Product links table |
| `{size}` | With `includeThumbs` | Thumbnails. Alias = size name (small, medium...) |
| `{option}` | With `optionFilters` / `sortbyOptions` | Product options. Alias = option key (color, size...) |

### Example

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => [
        'parent' => 15,
        'Data.price:>' => 1000,
        'Data.vendor_id' => 3
    ],
    'sortby' => 'Data.price',
    'sortdir' => 'ASC'
]}
```

::: warning Important
Product fields (price, article, new, popular, etc.) are in the `Data` table. Without the alias the query fails: use `'Data.price:>' => 1000`, not `'price:>' => 1000`.
:::

## Examples

### Basic output

```fenom
{'msProducts' | snippet : [
    'parents' => 5,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}
```

### Sort by price

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'Data.price',
    'sortdir' => 'ASC'
]}
```

### New products (sort by date)

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'createdon',
    'sortdir' => 'DESC',
    'limit' => 8,
    'where' => ['Data.new' => 1]
]}
```

### Popular products

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => ['Data.popular' => 1],
    'limit' => 4
]}
```

### Products from a specific vendor

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => ['Data.vendor_id' => 5]
]}
```

### Filter by options

```fenom
{* Red products in size M *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'size' => 'M']
]}
```

### OR condition in options

```fenom
{* Red OR blue products *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'OR:color' => 'blue']
]}
```

### Related products

Product links let you output accessories, related products, alternatives, and more.

```fenom
{* Accessories for the current product *}
{'msProducts' | snippet : [
    'link' => 2,
    'master' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4,
    'tpl' => 'tpl.msProducts.related'
]}
```

The `master` parameter specifies the product for which linked items are searched. The link ID (`link`) matches the link type in MiniShop3 settings.

### Reverse link (products for which the current one is an accessory)

```fenom
{'msProducts' | snippet : [
    'link' => 2,
    'slave' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4
]}
```

### Link types

MiniShop3 includes these link types by default:

| ID | Name |
| --- | --- |
| 1 | Recommended (Related) |
| 2 | Accessories |
| 3 | Alternatives |

Create new link types under **Settings → Link types**.

### Sort by option

```fenom
{* Sort by weight (numeric option) *}
{'msProducts' | snippet : [
    'parents' => 0,
    'sortby' => 'weight',
    'sortbyOptions' => 'weight:number',
    'sortdir' => 'ASC'
]}
```

**Supported types for `sortbyOptions`:**

| Type | Example | When to use |
| --- | --- | --- |
| `number` / `decimal` | `weight:number` | Decimals: price, weight, volume |
| `int` / `integer` | `quantity:int` | Integers: quantity, rating, age |
| `date` / `datetime` | `release_date:date` | Dates: release date, arrival date |
| (no type) | `color` | Text: alphabetical sort |

### With image thumbnails

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'includeThumbs' => 'small,medium'
]}
```

In the chunk you get `{$small}`, `{$medium}` — URL of the first image for each size.

### Multiple product images

The `includeThumbs` parameter returns only the first image (position = 0). To get 2–3 images for a carousel or gallery, use `leftJoin` and `select`:

```fenom
{'msProducts' | snippet : [
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
`position = 0` is the first image, `position = 1` the second, and so on. Order is defined by the product gallery sort.
:::

### Return only IDs

```fenom
{set $productIds = 'msProducts' | snippet : [
    'parents' => 5,
    'returnIds' => 1
]}

{* $productIds = "1,2,3,4,5" *}
```

### JSON output (for AJAX)

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'return' => 'json',
    'limit' => 20
]}
```

### With pagination (pdoPage)

```fenom
{'pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'limit' => 12,
    'tpl' => 'tpl.msProducts.row'
]}

{$_modx->getPlaceholder('page.nav')}
```

## Placeholders in the chunk

In the `tpl` chunk all product fields are available:

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

- `{$article}` — SKU
- `{$price}` — price
- `{$old_price}` — old price
- `{$weight}` — weight
- `{$image}` — main image
- `{$thumb}` — thumbnail
- `{$vendor_id}` — vendor ID
- `{$made_in}` — country of origin
- `{$new}` — "New" flag
- `{$popular}` — "Popular" flag
- `{$favorite}` — "Favorite" flag
- `{$color}` — color (JSON)
- `{$size}` — size (JSON)
- `{$tags}` — tags (JSON)
- `{$discount}` — discount percent (computed automatically)

### Formatted placeholders

Numeric `{$price}`, `{$old_price}`, `{$weight}` are for calculations. For display use `*_formatted` per `ms3_price_format`, `ms3_currency_symbol`, `ms3_currency_position`, `ms3_weight_unit`:

- `{$price_formatted}` — price (with currency when `withCurrency => true`)
- `{$old_price_formatted}` — old price
- `{$weight_formatted}` — weight with unit (e.g. `500 g`)

The `formatPrices` parameter was removed in v1.7.0 (#242).

### Vendor fields (Vendor)

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

## Example chunk

```fenom
{* tpl.msProducts.row *}
<div class="product-card">
    <a href="{$uri}">
        {if $thumb?}
            <img src="{$thumb}" alt="{$pagetitle}" loading="lazy">
        {/if}

        <h3>{$pagetitle}</h3>

        {if $old_price > $price}
            <span class="old-price">{$old_price} руб.</span>
        {/if}

        <span class="price">{$price} руб.</span>

        {if $new}
            <span class="badge badge-new">New</span>
        {/if}
    </a>

    <button type="button"
            data-ms-action="cart/add"
            data-id="{$id}">
        Add to cart
    </button>
</div>
```

## Integration with external packages

The msProducts snippet integrates with external packages (ms3Variants, msBrands, etc.) via the event system. This lets you extend product data without modifying MiniShop3 core code.

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

Without `usePackages`, external package data is not loaded — this saves resources on pages that do not need it.

### Available placeholders

Each package adds its own placeholders. For example, ms3Variants adds:

| Placeholder | Type | Description |
| --- | --- | --- |
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
    <div class="price">{$price} руб.</div>

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

External packages use the `msOnProductsLoad` and `msOnProductPrepare` events for integration. See [Events](/en/components/minishop3/development/events).
