---
title: "number"
description: "Number for counters, limits, and order"
---

# Field number

Version: **Free**.

<!-- ![number](/components/pagebuilder/screenshots/fields/number.png) -->

## Why this type

Number input in the inspector, not a digit string. Pro: `responsive` across breakpoints. Easy to sort and compute in the chunk.

## When to use

- Item limit, discount percent, year
- Stat value next to a label field
- Order or weight when a select list is overkill

## Tips

Money and currency format belong in [currency](currency) (Pro). Phone or SKU with mask use [imask](imask) (Pro).

## Similar types

- [currency](currency) for amounts with currency symbol
- [select](select) for a fixed set of numbers

## Schema

```json
{
  "name": "count",
  "type": "number",
  "label": "Count",
  "min": 0,
  "max": 100,
  "allowDecimals": false,
  "default": 0,
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Number or `null`.

## Section data {#output-in-section-data}

Key `count` in the section data (number or `null`):

```json
{
  "count": 12
}
```

## Chunk example

```fenom
{if $count !== null}<span class="count">{$count}</span>{/if}
```

## Notes

Limits: `min`, `max`, `minValue`, `maxValue`, `allowDecimals`. Pro: `responsive`.

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

**Pro** (capability `responsive`): with `responsive: true`, the section data uses `desktop`, `tablet`, `mobile` keys instead of a scalar.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
