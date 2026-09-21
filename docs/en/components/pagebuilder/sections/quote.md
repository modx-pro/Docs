---
title: "Quote"
description: "A quote with author, role, and avatar. Pro layer."
---

# Quote

Section `quote` shows one quote. Chunk: `pagebuilderpro_quote`. Requires PageBuilder Pro.

![Quote](/components/pagebuilder/screenshots/sections/quote.jpg)

## Where it fits

- A highlighted client line
- An article epigraph
- One recommendation without team cards

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `text` | textarea | yes | Quote text |
| `author` | text | no | Author |
| `role` | text | no | Role |
| `avatar` | image | no | Avatar |

## Render

The root is a `<figure>`. The quote sits in a `<blockquote>`. The `figcaption` appears when `author`, `role`, or `avatar` is set. The avatar goes through `pagebuilder_partial_image`. Empty `text` fails publish: the field is required.

## Section data {#output-in-section-data}

```json
{
  "text": "We built the page in a day",
  "author": "Anna",
  "role": "Editor",
  "avatar": { "url": "assets/images/anna.jpg" }
}
```

## Chunk template

Fenom chunk `pagebuilderpro_quote`:

```fenom
<figure class="pb-section pb-section--quote pb-quote{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="quote"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    <blockquote class="pb-quote__text">
      <p>{$text|escape}</p>
    </blockquote>
    {if $author || $role || $avatar}
      <figcaption class="pb-quote__meta">
        {if $avatar}{include 'pagebuilder_partial_image' image=$avatar alt=$author class='pb-quote__avatar'}{/if}
        <div>
          {if $author}<cite class="pb-quote__author">{$author|escape}</cite>{/if}
          {if $role}<span class="pb-quote__role">{$role|escape}</span>{/if}
        </div>
      </figcaption>
    {/if}
  </div>
</figure>
```

## Similar sections

- [Testimonials](testimonials) for several reviews
- [Team](team) for staff cards

## Related pages

- [Section catalog](index)
