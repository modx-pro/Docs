---
title: "richtext"
description: "HTML string from the familiar MODX richtext editor"
---

# Field richtext

Version: **Free**.

<!-- ![richtext](/components/pagebuilder/screenshots/fields/richtext.png) -->

## Why this type

- Same WYSIWYG as a MODX resource field, no separate TV
- Links, lists, and basic formatting built in
- Chunk outputs ready HTML; no block parsing

## When to use

- Main section copy with paragraphs and links
- FAQ answers with bold text and lists
- Content where editors should not write markup by hand

## Tips

- Editor.js blocks need [editorjs](editorjs)
- Raw HTML or CSS belongs in [ace](ace)

## Similar types

- [editorjs](editorjs) for structured blocks with json and html
- [textarea](textarea) for plain text without tags

## Schema

```json
{
  "name": "content",
  "type": "richtext",
  "label": "Text",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

HTML string.

## Section data {#output-in-section-data}

Key `content` in the section data:

```json
{
  "content": "<p>Text with <strong>markup</strong>.</p>"
}
```

## Chunk example

```html
<div class="pb-richtext__content">{$content}</div>
```

## Notes

Pro: `responsive`.

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
