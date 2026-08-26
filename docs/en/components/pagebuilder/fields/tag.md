---
title: "tag"
description: "String tag array with chip UI in inspector"
---

# Field tag

Layer: **Pro**.

<!-- ![tag](/components/pagebuilder/screenshots/fields/tag.png) -->

## Why this type

Free input without static options. Pro advanced-fields. Good for filters and card labels.

## When to use

- Article hashtags, tech stack badges
- Filter facets on landing
- SEO keywords in section block

## Tips

Fixed enum fits [multiselect](multiselect) or [checkboxgroup](checkboxgroup). Values are strings, not objects.

## Similar types

- [multiselect](multiselect) for options pick
- [checkboxgroup](checkboxgroup) for static flags (Free)

## Schema

```json
{
  "name": "labels",
  "type": "tag",
  "label": "Labels",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of strings.

## Section data {#output-in-section-data}

Key `labels` in the section data: array of strings:

```json
{
  "labels": [
    "new",
    "sale"
  ]
}
```

## Chunk example

```fenom
{foreach $labels as $label}
  <span class="label">{$label|escape}</span>
{/foreach}
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
- [Pro in manager](../integration)
