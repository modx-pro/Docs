---
title: Limitations
---
# Limitations

## Summary

| Object | What reaches the panel |
| --- | --- |
| Events `OnHandleRequest`, `OnLoadWebDocument` | Duration between open and close |
| Events `OnMODXInit`, `OnWebPagePrerender` | A timeline row with 0 ms |
| Manager events (`OnDocFormSave`, `OnResourceDelete`, and others) | The plugin is not subscribed to them |
| Memory and total time | Overview tab |
| SQL | One row with the `executedQueries` count and the `queryTime` sum. No query text |
| A plain `[[!Snippet]]` or `[[$chunk]]` tag | The parser wrapper is installed on `OnMODXInit` before `getParser()`. `processElementTags()` goes to the inner parser and does not call the wrapper `processTag()` |
| A snippet from pdoTools timings | A `modSnippet` load row. Time: that step's delta, and the SQL count on the row is 0 |
| Plugins | Not collected |
| Recommendations and the `slow_query_ms`, `slow_snippet_ms` thresholds | Calculated in memory. Not present in the HTML |

On a profiled request `SQLProfiler` sets `cache_db` to false.

Five rules run in memory. Slow SQL reads `slow_query_ms`. The slow snippet rule reads `slow_snippet_ms` and events of type `snippet`, which collection does not add. N+1 reads `is_n1`, which collection does not set. A chunk is flagged from 50 calls. Snippets are info from 5 and warning from 10. None of this is in the HTML.

## pdoTools

When the `pdotools` service exists, collection reads its `timings` and looks for `Loaded "modSnippet"`. That line is written when the object is loaded. The tag becomes `{$_modx->runSnippet("name")}` with the step delta as the time. That is not execution duration and not the SQL inside the snippet.

Collection does not split `tpl` chunks, Fenom modifiers, or a nested `{$_modx->runSnippet()}`.

When the `pdotools` service is missing, every profiled request writes `pdoTools service not found` to the MODX log. The request still reaches panel injection.

There is no miniShop3 integration in the package. The `OnMODXInit` priority of -100 is set so the plugin runs before pdoTools and MiniShop3.

## What to use instead of a breakdown

Read the query count and the summed query time in the single SQL tab row. Take query text and the plan from the database log. The panel does not show SQL text or the execution time of `msProducts`.

pdoTools snippet cache is configured on the snippet call. Selection parameters are described in [pdoTools general properties](/en/components/pdotools/general-properties).
