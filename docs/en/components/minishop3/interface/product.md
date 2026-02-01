---
title: Product
---
# Product page

Editing a product in the MiniShop3 admin panel.

## Overview

The product edit page (`msProduct`) combines standard MODX functionality with e-commerce features:

- Editable sections with product fields
- Image gallery with drag-and-drop upload
- Product links
- Options and specifications
- Additional categories

## Tab structure

### Document

Standard MODX tab with main resource fields:

| Field | Description |
|-------|-------------|
| `pagetitle` | Product name |
| `longtitle` | Extended title |
| `description` | Meta description |
| `introtext` | Short description |
| `content` | Full description |
| `alias` | URL alias |
| `parent` | Parent category |

### Product data

Tab with product fields grouped by sections. Uses a Vue 3 component for flexible display.

**Default sections:**

| Section | Fields |
|---------|--------|
| Main data | `article`, `price`, `old_price`, `weight` |
| Stock | `remains`, `new`, `popular`, `favorite` |
| Specifications | `color`, `size`, `vendor`, `made_in`, `tags` |

::: tip Configuration
Sections and fields are configured via [Utilities → Product fields](utilities/product-fields).
:::

### Gallery

Product image management:

- Upload via drag-and-drop
- Sort by dragging
- Set main image
- Edit description

See also: [Product gallery](gallery)

### Links

Product link configuration:

| Link type | Description |
|-----------|-------------|
| Related | Accessories, components |
| Similar | Similar products |
| Recommended | Personal recommendations |

### Categories

Additional product categories. A product can belong to several categories besides the main one (`parent`).

### Options

Product option values (if configured in [Settings → Options](settings/options)):

- Colors
- Sizes
- Materials
- Any custom options

## Section and field architecture

### Data storage

Field configuration is stored in the database:

| Table | Description |
|-------|-------------|
| `ms3_page_sections` | Page sections |
| `ms3_product_fields` | Product fields with settings |

### msPageSection model

A section is a container for grouping fields.

**Model fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Section ID |
| `page_key` | string | Page key (`product_data`) |
| `section_key` | string | Unique section key |
| `lexicon_key` | string | Lexicon key for name |
| `label` | string | Name (if no lexicon) |
| `hidden` | bool | Whether section is hidden |
| `sort_order` | int | Sort order |

### msProductField model

Product field with display settings.

**Model fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | int | Field ID |
| `name` | string | System name |
| `label` | string | Display name |
| `description` | string | Hint |
| `xtype` | string | Widget type |
| `section` | int | Section ID |
| `visible` | bool | Visibility |
| `required` | bool | Required |
| `sort_order` | int | Order in section |
| `width` | int | Width in percent |
| `config` | json | Extra settings |
| `is_system` | bool | System field |
| `is_default` | bool | Default field |

## Section management

### Creating a section

**Via interface:**

1. Open **Utilities → Product fields**
2. Click **"Add section"**
3. Fill in:
   - **Section key** — unique identifier (Latin, e.g. `seo`)
   - **Lexicon key** — for multilingual names (e.g. `ms3_section_seo`)
   - **Label** — display name
4. Save

**Via API:**

```
POST /api/mgr/config/sections/product_data
```

```json
{
  "section_key": "seo",
  "lexicon_key": "ms3_section_seo",
  "label": "SEO",
  "hidden": false,
  "sort_order": 100
}
```

**Via PHP:**

```php
$section = $modx->newObject('MiniShop3\\Model\\msPageSection');
$section->fromArray([
    'page_key' => 'product_data',
    'section_key' => 'seo',
    'lexicon_key' => 'ms3_section_seo',
    'label' => 'SEO',
    'hidden' => false,
    'sort_order' => 100
]);
$section->save();
```

### Editing a section

1. Click the edit icon next to the section
2. Change parameters
3. Save

### Deleting a section

::: warning Note
When a section is deleted, all its fields are moved to the "No section" area (section = 0).
:::

### Sorting sections

Drag sections in the desired order in the left panel.

## Field management

### Adding a new field

New fields are added via [Utilities → Extra fields](utilities/extra-fields). This creates:

1. A column in the `ms3_product_data` table
2. A record in `ms3_product_fields`

### Configuring an existing field

**Via interface:**

1. Open **Utilities → Product fields**
2. Select a section
3. Click a field to edit
4. Configure:

| Parameter | Description |
|-----------|-------------|
| Label | Display name |
| Description | Hint under field |
| Section | Section membership |
| Widget type | Form element type |
| Visibility | Show/hide |
| Width | Width in % (50 = half) |

**Via API:**

```
PUT /api/mgr/config/page-fields/product_data
```

```json
{
  "name": "article",
  "label": "Product SKU",
  "section": 1,
  "visible": true,
  "sort_order": 0,
  "width": 50
}
```

### Moving a field between sections

1. Open field edit
2. Select new section in the dropdown
3. Save

