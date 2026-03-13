---
title: View history
---
# View history

The **History** tab is a table of view records with filters, sorting and actions. Tab content scrolls when needed.

## Filters

- **By date** — date range (dateFrom, dateTo). “Date from” disables dates with no views.
- **By product** — search by product title or ID.

## Table

- **User** — email (or username) for logged-in users; “Guest” for anonymous; #ID for deleted users.
- **ID**, **Product ID**, **Product**, **Viewed at** — columns are sortable.

Table has fixed height and vertical scroll.

## Actions

- **Delete single record** — button in the row.
- **Bulk delete** — checkboxes and “Delete selected” button.
- **CSV export** — “Export” button: export filtered data. Format: CSV, UTF-8 BOM, separator `;`. Columns: ID, User, Product ID, Product Title, Viewed At. User column: “Guest” for anonymous, email or username for logged-in, #ID for deleted users. GET request supported for file download (connector-mgr, action `mgr/views/export`).

**save_log** permission is required for delete and export.
