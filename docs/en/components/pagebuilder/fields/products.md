---
title: "products"
description: "A list of miniShop3 product ids, comma-separated in the inspector. Pro layer."
---

# Field products

Version: **Pro**, capability `minishop3`.

The inspector accepts ids separated by commas. Section data stores a string array. Without miniShop3 the type is not offered for a new field.

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

```html
{foreach $product_ids as $id}
  <span>{$id|escape}</span>
{/foreach}
```

## Similar types

- [product](product) for one id
- [multirelation](multirelation) for several links of an arbitrary class
