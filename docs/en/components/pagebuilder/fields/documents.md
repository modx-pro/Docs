---
title: "documents"
description: "A list of files with titles. Pro layer."
---

# Field documents

Version: **Pro** (`advanced-fields`).

A list of `{ title, file }` rows. The inspector does not save empty rows. `file` is a media value, same as [file](file): an object with `url`, `filename`, and `title`, or a path string. In the chunk use `{$row.file.url}`.

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
    {
      "title": "Price list",
      "file": { "url": "/assets/files/price.pdf", "filename": "price.pdf" }
    }
  ]
}
```

## Chunk example

::: code-group

```modx
{foreach $files as $row}
  <a href="{$row.file.url|escape}">{$row.title}</a>
{/foreach}
```

```fenom
{foreach $files as $row}
  <a href="{$row.file.url|escape}">{$row.title|pb_text}</a>
{/foreach}
```

:::

## Similar types

- [file](file) for one file
- The [Downloads](../sections/downloads) section for a ready-made block
