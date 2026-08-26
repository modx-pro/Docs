---
title: "checkboxgroup"
description: "Array of values from static options for multiple flags"
---

# Field checkboxgroup

Version: **Free**.

<!-- ![checkboxgroup](/components/pagebuilder/screenshots/fields/checkboxgroup.png) -->

## Why this type

Multiple picks from one options list. Data is an array of value strings, not objects. Alternative to multiselect for short lists without search.

## When to use

- Filter tags, icon set, feature flags
- "Which columns to show" from a fixed set
- Multi pick without multiselect

## Tips

A single flag fits [checkbox](checkbox). Long searchable lists need [multiselect](multiselect).

## Similar types

- [multiselect](multiselect) for PrimeVue multi with filter
- [tag](tag) for free-form strings (Pro)

## Schema

```json
{
  "name": "tags",
  "type": "checkboxgroup",
  "label": "Tags",
  "options": [
    {
      "label": "New",
      "value": "new"
    },
    {
      "label": "Bestseller",
      "value": "hit"
    }
  ],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of strings (`value` of checked options).

## Section data {#output-in-section-data}

Key `tags` in the section data: array of checked option `value`s:

```json
{
  "tags": [
    "new",
    "hit"
  ]
}
```

## Chunk example

```fenom
{foreach $tags as $tag}
  <span class="tag">{$tag|escape}</span>
{/foreach}
```

## Notes

Options from `options` or `optionsSource`, same as select.

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
