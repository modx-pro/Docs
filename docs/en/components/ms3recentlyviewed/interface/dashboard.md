---
title: Dashboard
---
# Dashboard

The **Dashboard** tab under **Extras → ms3RecentlyViewed**.

## KPI cards

- **Total views** — records in `ms3recentlyviewed_items`. A period row under the KPI grid (today / week / month), not a tooltip.
- **Unique products** — number of unique products that were viewed
- **Unique users** — number of unique visitors (`user_id` or `session_id`)
- **Average per user** — average views per visitor

## Top viewed products (Top 10)

The ten most viewed products.

- Columns: rank (#), ID, title, view count
- Sortable by all columns including #
- Rank updates when order changes
- No pagination
- **Refresh** reloads data

KPI, top and history read `ms3recentlyviewed_items`. Archive appends a summary to `ms3recentlyviewed_monthly` and does not drop detail rows. TTL (`ttl_days`) removes old `items`, not the archive.
