---
title: "Timeline"
description: "Events with date, title, and text. Pro layer."
---

# Timeline

Section `timeline` lists events in repeater order. Chunk: `pagebuilderpro_timeline`. Requires PageBuilder Pro.

![Timeline](/components/pagebuilder/screenshots/sections/timeline.jpg)

## Where it fits

- Company or product history
- Project stages
- Release dates

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Events |
| `items.date` | text | yes | Date |
| `items.title` | text | yes | Event title |
| `items.text` | textarea | no | Text |

## Render

The chunk builds `<ol class="pb-timeline__list">`. An empty `items` list stays empty. There is no fallback sentence. Date and title are required. Row text is printed only when it is set.

## Section data {#output-in-section-data}

```json
{
  "title": "History",
  "items": [
    { "date": "2019", "title": "Start", "text": "First office" }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_timeline`:

```fenom
<section class="pb-section pb-section--timeline pb-timeline{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="timeline"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <ol class="pb-timeline__list">
      {foreach $items as $item}
        <li>
          <p class="pb-timeline__date">{$item.date|escape}</p>
          <h3>{$item.title|escape}</h3>
          {if $item.text}<p>{$item.text|escape}</p>{/if}
        </li>
      {/foreach}
    </ol>
  </div>
</section>
```

## Similar sections

- [How it works](how_it_works) for steps without dates
- [Case study](case_study) for one story

## Related pages

- [Section catalog](index)
