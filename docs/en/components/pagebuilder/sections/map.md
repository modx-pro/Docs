---
title: "Map"
description: "Map embed by coordinates (Yandex Maps by default) (Pro)"
---

# Map

A map pin from coordinates or address. `MapEmbedResolver` builds the iframe; default provider is Yandex Maps.

<!-- ![Map](/components/pagebuilder/screenshots/sections/map.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Coordinates in map field, resolver builds iframe
- Yandex Maps by default, provider swappable in package code
- Separate from contact copy

## When to use

- **Contacts** — office or showroom
- **Delivery** — coverage anchor point
- **Event** — venue

## Page examples

- Contacts: [Contact](contact) → [Map](map)
- Branch: [Hero](hero) → [Map](map) → [FAQ](faq)

## Inspector tips

**Location** map field: coordinates and zoom. Section title is optional.

## Similar sections

- [Contact with map](contact_map) for a combined block
- Static [Image](image) when interactivity is not needed

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `map` |
| Layer | Pro |
| Category | media (`media`) |
| Chunk | `pagebuilderpro_map` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Map (`location`)

Type [map](../fields/map#output-in-section-data). Required. Map pin. Site output is iframe via MapEmbedResolver.

## Site output

Iframe inside `pb-map`.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "location": {
    "lat": 55.751244,
    "lng": 37.618423,
    "embed_url": "https://yandex.ru/map-widget/v1/..."
  }
}
```

## Chunk template

Fenom chunk `pagebuilderpro_map`:

```fenom
<section class="pb-section pb-section--map pb-map{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="map"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-map__inner">
    {if $title}
      <h2 class="pb-heading pb-map__title">{$title|escape}</h2>
    {/if}
    {if $map_embed_url}
      <div class="pb-map__embed">
        <iframe
          class="pb-map__frame"
          title="{$title|default:'Map'|escape}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          src="{$map_embed_url|escape}"
        ></iframe>
      </div>
    {elseif $map_watch_url}
      <p><a class="pb-button" href="{$map_watch_url|escape}">Открыть карту</a></p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/map.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
