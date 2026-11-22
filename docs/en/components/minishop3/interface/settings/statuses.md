---
title: Order statuses
---
# Order statuses

Open **Extras → MiniShop3 → Settings → Order statuses**.

## Purpose

A status describes the stage an order is at. Three things depend on it: which transitions are allowed next, whether notifications go out to the customer and the managers, and what happens to the stock reserve.

The package ships five statuses:

| Id | Name | Role |
| --- | --- | --- |
| 1 | Draft | The cart and the checkout form. The order has not been submitted yet |
| 2 | New | The order is placed. Stock is reserved at this status |
| 3 | Paid | The reserve is written off |
| 4 | Shipped | An intermediate delivery status |
| 5 | Cancelled | The reserve returns to stock |

The ids of the first five statuses are wired into the `ms3_status_*` system settings, which the payment, shipment and inventory code reads. Renaming a status is fine; changing its id is not.

## Status fields

| Field | Type | Description |
| --- | --- | --- |
| `name` | string | Name. Required |
| `description` | text | Description for the manager |
| `color` | string | Label colour in grids, hex without the hash (`000000` by default) |
| `active` | bool | The status can be selected |
| `final` | bool | No transitions out of this status: an attempt to change it fails with `ms3_err_status_final` |
| `fixed` | bool | Forbids going back: a transition to a status with a lower or equal `position` is refused with `ms3_err_status_fixed` |
| `position` | int | Sort order. Takes part in the `fixed` check |
| `editable` | bool | Accepted by the Manager API and stored, but order logic does not use it today. Only the legacy `Settings\Status\Remove` processor reads it |

## Interface

The table shows: drag handle, selection checkbox, `Id`, `Name`, `Final` (`final`), `Fixes` (`fixed`), `Enabled` (`active`) and the actions column.

- **Create.** The **Create** button opens a dialog with `Name` (required), `Color`, `Description`, `Enabled`, `Final` and `Fixes`. There is no `position` field in the dialog — the order comes from dragging.
- **Edit.** Through the pencil icon in the actions column.
- **Sort.** By dragging. The order matters beyond looks: the `fixed` check relies on it.
- **Delete.** A status used by orders cannot be deleted — the server counts orders with that `status_id` and answers with an error naming the number.

The tab has no search.

## Transitions between statuses

Beyond the `final` and `fixed` flags, transitions are constrained by the `ms3_order_status_transitions` system setting. It lists the allowed edges of the graph; an empty value means "any transition except those the flags forbid". A value that cannot be parsed refuses the change with `ms3_err_status_transitions_invalid`.

Status changes are performed by `OrderStatusService` — see [Managing statuses](/en/components/minishop3/development/backend-api/order) and [Status events](/en/components/minishop3/development/events/status).

## Manager API

The whole group is protected by the `mssetting_save` permission.

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/api/mgr/statuses` | List |
| `POST` | `/api/mgr/statuses` | Create |
| `GET` | `/api/mgr/statuses/{id}` | Read one |
| `PUT` | `/api/mgr/statuses/{id}` | Update |
| `DELETE` | `/api/mgr/statuses/{id}` | Delete |
| `DELETE` | `/api/mgr/statuses/bulk` | Delete several, an `ids` list in the body |
| `POST` | `/api/mgr/statuses/sort` | Save the order after a drag |

Writes accept only `name`, `description`, `color`, `active`, `final`, `fixed` and `editable`; anything else in the body is dropped.

Separate from the group sits `GET /api/mgr/statuses-dropdown` — the list with translations for the order form dropdowns.
