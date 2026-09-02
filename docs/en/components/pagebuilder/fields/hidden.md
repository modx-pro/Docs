---
title: "hidden"
description: "Hidden string: stored in section data, not shown in the inspector"
---

# Field hidden

Version: **Free**.

<!-- ![hidden](/components/pagebuilder/screenshots/fields/hidden.png) -->

## Why this type

Value saves and reaches the chunk. No UI space for editors. Default set in JSON or CMP.

## When to use

- Service token, preset key, analytics id
- Section constant changed by dev only
- Default duplicated for front-end forms

## Tips

Editors need to see value use [readonly](readonly). `active: false` hides any type, hidden is for data-only semantics.

## Similar types

- [readonly](readonly) for visible non-editable
- [text](text) with active false for CMP toggle

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

String in the section data, not shown visually in the form.

## Section data {#output-in-section-data}

Key `token` in the section data:

```json
{
  "token": "sku-001"
}
```

## Chunk example

```html
<input type="hidden" name="token" value="{$token|escape}">
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

- The field is hidden in the UI; `active: false` also hides any field type.

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
