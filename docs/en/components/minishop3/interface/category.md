---
title: Category
---
# Category page

Editing a product category in the MiniShop3 admin panel.

## Overview

The category edit page (`msCategory`) extends standard MODX functionality with product management features:

- Product table with drag-and-drop sorting
- Filtering and search
- Bulk operations (publish, delete)
- Configurable columns and actions
- Category options management

## Tab structure

### Products

<!-- ![Category products table](/components/minishop3/screenshots/mgr-category-products.png) -->

Main category tab — product table with:

| Feature | Description |
| --- | --- |
| Drag-and-drop | Sort products by dragging |
| Filters | Search, published status, custom filters |
| Bulk operations | Publish, unpublish, delete |
| Configurable columns | Via [Utilities → Grid columns](utilities/grid-columns) |
| Actions | View, edit, delete, duplicate |

### Document

Standard MODX tab with resource fields:

| Field | Description |
| --- | --- |
| `pagetitle` | Category name |
| `longtitle` | Extended title |
| `description` | Meta description |
| `introtext` | Short description |
| `content` | Full description |
| `alias` | URL alias |
| `parent` | Parent category |

### Settings

Resource system settings:

- Template
- Publication (date, status)
- Indexing and caching
- **Category options** — configure product options in this category (see below)

### Category options

::: info From v1.10.0-beta1
The tab is fully Vue (`CategoryOptionsTab` component). The legacy ExtJS grid and `Processors/Category/Option/*` processors were removed.
:::

Grid of options linked to this category, with:

- **Drag-and-drop sorting** — order (`position`) is saved in one POST on drop (`/api/mgr/categories/{id}/options/sort`)
- **Inline editing** on double-click:
  - `Default value` — used as the default in the product form
  - `Name (for category)` — per-category override of the global `caption` (empty = use global)
- **"Global" column** (read-only) — shows `caption` from `msOption` for comparison with the override
- **Bulk actions** (checkbox selection): Activate / Deactivate / Make required / Remove required / Delete
- **"Add option" button** — dialog to pick an existing option with fields: default value, active, required, caption/description override
- **"Copy options from category" button** — copies all links from another category (skips duplicates). After copy, `msCategoryOption::afterSave` automatically applies options to all products in the current category.

### Resource groups

Access control for the category.

## Product table

### Technology

The product table is built with Vue 3 + PrimeVue for modern UX:

- Virtualization for large lists
- Dynamic data loading
- Reactive filters
- Smooth drag-and-drop animation

### Column configuration

Table columns are configured in **Utilities → Grid columns** (grid `category-products`).

::: warning Deprecated setting
The system setting `ms3_category_grid_fields` was removed in 1.7.0. Use [Grid columns](utilities/grid-columns) instead.
:::

### Inline editing

Double-click a cell to edit in place:

| Editor type | Fields |
| --- | --- |
| `text` | `pagetitle`, `longtitle`, `article`, `made_in` |
| `number` | `price`, `old_price`, `weight` |
| `boolean` | `published`, `new`, `popular`, `favorite` |

Configure in **Utilities → Grid columns**, grid **category-products**: enable **editable**, set **editor_type** (`text`, `number`, `select`, `combo`). Step-by-step: [Grid columns cookbook](/en/components/minishop3/manager/grid-config/cookbook).

See also: [Utilities: Grid columns](utilities/grid-columns).

## Table column configuration

### Via interface

1. Open **Utilities → Grid columns**
2. Select the **category-products** grid
3. Configure visibility, order, column width
4. Save

### Via API and utilities

In 1.13.x there is **no** PHP file `core/components/minishop3/custom/grids/category-products.php`. Columns live in `ms3_grid_fields` and are configured via:

- **Utilities → Grid columns** (`grid_key=category-products`)
- Manager API `/api/mgr/grid-config/category-products` (see [Grid columns cookbook](/en/components/minishop3/manager/grid-config/cookbook))

Example: add a column via API:

```http
POST /api/mgr/grid-config/category-products/field
```

```json
{
  "field_name": "stock",
  "label": "Stock",
  "type": "model",
  "visible": true,
  "sortable": true,
  "editable": true,
  "editor_type": "number",
  "config": {}
}
```

