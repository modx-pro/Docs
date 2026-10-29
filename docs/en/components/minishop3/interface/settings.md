---
title: Settings
---
# Store settings

Open **Extras → MiniShop3 → Settings**.

## Settings tabs

| Tab | Description |
| --- | --- |
| [Delivery methods](settings/deliveries) | Delivery methods, cost, and validation |
| [Payment methods](settings/payments) | Payment system setup |
| Order statuses | `#tab-statuses` |
| [Vendors](settings/vendors) | Product vendor directory |
| [Product links](settings/links) | Types of links between products |
| [Options](settings/options) | EAV system for extra characteristics |

## Interface

- **Create.** Click **Create**. A form opens with the fields of the selected record type.
- **Edit.** Click the pencil icon in the actions column. The page does not reload. A double-click on a row works only on the Options tab, and there is no separate Edit button in the toolbar.
- **Sort.** Drag a record to the position you want. The order saves itself. This works for deliveries, payments, statuses, vendors and option groups; product links cannot be sorted — `msLink` has no order column and the list always comes back ordered by `id`.
- **Bulk actions.** Select several records and delete them together. Deletion asks for confirmation.
- **Search and filters.** Deliveries and payments filter by name and by active state. Options filter by the selected categories and the group, option groups filter in the browser. Statuses have no search. The vendors tab shows filter inputs that change nothing: the grid sends `filter_*` while the controller reads only the `query` parameter.

::: warning Important
Deleting a delivery or payment method can affect existing orders. Deactivate unused methods instead of deleting them.
:::
