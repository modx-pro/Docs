---
title: Import
---
# Utilities: Import

Step-by-step wizard for importing products from CSV files.

## Purpose

Bulk create and update products from CSV:

- Automatic encoding detection (UTF-8, Windows-1251, KOI8-R)
- Column-to-product-field mapping
- Update by key field
- TV fields, options (`option_*`), images into the gallery
- Active **extra fields** (`msExtraField`) for `msProduct` / `msProductData`

## Step-by-step process

### Step 1: Upload file

**Upload:**

- Drag a CSV file into the upload area or click to select
- Only `.csv` files are supported
- Max size depends on server settings

**Settings:**

| Parameter | Description | Default |
| --- | --- | --- |
| Delimiter | Column separator | `;` |
| Skip header | First row is column names | Yes |

**Supported delimiters:**

- `;` — semicolon (recommended)
- `,` — comma
- `Tab` — tab

After upload you see:

- row count
- detected encoding
- a warning if the file is large

::: info Encoding
Windows-1251 files are converted to UTF-8 during processing.
:::

### Step 2: Field mapping

Map each CSV column to a product field.

**Required fields:**

- `pagetitle` — product name
- `parent` — parent category ID

**Mapping table:**

| CSV column | → | Product field | Preview |
| --- | --- | --- | --- |
| A: "Name" | → | pagetitle | iPhone 15 |
| B: "Category" | → | parent | 5 |
| C: "Price" | → | price | 99990 |

::: tip Auto-mapping
The system maps columns by header names automatically. For example, column "name" maps to `pagetitle`.
:::

**Update settings:**

| Parameter | Description |
| --- | --- |
| Update existing | If a product is found by key — update it |
| Lookup key | Field to find duplicates |

Available lookup keys:

- `article` — SKU (recommended)
- `pagetitle` — name
- `id` — resource ID

### Extra fields and Object Extension

The mapping column list comes from `GET /api/mgr/import/fields`:

1. Static catalog `config/import-fields.php` (resource, `msProductData`, options).
2. Active `msExtraField` rows for models `msProduct` and `msProductData` whose column already exists in the DB (`column_exists`).

Widget type `ms3-repeater` is **excluded** from import: repeater JSON rows are not mapped via CSV. Simple extra fields (`varchar`, `int`, `decimal`, `text`, …) and key-value (if the column exists) appear in the UI as regular product fields.

Reserved names from the static catalog cannot be overridden by an extra field key.

Options still use the `option_` prefix in CSV or an explicit mapping to an option key.

### Step 3: Import

**Summary before run:**

- File name
- Row count
- Mapped field count

**Import modes:**

| Mode | Description |
| --- | --- |
| Synchronous | Import runs immediately, you wait for the response |
| Asynchronous | The task goes to [Scheduler](/en/components/scheduler/) (large files) |

::: warning Large files
For files over 300 rows use asynchronous mode via [Scheduler](/en/components/scheduler/).
:::

**Debug mode:**

- Processes only the first row
- Useful to verify mapping

**Import results:**

```
Import complete!
- Total processed: 150
- Created: 120
- Updated: 25
- Errors: 3
- Skipped: 2
```

## Available fields

### Main resource fields

| Field | Description |
| --- | --- |
| `pagetitle` | Product name (required) |
| `longtitle` | Extended title |
| `description` | Description (meta) |
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
| --- | --- |
| `article` | SKU |
| `price` | Price |
| `old_price` | Old price |
| `weight` | Weight |
| `color` | Color |
| `size` | Size |
| `stock` | Stock (`remains` — CSV alias) |
| `vendor` | Vendor (name or ID) |
| `made_in` | Country of origin |
| `new` | New (0/1) |
| `popular` | Popular (0/1) |
| `favorite` | Favorite (0/1) |

### Special fields

| Field | Description |
| --- | --- |
| `gallery` | Image path (relative to site root) |
| `tv.{name}` | TV field by name (e.g. `tv.brand`) |
| `option.{key}` | Product option (e.g. `option.color`) |

## CSV file format

### Example structure

```csv
pagetitle;parent;article;price;old_price;vendor;gallery
iPhone 15 Pro;5;IP15PRO;119990;129990;Apple;assets/import/iphone15.jpg
Samsung Galaxy S24;5;SGS24;89990;99990;Samsung;assets/import/galaxy.jpg
```

### Recommendations

- Use semicolon (`;`) as delimiter
- First row — column headers
- Quote text that contains delimiters
- Leave cells empty for missing values
- For gallery use path relative to site root

### Multiple values

For multiple images add several `gallery` columns:

```csv
pagetitle;gallery;gallery;gallery
Product;img/1.jpg;img/2.jpg;img/3.jpg
```

## Troubleshooting

### "Required field not specified" error

**Cause:** `pagetitle` or `parent` not mapped.

**Fix:** Return to step 2 and map required fields.

### Products not created

**Possible causes:**

- Invalid `parent` (category ID)
- No permission to create resources
- Data validation errors

**Fix:** Enable debug mode and check MODX logs.

### Wrong encoding

**Symptom:** Cyrillic displays incorrectly.

**Fix:**

- Save the file as UTF-8 without BOM
- Or ensure detected encoding matches the file

### Images not uploaded

**Check:**

- Files exist at the specified path
- Path is relative to site root
- Read permissions on files

For programmatic gallery upload use processor `MiniShop3\Processors\Gallery\Upload` (see [Product API](../../development/backend-api/product#gallery-images)).

## Programmatic use

### Import processors

| Processor | Purpose |
| --- | --- |
| `MiniShop3\Processors\Utilities\Import\Fields` | Field list for mapping |
| `MiniShop3\Processors\Utilities\Import\Upload` | CSV upload |
| `MiniShop3\Processors\Utilities\Import\Preview` | Preview |
| `MiniShop3\Processors\Utilities\Import\Import` | Run import |
| `MiniShop3\Processors\Utilities\Import\Progress` | Progress |

### API endpoint

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

To extend functionality use [import events](../../development/events/import):

- `msOnBeforeImport` — before import starts
- `msOnImportRow` — on each row
- `msOnAfterImport` — after import completes
