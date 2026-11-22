---
title: System settings
---
# System settings

In MODX system settings, filter the `modx3profilertoolbar` namespace. The package does not create a menu item.

## Keys

| Key | Default | What the code does |
| --- | --- | --- |
| `modx3profilertoolbar.enabled` | No | Turns the plugin on. On `OnMODXInit` it calls `start()` and `replaceParser()`. When the value is No, the plugin returns before collection. |
| `modx3profilertoolbar.sampling_rate` | `100` | Percent of requests for which `start()` reaches collection. Below 100, a skipped request gets no panel. With `enabled` on, `replaceParser()` still runs on a skipped request. |
| `modx3profilertoolbar.frontend_toolbar` | Yes | Allows the panel to be injected. Requires the `web` context and an `mgr` session. |
| `modx3profilertoolbar.slow_query_ms` | `100` | Slow SQL threshold in milliseconds. The rule reads the SQL row time. The result is not inserted into HTML. |
| `modx3profilertoolbar.slow_snippet_ms` | `50` | Slow snippet threshold in milliseconds. The rule reads events of type `snippet`. Collection does not add those events. The panel does not show the threshold. |
| `modx3profilertoolbar.cli_enabled` | No | When Yes, CLI collection is not rejected. The panel is injected only in the `web` context. The trace is not written to the database or to a file. |

## Who can see the data

The HTML receives JSON for the current request: times, names of collected tags, and a row with the SQL count. Individual query text and plugin names are not in that markup.

Injection runs only for a request with an `mgr` session. Restrict manager login.

`sampling_rate` reduces how many requests are collected. It does not turn off parser replacement while `enabled` is on.
