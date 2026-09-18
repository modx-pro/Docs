---
title: "Before / After"
description: "Two images with before and after labels. Pro layer."
---

# Before / After

Section `before_after` places two frames side by side. Chunk: `pagebuilderpro_before_after`. Requires PageBuilder Pro. Category: media.

## Where it fits

- Renovation, retouch, or clinical result
- Two states of the same object

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Title |
| `before_label` | text | no | Before label |
| `before_image` | image | yes | Before frame |
| `after_label` | text | no | After label |
| `after_image` | image | yes | After frame |
| `caption` | textarea | no | Shared caption |

## Render

Two columns, `figure.pb-before-after__panel`. There is no slider and no JavaScript. Images go through `pagebuilder_partial_image`. When a label is empty, alt is `Before` or `After`. `caption` prints under the grid only when set.

## Section data {#output-in-section-data}

```json
{
  "title": "Renovation",
  "before_label": "Before",
  "before_image": { "url": "assets/images/before.jpg" },
  "after_label": "After",
  "after_image": { "url": "assets/images/after.jpg" },
  "caption": "Three weeks"
}
```

## Similar sections

- [Gallery](gallery) for several frames without a pair
- [Media + text](media_split) for one image and text

## Related pages

- [Section catalog](index)
