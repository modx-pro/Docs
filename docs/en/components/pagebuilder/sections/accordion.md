---
title: "Accordion"
description: "Panels as native details with no JavaScript. Pro layer."
---

# Accordion

Section `accordion` renders panels as `<details>`. There is no extra JavaScript. Chunk: `pagebuilderpro_accordion`. Requires PageBuilder Pro.

`open` marks whether a panel is open by default.

## Where it fits

- A short FAQ without the FAQ section
- Terms and caveats
- Expanding blocks in an article

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Panels |
| `items.title` | text | yes | Panel title |
| `items.body` | textarea | yes | Text |
| `items.open` | toggle | no | Open by default |

## Render

Each row is `<details class="pb-accordion__item">`. The `open` attribute is set when `items.open` is true. The section loads no JavaScript. An empty repeater leaves an empty `div.pb-accordion__list`.

## Section data {#output-in-section-data}

```json
{
  "title": "Terms",
  "items": [
    { "title": "Delivery", "body": "Next day in the city", "open": true }
  ]
}
```

## Similar sections

- [FAQ](faq) for a ready FAQ block
- [Tabs](tabs) when panels switch instead of expanding

## Related pages

- [Section catalog](index)
