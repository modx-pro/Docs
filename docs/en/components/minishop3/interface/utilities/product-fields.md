---
title: Product fields
---
# Utilities: Product fields

Configuring field display on the "Product data" tab in the product card.

## Purpose

This tool lets you:

- Enable and disable field visibility
- Group fields by sections
- Change field order
- Create and edit sections
- Configure each field

## Interface

### Sections

Left panel lists sections with drag-and-drop reorder.

**Section actions:**

- **Add** — create section
- **Edit** — change section params
- **Delete** — delete section (fields move to "No section")
- **Drag** — reorder sections

### Fields

Right panel shows fields of the selected section.

**Shown:**

- Field name (key)
- Label
- Widget type (xtype)
- Visibility

**Field actions:**

- **Edit** — field parameters
- **Drag** — reorder within section

## Section management

### Creating a section

1. Click **"Add section"**
2. Fill the form:

| Field | Description | Required |
|-------|-------------|----------|
| Section key | Unique ID (Latin) | Yes |
| Lexicon key | Key for translated name | No |
| Label | Display name | No |
| Hidden | Section not shown in card | No |

::: tip Lexicon
If a lexicon key is set, the name comes from locale files for multi-language interface.
:::

### Editing a section

Click the edit icon next to the section name or double-click the section.

### Deleting a section

::: warning Note
When a section is deleted, its fields move to "No section". Fields are not deleted.
:::

## Field management

### Editing a field

Click a field to open the edit dialog.

**Parameters:**

| Parameter | Description |
|-----------|-------------|
| Label | Display name |
| Description | Hint under field |
| Section | Section for the field |
| Widget type (xtype) | Form element type |
| Visible | Show in card |
| Order | Position in section |

### Widget types (xtype)

| Type | Description |
|------|-------------|
| `textfield` | Single-line text |
| `numberfield` | Number |
| `textarea` | Multi-line text |
| `xcheckbox` | Checkbox |
| `ms3-combo-vendor` | Vendor selection |
| `ms3-combo-autocomplete` | Autocomplete from list |
| `ms3-combo-options` | Product option selection |

### Moving fields

- **Within section** — drag up/down
- **Between sections** — change section in edit dialog

## Default sections

Default sections:

| Key | Label | Description |
|-----|-------|-------------|
| `main` | Main data | SKU, price, weight, etc. |
| `availability` | Stock | Stock, statuses |
| `content` | Content | Description, specs |

## Saving changes

- Changes save **automatically** when dragging
- When editing field/section click **"Save"**
- **Reload the page** to see changes in the product card

## API Endpoints

### Get field config

```
GET /api/mgr/config/page-fields/product_data
```

**Response:**

```json
{
  "success": true,
  "object": {
    "fields": [
      {
        "name": "article",
        "label": "SKU",
        "xtype": "textfield",
        "section": 1,
        "visible": true,
        "sort_order": 0
      }
    ]
  }
}
```

### Get sections

```
GET /api/mgr/config/sections/product_data
```

### Save field config

```
PUT /api/mgr/config/page-fields/product_data
```

**Request body:**

```json
{
  "name": "article",
  "label": "Product SKU",
  "section": 1,
  "visible": true,
  "sort_order": 0
}
```

### Create section

```
POST /api/mgr/config/sections/product_data
```

**Request body:**

```json
{
  "section_key": "custom",
  "lexicon_key": "ms3_section_custom",
  "label": "Extra",
  "hidden": false,
  "sort_order": 100
}
```

## Configuration examples

### Hiding unused fields

For a clothing store, hide `color` and `size` when using options:

1. Open field `color`
2. Uncheck "Visible"
3. Save
4. Repeat for `size`

### Creating "SEO" section

1. Click "Add section"
2. Fill:
   - Key: `seo`
   - Label: `SEO`
3. Move fields `metatitle`, `metadescription` into the new section

### Changing section order

Drag sections into the desired order, e.g.:

1. Main data
2. Prices
3. Stock
4. SEO
