---
title: "image"
description: "Image media object with alt and enrich metadata"
---

# Field image

Version: **Free**. Cropping needs capability `image-crop` (**Pro**).

<!-- ![image](/components/pagebuilder/screenshots/fields/image.jpg) -->

## Why this type

- After save, the object includes width, height, and file extension
- Alt text and caption are separate fields in the section schema. The media object's `title` is edited in Info
- One image, not a list like [gallery](gallery)

## When to use

- First-screen background, card thumbnail, author photo
- Preview image inside a section
- Partner logo with alt text

## Tips

In the chunk use `{$photo.url}`, not a file path as a plain string.

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
  "crops": {
    "hero": { "name": "Hero", "size": "1600x900" },
    "card": { "name": "Card", "ratio": "4x3" }
  },
  "width": 50,
  "tab": "Content",
  "active": true
}
```

`crops` is optional. With Pro and `image-crop`, the inspector can crop. Named presets set the size. Without presets the frame is stored under `default`.

## Value

Media object. The Info button edits `width`, `height`, and `title`. Picking from the browser fills `size` and filename.

## Section data {#output-in-section-data}

After save enrich:

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
- Named frames live in `photo.crops.*` and do not overwrite the original `url`.
- A plugin on `pbOnAfterMediaCrop` can append `crops.<key>.variants`. Those are smaller files next to the frame.

## Display URL {#display-url}

The `pb_image_src` modifier, the `pagebuilder_partial_image` chunk, and the inspector pick one URL order: `crops.default`, then the first crop that has a `url`, then the original `url`.

```fenom
{$photo|pb_image_src}
```

In the manager preview a relative path receives `base_url`, so the file is not looked up inside `/manager/`. `pb_image_src` does not add that prefix. Addresses that start with `http`, `https`, `//`, `data:`, or `blob:` stay unchanged.

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

## Plugin after a crop {#crop-plugin}

The `mgr/media/crop` processor fires `pbOnAfterMediaCrop` after it writes the file. The `result` parameter is `\PageBuilder\Media\MediaCropResult` (`url`, `width`, `height`, `path`, `sourcePath`). The core does not watermark or resize further. A plugin can edit the frame and put copy URLs into `variants`.

The frame is not written over the original. It goes into a `pagebuilder-crops` directory next to the source: `assets/images/pagebuilder-crops/hero-<hash>.<extension>`. The file name is the source stem plus a hash of the geometry. `variants` files go in the same directory.

In a template: `{$photo.crops.hero.variants.0.url ?: $photo.crops.hero.url}`.

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

- Also in schema: `crops` (Pro, `image-crop`). No `responsive`. Value is a media object, enrich on save.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
