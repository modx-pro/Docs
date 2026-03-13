---
title: Tops and flops
---
# Tops and flops (table builder)

The **Tops / Flops** dashboard tab — configurable tables with order and product data.

## 6 table types

| Type | Key | Columns |
|-----|------|---------|
| Top products | `top` | #, Product, Revenue, Qty, Margin, % of total revenue |
| Flop products | `flop` | Same columns (lowest revenue) |
| Orders by status | `orders_by_status` | Status, Orders, Revenue |
| Revenue by day | `revenue_by_day` | Date, Revenue, Orders |
| Orders by delivery | `orders_by_delivery` | Delivery, Orders, Revenue |
| Orders by payment | `orders_by_payment` | Payment, Orders, Revenue |

## "Add table" form

Panel is **collapsed** by default. Fields:

| Field | Description |
|------|----------|
| **Type** | One of the 6 table types. |
| **Name** | Required — table block title. |
| **Width** | 50% or 100% of row. |
| **Row limit** | 5, 10, 50, 100. |

## Table features

- **Sort** — click column header (asc/desc).
- **Pagination** — rows per page (5, 10, 50, 100) and page switcher. "#" column is global rank.
- **Total row** — sums for revenue, quantity, margin where applicable.
- **CSV export** — button per table or global export.
- **Storage** — table config in localStorage.

## Export

**CSV** on a table generates UTF-8 with BOM for Excel. Filename is auto (e.g. `ms3pulse-top-2026-02-11.csv`).
