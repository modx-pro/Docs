---
title: "Timeline"
description: "Events with date, title, and text. Pro layer."
---

# Timeline

Section `timeline` lists events in repeater order. Chunk: `pagebuilderpro_timeline`. Requires PageBuilder Pro.

## Where it fits

- Company or product history
- Project stages
- Release dates

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Events |
| `items.date` | text | yes | Date |
| `items.title` | text | yes | Event title |
| `items.text` | textarea | no | Text |

## Render

The chunk builds `<ol class="pb-timeline__list">`. An empty `items` list stays empty. There is no fallback sentence. Date and title are required. Row text is printed only when it is set.

## Section data {#output-in-section-data}

```json
{
  "title": "History",
  "items": [
    { "date": "2019", "title": "Start", "text": "First office" }
  ]
}
```

## Similar sections

- [How it works](how_it_works) for steps without dates
- [Case study](case_study) for one story

## Related pages

- [Section catalog](index)
