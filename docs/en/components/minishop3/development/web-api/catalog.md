---
title: Web API catalog
description: "Public product and category API for MiniShop3 headless"
---

# Catalog

Public endpoints, no customer token needed. The data set is the same as on the SSR storefront.

## Product

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/product/get/{id}` | Product by ID |
| `GET` | `/product/get` | Resolve: `alias` or `uri` parameter, optional `context` |
| `GET` | `/product/list` | List / PLP |
| `GET` | `/product/filters` | Facets (same filters as `list`) |
| `GET` | `/product/{id}/images` | Gallery |

Query parameters for `get` and resolve: `context`, `include_images` (0\|1, default 0), `include_seo` (default 1).

Main query parameters for `list`:

| Parameter | Meaning |
| --- | --- |
| `parent` / `category` | Category ID (kept for backward compatibility; ignored if `parents` is set) |
| `parents` | CSV / array of category IDs (OR + members) |
| `nested` | 0\|1 — expand the tree when using `parents` |
| `price_min`, `price_max` | Price range |
| `in_stock`, `stock_min` | Stock |
| `vendor_id`, `new`, `popular`, `favorite` | Flags / vendor |
| `options` | Options JSON |
| `limit`, `offset` / `page` | Pagination |
| `sort`, `dir`, `query`, `context` | Sort and search |
| `include_options`, `include_content`, `include_images` | Embeds (`include_images` default 0, at most 10 files per product) |
| `include_seo` | SEO block; the default is **0** on `list` and `1` on `get` |

`list` response: `{ items, total, limit, offset }` inside `data`.

`filters`: the same filters as `list`, plus `keys`, `include_price` (default 1), `include_vendors` (default 0).

Product fields are returned according to an allowlist in `ProductCatalogService`.

## Category

| Method | Path | Purpose |
| --- | --- | --- |
| `GET` | `/category/get/{id}` | Category by ID |
| `GET` | `/category/get` | Resolve by `alias` / `uri` |
| `GET` | `/category/list` | List |
| `GET` | `/category/tree` | Tree |

Query parameters for `get` and resolve: `context`, `include_children`, `include_hidden`, `include_content`, `include_seo` (default **1**). `list` and `tree` take the same `include_seo`, but its default there is **0** — the SEO block only arrives when you ask for it.

With `include_children=1` the entries in `children` also get `seo`, unless `include_seo` is switched off.

## The SEO block

It arrives in `seo` when `include_seo` is on, and is assembled in this order: base values from the resource fields, then canonical, then overrides from the TV map, then the `msOnGetPublicSeo` event.

| Key | Source |
| --- | --- |
| `title`, `description` | Resource fields, overridden by the TV map where present |
| `canonical` | Built with MODX `makeUrl`. With friendly URLs off it comes out as `index.php?id=N`, so the link keeps working |
| `robots` | Either `index,follow` or `noindex,nofollow` |
| `og.*` | From the TV map: `og.title`, `og.description`, `og.image`, `og.type` |

The TV map is the `ms3_public_seo_tv_map` system setting: JSON mapping an SEO key to a TV name. Allowed keys are `title`, `description`, `canonical`, `robots`, `og.title`, `og.description`, `og.image`, `og.type`. Invalid JSON is ignored.

### The `searchable` field

Product and category responses carry `searchable` (the "Searchable" flag of the MODX resource). When it is off, `robots` in the SEO block becomes `noindex,nofollow` — that is all it affects: the entry itself stays in the API output.

## Resource group ACL

Setting `ms3_web_catalog_respect_resource_groups`: when enabled, the public catalog hides products and categories that sit in MODX resource groups closed by ACL for the request context.

The check covers both anonymous visitors and authenticated customers: a guest is matched against grants issued without a principal, while a customer also gets the groups resolved from `msCustomerGroup` through MODX user-group ACL. Membership is evaluated as "any of them": a document stays visible when any of its groups grants access, even if another one is restricted.

Disable the setting to let the catalog serve products regardless of resource groups.

## Example

```bash
curl -sS 'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/product/list&parents=10&limit=20'
```

See also [Examples](examples), [Frontend: catalog](/en/components/minishop3/frontend/catalog).
