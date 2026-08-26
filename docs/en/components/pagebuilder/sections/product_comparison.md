---
title: "Product comparison"
description: "Comparison table for selected miniShop3 products (Pro)"
---

# Product comparison

Pick several products in the inspector: the site renders a spec table with one column per product.

<!-- ![Product comparison](/components/pagebuilder/screenshots/sections/product_comparison.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Comparison in PageBuilder

- Multiple SKUs in one spec table
- Optional highlight for differing cells
- Pick products in inspector, not query strings

## Where to show

- Compare page in catalog
- B2B alternative picker
- Landing: two or three SKUs side by side

## Page examples

- Compare page: [Hero](hero) → [Product comparison](product_comparison) → [CTA](cta)
- B2B: [Spec table](spec_table) + [Product comparison](product_comparison) for a line

## Products and highlight

**Products** repeater or multirelation. **Highlight differences** marks differing values.

## Similar sections

- [Spec table](spec_table) for single product
- [Curated products](curated_products) without comparison layout

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `product_comparison` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_product_comparison` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Products (`products`)

Type [multirelation](../fields/multirelation#output-in-section-data). Required. Pick multiple resources. JSON stores resource IDs.

### Highlight differences (`highlight_differences`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle.

## Site output

`pb-product-comparison` table.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "products": [
    201,
    202,
    203
  ],
  "highlight_differences": true
}
```

## Chunk template

Fenom chunk `pagebuilderpro_product_comparison`:

```fenom
{var $productIds = $comparison_product_ids|default:''}
{var $listing = ''}
{if $productIds}
  {var $listing = $modx->runSnippet('msProducts', [
    'resources' => $productIds,
    'limit' => 4,
    'tpl' => 'pagebuilderpro_product_comparison_cell',
    'includeVendorFields' => '*',
    'includeOptions' => '*',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section
  class="pb-section pb-section--product-comparison pb-product-comparison{if $highlight_differences} pb-product-comparison--diff{/if}{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="product_comparison"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner pb-product-comparison__inner">
    {if $title}
      <h2 class="pb-heading pb-product-comparison__title">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-product-comparison__scroll" tabindex="0" role="region" aria-label="{$title|default:'Product comparison'|escape}">
        <div class="pb-product-comparison__grid">
          {$listing}
        </div>
      </div>
    {else}
      <p class="pb-listing__empty">Select 2 to 4 products to compare.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/product_comparison.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
