---
title: "Rich text"
description: "HTML string from the familiar MODX richtext editor"
---

# Rich text

A text block between other sections. The editor works like MODX richtext: paragraphs, lists, links, basic formatting.

<!-- ![Rich text](/components/pagebuilder/screenshots/sections/richtext.png) -->

## When richtext is enough

- Familiar MODX richtext, no separate TV per paragraph
- Drops between any sections in any order
- HTML lands in `section.data.content` for Fenom output

## Scenarios

- Article or news post: main page body
- Service description between hero and features
- Legal copy, instructions, any content without custom markup

## Page examples

- Article: [Hero](hero) → [Rich text](richtext) → [Image](image) → [Rich text](richtext)
- About: [Hero](hero) → [Rich text](richtext) → [Team](team) → [CTA](cta)

## Content field

Content lives in **Content**. For long structured pages, consider **Structured content** (Editor.js, Pro).

## Similar sections

- [Structured content](structured_content) for long Editor.js posts (Pro)
- [Tabs](tabs) when content fits panels better

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `richtext` |
| Layer | Free |
| Category | content (`content`) |
| Chunk | `pagebuilder_richtext` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Content (`content`)

Type [richtext](../fields/richtext#output-in-section-data). Required.

## Site output

`pb-richtext` wrapper with HTML from `content`.

## Section data {#output-in-section-data}

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "content": "<p>Page text with <strong>formatting</strong>.</p>"
}
```

## Chunk template

Fenom chunk `pagebuilder_richtext`:

```fenom
<section class="pb-section pb-section--richtext pb-richtext{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="richtext"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-richtext__inner">
    <div class="pb-richtext__content">
      {$content}
    </div>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/richtext.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
