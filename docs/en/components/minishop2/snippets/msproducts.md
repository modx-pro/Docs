# msProducts

Snippet for outputting products.

![msProducts](https://file.modx.pro/files/9/7/2/9725aed7accaed426b7324135baf4b19.png)

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `tpl.msProducts.row` | Chunk per result |
| **limit** | `10` | Max results |
| **offset** | | Skip first N results |
| **depth** | `10` | Search depth from each parent |
| **sortby** | `id` | Sort field. For product fields use prefix "Data.", e.g. ``&sortby=`Data.price` `` |
| **sortbyOptions** | | Options to sort by, e.g. "optionkey:integer,optionkey2:datetime" |
| **sortdir** | `ASC` | Sort direction |
| **toPlaceholder** | | If set, save output to a placeholder instead of outputting. |
| **toSeparatePlaceholders** | | If set, each result goes to a placeholder named by this prefix + index (e.g. "myPl" → `[[+myPl0]]`, `[[+myPl1]]`). |
| **parents** | | Comma-separated category ids. Default: current parent. Use 0 for no limit. |
| **resources** | | Comma-separated product ids. Minus prefix excludes that id. |
| **includeContent** | | Include product "content" field. |
| **includeTVs** | | Comma-separated TV list. |
| **includeThumbs** | | Comma-separated thumbnail sizes (must exist in product gallery). |
| **optionFilters** | | Option filters as JSON, e.g. {"optionkey:>":10} |
| **where** | | Extra conditions as JSON. |
| **link** | | Product link id (from settings). |
| **master** | | Main product id. If both master and slave are set, query uses master. |
| **slave** | | Linked product id. Ignored if master is set. |
| **tvPrefix** | | Prefix for TV placeholders, e.g. "tv." |
| **outputSeparator** | `\n` | String between results. |
| **returnIds** | | Return comma-separated product ids instead of chunk output. |
| **showUnpublished** | | Include unpublished products. |
| **showDeleted** | | Include deleted products. |
| **showHidden** | `1` | Include products hidden from menu. |
| **showZeroPrice** | `1` | Include zero-price products. |
| **wrapIfEmpty** | `1` | Output wrapper chunk (tplWrapper) even when there are no results. |
| **showLog** | | Show debug info. Only for users authorized in context "mgr". |

<!--@include: ../parts/tip-general-properties.md-->

## Features

msProducts, like all miniShop2 snippets, uses pdoTools. Main parameters match [pdoResources][3], with additions.

### Multi-category support

An MS2 product has one physical parent but can belong to several categories. msProducts respects that.

![Multi-category support](https://file.modx.pro/files/7/2/f/72f87345aac1e801f316dd722b52c827.png)

### Images

Use **&includeThumbs** to load images from the product gallery. Comma-separated sizes:

```modx
[[!msProducts?
  &parents=`0`
  &includeThumbs=`120x90,360x270`
]]
```

Placeholders `[[+120x90]]` and `[[+360x270]]` will be available in the chunk.

### Link filtering

Use **&link** with **&master** or **&slave** to get related products:

```modx
[[!msProducts?
  &parents=`0`
  &link=`1`
  &master=`15`
]]
```

This returns all products linked to product 15 via link type 1.

### Options

msProducts adds all product options as placeholders `[[+option_key]]`.

**&optionFilters** adds conditions to filter by options:

```modx
[[!msProducts?
  &parents=`0`
  &optionFilters=`{"core_count:>":4}`
]]
```

This outputs products that have option `core_count` greater than 4.

For sorting by options use **&sortbyOptions** (option keys and types, comma-separated) and **&sortby**:

```modx
&sortbyOptions=`core_count:number`
&sortby=`{"pagetitle":"ASC", "core_count":"DESC"}`
```

## Aliases

msProducts joins related tables so you can use their data without extra queries:

- **msProduct** — main class (extends `modResource`)
- **Data** — `msProductData`: price, article, and other product fields
- **Vendor** — `msVendor`: name, country, logo, etc.

### Placeholders

To see all placeholders, omit the output chunk:

```modx
<pre>
  [[!msProducts?
    &parents=`0`
    &tpl=``
  ]]
</pre>
```

### Filter examples

Products with sale price:

```modx
&where=`{"Data.old_price:!=":"0"}`
```

Products marked **New**:

```modx
&where=`{"Data.new":"1"}`
```

Products marked **Popular**:

```modx
&where=`{"Data.popular":"1"}`
```

Products marked **Favorite**:

```modx
&where=`{"Data.favorite":"1"}`
```

## Examples

All products from category 15:

```modx
[[!msProducts?
  &parents=`15`
]]
```

With pagination:

```modx
[[!pdoPage?
  &element=`msProducts`
  &parents=`15`
]]
[[!+page.nav]]
```

All products with price > 1000:

```modx
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &where=`{"Data.price:>":1000}`
]]
[[!+page.nav]]
```

Products by vendor Sony:

```modx
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &where=`{"Vendor.name":"Sony"}`
]]
[[!+page.nav]]
```

Sort by article:

```modx
[[!pdoPage?
  &element=`msProducts`
  &parents=`0`
  &sortby=`Data.article`
  &sortdir=`asc`
]]
[[!+page.nav]]
```

[3]: /en/components/pdotools/snippets/pdoresources
