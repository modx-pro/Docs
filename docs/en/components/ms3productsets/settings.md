---
title: System settings
---
# System settings

Key prefix: `ms3productsets.`. Namespace: **ms3productsets**.

**Where to edit:** **System → System Settings**. Filter: `ms3productsets`.

## Settings table

| Setting | Description | Default | Recommendations |
|---------|-------------|---------|-----------------|
| `ms3productsets.max_items` | Limit for `get_set` when POST has no `max_items`, for `window.mspsConfig.maxItems`, and for `render()` without its own `max_items`. Calls without `&max_items` use snippet property `10`, not this setting. | `10` | Storefront blocks: **6–20**. Product cards: **6–12**. Wide shelves: up to **20**. |
| `ms3productsets.cache_lifetime` | Set cache TTL in seconds. **`0`** disables cache. Caches **`msps_get_products_by_type`** via `cacheManager`. Key: **`type`**, **`resource_id`**, **`category_id`**, **`set_id`**, **`limit`**, **`exclude_ids`**, generation **`cache_generation`**. Generation resets on template save/delete, apply/unbind, TV sync, and `OnResourceDelete`. | `3600` | Production: **> 0** (often 3600). Debugging or frequent edits: **`0`**. With **`0`** every request recomputes output. |
| `ms3productsets.auto_recommendation` | **`0`:** empty manual set stays empty. Auto paths (`similar`, `buy_together`, and others except `vip`) stay off. **`1`:** type auto logic runs. `vip` ignores this setting. | `1` | **`0`:** storefront shows manual links (admin/TV) and **`vip_set_*`** for **`vip`** only. Category and order auto are off. |
| `ms3productsets.vip_set_1` | Product IDs for VIP when **`set_id=1`** (comma-separated, e.g. `12,34,56`). | `''` | Fallback for **`type=vip`** with no manual links. More sets: **`vip_set_2`**, **`vip_set_3`**, and **`set_id`** in **`ms3ProductSets`**. |
| `ms3productsets.izitoast_include` | Load iziToast via **`mspsLexiconScript`** when MiniShop3 does not expose paths. | `1` | **`0`:** do not load CSS/JS from the keys below. |
| `ms3productsets.izitoast_css` | iziToast CSS from `assets/` root. | `components/minishop3/css/web/lib/izitoast/iziToast.min.css` | Override if toast lives elsewhere. |
| `ms3productsets.izitoast_js` | iziToast JS from `assets/` root. | `components/minishop3/js/web/lib/izitoast/iziToast.js` | Same for the script. |

## Area in the MODX manager

In the package all keys use area **default** (one group in System Settings).

| Group | Keys |
|-------|------|
| Limits | `max_items` |
| Cache | `cache_lifetime` |
| Behavior | `auto_recommendation` |
| VIP sets | `vip_set_1` (optionally `vip_set_2`, `vip_set_3`, …) |
| Storefront toast | `izitoast_include`, `izitoast_css`, `izitoast_js` |