Or change `section` via API.

### Sorting fields

Drag fields in the desired order within a section.

### Hiding a field

1. Open field edit
2. Uncheck "Visibility"
3. Save

The field remains in the database but is not shown on the product card.

## Widget types (xtype)

### Standard

| Type | Description | Use |
|------|-------------|-----|
| `textfield` | Single-line text | SKU, name |
| `numberfield` | Number | Price, weight |
| `textarea` | Multi-line | Description |
| `xcheckbox` | Checkbox | new, popular, favorite |

### MiniShop3 comboboxes

| Type | Description |
|------|-------------|
| `ms3-combo-vendor` | Vendor selection |
| `ms3-combo-category` | Category selection |
| `ms3-combo-autocomplete` | Autocomplete from list |
| `ms3-combo-options` | Option value selection |

### Extended

| Type | Description |
|------|-------------|
| `modx-combo-browser` | File selection via Media Browser |
| `datefield` | Date picker |
| `timefield` | Time picker |
| `htmleditor` | WYSIWYG editor |

## System settings

| Setting | Description | Default |
|---------|-------------|---------|
| `ms3_product_tab_extra` | Show data tab | `true` |
| `ms3_product_tab_gallery` | Show gallery tab | `true` |
| `ms3_product_tab_links` | Show links tab | `true` |
| `ms3_product_tab_options` | Show options tab | `true` |
| `ms3_product_tab_categories` | Show categories tab | `true` |
| `ms3_product_remember_tabs` | Remember active tab | `true` |
| `ms3_product_main_fields` | "Document" tab fields | pagetitle, longtitle, ... |
| `ms3_product_extra_fields` | Extra fields | price, article, ... |

## API Endpoints

### Field configuration

**Get all fields:**

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
        "sort_order": 0,
        "width": 50
      }
    ],
    "sections": {
      "1": {
        "id": 1,
        "section_key": "main",
        "label": "Main data",
        "sort_order": 0
      }
    }
  }
}
```

**Save field:**

```
PUT /api/mgr/config/page-fields/product_data
```

### Sections

**Get sections:**

```
GET /api/mgr/config/sections/product_data
```

**Create section:**

```
POST /api/mgr/config/sections/product_data
```

**Update section:**

```
PUT /api/mgr/config/sections/product_data/{id}
```

**Delete section:**

```
DELETE /api/mgr/config/sections/product_data/{id}
```

### Product data

**Get data:**

```
GET /api/mgr/product-data/{product_id}
```

**Save data:**

```
PUT /api/mgr/product-data/{product_id}
```

## Configuration examples

### Creating an "SEO" section

1. Create section:
   - Key: `seo`
   - Label: `SEO`

2. Add lexicon (optional):

```php
// lexicon/ru/product.inc.php
$_lang['ms3_section_seo'] = 'SEO';

// lexicon/en/product.inc.php
$_lang['ms3_section_seo'] = 'SEO';
```

3. Move fields `longtitle` and `description` into the SEO section

### Hiding unused fields

For a clothing store with separate color/size options:

1. Open the `color` field
2. Uncheck "Visibility"
3. Repeat for `size`

### Changing field width

To make `article` full width:

1. Open field edit
2. Set width to `100`
3. Save

Two fields in a row — set each to width `50`.

### Adding a custom field

1. Open **Utilities → Extra fields**
2. Select model `msProductData`
3. Create field:
   - Name: `warranty_months`
   - Type: `INT`
   - xtype: `numberfield`
4. Save (creates column in DB)
5. Open **Utilities → Product fields**
6. Move the field to the desired section
7. Set label and description

## Extending via plugins

### msOnManagerCustomCssJs event

Add custom CSS/JS to the product page:

```php
<?php
// Plugin: MyProductExtension
// Events: msOnManagerCustomCssJs

if ($modx->event->name !== 'msOnManagerCustomCssJs') return;

$page = $modx->event->params['page'] ?? '';

if ($page === 'product_update' || $page === 'product_create') {
    $modx->regClientCSS('/assets/components/mycomponent/css/product.css');
    $modx->regClientStartupScript('/assets/components/mycomponent/js/product.js');
}
```

### Extending the Vue component

Add custom widgets via Plugin Registry:

```javascript
// assets/components/mycomponent/js/product.js

document.addEventListener('DOMContentLoaded', () => {
  if (window.MS3PluginRegistry) {
    MS3PluginRegistry.registerWidget('my-custom-field', {
      component: MyCustomFieldComponent,
      props: ['field', 'modelValue']
    })
  }
})
```

## Related pages

- [Utilities: Product fields](utilities/product-fields) — field display configuration
- [Utilities: Extra fields](utilities/extra-fields) — creating new fields
- [Utilities: Model fields](utilities/model-fields) — database field management
- [Product gallery](gallery) — image system
- [System settings](../settings) — all component settings
