---
title: "gallery"
description: "Array of image media objects with enrich metadata"
---

# Field gallery

Version: **Pro**.

<!-- ![gallery](/components/pagebuilder/screenshots/fields/gallery.jpg) -->

## Why this type

Several photos in one field. Info on a photo edits `width`, `height`, and `title`. A gallery item has no separate `alt` or `caption` fields. The example uses `title` as `alt`. After save, the file gets a URL, width, and height, the same as [image](image).

## When to use

- Several photos in one section, without a separate carousel
- Product screenshots
- Photos for a portfolio grid

## Tips

In the chunk use the photo `url` from the array item.

## Similar types

- [image](image) for one file
- [repeater](repeater) with an image field when you need your own row schema. Available in Free

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

Write the gallery loop in Fenom. In MODX without Fenom use a snippet or one item by index.

::: code-group

```modx
[[$pagebuilder_partial_image?
  &image=`[[+shots.0]]`
  &alt=`[[+shots.0.title]]`
  &class=`pb-gallery__media`
]]
```

```fenom
{foreach $shots as $image}
  {include 'pagebuilder_partial_image' image=$image alt=$image.title class='pb-gallery__media'}
{/foreach}
```

:::

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25, 33, 50, 66, 75, 100 | Field width as % of the row (flex). The CMP offers only these values | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

- Also: `groups: true` enables groups on gallery items.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
