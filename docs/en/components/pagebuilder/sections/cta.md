---
title: "Call to action"
description: "Compact block with title, text, and a single button"
---

# Call to action

A short accent block in the middle or at the end of the page. Title, supporting text, and one button with a URL.

<!-- ![Call to action](/components/pagebuilder/screenshots/sections/cta.png) -->

## Why this section

- Few fields: title, text, one button
- Closes the funnel without repeating hero
- `pb-cta` class ships with the package theme

## When to use

- **End of landing** before the footer
- **Newsletter** or demo signup
- **Link to catalog** or pricing page

## Page examples

- Landing: … → [Testimonials](testimonials) → [CTA](cta) → [Contact](contact)
- Blog: [Blog posts](blog_posts) → [CTA](cta) for newsletter

## Inspector tips

The button is hidden without a URL. Set both label and link.

## Similar sections

- [Hero](hero) for above-the-fold with background
- [Contact form](contact_form) when you need fields, not a single link

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `cta` |
| Layer | Free |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilder_cta` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Required.

### Text (`text`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Button label (`button_label`)

Type [text](../fields/text#output-in-section-data). Required.

### Button URL (`button_url`)

Type [url](../fields/url#output-in-section-data). Required.

## Site output

`pb-cta` with a `pb-button` link.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action"
}
```

## Chunk template

Fenom chunk `pagebuilder_cta`:

```fenom
<section class="pb-section pb-section--cta pb-cta{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="cta"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-cta__inner">
    <h2 class="pb-heading pb-cta__title">{$title|escape}</h2>
    {if $text}
      <p class="pb-cta__text">{$text|escape}</p>
    {/if}
    {if $button_label && $button_url}
      <div class="pb-cta__actions">
        <a class="pb-cta__button pb-button" href="{$button_url|escape:'url'}">{$button_label|escape}</a>
      </div>
    {/if}
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/cta.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
