---
title: "Blog posts"
description: "Child resources of a parent page via pdoResources (Pro)"
---

# Blog posts

Automatic article feed: set blog parent, limit, and sort. Intros and thumbnails come from resources.

<!-- ![Blog posts](/components/pagebuilder/screenshots/sections/blog_posts.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Feed from child resources, no hand-rolled pdo in templates
- Limit and sort in inspector
- Intro and thumbnail toggles

## When to use

- **Blog homepage** — latest posts
- **Site homepage** — "From the blog" block
- **Landing** — three recent articles

## Page examples

- Homepage: [Hero](hero) → [Blog posts](blog_posts) → [CTA](cta)
- Blog section: [Blog posts](blog_posts) → [Contact](contact)

## Inspector tips

**Blog parent** — resource ID or picker. **Limit**, **Sort**, **Show intro** / **image** flags.

## Similar sections

- [Structured content](structured_content) for one article, not a list
- [Cards](cards) for static links without pdoResources

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `blog_posts` |
| Layer | Pro |
| Category | content (`content`) |
| Chunk | `pagebuilderpro_blog_posts` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Blog parent (`parent`)

Type [relation](../fields/relation#output-in-section-data). Required. Pick one MODX resource in a search modal.

### Limit (`limit`)

Type [number](../fields/number#output-in-section-data). Optional.

### Show intro (`show_intro`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle.

### Show image (`show_image`)

Type [yesno](../fields/yesno#output-in-section-data). Optional. Yes/no toggle.

### Sort (`sortby`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

### Layout (`layout`)

Type [select](../fields/select#output-in-section-data). Optional. Dropdown with predefined options.

## Site output

`pb-blog-posts` with article cards.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "parent": 101,
  "limit": 6,
  "show_intro": true,
  "show_image": true,
  "sortby": "menuindex",
  "layout": "grid"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_blog_posts`:

```fenom
<section class="pb-section pb-section--blog-posts pb-blog-posts pb-blog-posts--{$layout|default:'grid'|escape}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="blog_posts"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-blog-posts__inner">
    {if $title}
      <h2 class="pb-heading pb-blog-posts__title">{$title|escape}</h2>
    {/if}
    <div class="pb-blog-posts__listing">
      {var $includeTvs = ($show_image|default:0) ? 'image' : ''}
      {$modx->runSnippet('pdoResources', [
        'parents' => $parent.id|default:($parent_id|default:0),
        'depth' => 1,
        'limit' => $limit|default:6,
        'sortby' => $blog_sortby|default:'publishedon',
        'sortdir' => $blog_sortdir|default:'DESC',
        'includeContent' => $show_intro|default:0,
        'includeTVs' => $includeTvs,
        'tpl' => 'pagebuilderpro_blog_post_row'
      ])}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/blog_posts.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
