---
title: Import
---
# Utilities: Import

Step-by-step wizard for importing products from CSV files.

## Purpose

Import lets you create and update products in bulk from a CSV file. Supported:

- Automatic encoding detection (UTF-8, Windows-1251, KOI8-R)
- Visual column-to-field mapping
- Updating existing products by key field
- Import of TV fields and product options
- Image upload to gallery

## Step-by-step process

### Step 1: Upload file

**Upload:**

- Drag a CSV file into the upload area or click to select
- Only `.csv` files are supported
- Max size depends on server settings

**Settings:**

| Parameter | Description | Default |
|-----------|-------------|---------|
| Delimiter | Column separator | `;` |
| Skip header | First row is column names | Yes |

**Supported delimiters:**

- `;` — semicolon (recommended)
- `,` — comma
- `Tab` — tab

After upload you see:

- Row count
- Detected encoding
- Warning for large files

::: info Encoding
Windows-1251 files are converted to UTF-8 on processing.
:::

### Step 2: Field mapping

Map each CSV column to a product field.

**Required fields:**

- `pagetitle` — product name
- `parent` — parent category ID

**Mapping table:**

| CSV column | → | Product field | Preview |
|------------|---|---------------|---------|
| A: "Name" | → | pagetitle | iPhone 15 |
| B: "Category" | → | parent | 5 |
| C: "Price" | → | price | 99990 |

::: tip Auto mapping
Columns are auto-mapped by header names. E.g. column "name" maps to `pagetitle`.
:::

**Update settings:**

| Parameter | Description |
|-----------|-------------|
| Update existing | If product found by key — update it |
| Search key | Field used to find duplicates |

Search keys:

- `article` — SKU (recommended)
- `pagetitle` — name
- `id` — resource ID

### Step 3: Import

**Summary before run:**

- File name
- Row count
- Mapped field count

**Import modes:**

| Mode | Description |
|------|-------------|
| Sync | Import runs immediately, wait for completion |
| Async | Task added to [Scheduler](/en/components/scheduler/) (for large files) |

::: warning Large files
For files over 300 rows use async mode via [Scheduler](/en/components/scheduler/).
:::

**Debug mode:**

- Processes only the first row
- Useful to verify mapping

**Import result:**

```
Import complete!
- Total processed: 150
- Created: 120
- Updated: 25
- Errors: 3
- Skipped: 2
```

## Available fields

### Resource fields

| Field | Description |
|-------|-------------|
| `pagetitle` | Product name (required) |
| `longtitle` | Extended title |
| `description` | Meta description |
| `introtext` | Intro text |
| `content` | Main content |
| `alias` | URL alias |
| `parent` | Parent category ID (required) |
| `template` | Template ID |
| `published` | Published (0/1) |
| `deleted` | Deleted (0/1) |
| `hidemenu` | Hide from menu (0/1) |

### Product fields (msProductData)

| Field | Description |
|-------|-------------|
| `article` | SKU |
| `price` | Price |
| `old_price` | Old price |
| `weight` | Weight |
| `color` | Color |
| `size` | Size |
| `remains` | Stock |
| `vendor` | Vendor (name or ID) |
| `made_in` | Country of origin |
| `new` | New (0/1) |
| `popular` | Popular (0/1) |
| `favorite` | Favorite (0/1) |

### Special fields

| Field | Description |
|-------|-------------|
| `gallery` | Image path (relative to root) |
| `tv.{name}` | TV field by name (e.g. `tv.brand`) |
| `option.{key}` | Product option (e.g. `option.color`) |

## CSV format

### Example

```csv
pagetitle;parent;article;price;old_price;vendor;gallery
iPhone 15 Pro;5;IP15PRO;119990;129990;Apple;assets/import/iphone15.jpg
Samsung Galaxy S24;5;SGS24;89990;99990;Samsung;assets/import/galaxy.jpg
```

### Recommendations

- Use semicolon (`;`) as delimiter
- First row = column headers
- Quote text that contains delimiter
- Empty cell = empty value
- Gallery path relative to site root

### Multiple images

Add several `gallery` columns:

```csv
pagetitle;gallery;gallery;gallery
Product;img/1.jpg;img/2.jpg;img/3.jpg
```

## Troubleshooting

### "Required field not specified"

**Cause:** `pagetitle` or `parent` not mapped.

**Fix:** Go back to step 2 and map required fields.

### Products not created

**Possible causes:**

- Invalid `parent` (category ID)
- No permission to create resources
- Validation errors

**Fix:** Enable debug mode and check MODX logs.

### Wrong encoding

**Symptom:** Cyrillic or other chars display incorrectly.

**Fix:**

- Save file as UTF-8 without BOM
- Or ensure detected encoding matches the file

### Images not loading

**Check:**

- Files exist at the given path
- Path is relative to site root
- Read permissions on files

## Programmatic use

### API Endpoint

```
POST /api/mgr/import/start
```

**Parameters:**

```json
{
  "importfile": "assets/import/products.csv",
  "mapping": "{\"0\":\"pagetitle\",\"1\":\"parent\",\"2\":\"price\"}",
  "delimiter": ";",
  "skip_header": true,
  "update": true,
  "key": "article",
  "scheduler": false,
  "debug": false
}
```

### Import events

Use [import events](../../development/events/import) to extend:

- `msOnBeforeImport` — before import starts
- `msOnImportRow` — for each row
- `msOnAfterImport` — after import completes
