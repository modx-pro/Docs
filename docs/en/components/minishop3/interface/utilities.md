---
title: Utilities
---
# Utilities

The utilities section provides tools for bulk operations and MiniShop3 component configuration.

## Access

**Menu:** Applications → MiniShop3 → Utilities

## Tabs

| Tab | Description |
|-----|-------------|
| [Gallery](utilities/gallery) | Bulk thumbnail regeneration |
| [Import](utilities/import) | Product import from CSV files |
| [Product fields](utilities/product-fields) | Field display configuration in product card |
| [Extra fields](utilities/extra-fields) | Creating new fields for models |
| [Grid columns](utilities/grid-columns) | Table column configuration |
| [Model fields](utilities/model-fields) | Database model field management |

## Overview

### Gallery

Tool for bulk regeneration of product image thumbnails. Useful after:

- Changing thumbnail settings in system settings
- Site migration
- Bulk image updates

### Import

Step-by-step wizard for importing products from CSV with:

- Automatic file encoding detection
- Visual column-to-field mapping
- Debug mode for first-row preview
- [Scheduler](/en/components/scheduler/) integration for large files

### Product fields

Configuration of fields on the "Product data" tab:

- Enable/disable fields
- Grouping by sections
- Display order
- Section creation and management

### Extra fields

Creating new fields to extend models:

- msProductData — products
- msVendor — vendors
- msOrder — orders
- msOrderAddress — addresses
- msCategory — categories

### Grid columns

Configuration of columns in admin tables:

- Column visibility
- Sorting and filtering
- Column width
- Display templates

### Model fields

Management of existing model fields:

- Field settings editing
- Section binding
- Widget (xtype) configuration
- Section management
