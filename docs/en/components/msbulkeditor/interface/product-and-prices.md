---
title: Product and prices
description: Price, stock, categories, vendor, template, variants
---

# Product & prices

Bulk operations on MiniShop3 product fields: **price**, **stock**, **categories**, **vendor**, **variants**.

![Price operation dialog](/components/msbulkeditor/screenshots/operation-price.png)

---

## Prices

**Run operation** → type **Price**.

### Change modes

| Mode | Parameter | Example |
| --- | --- | --- |
| **Set value** | `mode: set` | Price = 1990 |
| **Relative +/-** | `mode: relative`, `sign`, `value` | Was 1000, +100 → 1100 |
| **Percent** | `mode: percent`, `sign`, `value` | −10% of current price |

### Rounding

| Value | Effect |
| --- | --- |
| `none` | No rounding |
| `integer` | To integer (standard rounding) |
| `floor` | Down to integer |
| `ceil` | Up to integer |
| `tens` | To tens |
| `hundreds` | To hundreds |

### Transfer between price fields

![Price: transfer between fields](/components/msbulkeditor/screenshots/operation-price-transfer.png)

Mode **“Transfer between fields”** (`mode: transfer`):

| Parameter | Description |
| --- | --- |
| `sourceField` | Copy from (`price`, `old_price`) |
| `targetField` | Write value to |
| `clearSource` | Zero source after transfer (default `false`) |

Preview shows only the target field change; source stays unchanged until `clearSource` is enabled. Supports `variantScope`.

### Copy current price to old_price on change

Flag **“Copy current price to old_price”** (`transferToOldPrice`) before changing `price` — discount scenario: old price on storefront, new in `price`. Works in set / relative / percent modes.

### Variant scope (ms3Variants)

| `variantScope` | Behavior |
| --- | --- |
| `product_only` | Main product only |
| `all_variants` | Product + all variants |
| `skip_if_variants` | Skip products with variants |

---

## Stock

![Stock operation dialog](/components/msbulkeditor/screenshots/operation-stock.png)

Type **Stock** (`fieldType: stock`, DB field `count`):

- same set / relative / percent modes;
- default rounding `integer`;
- supports `variantScope`.

---

## Categories

Type **Categories**:

| Mode | Action |
| --- | --- |
| **Add categories** | `assign_additional` — comma-separated IDs in `categoryIds` |
| **Remove all additional categories** | `remove_all` |
| **Change parent** | `change_parent` — new `parentId` |

Additional categories are stored in `ms3_product_categories`.

![Additional categories operation](/components/msbulkeditor/screenshots/operation-categories.png)

![Remove all additional categories](/components/msbulkeditor/screenshots/operation-categories-remove-all.png)

---

## Vendor and template

![Vendor operation](/components/msbulkeditor/screenshots/operation-vendor.png)

![Template operation](/components/msbulkeditor/screenshots/operation-template.png)

- **Vendor** — `vendor`, parameter `vendorId`.
- **Template** — `template`, parameter `templateId` (also [Quick actions](quick-actions) → “Change template”).

Also available via [Quick actions](quick-actions).

![File source](/components/msbulkeditor/screenshots/operation-source.png)

![Content type](/components/msbulkeditor/screenshots/operation-content-type.png)

![User](/components/msbulkeditor/screenshots/operation-user.png)

Also via **Run operation** / **Quick actions**: `source`, `content_type`, `user`.

---

## Variants (ms3Variants)

![Variant operation](/components/msbulkeditor/screenshots/operation-variant.png)

With **ms3Variants** installed, type **Variant**:

- fields: `price`, `count`, `sku`, `weight`;
- bulk change variant values for selected products.

---

## Article and weight

![Text field](/components/msbulkeditor/screenshots/operation-text-set.png)

Operation **Text field** (`text_set`):

| Field | Behavior |
| --- | --- |
| **article** | String SKU value |
| **weight** | Number ≥ 0 (kg); numeric input in form |

“Leave field empty” clears article or sets weight to 0.

---

## Product flags (MS3)

In MiniShop3, flags **new**, **popular**, **favorite** live in `ms3_products` (`msProductData` model) as `tinyint(1)`.

| Field | Purpose |
| --- | --- |
| `new` | New arrival |
| `popular` | Popular |
| `favorite` | Featured |

**Bulk operation:** type **Boolean toggle** → field `new` / `popular` / `favorite` → Yes / No / Invert.

**Grid filter:** “Product flag” + Yes/No → key `filterSpec.new` (or `popular`, `favorite`).

---

## Gallery thumbnail regeneration

Operation **Regenerate gallery thumbnails** (`fieldType: gallery_regenerate`):

- for each product calls MS3 processor `Gallery\GenerateAll`;
- products without rows in `ms3_product_files` are skipped;
- rollback via history does not restore files on disk (side-effect operation);
- apply runs in chunks via `BatchOperationRunner`; progress in `products/progress`;
- for large selections, lower system setting `msbulkeditor_chunk_size`.

Available in **Quick actions** → “Regenerate gallery thumbnails”.

---

## Resource utility operations

Type **Resource utility operations** (`fieldType: resource_utility`, parameter `action`):

| `action` | Action |
| --- | --- |
| `clear_cache` | `cacheManager.refreshResource` for each product |
| `regenerate_uri` | rebuild alias and URI via `modResource` |

- requires `msbulkeditor_edit` and confirm dialog before apply;
- products with `uri_override` are skipped for `regenerate_uri`;
- rollback of `regenerate_uri` restores alias and URI from history;
- rollback of `clear_cache` does not restore cache files (side-effect);
- apply runs in chunks via `BatchOperationRunner`.

**Quick actions:** “Clear resource cache”, “Regenerate URI”.

![Confirm: clear cache](/components/msbulkeditor/screenshots/confirm-clear-cache.png)

![Confirm: regenerate URI](/components/msbulkeditor/screenshots/confirm-regenerate-uri.png)

---

## Soft delete

Operation **Soft delete** (`fieldType: soft_delete`):

- sets `deleted=1` for each selected product;
- already deleted resources are skipped;
- confirm dialog before apply;
- rollback from history sets `deleted=0`;
- permanent purge in MODX is not available here (separate human gate).

![Confirm: soft delete](/components/msbulkeditor/screenshots/confirm-soft-delete.png)

**Quick actions:** “Soft delete”.

---

## Not in scope

- Bulk `country` (if the field appears in MS3).

→ [FAQ](../faq)

---

## Rolling back price changes

All apply operations save snapshots in history. Rollback: [history](history).

---

## See also

- [Preview and apply](preview-and-apply)
- [Inline price editing](inline-editing)
