---
title: "Image"
description: "Single full-width content image with alt and caption"
---

# Image

One frame across the content column. Use for an illustration, screenshot, or banner without a button.

<!-- ![Image](/components/pagebuilder/screenshots/sections/image.png) -->

## Why this section

- Single photo with alt and caption, no repeater
- Faster than [Gallery](gallery) for one frame
- Same image partial as other package sections

## When to use

- **Between paragraphs** in a long article
- **UI screenshot** in product copy
- **Office or team photo** without a grid

## Page examples

- Article: [Rich text](richtext) → [Image](image) → [Rich text](richtext)
- Case study: [Hero](hero) → [Image](image) → [Stats](stats)

## Inspector tips

**Image** is required. **Alt text** helps SEO and screen readers. **Caption** renders below the image.

## Similar sections

- [Gallery](gallery) for multiple frames
- [Hero](hero) when the image is a background with overlay text

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `image` |
| Layer | Free |
| Category | media (`media`) |
| Chunk | `pagebuilder_image` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Image (`image`)

Type [image](../fields/image#output-in-section-data). Required.

### Alt text (`alt`)

Type [text](../fields/text#output-in-section-data). Optional.

### Caption (`caption`)

Type [text](../fields/text#output-in-section-data). Optional.

## Site output

`pb-image` with the image partial.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "image": {
    "url": "assets/images/example.jpg",
    "id": 12,
    "filename": "example.jpg",
    "extension": "jpg",
    "title": "example.jpg",
    "width": 1920,
    "height": 1080,
    "type": "image"
  },
  "alt": "Описание изображения для скринридеров",
  "caption": "Подпись под изображением"
}
```

## Chunk template

Fenom chunk `pagebuilder_image`:

```fenom
<section class="pb-section pb-section--image pb-image{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="image"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-image__inner">
    <figure class="pb-image__figure">
      {include 'pagebuilder_partial_image' image=$image alt=($alt ?: $caption) class='pb-image__media'}
      {if $caption}
        <figcaption class="pb-image__caption">{$caption|escape}</figcaption>
      {/if}
    </figure>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/image.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
