---
title: "keyvalue"
description: "Array of key value pairs without typed columns"
---

# Field keyvalue

Version: **Pro**.

<!-- ![keyvalue](/components/pagebuilder/screenshots/fields/keyvalue.jpg) -->

## Why this type

Simpler than [table](table) when you need one text column for the value. `keyLabel` and `valueLabel` set the column captions. The row count is not limited by a column list in the schema.

## When to use

- Meta attributes, params, simple specs
- Custom props for chunk
- Name/value list without cell types

## Tips

Typed cells or image in cell need [table](table). Single flat map sometimes beats repeater of two text fields.

## Similar types

- [table](table) for typed grid
- [repeater](repeater) with two text fields (Free)

## Schema

```json
{
  "name": "meta",
  "type": "keyvalue",
  "label": "Meta",
  "keyLabel": "Parameter",
  "valueLabel": "Value",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of `{ key, value }`.

## Section data {#output-in-section-data}

Key `meta` in the section data: array of pairs:

```json
{
  "meta": [
    {
      "key": "author",
      "value": "PageBuilder"
    },
    {
      "key": "version",
      "value": "1.0"
    }
  ]
}
```

## Chunk example

::: code-group

```modx
{foreach $meta as $row}
  <div><strong>{$row.key}:</strong> {$row.value}</div>
{/foreach}
```

```fenom
{foreach $meta as $row}
  <div><strong>{$row.key|pb_text}:</strong> {$row.value|pb_text}</div>
{/foreach}
```

:::

## Notes

Column labels: `keyLabel`, `valueLabel` (or `key_label` / `value_label`).

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

- Also: `keyLabel`, `valueLabel` (or `key_label` / `value_label`).

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
