---
title: System settings
---
# System settings

All settings use the `ms3productsets.` prefix and are in namespace **ms3productsets**.

**Where to edit:** **System → System Settings** — filter by namespace `ms3productsets`.

## Settings table

| Setting | Description | Default | Recommendations |
|---------|-------------|---------|-----------------|
| `ms3productsets.max_items` | Default product limit per set | `10` | Typically **6–20** for storefront blocks; snippet property **`max_items`** overrides. Used by the snippet, **`get_set`** connector, and **`mspsLexiconScript`**. |
| `ms3productsets.cache_lifetime` | Set cache TTL (seconds). **`0`** disables cache. Cache key: **`type`**, **`resource_id`**, **`category_id`**, **`set_id`**, **`limit`**, **`exclude_ids`** | `3600` | Production: **> 0** (often 3600); debugging or frequent set edits — **`0`**. Caches **`msps_get_products_by_type`** via `cacheManager`. |
| `ms3productsets.auto_recommendation` | When **`0`**, empty manual set returns empty (**no** auto `similar`, `buy_together`, etc.); when **`1`**, fallback to the type’s auto logic | `1` | **`0`** — only manual links (admin/TV) and **`vip_set_*`** fallback for **`vip`**; category- and order-based auto are off. |
| `ms3productsets.vip_set_1` | Product IDs for VIP set when **`set_id=1`** (comma-separated, e.g. `12,34,56`) | `''` | Fallback for **`type=vip`** when there are no manual links. More sets: add **`vip_set_2`**, **`vip_set_3`**, etc., and pass **`set_id`** in **`ms3ProductSets`**. |

## Area in the MODX manager

In the transport package all keys use area **default** (one group in System Settings). Logical grouping:

| Group | Keys |
|-------|------|
| Limits | `max_items` |
| Cache | `cache_lifetime` |
| Behavior | `auto_recommendation` |
| VIP sets | `vip_set_1` (optionally `vip_set_2`, `vip_set_3`, …) |

## Recommendations

- **`max_items`:** product cards and similar blocks often **6–12**; wider shelves up to **20**.
- **`cache_lifetime`:** align with how often sets change and with traffic; with **`0`** every request recomputes output.
- **`auto_recommendation`:** use **`0`** when only explicit links and VIP settings should appear.
- **Multiple VIP sets:** add system settings **`ms3productsets.vip_set_2`**, etc., same pattern as **`vip_set_1`**, and set **`&set_id`** on the snippet.
