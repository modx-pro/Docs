---
title: "Gallery"
description: "Image grid with alt text and optional caption per slide"
---

# Gallery

Several photos or screenshots in one section. Each image has its own alt text and optional caption.

<!-- ![Gallery](/components/pagebuilder/screenshots/sections/gallery.png) -->

## What the gallery adds

- Several images in one section, each with alt and caption
- Inspector repeater: new row equals new slide on the site
- Grid markup lives in the chunk, not hand-built columns

## Where it fits

- Portfolio of work or projects
- Product photos: multiple angles without a carousel
- Case study or report with illustrations

## Page examples

- Portfolio: [Hero](hero) → [Gallery](gallery) → [CTA](cta)
- Product (no MS3): [Rich text](richtext) → [Gallery](gallery) → [FAQ](faq)

## Slides and alt

Add rows in the **Slides** repeater with an **Image** each. Fill alt text for accessibility and SEO.

## Similar sections

- [Gallery carousel](gallery_carousel) for one slide at a time (Pro)
- [Image](image) for a single full-width frame

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `gallery` |
| Layer | Free |
| Category | media (`media`) |
| Chunk | `pagebuilder_gallery` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Slides (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `image` | [image](../fields/image#output-in-section-data) | Image | yes |
| `alt` | [text](../fields/text#output-in-section-data) | Alt text | no |
| `caption` | [text](../fields/text#output-in-section-data) | Caption | no |

## Site output

`pb-gallery` grid. Each slide uses `pagebuilder_partial_image`.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
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
      "alt": "Image description for screen readers",
      "caption": "Caption under the image"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilder_gallery`:

```fenom
<section class="pb-section pb-section--gallery pb-gallery{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="gallery"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-gallery__inner">
    {if $title}
      <h2 class="pb-heading pb-gallery__title">{$title|escape}</h2>
    {/if}
    <div class="pb-gallery__grid">
      {foreach $items as $item}
        <figure class="pb-gallery__item">
          {include 'pagebuilder_partial_image' image=$item.image alt=($item.alt ?: $item.caption) class='pb-gallery__media'}
          {if $item.caption}
            <figcaption class="pb-gallery__caption">{$item.caption|escape}</figcaption>
          {/if}
        </figure>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/gallery.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
