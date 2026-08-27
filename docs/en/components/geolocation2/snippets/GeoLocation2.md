---
title: GeoLocation2
description: Active cities list from gl_cities
---

# GeoLocation2

Lists **active** cities from `gl_cities`. Each row is one chunk pass. Does not touch session or modal: static catalog for menus or sitemaps.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | `tpl.GeoLocation2.item` | Row chunk |
| `sortby` | `name_ru` | Sort field |
| `sortdir` | `ASC` | `ASC` or `DESC` |
| `limit` | `10` | Max rows; `0` = all active |
| `region_id` | *(empty)* | Filter by `gl_regions.id` |
| `outputSeparator` | newline | Between rows |
| `toPlaceholder` | *(empty)* | Placeholder instead of output |

## Call

::: code-group

```modx
[[!GeoLocation2]]
[[!GeoLocation2? &limit=`0`]]
[[!GeoLocation2? &region_id=`5`]]
```

```fenom
{'!GeoLocation2' | snippet : ['limit' => 0, 'region_id' => 5]}
```

:::

## Output example

Default chunk for two cities:

```html
<p><strong>Moscow</strong> Moscow — region id: 1 55.7558 37.6173</p>
<p><strong>Kazan</strong> Kazan — region id: 2 55.7963 49.1088</p>
```

Row placeholders are `GlCity` fields: `id`, `name_ru`, `name_en`, `region_id`, `lat`, `lon`, etc.

## vs modal

| | GeoLocation2 | GeoLocation2Modal |
|---|--------------|-------------------|
| Source | `gl_cities` only | Session + SxGeo + search API |
| Page cache | List can be cached separately | Modal/Initialize must be uncached |
| City pick | No | Yes |

See [GeoLocation2Modal](GeoLocation2Modal).
