---
title: "Cards"
description: "Grid of cards with a title and text in each"
---

# Cards

A flexible grid: each card has a title and short text. No icons or buttons, just structured blocks.

<!-- ![Cards](/components/pagebuilder/screenshots/sections/cards.png) -->

## When to use cards

- Flexible grid without icons or prices
- Works for services, steps, short points
- Free layer, no Pro required

## Scenarios

- Services: three to six offerings
- Process steps or roadmap
- Simple benefits without the Pro Features icons

## Page examples

- Services: [Hero](hero) → [Cards](cards) → [FAQ](faq) → [CTA](cta)
- Process: [Rich text](richtext) → [Cards](cards) → [Testimonials](testimonials)

## How to fill the repeater

**Cards** repeater: **Title** and **Text** per row. Reorder rows in the inspector.

## Similar sections

- [Features](features) with icons (Pro)
- [Pricing table](pricing_table) when cards need prices

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `cards` |
| Layer | Free |
| Category | content (`content`) |
| Chunk | `pagebuilder_cards` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Cards (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `title` | [text](../fields/text#output-in-section-data) | Title | yes |
| `text` | [textarea](../fields/textarea#output-in-section-data) | Text | no |

## Site output

`pb-cards` grid with title + text items.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "title": "Section title",
      "text": "Supporting text under the title."
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilder_cards`:

```fenom
<section class="pb-section pb-section--cards pb-cards{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="cards"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-cards__inner">
    {if $title}
      <h2 class="pb-heading pb-cards__title">{$title|escape}</h2>
    {/if}
    <div class="pb-cards__grid pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-cards__item">
          <h3 class="pb-cards__item-title">{$item.title|escape}</h3>
          {if $item.text}
            <p class="pb-cards__item-text">{$item.text|escape}</p>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/cards.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
