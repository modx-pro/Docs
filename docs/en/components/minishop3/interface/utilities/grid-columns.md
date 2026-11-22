---
title: Grid columns
---
# Utilities: Grid columns

Column setup for MiniShop3 manager tables.

## Purpose

::: tip Cookbook
Badge column in orders and inline editing: [Grid columns cookbook](/en/components/minishop3/manager/grid-config/cookbook).
:::

![Grid columns utility](/components/minishop3/screenshots/mgr-grid-columns.png)

- Turn columns on and off
- Change column order
- Configure sorting and filtering
- Set column width
- Add your own columns
- Configure inline editing (for the `category-products` grid)

::: info Since version 1.7.0
The system setting `ms3_category_grid_fields` was removed. Category product table columns are configured only in this screen.
:::

## Available grids

| Grid | Description |
| --- | --- |
| `customers` | Customer list |
| `orders` | Order list |
| `category-products` | Products in a category |
| `order_products` | Products in an order |
| `vendors` | Vendor list |

There is a sixth seeded grid as well — `deliveries`. It is absent from the utility dropdown and is configured only through `GET` and `PUT /api/mgr/grid-config/deliveries`.

## Interface

### Grid selection

At the top of the page, pick a grid from the list.

### Actions

- **Drag** changes column order
- **Edit** opens the dialog when you click a row
- **Add** creates a new column

## Column parameters

### Basic

| Parameter | Description |
| --- | --- |
| Field name | Model field name or alias |
| Label | Column header |
| Visible | Show the column |
| Sortable | Allow sorting on click |
| Filterable | Show the filter field |
| Frozen | Keep the column fixed while scrolling |

### Sizes

| Parameter | Description |
| --- | --- |
| Width | Width in pixels or % |
| Min. width | Minimum width while resizing |

### Column type

| Type | Description |
| --- | --- |
| `model` | Field from the data model |
| `template` | Template column (HTML) |
| `relation` | Data from a related table |
| `badge` | Colored label (`source_field`, `color_field`) |
| `option` | Product option value (`category-products` grid) |
| `computed` | Computed value |
| `image` | Image |
| `boolean` | Yes or no flag |
| `price` | Money value (`displayConfig`: currency, decimals) |
| `weight` | Weight (`displayConfig`: unit, decimals) |
| `datetime` | Date and time (`displayConfig`: format) |
| `actions` | Actions column |

## Column types

### Model field (`model`)

A plain column: the field value.

```text
Type: model
Field name: email
Label: Email
```

### Template (`template`)

A column with an HTML template.

```text
Type: template
Template: <a href="mailto:{email}">{email}</a>
```

Available variables are fields of the current row, wrapped in curly braces.

### Colored label (`badge`)

A colored label. The text and the HEX color come from other fields of the same row. In the `orders` grid, column `order_status` takes the caption from `status_name` and the color from `status_color`.

```text
Type: badge
source_field: status_name
color_field: status_color
```

