---
title: "heading"
description: "Decorative field group heading with no section data key"
---

# Field heading

Version: **Free**.

<!-- ![heading](/components/pagebuilder/screenshots/fields/heading.png) -->

## Why this type

Breaks long inspector into blocks. No key in the section data. Tab and width work like normal fields.

## When to use

- Label "Button", "SEO", "Media" between fields
- Visual divider without fieldset (Pro)
- In-form docs via label text

## Tips

Name can be technical, e.g. `_h`. Nested fields with legend use [fieldset](fieldset) (Pro).

## Similar types

- [fieldset](fieldset) for legend and nested fields (Pro)
- [dependent](dependent) marker for showWhen blocks (Pro)

## Schema

```json
{
  "name": "_h",
  "type": "heading",
  "label": "Field group",
  "tab": "Content",
  "width": 100
}
```

## Value

Not stored in the section data.

## Section data {#output-in-section-data}

Not stored in the section data.

## Chunk example

Not used in the chunk.

## Common properties

The value is **not** stored in the section data.

| Key | Role | CMP |
| --- | --- | --- |
| `tab` | Group in the inspector | yes |
| `width` | Label width, 25–100 (%) | yes |
| `label` | Subtitle / marker text | yes |

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
