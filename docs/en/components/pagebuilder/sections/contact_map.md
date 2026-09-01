---
title: "Contact with map"
description: "Phone, email, text, button, and map in one block (Pro)"
---

# Contact with map

Combines **Contact** and **Map**: contacts and CTA beside the map iframe.

<!-- ![Contact with map](/components/pagebuilder/screenshots/sections/contact_map.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why combine contacts and map

- Phone, email, and map in one viewport
- Fewer sections than Contact + Map separately
- One chunk for a standard contact page

## Where to place

- Contact page: full block
- Landing footer with address
- Branch page

## Page examples

- Contact page: [Hero](hero) → [Contact map](contact_map) → [FAQ](faq)
- Landing: [CTA](cta) → [Contact map](contact_map)

## Contacts and map point

Fill contact fields and **Location** on the map. One block instead of two sections.

## Similar sections

- [Contact](contact) + [Map](map) for custom layout order
- [Contact form](contact_form) nearby for leads

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `contact_map` |
| Layer | Pro |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilderpro_contact_map` |
| Requires | pro |

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

### Map (`location`)

Type [map](../fields/map#output-in-section-data). Required. Map pin. Site output is iframe via MapEmbedResolver.

### Button label (`button_label`)

Type [text](../fields/text#output-in-section-data). Optional.

### Button URL (`button_url`)

Type [url](../fields/url#output-in-section-data). Optional.

## Site output

`pb-contact-map`: contacts + map iframe.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "text": "Supporting text under the title.",
  "phone": "+7 (999) 123-45-67",
  "email": "hello@example.com",
  "location": {
    "lat": 55.751244,
    "lng": 37.618423,
    "embed_url": "https://yandex.ru/map-widget/v1/..."
  },
  "button_label": "Learn more",
  "button_url": "https://example.com/action"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_contact_map`:

```fenom
<section class="pb-section pb-section--contact-map pb-contact-map{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact_map"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact-map__inner">
    {if $title}
      <h2 class="pb-heading pb-contact-map__title">{$title|escape}</h2>
    {/if}
    <div class="pb-contact-map__layout">
      <div class="pb-contact-map__details">
        {if $text}
          <p class="pb-contact-map__text">{$text|escape}</p>
        {/if}
        {if $phone}
          <p class="pb-contact-map__phone"><a href="tel:{$phone|escape:'url'}">{$phone|escape}</a></p>
        {/if}
        {if $email}
          <p class="pb-contact-map__email"><a href="mailto:{$email|escape:'url'}">{$email|escape}</a></p>
        {/if}
        {if $button_label && $button_url}
          <a class="pb-contact-map__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
        {/if}
      </div>
      {if $map_embed_url}
        <div class="pb-contact-map__map">
          <iframe
            class="pb-contact-map__frame"
            title="{$title|default:'Map'|escape}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="{$map_embed_url|escape}"
          ></iframe>
        </div>
      {/if}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/contact_map.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
