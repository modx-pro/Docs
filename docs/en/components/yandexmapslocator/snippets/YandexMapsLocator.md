---
title: YandexMapsLocator
description: 'YandexMapsLocator snippet: map, location list, search, return modes'
---

# YandexMapsLocator

The only Free snippet. Renders the search form, location list, and Yandex map. Fenom chunks build the HTML. JS keeps the list and markers in sync.

Pro does not replace the snippet: same parameters, plus filters and fields from [Pro](../pro/).

## Parameters

| Parameter | Default | Description |
|----------|--------------|----------|
| `parents` | *(empty)* | Comma-separated parent IDs |
| `limit` | `0` | Limit (0 = no limit) |
| `offset` | `0` | Offset |
| `radius` | `0` | Radius, km (0 → `yandexmapslocator_default_radius`) |
| `sortby` | `pagetitle` | `pagetitle`, `distance`, `menuindex`, `id`, … |
| `sortdir` | `ASC` | `ASC` or `DESC` |
| `tpl` | `yandexmapslocator.store` | Single location chunk |
| `tplOuter` | `yandexmapslocator.outer` | Wrapper |
| `tplSearch` | `yandexmapslocator.search` | Search form |
| `tplEmpty` | `yandexmapslocator.empty` | Empty result |
| `tplError` | `yandexmapslocator.error` | Error |
| `includeTVs` | *(empty)* | Extra TVs in location placeholders |
| `context` | *(current)* | Context key or comma-separated list |
| `where` | *(empty)* | JSON condition for resources (**snippet only**). Forbidden in `search.php` and REST |
| `filters` | *(empty)* | Comma-separated filter names or JSON |
| `category` | *(empty)* | Category value |
| `return` | `chunks` | `chunks`, `data`, `json` |
| `latitude`, `longitude` | *(empty)* | Starting coordinates for radius/sort |
| `address` | *(empty)* | Address for server geocoding |
| `productId` / `product_id` | *(empty)* | **Pro:** MiniShop3 product ID. Cleared without Pro |

## `return` modes

| Value | Result |
|----------|-----------|
| `chunks` | Locator HTML (default) |
| `data` | Placeholders `yandexmapslocator.stores` (array) and `yandexmapslocator.count` |
| `json` | JSON `{ success, results }` without chunk wrapper |

`return=json` on the same site is not Pro REST. No CORS, `fields`, or Bearer.

## Filters

| Filter | Package | How to enable |
|--------|-------|--------------|
| `category` | Free | `filters=category` + `category` parameter |
| `working_now` | Pro | `filters=working_now` |
| `minishop_product` | Pro | `filters=minishop_product` + `productId` |

## Location chunk placeholders (`tpl`)

| Variable | Description |
|------------|----------|
| `{$id}` | Resource ID |
| `{$pagetitle}`, `{$longtitle}`, `{$description}` | Resource fields |
| `{$url}` | Resource link |
| `{$address}` | Address |
| `{$latitude}`, `{$longitude}` | Coordinates |
| `{$phone}`, `{$email}`, `{$working_hours}` | Contacts |
| `{$working_hours_formatted}`, `{$working_hours_compact}` | Schedule (plain text) |
| `{$working_hours_compact_html}` | Compact HTML (`\| raw` in Fenom) |
| `{$is_open_now}` | **Pro:** open now |
| `{$category}` | Category |
| `{$balloon_image}`, `{$marker_icon}` | Media |
| `{$distance_formatted}` | Distance (when search center is set) |
| `{$idx}` | Index |

Route icon in the default chunk: `{$_modx->config['assets_url']}components/yandexmapslocator/img/yandex-navigator.svg`.

Lexicon: `{'yandexmapslocator_route' | lexicon}`.

## Examples

