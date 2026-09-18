---
title: "daterange"
description: "Two dates, start and end. Publish fails if the start is after the end. Pro layer."
---

# Field daterange

Version: **Pro** (`advanced-fields`).

Two ends: `start` and `end`, date strings. If both are set and `start` is after `end`, publish fails. One empty end does not fail the check.

## Schema

```json
{
  "name": "period",
  "type": "daterange",
  "label": "Period"
}
```

## Section data {#output-in-section-data}

```json
{
  "period": { "start": "2026-09-01", "end": "2026-09-30" }
}
```

## Chunk example

```html
<time>{$period.start|escape}</time> - <time>{$period.end|escape}</time>
```

## Similar types

- [date](date) for one date
- [datetime](datetime) for a date with time
