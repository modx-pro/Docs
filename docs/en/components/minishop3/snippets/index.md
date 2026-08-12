---
title: Snippets
---
# MiniShop3 snippets

MiniShop3 provides a set of snippets for building the store frontend. All snippets work through pdoTools and support the Fenom template engine.

## Snippet overview

| Snippet | Purpose |
| --- | --- |
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

`return` values depend on the snippet:

| Snippet | Default | Values |
| --- | --- | --- |
| msProducts | `data` | `data`, `json`, `ids`, `sql` |
| msCart | `tpl` | `tpl`, `data` |
| msOrder | `tpl` | `tpl`, `data` |
| msGetOrder | — | chunk HTML only (no `return` parameter) |
| msGallery | `data` | `data`, `tpl`, `json`, `sql` |
| msOptions | — | chunk HTML only |
| msProductOptions | `tpl` | `tpl`, `data`, `array` |
| msCustomer | `tpl` | `tpl`, `data` |
| msOrderTotal | `tpl` | `tpl`, `data` |

Common values:

| Value | Description |
| --- | --- |
| `tpl` | Render through a chunk |
| `data` | Data array (or HTML string for msProducts — see [msProducts](msproducts#output-returndata)) |
| `json` | JSON string (msProducts, msGallery) |
| `ids` | Comma-separated IDs (msProducts) |

### Numbers and `*_formatted`

Price and weight placeholders in chunks are **numbers** (`float`). Use `*_formatted` fields for display. The `formatPrices` parameter was removed as a no-op.

| Snippet | Behavior |
| --- | --- |
| msProducts | `price_formatted`, `old_price_formatted`, `weight_formatted`. Currency symbol only when `withCurrency => true` |
| msCart, msOrder, msGetOrder, msOrderTotal | `*_formatted` always includes currency or weight unit |

Customer account and auth — [msCustomer](mscustomer) snippet and [Customer authentication](/en/components/minishop3/frontend/customer-auth).

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
| --- | --- |
| msProducts | `tpl.msProducts.row` |
| msCart | `tpl.msCart` |
| msOrder | `tpl.msOrder` |
| msGetOrder | `tpl.msGetOrder` |
| msGallery | `tpl.msGallery` |
| msOptions | `tpl.msOptions` |
| msProductOptions | `tpl.msProductOptions` |
| msOrderTotal | `tpl.msOrderTotal` |

You can override chunks by creating your own or specifying another chunk in the `tpl` parameter.