### Basic output

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'radius' => 50,
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &radius=`50`
    &sortby=`distance`
]]
```

:::

### Server-side address search

Geocodes `address` and sorts locations by distance (`yandexmapslocator_api_key` required).

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'address' => 'Omsk, Lenina st., 25',
    'radius' => 20,
    'sortby' => 'distance',
    'limit' => 15
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &address=`Omsk, Lenina st., 25`
    &radius=`20`
    &sortby=`distance`
    &limit=`15`
]]
```

:::

### Nearest from coordinates

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'latitude' => 55.03,
    'longitude' => 82.92,
    'radius' => 30,
    'sortby' => 'distance',
    'limit' => 20
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &latitude=`55.03`
    &longitude=`82.92`
    &radius=`30`
    &sortby=`distance`
    &limit=`20`
]]
```

:::

### Multiple parents

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => '120,121,122',
    'sortby' => 'pagetitle'
]}
```

```modx
[[!YandexMapsLocator? &parents=`120,121,122` &sortby=`pagetitle`]]
```

:::

### Category

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'category' => 'pharmacy',
    'filters' => 'category'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`pharmacy`
    &filters=`category`
]]
```

:::

### `return=data`

Locations in placeholders (custom markup next to the snippet).

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'return' => 'data',
    'limit' => 10
]}
{foreach $yandexmapslocator.stores as $store}
    <li><a href="{$store.url}">{$store.pagetitle}</a> {$store.address}</li>
{/foreach}
<p>Total: {$yandexmapslocator.count}</p>
```

```modx
[[!YandexMapsLocator? &parents=`42` &return=`data` &limit=`10`]]
```

:::

In a MODX chunk, walk the placeholder via Fenom or a custom snippet: the array is in `yandexmapslocator.stores`.

### `return=json`

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'return' => 'json'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &return=`json`]]
```

:::

Sample payload:

```json
{
  "success": true,
  "results": [
    {
      "id": 15,
      "pagetitle": "Store on Lenina",
      "address": "Lenina st., 25",
      "latitude": 54.98,
      "longitude": 73.36
    }
  ]
}
```

For CORS and headless use [REST Pro](../pro/api), not this mode.

### `where` (snippet only)

xPDO JSON condition. Forbidden in `search.php` and REST.

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'where' => '{"template":5}'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &where=`{"template":5}`
]]
```

:::

### Extra TVs on the card

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'includeTVs' => 'metro_station,parking'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &includeTVs=`metro_station,parking`
]]
```

:::

In the chunk: `{$metro_station}`, `{$parking}`.

### Context

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 2080,
    'context' => 'en'
]}
```

```modx
[[!YandexMapsLocator? &parents=`2080` &context=`en`]]
```

:::

### Open now only (Pro)

Set `yandexmapslocator_timezone` for your network. Otherwise "now" uses `Europe/Moscow` (or PHP TZ if the setting is empty).

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'filters' => 'working_now'
]}
```

```modx
[[!YandexMapsLocator? &parents=`42` &filters=`working_now`]]
```

:::

### Category + open now (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'category' => 'pharmacy',
    'filters' => 'category,working_now'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`pharmacy`
    &filters=`category,working_now`
]]
```

:::

### MiniShop3 product page (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'minishop_product'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`minishop_product`
]]
```

:::

### Pickup + open now (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'minishop_product,working_now',
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`minishop_product,working_now`
    &sortby=`distance`
]]
```

:::

### Custom chunk with Pro badge

In `tpl` (fragment):

```fenom
{if isset($is_open_now)}
    <span class="yml-store__status {if $is_open_now}is-open{else}is-closed{/if}">
        {if $is_open_now}
            {'yandexmapslocator_open_now' | lexicon}
        {else}
            {'yandexmapslocator_closed_now' | lexicon}
        {/if}
    </span>
{/if}
{if $working_hours_compact_html?}
    <p class="yml-store__hours">{$working_hours_compact_html | raw}</p>
{/if}
```

See [Open now](../pro/working-now), [MiniShop3](../pro/minishop3), [Frontend](../frontend).
