---
title: "Spacer"
description: "Vertical gap between sections with no visible content"
---

# Spacer

An empty section with fixed height. Use it when neighboring blocks feel cramped.

<!-- ![Spacer](/components/pagebuilder/screenshots/sections/spacer.png) -->

## Why this section

- Page rhythm without empty divs in templates
- Four heights out of the box (`sm`–`xl`)
- Section order stays clean when editors change content

## When to use

- **After hero** — separate the first screen from body content
- **After a dense grid** of cards or gallery
- **Before footer** — space after the last CTA

## Page examples

- [Hero](hero) → [Spacer](spacer) → [Cards](cards)
- Dense [Gallery](gallery) → [Spacer](spacer) → [CTA](cta)

## Inspector tips

Pick **Size** (`sm`, `md`, `lg`, `xl`). No other fields.

## Similar sections

- Theme CSS spacing for site-wide pixel control
- [Rich text](richtext) if you need copy between blocks

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `spacer` |
| Layer | Free |
| Category | layout (`layout`) |
| Chunk | `pagebuilder_spacer` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Size (`size`)

Type [select](../fields/select#output-in-section-data). Required. Dropdown with predefined options.

## Site output

`pb-spacer` with a size modifier.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "size": "sm"
}
```

## Chunk template

Fenom chunk `pagebuilder_spacer`:

```fenom
<div class="pb-spacer pb-spacer--{$size ?: 'md'}" aria-hidden="true"{if $id} id="pb-{$id|escape}"{/if}></div>
```

## JSON definition

`core/components/pagebuilder/sections/spacer.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
