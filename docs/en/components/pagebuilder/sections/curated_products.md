---
title: "Curated products"
description: "Fixed product list picked manually in the inspector (Pro)"
---

# Curated products

Unlike **Products grid**, no single category: you pick exact product IDs in multirelation.

<!-- ![Curated products](/components/pagebuilder/screenshots/sections/curated_products.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Why this section

- Exact SKU list, order follows multirelation
- Not tied to one category
- Same card markup as grid

## When to use

- **"Recommended"** on homepage
- **New arrivals** — manual list without category filter
- **Bundle** on a landing page

## Page examples

- Homepage: [Curated products](curated_products) “Staff picks” → [Products grid](products_grid) catalog
- Landing: [Hero](hero) → [Curated products](curated_products) → [CTA](cta)

## Inspector tips

**Products** multirelation: selection order is kept. Limit is the number of picked items.

## Similar sections

- [Products grid](products_grid) for automatic category feed
- [Related products](related_products) on product page with exclude

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `curated_products` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_curated_products` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Products (`products`)

Type [multirelation](../fields/multirelation#output-in-section-data). Required. Pick multiple resources. JSON stores resource IDs.

### Intro (`intro`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

## Site output

`pb-curated-products` grid from multirelation IDs.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "products": [
    201,
    202,
    203
  ],
  "intro": "Краткое вступление перед основным содержимым."
}
```

## Chunk template

Fenom chunk `pagebuilderpro_curated_products`:

```fenom
{var $resourceIds = $curated_product_ids|default:''}
{var $listing = ''}
{if $resourceIds}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $resourceIds,
    'limit' => 12,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section class="pb-section pb-section--curated-products pb-curated-products pb-listing{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="curated_products"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-listing__intro">{$intro|escape}</p>
    {/if}
    {if $listing}
      <div class="pb-listing__grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">Выберите товары в инспекторе секции.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/curated_products.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
