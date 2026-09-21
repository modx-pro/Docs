---
title: "How it works"
description: "Steps with title, text, and icon. Pro layer."
---

# How it works

Section `how_it_works` lists steps from a repeater. Chunk: `pagebuilderpro_how_it_works`. Requires PageBuilder Pro.

![How it works](/components/pagebuilder/screenshots/sections/how_it_works.jpg)

## Where it fits

- Order or onboarding flow
- Three or four steps under the hero
- A service explanation without dates

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `intro` | textarea | no | Intro |
| `steps` | repeater | yes | Steps |
| `steps.title` | text | yes | Step title |
| `steps.text` | textarea | no | Text |
| `steps.icon` | image | no | Icon |

## Render

Steps sit in an `<ol>`. The number is the row index plus 1, with `aria-hidden="true"`. Field `icon` is type `image`, not [icon](../fields/icon). The picture goes through `pagebuilder_partial_image`. An empty repeater leaves an empty list. `intro` prints only when set.

## Section data {#output-in-section-data}

```json
{
  "title": "How to order",
  "intro": "Three steps",
  "steps": [
    {
      "title": "Pick",
      "text": "Add a product",
      "icon": { "url": "assets/images/step.png" }
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_how_it_works`:

```fenom
<section class="pb-section pb-section--how-it-works pb-how-it-works{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="how_it_works"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $intro}<p class="pb-how-it-works__intro">{$intro|escape}</p>{/if}
    <ol class="pb-how-it-works__steps">
      {foreach $steps as $step}
        <li class="pb-how-it-works__step">
          <span class="pb-how-it-works__num" aria-hidden="true">{$step@index + 1}</span>
          {if $step.icon}{include 'pagebuilder_partial_image' image=$step.icon alt=$step.title class='pb-how-it-works__icon'}{/if}
          <h3>{$step.title|escape}</h3>
          {if $step.text}<p>{$step.text|escape}</p>{/if}
        </li>
      {/foreach}
    </ol>
  </div>
</section>
```

## Similar sections

- [Timeline](timeline) when steps have dates
- [Features](features) for items without order

## Related pages

- [Section catalog](index)
