---
title: "select"
description: "Single value from a static options array"
---

# Field select

Layer: **Free**.

<!-- ![select](/components/pagebuilder/screenshots/fields/select.png) -->

## Why this type

- Options live in section JSON, no xPDO query
- Takes less space than radio for long lists
- Stored value is the option `value`, not the label

## When to use

- Size, theme, alignment, or layout preset
- Five to twenty fixed choices without search
- Enum-like section settings

## Tips

- Database-driven lists need [combo](combo) (Pro)
- Two to four visible choices fit [radio](radio) better

## Similar types

- [radio](radio) for a short on-screen list
- [multiselect](multiselect) for multiple static picks

## Schema

```json
{
  "name": "size",
  "type": "select",
  "label": "Size",
  "options": [
    {
      "label": "S",
      "value": "sm"
    },
    {
      "label": "L",
      "value": "lg"
    }
  ],
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

String: selected option `value`.

## Section data {#output-in-section-data}

Key `size` in the section data: the selected option `value` string:

```json
{
  "size": "lg"
}
```

## Chunk example

```fenom
{switch $size}
  {case 'sm'}<div class="block block--sm">{/case}
  {case 'lg'}<div class="block block--lg">{/case}
  {default}<div class="block">{/default}
{/switch}
```

## Notes

Dynamic list: `optionsSource` → processor `mgr/field/options`.

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

- Also: `options` or `optionsSource`.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
