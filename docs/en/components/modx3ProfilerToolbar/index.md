---
title: Modx3ProfilerToolbar
description: Current-request metrics panel for MODX 3. No admin UI and no stored traces
categories: other
author: Ibochkarev
logo: https://modstore.pro/assets/extras/modx3profilertoolbar/logo.png
modstore: https://modstore.pro/packages/other/modx3profilertoolbar
compatibility:
  - modx3
  - php81
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'On-page panel', link: 'toolbar' },
  { text: 'Limitations', link: 'limitations' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# Modx3ProfilerToolbar

The package shows metrics for the current request in a panel on the site page. There is no admin UI. The trace is not written to the database or to a file.

## What you see on the page

The collapsed panel in the bottom-right corner shows total time, peak memory, the number of collected snippets, and the number of SQL rows. A click opens four tabs: Overview, Slow components, Timeline, and SQL. The `modx3profilertoolbar` lexicon sets the labels (ru, en, uk).

The package builds the panel when `enabled` and `frontend_toolbar` are on. The request must fall inside `sampling_rate`. The page also needs the `web` context, an `mgr` context session, and `</body>` in the HTML.

## What is collected

In the timeline, `OnHandleRequest` and `OnLoadWebDocument` have a non-zero duration. `OnMODXInit` and `OnWebPagePrerender` appear with 0 ms. Plugins are not collected as separate rows.

The `Modx3ProfilerToolbar` plugin listens to `OnMODXInit` (priority -100), `OnHandleRequest`, `OnLoadWebDocument`, and `OnWebPagePrerender`.

The SQL tab has one row with the xPDO query count and the sum of query time. Query text is not included. Details are in [Limitations](limitations).

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0.0 or newer |
| PHP | 8.1.0 or newer |

The package does not require VueTools and does not create a menu item.

## Installation

1. Open the package installer.
2. Find **Modx3ProfilerToolbar**.
3. Click **Install**.

On install and upgrade the package sends a POST to `https://metrics.modx.pro/` with a 2 second timeout. The body contains PHP, MODX, database, and pdoTools versions, the OS type, the web server, and the context count. Domain and IP are not in that set. A failed send does not stop installation.

Next: [Quick start](quick-start).
