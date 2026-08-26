---
title: "multirelation"
description: "Array of resources with id and pagetitle from picker modal"
---

# Field multirelation

Layer: **Pro**.

<!-- ![multirelation](/components/pagebuilder/screenshots/fields/multirelation.png) -->

## Why this type

Row order preserved for curated lists. Same modal search as relation. Base for curated_products and similar sections.

## When to use

- Product picks by exact SKU list
- Related articles or case studies
- Multiple internal links with titles

## Tips

Single resource fits [relation](relation). Static ids without picker possible via combo but no pagetitle enrich.

## Similar types

- [relation](relation) for one resource
- [resourcelist](resourcelist) when schema uses alias naming

## Schema

```json
{
  "name": "products",
  "type": "multirelation",
  "label": "Products",
  "tab": "Content",
  "width": 100,
  "active": true
}
```

## Value

Array of resources.

## Section data {#output-in-section-data}

Key `products` in the section data: array of resources:

```json
{
  "products": [
    {
      "id": 10,
      "pagetitle": "Product A"
    },
    {
      "id": 11,
      "pagetitle": "Product B"
    }
  ]
}
```

## Chunk example

```fenom
{foreach $products as $p}
  <span class="related">{$p.pagetitle|escape}</span>
{/foreach}
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

See [fields overview](overview#obshchie-svoystva-polya).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro in manager](../integration)
