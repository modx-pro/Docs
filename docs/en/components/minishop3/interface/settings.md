---
title: Settings
---
# Store settings

Store settings are available via **Extras → MiniShop3 → Settings**.

## Settings tabs

The section includes the following tabs:

| Tab | Description |
|-----|-------------|
| [Delivery methods](settings/deliveries) | Delivery method setup, cost, validation |
| [Payment methods](settings/payments) | Payment system setup |
| [Vendors](settings/vendors) | Product vendor directory |
| [Product links](settings/links) | Product relationship types |
| [Options](settings/options) | EAV system for extra attributes |

## Interface

All settings tabs use a modern Vue 3 interface with PrimeVue components. This provides:

- **Fast response** — no page reload when editing
- **Drag & Drop sorting** — reorder items by dragging
- **Bulk operations** — select multiple records for deletion
- **Search and filtering** — quick search by name and description

## Common features

### Creating records

Click **Add** to create a new item. A form opens with fields specific to each record type.

### Editing

Double-click a row in the table or select it and click **Edit**.

### Sorting

Drag a row to the desired position in the table. New positions are saved automatically.

### Deletion

Select one or more records and click **Delete**. The system asks for confirmation before deletion.

::: warning Important
Deleting a delivery or payment method may affect existing orders. Deactivate unused methods instead of deleting them.
:::
