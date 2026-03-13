---
title: System settings
---
# System settings

All settings use the `ms3productsets.` prefix and are in namespace **ms3productsets**.

## Settings list

* `ms3productsets.max_items`

  **Description**: default limit of products in a set.

  **Default**: `10`.

  **Used by**: snippet, connector (`get_set`), `mspsLexiconScript`.

* `ms3productsets.cache_lifetime`

  **Description**: set cache TTL (seconds). `0` = no cache. Cache key: `type + resource_id + category_id + set_id + limit + exclude_ids`.

  **Default**: `3600`.

  **Used by**: snippet and AJAX `get_set` (via `runSnippet`) — result of `msps_get_products_by_type` is cached in MODX `cacheManager`.

* `ms3productsets.auto_recommendation`

  **Description**: when `0`, empty manual set returns empty (no auto `similar`, `buy_together`, etc.); when `1` — current behavior (fallback to auto).

  **Default**: `1`.

  **Used by**: snippet and AJAX `get_set` (via `runSnippet`).

* `ms3productsets.vip_set_1`

  **Description**: product IDs for VIP set `set_id=1`.

  **Default**: `''`.

  **Used by**: fallback for `type=vip`.

## Recommendations

- For most blocks keep `max_items` between 6–20.
- For multiple VIP sets add `vip_set_2`, `vip_set_3` and use `set_id` in the snippet call.
- Under high load set `cache_lifetime` > 0 (e.g. 3600); for debugging or frequent set updates use 0.
- With `auto_recommendation=0` blocks show only manual links (TV/templates) or `vip_set_*`: category and order-based auto are disabled.
