---
title: "datetime"
description: "Date and time in one value"
---

# Field datetime

Version: **Free**.

<!-- ![datetime](/components/pagebuilder/screenshots/fields/datetime.png) -->

## Why this type

One picker instead of date + time pair. ISO-like string for timed events. Fewer sync mistakes across two fields.

## When to use

- Promo start with exact hour
- Scheduled news publish
- Countdown or timer on a landing

## Tips

Day-only needs [date](date). Format for display in the chunk or a snippet.

## Similar types

- [date](date) when time is irrelevant
- [time](time) when date lives elsewhere

## Schema

```json
{
  "name": "starts_at",
  "type": "datetime",
  "label": "Date and time",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

`datetime-local` string.

## Section data {#output-in-section-data}

Key `starts_at` in the section data (`datetime-local` string):

```json
{
  "starts_at": "2026-08-24T14:30"
}
```

## Chunk example

```html
<time datetime="{$starts_at|escape}">{$starts_at|escape}</time>
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
