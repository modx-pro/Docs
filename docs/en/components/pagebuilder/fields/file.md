---
title: "file"
description: "File media object after enrich on save draft"
---

# Field file

Version: **Free**.

<!-- ![file](/components/pagebuilder/screenshots/fields/file.png) -->

## Why this type

Enrich adds filename, extension, size, url. Fits PDF, archives, not only images. Same media pipeline as image.

## When to use

- PDF price list, deck, downloadable asset
- Attachment in contact or CTA
- Any file from MODX media

## Tips

In chunk use `{$file.url}`, not raw path. Photos alone often use [image](image).

## Similar types

- [image](image) for photos with alt and dimensions
- [url](url) for external link without upload

## Schema

```json
{
  "name": "pdf",
  "type": "file",
  "label": "File",
  "description": "PDF or another document",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Media object: `url`, `size`, `title`, `name`, `filename`, `extension`, `type`, and more. A legacy string on read is wrapped as `{ url }`.

## Section data {#output-in-section-data}

Key `pdf` in the section data after save enrich (`MediaFieldEnricher`):

```json
{
  "pdf": {
    "url": "assets/files/catalog.pdf",
    "id": 34,
    "path": "assets/files/",
    "filename": "catalog.pdf",
    "extension": "pdf",
    "name": "catalog",
    "title": "catalog.pdf",
    "size": 1048576,
    "type": "pdf"
  }
}
```

- A legacy URL string is normalized to `{ url }` on read.

## Chunk example

```html
<a href="{$pdf.url|escape}" download="{$pdf.title|escape}">{$pdf.title|escape}</a>
```

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25–100 | Field width as % of the row (flex) | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |

- Also in schema: media object, enrich on save.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
