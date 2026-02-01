---
title: Model fields
---
# Utilities: Model fields

Managing existing model fields from the database.

## Purpose

The tool manages fields registered in the `ms3_product_fields` table:

- View all model fields
- Edit display settings
- Bind fields to sections
- Configure widgets (xtype)
- Manage field sections

## Difference from "Extra fields"

| Aspect | Model fields | Extra fields |
|--------|--------------|--------------|
| Source | Existing DB fields | New fields |
| Creating columns | No | Yes (ALTER TABLE) |
| Delete | Config only | Full removal |
| Use | Display config | Schema extension |

## Interface

### Model selection

Model filter at the top:

- msProductData — product data
- msVendor — vendors
- msOrder — orders
- msOrderAddress — addresses

### Sections panel

Left panel lists sections for the selected model.

**Section actions:**

- Add section
- Edit section
- Delete section
- Reorder (drag-and-drop)

### Fields table

Right side shows fields and settings:

| Column | Description |
|--------|-------------|
| Name | System field name |
| Label | Display name |
| Type (xtype) | Widget type |
| Section | Section |
| Visible | Show field |
| Width | Grid width (3-12) |

## Editing a field

Click a row to open the edit dialog.

### Basic parameters

| Parameter | Description |
|-----------|-------------|
| Label | Display name |
| Description | Hint under input |
| Section | Group for the field |
| Visible | Show in form |

### Widget type (xtype)

| Type | Description |
|------|-------------|
| `textfield` | Text field |
| `numberfield` | Number field |
| `textarea` | Multi-line field |
| `combo` | Dropdown |
| `datefield` | Date picker |
| `checkbox` | Checkbox |

### Grid width

12-column grid:

| Value | Width | Description |
|-------|-------|-------------|
| 3 | 25% | Quarter |
| 4 | 33% | Third |
| 6 | 50% | Half |
| 8 | 67% | Two thirds |
| 12 | 100% | Full row |

### Combo data source

For `combo` type use JSON config:

```json
{
  "store": [
    ["value1", "Option 1"],
    ["value2", "Option 2"],
    ["value3", "Option 3"]
  ]
}
```

Or load from API:

```json
{
  "url": "/api/mgr/options/list",
  "valueField": "id",
  "displayField": "name"
}
```

## Section management

### Creating a section

1. Click "+" in the sections panel
2. Fill the form:

| Field | Description |
|-------|-------------|
| Key | Unique identifier |
| Label | Display name |
| Order | Position in list |

### Editing a section

Click the edit icon next to the section name.

### Deleting a section

::: warning Note
When a section is deleted, its fields move to "No section". Fields are not deleted.
:::

### Section order

Drag sections to reorder.

## Examples

### Grouping price fields

1. Create section "Prices":
   - Key: `prices`
   - Label: `Prices`

2. Move fields into it:
   - `price` → Prices
   - `old_price` → Prices
   - `wholesale_price` → Prices (if added)

### Field width

For compact layout:

| Field | Width |
|-------|-------|
| article | 6 (50%) |
| price | 3 (25%) |
| old_price | 3 (25%) |
| weight | 4 (33%) |
| remains | 4 (33%) |

### Hiding technical fields

Commonly hidden:

- `id` — auto-generated
- `createdon` — technical dates
- `source` — if using a single source

## API Endpoints

### List models

```
GET /api/mgr/model-fields/models
```

**Response:**

```json
{
  "success": true,
  "object": {
    "models": [
      { "value": "msProductData", "label": "Product data" },
      { "value": "msVendor", "label": "Vendor" }
    ]
  }
}
```

### List model fields

```
GET /api/mgr/model-fields?model=msProductData
```

### Update field

```
PUT /api/mgr/model-fields/{id}
```

**Request body:**

```json
{
  "label": "Product SKU",
  "xtype": "textfield",
  "section_id": 1,
  "visible": true,
  "width": 6,
  "description": "Unique product code"
}
```

### Model sections

```
GET /api/mgr/model-fields/sections?model=msProductData
```

### Create section

```
POST /api/mgr/model-fields/sections
```

**Request body:**

```json
{
  "model": "msProductData",
  "key": "prices",
  "label": "Prices",
  "sort_order": 10
}
```

### Delete section

```
DELETE /api/mgr/model-fields/sections/{id}
```

## Relation to config

Changes here affect:

1. **Product card** — field display on the "Data" tab
2. **Grids** — available columns
3. **Import** — fields available for mapping
4. **API** — object serialization

To see changes you may need to:

- Reload the page
- Clear browser cache
- Clear MODX cache
