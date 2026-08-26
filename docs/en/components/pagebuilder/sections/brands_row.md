---
title: "Brands row"
description: "Brand logos manually or from miniShop3 category vendors (Pro)"
---

# Brands row

Like **Logo cloud**, but can pull vendors from a catalog category automatically.

<!-- ![Brands row](/components/pagebuilder/screenshots/sections/brands_row.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Why a brands row

- Manual list or vendors from MS3 category
- Links into brand filter URLs
- Tighter than product grid for logos only

## Catalog scenarios

- Store homepage: brands in category
- Brands page: manual list
- Filter promo: link to vendor

## Page examples

- Catalog: [Categories row](categories_row) → [Brands row](brands_row) → [Products grid](products_grid)
- Homepage: [Brands row](brands_row) → [Testimonials](testimonials)

## Brand source

**Source**: manual repeater or **Category vendors**. For category_vendors, set **Parent category**.

## Similar sections

- [Logos](logos) for non-catalog partners
- [Categories row](categories_row) for department navigation

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `brands_row` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_brands_row` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Source (`source`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

### Catalog parent (`parent`)

Type [relation](../fields/relation#output-in-section-data). Optional. Pick one MODX resource in a search modal.

### Limit (`limit`)

Type [number](../fields/number#output-in-section-data). Optional.

### Brands (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Optional. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `logo` | [image](../fields/image#output-in-section-data) | Logo | no |
| `name` | [text](../fields/text#output-in-section-data) | Brand name | yes |
| `url` | [url](../fields/url#output-in-section-data) | Link | no |

## Site output

`pb-brands-row`.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "source": "manual",
  "parent": 101,
  "limit": 6,
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "logo": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "name": "Jane Doe",
      "url": "https://example.com/brand"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_brands_row`:

```fenom
{var $brands = $brand_items|default:$items}
<section class="pb-section pb-section--brands-row pb-brands-row{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="brands_row"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-brands-row__inner">
    {if $title}
      <h2 class="pb-heading pb-brands-row__title">{$title|escape}</h2>
    {/if}
    {if $brands && ($brands | length) > 0}
      <div class="pb-brands-row__grid">
        {foreach $brands as $item}
          {if $item.url}
            <a class="pb-brands-row__item" href="{$item.url|escape:'url'}" title="{$item.name|escape}">
              {if $item.logo}
                {include 'pagebuilder_partial_image' image=$item.logo alt=$item.name class='pb-brands-row__logo'}
              {/if}
              <span class="pb-brands-row__name">{$item.name|escape}</span>
            </a>
          {else}
            <div class="pb-brands-row__item">
              {if $item.logo}
                {include 'pagebuilder_partial_image' image=$item.logo alt=$item.name class='pb-brands-row__logo'}
              {/if}
              <span class="pb-brands-row__name">{$item.name|escape}</span>
            </div>
          {/if}
        {/foreach}
      </div>
    {else}
      <p class="pb-brands-row__empty">Add brands manually or select a category with vendors.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/brands_row.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
