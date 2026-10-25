---
title: "products"
description: "A list of miniShop3 product ids, comma-separated in the inspector. Pro layer."
---

# Field products

Version: **Pro**, capability `minishop3`.

The inspector accepts ids separated by commas. Section data stores a string array. The type appears in the new-field dialog when miniShop3 is available: the `MiniShop3` service exists, or the `components/minishop3` directory is present. `ProFeatureProvider` then adds capability `minishop3`.

Built-in shop sections, for example [comparison](../sections/product_comparison), store products in [multirelation](multirelation). This type does not put a price or an add-to-cart button into the chunk.

## Similar types

- [product](product) for one id
- [multirelation](multirelation) for several links of an arbitrary class

## Schema

```json
{
  "name": "product_ids",
  "type": "products",
  "label": "Products"
}
```

## Section data {#output-in-section-data}

```json
{
  "product_ids": ["12", "18", "24"]
}
```

## Chunk example

::: code-group

```modx
[[+product_ids.0]]
```

```fenom
{foreach $product_ids as $id}
  <span>{$id|escape}</span>
{/foreach}
```

:::
