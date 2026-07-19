---
title: Model fields
---
# Utilities: Model fields

Manage existing model fields from the database.

## Purpose

Manage fields registered in `ms3_product_fields`:

- View all model fields
- Edit display settings
- Assign fields to sections
- Configure widgets (xtype)
- Manage field sections

## Difference from "Extra fields"

| Aspect | Model fields | Extra fields |
|--------|--------------|--------------|
| Source | Existing DB fields | New fields |
| Column creation | No | Yes (ALTER TABLE) |
| Deletion | From configuration only | Full removal |
| Use | Display configuration | Schema extension |

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

- Add new section
- Edit existing
- Delete section
- Reorder (drag-and-drop)

### Fields table

Right side shows fields and settings:

| Column | Description |
|--------|-------------|
| Name | System field name |
| Label | Display name |
| Type (xtype) | Widget type |
| Section | Section assignment |
| Visibility | Show field |
| Width | Grid width (3–12) |

## Editing a field

Click a row to open the edit dialog.

### Basic parameters

| Parameter | Description |
|-----------|-------------|
| Label | Display field name |
| Description | Hint below input |
| Section | Group where the field appears |
| Visibility | Show in form |

### Widget type (xtype)

| Type | Description |
|------|-------------|
| `textfield` | Text field |
| `numberfield` | Number field |
| `textarea` | Multiline field |
| `combo` | Dropdown |
| `datefield` | Date picker |
| `checkbox` | Checkbox |

### Grid width

Uses a 12-column grid:

| Value | Width | Description |
|-------|-------|-------------|
| 3 | 25% | Quarter row |
| 4 | 33% | Third row |
| 6 | 50% | Half row |
| 8 | 67% | Two thirds |
| 12 | 100% | Full row |

### Data source for combo

For `combo` type set JSON configuration:

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
| Order | Position in section list |

### Editing a section

Click the edit icon next to the section name.

### Deleting a section

::: warning Note
Deleting a section does not delete fields; they move to "No section".
:::

### Section order

Drag sections to change display order.

## Usage examples

### Grouping price fields

1. Create section "Prices":
   - Key: `prices`
   - Label: `Prices`

2. Move fields into the section:
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

Fields often hidden:

- `id` — auto-generated
- `createdon` — technical dates
- `source` — when using a single media source

## API endpoints

### Model list

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

### Model field list

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

## Configuration impact

Changes here affect:

1. **Product card** — field display on the "Data" tab
2. **Grids** — available columns
3. **Import** — fields available for mapping
4. **API** — object serialization

To apply changes in the UI you may need:

- Page reload
- Browser cache clear
- MODX cache clear
