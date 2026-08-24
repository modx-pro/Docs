---
title: "Hero"
description: "Title, text, button, and optional background image above the fold"
---

# Hero

The first block below the site header. Visitors see a title, short text, and a linked button. Add a background image or keep a flat background.

<!-- ![Hero](/components/pagebuilder/screenshots/sections/hero.png) -->

## Why this section

- Editors change title, text, and button without editing Fenom
- Background and alignment come from inspector fields, not template CSS
- Chunk `pagebuilder_hero` ships with `pb-hero` markup

## When to use

- **Homepage** — main offer and primary action (catalog, promo)
- **Landing page** for a service, course, or event
- **Promo page** with a single call to action: sign up, download, request a quote

## Page examples

- SaaS landing: [Hero](hero) → [Features](features) → [Stats](stats) → [Pricing](pricing_table) → [CTA](cta)
- Store: [Hero](hero) → [Products grid](products_grid) → [Testimonials](testimonials) → [Contact](contact)
- Service: [Hero](hero) → [Cards](cards) → [FAQ](faq) → [Contact form](contact_form)

## Inspector tips

**Title** is required. The button renders only when both **Button label** and **Button URL** are set. **Alignment** switches text between left and center.

## Similar sections

- [CTA](cta) for a compact block without full-width background
- [Promo banner](promo_banner) for catalog promos (Pro, miniShop3)

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `hero` |
| Layer | Free |
| Category | hero (`hero`) |
| Chunk | `pagebuilder_hero` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Required.

### Description (`description`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Button label (`button_label`)

Type [text](../fields/text#output-in-section-data). Optional.

### Button URL (`button_url`)

Type [url](../fields/url#output-in-section-data). Optional.

### Background (`background`)

Type [image](../fields/image#output-in-section-data). Optional.

### Alignment (`alignment`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

## Site output

Renders `pb-hero` with title, description, CTA link (`pb-button`), and optional background via the image partial.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "description": "Короткое описание блока для первого экрана.",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action",
  "background": {
    "url": "assets/images/example.jpg",
    "id": 12,
    "filename": "example.jpg",
    "extension": "jpg",
    "title": "example.jpg",
    "width": 1920,
    "height": 1080,
    "type": "image"
  },
  "alignment": "left"
}
```

## Chunk template

Fenom chunk `pagebuilder_hero`:

```fenom
{var $heroBg = is_array($background) ? ($background.url ?: '') : ($background ?: '')}
<section class="pb-section pb-section--hero pb-hero{if $alignment == 'center'} pb-hero--center{/if}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="hero"{if $id} id="pb-{$id|escape}"{/if}{if $heroBg} style="--pb-hero-bg: url('{$heroBg|escape}')"{/if}>
  <div class="pb-section__inner pb-hero__inner">
    <h1 class="pb-hero__title">{$title|escape}</h1>
    {if $description}
      <div class="pb-hero__description">{$description|escape}</div>
    {/if}
    {if $button_label && $button_url}
      <a class="pb-hero__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
    {/if}
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/hero.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