Inline edit uses **`editable`**, **`editor_type`** (`text`, `number`, `select`, `combo`), and optional **`editor_options`**. Cell write permission: `msproduct_save` (`PUT /api/mgr/categories/{id}/products/{productId}/data`).

### Column types

| Type | Description | Example |
| --- | --- | --- |
| `model` | Model field | Title, SKU |
| `price` | Price with `displayConfig` | 1,234.56 |
| `weight` | Weight with `displayConfig` | 0.5 kg |
| `boolean` | Yes/No | Published |
| `image` | Thumbnail | Product photo |
| `template` | HTML template | Product link |
| `actions` | Action buttons | Edit, delete |
| `relation` | Related table | Status name |
| `badge` | Colored tag | Status with color |
| `option` | Product option | `option.key` |
| `computed` | PHP column class | `computed.className` |

Full reference: [Grid columns](utilities/grid-columns).

### Relation and badge

Relation loads a JOIN. For badge in the `orders` grid, hidden relation columns supply text and HEX; the visible column is type **`badge`** with fields at the **top level** of config (not under `computed`):

```json
{
  "type": "badge",
  "source_field": "status_name",
  "color_field": "status_color"
}
```

For type **`computed`**, config must include **`computed.className`** (class implements `ComputedFieldInterface`).

In `category-products`, relation aggregation is **not supported**.

::: tip Status colors
In `msOrderStatus`, color is often HEX without `#`. The UI prepends `#` when rendering a badge.
:::

## Adding actions to the column

### Action configuration

Actions are configured in a column with type `actions`:

```php
[
    'name' => 'actions',
    'label' => 'Actions',
    'visible' => true,
    'type' => 'actions',
    'width' => '180px',
    'actions' => [
        [
            'name' => 'view',
            'handler' => 'view',
            'icon' => 'pi-eye',
            'label' => 'view',
        ],
        [
            'name' => 'edit',
            'handler' => 'edit',
            'icon' => 'pi-pencil',
            'label' => 'edit',
        ],
        [
            'name' => 'publish',
            'handler' => 'publish',
            'icon' => 'pi-check',
            'iconOff' => 'pi-times',
            'label' => 'publish',
            'labelOff' => 'unpublish',
            'toggleField' => 'published',
        ],
        [
            'name' => 'duplicate',
            'handler' => 'duplicate',
            'icon' => 'pi-copy',
            'label' => 'duplicate',
        ],
        [
            'name' => 'delete',
            'handler' => 'delete',
            'icon' => 'pi-trash',
            'label' => 'delete',
            'severity' => 'danger',
            'confirm' => true,
            'confirmMessage' => 'product_delete_confirm_message',
        ],
    ],
]
```

### Action parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | string | Unique identifier |
| `handler` | string | Handler name (view, edit, delete, publish, duplicate) |
| `icon` | string | PrimeIcons icon (pi-*) |
| `iconOff` | string | Icon for off state (toggle) |
| `label` | string | Lexicon key for tooltip |
| `labelOff` | string | Lexicon key for off state |
| `severity` | string | Button style (danger, success, warning) |
| `confirm` | bool | Require confirmation |
| `confirmMessage` | string | Lexicon key for confirmation message |
| `toggleField` | string | Field for toggle actions |
| `visible` | function | Visibility condition |

### Custom actions via JavaScript

Register via `MS3ActionRegistry`. The second argument is **`context`**, not `gridId`:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (!window.MS3ActionRegistry) return

  MS3ActionRegistry.register('addToFavorites', async (data, context) => {
    const response = await fetch('/assets/components/mycomponent/api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'addToFavorites',
        product_id: data.id
      })
    })

    const result = await response.json()

    if (result.success) {
      return { success: true, refresh: true }
    }

    return { success: false, message: result.message }
  })
})
```

Add the action to the `actions` column config via **Utilities → Grid columns** or PUT grid-config:

```json
{
  "name": "addToFavorites",
  "handler": "addToFavorites",
  "icon": "pi-heart",
  "label": "Add to favorites"
}
```

### Hooks for standard actions

```javascript
MS3ActionRegistry.registerBeforeHook('delete', async (data, context) => {
  if (data.orders_count > 0) {
    return false
  }
  return true
})

