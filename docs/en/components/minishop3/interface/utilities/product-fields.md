---
title: Product fields
---
# Utilities: Product fields

Configure field display on the "Product data" tab in the product card.

## Purpose

This tool lets you:

- Enable and disable field visibility
- Group fields into sections
- Change field display order
- Create and edit sections
- Configure each field's parameters

## Interface

### Sections

The left panel lists sections with drag-and-drop sorting.

**Section actions:**

- **Add** — create a new section
- **Edit** — change section parameters
- **Delete** — delete a section (fields move to "No section")
- **Drag** — reorder sections

### Fields

The right panel shows fields for the selected section.

**Displayed info:**

- Field name (key)
- Label
- Widget type (xtype)
- Visibility status

**Field actions:**

- **Edit** — configure field parameters
- **Drag** — reorder within the section

## Section management

### Creating a section

1. Click **Add section**
2. Fill the form:

| Field | Description | Required |
|-------|-------------|----------|
| Section key | Unique identifier (Latin) | Yes |
| Lexicon key | Key for translated title | No |
| Title | Display name | No |
| Hidden | Section hidden in product card | No |

::: tip Lexicon
If a lexicon key is set, the title comes from localization files. This supports multiple manager languages automatically.
:::

### Editing a section

Click the edit icon next to the section name or double-click the section.

### Deleting a section

::: warning Note
When a section is deleted, all its fields move to "No section". Fields are not deleted.
:::

## Field management

### Editing a field

Click a field to open the edit dialog.

**Available parameters:**

| Parameter | Description |
|-----------|-------------|
| Title (label) | Display label |
| Description | Hint below the field |
| Section | Section the field belongs to |
| Widget type (xtype) | Form element type |
| Visibility | Show/hide in product card |
| Order | Position in the section field list |

### Widget types (xtype)

| Type | Description |
|------|-------------|
| `textfield` | Single-line text |
| `numberfield` | Number field |
| `textarea` | Multiline text |
| `xcheckbox` | Checkbox |
| `ms3-combo-vendor` | Vendor picker |
| `ms3-combo-autocomplete` | Autocomplete from list |
| `ms3-combo-options` | Pick from product options |

### Moving fields

Fields can be moved:

- **Within a section** — drag up/down
- **Between sections** — change section in the edit dialog

## Default sections

By default these sections exist:

| Key | Title | Description |
|-----|-------|-------------|
| `main` | Main data | SKU, price, weight, etc. |
| `availability` | Availability | Stock, flags |
| `content` | Content | Description, attributes |

## Saving changes

- Changes save **automatically** when dragging
- When editing a field/section click **Save**
- **Reload the product page** to see changes in the product card

## API endpoints

### Get field configuration

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

### Save field configuration

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
  "label": "Additional",
  "hidden": false,
  "sort_order": 100
}
```

## Configuration examples

### Hiding unneeded fields

For a clothing store using options for color and size separately:

1. Open field `color`
2. Uncheck **Visibility**
3. Save
4. Repeat for `size`

### Creating an "SEO" section

1. Click "Add section"
2. Fill:
   - Key: `seo`
   - Title: `SEO`
3. Move `metatitle`, `metadescription` into the new section

### Section order

Drag sections to the desired order. For example:

1. Main data
2. Prices
3. Availability
4. SEO
