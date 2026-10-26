---
title: History and rollback
description: Operation log, full and selective rollback
---

# History and rollback

The **History** tab stores the operation log. From here you roll back a whole operation or selected products.

![History tab](/components/msbulkeditor/screenshots/history-tab.png)

---

## History tab

| Column | Contents |
| --- | --- |
| Checkbox | Only for status **Completed** (bulk rollback). Otherwise disabled with hint “Rollback is available only for completed operations” |
| ID | Operation identifier |
| Type | `fieldType` |
| Created | Date and time (compact, two lines) |
| Status | queued, running, completed, failed |
| Processed | `processed` |
| Total | `total` |

Row actions: **Rollback**, **Changes**.

Empty log: empty state “History is empty”. Load failure: empty state error.

---

## Statuses

| Status | Rollback |
| --- | --- |
| Queued / Running | Unavailable |
| **Completed** | Full or selective |
| **Failed** | `applied` items only |

---

## Failed operation (`failed`)

1. Open **History**. Status **Failed**.
2. **Changes.** Roll back `applied` items.
3. Fix the cause and rerun on remaining products.

---

## Roll back entire operation

1. Find a completed operation.
2. **Rollback** → confirm.
3. API `products/rollback` with `operationId`.
4. Restores **old values** from `msbe_operation_items`.

Requires **`msbulkeditor_rollback`**.

![Rollback confirmation](/components/msbulkeditor/screenshots/history-rollback-confirm.png)

---

## Bulk rollback

Select several completed operations → **Rollback selected**.

![Bulk rollback confirmation](/components/msbulkeditor/screenshots/history-bulk-rollback-confirm.png)

---

## Detail and selective rollback

**Changes** opens the panel below the table (page scrolls to it).

- item list (product × field)
- preview table with checkboxes
- **Rollback selected:** `productIds[]`

Checkbox is active only for status **`applied`**. Other statuses show a disabled checkbox with a tooltip.

Click the **operation ID** in the panel to copy it to the clipboard (toast).

API: `history/items`, `products/rollback`.

![Operation Changes panel](/components/msbulkeditor/screenshots/history-detail.png)

---

## Record retention

- Tables: `msbe_operations`, `msbe_operation_items`. See [Events](../events#database).
- Auto cleanup: task **`operation_cleanup`** when Scheduler is installed. Install and every package update set `msbulkeditor_scheduler_enabled = Yes`.
- Without Scheduler, plugin `msbulkeditor_bootstrap` still cleans the log at most once a day when a manager page opens.
- Retention: `msbulkeditor_history_retention_days` (default 90).

---

## Notes

- Snapshots are written for all field types with a value snapshot, not only price.
- Side-effect ops (gallery regenerate, clear cache) roll back metadata per handler rules. Files on disk are not always restored. See [product and prices](product-and-prices).

---

## See also

- [Preview and apply](preview-and-apply)
- [System settings](../settings#scheduler)
