---
title: Utilities
---
# Utilities

The utilities section provides tools for bulk operations and MiniShop3 component configuration.

## Access

**Menu:** Applications → MiniShop3 → Utilities

## Tabs

| Tab | Description |
| --- | --- |
| [Gallery](utilities/gallery) | Bulk thumbnail regeneration for images |
| [Import](utilities/import) | Product import from CSV files |
| [Product fields](utilities/product-fields) | Product card field display configuration |
| [Extra fields](utilities/extra-fields) | Creating new fields for models |
| [Grid columns](utilities/grid-columns) | Table column configuration |
| [Model fields](utilities/model-fields) | Database model field management |

Cookbook: [manager](/en/components/minishop3/manager/) — when to use extra fields, product fields, model fields, or grid columns.

## Feature overview

### Gallery

Tool for bulk regeneration of product image thumbnails. Useful after:

- Changing preview settings in system settings
- Site migration
- Bulk image updates

### Import

Step-by-step wizard for importing products from CSV files with:

- Automatic file encoding detection
- Visual column-to-field mapping
- Debug mode to verify the first row
- Integration with [Scheduler](/en/components/scheduler/) for large files

### Product fields

Data tab layout: sections, visibility, order. New columns via [Extra fields](utilities/extra-fields). Cookbook: [product fields](/en/components/minishop3/manager/product-fields/cookbook).

### Extra fields

Create new fields to extend models:

- msProductData — products
- msVendor — vendors
- msOrder — orders
- msOrderAddress — addresses
- msCategory — categories

### Grid columns

Configure columns in admin tables:

- Column visibility
- Sorting and filtering
- Column width
- Display templates

### Model fields

Manage existing model fields:

- Edit field settings
- Assign to sections
- Configure widgets (xtype)
- Manage sections
