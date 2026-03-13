---
title: Quick start
---
# Quick start

Step-by-step guide to installing and running ms3Pulse.

## Requirements

| Requirement | Version |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MiniShop3 | installed and configured |
| VueTools | 1.1.1+ |

## Step 1: Installation

1. Go to **Extras → Installer**
2. Find **ms3Pulse** in the package list
3. Click **Download** then **Install**

## Step 2: First run

1. Go to **Components → ms3Pulse**.
2. The dashboard opens with tabs: **Overview**, **Dynamics**, **Products and statuses**, **Tops / Flops**.

## Step 3: Period and filters

1. Open the **Filters** panel (click the header).
2. Set period **From** and **To** or use a preset (**7**, **30**, **90**, **180**, **365** days).
3. Optionally select **order statuses** (empty = all statuses).
4. Click **Refresh** to reload data.

## Step 4: Charts and tables

- **Overview** — metric cards (revenue, orders, average order value, margin, products) and revenue mini-chart.
- **Dynamics** — revenue, orders and average order value over time + custom charts.
- **Products and statuses** — top products, orders by status + custom charts.
- **Tops / Flops** — tables (top/flop products, by status, delivery, payment, revenue by day) with sort and CSV export.

## Step 5: Add a custom chart (optional)

1. In the menu choose **ms3Pulse → Builder** or on the Dynamics/Products tabs click **To builder**.
2. Open the **Add chart** panel.
3. Choose **type** (line, bar, pie, etc.), **data source**, **size** and **tab**.
4. Click **Add** — the chart appears on the chosen dashboard tab.

Custom charts are stored in the browser **localStorage**.

## Step 6: Export

- **CSV** — on the Tops/Flops tab each table has a CSV export button.
- **PNG** — in the chart card menu (three dots) choose **Export image (PNG)**.

## Next steps

- [System settings](/en/components/ms3pulse/settings) — default period, scheduled reports
- [Dashboard interface](/en/components/ms3pulse/interface/dashboard) — tabs and elements
- [Chart builder](/en/components/ms3pulse/interface/builder) — types and data sources
- [Scheduled reports](/en/components/ms3pulse/scheduled-reports) — CSV email delivery
