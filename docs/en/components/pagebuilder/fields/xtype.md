---
title: "xtype"
description: "Scalar string with xtype hint without MODX ExtJS widget"
---

# Field xtype

Version: **Free**.

<!-- ![xtype](/components/pagebuilder/screenshots/fields/xtype.jpg) -->

## Why this type

The old `xtype` key, for schemas that are not switched to `text` yet. The inspector shows a plain text field: the ExtJS widget is not loaded. If the JSON type is still `xtype`, the field behaves like [text](text).

## When to use

- Fields from old MODX form configs
- Placeholder for future widget
- Dev-only semantic type name

## Tips

UI does not mount Ext modx-combo. New schemas use native [text](text) or [combo](combo).

## Similar types

- [text](text) for new scalar fields
- [combo](combo) for dynamic select behavior

## Schema

```json
{
  "name": "ext",
  "type": "xtype",
  "label": "Ext",
  "xtype": "modx-combo",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

String.

## Section data {#output-in-section-data}

Key `ext` in the section data:

```json
{
  "ext": "sku-001"
}
```

## Chunk example

::: code-group

```modx
[[+ext]]
```

```fenom
{$ext|escape}
```

:::

## Notes

The inspector renders plain `InputText`. `xtype` is only a hint; MODX does not mount an ExtJS widget.

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
- [Manager and events](../integration)
