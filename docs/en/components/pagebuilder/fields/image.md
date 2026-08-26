---
title: "image"
description: "Image media object with alt and enrich metadata"
---

# Field image

Layer: **Free**.

<!-- ![image](/components/pagebuilder/screenshots/fields/image.png) -->

## Why this type

- After enrich, the object includes width, height, and extension
- Alt and caption live in the section schema
- One frame without a gallery repeater

## When to use

- Hero background, card thumbnail, author photo
- OG-style preview inside a section
- Partner logo with alt text

## Tips

- Multiple frames: use [gallery](gallery) (Pro)
- In the chunk use `{$photo.url}`, not a bare path string

## Similar types

- [gallery](gallery) for image sets (Pro)
- [file](file) for non-image assets

## Schema

```json
{
  "name": "photo",
  "type": "image",
  "label": "Image",
  "description": "Recommended size 1920×1080",
  "width": 50,
  "tab": "Content",
  "active": true
}
```

## Value

Media object. The Info button edits width, height, and title. Picking from the browser fills size and filename.

## Section data {#output-in-section-data}

Key `photo` in the section data after save enrich:

```json
{
  "photo": {
    "url": "assets/images/hero.jpg",
    "id": 12,
    "path": "assets/images/",
    "filename": "hero.jpg",
    "extension": "jpg",
    "name": "hero",
    "title": "hero.jpg",
    "width": 1920,
    "height": 1080,
    "size": 245760,
    "type": "image"
  }
}
```

- Fields `width`, `height`, and `size` are filled from disk when MODX can access the file.

## Chunk example

```html
<img src="{$photo.url|escape}" width="{$photo.width}" height="{$photo.height}" alt="{$photo.title|escape}">
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

- Also in schema: no `responsive`. Value is a media object, enrich on save.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
