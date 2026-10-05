---
title: "editorjs"
description: "Editor.js object with json and rendered html"
---

# Field editorjs

Version: **Pro** (`advanced-fields`). A new field is created only in Pro. An already saved field still opens and writes.

<!-- ![editorjs](/components/pagebuilder/screenshots/fields/editorjs.jpg) -->

## Why this type

Text made of blocks: headings, lists, and embeds. The chunk can print ready HTML (`html`), or JSON (`json`) if you build the markup yourself. The block list is more predictable than free HTML.

## When to use

- Long article or block-based landing
- Content parsed from json later
- richtext alternative for block-first UX

## Tips

Chunk usually `{$body.html}`, not raw json. Simple HTML without blocks is faster in [richtext](richtext).

## Similar types

- [richtext](richtext) for classic WYSIWYG HTML
- [ace](ace) when a developer owns markup

## Schema

```json
{
  "name": "body",
  "type": "editorjs",
  "label": "Content",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ json, html }`; on the frontend use `html`.

## Section data {#output-in-section-data}

Key `body` in the section data:

```json
{
  "body": {
    "json": {
      "time": 1710000000000,
      "blocks": [
        {
          "type": "paragraph",
          "data": {
            "text": "Block text"
          }
        }
      ],
      "version": "2.29.0"
    },
    "html": "<p>Block text</p>"
  }
}
```

- In a chunk use `html`; `json` is raw Editor.js.

## Chunk example

::: code-group

```modx
<div class="pb-richtext__content">[[+body.html]]</div>
```

```fenom
<div class="pb-richtext__content">{$body.html}</div>
```

:::

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

- Also: data holds `{ json, html }`; in a chunk use `{$field.html}`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
