---
title: "tv"
description: "Object id name caption of selected MODX TV"
---

# Field tv

Layer: **Pro**.

<!-- ![tv](/components/pagebuilder/screenshots/fields/tv.png) -->

## Why this type

Picker for template variable hybrid chunk. Front output `[[*{$tv.name}]]`. Pro bridge between PB section and resource TV.

## When to use

- Section reads resource TV chosen by editor
- Shared hero image TV across templates
- Dev tooling which TV to expose

## Tips

TV value is not duplicated in the section data. Inline upload in section is [image](image) or [file](file).

## Similar types

- [chunk](chunk) pick chunk by name
- [relation](relation) pick resource not TV

## Schema

```json
{
  "name": "tv",
  "type": "tv",
  "label": "TV",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ id, name, caption }`.

## Section data {#output-in-section-data}

Key `tv` in the section data:

```json
{
  "tv": {
    "id": 7,
    "name": "hero_image",
    "caption": "Hero image"
  }
}
```

## Chunk example

```html
[[*{$tv.name}]]
```

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

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
