---
title: "Portfolio"
description: "Project cards with image, link, and text. Pro layer."
---

# Portfolio

Section `portfolio` shows projects from a repeater. Chunk: `pagebuilderpro_portfolio`. Requires PageBuilder Pro.

![Portfolio](/components/pagebuilder/screenshots/sections/portfolio.jpg)

## Where it fits

- Studio work
- Cases without a page per project
- A set of covers with links

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Projects |
| `items.image` | image | no | Cover |
| `items.title` | text | yes | Name |
| `items.url` | url | no | Link |
| `items.text` | textarea | no | Short text |

## Render

Cards sit in `div.pb-grid.pb-grid--cards`. The image goes through chunk `pagebuilder_partial_image` only when `image` is set. A link is drawn when `url` is set. The link text is `title`. An empty repeater leaves an empty grid.

## Section data {#output-in-section-data}

```json
{
  "title": "Work",
  "items": [
    {
      "image": { "url": "assets/images/case.jpg" },
      "title": "Storefront",
      "url": "/cases/store",
      "text": "A miniShop3 catalog"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_portfolio`:

```fenom
<section class="pb-section pb-section--portfolio pb-portfolio{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="portfolio"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <div class="pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-portfolio__item">
          {if $item.image}{include 'pagebuilder_partial_image' image=$item.image alt=$item.title class='pb-portfolio__image'}{/if}
          <h3>{$item.title|escape}</h3>
          {if $item.text}<p>{$item.text|escape}</p>{/if}
          {if $item.url}<p><a href="{$item.url|escape}">{$item.title|escape}</a></p>{/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## Similar sections

- [Gallery](gallery) when you only need frames
- [Case study](case_study) for one story with a result

## Related pages

- [Section catalog](index)
