---
title: "Video"
description: "Embed a video by URL (YouTube, Vimeo, Rutube) (Pro)"
---

# Video

Responsive iframe from a video link. Common hosts are supported; `VideoEmbedResolver` parses the URL.

<!-- ![Video](/components/pagebuilder/screenshots/sections/video.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Paste URL instead of embed HTML in richtext
- `VideoEmbedResolver` builds iframe for YouTube, Vimeo, Rutube
- Responsive wrapper in chunk

## When to use

- **Product overview** on the homepage
- **How-to** on support
- **Promo clip** on a landing page

## Page examples

- Product: [Hero](hero) → [Video](video) → [Features](features)
- Tutorial: [Rich text](richtext) → [Video](video) → [FAQ](faq)

## Inspector tips

Paste the full **Video URL** from the browser bar, not embed HTML. Section title is optional.

## Similar sections

- [Hero](hero) with background image when video is overkill
- [Structured content](structured_content) for inline media in articles

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `video` |
| Layer | Pro |
| Category | media (`media`) |
| Chunk | `pagebuilderpro_video` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Video URL (`video`)

Type [video](../fields/video#output-in-section-data). Required. Video URL. Site output is embed via VideoEmbedResolver.

## Site output

Iframe inside `pb-video`. Aspect ratio comes from theme CSS.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "video": {
    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "embed_url": "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "provider": "youtube"
  }
}
```

## Chunk template

Fenom chunk `pagebuilderpro_video`:

```fenom
<section class="pb-section pb-section--video pb-video{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="video"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-video__inner">
    {if $title}
      <h2 class="pb-heading pb-video__title">{$title|escape}</h2>
    {/if}
    {if $video_provider}
      {var $providerLabel = $video_provider == 'youtube' ? 'YouTube' : ($video_provider == 'vimeo' ? 'Vimeo' : ($video_provider == 'rutube' ? 'Rutube' : $video_provider))}
      <p class="pb-video__provider">{$providerLabel|escape}</p>
    {/if}
    {if $video_embed_url}
      <div class="pb-video__embed">
        <iframe src="{$video_embed_url|escape}" title="{$title|default:'Video'|escape}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
      </div>
    {elseif $video_watch_url}
      <p><a class="pb-button" href="{$video_watch_url|escape}">Смотреть видео</a></p>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/video.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
