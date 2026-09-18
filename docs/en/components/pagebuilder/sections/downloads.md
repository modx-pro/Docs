---
title: "Downloads"
description: "File list with title and description. Pro layer."
---

# Downloads

Section `downloads` lists files from a repeater. Chunk: `pagebuilderpro_downloads`. Requires PageBuilder Pro.

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

## Similar sections

- [Rich text](richtext) when one file is a link inside text

## Related pages

- [Section catalog](index)
