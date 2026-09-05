---
title: "color"
description: "Hex or rgba color string from a color picker"
---

# Field color

Version: **Free**.

<!-- ![color](/components/pagebuilder/screenshots/fields/color.png) -->

## Why this type

Picker instead of typing into text. Fits section background and accents. String value for inline CSS or variables in chunk.

## When to use

- Hero background, overlay, button color
- Accent border or badge
- When palette is not fixed upfront

## Tips

Fixed brand swatches fit [colorpalette](colorpalette). Check text contrast on chosen background in chunk.

## Similar types

- [colorpalette](colorpalette) for JSON option swatches
- [select](select) when colors are named themes

## Schema

```json
{
  "name": "accent",
  "type": "color",
  "label": "Accent",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

HEX string.

## Section data {#output-in-section-data}

Key `accent` in the section data (HEX):

```json
{
  "accent": "#3b82f6"
}
```

## Chunk example

```html
<span style="color: {$accent|escape}">…</span>
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
