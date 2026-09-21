---
title: "Downloads"
description: "File list with title and description. Pro layer."
---

# Downloads

Section `downloads` lists files from a repeater. Chunk: `pagebuilderpro_downloads`. Requires PageBuilder Pro.

![Downloads](/components/pagebuilder/screenshots/sections/downloads.jpg)

The `file` field exposes the media record `url` on the site.

## Where it fits

- Price list, deck, or manual
- Product documents
- Files under a service description

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `items` | repeater | yes | Files |
| `items.title` | text | yes | Name |
| `items.file` | file | yes | File |
| `items.description` | textarea | no | Description |

## Render

The list is `ul.pb-downloads__list`. `file` may be a string or an object with `url`. When the URL is empty, the title stays a `<span>`, not a link. An empty repeater leaves an empty list.

## Section data {#output-in-section-data}

```json
{
  "title": "Files",
  "items": [
    {
      "title": "Price list",
      "file": { "url": "assets/files/price.pdf" },
      "description": "PDF, 1 MB"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilderpro_downloads`:

```fenom
<section class="pb-section pb-section--downloads pb-downloads{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="downloads"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <ul class="pb-downloads__list">
      {foreach $items as $item}
        {set $fileUrl = is_array($item.file) ? ($item.file.url ?: '') : ($item.file ?: '')}
        <li class="pb-downloads__item">
          {if $fileUrl}
            <a href="{$fileUrl|escape}">{$item.title|escape}</a>
          {else}
            <span>{$item.title|escape}</span>
          {/if}
          {if $item.description}<p>{$item.description|escape}</p>{/if}
        </li>
      {/foreach}
    </ul>
  </div>
</section>
```

## Similar sections

- [Rich text](richtext) when one file is a link inside text

## Related pages

- [Section catalog](index)
