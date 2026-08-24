---
title: "Related products"
description: "Category picks excluding the current product (Pro)"
---

# Related products

On a product page, shows other SKUs from the same (or chosen) category except the current resource.

<!-- ![Related products](/components/pagebuilder/screenshots/sections/related_products.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Why this section

- Excludes current product from picks
- Product page context, no extra snippet
- Category and limit in inspector

## When to use

- **Product page** — "You may also like"
- **Cart** — upsell
- **Thank-you page**

## Page examples

- Product template (MS3): … → [Related products](related_products) → [FAQ](faq)
- Cart: [Related products](related_products) “Add to order”

## Inspector tips

**Category**, **Exclude product** (current), **Limit**. Best on product resource context.

## Similar sections

- [Curated products](curated_products) for fixed IDs
- [Products carousel](products_carousel) for generic category strip

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `related_products` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_related_products` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Catalog parent (`parent`)

Type [relation](../fields/relation#output-in-section-data). Required. Pick one MODX resource in a search modal.

### Exclude product (`product`)

Type [relation](../fields/relation#output-in-section-data). Optional. Pick one MODX resource in a search modal.

### Limit (`limit`)

Type [number](../fields/number#output-in-section-data). Optional.

### Sort (`sortby`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

## Site output

`pb-related-products` grid via msProducts.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "product": 201,
  "limit": 6,
  "sortby": "menuindex"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_related_products`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $excludeId = $product.id|default:($product_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => $catalogParent,
    'depth' => 10,
    'limit' => $limit|default:4,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1,
    'resources' => ($excludeId > 0) ? ('-' ~ $excludeId) : '',
    'sortby' => $ms_sortby|default:'msProduct.menuindex',
    'sortdir' => $ms_sortdir|default:'ASC'
  ])}
{/if}
<section class="pb-section pb-section--related-products pb-related-products pb-listing{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="related_products"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-listing__grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">Подходящих товаров пока нет.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/related_products.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
