---
title: Modx3ProfilerToolbar
description: Performance toolbar for MODX 3 — request metrics, slow components, timeline and SQL without admin
author: ibochkarev
logo: https://modstore.pro/assets/extras/modx3profilertoolbar/logo.jpg
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Frontend Dev Toolbar', link: 'toolbar' },
  { text: 'pdoTools limitations', link: 'limitations' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# Modx3ProfilerToolbar

MODX 3 extra: lightweight profiler with **Frontend Dev Toolbar** — request metrics, slow components, timeline and SQL. No admin UI, no trace storage, no debug report.

## Features

- **Frontend Dev Toolbar** — panel in bottom-right: time, memory, snippets, SQL. Click for tabs: Overview, Slow Components, Timeline, SQL. Localization (ru/en/uk).
- **MODX Pipeline** — MODX events (OnHandleRequest, OnLoadWebDocument, OnWebPagePrerender), snippets, chunks, plugins, SQL.
- **Advisor** — optimization hints: uncached snippets, N+1, slow queries, chunk overload.
- **Production-safe** — sampling (1–100%), toolbar only when logged into Manager; overhead &lt; 5%.

## Limitations

**pdoTools 3.x:** Fenom snippets and pdoTools snippets (msProducts, pdoResources, etc.) in MODX 3 are **not** profiled in detail. See [pdoTools limitations](limitations).

**What works:** MODX events, SQL, memory, total time, standard `[[!Snippet]]` tags (partially).

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.x |
| PHP | 8.1+ |

Admin and VueTools are not required.

## Installation

1. Go to **Packages → Installer** (Extras → Installer).
2. Find **Modx3ProfilerToolbar** (Performance Toolbar).
3. Click **Install**.

## Next steps

See [Quick start](quick-start) and [Frontend Dev Toolbar](toolbar).
