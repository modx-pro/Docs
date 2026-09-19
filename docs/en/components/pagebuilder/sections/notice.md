---
title: "Notice"
description: "A short message with tone info, success, warning, or danger. Pro layer."
---

# Notice

Section `notice` shows a short message. Chunk: `pagebuilderpro_notice`. Requires PageBuilder Pro.

`tone`: `info`, `success`, `warning`, `danger`. The tone background sits on the text block (`width: fit-content`), not across the whole section.

## Where it fits

- A warning on a service page
- A promotion status
- A note above a form

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `tone` | select | no | `info`, `success`, `warning`, `danger` |
| `title` | text | no | Title |
| `text` | textarea | yes | Text |

## Render

The root is `<aside role="note">`. The tone class is `pb-notice--info`, `pb-notice--success`, `pb-notice--warning`, or `pb-notice--danger`. An empty `tone` becomes `info`. The same tone is written to `data-pb-tone`. `text` is required. The title prints only when set.

## Section data {#output-in-section-data}

```json
{
  "tone": "warning",
  "title": "Warehouse",
  "text": "Shipping from 20 September"
}
```

## Similar sections

- [Call to action](cta) for a button
- [Rich text](richtext) for a long text

## Related pages

- [Section catalog](index)
