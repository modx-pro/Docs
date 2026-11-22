---
title: "product"
description: "One miniShop3 product id. Capability minishop3. Pro layer."
---

# Field product

Version: **Pro**, capability `minishop3`.

The value is a string with the product id. The type appears in the new-field dialog when miniShop3 is available: the `MiniShop3` service exists, or the `components/minishop3` directory is present. `ProFeatureProvider` then adds capability `minishop3`.

Built-in shop sections store the product in [relation](relation) and [multirelation](multirelation). The chunk does not receive a price or an add-to-cart button. For a miniShop3 card use [products grid](../sections/products_grid) or [product spotlight](../sections/product_spotlight).

## Similar types

- [products](products) for several ids
- [relation](relation) for a link to an arbitrary class

## Schema

```json
{
  "name": "product_id",
  "type": "product",
  "label": "Product"
}
```

## Section data {#output-in-section-data}

```json
{
  "product_id": "42"
}
```
