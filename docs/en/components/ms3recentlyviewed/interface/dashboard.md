---
title: Dashboard
---
# Dashboard

The **Dashboard** tab in the **Recently Viewed** menu.

## KPI cards

Labels on screen:

- **Total views** — row count in `ms3recentlyviewed_items`
- **Unique products** — `COUNT(DISTINCT product_id)`
- **Unique users** — logged-in users by `user_id`, guests by `session_id` when that column exists
- **Avg per user** — total views divided by the unique user count

A period row sits under the grid. These are separate counters, not a card tooltip.

- **today** — `DATE(viewed_at) = CURDATE()`
- **this week** — the last 7 days (`INTERVAL 7 DAY`)
- **this month** — the last 30 days (`INTERVAL 30 DAY`)

## Top viewed products (Top 10)

Ten products with the most rows in `ms3recentlyviewed_items`. The query keeps only IDs that exist in `ms3_products`.

- Columns: rank (#), ID, title, view count
- Sortable by all columns including #
- Rank updates when order changes
- No pagination
- A refresh icon with the tooltip **Refresh dashboard** reloads the data

KPI, top and history read `ms3recentlyviewed_items`. Archive appends a summary to `ms3recentlyviewed_monthly` and does not drop detail rows. TTL (`ttl_days`) removes old `items`, not the archive.
