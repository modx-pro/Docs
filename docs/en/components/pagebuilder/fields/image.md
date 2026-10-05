---
title: "image"
description: "Image media object with alt and enrich metadata"
---

# Field image

Version: **Free**.

<!-- ![image](/components/pagebuilder/screenshots/fields/image.jpg) -->

## Why this type

- After save, the object includes width, height, and file extension
- Alt text and caption are set in the section schema
- One image, not a list like [gallery](gallery)

## When to use

- First-screen background, card thumbnail, author photo
- Preview image inside a section
- Partner logo with alt text

## Tips

- Several photos: use [gallery](gallery) (Pro)
- In the chunk use `{$photo.url}`, not a file path as a plain string

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

::: code-group

```modx
[[$pagebuilder_partial_image?
  &image=`[[+photo]]`
  &alt=`[[+photo.title]]`
  &class=`pb-image__media`
]]
```

```fenom
{include 'pagebuilder_partial_image' image=$photo alt=$photo.title class='pb-image__media'}
```

:::

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
