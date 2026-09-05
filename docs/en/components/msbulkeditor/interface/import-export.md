---
title: Import and export
description: CSV/XLSX export and import of price, stock, article
---

# Import & export

Exchange data with Excel/CSV without typing values in the operation dialog.

![Import & export tab](/components/msbulkeditor/screenshots/import-export-tab.png)

---

## Export vs import

| | Export | Import (UI) |
| --- | --- | --- |
| Columns | Any from catalog: `id`, MS3 fields, `tv:*`, `option:*` | **Price**, **stock**, **article** only |
| Excel round-trip | Export → edit → upload | `price`, `stock`/`count`, `article` |
| TV / options | Yes in file | Not in UI; use a bulk operation |

Exporting TV/options is useful for reports. You cannot mass-update TV/options from the import tab.

Tab permission: **`msbulkeditor_import_export`**. Without it the tab is hidden.

Above the forms the UI shows **operation scope** (same selection meta as on Products): export and import apply use the current selection / expert mode.

---

## Export

### Steps

1. On **Products**, set filters and selection (rows or expert mode).
2. **Import & export** tab → **Export** block.
3. **Format:** CSV or XLSX.
4. **Columns** comma-separated (default `id,pagetitle,price,stock,published`).
5. **Run export** — the browser downloads the file.

![Export form](/components/msbulkeditor/screenshots/export-form.png)

### Columns

| Key | Note |
| --- | --- |
| `id` | Required for round-trip |
| `pagetitle` | Title |
| `price` | Price |
| `stock` or `count` | Stock (both keys resolve to the same field) |
| `published` | 0/1 |
| `article` | SKU |
| `tv:name` / `msbe:tv:name` | TV value from `fields.tvs` |
| `option:key` / `msbe:option:key` | Option value from `fields.options`; multi-value comma-separated |

TVs and options use keys from [columns](column-settings) or short prefixes `tv:` / `option:`.

### XLSX

Requires **OpenSpout** in the component vendor (`composer install` in `core/components/msbulkeditor`). Otherwise message `msbulkeditor_export_xlsx_unavailable`.

Permission: **`msbulkeditor_import_export`**.

### Plugins

Integrators can add virtual columns via `msbeOnExportColumns` and `msbeOnExportBuildRow`. Example: [MODX events](../events#extending-export-with-a-plugin).

---

## Import (round-trip)

1. Export CSV/XLSX.
2. Edit `price`, `stock`/`count`, or `article` in Excel.
3. **Choose file** → upload (`import/parse`). After parse, **Replace file** is available.
4. Set **target field** and ID / value column mapping.
5. **Preview import** → **Apply import**.

Without mapping, Preview stays disabled (`msbulkeditor_import_mapping_required_hint`). Without a successful preview, Apply stays disabled (`msbulkeditor_import_apply_disabled_hint`).

![Import column mapping](/components/msbulkeditor/screenshots/import-mapping.png)

### Target field → API

| UI | `fieldType` | Parameters |
| --- | --- | --- |
| Price | `price` | `mode: set`, `field: price` |
| Stock | `stock` | `mode: set`, `field: count` |
| Article | `text_set` | `field: article` |

Mapping keys: `product_id` and `value`. For stock, file headers may be `count`, `stock`, `quantity`, or `qty`.

### Limits

| Parameter | Default |
| --- | --- |
| Rows in file | 10,000 (`msbulkeditor_import_max_rows`) |
| File size | 10 MB |
| Formats | `.csv`, `.xlsx` |

A warning appears when the file is truncated by the limit.

---

## JSON import

Block **“Advanced: row JSON and mapping”** — same target fields (price / stock / article), no file upload:

```json
[
  {"id": 22, "price": 199},
  {"id": 23, "price": 249}
]
```

Mapping:

```json
{"product_id": "id", "value": "price"}
```

For TVs and options use a [bulk operation](preview-and-apply), not this block.

---

## After import

- Summary: **Success / Skipped / Errors**.
- **Clear preview** — reset import preview and apply result. If already empty — toast “nothing to clear”.

Import uses the same preview/apply pipeline as bulk operations.

---

## See also

- [Product & prices](product-and-prices)
- [events](../events) — `export/run`, `import/parse`, `import/run`
