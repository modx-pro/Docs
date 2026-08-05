---
title: Quick start
description: Install msBulkEditor and run the first bulk operation on MiniShop3 products
---

# Quick start

In 10–15 minutes you can install the panel and apply the first bulk operation with preview.

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| MiniShop3 | installed |
| VueTools | installed |

## Step 1: Install the package

1. [Connect ModStore](https://modstore.pro/info/connection) if installing from the catalog.
2. **Extras → Installer → Download Extras** — **msBulkEditor** → **Download** → **Install**.
3. Ensure **MiniShop3** and **VueTools** are installed.
4. **Manage → Clear Cache**.

### After install

| Item | Expectation |
| --- | --- |
| Menu | **Extras → msBulkEditor** |
| Namespace | `msbulkeditor` |
| Permissions | `msbulkeditor_view`, `edit`, `rollback`, `presets`, `import_export` |
| Tables | `msbe_operations`, `msbe_operation_items`, `msbe_presets` |
| Settings | area `msbulkeditor` |

## Step 2: Permissions

In **Security → Access Policies** give store managers at least:

| Permission | Why |
| --- | --- |
| `msbulkeditor_view` | Open the panel, grid, preview, history |
| `msbulkeditor_edit` | Apply and inline |

For rollback, presets, and files add `msbulkeditor_rollback`, `msbulkeditor_presets`, `msbulkeditor_import_export`. Full table: [System settings](settings#permissions).

## Step 3: Open the panel

1. Sign in with an account that has `msbulkeditor_view`.
2. **Extras → msBulkEditor**.
3. Direct URL: `manager/?a=index&namespace=msbulkeditor`.

If you see a VueTools warning, install the package and clear the cache. See [FAQ](faq).

![Tabs](/components/msbulkeditor/screenshots/tabs.png)

## Step 4: First operation (10% discount)

1. On **Products**, filter a category and check rows, or enable **expert mode** for the full filtered set.
2. Click **Run operation**.
3. Type: **Price** → mode **−%** → value `10`. Optionally transfer to `old_price`.
4. **Preview** — check the summary and before/after table.
5. Uncheck rows you do not want to change.
6. **Apply** — wait for progress.

![Preview](/components/msbulkeditor/screenshots/preview-block.png)

More on price: [Product and prices](interface/product-and-prices). Full cycle: [Flow A](interface/flows).

## Step 5: Verify and rollback

1. Open the **History** tab.
2. Find the completed operation.
3. On error click **Rollback**, or open **Changes** and roll back selected items.

Requires `msbulkeditor_rollback`. See [History](interface/history).

## Next

| Task | Document |
| --- | --- |
| All flows A–J with screenshots | [Flows](interface/flows) |
| Filters and expert mode | [Products grid](interface/products-grid) |
| Import stock from Excel | [Import and export](interface/import-export) |
| Limits and Scheduler | [System settings](settings) |
| Plugins on apply | [MODX events](events) |
