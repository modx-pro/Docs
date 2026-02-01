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

Main category tab — product table with:

| Feature | Description |
|---------|-------------|
| Drag-and-drop | Sort products by dragging |
| Filters | Search, published status, custom filters |
| Bulk operations | Publish, unpublish, delete |
| Configurable columns | Via [Utilities → Grid columns](utilities/grid-columns) |
| Actions | View, edit, delete, duplicate |

### Document

Standard MODX tab with resource fields:

| Field | Description |
|-------|-------------|
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
- **Category options** — product options for this category

### Resource groups

Access control for the category.

## Product table

### Technology

The product table is built with Vue 3 + PrimeVue for modern UX:

- Virtualization for large lists
- Dynamic data loading
- Reactive filters
- Smooth drag-and-drop animation

### Column system setting

Table columns are configured via `ms3_category_grid_fields`:

```
id,pagetitle,article,price,weight,image
```

**Available fields:**

| Group | Fields |
|-------|--------|
| Resource | `id`, `pagetitle`, `longtitle`, `alias`, `menuindex`, `template`, `published`, `deleted` |
| Product | `article`, `price`, `old_price`, `weight`, `image`, `thumb` |
| Flags | `new`, `popular`, `favorite` |
| Vendor | `vendor_id`, `vendor_name`, `made_in` |
| Dates | `createdon`, `editedon`, `publishedon` |

## Table column configuration

### Via interface

1. Open **Utilities → Grid columns**
2. Select the **category-products** grid
3. Configure visibility, order, column width
4. Save

See also: [Utilities: Grid columns](utilities/grid-columns)

### Via PHP configuration

Create a custom config file:

```php
// core/components/minishop3/custom/grids/category-products.php

return [
    [
        'name' => 'id',
        'label' => 'ID',
        'visible' => true,
        'sortable' => true,
        'width' => '60px',
        'isSystem' => true,
    ],
    [
        'name' => 'thumb',
        'label' => 'Image',
        'visible' => true,
        'type' => 'image',
        'width' => '60px',
    ],
    [
        'name' => 'pagetitle',
        'label' => 'Title',
        'visible' => true,
        'sortable' => true,
        'filterable' => true,
        'minWidth' => '200px',
        'type' => 'template',
        'template' => '<span class="product-id">({id})</span> <a href="?a=resource/update&id={id}">{pagetitle}</a>',
    ],
    [
        'name' => 'article',
        'label' => 'SKU',
        'visible' => true,
        'sortable' => true,
        'filterable' => true,
        'width' => '100px',
    ],
    [
        'name' => 'price',
        'label' => 'Price',
        'visible' => true,
        'sortable' => true,
        'type' => 'price',
        'width' => '100px',
    ],
    [
        'name' => 'actions',
        'label' => 'Actions',
        'visible' => true,
        'isSystem' => true,
        'frozen' => true,
        'width' => '140px',
        'type' => 'actions',
    ],
];
```

### Adding a custom column

**Example: adding a "Stock" column:**

```php
[
    'name' => 'remains',
    'label' => 'Stock',
    'visible' => true,
    'sortable' => true,
    'width' => '80px',
    'type' => 'number',
    // Inline editing
    'editable' => true,
    'editor' => [
        'xtype' => 'numberfield',
        'minValue' => 0,
    ],
]
```

### Column types

| Type | Description | Example |
|------|-------------|---------|
| `text` | Text (default) | Title, SKU |
| `number` | Number | Stock |
| `price` | Formatted price | 1,234.56 |
| `weight` | Formatted weight | 0.5 kg |
| `boolean` | Yes/No tag | Published |
| `image` | Image thumbnail | Product photo |
| `template` | Custom HTML template | Product link |
| `actions` | Action buttons | Edit, delete |
| `relation` | Field from related table | Status name |
| `badge` | Colored tag | Order status with color |

### Relation fields (joins)

The `relation` type loads data from related tables (JOIN):

