---
title: GeoLocation2Data
description: Contacts and address from gl_data
---

# GeoLocation2Data

Outputs `gl_data` rows: email, phone, address, image, alt name, `properties` JSON. Data from **Data** tab in GeoLocation2 manager.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | `tpl.GeoLocation2.data.item` | Row chunk |
| `sortby` | `id` | Sort field |
| `sortdir` | `DESC` | `ASC` / `DESC` |
| `limit` | `0` | Limit; `0` = none |
| `class` | *(empty)* | `GlCountry`, `GlRegion`, `GlCity` |
| `identifier` | *(empty)* | Object ID in class table |
| `onlyDefault` | `0` | Only `default=1` |
| `forCurrent` | `0` | Rows for current city from session |
| `liveUpdate` | same as `forCurrent` | Wrap in `[data-gl2-data-live]`, refresh via API |
| `outputSeparator` | newline | Between rows |
| `toPlaceholder` | *(empty)* | Placeholder instead of output |

## Current city

::: code-group

```modx
[[!GeoLocation2Data? &forCurrent=`1` &tpl=`tpl.GeoLocation2.data.current`]]
```

```fenom
{'!GeoLocation2Data' | snippet : ['forCurrent' => 1, 'tpl' => 'tpl.GeoLocation2.data.current']}
```

:::

Uses same session as [GeoLocation2Modal](GeoLocation2Modal).

## Output example

**Card** `tpl.GeoLocation2.data.current`:

```html
<div class="gl2-data-current" data-gl2-data-id="3">
  <dl>
    <dt>Email / phone</dt>
    <dd>info@example.com · +7 …</dd>
    …
  </dl>
</div>
```

**Table row** `tpl.GeoLocation2.data.item`:

```html
<tr class="gl2-data-row" data-gl2-data-id="3" data-gl2-data-class="GlCity" data-gl2-data-identifier="1">
  <td>3</td>
  <td>GlCity</td>
  …
</tr>
```

Extra placeholders: `default_label`, `default_pill_class`, `image_display`, `properties_json`.

## Live update

With `forCurrent=1`, default `liveUpdate=1` wraps output in `[data-gl2-data-live]`. After city change, `modal.js` calls `GET action=data` and replaces HTML.

Disable: `&liveUpdate=`0``.

See [Web API → action=data](../api-action), [GeoLocation2Modal](GeoLocation2Modal).
