---
title: Dashboard
---
# Dashboard

The **Dashboard** tab under **Extras → ms3RecentlyViewed** shows summary metrics for product views. Tab content scrolls when needed.

## KPI cards

- **Total views** — total records in history. Tooltip: for today, week, month (visually distinct: today — primary, week — green, month — gray). Spacing between period blocks.
- **Unique products** — number of unique products that were viewed.
- **Unique users** — number of unique visitors (user_id or session_id).
- **Average per user** — average views per visitor.

Card titles are emphasized for readability.

## Top viewed products (Top 10)

Table of the 10 most viewed products: rank (#), ID, title, view count. Sortable by all columns including #; rank updates when order changes. No pagination. **Refresh** button reloads data.

Data is taken from `ms3recentlyviewed_items` (when archiving is enabled — from summary table `ms3recentlyviewed_monthly`).
