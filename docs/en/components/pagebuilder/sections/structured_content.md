---
title: "Structured content"
description: "Editor.js content: headings, lists, quotes, media (Pro)"
---

# Structured content

Alternative to **Rich text** for long reads. Block editor: H2–H4, lists, quotes, inline images.

<!-- ![Structured content](/components/pagebuilder/screenshots/sections/structured_content.png) -->

::: info
Requires PageBuilder Pro.
:::

## Editor.js instead of richtext

- Editor.js blocks: headings, lists, quotes without hand HTML
- JSON in the section data, HTML from chunk on output
- Better than richtext for long posts

## Long-form content

- Blog post inside page builder
- Longread on a landing page
- News with rich layout without hand-written HTML

## Page examples

- Blog post in page builder: [Hero](hero) → [Structured content](structured_content) → [CTA](cta)
- News: [Structured content](structured_content) → [Gallery](gallery)

## Editor.js field

**editorjs** stores block JSON. The chunk renders HTML inside `.pb-richtext__content`.

## Similar sections

- [Rich text](richtext) for short HTML snippets
- [Tabs](tabs) to split topics, not linear longreads

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `structured_content` |
| Layer | Pro |
| Category | content (`content`) |
| Chunk | `pagebuilderpro_structured_content` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Content (`body`)

Type [editorjs](../fields/editorjs#output-in-section-data). Required. Block editor. Site output is HTML.

## Site output

HTML from `editorjs` inside `.pb-richtext__content`.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Section title",
  "body": {
    "json": {},
    "html": "<p>Structured Editor.js content</p>"
  }
}
```

## Chunk template

Fenom chunk `pagebuilderpro_structured_content`:

```fenom
{var $bodyHtml = ''}
{if $body is array}
  {var $bodyHtml = $body.html|default:''}
{else}
  {var $bodyHtml = $body}
{/if}
<section class="pb-section pb-section--structured-content pb-structured-content pb-richtext{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="structured_content"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-structured-content__inner pb-richtext__inner">
    {if $title}
      <h2 class="pb-heading pb-structured-content__title">{$title|escape}</h2>
    {/if}
    {if $bodyHtml}
      <div class="pb-richtext__content pb-structured-content__body">
        {$bodyHtml}
      </div>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/structured_content.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
