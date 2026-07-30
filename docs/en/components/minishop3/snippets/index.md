---
title: Snippets
---
# MiniShop3 snippets

MiniShop3 provides a set of snippets for building the store frontend. All snippets work through pdoTools and support the Fenom template engine.

## Snippet overview

| Snippet | Purpose |
|---------|---------|
| [msProducts](msproducts) | Product list with filtering and sorting |
| [msCart](mscart) | Shopping cart display |
| [msOrder](msorder) | Checkout form |
| [msGetOrder](msgetorder) | Order information |
| [msGallery](msgallery) | Product image gallery |
| [msOptions](msoptions) | Options for product filtering |
| [msProductOptions](msproductoptions) | Specific product characteristics |
| [msCustomer](mscustomer) | Customer account |
| [msOrderTotal](msordertotal) | Order total summary |

## General principles

### Calling snippets

You can call all snippets via Fenom:

```fenom
{'msProducts' | snippet : [
    'parents' => 5,
    'limit' => 10
]}
```

Or via standard MODX syntax:

```modx
[[!msProducts?
    &parents=`5`
    &limit=`10`
]]
```

::: tip Caching
Snippets that use the user session (`msCart`, `msOrder`, `msCustomer`) must be called **uncached** (with `!`).
:::

### return parameter

Most snippets support the `return` parameter that defines the output format:

| Value | Description |
|-------|-------------|
| `tpl` | Process through a chunk (default) |
| `data` | Return a data array |
| `json` | Return a JSON string |
| `ids` | Record IDs only, comma-separated |

### toPlaceholder parameter

Instead of direct output, you can save the result to a placeholder:

```fenom
{'msProducts' | snippet : [
    'toPlaceholder' => 'products'
]}

{* Use later *}
{$_modx->getPlaceholder('products')}
```

## Default chunks

MiniShop3 ships with a set of ready-made chunks:

| Snippet | Default chunk |
|---------|---------------|
| msProducts | `tpl.msProducts.row` |
| msCart | `tpl.msCart` |
| msOrder | `tpl.msOrder` |
| msGetOrder | `tpl.msGetOrder` |
| msGallery | `tpl.msGallery` |
| msOptions | `tpl.msOptions` |
| msProductOptions | `tpl.msProductOptions` |

You can override chunks by creating your own or specifying another chunk in the `tpl` parameter.
