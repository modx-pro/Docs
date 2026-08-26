---
title: "time"
description: "Time of day without a calendar date"
---

# Field time

Layer: **Free**.

<!-- ![time](/components/pagebuilder/screenshots/fields/time.png) -->

## Why this type

Time picker, not a free string. Pairs with date in separate fields. Good for schedules and opening hours.

## When to use

- Webinar start time with date elsewhere
- "Open until 6pm" in contact
- Delivery slot without full datetime

## Tips

Single date+time value use [datetime](datetime). Site timezone is a MODX concern, not the field.

## Similar types

- [datetime](datetime) for full timestamp
- [date](date) for calendar day only

## Schema

```json
{
  "name": "starts_at",
  "type": "time",
  "label": "Time",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

`HH:MM` string.

## Section data {#output-in-section-data}

Key `starts_at` in the section data (`HH:MM`):

```json
{
  "starts_at": "14:30"
}
```

## Chunk example

```html
<span class="time">{$starts_at|escape}</span>
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
