---
title: "Categories row"
description: "Subcategory cards from a parent via pdoResources (msCategory) (Pro)"
---

# Categories row

Catalog navigation: child categories of a parent with thumbnail and link.

<!-- ![Categories row](/components/pagebuilder/screenshots/sections/categories_row.png) -->

::: info
Requires PageBuilder Pro and miniShop3.
:::

## Why this section

- Subcategories from msCategory via pdoResources
- Catalog navigation without hand-built menus
- Thumbnails and links from resources

## When to use

- **Catalog homepage** — top sections
- **Parent category page** — subcategories
- **Landing** — department showcase

## Page examples

- Catalog: [Hero](hero) → [Categories row](categories_row) → [Products grid](products_grid)
- Homepage: [Categories row](categories_row) → [Promo banner](promo_banner)

## Inspector tips

**Parent category** and **Limit**. Resources must be msCategory.

## Similar sections

- [Products grid](products_grid) after category pick
- [Cards](cards) for static sections without MS3

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `categories_row` |
| Layer | Pro |
| Category | commerce (`commerce`) |
| Chunk | `pagebuilderpro_categories_row` |
| Requires | pro, minishop3 |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Parent category (`parent`)

Type [relation](../fields/relation#output-in-section-data). Required. Pick one MODX resource in a search modal.

### Limit (`limit`)

Type [number](../fields/number#output-in-section-data). Optional.

## Site output

Horizontal `pb-categories-row`.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "limit": 6
}
```

## Chunk template

Fenom chunk `pagebuilderpro_categories_row`:

```fenom
{var $catalogParent = $parent.id|default:($parent_id|default:0)}
{var $listing = ''}
{if $catalogParent}
  {var $listing = $modx->runSnippet('pdoResources', [
    'parents' => $catalogParent,
    'depth' => 1,
    'limit' => $limit|default:8,
    'where' => ['class_key' => 'MiniShop3\\Model\\msCategory'],
    'tpl' => 'pagebuilderpro_ms3_category_row'
  ])}
{/if}
<section class="pb-section pb-section--categories-row pb-categories-row{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="categories_row"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-categories-row__inner">
    {if $title}
      <h2 class="pb-heading">{$title|escape}</h2>
    {/if}
    {if $listing}
      <div class="pb-categories-row__grid pb-grid">
        {$listing}
      </div>
    {else}
      <p class="pb-listing__empty">В этой категории нет подразделов.</p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/categories_row.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
