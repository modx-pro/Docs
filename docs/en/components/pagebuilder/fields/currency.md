---
title: "currency"
description: "Amount number with currency symbol from currency setting"
---

# Field currency

Layer: **Pro**.

<!-- ![currency](/components/pagebuilder/screenshots/fields/currency.png) -->

## Why this type

Inspector formatter, not plain number. Pro responsive like number and text. Separates money from counters and percents.

## When to use

- Price in custom section without MS3
- Old and new price in promo
- Donation amount field

## Tips

Currency key in schema sets ISO or symbol config. Discount percent is [number](number), not currency.

## Similar types

- [number](number) for non-money numeric
- [imask](imask) for formatted string without decimal type

## Schema

```json
{
  "name": "price",
  "type": "currency",
  "label": "Price",
  "currency": "RUB",
  "min": 0,
  "max": 999999,
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Number or `null`.

## Section data {#output-in-section-data}

Key `price` in the section data (number or `null`):

```json
{
  "price": 1990.5
}
```

## Chunk example

```fenom
{if $price !== null}<span class="price">{$price} ₽</span>{/if}
```

## Notes

Currency: `currency`. Limits same as `number`. Pro: `responsive`.

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
- [Pro in manager](../integration)
