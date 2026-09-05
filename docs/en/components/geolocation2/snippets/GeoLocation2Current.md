---
title: GeoLocation2Current
description: Current city from GeoLocation2 session — chunk or JSON
---

# GeoLocation2Current

Shows the city the component treats as current: from session, SxGeo (before session exists), or default row in `gl_cities`. Uses `buildWebPlaceholders()` from the GeoLocation2 service.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | `tpl.GeoLocation2.current` | HTML chunk |
| `asJson` | `0` | Return JSON of `gl2_*` placeholders instead of chunk |
| `toPlaceholder` | `0` | Write output to placeholder |

## Call

::: code-group

```modx
[[!GeoLocation2Current]]
[[!GeoLocation2Current? &tpl=`tpl.GeoLocation2.current`]]
[[!GeoLocation2Current? &asJson=`1`]]
```

```fenom
{'!GeoLocation2Current' | snippet}
{'!GeoLocation2Current' | snippet : ['asJson' => 1]}
```

:::

## `gl2_*` placeholders

Available in chunk and JSON when `asJson=1`:

| Placeholder | Meaning |
|-------------|---------|
| `gl2_current_id` | City ID in `gl_cities` |
| `gl2_current_name_ru` | Name (RU) |
| `gl2_current_name_en` | Name (EN) |
| `gl2_display_name_ru` | Name in modal question (may use SxGeo) |
| `gl2_real_name_ru` | City from SxGeo |
| `gl2_default_id` / `gl2_default_name_ru` | City with default flag |
| `gl2_confirmed` / `gl2_prompt_done` | `1` after user confirmed |
| `gl2_csrf` | Token for POST to `action.php` |

## Default chunk output

`tpl.GeoLocation2.current`:

```html
<span class="gl2-current-city" data-city-id="1" data-confirmed="0">Moscow</span>
```

`data-confirmed="0"` until modal confirm, `"1"` after.

Custom chunk: button with `data-gl2-open="1"` to open [GeoLocation2Modal](GeoLocation2Modal).

## JSON example (`asJson=1`)

```json
{
  "gl2_current_id": "1",
  "gl2_current_name_ru": "Moscow",
  "gl2_confirmed": "0",
  "gl2_csrf": "a1b2c3…"
}
```

See [GeoLocation2Modal](GeoLocation2Modal), [Web API](../api-action).
