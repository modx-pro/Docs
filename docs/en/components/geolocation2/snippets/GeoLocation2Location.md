---
title: GeoLocation2Location
description: Visitor geolocation by IP via SxGeo
---

# GeoLocation2Location

Takes visitor IP (or `ip` param), reads local SxGeo database, renders chunk with flat `city_*`, `region_*`, `country_*` placeholders. Does not change `gl_cities` or session.

Useful to debug SxGeo or show “detected region” without [GeoLocation2Modal](GeoLocation2Modal).

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | `tpl.GeoLocation2.location` | Output chunk |
| `ip` | visitor IP | Explicit IP for tests |
| `toPlaceholder` | *(empty)* | Placeholder instead of echo |

## Call

::: code-group

```modx
[[!GeoLocation2Location]]
[[!GeoLocation2Location? &ip=`8.8.8.8`]]
```

```fenom
{'!GeoLocation2Location' | snippet : ['ip' => '8.8.8.8']}
```

:::

## Placeholders

1. `getCityFullByIp()` → nested SxGeo array.
2. Flattened to `city_name_ru`, `region_name_ru`, …
3. `processData()` adds `city_name_ru_html`, `country_iso_html`, etc.

Keys depend on `SxGeoCity.dat` edition. Enable `geolocation2_debug` if chunk is empty.

## Output example

```html
<div class="geolocation2-location">
    <span>Moscow</span>
    …
</div>
```

## Empty output

Returns empty string when `.dat` is missing, IP not found (`127.0.0.1` on localhost), or service not registered.

See [Integration → SxGeo](../integration), [FAQ](../faq).