MS3ActionRegistry.registerAfterHook('publish', async (data, result, context) => {
  console.log(`Product ${data.id} published:`, result)
})
```

## Adding a filter

### Filter structure

Filters are configured via config files:

- **Default:** `core/components/minishop3/config/filters/category-products.php`
- **Custom:** `core/components/minishop3/custom/filters/category-products.php`

The custom file overrides the default and is not overwritten on component update.

### Filter configuration

```php
// core/components/minishop3/custom/filters/category-products.php

return [
    // Text search
    'query' => [
        'type' => 'text',
        'label' => 'search',
        'placeholder' => 'search_by_title_article',
        'width' => '250px',
        'position' => 10,
    ],

    // Published filter
    'published' => [
        'type' => 'select',
        'label' => 'published',
        'placeholder' => 'all',
        'source' => [
            'type' => 'static',
            'options' => [
                ['label' => 'ms3_yes', 'value' => 1],
                ['label' => 'ms3_no', 'value' => 0],
            ],
        ],
        'width' => '120px',
        'position' => 20,
    ],

    // Vendor filter
    'vendor_id' => [
        'type' => 'select',
        'label' => 'vendor',
        'placeholder' => 'all',
        'source' => [
            'type' => 'model',
            'class' => 'MiniShop3\\Model\\msVendor',
            'valueField' => 'id',
            'labelField' => 'name',
            'where' => ['active' => 1],
            'sort' => ['name' => 'ASC'],
        ],
        'width' => '180px',
        'position' => 30,
    ],

    // "New" flag filter
    'new' => [
        'type' => 'select',
        'label' => 'new',
        'placeholder' => 'all',
        'source' => [
            'type' => 'static',
            'options' => [
                ['label' => 'ms3_yes', 'value' => 1],
                ['label' => 'ms3_no', 'value' => 0],
            ],
        ],
        'width' => '100px',
        'position' => 40,
    ],

    // Hidden filter (not shown by default)
    'deleted' => [
        'type' => 'select',
        'label' => 'deleted',
        'visible' => false,
        'position' => 100,
    ],
];
```

### Filter parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `type` | string | Filter type: `text`, `select`, `datepicker`, `daterange` |
| `label` | string | Lexicon key for label |
| `placeholder` | string | Lexicon key for placeholder |
| `width` | string | CSS width (`150px`, `20%`) |
| `position` | int | Display order (lower = left) |
| `visible` | bool | Show filter (default `true`) |
| `source` | array | Data source config for `select` |

### Source types for select

#### Static options

```php
'source' => [
    'type' => 'static',
    'options' => [
        ['label' => 'Yes', 'value' => 1],
        ['label' => 'No', 'value' => 0],
    ],
]
```

#### From xPDO model

```php
'source' => [
    'type' => 'model',
    'class' => 'MiniShop3\\Model\\msVendor',
    'valueField' => 'id',
    'labelField' => 'name',
    'where' => ['active' => 1],
    'sort' => ['name' => 'ASC'],
    'limit' => 500,
]
```

### Server-side filter handling

Filters are applied automatically in `CategoryProductsController`:

```php
// core/components/minishop3/src/Controllers/Api/Manager/CategoryProductsController.php

// Boolean filters for msProduct fields
$productBooleanFields = ['published', 'deleted', 'hidemenu'];
foreach ($productBooleanFields as $field) {
    if (isset($params[$field]) && $params[$field] !== '') {
        $c->where(["msProduct.{$field}" => (int)$params[$field]]);
    }
}

// Boolean filters for msProductData fields
$dataBooleanFields = ['new', 'popular', 'favorite'];
foreach ($dataBooleanFields as $field) {
    if (isset($params[$field]) && $params[$field] !== '') {
        $c->where(["Data.{$field}" => (int)$params[$field]]);
    }
}

// Numeric filters
$dataNumericFields = ['price', 'vendor_id'];
foreach ($dataNumericFields as $field) {
    if (isset($params[$field]) && $params[$field] !== '') {
        $c->where(["Data.{$field}" => $params[$field]]);
    }
}
```

### Adding a custom filter

#### Step 1: add filter to config

```php
// core/components/minishop3/custom/filters/category-products.php

