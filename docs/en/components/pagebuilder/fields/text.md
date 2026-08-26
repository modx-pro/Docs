---
title: "text"
description: "Single-line text for titles and short labels"
---

# Field text

Layer: **Free**.

<!-- ![text](/components/pagebuilder/screenshots/fields/text.png) -->

## Why this type

- One string in the section data, predictable in Fenom and validation
- Pro supports `responsive` for desktop, tablet, and mobile
- Title or label without a full WYSIWYG editor

## When to use

- Section title, subtitle, or button label
- Short alt or caption next to an image
- Any value that fits on one line

## Tips

- Multi-line plain text belongs in [textarea](textarea)
- HTML goes in [richtext](richtext) or [editorjs](editorjs), not in text

## Similar types

- [textarea](textarea) for paragraphs without markup
- [slug](slug) for URLs derived from another field

## Schema

```json
{
  "name": "title",
  "type": "text",
  "label": "Title",
  "tab": "Content",
  "width": 100,
  "description": "Hint under the field",
  "default": "",
  "required": true,
  "active": true
}
```

## Value

String. In the example below the key is `title`.

## Section data {#output-in-section-data}

Key `title` in the section data:

```json
{
  "title": "Section title"
}
```

## Chunk example

```fenom
{$title|escape}
```

## Notes

Pro: `field.responsive` (desktop / tablet / mobile).

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

**Pro** (capability `responsive`): with `responsive: true`, the section data uses `desktop`, `tablet`, `mobile` keys instead of a scalar.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
