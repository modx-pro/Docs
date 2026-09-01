---
title: "Product spotlight"
description: "Large single product card with gallery, price, and cart (Pro)"
---

# Product spotlight

Store hero or "product of the week": large image, price, description, add to cart. One product from msProducts.

<!-- ![Product spotlight](/components/pagebuilder/screenshots/sections/product_spotlight.png) -->

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

**Product** relation to a miniShop3 resource. Other section fields set the block title.

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
{var $productId = $pb_product_resource|default:($product_id|default:0)}
{var $listing = ''}
{if $productId}
  {var $listing = $modx->runSnippet('msProducts', [
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
      <p class="pb-listing__empty">Product not selected or unavailable.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/product_spotlight.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
