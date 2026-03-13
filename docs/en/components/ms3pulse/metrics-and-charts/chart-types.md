---
title: Chart types
---
# Chart types

ms3Pulse uses **Apache ECharts 6**. There are 15 visualization types.

## Type list

| Type | Key | Description |
|-----|------|----------|
| Line | `line` | Smooth line over time. |
| Step line | `lineStep` | Line with discrete steps. |
| Area | `area` | Line with fill under the curve. |
| Stacked area | `stackedArea` | Area chart with stacked series. |
| Bar | `bar` | Vertical bars. |
| Horizontal bar | `barHorizontal` | Horizontal bars (rankings, tops). |
| Stacked bar | `stackedBar` | Multiple series in bars with sum. |
| Scatter | `scatter` | Points on X/Y axes. |
| Pie | `pie` | Pie chart (shares). |
| Rose (Nightingale) | `rose` | Pie with sectors by area (roseType: 'area'). |
| Donut | `donut` | Pie with center hole. |
| Funnel | `funnel` | Decreasing blocks (funnel). |
| Radar | `radar` | Radar chart. |
| Gauge | `gauge` | Needle indicator. |
| Treemap | `treemap` | Rectangles by value. |

## Color palette

Eight colors in rotation: `#6CB24A`, `#3498db`, `#e74c3c`, `#f39c12`, `#9b59b6`, `#1abc9c`, `#34495e`, `#e67e22`.

## Type limits

- For "by day" sources (revenue, orders, average order value) line, bar, scatter, area are natural.
- For top products and orders by status — horizontal bar, pie, donut, funnel, treemap, radar.

Not every type × source combination is meaningful; use [recommended combinations](/en/components/ms3pulse/interface/builder#recommended-combinations) in the builder.
