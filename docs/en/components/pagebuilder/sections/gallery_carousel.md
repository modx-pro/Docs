---
title: "Gallery carousel"
description: "Image slider with optional autoplay (Pro)"
---

# Gallery carousel

Same slides as **Gallery**, one per view with navigation. Optional autoplay.

<!-- ![Gallery carousel](/components/pagebuilder/screenshots/sections/gallery_carousel.png) -->

::: info
Requires PageBuilder Pro.
:::

## Carousel instead of grid

- Saves vertical space on mobile
- Optional autoplay
- Same slide fields as [Gallery](gallery)

## Where it fits

- Homepage banners
- Portfolio: large work previews
- Product photos: angles on a landing page

## Page examples

- Homepage: [Hero](hero) → [Carousel](gallery_carousel) banners → [Products grid](products_grid)
- Portfolio: [Rich text](richtext) → [Carousel](gallery_carousel) → [CTA](cta)

## Slides and autoplay

**Slides** repeater like Gallery. **Autoplay** enables a timer; load `pagebuilder-sections.js` on the front end.

## Similar sections

- [Gallery](gallery) to show all frames at once
- [Products carousel](products_carousel) for SKUs (Pro, MS3)

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `gallery_carousel` |
| Layer | Pro |
| Category | media (`media`) |
| Chunk | `pagebuilderpro_gallery_carousel` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Autoplay (`autoplay`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle.

### Slides (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `image` | [image](../fields/image#output-in-section-data) | Image | yes |
| `alt` | [text](../fields/text#output-in-section-data) | Alt text | no |
| `caption` | [text](../fields/text#output-in-section-data) | Caption | no |

## Site output

`pb-carousel` with image partials.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "autoplay": false,
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

Fenom chunk `pagebuilderpro_gallery_carousel`:

```fenom
{var $slideCount = $items|count}
<section
  class="pb-section pb-section--gallery-carousel pb-gallery-carousel{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="gallery_carousel"
  data-pb-carousel
  data-pb-autoplay="{$autoplay|default:0}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    <div class="pb-carousel__viewport" tabindex="0" role="region" aria-roledescription="carousel" aria-label="{$title|default:'Gallery'|escape}">
      <div class="pb-carousel__track">
        {foreach $items as $item}
          <figure class="pb-carousel__slide" role="group" aria-roledescription="slide" aria-label="{$item@index + 1} / {$slideCount}">
            {include 'pagebuilder_partial_image' image=$item.image alt=($item.alt ?: $item.caption) class='pb-carousel__media'}
            {if $item.caption}
              <figcaption class="pb-carousel__caption">{$item.caption|escape}</figcaption>
            {/if}
          </figure>
        {/foreach}
      </div>
      {if $slideCount > 1}
        <div class="pb-carousel__controls">
          <button type="button" class="pb-carousel__btn" data-pb-carousel-prev aria-label="Previous slide">‹</button>
          <button type="button" class="pb-carousel__btn" data-pb-carousel-next aria-label="Next slide">›</button>
        </div>
        <div class="pb-carousel__dots" role="tablist" aria-label="Slides">
          {foreach $items as $item}
            <button
              type="button"
              class="pb-carousel__dot{if $item@first} pb-carousel__dot--active{/if}"
              data-pb-carousel-dot="{$item@index}"
              role="tab"
              aria-label="Slide {$item@index + 1}"
              {if $item@first}aria-selected="true"{/if}
            ></button>
          {/foreach}
        </div>
      {/if}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/gallery_carousel.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
