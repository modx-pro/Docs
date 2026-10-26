---
title: "hidden"
description: "Hidden string: stored in section data, the inspector shows no label"
---

# Field hidden

Version: **Free**.

<!-- ![hidden](/components/pagebuilder/screenshots/fields/hidden.jpg) -->

## Why this type

The value is saved and reaches the chunk. The inspector shows only an `input type="hidden"`, with no label and no field wrapper. The default is set in JSON or in the manager. `active: false` removes the field entirely.

## When to use

- Service token, preset key, analytics id
- Section constant changed by the developer only
- Default duplicated for front-end forms

## Tips

Editors need to see the value: use [readonly](readonly). `active: false` hides any type. Use `hidden` when the value belongs in the data only.

## Similar types

- [readonly](readonly) for a visible value the editor cannot change
- [text](text) with `active: false` if the value is toggled in the CMP

## Schema

```json
{
  "name": "token",
  "type": "hidden",
  "label": "Token",
  "tab": "Content",
  "width": 100
}
```

## Value

String in the section data.

## Section data {#output-in-section-data}

```json
{
  "token": "sku-001"
}
```

## Chunk example

::: code-group

```modx
<input type="hidden" name="token" value="[[+token]]">
```

```fenom
<input type="hidden" name="token" value="{$token|escape}">
```

:::

## Common properties

For fields with `name` that are stored in the section data:

| Key | Type | Role | CMP |
| --- | --- | --- | --- |
| `tab` | string | Group subtitle in the inspector | yes |
| `width` | 25, 33, 50, 66, 75, 100 | Field width as % of the row (flex). The CMP offers only these values | yes |
| `description` | string | Hint under the label | yes |
| `default` | any | Initial value for a new section | yes |
| `active` | bool | `false` hides the field in the inspector | yes |
| `required` | — | For `hidden`, the publish required check does not run | — |

The inspector does not draw the label, `width`, or `description` for this type. `tab` still groups the field with its neighbors.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
