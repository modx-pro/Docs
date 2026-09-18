---
title: "Portfolio"
description: "Project cards with image, link, and text. Pro layer."
---

# Portfolio

Section `portfolio` shows projects from a repeater. Chunk: `pagebuilderpro_portfolio`. Requires PageBuilder Pro.

## Where it fits

- Studio work
- Cases without a page per project
- A set of covers with links

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Projects |
| `items.image` | image | no | Cover |
| `items.title` | text | yes | Name |
| `items.url` | url | no | Link |
| `items.text` | textarea | no | Short text |

## Render

Cards sit in `div.pb-grid.pb-grid--cards`. The image goes through chunk `pagebuilder_partial_image` only when `image` is set. A link is drawn when `url` is set. The link text is `title`. An empty repeater leaves an empty grid.

## Section data {#output-in-section-data}

```json
{
  "title": "Work",
  "items": [
    {
      "image": { "url": "assets/images/case.jpg" },
      "title": "Storefront",
      "url": "/cases/store",
      "text": "A miniShop3 catalog"
    }
  ]
}
```

## Similar sections

- [Gallery](gallery) when you only need frames
- [Case study](case_study) for one story with a result

## Related pages

- [Section catalog](index)
