---
title: "map"
description: "Map point with enrich embed_url and watch_url"
---

# Field map

Version: **Pro**.

<!-- ![map](/components/pagebuilder/screenshots/fields/map.jpg) -->

## Why this type

An address and coordinates for a map section. After save, the field stores an embed URL and a link that opens the map. If the field type is `map`, or the name contains "map", the same values are also stored as `map_*` keys.

## When to use

- An office on a contact page
- One delivery or pickup point
- A map next to a form

## Tips

Several points use a [repeater](repeater): latitude and longitude as text fields, or your own row schema. Use the saved embed URL. Do not build the link by hand.

## Similar types

- [text](textarea) for address without coordinates
- [url](url) when you already have a maps link and nobody picks a point

## Schema

```json
{
  "name": "location",
  "type": "map",
  "label": "Map",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ lat, lng, zoom, provider }`; enrich adds `embed_url` on the object and flat `map_embed_url`.

## Section data {#output-in-section-data}

Key `location` in the section data after save enrich (`MapEmbedResolver`):

```json
{
  "location": {
    "lat": 55.751244,
    "lng": 37.618423,
    "zoom": 14,
    "provider": "yandex",
    "embed_url": "https://yandex.ru/map-widget/v1/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map",
    "watch_url": "https://yandex.ru/maps/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map"
  },
  "map_embed_url": "https://yandex.ru/map-widget/v1/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map",
  "map_provider": "yandex",
  "map_watch_url": "https://yandex.ru/maps/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map"
}
```

- Flat `map_embed_url`, `map_provider`, and `map_watch_url` duplicate the embed of the first map field (priority for key `location`).
- Default provider `yandex`; `osm` is OpenStreetMap.

## Chunk example

::: code-group

```modx
<iframe src="[[+location.embed_url]]" title="Map"></iframe>
```

```fenom
<iframe src="{$location.embed_url|default($map_embed_url)|escape}" title="Map"></iframe>
```

:::

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25–100 | Field width as % of the row (flex) | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

- Also: enrich adds `embed_url`, `watch_url`, and flat `map_*` to `section.data`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
