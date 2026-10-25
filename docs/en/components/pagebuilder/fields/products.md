---
title: "products"
description: "A list of miniShop3 product ids, comma-separated in the inspector. Pro layer."
---

# Field products

Version: **Pro**, capability `minishop3`.

The type does not appear in the new-field dialog, even when miniShop3 is installed. The descriptor lists capability `minishop3`, but `ProFeatureProvider` does not grant it.

The inspector accepts ids separated by commas. Section data stores a string array.

Built-in shop sections, for example [comparison](../sections/product_comparison), store products in [multirelation](multirelation). This type does not put a price or an add-to-cart button into the chunk.

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

## Similar types

- [product](product) for one id
- [multirelation](multirelation) for several links of an arbitrary class
