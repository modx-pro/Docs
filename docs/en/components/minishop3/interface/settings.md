---
title: Settings
---
# Store settings

Store settings are available via **Extras → MiniShop3 → Settings**.

## Settings tabs

The section contains the following tabs:

| Tab | Description |
|-----|-------------|
| [Delivery methods](settings/deliveries) | Delivery methods, cost, validation |
| [Payment methods](settings/payments) | Payment systems configuration |
| [Vendors](settings/vendors) | Product vendor directory |
| [Product links](settings/links) | Product link types |
| [Options](settings/options) | EAV system for extra attributes |

## Interface

All settings tabs use a modern Vue 3 interface with PrimeVue components. This provides:

- **Fast response** — no page reload when editing
- **Drag & Drop sorting** — reorder items by dragging
- **Bulk operations** — select multiple records for deletion
- **Search and filter** — quick search by name and description

## Common features

### Creating records

Click **Add** to create a new item. A form opens with fields specific to each record type.

### Editing

Double-click a row in the table or select it and click **Edit**.

### Sorting

To change display order, drag a row to the desired position. New positions are saved automatically.

### Deleting

Select one or more rows and click **Delete**. The system will ask for confirmation before deleting.

::: warning Important
Deleting a delivery or payment method may affect existing orders. Consider deactivating unused methods instead of deleting them.
:::
