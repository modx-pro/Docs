---
title: Filters and period
---
# Filters and period

The filters panel sets the period, order statuses and how data is grouped on charts.

## Calendar (period)

- **From** and **To** — date via DatePicker or manual input.
- Calendar has **Today** and **Clear**.
- Rules: From cannot be after To, To cannot be after today.
- If there are orders in the DB, the UI may limit the available date range (server hint).

## Period presets

Buttons **7**, **30**, **90**, **180**, **365** days. On click:

- **To** = today;
- **From** = today − N days.

Data reloads after selecting a preset.

## Grouping

How "by day/week/month" chart points are aggregated:

| Value | Description | Suggested range |
|----------|----------|-------------------------|
| By day | One point = 1 day | Up to ~60 days |
| By week | One point = 1 week | 1–3 months |
| By month | One point = 1 month | Quarter and more |

## Order statuses

Multi-select of MiniShop3 statuses. Colors from MiniShop3 status settings.

- **Empty** = all statuses.
- Choice affects metrics, charts and tables (revenue, orders, tops use only selected statuses).

## Refresh button

Reloads data from the server using current filters (period, statuses, grouping).
