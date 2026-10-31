# msCatalyst

The main snippet: filter panel, counters, sorting, search, pagination and product cards. Call it uncached.

```modx
[[!msCatalyst?
  &parents=`5`
  &facets=`vendor, parent, option:color, ms:price|range`
]]
```

## Properties

| Property | Default | Description |
|---|---|---|
| `facets` | `vendor, parent` | List of facets, syntax below. |
| `parents` | current resource | Comma-separated category IDs. |
| `depth` | `10` | How deep to look for products inside the categories. |
| `includeCategories` | `1` | Take additional product categories into account. |
| `templates` | | Only products with these template IDs. |
| `showUnpublished` | `0` | Show unpublished products. |
| `showHidden` | `1` | Show products with "Show in menu" unchecked. |
| `sorts` | `menuindex, pagetitle, ms:price:asc, ms:price:desc` | Sort options. The first one is the default and is not added to the URL. |
| `limits` | `12, 24, 48` | Per-page options. The first one is the default. |
| `search` | `1` | Show the search field. |
| `searchFields` | `pagetitle^3, longtitle, ms:article^5, introtext, description, content` | Search fields with weights: resource fields, `ms:`, `tv:`, `option:`. A match in the title ranks a product above a match in the description. |
| `searchParam` | `search` | URL parameter for search. Change it if `search` is already used on the site. |
| `searchMin` | `2` | Minimum query length. |
| `searchMode` | `filter` | `filter`, `page`, `live` or `live+page`, see [msCatalystSearch](mscatalystsearch). |
| `searchPage` | | ID or URL of the results page for `page` and `live+page`. |
| `suggestLimit` | `8` | Number of suggestions in live search. |
| `richSearch` | `1` | Word forms, transliteration and typos. |
| `set` | | Filter set name, see below. |
| `seo` | `off` | `off`, `native`, `seofilter` or `both`, see [SEO](../seo). |
| `pagination` | `both` | `pages` (page numbers), `more` ("Show more" button), `both` or `none`. |
| `first` | `8` | How many values of a group are visible before the "Show all" button. `0` shows all. |
| `hideSingle` | `1` | Hide groups with fewer than two values. |
| `hideUnavailable` | `1` | Hide values that have no products under the current filters. Available values go to the top of the group. With `0`, unavailable values stay greyed out at the bottom of the list. |
| `lang` | | Catalog language, for example `en`. If empty, the language is detected automatically, see [Multilingual](../multilingual). |
| `langStrict` | `1` | Localizator: hide products without a translation into the current language. With `0`, such products are shown with their original fields. |
| `view` | `1` | The "Grid / List" switch. |
| `noindexFiltered` | `1` | `noindex, follow` on filtered pages. |
| `element` | `msProducts` | Snippet that outputs the cards. |
| `tpl` | `msCatalyst.card` | Card chunk. msCatalyst passes it to `element`. With your own chunk, set `&rowsClass` to match the theme grid. |
| `tplOuter` | `msCatalyst.outer` | Chunk for the whole block. |
| `tplGroup` | `msCatalyst.group` | Chunk for a group of checkboxes. |
| `tplOption` | `msCatalyst.option` | Chunk for a single checkbox. |
| `tplRange` | `msCatalyst.range` | Chunk for a range. |
| `tplEmpty` | `msCatalyst.empty` | "Nothing found" chunk. |
| `rowsClass` | `msc-grid` | Class of the card container. With your own card chunk you can set the theme grid class, for example `row`. |
| `breakpoint` | `992` | Width in pixels below which the panel becomes a slide-out. |
| `toPlaceholder` | | Write the output to a placeholder. |
| `css`, `js`, `cacheTime` | from settings | Override system settings for one call. |

Properties that msCatalyst does not know are passed to the `element` snippet. This is how `&includeTVs`, `&includeThumbs` and other msProducts properties get through. msCatalyst sets `resources`, `parents`, `sortby`, `limit` and `offset` itself, and drops `where` and `tvFilters`: it does the filtering.

## Facet syntax

