---
title: Snippets
---
# MiniShop3 snippets

MiniShop3 provides snippets for building an online store on the frontend. All snippets work via pdoTools and support the Fenom templating engine.

## Snippet overview

| Snippet | Purpose |
|---------|---------|
| [msProducts](msproducts) | Product list with filtering and sorting |
| [msCart](mscart) | Shopping cart display |
| [msOrder](msorder) | Checkout form |
| [msGetOrder](msgetorder) | Order information |
| [msGallery](msgallery) | Product image gallery |
| [msOptions](msoptions) | Options for product filtering |
| [msProductOptions](msproductoptions) | Product specifications |
| [msCustomer](mscustomer) | Customer account |
| [msOrderTotal](msordertotal) | Order total |

## General principles

### Calling snippets

All snippets can be called via Fenom:

```fenom
{'msProducts' | snippet: [
    'parents' => 5,
    'limit' => 10
]}
```

Or standard MODX syntax:

```modx
[[!msProducts?
    &parents=`5`
    &limit=`10`
]]
```

::: tip Caching
Snippets that work with user session (`msCart`, `msOrder`, `msCustomer`) must be called **uncached** (with `!`).
:::

### return parameter

Most snippets support `return` to set output format:

| Value | Description |
|-------|-------------|
| `tpl` | Process via chunk (default) |
| `data` | Return data array |
| `json` | Return JSON string |
| `ids` | Comma-separated IDs only |

### toPlaceholder parameter

Save result to a placeholder instead of direct output:

```fenom
{'msProducts' | snippet: [
    'toPlaceholder' => 'products'
]}

{* Use later *}
{$_modx->getPlaceholder('products')}
```

## Default chunks

MiniShop3 installs a set of default chunks:

| Snippet | Default chunk |
|---------|---------------|
| msProducts | `tpl.msProducts.row` |
| msCart | `tpl.msCart` |
| msOrder | `tpl.msOrder` |
| msGetOrder | `tpl.msGetOrder` |
| msGallery | `tpl.msGallery` |
| msOptions | `tpl.msOptions` |
| msProductOptions | `tpl.msProductOptions` |

Override by creating your own chunks or setting the `tpl` parameter.
