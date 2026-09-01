---
title: "relation"
description: "Single MODX resource as id and pagetitle object from picker modal"
---

# Field relation

Version: **Pro**.

<!-- ![relation](/components/pagebuilder/screenshots/fields/relation.png) -->

## Why this type

Modal picker with search, not manual id. SearchAction for ms3 and custom connectors. Data stores id and pagetitle, not full resource.

## When to use

- Link to About page or MS3 product
- One related resource in section
- Internal link with readable title in chunk

## Tips

Multiple resources use [multirelation](multirelation). XPDO class id without modal is [combo](combo).

## Similar types

- [multirelation](multirelation) for resource lists
- [resourcelist](resourcelist) alias of same picker UX

## Schema

```json
{
  "name": "product",
  "type": "relation",
  "label": "Product",
  "searchAction": "mgr/ms3/products/search",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Object `{ id, pagetitle, … }`.

## Section data {#output-in-section-data}

Key `product` in the section data (picker stores only the selection):

```json
{
  "product": {
    "id": 42,
    "pagetitle": "About us"
  }
}
```

- Manager search may show `uri` and `context_key`, but data stores `id` and `pagetitle`.

## Chunk example

```fenom
{if $product.id}
  <span class="related">{$product.pagetitle|escape}</span>
{/if}
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

- Also: `searchAction` for a custom connector (e.g. ms3).

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
