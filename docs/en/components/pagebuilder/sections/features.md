---
title: "Features"
description: "Items with icon, title, and description (Pro)"
---

# Features

A "why us" block: each item has an icon (URL or class), title, and body text. Richer than the **Cards** section.

<!-- ![Features](/components/pagebuilder/screenshots/sections/features.png) -->

::: info
Requires PageBuilder Pro.
:::

## How Features beats cards

- Icon, title, and body per cell
- Stronger visual than [Cards](cards) on product landings
- Icon via URL or theme CSS class

## Typical landings

- Product landing: key capabilities
- Alternatives without a comparison table
- Block after hero on a SaaS site

## Page examples

- SaaS: [Hero](hero) → [Features](features) → [Stats](stats) → [Pricing](pricing_table)
- Product: [Features](features) → [Video](video) → [CTA](cta)

## Features repeater

**Features** repeater: **Icon**, **Title**, **Description**. Icon can be an SVG/PNG URL or a theme CSS class.

## Similar sections

- [Cards](cards) (Free) when icons are optional
- [Product comparison](product_comparison) for tabular contrast (Pro, MS3)

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `features` |
| Layer | Pro |
| Category | content (`content`) |
| Chunk | `pagebuilderpro_features` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Features (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `icon` | [image](../fields/image#output-in-section-data) | Icon | no |
| `title` | [text](../fields/text#output-in-section-data) | Title | yes |
| `text` | [textarea](../fields/textarea#output-in-section-data) | Text | no |

## Site output

`pb-features` with icons and text.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "icon": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "title": "Section title",
      "text": "Supporting text under the title."
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_features`:

```fenom
<section class="pb-section pb-section--features pb-features{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="features"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-features__inner">
    {if $title}
      <h2 class="pb-heading pb-features__title">{$title|escape}</h2>
    {/if}
    <div class="pb-features__grid pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-features__item">
          {if $item.icon}
            {include 'pagebuilder_partial_image' image=$item.icon alt=$item.title class='pb-features__icon'}
          {/if}
          <h3 class="pb-features__item-title">{$item.title|escape}</h3>
          {if $item.text}
            <p class="pb-features__item-text">{$item.text|escape}</p>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/features.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