return [
    // ... existing filters ...

    'price_range' => [
        'type' => 'select',
        'label' => 'price_range',
        'placeholder' => 'all',
        'source' => [
            'type' => 'static',
            'options' => [
                ['label' => 'Up to 1000', 'value' => '0-1000'],
                ['label' => '1000-5000', 'value' => '1000-5000'],
                ['label' => '5000-10000', 'value' => '5000-10000'],
                ['label' => 'Over 10000', 'value' => '10000+'],
            ],
        ],
        'width' => '150px',
        'position' => 25,
    ],
];
```

#### Step 2: handle filter on server

Create a plugin to handle the custom filter:

```php
<?php
// Plugin: CustomCategoryFilters
// Events: msOnBeforeCategoryProductsQuery

if ($modx->event->name !== 'msOnBeforeCategoryProductsQuery') return;

$params = $modx->event->params['params'] ?? [];
$query = $modx->event->params['query'];

// Price range filter
if (!empty($params['price_range'])) {
    $range = $params['price_range'];

    if ($range === '10000+') {
        $query->where(['Data.price:>=' => 10000]);
    } else {
        [$min, $max] = explode('-', $range);
        $query->where([
            'Data.price:>=' => (int)$min,
            'Data.price:<=' => (int)$max,
        ]);
    }
}
```

## Bulk operations

### Available operations

| Operation | Description |
| --- | --- |
| Publish | Publish selected products |
| Unpublish | Unpublish selected products |
| Delete | Mark as deleted |
| Restore | Restore deleted products |

### Bulk operations API

```
POST /api/mgr/categories/{id}/products/multiple
```

**Parameters:**

```json
{
  "method": "publish",
  "ids": [1, 2, 3]
}
```

**Available methods:** `publish`, `unpublish`, `delete`, `undelete`, `show`, `hide`

## Drag-and-drop sorting

### When it works

Drag-and-drop sorting is available when:

1. Sorting by `menuindex`
2. "Show nested products" mode is off
3. No active filters

### Sort API

```
POST /api/mgr/categories/{id}/products/sort
```

**Parameters:**

```json
{
  "items": [
    {"id": 5, "menuindex": 0},
    {"id": 3, "menuindex": 1},
    {"id": 8, "menuindex": 2}
  ]
}
```

## System settings

| Setting | Description | Default |
| --- | --- | --- |
| `ms3_category_show_nested_products` | Show nested products | `false` |
| `ms3_category_show_options` | Show category options | `true` |
| `ms3_category_remember_tabs` | Remember active tab | `true` |
| `ms3_category_remember_grid` | Remember table state | `true` |

## Events

### msOnManagerCustomCssJs

Adding CSS/JS to the category page:

```php
<?php
// Plugin: MyCategoryExtension
// Events: msOnManagerCustomCssJs

if ($modx->event->name !== 'msOnManagerCustomCssJs') return;

$page = $modx->event->params['page'] ?? '';

if ($page === 'category_update' || $page === 'category_create') {
    $modx->regClientCSS('/assets/components/mycomponent/css/category.css');
    $modx->regClientStartupScript('/assets/components/mycomponent/js/category.js');
}
```

## API Endpoints

### Category products

```
GET /api/mgr/categories/{id}/products
```

**Parameters:**

| Parameter | Description |
| --- | --- |
| `start` | Offset (pagination) |
| `limit` | Number of records |
| `sort` | Sort field |
| `dir` | Direction (ASC/DESC) |
| `query` | Search query |
| `nested` | Show nested (0/1) |
| `published` | Published filter |
| `*` | Any other filters |

### Filter configuration

```
GET /api/mgr/categories/{id}/products/filters
```

**Response:**

```json
{
  "success": true,
  "object": {
    "filters": {
      "query": {
        "type": "text",
        "label": "search",
        "position": 10
      },
      "published": {
        "type": "select",
        "label": "published",
        "options": [
          {"label": "Yes", "value": 1},
          {"label": "No", "value": 0}
        ],
        "position": 20
      }
    }
  }
}
```

### Inline product data editing

```
PUT /api/mgr/categories/{id}/products/{productId}/data
```

JSON body — `msProductData` fields (price, article, etc.) from the category grid without opening the product card. Controller: `CategoryProductsController::updateProductData()`.

## Related pages

- [Utilities: Grid columns](utilities/grid-columns) — table column configuration
- [Product](product) — product edit page
- [System settings](../settings) — all component settings
