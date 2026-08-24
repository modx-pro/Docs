---
title: "Logo cloud"
description: "Row of client or partner logos (Pro)"
---

# Logo cloud

"Trusted by" block: logos in a row or grid. Each logo has alt text and optional link.

<!-- ![Logo cloud](/components/pagebuilder/screenshots/sections/logos.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Fast “trusted by” strip
- Alt text per logo for accessibility
- Optional partner link

## When to use

- **B2B homepage** — clients and integrators
- **Landing page** before testimonials
- **Partners page**

## Page examples

- B2B: [Stats](stats) → [Logos](logos) → [Testimonials](testimonials)
- Landing: [Features](features) → [Logos](logos) → [Pricing](pricing_table)

## Inspector tips

**Logos** repeater: image, alt, URL. Keep logo heights consistent in design.

## Similar sections

- [Brands row](brands_row) for miniShop3 vendors (Pro, MS3)
- [Testimonials](testimonials) for quotes instead of logos

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `logos` |
| Layer | Pro |
| Category | social proof (`social`) |
| Chunk | `pagebuilderpro_logos` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Logos (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `image` | [image](../fields/image#output-in-section-data) | Logo | yes |
| `alt` | [text](../fields/text#output-in-section-data) | Alt text | no |

## Site output

`pb-logos` grid with images.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
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
      "alt": "Описание изображения для скринридеров"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_logos`:

```fenom
<section class="pb-section pb-section--logos pb-logos{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="logos"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-logos__inner">
    {if $title}
      <h2 class="pb-heading pb-logos__title">{$title|escape}</h2>
    {/if}
    <div class="pb-logos__grid">
      {foreach $items as $item}
        {include 'pagebuilder_partial_image' image=$item.image alt=($item.alt ?: 'Logo') class='pb-logos__item'}
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/logos.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
