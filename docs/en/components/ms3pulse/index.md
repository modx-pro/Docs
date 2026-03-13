---
title: ms3Pulse
description: Sales dashboard and analytics for MiniShop3 — metrics, charts, export and scheduled reports
logo: https://modstore.pro/assets/extras/ms3pulse/logo.jpg
author: ibochkarev

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  {
    text: 'Interface',
    link: 'interface',
    items: [
      { text: 'Dashboard', link: 'dashboard' },
      { text: 'Chart builder', link: 'builder' },
      { text: 'Tops and flops', link: 'topflops' },
      { text: 'Settings', link: 'settings' },
    ],
  },
  {
    text: 'Metrics and charts',
    link: 'metrics-and-charts',
    items: [
      { text: 'Metrics and indicators', link: 'metrics' },
      { text: 'Filters and period', link: 'filters' },
      { text: 'Chart types', link: 'chart-types' },
      { text: 'Data sources', link: 'data-sources' },
    ],
  },
  { text: 'Export', link: 'export' },
  { text: 'Scheduled reports', link: 'scheduled-reports' },
  { text: 'Permissions', link: 'permissions' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# ms3Pulse

Sales dashboard and analytics for [MiniShop3](/en/components/minishop3/): period metrics, charts on Apache ECharts 6, custom chart builder, "Tops / Flops" tables, CSV/PNG export and email reports on a schedule.

## Features

- **Metrics** — revenue, orders, average order value, margin, products; comparison with previous period
- **Charts** — 15 types (line, bar, pie, funnel, tree, etc.), 5 data sources
- **Chart builder** — add custom charts to "Trends" and "Products" tabs
- **Table builder** — 6 table types (product top/flop, by status, delivery, payment, revenue by day)
- **Filters** — period (from/to), MiniShop3 order statuses, group by day/week/month
- **Export** — CSV for tables, PNG for charts
- **Scheduled reports** — send CSV by email via [Scheduler](/en/components/scheduler/)

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — data source (orders, products, statuses, delivery, payment)
- **[VueTools](/en/components/vuetools/) 1.1.1** — Vue 3 and PrimeVue for dashboard UI
- **[Scheduler](/en/components/scheduler/)** *(optional)* — for scheduled reports

## Installation

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3** and **VueTools 1.1.1** are installed
4. Find **ms3Pulse**, click **Download**, then **Install**
5. **Manage → Clear cache**

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

**Components → ms3Pulse** — opens the dashboard. Submenu: **Builder** (chart builder) and **Settings**.

See [Quick start](quick-start).

## Terms

| Term | Description |
|------|-------------|
| **Dashboard** | Main page with metrics, filters and chart tabs |
| **Chart builder** | Page for adding custom charts to "Trends" and "Products" tabs |
| **Data builder** | "Tops / Flops" tab with configurable tables |
