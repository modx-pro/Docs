---
title: pdoTools limitations
---
# pdoTools profiling limitations in MODX 3.x

## What is profiled

| Type | Status | Note |
|------|--------|------|
| **Standard MODX snippets** | ✅ Works | `[[!mySnippet]]` — fully profiled |
| **Chunks via MODX tag** | ✅ Works | `[[$chunkName]]` — via MODX parser |
| **SQL queries** | ✅ Works | All queries |
| **MODX events** | ✅ Works | OnDocFormSave, OnResourceDelete, etc. |
| **Memory and time** | ✅ Works | Overall stats |
| **pdoTools snippets** | ⚠️ Limited | Only as top-level tags — no inner breakdown |

## pdoTools snippet behavior

pdoTools snippets (`msProducts`, `pdoResources`, `pdoPage`) **are** profiled, but:

1. **No breakdown of Fenom chunks inside `tpl`/`tplWrapper`** — snippet appears with total time, SQL is visible, but chunks in `tpl=` are not split.
2. **Fenom modifiers are not profiled** — `{$var|date_format}` is not profiled separately.
3. **Nested calls not profiled** — `{$_modx->runSnippet('pdoMenu', [...])}` in a chunk is not detailed.

The toolbar shows only the top-level call (e.g. `[[!msProducts]]`) with total time and SQL; no breakdown by modifiers or runSnippet inside Fenom.

## Recommendations

### For development

1. Use **standard MODX snippets** to test the profiler.
2. **Check SQL** — it is profiled well (Top 5 Slowest, N+1 Rule).
3. **Watch total time of pdoTools snippets** — if `[[!msProducts]]` takes 500 ms, check SQL, indexes and tpl complexity.

### For production

1. **Cache pdoTools snippets** where possible: e.g. pdoPage with `&cache=`1`` and `&cacheTime=`3600``. See [pdoTools — general properties](/en/components/pdotools/general-properties) and [pdoPage](/en/components/pdotools/snippets/pdopage).
2. Use **`&includeContent=`0``** if content is not needed.
3. **Optimize SQL** from toolbar reports — indexes, prefer `&where` with JSON string.
