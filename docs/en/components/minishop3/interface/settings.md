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
| [Order statuses](settings/statuses) | Order stages, the `final` and `fixed` flags, the transition order |
| [Vendors](settings/vendors) | Product vendor directory |
| [Product links](settings/links) | Types of links between products |
| [Options](settings/options) | EAV system for extra characteristics |

## Interface

The page opens on the tab named by the URL hash: `#tab-deliveries`, `#tab-payments`, `#tab-statuses`, `#tab-vendors`, `#tab-links`, `#tab-options`. The hash is kept in sync as you switch tabs, so a link to a tab can simply be copied from the address bar.

The page header carries buttons that jump to Orders and Utilities. They are shown only to users holding the `msorder_list` permission.

- **Create.** Click **Create**. A form opens with the fields of the selected record type.
- **Edit.** Click the pencil icon in the actions column. The page does not reload. A double-click on a row works only on the Options tab, and there is no separate Edit button in the toolbar.
- **Sort.** Drag a record to the position you want. The order saves itself. This works for deliveries, payments, statuses, vendors and option groups; product links cannot be sorted — `msLink` has no order column and the list always comes back ordered by `id`.
- **Bulk actions.** Select several records and delete them together. Deletion asks for confirmation.
- **Search and filters.** Deliveries and payments filter by name and by active state. Options filter by the selected categories and the group, option groups filter in the browser. Statuses have no search. The vendors tab shows filter inputs that change nothing: the grid sends `filter_*` while the controller reads only the `query` parameter.

::: info Permissions
The whole of `/api/mgr` requires a manager session, and writing to the deliveries, payments, statuses, vendors, links, options and option-group references additionally requires the `mssetting_save` permission. Binding options to categories goes through `mscategory_save`.
:::

::: warning Important
Deleting a delivery or payment method can affect existing orders. Deactivate unused methods instead of deleting them.
:::
