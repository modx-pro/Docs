---
title: "textarea"
description: "Multi-line plain text without HTML"
---

# Field textarea

Layer: **Free**.

<!-- ![textarea](/components/pagebuilder/screenshots/fields/textarea.png) -->

## Why this type

Several lines with no accidental HTML markup. Better than text for descriptions and quotes. Simpler than richtext when formatting is optional.

## When to use

- Lead paragraph or short blurb without lists
- FAQ answer when HTML is not required
- Editor note or internal comment

## Tips

Long formatted copy belongs in [richtext](richtext) or [editorjs](editorjs). Pro: `responsive` behaves like text.

## Similar types

- [text](text) for a single line
- [richtext](richtext) for MODX HTML output

## Schema

```json
{
  "name": "intro",
  "type": "textarea",
  "label": "Intro text",
  "rows": 6,
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Multi-line string.

## Section data {#output-in-section-data}

Key `intro` in the section data:

```json
{
  "intro": "First paragraph.\nSecond paragraph."
}
```

## Chunk example

```fenom
{if $intro}
  <p class="intro">{$intro|escape|nl2br}</p>
{/if}
```

## Notes

Height: `rows` or `height` in schema. Pro: `responsive`.

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
