---
title: "Products carousel"
description: "Horizontal product strip from a category with autoplay (Pro)"
---

# Products carousel

Same data as **Products grid**, in a carousel. Fits narrow layouts with many SKUs.

![Products carousel](/components/pagebuilder/screenshots/sections/products_carousel.jpg)

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Carousel instead of grid

- Same products as grid, in carousel form
- Saves homepage height
- Optional autoplay

## Typical placement

- Homepage: bestsellers
- Product page: cross-sell (if not using **Related products**)
- Landing: category picks

## Page examples

- Homepage: [Products carousel](products_carousel) bestsellers → [Products grid](products_grid) new arrivals
- Product: [Related](related_products) + [Carousel](products_carousel) cross-sell

## Category and autoplay

Category and limit like the grid. **Autoplay** and section JS on the front end.

## Similar sections

- [Products grid](products_grid) for full showcase
- [Product spotlight](product_spotlight) for one SKU

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `products_carousel` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_products_carousel` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Catalog parent (`parent`)

Type [relation](../fields/relation#output-in-section-data). Required. Pick one MODX resource in a search modal.

### Limit (`limit`)

Type [number](../fields/number#output-in-section-data). Optional.

### Autoplay (`autoplay`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle. When autoplay is on, the site shows a pause button. Labels: `pagebuilder_fe_carousel_pause` and `pagebuilder_fe_carousel_play`.

### Sort (`sortby`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

## Site output

`pb-products-carousel` via msProducts.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "parent": 101,
  "limit": 6,
  "autoplay": false,
  "sortby": "menuindex"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_products_carousel`:

```fenom
{set $catalogParent = $parent.id|default:($parent_id|default:0)}
{set $listing = ''}
{if $catalogParent}
  {set $listing = $modx->runSnippet('msProducts', [
    'parents' => $catalogParent,
    'depth' => 10,
    'limit' => $limit|default:8,
    'tpl' => 'pagebuilderpro_ms3_product_carousel_slide',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1,
    'sortby' => $ms_sortby|default:'msProduct.menuindex',
    'sortdir' => $ms_sortdir|default:'ASC'
  ])}
{/if}
<section
  class="pb-section pb-section--products-carousel pb-products-carousel pb-listing pb-listing--carousel{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="products_carousel"
  data-pb-carousel
  data-pb-autoplay="{$autoplay|default:0}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-carousel__viewport" tabindex="0" role="region" aria-roledescription="carousel" aria-label="{$title|default:('pagebuilder_fe_carousel_products' | lexicon)|escape}">
        <div class="pb-carousel__track">
          {$listing}
        </div>
        <div class="pb-carousel__controls">
          <button type="button" class="pb-carousel__btn" data-pb-carousel-prev aria-label="{'pagebuilder_fe_carousel_prev' | lexicon}">‹</button>
          <button type="button" class="pb-carousel__btn" data-pb-carousel-next aria-label="{'pagebuilder_fe_carousel_next' | lexicon}">›</button>
        </div>
        <button
          type="button"
          class="pb-carousel__pause"
          data-pb-carousel-pause
          hidden
          aria-pressed="false"
          data-label-pause="{'pagebuilder_fe_carousel_pause' | lexicon}"
          data-label-play="{'pagebuilder_fe_carousel_play' | lexicon}"
        >{'pagebuilder_fe_carousel_pause' | lexicon}</button>
      </div>
    {else}
      <p class="pb-listing__empty">{'pagebuilder_fe_listing_empty_carousel' | lexicon}</p>
    {/if}
  </div>
</section>
```

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
