---
title: View history
---
# View history

## Filters

- **Date from** — inside the window from today minus one year through today, dates with no views are disabled. Older dates can still be picked. The upper bound is **Date to** or today.
- **Date to** — from **Date from** through today. The empty-date list is not applied to this field.
- **By product** — search by product title or ID

Filters apply with **Apply** and **Reset**. Enter in the search field also runs Apply.

## Table

- **User** — email (or username) for logged-in users, “Guest” for anonymous, #ID for deleted users
- **ID**, **Product ID**, **Product**, **Viewed at** — columns are sortable

The default page size is 25. The paginator offers 10, 25, 50 and 100. Scroll height is `31.25rem`.

## Actions

- **Delete single record** — button in the row
- **Bulk delete** — checkboxes and “Delete Selected”
- **CSV export** — downloads the filtered data

| Field | Value |
|-------|-------|
| Format | CSV, UTF-8 BOM, separator `;` |
| Columns | ID, User, Product ID, Product Title, Viewed At |
| User | “Guest”, email or username, #ID |
| Request | GET, connector-mgr, action `mgr/views/export` |

Delete and export need **save_log**. Without the permission the buttons stay hidden and the connector returns JSON.
