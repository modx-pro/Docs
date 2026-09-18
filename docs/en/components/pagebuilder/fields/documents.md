---
title: "documents"
description: "A list of files with titles. Pro layer."
---

# Field documents

Version: **Pro** (`advanced-fields`).

A list of `{ title, file }` rows. The inspector does not save empty rows. `file` is a media value, same as [file](file).

## Schema

```json
{
  "name": "files",
  "type": "documents",
  "label": "Documents"
}
```

## Section data {#output-in-section-data}

```json
{
  "files": [
    { "title": "Price list", "file": "/assets/files/price.pdf" }
  ]
}
```

## Chunk example

```html
{foreach $files as $row}
  <a href="{$row.file|escape}">{$row.title|escape}</a>
{/foreach}
```

## Similar types

- [file](file) for one file
- The [Downloads](../sections/downloads) section for a ready-made block
