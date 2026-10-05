---
title: "product"
description: "One miniShop3 product id. Capability minishop3. Pro layer."
---

# Field product

Version: **Pro**, capability `minishop3`.

A string with the product id. Without miniShop3 the type is not offered for a new field.

Built-in shop sections store the product in [relation](relation) and [multirelation](multirelation), not in this type. The chunk does not receive a price or an add-to-cart button. For a miniShop3 card use [products grid](../sections/products_grid) or [product spotlight](../sections/product_spotlight).

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

## Similar types

- [products](products) for several ids
- [relation](relation) for a link to an arbitrary class
