---
title: "date"
description: "ISO date without time of day"
---

# Field date

Version: **Free**.

<!-- ![date](/components/pagebuilder/screenshots/fields/date.jpg) -->

## Why this type

A calendar, not typed text. It is not a time and not a date with a time: those are [time](time) and [datetime](datetime). The format stays stable, so you can sort the date in Fenom.

## When to use

- Event date, promo deadline, publish day
- "Valid until" on a promo section
- Calendar-based content filter

## Tips

Hours need [time](time) or [datetime](datetime). Do not mix timezone logic in the chunk without a clear contract.

## Similar types

- [datetime](datetime) for date and time
- [time](time) for time only

## Schema

```json
{
  "name": "starts_at",
  "type": "date",
  "label": "Date",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

`YYYY-MM-DD` string.

## Section data {#output-in-section-data}

Key `starts_at` in the section data (`YYYY-MM-DD`):

```json
{
  "starts_at": "2026-08-24"
}
```

## Chunk example

::: code-group

```modx
<time datetime="[[+starts_at]]">[[+starts_at]]</time>
```

```fenom
<time datetime="{$starts_at|escape}">{$starts_at|escape}</time>
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

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
