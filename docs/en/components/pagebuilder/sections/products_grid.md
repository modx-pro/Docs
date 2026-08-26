---
title: "Products grid"
description: "Product showcase from a miniShop3 category via msProducts (Pro)"
---

# Products grid

Classic store grid: cards with image, price, badges, and add to cart. Products from a selected category.

<!-- ![Products grid](/components/pagebuilder/screenshots/sections/products_grid.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Storefront without a snippet

- msProducts inside chunk: prices and cart from miniShop3
- Editor changes category and limit
- No separate snippet call on the page

## Typical placement

- Store homepage: category bestsellers or new items
- Collection landing: one product line
- Promo page: sale items in a category

## Page examples

- Store homepage: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)
- Collection: [Promo banner](promo_banner) → [Products grid](products_grid) → [Brands row](brands_row)

## Category and sort

**Parent category**: msCategory. **Limit** and **Sort** like msProducts. Requires miniShop3.

## Similar sections

- [Products carousel](products_carousel) for a horizontal strip
- [Curated products](curated_products) for hand-picked SKUs

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `products_grid` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_products_grid` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Catalog parent (`parent`)

Type [relation](../fields/relation#output-in-section-data). Required. Pick one MODX resource in a search modal.

### Limit (`limit`)

Type [number](../fields/number#output-in-section-data). Optional.

### Sort (`sortby`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

## Site output

`pb-products-grid` via msProducts.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "parent": 101,
  "limit": 6,
  "sortby": "menuindex"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_products_grid`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => $catalogParent,
    'depth' => 10,
    'limit' => $limit|default:12,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1,
    'sortby' => $ms_sortby|default:'msProduct.menuindex',
    'sortdir' => $ms_sortdir|default:'ASC'
  ])}
{/if}
<section class="pb-section pb-section--products-grid pb-products-grid pb-listing{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="products_grid"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-listing__grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">No products in this category yet.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/products_grid.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
