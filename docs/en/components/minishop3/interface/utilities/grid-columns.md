---
title: Grid columns
---
# Utilities: Grid columns

Configuring columns in MiniShop3 admin tables.

## Purpose

The tool configures columns in admin grids (tables):

- Enable and disable columns
- Change column order
- Configure sorting and filtering
- Set column width
- Add custom columns
- Configure inline editing (for the `category-products` grid)

::: info From version 1.7.0
The system setting `ms3_category_grid_fields` was removed. Category product table columns are configured only here.
:::

## Available grids

| Grid | Description |
|------|-------------|
| `customers` | Customer list |
| `orders` | Order list |
| `category-products` | Products in category |
| `order_products` | Products in order |
| `vendors` | Vendor list |

## Interface

### Grid selection

Select a grid from the dropdown at the top of the page.

### Columns table

Shows current column configuration:

| Column | Description |
|--------|-------------|
| Name | System field name |
| Label | Display header |
| Visible | Show column |
| Sortable | Allow sort on click |
| Filter | Show filter |
| Frozen | Fix on horizontal scroll |
| Width | Width in pixels |

### Actions

- **Drag** — reorder columns
- **Edit** — click row to open dialog
- **Add** — button to create new column

## Column parameters

### Basic

| Parameter | Description |
|-----------|-------------|
| Field name | Model field name or alias |
| Label | Column header |
| Visible | Show column |
| Sortable | Allow sort on click |
| Filterable | Show filter field |
| Frozen | Fix on scroll |

### Sizes

| Parameter | Description |
|-----------|-------------|
| Width | Width in px or % |
| Min width | Minimum width when resizing |

### Column type

| Type | Description |
|------|-------------|
| `model` | Field from data model |
| `template` | Template column (HTML) |
| `relation` | Data from related table |
| `computed` | Computed value |
| `image` | Image display |
| `boolean` | Yes/No flag |
| `actions` | Actions column |

## Column types

### Model

Standard column showing a field value.

```
Type: model
Field: email
Label: Email
```

### Template

Column with HTML template.

```
Type: template
Template: <a href="mailto:{email}">{email}</a>
```

Variables — current row fields in curly braces.

### Relation

Data from related table.

**Relation parameters:**

| Parameter | Description |
|-----------|-------------|
| Table | Related table name |
| Foreign key | Link field |
| Display field | Field to show |
| Aggregation | COUNT, SUM, AVG, MIN, MAX |

**Example — customer order count:**

```
Type: relation
Table: msOrder
Foreign key: customer_id
Aggregation: COUNT
```

### Computed

Value computed on server by a custom class.

```
Type: computed
Class: MyComponent\Columns\TotalSpentColumn
```

### Image

Image thumbnail.

```
Type: image
Field: image
```

### Boolean

Yes/No flag with icon.

```
Type: boolean
Field: active
```

### Actions

Column with action buttons. Supports built-in and custom handlers.

**Action config:**

```json
[
  {
    "name": "edit",
    "handler": "edit",
    "icon": "pi-pencil",
    "label": "Edit",
    "severity": null
  },
  {
    "name": "delete",
    "handler": "delete",
    "icon": "pi-trash",
    "label": "Delete",
    "severity": "danger",
    "confirm": true,
    "confirmMessage": "Are you sure you want to delete this record?"
  }
]
```

**Action parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Unique action name |
| `handler` | string | Handler name from registry |
| `icon` | string | PrimeIcons icon (without `pi-` prefix) |
| `label` | string | Tooltip text / lexicon key |
| `severity` | string | Button style: `danger`, `success`, `secondary`, `info`, `warn` |
| `confirm` | boolean | Require confirmation |
| `confirmMessage` | string | Confirmation text |
| `visible` | boolean | Button visibility |
| `disabled` | boolean/function | Disable button |
| `disabledField` | string | Row field to check for disabled |

**Built-in handlers:**

| Handler | Description |
|---------|-------------|
| `edit` | Open record for edit |
| `delete` | Delete record |
| `view` | View record |
| `addresses` | Manage addresses (customers) |
| `refresh` | Refresh grid |

## Examples

### Hide column

1. Find the column in the list
2. Uncheck "Visible"
3. Click "Save"

### Add "Total orders" column

1. Click "Add column"
2. Fill:
   - Name: `total_spent`
   - Label: `Total orders`
   - Type: `relation`
   - Table: `msOrder`
   - Foreign key: `customer_id`
   - Display field: `cost`
   - Aggregation: `SUM`
