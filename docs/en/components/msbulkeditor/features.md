---
title: Features
description: What msBulkEditor can do — operations, inline, history, presets, import
---

# Features

Bulk MiniShop3 catalog management in the MODX manager: filter, preview, apply, history, presets, CSV/XLSX.

![Flow: filter → preview → apply → history](/components/msbulkeditor/screenshots/features-flow.png)

## What it covers

1. Change prices, stock, and resource fields for hundreds or thousands of products.
2. Work with checked rows or the full filtered set (expert mode).
3. Review a **before → after** preview before writing to the database.
4. Roll back failed operations fully or by item.
5. Save **presets** and run them from the toolbar.
6. Export and import changes via **CSV/XLSX**.

Step-by-step: [Flows](interface/flows).

## Bulk field operations

| Area | Modes | Details |
| --- | --- | --- |
| **Price** | set, ±amount, ±%, round, transfer to `old_price` | [Product and prices](interface/product-and-prices) |
| **Stock** | same modes for `count` / stock | [Product and prices](interface/product-and-prices) |
| **TV** | set, add, replace, remove | [TV parameters](interface/tv-parameters) |
| **MS3 options** | scalar: set, replace, remove. Multi: add, replace, remove | [Options](interface/options) |
| **Resource** | template, parent, content type, groups, dates, users | [Quick actions](interface/quick-actions) |
| **Text** | `text_set`, `text_replace` | [Product and prices](interface/product-and-prices), [Resource fields](interface/resource-fields) |
| **SEO** | alias, description, menutitle, longtitle | [Resource fields](interface/resource-fields) |
| **Categories** | extra categories, remove all, change parent | [Product and prices](interface/product-and-prices) |
| **Flags** | published, deleted, hidemenu, … | [Resource fields](interface/resource-fields) |
| **Links** | add / remove product link | [Resource fields](interface/resource-fields) |
| **Variants** | price/stock/sku/weight (ms3Variants) | [Product and prices](interface/product-and-prices) |
| **Utilities** | clear cache, regenerate URI, soft delete, gallery regenerate | [Quick actions](interface/quick-actions) |
| **TV/option binding** | wizard before preview when gaps exist | [Binding wizard](interface/binding-wizard) |

`fieldType` list: `price`, `stock`, `boolean_toggle`, `category`, `option`, `tv`, `vendor`, `template`, `source`, `content_type`, `user`, `resource_group`, `text_set`, `dates`, `text_replace`, `seo`, `link`, `variant`, `gallery_regenerate`, `resource_utility`, `soft_delete`.

## Permissions

| Permission | Capability |
| --- | --- |
| `msbulkeditor_view` | Grid, preview, history (read) |
| `msbulkeditor_edit` | Apply, inline, UI save |
| `msbulkeditor_rollback` | Rollback |
| `msbulkeditor_presets` | Preset CRUD |
| `msbulkeditor_import_export` | File import/export |

More: [System settings](settings#permissions).

## Limits

- only MiniShop3 products (`msProduct`)
- no inline for multi-value options and TV list/checkbox/file
- option type in bulk (`valueKind`) is chosen manually

See [FAQ](faq#limits).
