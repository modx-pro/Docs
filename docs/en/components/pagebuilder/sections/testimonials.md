---
title: "Testimonials"
description: "Quote cards with name, role, and author photo"
---

# Testimonials

Social proof: client quote, name, role, and avatar. Multiple testimonials render in a grid.

<!-- ![Testimonials](/components/pagebuilder/screenshots/sections/testimonials.png) -->

## Why this section

- Quote, name, and photo in one card
- Multiple reviews without a custom snippet
- Pairs well with stats and CTA blocks

## When to use

- **Homepage** — trust block after product copy
- **Landing page** — reviews before the lead form
- **About page**

## Page examples

- SaaS: [Features](features) → [Testimonials](testimonials) → [Pricing](pricing_table)
- Services: [Cards](cards) → [Testimonials](testimonials) → [Contact form](contact_form)

## Inspector tips

**Testimonials** repeater: **Quote**, **Name**, **Role**, **Photo**. Photo is optional but helps trust.

## Similar sections

- [Logos](logos) for “trusted by” without quotes
- [Team](team) for staff bios, not client quotes

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `testimonials` |
| Layer | Free |
| Category | social proof (`social`) |
| Chunk | `pagebuilder_testimonials` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Testimonials (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `quote` | [textarea](../fields/textarea#output-in-section-data) | Quote | yes |
| `name` | [text](../fields/text#output-in-section-data) | Name | yes |
| `role` | [text](../fields/text#output-in-section-data) | Role | no |
| `avatar` | [image](../fields/image#output-in-section-data) | Avatar | no |

## Site output

`pb-testimonials` grid: blockquote, author line, avatar partial.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "quote": "Отличный сервис, рекомендую коллегам.",
      "name": "Иван Петров",
      "role": "Директор, ООО Пример",
      "avatar": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      }
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilder_testimonials`:

```fenom
<section class="pb-section pb-section--testimonials pb-testimonials{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="testimonials"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-testimonials__inner">
    {if $title}
      <h2 class="pb-heading pb-testimonials__title">{$title|escape}</h2>
    {/if}
    <div class="pb-testimonials__grid">
      {foreach $items as $item}
        <blockquote class="pb-testimonials__item">
          {if $item.avatar}
            {include 'pagebuilder_partial_image' image=$item.avatar alt=$item.name class='pb-testimonials__avatar'}
          {/if}
          <p class="pb-testimonials__quote">{$item.quote|escape}</p>
          <footer class="pb-testimonials__footer">
            <div class="pb-testimonials__author">{$item.name|escape}</div>
            {if $item.role}
              <div class="pb-testimonials__role">{$item.role|escape}</div>
            {/if}
          </footer>
        </blockquote>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/testimonials.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