Facets are comma-separated. A facet consists of a source, a name and modifiers separated by `|`:

```
source:name|modifier|modifier=value
```

### Sources

| Source | Example | Where the values come from |
|---|---|---|
| `vendor` | `vendor` | Product vendor. Label: vendor name. |
| `parent` | `parent` | Parent category of the product. Label: `pagetitle`. |
| `ms` | `ms:color`, `ms:price` | A field of the `ms2_products` table (`ms3_products` in MiniShop3). JSON arrays `color`, `size`, `tags` are split into separate values. |
| `tv` | `tv:color` | A TV. Multiple values are split by `\|\|`. Labels and order come from the TV "Input Option Values" in the `Label==value` format. |
| `option` | `option:size` | A product option (`ms2_product_options` or `ms3_product_options`). Group title: the option caption. |
| `resource` | `resource:template` | A resource field: `template`, `publishedon`, `createdby` and others. |
| `msop`, `variant` | `msop:price\|range` | Modification fields of msOptionsPrice2 and ms3Variants, see [MODX 3 and modifications](../modx3). |

### Modifiers

| Modifier | Example | What it does |
|---|---|---|
| `range` | `ms:price\|range` | A "from–to" range instead of checkboxes. Does not work for `vendor` and `parent`. |
| `step` | `\|step=100` | Slider step. |
| `title` | `\|title=Цвет` | Group title. |
| `alias` | `\|alias=c` | Key in the URL instead of the name: `?c=red`. Required if two facets end up with the same name. |
| `sort` | `\|sort=count` | Value order: `label` (by label, default), `count` (by count), `value` (by value, numbers in natural order), `index` (order from the TV or the `menuindex` of categories). |
| `lex` | `\|lex=color_` | The label for the value `red` comes from the lexicon entry `color_red`, if it exists. |
| `first` | `\|first=5` | A custom "Show all" threshold for the group. |
| `open`, `closed` | `\|closed` | The group is expanded or collapsed by default. Without the modifier, the first group, ranges and groups with selected values are expanded. |
| `and` | `\|and` | A product must have all selected values. By default any one is enough. |
| `label` | `parent\|label=menutitle` | For `parent`: the label comes from `menutitle` or `longtitle`. |
| `delimiter` | `tv:tags\|delimiter=,` | TV value delimiter instead of `\|\|`. |

### JSON

Instead of a string you can pass a JSON array. This helps when a title needs a comma:

```modx
&facets=`[
  {"source": "vendor", "sort": "count"},
  {"source": "ms", "name": "price", "range": true, "step": 100},
  {"source": "tv", "name": "color", "title": "Цвет, оттенок", "lex": "color_"}
]`
```

### Reserved keys

The keys `mscatalyst`, `sort`, `limit`, `page`, the search parameter and MODX URL parameters (`q`, `id`) are reserved. If a facet name matches one of them, set `|alias=`. msCatalyst writes configuration errors to the MODX error log with the `[msCatalyst]` prefix, and the snippet outputs nothing in that case.

## URL format

```
/catalog/?vendor=1,3&size=10%2C5%20mm&price=1000..2000&search=шланг&sort=ms-price-desc&limit=24&page=2
```

- Multiple values of one facet are comma-separated. A comma inside a value is encoded as `%2C`.
- The form without JavaScript sends `vendor[]=1&vendor[]=3`. msCatalyst understands both forms.
- A range is written as `price=1000..2000`, `price=1000..` or `price=..2000`. The form without JavaScript sends `price_min` and `price_max`, and that works too.
- Sort values: `pagetitle-asc`, `ms-price-desc`, `tv-rating-desc`.
- AJAX requests go to the same URL with the `mscatalyst=<hash>` parameter. This parameter does not appear in the address bar.

## Filter sets

A set stores facets, sorts and search fields for several catalogs at once. `` &set=`catalog` `` reads the system setting `mscatalyst_set_catalog` or the file `core/components/mscatalyst/sets/catalog.json`. An example is in `sets/catalog.example.json`. Sets are easiest to manage on the "Filter sets" tab of the component page.
