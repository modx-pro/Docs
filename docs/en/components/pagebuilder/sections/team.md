---
title: "Team"
description: "Team cards with photo, name, role, and bio (Pro)"
---

# Team

Team block: photo, name, role, and short bio. Multiple members render in a grid.

<!-- ![Team](/components/pagebuilder/screenshots/sections/team.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Photo and role in a consistent card
- Repeater adds people without template edits
- Separate from [Testimonials](testimonials) (staff vs clients)

## When to use

- **About page**
- **Agency landing** — people behind the project
- **Conference** — speakers

## Page examples

- About: [Hero](hero) → [Rich text](richtext) → [Team](team) → [CTA](cta)
- Event: [Team](team) → [FAQ](faq) → [Contact with map](contact_map)

## Inspector tips

**Members** repeater. **Photo** for avatar; bio is textarea or richtext per section JSON.

## Similar sections

- [Testimonials](testimonials) for client quotes
- [Cards](cards) for text-only roles

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `team` |
| Layer | Pro |
| Category | social proof (`social`) |
| Chunk | `pagebuilderpro_team` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Members (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `photo` | [image](../fields/image#output-in-section-data) | Photo | no |
| `name` | [text](../fields/text#output-in-section-data) | Name | yes |
| `role` | [text](../fields/text#output-in-section-data) | Role | no |
| `bio` | [textarea](../fields/textarea#output-in-section-data) | Bio | no |

## Site output

`pb-team` grid with photos and text.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "photo": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "name": "Иван Петров",
      "role": "Директор, ООО Пример",
      "bio": "15 лет в отрасли, ведёт ключевые проекты компании."
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_team`:

```fenom
<section class="pb-section pb-section--team pb-team{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="team"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-team__inner">
    {if $title}
      <h2 class="pb-heading pb-team__title">{$title|escape}</h2>
    {/if}
    <div class="pb-team__grid">
      {foreach $items as $item}
        <article class="pb-team__item">
          {if $item.photo}
            {include 'pagebuilder_partial_image' image=$item.photo alt=$item.name class='pb-team__photo'}
          {/if}
          <h3 class="pb-team__name">{$item.name|escape}</h3>
          {if $item.role}
            <div class="pb-team__role">{$item.role|escape}</div>
          {/if}
          {if $item.bio}
            <p class="pb-team__bio">{$item.bio|escape}</p>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/team.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
