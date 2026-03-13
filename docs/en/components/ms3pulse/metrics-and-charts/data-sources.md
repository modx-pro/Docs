---
title: Data sources
---
# Chart data sources

Charts use one of five data sources from the server (processor `GetChartsData`).

## Source list

| Source | Key | Description |
|----------|------|----------|
| Revenue by day | `revenue_by_day` | Sum of orders by day/week/month (depends on grouping). |
| Orders by day | `orders_by_day` | Order count by day/week/month. |
| Average order value by day | `avg_check_by_day` | Revenue ÷ order count per interval. |
| Top products | `top_products` | Products sorted by revenue (name, revenue, quantity, margin). |
| Orders by status | `orders_by_status` | Order count per status (status name, count, color). |

## Filter usage

All sources respect:

- **Period** (From and To);
- **Order statuses** (if none selected — all statuses);
- **Grouping** (day/week/month) — for "by day" sources.

## Point limit

In the chart builder form you set **data count** (5, 10, 20, 50, 100):

- For **revenue/orders/average order value by day** — last N points (by time).
- For **top products** and **orders by status** — first N records (top N products or statuses up to N).

This keeps charts readable with large date ranges or many products.
