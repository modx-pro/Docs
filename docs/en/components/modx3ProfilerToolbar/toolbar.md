---
title: On-page panel
---
# On-page panel

## When the panel appears

1. Turn on `modx3profilertoolbar.enabled` and `modx3profilertoolbar.frontend_toolbar`.
2. Log in to the manager. An `mgr` context session is required.
3. Open a page in the `web` context. The request must fall inside `sampling_rate`.
4. The resource output must contain `</body>`.

The panel script is `assets/components/modx3profilertoolbar/js/toolbar/toolbar.js`. It is a module. It imports `petite-vue` 0.4.1 from `unpkg.com`. There is no separate request for metrics. The JSON is in `window.modx3profilertoolbarToolbarData`. The `modx3profilertoolbar` lexicon sets the labels (ru, en, uk).

## Where the numbers come from

Collection runs on the server.

1. `OnMODXInit`. The plugin creates the service and calls `start()`. If the request is profiled, the timer starts and the `OnMODXInit` event opens. Then `replaceParser()` replaces `$modx->parser`, even when collection did not start for this request.
2. `OnHandleRequest` opens its event. `OnLoadWebDocument` closes `OnHandleRequest` and opens its own. `OnWebPagePrerender` closes `OnLoadWebDocument`, opens its own, and calls `stop()` at once without closing `OnWebPagePrerender`.
3. `stop()` builds the trace. Recommendation and score calculation runs. The panel JSON does not include that calculation.
4. Injection before `</body>`: CSS, JSON, and the `toolbar.js` module. Without `</body>` the output is unchanged.

`OnMODXInit` and `OnWebPagePrerender` stay at duration 0. The non-zero bars are `OnHandleRequest` and `OnLoadWebDocument`.

## Collapsed line

| Fragment | Field |
| --- | --- |
| time, ms | total time from `start()` to `stop()` |
| memory | peak, in MB with two decimals |
| snippet count and label | sum of `attempts` on snippet tags |
| SQL count and label | number of rows on the SQL tab, not the query count inside the row text |

## Overview tab

Time color: under 200 ms green, from 200 ms and under 500 ms yellow, from 500 ms red.

| Row | Value |
| --- | --- |
| Total time | the same total time, ms |
| TTFB | the same total time, ms |
| PHP | total time minus SQL time, ms |
| SQL | sum of SQL row times, ms |
| Query time | SQL time in seconds, four decimals |
| Source | `database` when the resource is generated in this request, otherwise `cache` |

## Slow components tab

Up to 10 rows, sorted by the time stored in the data. When a row has a call count, the screen format is `Snippet: name — N Calls`. Milliseconds and the cache flag are not rendered in that branch. Tags always have a call count. The name comes from the tag text without the `[[ ]]` wrapper and is at most 255 characters.

## Timeline tab

Up to 20 events. Bar width equals that event's share of the longest duration in the list. A zero duration has an empty bar.

The list includes `OnMODXInit`, `OnHandleRequest`, `OnLoadWebDocument`, and `OnWebPagePrerender`.

## SQL tab

Up to 20 rows. If any queries ran after collection started, the tab has one row. The text is `N SQL queries`, the time is the `queryTime` delta, and the call count is `N`. Zero queries leave the tab empty.

The "Possible N+1" badge is rendered only when `is_n1` is set. Collection does not set that flag.
