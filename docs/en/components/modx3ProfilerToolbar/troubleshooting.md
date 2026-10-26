---
title: Troubleshooting
---
# Troubleshooting

The panel did not appear, or the MODX log is filling with package errors.

## The panel does not appear

1. `modx3profilertoolbar.enabled` and `modx3profilertoolbar.frontend_toolbar` are on.
2. The page is open in the `web` context, not in the manager.
3. There is an `mgr` context session.
4. The `Modx3ProfilerToolbar` plugin is enabled on `OnMODXInit`, `OnHandleRequest`, `OnLoadWebDocument`, and `OnWebPagePrerender`.
5. The request fell inside `sampling_rate`. Below 100, some requests get no panel.
6. The resource output contains `</body>`. Without that string the package does not change the HTML and does not write a console error.
7. The browser loaded `toolbar.js` and `petite-vue` 0.4.1 from `unpkg.com`. Blocking `unpkg` leaves the JSON in the page and does not build the panel. Search the page for `window.modx3profilertoolbarToolbarData`.

## The log says pdoTools service not found

On a profiled request without the `pdotools` service, the package writes `[Modx3ProfilerToolbar] pdoTools service not found`. Collection continues after that write. The error text does not mean the request was aborted.

## What collection adds

On a request inside `sampling_rate`, memory holds the timer, the SQL row, and pdoTools timings when the service exists. The trace is not written to the database or to disk.

With `enabled` on, the package still replaces the parser on `OnMODXInit` for a request outside `sampling_rate`. The package does not measure overhead as a percentage.

On a live site leave `frontend_toolbar` on only when those who log in to the manager are the people who should see the panel. An `mgr` session is already required for injection.

## Shared hosting

The package does not create trace files. Install and upgrade send a POST to `https://metrics.modx.pro/` with a 2 second timeout. Failure does not interrupt installation. The body is described in the [overview](/en/components/modx3profilertoolbar/#installation).

## How to turn it off

Set `modx3profilertoolbar.enabled` to No. The plugin returns before `start()` and before parser replacement.

With the key off, the request only reads that setting.

## Other packages

There is no separate code for miniShop3, Fenom, or pdoTools snippets. How they meet this package is described in [Limitations](limitations). You do not need to edit the template. The panel is added before `</body>` in the resource output that is already built.
