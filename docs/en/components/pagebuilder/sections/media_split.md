---
title: "Media + text"
description: "Image on the left or right, plus text and a button. Pro layer."
---

# Media + text

Section `media_split` puts an image and text in two columns. Chunk: `pagebuilderpro_media_split`. Requires PageBuilder Pro.

`media_side`: `left` or `right`.

## Where it fits

- An about block with a photo
- A product with short text and a button
- Alternating columns on a landing page

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Title |
| `text` | textarea | no | Text |
| `image` | image | yes | Image |
| `media_side` | select | no | `left` or `right` |
| `button_label` | text | no | Button label |
| `button_url` | url | no | Button URL |

## Render

The side class is `pb-media-split--left` or `pb-media-split--right`. An empty `media_side` becomes `left`. The image is required and goes through `pagebuilder_partial_image`. The button is drawn only when both `button_label` and `button_url` are set. The URL runs through the `pb_href` modifier.

## Section data {#output-in-section-data}

```json
{
  "title": "About",
  "text": "A short paragraph",
  "image": { "url": "assets/images/team.jpg" },
  "media_side": "right",
  "button_label": "Details",
  "button_url": "/about"
}
```

## Similar sections

- [Image](image) for one frame without a text column
- [Before / After](before_after) for a pair of frames

## Related pages

- [Section catalog](index)
