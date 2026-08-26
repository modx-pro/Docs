---
title: "gallery"
description: "Array of image media objects with enrich metadata"
---

# Field gallery

Version: **Pro**.

<!-- ![gallery](/components/pagebuilder/screenshots/fields/gallery.png) -->

## Why this type

Multiple photos with alt and caption in repeater-like UI. Same enrich as image per frame. Pro advanced-fields.

## When to use

- Slides without dedicated carousel section
- Product screenshot set
- Portfolio grid source data

## Tips

Single frame fits [image](image). In chunk loop array and `{$slide.url}`.

## Similar types

- [image](image) for one file
- [repeater](repeater) + image for custom nested schema (Free)

## Schema

```json
{
  "name": "shots",
  "type": "gallery",
  "label": "Gallery",
  "groups": true,
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of media objects (images, video, PDF, and more).

## Section data {#output-in-section-data}

Key `shots` in the section data: array of media objects after enrich:

```json
{
  "shots": [
    {
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
      "type": "image",
      "description": "Frame caption",
      "preview": "assets/images/hero.jpg",
      "groups": [
        "main",
        "slider"
      ]
    },
    {
      "url": "assets/files/catalog.pdf",
      "id": 34,
      "path": "assets/files/",
      "filename": "catalog.pdf",
      "extension": "pdf",
      "name": "catalog",
      "title": "catalog.pdf",
      "size": 1048576,
      "type": "pdf",
      "groups": "docs"
    }
  ]
}
```

- `groups`: string or array when enabled in the field schema.

## Chunk example

```fenom
{foreach $shots as $image}
  <img src="{$image.url|escape}" width="{$image.width}" height="{$image.height}" alt="{$image.title|escape}">
{/foreach}
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

- Also: `groups: true`: groups on gallery items.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
