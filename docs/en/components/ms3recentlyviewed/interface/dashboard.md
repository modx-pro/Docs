---
title: Dashboard
---
# Dashboard

The **Dashboard** tab under **Extras → ms3RecentlyViewed** shows summary metrics for product views.

## KPI cards

- **Total views** — records in `ms3recentlyviewed_items`. A period row under the KPI grid (today / week / month), not a tooltip.
- **Unique products** — number of unique products that were viewed
- **Unique users** — number of unique visitors (`user_id` or `session_id`)
- **Average per user** — average views per visitor

## Top viewed products (Top 10)

Table of the 10 most viewed products: rank (#), ID, title, view count. Sortable by all columns including #. Rank updates when order changes. No pagination. **Refresh** reloads data.

KPI, top and history read only `ms3recentlyviewed_items`. Monthly archive writes `ms3recentlyviewed_monthly` and deletes old `items` rows. Those months do not appear here.
