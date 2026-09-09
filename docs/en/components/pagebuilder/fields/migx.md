---
title: "migx"
description: "ExtJS MIGX grid in the section inspector (Free); requires the MIGX package"
---

# Field migx

Edition: **Free**. Requires the **MIGX** package. Without it the field stays in the CMP, but the grid does not mount (fallback: JSON textarea).

## Why this type

- Real ExtJS MIGX TV grid, not a Vue repeater
- Reuse an existing MIGX Config or set `formtabs` / `columns` like a TV
- Useful when editors already work with MIGX

## When to use

- Complex rows with the same tabs as in MIGX Configs
- Migrating content from a MIGX TV into PageBuilder sections
- When you need native MIGX add/edit, not `repeater`

## Tips

- Prefer a config name in `configs` (MIGX → Configs)
- Add/edit windows stack above the inspector (z-index)
- Without MIGX: JSON in a textarea and a Retry button

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

JSON array of objects (same as a MIGX TV value):

```json
{
  "items": [
    { "MIGX_id": 1, "title": "First" },
    { "MIGX_id": 2, "title": "Second" }
  ]
}
```

## Section data {#output-in-section-data}

The field key (for example `items`) stores a MIGX row array with `MIGX_id` and formtabs fields.

## Chunk example

```fenom
{foreach $items as $item}
  <div>{$item.title|escape}</div>
{/foreach}
```

## Common properties

| Key | Type | Role | Panel |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle | yes |
| `width` | 25–100 | Field width % | yes |
| `description` | string | Hint | yes |
| `default` | array | Initial value | yes |
| `active` | bool | Hide in inspector | yes |
| `required` | bool | Required on publish | yes |
| `configs` | string | MIGX config name | yes |
| `formtabs` | string/array | Item form tabs | yes |
| `columns` | string/array | Grid columns | yes |

## Next

- [Type reference](types)
- [repeater](repeater)
- [Fields overview](overview)
