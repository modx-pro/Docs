---
title: Chart builder
---
# Chart builder

Section for adding custom charts to the **Dynamics** and **Products and statuses** dashboard tabs.

## Access

- Menu **ms3Pulse → Builder** (view `?view=builder`).
- Or **To builder** on the Dynamics / Products tabs (with tooltip on hover).

## "Add chart" form

Panel is **collapsed** by default. Form fields:

| Field | Description |
|------|----------|
| **Type** | One of 15 types: line, step line, area, bar, horizontal bar, scatter, pie, rose, donut, funnel, radar, gauge, treemap, etc. |
| **Data source** | Revenue by day, orders by day, average order value by day, top products, orders by status. |
| **Size** | 100% (full), 75%, 50%, 25% of grid width. |
| **Tab** | Dynamics or Products and statuses. |
| **Data count** | 5, 10, 20, 50, 100 — for "by day" this is the last N points; for top/statuses — first N. |
| **Title** | Optional. |
| **Description** | Optional. |

After **Add**, the chart appears on the chosen dashboard tab.

## Type preview

The builder page shows a grid of previews for all 15 chart types.

## Storage

Custom charts and their order are stored in the browser **localStorage**. They are recreated when you switch browser or device.

## Recommended combinations

| Data source | Suitable chart types |
|-----------------|---------------------------|
| Revenue / orders / average order value by day | Line, step line, area, bar, scatter, radar, gauge; also funnel, pie, donut, treemap. |
| Top products | Horizontal bar, pie, donut, funnel, radar, treemap. |
| Orders by status | Pie, donut, funnel, radar, treemap. |

See [Chart types](/en/components/ms3pulse/metrics-and-charts/chart-types), [Data sources](/en/components/ms3pulse/metrics-and-charts/data-sources).
