---
title: Frontend Dev Toolbar
---
# Frontend Dev Toolbar

Short guide to enabling the toolbar and reading metrics.

## Enabling

1. In system settings enable **modx3profilertoolbar.enabled** and **modx3profilertoolbar.frontend_toolbar**.
2. Ensure you are logged into the Manager (session in `mgr` context) — the toolbar is shown only when logged into admin.
3. Open any site page in the **web** context.

The Dev Toolbar panel appears in the bottom-right. Labels are localized (ru/en/uk) from MODX lexicons.

## How statistics are collected

All stats are collected **on the server** during the request; there is no separate AJAX request for metrics.

1. **Start** (OnMODXInit): plugin creates ProfilerService, registers profilers (SQL, snippet/plugin/chunk), wraps parser to track tags.
2. **During request**: SQL is intercepted via PDO; snippets, chunks and plugins via parser wrappers.
3. **Stop** (OnWebPagePrerender): CollectorService builds trace, AnalyzerService computes Advisor and performance_score.
4. **Output**: ToolbarService injects JSON before `</body>` and loads `toolbar.js`. The script renders the panel.

Data is for the **current** request and is embedded in the HTML.

## Collapsed state

Compact line with main metrics:

```
⏱ 412 ms   🧠 42 MB   🧩 18 snippets   🛢 34 SQL
```

| Symbol | Metric |
|--------|--------|
| ⏱ | Total request time (ms) |
| 🧠 | Peak memory (MB) |
| 🧩 | Number of snippets run |
| 🛢 | Number of SQL queries |

Click the panel to expand with tabs.

## Expanded state

### Tab: Overview

Metrics with color coding (time in ms):

- **Total time** — full response time.
- **TTFB** — Time To First Byte.
- **PHP** — PHP execution time.
- **SQL** — time spent on SQL.

**Colors:** 🟢 Green — good (&lt; 200 ms). 🟡 Yellow — acceptable (200–500 ms). 🔴 Red — needs optimization (&gt; 500 ms).

### Tab: Slow Components

Top slowest components: Snippet/Chunk/Plugin with time in ms and cached/uncached. Use for optimization hints.

### Tab: Timeline

Horizontal waterfall of MODX events; bar length is proportional to time.

### Tab: SQL

List of SQL queries with time, call count, and **⚠️ Possible N+1** when N+1 is suspected.
