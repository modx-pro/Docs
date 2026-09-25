---
title: msProducts
---
# msProducts

Outputs a list of products. Based on pdoTools and supports all of its filtering, sorting, and pagination features.

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

Since 1.14 the `sortby` value is checked against a list of what is allowed before it reaches the query. These pass:

- product and resource fields — they get the right alias automatically;
- declared TVs, vendor fields and `sortbyOptions` keys;
- the `RAND`, `FIELD`, `IFNULL`, `COALESCE` and `CAST` functions, provided their arguments pass too;
- parts carrying a table alias — only for aliases from `leftJoin` and `innerJoin` of the same call.

::: warning A rejected part is dropped silently
A dropped sort part raises no error: the page renders, the products come in the wrong order. If the whole value is dropped, the list falls back to `msProduct.id`.

The reason goes to the MODX error log as `ms3_products dropped unsafe/unknown sortby part(s)`. Check it there if the product order changed after an upgrade.
:::

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
| **showLog** | `false` | Show the execution log. Visible only to someone signed in to the Manager — on any page of the site |

### Category scope

pdoTools filters products by `parent` only and does not see extra categories from `msCategoryMember`. So when `parents` is not `0`, the snippet builds its own `WHERE` for the primary and extra categories — that is the job of `CategoryProductScopeService`. Then `parents` is reset to `0`, otherwise pdoTools drops products from linked categories.

### Restricted products and resource groups

If a product or category is closed by a MODX resource group, the snippet hides it from outsiders. The check is on by default through the `ms3_web_catalog_respect_resource_groups` system setting and works together with the MODX setting `access_resource_group_enabled`.

A signed-in customer whose customer group is linked to a MODX user group sees the restricted section.

::: danger A restricted catalog does not work on a cached page
MODX serves the finished HTML before the snippet runs. The first guest writes their reduced list into the cache, and a signed-in customer sees exactly that — with no sign of anything being wrong.

On pages with restricted sections call the snippet uncached: `[[!ms3_products]]`.
:::

### Output `return=data`

With `return=data` (the default) the snippet does **not** return a PHP array. For each row it picks a chunk (`tpl` or `@FILE`) and joins the result with `outputSeparator`. For an array use Fenom `{set $rows = 'msProducts' | snippet : ['return' => 'json']}` and `json_decode`, or `return=ids`.

With `showLog=1` and an open Manager session the snippet returns the pdoTools log. Where it lands depends on `return`:

| `return` | Where to find the log |
| --- | --- |
| `data` (default) | Appended to the output as the last element, after the products |
| `json`, `ids`, `sql` | The `msProducts.log` placeholder |
| any, with `toSeparatePlaceholders` | The `<prefix>log` placeholder |

## Table aliases

Fields of the main table `msProduct` are available without a prefix; fields of joined tables only through an alias. The tables themselves are joined automatically.

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

### Example with aliases

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

::: warning Product fields only with the `Data` alias
Product fields (`price`, `article`, `new`, `popular` and others) live in the `Data` table. Without the alias the query fails: write `'Data.price:>' => 1000`, not `'price:>' => 1000`.
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

### Select by a product field

```fenom
{* Popular products *}
{'msProducts' | snippet : [
    'parents' => 0,
    'where' => ['Data.popular' => 1],
    'limit' => 4
]}

{* Products from a specific vendor *}
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

{* Red OR blue products — the OR: prefix *}
{'msProducts' | snippet : [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'OR:color' => 'blue']
]}
```

### Related products

```fenom
{* Accessories for the current product *}
{'msProducts' | snippet : [
    'link' => 2,
    'master' => $_modx->resource.id,
    'limit' => 4,
    'tpl' => 'tpl.msProducts.related'
]}

{* Reverse link: products for which the current one is an accessory *}
{'msProducts' | snippet : [
    'link' => 2,
    'slave' => $_modx->resource.id,
    'limit' => 4
]}
```

`master` is the product whose linked items are searched; `slave` is the opposite direction. `link` is the ID of a link from **MiniShop3 → Product links**. The `2` here is arbitrary: [use the ID of your own link](#link-id).

### Where the link ID comes from {#link-id}

The package ships no links: after install the links table is empty and there is nothing to pass in `link`. Links are created by hand under **MiniShop3 → Product links**.

Create as many links as your shop needs — “Accessories”, “Alternatives”, “Frequently bought together”. You choose the name; the `ID` is assigned on save: `1` for the first link, `2` for the second, and so on. That number goes into `link`.

Every link also has a type, which sets its cardinality rather than its meaning:

| Type | What it means |
| --- | --- |
| `one_to_one` | One product links to one |
| `one_to_many` | One product links to many |
| `many_to_one` | Many products link to one |
| `many_to_many` | Many link to many |

::: warning The examples above will not work on a clean install
They use `'link' => 2`, but until you create links no such row exists and the snippet returns nothing. Create the links in the Manager first, then substitute their real IDs.
:::

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

In the chunk you get `{$small}`, `{$medium}` — the URL of the main image in each size.

### Multiple product images

The `includeThumbs` parameter returns a single image per product — the main one. The main image is the one marked as the preview in the gallery; with no preview set, the image with the lowest position is used. To get two or three images for a carousel, use `leftJoin` and `select`:

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

## Placeholders of the `tpl` chunk

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

The `formatPrices` parameter was removed in 1.11.0-beta1. In the same release plain price and weight placeholders became numbers for arithmetic, while display strings moved to `*_formatted`.

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
            <span class="old-price">{$old_price_formatted}</span>
        {/if}

        <span class="price">{$price_formatted}</span>

        {if $new}
            <span class="badge badge-new">New</span>
        {/if}
    </a>

    {* Adding to the cart works through a form: the storefront script looks for ms3_action inside one *}
    <form method="post" class="ms3_form" data-ms3-form>
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="count" value="1">
        <input type="hidden" name="ms3_action" value="cart/add">
        <button type="submit">Add to cart</button>
    </form>
</div>
```

::: warning A bare button will not add anything to the cart
The script intercepts the submit of a form carrying the `ms3_form` class or the `data-ms3-form` attribute and reads the `ms3_action` field. A button with attributes instead of a form does nothing and reports no error — the product simply is not added. The stock chunk `ms3_products_row.tpl` is a complete working example.
:::

## Integration with external packages

External packages (ms3Variants, msBrands and others) add their own data to products through events — MiniShop3 core code stays untouched.

### usePackages parameter

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

### Package placeholders

Each package adds its own. For example, ms3Variants:

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
    <div class="price">{$price_formatted}</div>

    {if $has_variants}
        <div class="variants-selector" data-variants='{$variants_json}'>
            {* JavaScript initializes selectors from JSON *}
        </div>
    {/if}

    <form method="post" class="ms3_form" data-ms3-form>
        <input type="hidden" name="id" value="{$id}">
        <input type="hidden" name="variant_id" value="">
        <input type="hidden" name="count" value="1">
        <input type="hidden" name="ms3_action" value="cart/add">
        <button type="submit">Add to cart</button>
    </form>
</div>
```

### Events for developers

Packages hook into the `msOnProductsLoad` and `msOnProductPrepare` events — see [Events](/en/components/minishop3/development/events).
