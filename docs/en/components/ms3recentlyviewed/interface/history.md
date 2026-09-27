---
title: View history
---
# View history

The **History** tab: filters, sorting, delete and CSV export.

## Filters

- **By date** — range (`dateFrom`, `dateTo`). “Date from” disables dates with no views.
- **By product** — search by product title or ID

## Table

- **User** — email (or username) for logged-in users; “Guest” for anonymous; #ID for deleted users
- **ID**, **Product ID**, **Product**, **Viewed at** — columns are sortable

Fixed height, vertical scroll.

## Actions

- **Delete single record** — button in the row
- **Bulk delete** — checkboxes and “Delete selected”
- **CSV export** — “Export” downloads the filtered data

| Field | Value |
|-------|-------|
| Format | CSV, UTF-8 BOM, separator `;` |
| Columns | ID, User, Product ID, Product Title, Viewed At |
| User | “Guest”, email or username, #ID |
| Request | GET, connector-mgr, action `mgr/views/export` |

Delete and CSV export require **save_log**. Without it the buttons are hidden.
