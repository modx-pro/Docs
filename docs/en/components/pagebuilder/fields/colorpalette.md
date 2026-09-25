---
title: "colorpalette"
description: "Single value from preset options with color swatches"
---

# Field colorpalette

Version: **Free**.

<!-- ![colorpalette](/components/pagebuilder/screenshots/fields/colorpalette.jpg) -->

## Why this type

The editor picks a color from a fixed list, not any hex code. Options work like [select](select), but they are shown as color samples. That keeps random colors off the site.

## When to use

- Primary, secondary, and muted theme colors
- A section background from a fixed set
- A short color list for sites that share one theme

## Tips

A free hex code uses [color](color). The saved value is the option key, not a CSS rule.

## Similar types

- [color](color) when any color is allowed
- [select](select) when color samples are not needed

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

::: code-group

```modx
<span style="color: [[+theme]]">…</span>
```

```fenom
<span style="color: {$theme|escape}">…</span>
```

:::

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
