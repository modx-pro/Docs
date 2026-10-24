---
title: System settings
---
# System settings

All settings use the `ms3productsets.` prefix. Namespace: **ms3productsets**.

**Where to edit:** **System → System Settings**. Filter by namespace `ms3productsets`.

## Settings table

| Setting | Description | Default | Recommendations |
|---------|-------------|---------|-----------------|
| `ms3productsets.max_items` | Default product limit per set. Used by the snippet, **`get_set`** connector, and **`mspsLexiconScript`**. Snippet property **`max_items`** overrides. | `10` | Product cards and similar blocks: often **6–12**. Wider shelves: up to **20**. |
| `ms3productsets.cache_lifetime` | Set cache TTL in seconds. **`0`** disables cache. Caches **`msps_get_products_by_type`** via `cacheManager`. Cache key: **`type`**, **`resource_id`**, **`category_id`**, **`set_id`**, **`limit`**, **`exclude_ids`**, generation **`cache_generation`**. Generation resets on template save/delete, apply/unbind, TV sync. | `3600` | Production: **> 0** (often 3600). Debugging or frequent set edits: **`0`**. With **`0`** every request recomputes output. |
| `ms3productsets.auto_recommendation` | **`0`:** empty manual set stays empty. No auto `similar`, `buy_together`, and the other auto paths. **`1`:** fallback to the type’s auto logic. | `1` | **`0`:** only manual links (admin/TV) and **`vip_set_*`** fallback for **`vip`**. Category- and order-based auto are off. |
| `ms3productsets.vip_set_1` | Product IDs for VIP set when **`set_id=1`** (comma-separated, e.g. `12,34,56`). | `''` | Fallback for **`type=vip`** when there are no manual links. More sets: add **`vip_set_2`**, **`vip_set_3`**, and so on, then pass **`set_id`** in **`ms3ProductSets`**. |
| `ms3productsets.izitoast_include` | Load iziToast via **`mspsLexiconScript`** if MiniShop3 does not expose its own paths. | `1` | **`0`:** do not load CSS/JS from the two keys below. |
| `ms3productsets.izitoast_css` | iziToast CSS path from `assets/`. | `components/minishop3/css/web/lib/izitoast/iziToast.min.css` | Override if toast lives elsewhere. |
| `ms3productsets.izitoast_js` | iziToast JS path from `assets/`. | `components/minishop3/js/web/lib/izitoast/iziToast.js` | Same for the script. |

## Area in the MODX manager

In the transport package all keys use area **default** (one group in System Settings).

| Group | Keys |
|-------|------|
| Limits | `max_items` |
| Cache | `cache_lifetime` |
| Behavior | `auto_recommendation` |
| VIP sets | `vip_set_1` (optionally `vip_set_2`, `vip_set_3`, …) |
| Storefront toast | `izitoast_include`, `izitoast_css`, `izitoast_js` |