3. Save

### Change column order

Drag columns into the desired order.

### Add link in email column

1. Find column `email`
2. Change type to `template`
3. Set template: `<a href="mailto:{email}">{email}</a>`
4. Save

## API Endpoints

### Get grid config

```
GET /api/mgr/grid-config/{grid_name}
```

**Response:**

```json
{
  "success": true,
  "object": {
    "columns": [
      {
        "name": "id",
        "label": "ID",
        "visible": true,
        "sortable": true,
        "filterable": false,
        "frozen": true,
        "width": 60,
        "type": "model"
      }
    ]
  }
}
```

### Save config

```
PUT /api/mgr/grid-config/{grid_name}
```

**Request body:**

```json
{
  "columns": [
    {
      "name": "id",
      "label": "ID",
      "visible": true,
      "sortable": true,
      "filterable": false,
      "frozen": true,
      "width": 60,
      "sort_order": 0
    }
  ]
}
```

### Reset to default

```
DELETE /api/mgr/grid-config/{grid_name}
```

## System columns

Some columns are marked as system columns and have restrictions:

- Cannot be deleted
- Field name cannot be changed
- Can only be hidden

System columns usually include `id` and action columns.

## Custom actions

MiniShop3 provides the global action registry `MS3ActionRegistry` for adding custom buttons to the actions column.

### Action registry

The registry is available globally as `window.MS3ActionRegistry` and lets you:

- Register new action handlers
- Add before/after hooks for existing actions
- Override built-in handlers

### Registry API

#### register(name, handler, options)

Registers a new action handler.

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Action name |
| `handler` | function | Handler `(data, context) => void` |
| `options.override` | boolean | Allow overwriting existing handler |

**Handler parameters:**

- `data` — grid row data object
- `context` — execution context:
  - `gridId` — grid identifier
  - `emit(event, data)` — emit event
  - `refresh()` — refresh grid
  - `toast` — PrimeVue toast service
  - `confirm` — PrimeVue confirm service
  - `_(key)` — localization function

#### registerBeforeHook(actionName, hook)

Registers a hook that runs **before** the action.

```javascript
MS3ActionRegistry.registerBeforeHook('delete', (data, context) => {
  if (data.is_system) {
    context.toast.add({
      severity: 'warn',
      summary: 'Forbidden',
      detail: 'Cannot delete system record'
    })
    return false
  }
  return true
})
```

#### registerAfterHook(actionName, hook)

Registers a hook that runs **after** the action.

```javascript
MS3ActionRegistry.registerAfterHook('delete', (data, context, result) => {
  console.log('Record deleted:', data.id)
})
```

#### Other methods

| Method | Description |
|--------|-------------|
| `has(name)` | Check if handler exists |
| `get(name)` | Get handler |
| `unregister(name)` | Remove handler (except built-in) |
| `getRegisteredActions()` | List all registered actions |
| `execute(name, data, context)` | Execute action programmatically |

### Custom action examples

#### Example 1: Block customer

**Step 1. Register handler** (in MODX plugin or custom JS):

```javascript
document.addEventListener('DOMContentLoaded', () => {
  if (!window.MS3ActionRegistry) {
    console.error('MS3ActionRegistry not available')
    return
  }

  MS3ActionRegistry.register('blockCustomer', async (data, context) => {
    try {
      const response = await fetch('/assets/components/minishop3/connector.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'MyComponent\\Processors\\Customer\\Block',
          id: data.id,
          HTTP_MODAUTH: MODx.siteId
        })
      })

      const result = await response.json()

      if (result.success) {
        context.toast.add({
          severity: 'success',
          summary: 'Success',
          detail: `Customer ${data.email} blocked`,
          life: 3000
        })
        context.refresh()
      } else {
        throw new Error(result.message)
      }
    } catch (error) {
      context.toast.add({
        severity: 'error',
        summary: 'Error',
        detail: error.message,
        life: 5000
      })
    }
  })

  MS3ActionRegistry.register('unblockCustomer', async (data, context) => {
    const response = await fetch('/assets/components/minishop3/connector.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        action: 'MyComponent\\Processors\\Customer\\Unblock',
        id: data.id,
        HTTP_MODAUTH: MODx.siteId
      })
    })

    const result = await response.json()
    if (result.success) {
      context.toast.add({
        severity: 'success',
        summary: 'Customer unblocked',
        life: 3000
      })
      context.refresh()
    }
  })
})
```

