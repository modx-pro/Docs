---
title: "Quote"
description: "A quote with author, role, and avatar. Pro layer."
---

# Quote

Section `quote` shows one quote. Chunk: `pagebuilderpro_quote`. Requires PageBuilder Pro.

## Where it fits

- A highlighted client line
- An article epigraph
- One recommendation without team cards

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `text` | textarea | yes | Quote text |
| `author` | text | no | Author |
| `role` | text | no | Role |
| `avatar` | image | no | Avatar |

## Render

The root is a `<figure>`. The quote sits in a `<blockquote>`. The `figcaption` appears when `author`, `role`, or `avatar` is set. The avatar goes through `pagebuilder_partial_image`. Empty `text` fails publish: the field is required.

## Section data {#output-in-section-data}

```json
{
  "text": "We built the page in a day",
  "author": "Anna",
  "role": "Editor",
  "avatar": { "url": "assets/images/anna.jpg" }
}
```

## Similar sections

- [Testimonials](testimonials) for several reviews
- [Team](team) for staff cards

## Related pages

- [Section catalog](index)
