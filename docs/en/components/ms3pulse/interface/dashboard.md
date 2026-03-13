---
title: Dashboard
---
# Dashboard interface

Description of the main ms3Pulse page elements.

## Header

- **ms3Pulse** title.
- On the Tops/Flops tab — table export buttons.

## Filters panel

**Collapsed** by default. Expand by clicking the **Filters** header.

| Element | Description |
|---------|----------|
| **Period** | "From" and "To" (DatePicker). |
| **Statuses** | Multi-select of MiniShop3 order statuses. Empty = all. Colors from MiniShop3 status settings. |
| **Grouping** | Day / week / month — aggregation of chart points over time. |
| **Presets** | Buttons 7, 30, 90, 180, 365 days — set period ("To" = today, "From" = today − N). |
| **Refresh** | Reload data. |

## Dashboard tabs

| Tab | Content |
|---------|------------|
| **Overview** | 5 metric cards (revenue, orders, average order value, margin, products), comparison with previous period (%), revenue mini-chart. |
| **Dynamics** | 3 fixed charts (revenue, orders, average order value by day) + custom. "To builder" button. |
| **Products and statuses** | Top products (horizontal bars), orders by status (donut) + custom. "To builder" button. |
| **Tops / Flops** | Table builder: 6 data types, pagination, CSV export. |

## Empty states

- No data for period — message suggesting to change filters or period.
- No custom charts — hint to add a chart via the builder.

## Chart interactivity

- **Tooltip** on hover over points/segments.
- **Card menu** (three dots): size (100%, 75%, 50%, 25%), export to PNG, export data to CSV, remove (for custom).
- **Drag** — reorder custom charts on the tab.
