---
title: "migx"
description: "ExtJS MIGX grid in the section inspector (Free); requires the MIGX package"
---

# Field migx

Version: **Free**. Requires the **MIGX** package. Without it the field stays in the CMP, but the grid does not mount: a JSON textarea and a Retry MIGX button.

## Why this type

A real ExtJS MIGX TV grid, not a Vue repeater.

## When to use

- Complex rows with the same tabs as in MIGX Configs
- Migrating content from a MIGX TV into PageBuilder sections
- Native MIGX add/edit windows instead of `repeater`

## Tips

- Prefer a config name in `configs` (MIGX → Configs)
- Add/edit windows stack above the inspector (z-index)

## Similar types

- [repeater](repeater): Vue list without a MIGX dependency
- [jsongrid](jsongrid): single object row (Pro)

## Schema

Via MIGX Configs:

```json
{
  "name": "items",
  "type": "migx",
  "label": "Items",
  "configs": "my_migx_config",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

Or inline `formtabs` / `columns` (same as TV input properties):

```json
{
  "name": "items",
  "type": "migx",
  "label": "Items",
  "formtabs": "[{\"caption\":\"Item\",\"fields\":[{\"field\":\"title\",\"caption\":\"Title\"}]}]",
  "columns": "[{\"header\":\"Title\",\"dataIndex\":\"title\",\"width\":160}]"
}
```

`migxConfig` / `migx_config` are aliases for `configs`.

## Value

JSON array of objects: `MIGX_id` and formtabs fields, same as a MIGX TV value.

## Section data {#output-in-section-data}

The field key (for example `items`) stores a MIGX row array:

```json
{
  "items": [
    { "MIGX_id": 1, "title": "First" },
    { "MIGX_id": 2, "title": "Second" }
  ]
}
```

## Chunk example

::: code-group

```modx
[[+items.0.title]]
```

```fenom
{foreach $items as $item}
  <div>{$item.title|pb_text}</div>
{/foreach}
```

:::

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25, 33, 50, 66, 75, 100 | Field width as % of the row (flex). The CMP offers only these values | yes |
| `description` | string | Hint under the label | yes |
| `default` | array | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | bool | Required on **publish** (draft still saves) | yes |
| `configs` | string | MIGX config name | yes |
| `formtabs` | string/array | Item form tabs | yes |
| `columns` | string/array | Grid columns | yes |

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [repeater](repeater)
- [Fields overview](overview)
