---
title: "Case study"
description: "One client story with result, text, and a button. Pro layer."
---

# Case study

Section `case_study` describes one project. Chunk: `pagebuilderpro_case_study`. Requires PageBuilder Pro.

## Where it fits

- One client example on a landing page
- A one-line result and the story below
- A link to the full project page

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | yes | Title |
| `client` | text | no | Client |
| `result` | text | no | Result |
| `text` | textarea | no | Story |
| `image` | image | no | Image |
| `button_label` | text | no | Button label |
| `button_url` | url | no | Button URL |

## Render

The image is on the side only when `image` is set, through `pagebuilder_partial_image`. `client` and `result` print apart from the body text. The button appears when both `button_label` and `button_url` are set. The URL runs through `pb_href`. `title` is required.

## Section data {#output-in-section-data}

```json
{
  "title": "Store chain",
  "client": "North",
  "result": "+18% orders",
  "text": "Built the storefront from sections",
  "image": { "url": "assets/images/case.jpg" },
  "button_label": "Read",
  "button_url": "/cases/north"
}
```

## Similar sections

- [Portfolio](portfolio) for several projects
- [Testimonials](testimonials) for short quotes

## Related pages

- [Section catalog](index)
