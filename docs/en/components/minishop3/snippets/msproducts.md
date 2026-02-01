---
title: msProducts
---
# msProducts

Snippet for outputting a product list. Based on pdoTools and supports filtering, sorting, and pagination.

## Parameters

### Main

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msProducts.row` | Chunk for each product |
| **limit** | `10` | Products per page |
| **offset** | `0` | Skip count |
| **depth** | `10` | Depth in child categories |
| **parents** | current resource | Comma-separated parent category IDs |
| **resources** | | Comma-separated product IDs |

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

msProducts joins related tables. Main table (msProduct) fields need no prefix; joined tables use an alias.

### Tables and fields

| Table | Alias | Fields |
|-------|-------|--------|
| msProduct | — | id, pagetitle, longtitle, alias, uri, parent, createdon, publishedon, template... |
| msProductData | `Data` | price, old_price, article, weight, vendor_id, new, popular, favorite, color, size, tags... |
| msVendor | `Vendor` | name, country, logo, address, phone, email (with `includeVendorFields`) |

::: warning
Product fields (price, article, new, popular, etc.) are in table `Data`. Use alias: `'Data.price:>' => 1000`, not `'price:>' => 1000`.
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
{'msProducts' | snippet: [
    'parents' => 0,
    'optionFilters' => ['color' => 'red', 'size' => 'M']
]}
```

### Related products

```fenom
{* Related products for current product *}
{'msProducts' | snippet: [
    'link' => 2,
    'master' => $_modx->resource.id,
    'parents' => 0,
    'limit' => 4,
    'tpl' => 'tpl.msProducts.related'
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

**`sortbyOptions` types:** `number`/`decimal`, `int`/`integer`, `date`/`datetime`, or no type for text.
