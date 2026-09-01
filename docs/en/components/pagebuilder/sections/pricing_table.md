---
title: "Pricing table"
description: "Pricing cards with price, billing period, and feature list (Pro)"
---

# Pricing table

Price table for subscriptions and service tiers. Each plan has a name, price, billing period, and plain-text feature list.

<!-- ![Pricing table](/components/pagebuilder/screenshots/sections/pricing_table.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why a pricing table

- Multiple plans in one section
- Feature list as plain text, one line per item
- Price and button per plan

## Typical pages

- SaaS: three tiers on pricing page
- Services: Starter / Business / Enterprise packages
- Landing: block before the lead form

## Page examples

- SaaS: [Features](features) → [Pricing](pricing_table) → [FAQ](faq) → [CTA](cta)
- Services: [Cards](cards) → [Pricing](pricing_table) → [Contact form](contact_form)

## Pricing repeater

**Plans** repeater. **Features** is plain text, **one line per feature**. Set the plan button via row button fields.

## Similar sections

- [Cards](cards) without prices
- [Data table](data_table) for CMP-sourced price lists

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `pricing_table` |
| Layer | Pro |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilderpro_pricing_table` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Plans (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `name` | [text](../fields/text#output-in-section-data) | Plan name | yes |
| `price` | [currency](../fields/currency#output-in-section-data) | Price | yes |
| `period` | [text](../fields/text#output-in-section-data) | Billing period | no |
| `description` | [textarea](../fields/textarea#output-in-section-data) | Description | no |
| `features` | [textarea](../fields/textarea#output-in-section-data) | Features (one per line) | no |
| `button_label` | [text](../fields/text#output-in-section-data) | CTA label | no |
| `button_url` | [url](../fields/url#output-in-section-data) | CTA URL | no |
| `highlighted` | [yesno](../fields/yesno#output-in-section-data) | Highlighted plan | no |
| `badge` | [text](../fields/text#output-in-section-data) | Badge | no |

## Site output

`pb-pricing` with plan cards.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "Jane Doe",
      "price": 990,
      "period": "per month",
      "description": "Short block description for the first screen.",
      "features": "Unlimited projects\nPriority support\nAPI access",
      "button_label": "Learn more",
      "button_url": "https://example.com/action",
      "highlighted": true,
      "badge": "Text"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_pricing_table`:

```fenom
<section class="pb-section pb-section--pricing-table pb-pricing-table{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="pricing_table"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-pricing-table__inner">
    {if $title}
      <h2 class="pb-heading pb-pricing-table__title">{$title|escape}</h2>
    {/if}
    <div class="pb-pricing-table__grid pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-pricing-table__plan{if $item.highlighted} pb-pricing-table__plan--highlight{/if}">
          {if $item.badge}
            <span class="pb-pricing-table__badge">{$item.badge|escape}</span>
          {/if}
          <h3 class="pb-pricing-table__name">{$item.name|escape}</h3>
          {if $item.description}
            <p class="pb-pricing-table__description">{$item.description|escape}</p>
          {/if}
          <p class="pb-pricing-table__price">
            <span class="pb-pricing-table__amount">{$item.price|escape}</span>
            {if $item.period}
              <span class="pb-pricing-table__period">{$item.period|escape}</span>
            {/if}
          </p>
          {if $item.features_list}
            <ul class="pb-pricing-table__features">
              {foreach $item.features_list as $feature}
                <li>{$feature|escape}</li>
              {/foreach}
            </ul>
          {elseif $item.features}
            <ul class="pb-pricing-table__features">
              {foreach $item.features|split:"\n" as $feature}
                {if $feature|trim}
                  <li>{$feature|trim|escape}</li>
                {/if}
              {/foreach}
            </ul>
          {/if}
          {if $item.button_label && $item.button_url}
            <a class="pb-button pb-pricing-table__cta" href="{$item.button_url|escape:'url'}">{$item.button_label|escape}</a>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/pricing_table.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
