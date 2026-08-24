---
title: "Contact"
description: "Phone, email, text, and button without a map"
---

# Contact

Simple contact block: clickable phone and email (`tel:` / `mailto:`), optional short text and button.

<!-- ![Contact](/components/pagebuilder/screenshots/sections/contact.png) -->

## Why this section

- Phone and email tap-to-call on mobile
- No form when direct contact is enough
- Smaller footprint than [Contact with map](contact_map)

## When to use

- **Landing footer** — how to reach you
- **Contact page** when you do not need a map
- **Next to a form** — alternate contact channel

## Page examples

- Landing: … → [CTA](cta) → [Contact](contact)
- Service one-pager: [FAQ](faq) → [Contact](contact)

## Inspector tips

Fill at least **Phone** or **Email**. The button behaves like the CTA section.

## Similar sections

- [Contact with map](contact_map) when you need a map pin
- [Contact form](contact_form) for multi-field leads

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `contact` |
| Layer | Free |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilder_contact` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Text (`text`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Phone (`phone`)

Type [text](../fields/text#output-in-section-data). Optional.

### Email (`email`)

Type [text](../fields/text#output-in-section-data). Optional.

### Button label (`button_label`)

Type [text](../fields/text#output-in-section-data). Optional.

### Button URL (`button_url`)

Type [url](../fields/url#output-in-section-data). Optional.

## Site output

`pb-contact` with tel:/mailto: links and optional CTA button.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "phone": "+7 (999) 123-45-67",
  "email": "hello@example.com",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action"
}
```

## Chunk template

Fenom chunk `pagebuilder_contact`:

```fenom
<section class="pb-section pb-section--contact pb-contact{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact__inner">
    {if $title}
      <h2 class="pb-heading pb-contact__title">{$title|escape}</h2>
    {/if}
    {if $text}
      <p class="pb-contact__text">{$text|escape}</p>
    {/if}
    <div class="pb-contact__details">
      {if $phone}
        <a class="pb-contact__link pb-contact__phone" href="tel:{$phone|escape:'url'}">{$phone|escape}</a>
      {/if}
      {if $email}
        <a class="pb-contact__link pb-contact__email" href="mailto:{$email|escape:'url'}">{$email|escape}</a>
      {/if}
    </div>
    {if $button_label && $button_url}
      <div class="pb-contact__actions">
        <a class="pb-contact__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
      </div>
    {/if}
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/contact.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
