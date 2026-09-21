---
title: "Before / After"
description: "Two images with before and after labels. Pro layer."
---

# Before / After

Section `before_after` places two frames side by side. Chunk: `pagebuilderpro_before_after`. Requires PageBuilder Pro. Category: media.

![Before / After](/components/pagebuilder/screenshots/sections/before_after.jpg)

## Where it fits

- Renovation, retouch, or clinical result
- Two states of the same object

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Title |
| `before_label` | text | no | Before label |
| `before_image` | image | yes | Before frame |
| `after_label` | text | no | After label |
| `after_image` | image | yes | After frame |
| `caption` | textarea | no | Shared caption |

## Render

Two columns, `figure.pb-before-after__panel`. There is no slider and no JavaScript. Images go through `pagebuilder_partial_image`. When a label is empty, alt is `Before` or `After`. `caption` prints under the grid only when set.

## Section data {#output-in-section-data}

```json
{
  "title": "Renovation",
  "before_label": "Before",
  "before_image": { "url": "assets/images/before.jpg" },
  "after_label": "After",
  "after_image": { "url": "assets/images/after.jpg" },
  "caption": "Three weeks"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_before_after`:

```fenom
<section class="pb-section pb-section--before-after pb-before-after{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="before_after"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <div class="pb-before-after__grid">
      <figure class="pb-before-after__panel">
        {if $before_label}<figcaption>{$before_label|escape}</figcaption>{/if}
        {include 'pagebuilder_partial_image' image=$before_image alt=($before_label ?: 'Before') class='pb-before-after__image'}
      </figure>
      <figure class="pb-before-after__panel">
        {if $after_label}<figcaption>{$after_label|escape}</figcaption>{/if}
        {include 'pagebuilder_partial_image' image=$after_image alt=($after_label ?: 'After') class='pb-before-after__image'}
      </figure>
    </div>
    {if $caption}<p class="pb-before-after__caption">{$caption|escape}</p>{/if}
  </div>
</section>
```

## Similar sections

- [Gallery](gallery) for several frames without a pair
- [Media + text](media_split) for one image and text

## Related pages

- [Section catalog](index)
