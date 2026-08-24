---
title: "Promo banner"
description: "Banner with text, button, background, and optional product link (Pro)"
---

# Promo banner

Wide promo block: title, text, CTA, background, and optional miniShop3 product card.

<!-- ![Promo banner](/components/pagebuilder/screenshots/sections/promo_banner.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Why this section

- Copy, background, CTA like hero but compact
- Optional miniShop3 product tie-in
- Seasonal promos between showcases

## When to use

- **Seasonal sale** on homepage
- **New arrival** linking to product page
- **Banner between** catalog sections

## Page examples

- Homepage: [Products grid](products_grid) → [Promo banner](promo_banner) → [Products carousel](products_carousel)
- Sale: [Hero](hero) → [Promo banner](promo_banner) → [Curated products](curated_products)

## Inspector tips

Set copy and button. **Product** is optional — chunk may render a mini card.

## Similar sections

- [Hero](hero) for above-the-fold
- [CTA](cta) without background or product

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `promo_banner` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_promo_banner` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Required.

### Text (`text`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Button label (`button_label`)

Type [text](../fields/text#output-in-section-data). Optional.

### Button URL (`button_url`)

Type [url](../fields/url#output-in-section-data). Optional.

### Background (`background`)

Type [image](../fields/image#output-in-section-data). Optional.

### Product (`product`)

Type [relation](../fields/relation#output-in-section-data). Optional. Pick one MODX resource in a search modal.

## Site output

`pb-promo-banner` with CTA and optional product.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action",
  "background": {
    "url": "assets/images/example.jpg",
    "id": 12,
    "filename": "example.jpg",
    "extension": "jpg",
    "title": "example.jpg",
    "width": 1920,
    "height": 1080,
    "type": "image"
  },
  "product": 201
}
```

## Chunk template

Fenom chunk `pagebuilderpro_promo_banner`:

```fenom
{var $promoBg = is_array($background) ? ($background.url ?: '') : ($background ?: '')}
{var $productId = $pb_product_resource|default:($product_id|default:0)}
{var $listing = ''}
{if $productId}
  {var $listing = $modx->runSnippet('msProducts', [
    'parents' => 0,
    'resources' => $productId,
    'limit' => 1,
    'tpl' => 'pagebuilderpro_ms3_product_row',
    'includeVendorFields' => '*',
    'includeOptions' => 'color,size',
    'withCurrency' => 1,
    'showZeroPrice' => 1
  ])}
{/if}
<section class="pb-section pb-section--promo-banner pb-promo-banner{if $promoBg} pb-promo-banner--media{/if}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="promo_banner"{if $id} id="pb-{$id|escape}"{/if}{if $promoBg} style="--pb-hero-bg: url('{$promoBg|escape}')"{/if}>
  <div class="pb-section__inner pb-promo-banner__inner">
    <h2 class="pb-heading pb-promo-banner__title">{$title|escape}</h2>
    {if $text}
      <p class="pb-promo-banner__text">{$text|escape}</p>
    {/if}
    {if $listing}
      <div class="pb-promo-banner__product">
        {$listing}
      </div>
    {/if}
    {if $button_label && $button_url}
      <a class="pb-promo-banner__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/promo_banner.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
