---
title: "Stats"
description: "Row of metrics with a large value and label underneath"
---

# Stats

Several KPIs in a row or grid: years in business, client count, and similar figures. Large number, small caption.

<!-- ![Stats](/components/pagebuilder/screenshots/sections/stats.png) -->

## Why show numbers

- Numbers scan fast, no table needed
- KPI updates by editor, not by redeploying templates
- value/label pairs are predictable in Fenom

## Typical placement

- Homepage: company KPIs
- B2B landing: scale, coverage, SLA
- About page: facts instead of long copy

## Page examples

- B2B: [Hero](hero) → [Stats](stats) → [Features](features) → [CTA](cta)
- Agency: [Stats](stats) → [Testimonials](testimonials) → [Logos](logos)

## Metrics repeater

**Metrics** repeater: **Value** and **Label** per row. Three or four items usually work best.

## Similar sections

- [Cards](cards) for text benefits without numeric focus
- [Spec table](spec_table) for parameter/value rows (Pro)

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `stats` |
| Layer | Free |
| Category | social proof (`social`) |
| Chunk | `pagebuilder_stats` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Metrics (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `value` | [text](../fields/text#output-in-section-data) | Value | yes |
| `label` | [text](../fields/text#output-in-section-data) | Label | yes |

## Site output

`pb-stats` grid with value / label pairs.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "value": "1200+",
      "label": "Happy customers"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilder_stats`:

```fenom
<section class="pb-section pb-section--stats pb-stats{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="stats"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-stats__inner">
    {if $title}
      <h2 class="pb-heading pb-stats__title">{$title|escape}</h2>
    {/if}
    <div class="pb-stats__grid">
      {foreach $items as $item}
        <div class="pb-stats__item">
          <div class="pb-stats__value">{$item.value|escape}</div>
          <div class="pb-stats__label">{$item.label|escape}</div>
        </div>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/stats.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
