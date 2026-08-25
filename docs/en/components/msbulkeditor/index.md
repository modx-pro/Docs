---
title: msBulkEditor
description: Bulk editing of MiniShop3 products in the MODX 3 manager
author: ibochkarev
dependencies: [miniShop3, VueTools]
categories: minishop3

items: [
  {
    text: 'Getting started',
    link: 'quick-start',
    items: [
      { text: 'Quick start', link: 'quick-start' },
      { text: 'Features', link: 'features' },
      { text: 'System settings', link: 'settings' },
    ],
  },
  {
    text: 'Interface',
    link: 'interface/',
    items: [
      { text: 'Tabs overview', link: 'interface/' },
      { text: 'Step-by-step scenarios', link: 'interface/flows' },
      { text: 'Products grid', link: 'interface/products-grid' },
      { text: 'Quick actions', link: 'interface/quick-actions' },
      { text: 'Product and prices', link: 'interface/product-and-prices' },
      { text: 'MiniShop3 options', link: 'interface/options' },
      { text: 'TV parameters', link: 'interface/tv-parameters' },
      { text: 'Column settings', link: 'interface/column-settings' },
      { text: 'Inline editing', link: 'interface/inline-editing' },
      { text: 'Preview and apply', link: 'interface/preview-and-apply' },
      { text: 'History and rollback', link: 'interface/history' },
      { text: 'Presets', link: 'interface/presets' },
      { text: 'Import and export', link: 'interface/import-export' },
      { text: 'Binding wizard', link: 'interface/binding-wizard' },
      { text: 'Resource fields', link: 'interface/resource-fields' },
    ],
  },
  {
    text: 'For developers',
    link: 'events',
    items: [
      { text: 'MODX events', link: 'events' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---

# msBulkEditor

**msBulkEditor** is an extra for [MODX Revolution 3](https://modx.com/) and [MiniShop3](/en/components/minishop3/): bulk product editing in the manager. Catalog filters, before/after preview, chunked apply, history with rollback, presets, CSV/XLSX.

Works with MiniShop3 products (`msProduct`). Regular MODX resources (non-products) are not edited here.

Start here: [Quick start](quick-start).

![msBulkEditor overview](/components/msbulkeditor/screenshots/overview.png)

## Minimal path

1. Install **MODX 3**, **MiniShop3**, **VueTools**.
2. Install **msBulkEditor**, clear the cache.
3. Assign `msbulkeditor_view` and `msbulkeditor_edit` to manager policies.
4. Open **Extras → msBulkEditor** or `manager/?a=index&namespace=msbulkeditor`.
5. Select products → **Run operation** → **Preview** → **Apply**.

## Quick links

| Need | Document |
| --- | --- |
| Install and run the first operation | [Quick start](quick-start) |
| Feature list and `fieldType` | [Features](features) |
| `msbulkeditor_*` keys and permissions | [System settings](settings) |
| Step-by-step flows A–J | [Flows](interface/flows) |
| Grid, filters, expert mode | [Products grid](interface/products-grid) |
| Preview, apply, progress | [Preview and apply](interface/preview-and-apply) |
| Rollback | [History](interface/history) |
| CSV/XLSX | [Import and export](interface/import-export) |
| Plugin events | [MODX events](events) |
| Troubleshooting | [FAQ](faq) |

## Features

- **Products grid** — category tree, filters, KPI, TV/option columns, expert mode
- **21 operation types** — price, stock, TV, options, categories, SEO, boolean, dates, links, variants, utilities
- **Quick actions** — fixed toolbar items without choosing a type in Select
- **Inline** — cell edits through the same preview/apply pipeline
- **Preview** — summary and diff table, exclude rows before apply
- **History** — full and selective rollback
- **Presets** — saved JSON operations from the tab or toolbar
- **Import / export** — CSV and XLSX (OpenSpout)

More: [Features](features).

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| MiniShop3 | 1.0+ |
| VueTools (`modxpro-vue-core`) | 1.0+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — `msProduct`, prices, stock, options
- **[VueTools](https://modstore.pro/)** — Vue 3 SPA in the manager. Without it the UI will not load

### Optional

- **[ms3Variants](/en/components/ms3variants/)** — variant column and `variant` operations
- **[Scheduler](/en/components/scheduler/)** — history cleanup
- **OpenSpout** (in package vendor) — XLSX read/write

## Installation

1. [Connect ModStore](https://modstore.pro/info/connection) if you install from the catalog.
2. **Extras → Installer** → **Download Extras** — **msBulkEditor** → **Download** → **Install**.
3. Ensure **MiniShop3** and **VueTools** are installed.
4. Assign manager permissions — see [Settings](settings#permissions).
5. **Manage → Clear Cache**.

After install you get namespace `msbulkeditor`, manager menu, `msbulkeditor_*` permissions, tables `msbe_*`, and system settings in area `msbulkeditor`.

## Terms

| Term | Meaning |
| --- | --- |
| **fieldType** | Bulk operation type (`price`, `tv`, `option`, …) |
| **preview** | Before/after calculation without writing to the DB |
| **apply** | Persist changes in chunks (`msbulkeditor_chunk_size`) |
| **expert mode** | Operate on all products matching the filter, not only checked rows |
| **preset** | Saved JSON `fieldType` + `parameters` |
| **binding wizard** | Dialog to bind TV/option to template or category when gaps exist |
