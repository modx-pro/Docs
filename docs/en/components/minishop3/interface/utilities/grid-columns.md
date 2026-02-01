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

## Available grids

| Grid | Description |
|------|-------------|
| `customers` | Customer list |
| `orders` | Order list |
| `products` | Products in category (category-products) |
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

### Save config

```
PUT /api/mgr/grid-config/{grid_name}
```

### Reset to default

```
DELETE /api/mgr/grid-config/{grid_name}
```

## System columns

Some columns are system columns and cannot be deleted or have their field name changed; they can only be hidden. Usually `id` and action columns.

## Custom actions

MiniShop3 provides the global `MS3ActionRegistry` to add custom buttons to the actions column.

### Registry API

- `register(name, handler, options)` — register handler
- `registerBeforeHook(actionName, hook)` — run before action
- `registerAfterHook(actionName, hook)` — run after action
- `has(name)`, `get(name)`, `unregister(name)`
- `execute(name, data, context)` — run action programmatically

### Icons

Use [PrimeIcons](https://primevue.org/icons). Examples: `pi-pencil`, `pi-trash`, `pi-eye`, `pi-copy`, `pi-download`, `pi-send`, `pi-lock`, `pi-unlock`, `pi-ban`, `pi-check`, `pi-times`, `pi-refresh`, `pi-cog`, `pi-print`, `pi-external-link`.
