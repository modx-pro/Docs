---
title: View history
---
# View history

The **History** tab is a table of view records with filters, sorting and actions.

## Filters

- **By date** — date range (`dateFrom`, `dateTo`). “Date from” disables dates with no views.
- **By product** — search by product title or ID

## Table

- **User** — email (or username) for logged-in users; “Guest” for anonymous; #ID for deleted users
- **ID**, **Product ID**, **Product**, **Viewed at** — columns are sortable

Table has fixed height and vertical scroll.

## Actions

- **Delete single record** — button in the row
- **Bulk delete** — checkboxes and “Delete selected”
- **CSV export** — “Export” downloads the filtered data. Format: CSV, UTF-8 BOM, separator `;`. Columns: ID, User, Product ID, Product Title, Viewed At. User column: “Guest” for anonymous, email or username for logged-in, #ID for deleted users. GET is supported for file download (connector-mgr, action `mgr/views/export`).

**save_log** is required for delete. CSV export needs only **view**. Buttons are not hidden when `save_log` is missing.