**Step 2. Load script** via MODX plugin:

```php
<?php
// Plugin: MyCustomerActions
// Events: OnManagerPageBeforeRender

if ($modx->event->name !== 'OnManagerPageBeforeRender') return;

$controller = $modx->controller ?? null;
if (!$controller || strpos(get_class($controller), 'Customers') === false) return;

$modx->regClientStartupScript(
    MODX_ASSETS_URL . 'components/mycomponent/js/customer-actions.js'
);
```

**Step 3. Configure actions column** in the UI:

1. Open **Utilities → Grid columns**
2. Select grid `customers`
3. Find column `actions` and open editor
4. Add action:
   - Name: `blockCustomer`
   - Handler: `blockCustomer`
   - Icon: `pi-ban`
   - Severity: `danger`
   - Confirm: Yes
   - Message: `Block customer {email}?`

#### Example 2: Duplicate product

```javascript
MS3ActionRegistry.register('duplicateProduct', async (data, context) => {
  const response = await fetch('/assets/components/minishop3/connector.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'MiniShop3\\Processors\\Product\\Duplicate',
      id: data.id,
      HTTP_MODAUTH: MODx.siteId
    })
  })

  const result = await response.json()

  if (result.success) {
    context.toast.add({
      severity: 'success',
      summary: 'Product duplicated',
      detail: `Created product ID: ${result.object.id}`,
      life: 3000
    })
    context.refresh()
  }
})
```

**Action config:**

```json
{
  "name": "duplicate",
  "handler": "duplicateProduct",
  "icon": "pi-copy",
  "label": "Duplicate",
  "severity": "secondary",
  "confirm": false
}
```

#### Example 3: Send notification

```javascript
MS3ActionRegistry.register('sendNotification', async (data, context) => {
  const template = prompt('Enter notification template name:')
  if (!template) return

  const response = await fetch('/assets/components/minishop3/connector.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'MiniShop3\\Processors\\Notification\\Send',
      customer_id: data.id,
      template: template,
      HTTP_MODAUTH: MODx.siteId
    })
  })

  const result = await response.json()

  if (result.success) {
    context.toast.add({
      severity: 'success',
      summary: 'Notification sent',
      detail: `Email: ${data.email}`,
      life: 3000
    })
  }
})
```

#### Example 4: Conditional button visibility

Use `disabledField` in column config:

```json
{
  "name": "unblock",
  "handler": "unblockCustomer",
  "icon": "pi-unlock",
  "label": "Unblock",
  "severity": "success",
  "disabledField": "active"
}
```

Or:

```json
{
  "name": "block",
  "handler": "blockCustomer",
  "icon": "pi-ban",
  "label": "Block",
  "severity": "danger",
  "disabledField": "blocked"
}
```

### Hooks for built-in actions

#### Logging deletes

```javascript
MS3ActionRegistry.registerAfterHook('delete', async (data, context, result) => {
  await fetch('/api/audit/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'delete',
      entity: context.gridId,
      entityId: data.id,
      user: MODx.user?.id,
      timestamp: new Date().toISOString()
    })
  })
})
```

#### Prevent delete

```javascript
MS3ActionRegistry.registerBeforeHook('delete', (data, context) => {
  if (context.gridId === 'orders' && data.status === 2) {
    context.toast.add({
      severity: 'error',
      summary: 'Forbidden',
      detail: 'Cannot delete paid order',
      life: 5000
    })
    return false
  }
  return true
})
```

### Available icons

Icons from [PrimeIcons](https://primevue.org/icons). Common ones:

| Icon | Class | Use |
|------|-------|-----|
| ✏️ | `pi-pencil` | Edit |
| 🗑️ | `pi-trash` | Delete |
| 👁️ | `pi-eye` | View |
| 📋 | `pi-copy` | Copy |
| ⬇️ | `pi-download` | Download |
| 📤 | `pi-send` | Send |
| 🔒 | `pi-lock` | Lock |
| 🔓 | `pi-unlock` | Unlock |
| 🚫 | `pi-ban` | Ban |
| ✅ | `pi-check` | Confirm |
| ❌ | `pi-times` | Cancel |
| 🔄 | `pi-refresh` | Refresh |
| ⚙️ | `pi-cog` | Settings |
| 🖨️ | `pi-print` | Print |
| 🔗 | `pi-external-link` | External link |
