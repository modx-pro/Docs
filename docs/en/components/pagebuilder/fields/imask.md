---
title: "imask"
description: "String with IMask input pattern in inspector"
---

# Field imask

Version: **Pro**.

<!-- ![imask](/components/pagebuilder/screenshots/fields/imask.jpg) -->

## Why this type

A phone number, tax id, or card number is typed against a mask: extra characters are dropped as you type, not only when the page is checked before publish. The mask is set on the field (`mask` or a preset). The type is in PageBuilder Pro.

## When to use

- A phone number in a contact form
- An SKU or serial number with a fixed length
- A promo code that follows a pattern

## Tips

Plain numeric use [number](number). Value is string with mask literals per preset.

## Similar types

- [text](text) without format constraint
- [url](url) for links, not phone mask

## Schema

```json
{
  "name": "phone",
  "type": "imask",
  "label": "Phone",
  "mask": "+7 (000) 000-00-00",
  "maskOptions": {
    "lazy": false
  },
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Masked string.

## Section data {#output-in-section-data}

Key `phone` in the section data: masked string:

```json
{
  "phone": "+7 (495) 123-45-67"
}
```

## Chunk example

::: code-group

```modx
<a href="tel:[[+phone]]">[[+phone]]</a>
```

```fenom
<a href="tel:{$phone|escape:'url'}">{$phone|escape}</a>
```

:::

## Notes

Short mask: `mask`. Full IMask config: `maskOptions` (object or JSON string).

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

- Also: `mask` or `maskOptions` (IMask JSON).

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
