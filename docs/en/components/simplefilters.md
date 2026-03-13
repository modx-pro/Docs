---
title: simpleFilters
description: Simple resource filtering for MODX 3.
logo: https://modstore.pro/assets/extras/simplefilters/logo-md.png
author: Romanov Pavel
modstore: https://modstore.pro/packages/ecommerce/simplefilters
---

# simpleFilters

The package is installed in the standard way from the [repository](https://modstore.pro/packages/ecommerce/simplefilters) via the MODX 3 installer.

## System settings

| Parameter | Description | Default |
|:----------|:------------|:--------|
| sf_css_path | Path to JS file relative to site root | `{assets_url}components/simplefilters/js/web/default.min.js` |
| sf_css_path | Path to CSS file relative to site root | `{assets_url}components/simplefilters/css/web/default.min.css` |

## simpleFilters snippet

Outputs a resource list, filters, and loads all required scripts and styles.

#### Parameters

| Parameter | Description | Default |
|:----------|:------------|:--------|
| **&parents** | Parents for selection. Comma-separated IDs. | Current resource |
| **&resources** | Resources for selection. Comma-separated IDs. | |
| **&showUnpublished** | Include unpublished resources | 0 |
| **&templates** | Resource template IDs, comma-separated | |
| **&where** | Initial selection in JSON format | |
| **&sortby** | Sort field | menuindex |
| **&sortdir** | Sort direction | ASC |
| **&limit** | Items per page | 10 |
| **&includeTVs** | TV names to include in output, comma-separated | |
| **&tvPrefix** | Prefix for TV fields in resource chunk | tv_ |
| **&msPrefix** | Prefix for MiniShop3 product fields | ms_ |
| **&msoPrefix** | Prefix for MiniShop3 product options | mso_ |
| **&hideOne** | Hide filters with a single value | 1 |
| **&checkEmpty** | Compute result for each filter value (heavier query) | 0 |
| **&filters** | Filter list as *field1:type1,field2:type2,field3:type3* | |
| **&fseparator** | Filter value separator in URL | _ |
| **&mode** | **and** — all conditions must match, **or** — at least one | or |
| **Templating** | | |
| **&tpl** | Resource output chunk | |
| **&tplWrapper** | Wrapper chunk for full output | sf_wrapper |
| **&tplFilter** | Chunk for checkbox/radio filter block | sf_filter |
| **&tplFilterRow** | Chunk for checkbox filter row | sf_filter_row |
| **&tplFilterRadioRow** | Chunk for radio filter row | sf_filter_radio_row |
| **&tplFilterSelect** | Chunk for select filter block | sf_filter_select |
| **&tplFilterSelectRow** | Chunk for select option row | sf_filter_option_row |
| **&tplFilterSlider** | Chunk for slider filter block | sf_filter_slider |
| **&tplSelected** | Chunk for selected filter block | sf_selected_filter |
| **&tplSelectedRow** | Chunk for selected filter row | sf_selected_row |
| **Pagination** | | |
| **&tplPaginationWrapper** | Pagination wrapper chunk | sf_pagination |
| **&tplPagination** | Page link chunk | sf_page |
| **&tplPaginationFirst** | First page link chunk | sf_page_first |
| **&tplPaginationLast** | Last page link chunk | sf_page_last |
| **&tplMoreButton** | "Load more" button chunk | sf_morebutton |

## Configuring filters

In **&filters** use these prefixes:

- Resource field — **no prefix**
- TV — **tv_**
- MIGX field — **migx_**
- MiniShop3 product field — **ms_**
- MiniShop3 product option — **mso_**

Types:

- Checkbox — **checkbox** or leave empty
- Dropdown — **select**
- Slider — **slider**
- Radio — **radio**

Example filter list:

```
&filters=`
    parent:select,
    ms_vendor_id:select,
    ms_price:slider,
    tv_instock:slider,
    migx_chars_Height:slider:title|value,
    ms_color,
    ms_tags:select
`
```

MIGX fields use the format:

```
migx_[tv name]_[parameter name]:[filter type]:[label field]|[value field]
```

For a MIGX TV **chars** with config:

```json
[{"fields":
  [
    {"field":"title", "caption":"Parameter"},
    {"field":"value", "caption":"Value"}
  ]
}]
```

To create a slider filter for "Height":

```
migx_chars_Height:slider:title|value
```

Checkbox filter for "Purpose":

```
migx_chars_Purpose:title|value
```

---

## &where parameter

Supports one parameter/value. Works only with resource and MiniShop3 product tables (field names as in the database, no prefixes).

| Description | Example |
|-------------|---------|
| New items only | `'where' => '{"new":"1"}'` |
| Products with price > 2000 | `'where' => '{"price:>":"2000"}'` |
| Resources with "sale" in longtitle | `'where' => '{"longtitle:like":"sale"}'` |

## Templating

Default chunks use Fenom (requires [pdoTools](https://modstore.pro/packages/utilities/pdotools)); standard syntax is also supported.

You can use custom chunks per filter via **&tplFilter_parameter** and **&tplFilterRow_parameter**.

Example for a custom filter by **ms_tags**:

```
&tplFilter_ms_tags=`your_block_chunk`
&tplFilterRow_ms_tags=`your_row_chunk`
```

Filter block labels are set via lexicon keys **sf_filter_filter_name** (or in the plugin).

## JavaScript

To submit the form use `sf.submit`:

```js
sf.submit();
```

After data refresh the `sfilters` event fires:

```js
document.addEventListener('sfilters', (e) => {
    // console.log(e);
});
```

## System events

All events receive an array `$data`.

| Event | Description |
|-------|-------------|
| sfOnGetIds | Fired after initial collection of displayed resource IDs. You can add a resource by ID or replace the whole set. |
| sfOnGetFilterValues | Fired after filter values are built. Receives array of values (e.g. to sort), filter name and type. |
| sfOnBeforeCreateFilterRow | Fired when a filter row is created. You can change labels, values, etc. |
| sfOnBeforeCreateFilter | Fired when a filter block is created. You can change block title, slider range, etc. |
| sfOnCheckResource | Fired when checking a resource against a selected filter value. Receives resource id, filter name, value. To include the resource, set `$data['result'] = true;` |

The **simpleFilters** plugin is included with examples.
