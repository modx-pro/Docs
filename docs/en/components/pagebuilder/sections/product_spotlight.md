---
title: "Product spotlight"
description: "Large single product card with gallery, price, and cart (Pro)"
---

# Product spotlight

Store hero or "product of the week": large image, price, description, add to cart. One product from msProducts.

![Product spotlight](/components/pagebuilder/screenshots/sections/product_spotlight.jpg)

::: info
Requires PageBuilder Pro and miniShop3.
:::

## One product, large

- One SKU large: gallery, price, cart
- “Product of the week” without custom template
- msProducts by resource relation

## Promo scenarios

- Homepage: featured SKU
- Brand landing: flagship item
- Promo page: sale item

## Page examples

- Store homepage: [Product spotlight](product_spotlight) → [Products carousel](products_carousel)
- Sale: [Promo banner](promo_banner) → [Product spotlight](product_spotlight)

## Product relation

Product search uses `mgr/ms3/products/search`. `product` is required. The type is `"cacheable": false`.

Before the chunk, `ProSectionRenderSupport` writes `product_id` and `pb_product_resource`. The chunk reads `$pb_product_resource`. If the id is missing, the visitor sees the chunk text «Товар не выбран или недоступен.»

## Similar sections

- [Promo banner](promo_banner) with copy and optional product
- [Products grid](products_grid) for many SKUs

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `product_spotlight` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_product_spotlight` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Product (`product`)

Type [relation](../fields/relation#output-in-section-data). Required. Pick one MODX resource in a search modal.

## Site output

Two-column `pb-product-spotlight` via msProducts.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "product": 201
}
```

## Chunk template

Fenom chunk `pagebuilderpro_product_spotlight`:

```fenom
{set $productId = $pb_product_resource !: ($product_id !: 0)}
{set $listing = ''}
{if $productId}
  {set $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $productId,
    'limit' => 1,
    'tpl' => 'pagebuilderpro_ms3_product_spotlight_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section class="pb-section pb-section--product-spotlight pb-product-spotlight{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="product_spotlight"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-product-spotlight__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      {$listing}
    {else}
      <p class="pb-listing__empty">{'pagebuilder_fe_listing_empty_product' | lexicon}</p>
    {/if}
  </div>
</section>
```

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