::: info The template is safe by data
Substitution only catches `{field_name}` made of letters, digits and underscores, and the value is HTML-escaped. Markup comes from the template alone: HTML that ends up in the row data is printed as text and never executes ([#920](https://github.com/modx-pro/MiniShop3/issues/920)). An empty value and `null` both yield an empty string.
:::

### Product option (`option`)

An option column in the `category-products` grid. Set `option.key` (the option key from `msOption`).

```text
Type: option
option.key: color
```

::: warning The column name is checked for collisions
In the `category-products` grid, the name of your `option` or `relation` column must not match any of the 24 built-in product columns, nor a reserved SQL word. The `color` option above is exactly such a case: a built-in `color` column already exists.

The server refuses the name and suggests an alternative — `option_color` for an option, `vendor_address` for a relation. The `option.key` itself stays as it is; only the grid column name changes.
:::

### Relation (`relation`)

Data from a related table.

**Relation parameters:**

| Parameter | Description |
| --- | --- |
| Table | A short MiniShop3 model name (`msOrder`), a fully qualified class name, or a table name without the prefix |
| Foreign key | Field used for the link |
| Display field | Field to show |
| Aggregation | COUNT, SUM, AVG, MIN, MAX. The `category-products` grid does not support aggregation — such a column will not save |

**Example, customer order count:**

```text
Type: relation
Table: msOrder
Foreign key: customer_id
Aggregation: COUNT
```

### Computed value (`computed`)

The server computes the value. The JSON config must include **`computed.className`** (the class implements `ComputedFieldInterface`):

```json
{
  "type": "computed",
  "computed": {
    "className": "MyComponent\\Columns\\TotalSpentColumn"
  }
}
```

### Image (`image`)

An image thumbnail.

```text
Type: image
Field name: image
```

### Flag (`boolean`)

A flag with an icon.

```text
Type: boolean
Field name: active
```

### Price (`price`)

A numeric field shown as a price. Parameters live in the **displayConfig** JSON:

| Key | Description |
| --- | --- |
| `decimals` | Digits after the decimal mark |
| `currency` | Currency symbol |
| `currency_position` | `before` or `after` |
| `thousands_separator` | Thousands separator |
| `decimal_separator` | Decimal separator |

```text
Type: price
Field name: price
displayConfig: {"decimals":2,"currency":"₽","currency_position":"after","thousands_separator":" "}
```

The defaults are hard-coded: `decimals` 2, a space for thousands, a comma for decimals, an empty currency and `after` for its position. The grid reads no price system settings. Weight has its own defaults — 2 digits and «kg».

### Weight (`weight`)

Weight is shown with a unit:

```text
Type: weight
Field name: weight
displayConfig: {"decimals":2,"unit":"kg","unit_position":"after"}
```

### Date and time (`datetime`)

```text
Type: datetime
Field name: createdon
displayConfig: {"format":"dd.MM.yyyy HH:mm"}
```

The format is a MiniShop3 template of its own, not PrimeVue. The supported tokens are `yyyy`, `yy`, `MM`, `dd`, `HH`, `mm`, `ss`; each is replaced exactly once, so repeating a token in the template does not work.

### Actions (`actions`)

A column of action buttons. Built-in handlers and your own.

**Action configuration:**

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

**Column inline-editing parameters:**

| Parameter | Description |
| --- | --- |
| `editable` | Allow editing the value right in the row |
| `editor_type` | Editor: `text`, `number`, `select`, `combo` |
| `editor_options` | Choices for `select` |
| `editor_reference` | The related model for `combo` |
| `editor_combo_endpoint` | Where `combo` takes its choices from. Only paths from an allowlist are accepted |

A worked example is in the [grid configuration cookbook](/en/components/minishop3/manager/grid-config/cookbook).

**Action parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | string | Unique action name |
| `handler` | string | Handler name from the registry |
| `icon` | string | Full PrimeIcons class, for example `pi-pencil` |
| `label` | string | Tooltip text or a lexicon key |
| `severity` | string | Button style: `danger`, `success`, `secondary`, `info`, `warn` |
| `confirm` | boolean | Ask for confirmation |
| `confirmMessage` | string | Confirmation text |
| `visible` | boolean | Button visibility |
| `disabled` | boolean/function | Disable the button |
| `disabledField` | string | Row field checked for the disabled state |
| `confirmTitle` | string | Confirmation dialog title, a lexicon key |
| `confirmAccept` | string | Accept button label |
| `confirmReject` | string | Reject button label |
| `permission` | string | MODX permission: without it the button is not rendered |
| `toggleField` | string | Row field the button toggles on. This is the mechanism behind the publish button |
| `iconOff` | string | Icon shown when `toggleField` is true |
| `labelOff` | string | Label shown when `toggleField` is true |

The confirmation text supports `{field}` substitution — values come from the row.

**Built-in handlers:**

| Handler | Description |
| --- | --- |
| `edit` | Open the record for editing |
| `delete` | Delete the record |
| `view` | View the record |
| `addresses` | Manage addresses (customers) |
| `publish` | Toggle publication, works with `toggleField` |
| `duplicate` | Open the MODX resource duplication window |
| `refresh` | Refresh the grid |

`publish` and `duplicate` ship in the category products grid configuration.

## Configuration examples

### Add a "Total orders" column

1. Click Add column
2. Fill in:
   - Name: `total_spent`
   - Label: `Total orders`
   - Type: `relation`
   - Table: `msOrder`
   - Foreign key: `customer_id`
   - Display field: `cost`
   - Aggregation: `SUM`
3. Save

### A link in the email column

1. Find the `email` column.
2. Change its type to `template`.
3. Set the template: `<a href="mailto:{email}">{email}</a>`.
4. Save.

## API endpoints

### Get grid configuration

```http
GET /api/mgr/grid-config/{grid_name}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "columns": [
      {
        "name": "id",
        "label": "ID",
        "visible": true,
        "sortable": true,
        "filterable": false,
        "frozen": true,
        "width": 60,
        "minWidth": "80px",
        "isSystem": true,
        "type": "model"
      }
    ],
    "direct_filter_keys": ["query", "status_id"]
  }
}
```

`minWidth` and `isSystem` come back in camelCase; the database column is `min_width`, and the save request body also uses `minWidth`. The JSON from `config` is spread on top of them.

`editor_references` is present only for `grid_key=category-products`. For the other grids the key is missing from the response entirely — not an empty array, an absent key.

### Working with a single column

Besides saving the whole configuration there are two targeted routes:

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/api/mgr/grid-config/{grid_key}/field` | Add a column. The body holds `field_name`, `label`, `type`, `config` and the other column parameters |
| `PUT` | `/api/mgr/grid-config/{grid_key}/field/{field_name}` | Change one column. System columns cannot be edited this way |

Targeted routes leave the other columns alone — unlike the full save below.

### Save configuration

```http
PUT /api/mgr/grid-config/{grid_key}
```

**Request body:**

```json
{
  "fields": [
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
```

::: danger The body is the complete column list
The save compares the `fields` you send against what is in the database and **deletes** every non-system column missing from the array. A partial payload carrying one edited column will wipe the rest of your columns for that grid.

The right order: read the configuration with `GET`, change what you need in the array you got, and send it back whole.
:::

::: warning Permissions
`GET /api/mgr/grid-config/{grid_key}` requires `view_document`. Writes (`PUT`, `POST`, column `DELETE`) require `mssetting_save`.
:::

### Delete a column

```http
DELETE /api/mgr/grid-config/{grid_key}/{field_name}
```

System columns (`is_system`) cannot be deleted.

## System columns

System columns are limited:

- You cannot delete them
- You cannot edit one through the column dialog: `PUT /api/mgr/grid-config/{grid}/field/{name}` answers «Cannot modify system field»
- Through the whole-configuration save (`PUT /api/mgr/grid-config/{grid_key}` with the full `fields` array) the label, visibility, sorting, filtering, freezing, width and order all change

Usually that is `id` and the actions column.

## Custom actions

The global registry `MS3ActionRegistry` adds your own buttons to the actions column.

### Action registry

The registry is `window.MS3ActionRegistry`:

- register action handlers
- attach hooks before and after existing actions
- override built-in handlers

### Registry API

#### register(name, handler, options)

Registers an action handler.

**Parameters:**

| Parameter | Type | Description |
| --- | --- | --- |
| `name` | string | Action name |
| `handler` | function | Handler `(data, context) => void` |
| `options.override` | boolean | Allow replacing an existing handler |

**Handler arguments:**

- `data` is the grid row
- `context` is the runtime context:
  - `gridId` is the grid identifier
  - `emit(event, data)` sends an event
  - `refresh()` refreshes the grid
  - `toast` is the PrimeVue notification service
  - `confirm` is the PrimeVue confirmation service
  - `_(key)` is the localization function

#### registerBeforeHook(actionName, hook)

Registers a hook that runs **before** the action.

```javascript
MS3ActionRegistry.registerBeforeHook('delete', (data, context) => {
  // Return false to cancel the action
  if (data.is_system) {
    context.toast.add({
      severity: 'warn',
      summary: 'Not allowed',
      detail: 'Cannot delete a system record'
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
  // Send analytics, write a log, and so on
})
```

#### Other methods

| Method | Description |
| --- | --- |
| `has(name)` | Check that a handler exists |
| `get(name)` | Get the handler |
| `unregister(name)` | Remove a handler. Only `edit`, `delete`, `view` and `refresh` are protected; `addresses`, `publish` and `duplicate` can be removed |
| `getRegisteredActions()` | List every registered action |
| `execute(name, data, context)` | Run an action from code |
| `getActionInfo(name)` | Handler metadata: the label key and the icon. The actions editor builds its dropdown from them |

### Custom action examples

#### Example 1: Block a customer

**Step 1. Register the handler** (in a MODX plugin or your own JS):

```javascript
// File: assets/components/mycomponent/js/customer-actions.js

document.addEventListener('DOMContentLoaded', () => {
  // Wait until the registry is loaded
  if (!window.MS3ActionRegistry) {
    console.error('MS3ActionRegistry not available')
    return
  }

  // Register the Block action
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
          summary: 'Done',
          detail: `Customer ${data.email} is blocked`,
          life: 3000
        })
        context.refresh() // Refresh the grid
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

  // Register the Unblock action
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

**Step 2. Load the script** with a MODX plugin:

```php
<?php
// Plugin: MyCustomerActions
// Events: OnManagerPageBeforeRender

if ($modx->event->name !== 'OnManagerPageBeforeRender') return;

// Customers page only
$controller = $modx->controller ?? null;
if (!$controller || strpos(get_class($controller), 'Customers') === false) return;

$modx->regClientStartupScript(
    MODX_ASSETS_URL . 'components/mycomponent/js/customer-actions.js'
);
```

**Step 3. Configure the actions column.**

::: danger The dialog cannot save the `actions` column
In all six seeded grids the `actions` column carries `is_system = 1`. The pencil icon next to it is not disabled, the dialog opens and even lets you add an action, but saving sends `PUT /api/mgr/grid-config/{grid}/field/actions` and gets back «Cannot modify system field».

The working path is the whole-configuration save: `PUT /api/mgr/grid-config/customers` with the full `fields` array and the `actions` key replaced on that column. System status is not checked there.
:::

The new entry in the column's `actions` array:

```json
{
  "name": "blockCustomer",
  "handler": "blockCustomer",
  "icon": "pi-ban",
  "severity": "danger",
  "confirm": true,
  "confirmMessage": "Block customer {email}?"
}
```

::: warning Your handler will not be in the list
The Handler field in the actions editor is a dropdown with no free input, and it shows only what is already registered in the registry **on the current page**. The plugin from step 2 loads the script on the customers page only, so `blockCustomer` will not appear on the utilities page. Either drop the controller filter in the plugin, or set `handler` by editing the JSON through the API.
:::

#### Example 2: Duplicate a product

A handler of your own is not always needed here: `duplicate` is one of the seven built-in registry actions, and in the category products grid it already opens the `modx-window-resource-duplicate` window and reloads the table. Registering your own action named `duplicate` without `options.override` is refused by the registry.

The example below is for another grid, or for behaviour of your own. MiniShop3 has no duplicate processor of its own, so it calls the MODX core processor `resource/duplicate` (`msProduct` extends a resource):

```javascript
MS3ActionRegistry.register('duplicateProduct', async (data, context) => {
  const response = await fetch('/assets/components/minishop3/connector.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      action: 'resource/duplicate',
      id: data.id,
      HTTP_MODAUTH: MODx.siteId
    })
  })

  const result = await response.json()

  if (result.success) {
    context.toast.add({
      severity: 'success',
      summary: 'Product copied',
      detail: `Created product ID: ${result.object.id}`,
      life: 3000
    })
    context.refresh()
  }
})
```

**Action configuration:**

```json
{
  "name": "duplicate",
  "handler": "duplicateProduct",
  "icon": "pi-copy",
  "label": "Copy",
  "severity": "secondary",
  "confirm": false
}
```

#### Example 3: Send a notification

There is no built-in processor that sends a notification. REST routes `/api/mgr/notifications` only serve configuration CRUD. For a Send button, implement your own endpoint (call `NotificationManager` or `StatusChangedNotification` inside it) and call that endpoint from the handler:

```javascript
MS3ActionRegistry.register('sendNotification', async (data, context) => {
  const response = await fetch('/assets/components/mycomponent/notify.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ customer_id: data.id })
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

The row field `disabledField` turns the button off:

```javascript
// In the column configuration
{
  "name": "unblock",
  "handler": "unblockCustomer",
  "icon": "pi-unlock",
  "label": "Unblock",
  "severity": "success",
  // Inactive when the customer is not blocked
  "disabledField": "active"  // disabled when active = true
}
```

### Hooks for built-in actions

The built-in `edit` and `delete` go through the registry too, so the same hooks apply to them.

Logging deletes:

```javascript
MS3ActionRegistry.registerAfterHook('delete', async (data, context, result) => {
  // Send to the audit system
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

Preventing a delete:

```javascript
MS3ActionRegistry.registerBeforeHook('delete', (data, context) => {
  // Do not let paid orders be deleted
  if (context.gridId === 'orders' && data.status === 2) {
    context.toast.add({
      severity: 'error',
      summary: 'Forbidden',
      detail: 'A paid order cannot be deleted',
      life: 5000
    })
    return false // Cancel the action
  }
  return true // Continue
})
```

### Available icons

Icons are [PrimeIcons](https://primevue.org/icons). The actions editor dropdown offers seventeen: `pi-pencil`, `pi-trash`, `pi-eye`, `pi-check`, `pi-times`, `pi-ban`, `pi-lock`, `pi-unlock`, `pi-user`, `pi-cog`, `pi-copy`, `pi-download`, `pi-external-link`, `pi-list`, `pi-refresh`, `pi-send`, `pi-print`.

Any other PrimeIcons class can only be set by editing the column configuration JSON through the API.
