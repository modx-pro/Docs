---
title: "ace"
description: "Source code string with Ace highlighting in the inspector"
---

# Field ace

Version: **Free**.

<!-- ![ace](/components/pagebuilder/screenshots/fields/ace.png) -->

## Why this type

Full control over HTML, CSS, or JSON. Mode via `mode` (html, css, javascript, json). No WYSIWYG when you need exact markup.

## When to use

- Custom section markup maintained by a developer
- SVG snippet or inline styles
- JSON or config the chunk parses itself

## Tips

Content editors usually prefer [richtext](richtext). Do not escape HTML in the chunk when you output markup intentionally.

## Similar types

- [richtext](richtext) for WYSIWYG without code
- [editorjs](editorjs) for block content with html on save

## Schema

```json
{
  "name": "markup",
  "type": "ace",
  "label": "Markup",
  "mode": "html",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Source code string.

## Section data {#output-in-section-data}

Key `markup` in the section data:

```json
{
  "markup": "<section class=\"hero\">\n  …\n</section>"
}
```

## Chunk example

```fenom
{$markup}
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

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
