---
title: YandexMapsLocator
description: 'YandexMapsLocator snippet: map, location list, search, return modes'
---

# YandexMapsLocator

The only Free snippet. Renders search form, location list, and Yandex map. HTML comes from Fenom chunks, JS keeps list and markers in sync.

Pro does not replace the snippet: same parameters, plus filters and fields from [Pro](../pro/).

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `parents` | *(empty)* | Comma-separated parent IDs |
| `limit` | `0` | Limit (0: no cap) |
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
| `filters` | *(empty)* | Comma-separated or JSON filter names |
| `category` | *(empty)* | Category value |
| `amenity` / `amenities` | *(empty)* | **Pro:** comma-separated amenity tags |
| `brand` | *(empty)* | **Pro:** filter by TV `yandexmaps_brand` |
| `return` | `chunks` | `chunks`, `data`, `json` |
| `latitude`, `longitude` | *(empty)* | Start coordinates for radius/sort |
| `address` | *(empty)* | Address for server geocoding |
| `productId` / `product_id` | *(empty)* | **Pro:** MiniShop3 product ID (enables filter automatically). Reset without Pro |

## `return` modes

| Value | Result |
|-------|--------|
| `chunks` | Locator HTML (default) |
| `data` | Placeholders `yandexmapslocator.stores` (array) and `yandexmapslocator.count` |
| `json` | JSON `{ success, results }` without chunk wrapper |

`return=json` on the same site is not Pro REST. No CORS, `fields`, or Bearer.

## Filters

| Filter | Package | How to enable |
|--------|---------|---------------|
| `category` | Free | `filters=category` + parameter `category` |
| `working_now` | Pro | `filters=working_now` or `working_now=1` |
| `minishop_product` | Pro | `productId` (explicit `filters=minishop_product` optional) |
| `amenity` | Pro | `amenity` / `amenities` |
| `brand` | Pro | `brand` |

## Location chunk placeholders (`tpl`)

| Variable | Description |
|----------|-------------|
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

Route icon in default chunk: `{$_modx->config['assets_url']}components/yandexmapslocator/img/yandex-navigator.svg`.

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

### Search from server-side address

Geocodes `address` and sorts by distance (requires `yandexmapslocator_api_key`).

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 123,
    'address' => 'Омск, ул. Ленина, 25',
    'radius' => 20,
    'sortby' => 'distance',
    'limit' => 15
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`123`
    &address=`Омск, ул. Ленина, 25`
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

### Multiple containers

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
    'category' => 'аптека',
    'filters' => 'category'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`аптека`
    &filters=`category`
]]
```

:::

### `return=data` mode

Location list in placeholders (custom template next to the snippet).

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

In a MODX chunk iterate the placeholder via Fenom or a custom snippet: array is in `yandexmapslocator.stores`.

### `return=json` mode

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

Sample response:

```json
{
  "success": true,
  "results": [
    {
      "id": 15,
      "pagetitle": "Магазин на Ленина",
      "address": "ул. Ленина, 25",
      "latitude": 54.98,
      "longitude": 73.36
    }
  ]
}
```

For CORS and headless use [Pro REST](../pro/api), not this mode.

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

### Extra TVs in the card

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

In chunk: `{$metro_station}`, `{$parking}`.

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

Set TZ on the location (`yandexmaps_timezone`) or network `yandexmapslocator_timezone`. Otherwise "now" uses `Europe/Moscow`.

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

### Category + open (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => 42,
    'category' => 'аптека',
    'filters' => 'category,working_now'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`42`
    &category=`аптека`
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
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
]]
```

:::

### Pickup + open only (Pro)

::: code-group

```fenom
{'!YandexMapsLocator' | snippet : [
    'parents' => $storesParent,
    'productId' => $_modx->resource.id,
    'filters' => 'working_now',
    'sortby' => 'distance'
]}
```

```modx
[[!YandexMapsLocator?
    &parents=`[[++yml_stores_parent]]`
    &productId=`[[*id]]`
    &filters=`working_now`
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
