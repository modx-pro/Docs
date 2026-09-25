---
title: Web API catalog
description: "Public product and category API for MiniShop3 headless"
---

# Catalog

Public endpoints without a customer token. Same data set as the SSR storefront.

## Product

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/product/get/{id}` | Product by ID |
| `GET` | `/product/get` | Resolve: query `alias` or `uri`, optional `context` |
| `GET` | `/product/list` | List / PLP |
| `GET` | `/product/filters` | Facets (same filters as list) |
| `GET` | `/product/{id}/images` | Gallery |

Query for `get` / resolve: `context`, `include_images` (0\|1, default 0), `include_seo` (default 1).

Query for `list` (main):

| Parameter | Meaning |
| --- | --- |
| `parent` / `category` | Category ID (BC; ignored if `parents` is set) |
| `parents` | CSV / array of category IDs (OR + members) |
| `nested` | 0\|1 expand tree when using `parents` |
| `price_min`, `price_max` | Price range |
| `in_stock`, `stock_min` | Stock |
| `vendor_id`, `new`, `popular`, `favorite` | Flags / vendor |
| `options` | Options JSON |
| `limit`, `offset` / `page` | Pagination |
| `sort`, `dir`, `query`, `context` | Sort and search |
| `include_options`, `include_content`, `include_images` | Embeds (`include_images` default 0, cap 10 files per product) |

List response: `{ items, total, limit, offset }` inside `data`.

`filters`: same filters as list + `keys`, `include_price` (default 1), `include_vendors` (default 0).

Product fields are trimmed by an allowlist in `ProductCatalogService`.

## Category

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/category/get/{id}` | Category by ID |
| `GET` | `/category/get` | Resolve by `alias` / `uri` |
| `GET` | `/category/list` | List |
| `GET` | `/category/tree` | Tree |

## Resource group ACL

Setting `ms3_web_catalog_respect_resource_groups`: when enabled, the public catalog hides products and categories in MODX resource groups with ACL for the request context (anonymous MVP). Disable to restore pre-#659 / #666 behavior.

## Example

```bash
curl -sS 'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/product/list&parents=10&limit=20'
```

See also [Examples](examples), [Frontend: catalog](/en/components/minishop3/frontend/catalog).