```php
[
    'name' => 'status_name',
    'label' => 'Status',
    'type' => 'relation',
    'visible' => false,  // Hidden source field for badge
    'relation' => [
        'table' => 'msOrderStatus',       // Model class or table
        'foreignKey' => 'status_id',      // Foreign key in main table
        'displayField' => 'name',          // Field to display
    ],
]
```

**Relation parameters:**

| Parameter | Description |
|-----------|-------------|
| `table` | xPDO model class (e.g. `msOrderStatus`) |
| `foreignKey` | Field in main table for the relation |
| `displayField` | Field from related table to display |

::: info Optimization
When adding multiple relation fields to the same table, the system groups them into a single JOIN. For example, `status_name` and `status_color` use one JOIN to `msOrderStatus`.
:::

### Badge fields (colored tags)

The `badge` type shows a colored tag (PrimeVue Tag) using data from other columns:

```php
[
    'name' => 'status',
    'label' => 'Status',
    'type' => 'badge',
    'visible' => true,
    'computed' => [
        'source_field' => 'status_name',   // Text source column
        'color_field' => 'status_color',   // Color source column
    ],
]
```

**Example: Order status with color**

To show order status as a colored badge you need 3 fields:

```php
// 1. Hidden relation field for status name
[
    'name' => 'status_name',
    'type' => 'relation',
    'visible' => false,
    'relation' => [
        'table' => 'msOrderStatus',
        'foreignKey' => 'status_id',
        'displayField' => 'name',
    ],
],

// 2. Hidden relation field for status color
[
    'name' => 'status_color',
    'type' => 'relation',
    'visible' => false,
    'relation' => [
        'table' => 'msOrderStatus',
        'foreignKey' => 'status_id',
        'displayField' => 'color',
    ],
],

// 3. Visible badge field using data from relation fields
[
    'name' => 'status',
    'label' => 'Status',
    'type' => 'badge',
    'visible' => true,
    'sortable' => true,
    'computed' => [
        'source_field' => 'status_name',
        'color_field' => 'status_color',
    ],
],
```

::: tip Colors in database
Colors in the `msOrderStatus` table are stored in HEX format without `#` (e.g. `FF5733`). The system adds `#` when rendering.
:::

## Adding actions to column

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
|-----------|------|-------------|
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

Register a custom action via `MS3ActionRegistry`:

```javascript
// Plugin: Add to favorites
document.addEventListener('DOMContentLoaded', () => {
  if (window.MS3ActionRegistry) {
    MS3ActionRegistry.register('addToFavorites', async (data, gridId) => {
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
        if (window.PrimeVue) {
          // Use PrimeVue Toast
        } else {
          alert('Product added to favorites')
        }
        return { success: true, refresh: true }
      }

      return { success: false, message: result.message }
    })
  }
})
```

Adding the action to the column config:

```php
[
    'name' => 'addToFavorites',
    'handler' => 'addToFavorites',  // Registered handler name
    'icon' => 'pi-heart',
    'label' => 'Add to favorites',
]
```

### Hooks for standard actions

```javascript
// Hook before product delete
MS3ActionRegistry.registerBeforeHook('delete', async (data, gridId) => {
  if (data.orders_count > 0) {
    alert('Cannot delete product with orders!')
    return false  // Cancel action
  }
  return true  // Continue
})

// Hook after publish
MS3ActionRegistry.registerAfterHook('publish', async (data, result, gridId) => {
  console.log(`Product ${data.id} published:`, result)
  // Send notification, update cache, etc.
})
```

## Adding filters

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
|-----------|------|-------------|
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

**Step 1: Add filter to config**

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

**Step 2: Handle filter on server**

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
|-----------|-------------|
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
|---------|-------------|---------|
| `ms3_category_grid_fields` | Visible table columns | `id,pagetitle,article,price,weight,image` |
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
|-----------|-------------|
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

## Related pages

- [Utilities: Grid columns](utilities/grid-columns) — table column configuration
- [Product](product) — product edit page
- [System settings](../settings) — all component settings
