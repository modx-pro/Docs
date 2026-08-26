---
title: "colorpalette"
description: "Single value from preset options with color swatches"
---

# Field colorpalette

Layer: **Free**.

<!-- ![colorpalette](/components/pagebuilder/screenshots/fields/colorpalette.png) -->

## Why this type

Editors pick brand palette, not any hex. Static options like select with swatch UI. Fewer random colors in production.

## When to use

- Theme token primary / secondary / muted
- Section background from design system
- Limited set for white-label sites

## Tips

Arbitrary hex needs [color](color). Stored value is option key, not raw CSS.

## Similar types

- [color](color) for free picker
- [select](select) without visual swatches

## Schema

```json
{
  "name": "theme",
  "type": "colorpalette",
  "label": "Color",
  "swatches": [
    "#111827",
    "#c2410c"
  ],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

HEX string.

## Section data {#output-in-section-data}

Key `theme` in the section data (HEX):

```json
{
  "theme": "#3b82f6"
}
```

## Chunk example

```html
<span style="color: {$theme|escape}">…</span>
```

## Notes

In CMP: `optionsText` (same as select); on save both `options` and `swatches` are written.

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

- Also: `swatches` or `options` with colors.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
