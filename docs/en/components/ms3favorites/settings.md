---
title: System settings
---
# System settings

All settings use the `ms3favorites.` prefix and live in the **ms3favorites** namespace.

**Where to edit:** **Settings → System settings** — filter by namespace `ms3favorites`.

## Settings table

| Setting | Description | Default | Notes |
|---------|-------------|----------|--------|
| `ms3favorites.max_items` | Maximum items in the Favorites block (localStorage/cookie and output) | `20` | 20–50 for most sites; max 100. Enforced in JS when ms3fLexiconScript is loaded. |
| `ms3favorites.storage_type` | Favorites storage type | `localStorage` | `localStorage` — data in browser until cleared; `cookie` — shared across subdomains, 30-day expiry. |
| `ms3favorites.guest_db_enabled` | Save guest list in DB | `true` | Enable for server-side counter, correct **tab counts** on `/wishlist/`, and guest sync. Identified by session_id. |
| `ms3favorites.guest_ttl_days` | Guest record retention (days) | `30` | 0 — do not delete. Used by auto-cleanup (cron). |
| `ms3favorites.share_ttl_days` | Share link validity (days) | `90` | 0 — no expiry. |
| `ms3favorites.max_lists` | Maximum lists per user | `10` | Limit for named lists (default, gifts, plans, etc.). Max 20. |
| `ms3favorites.comments_enabled` | Enable notes on items | `true` | Show textarea for notes in cards. When off, update_comment is rejected. |
| `ms3favorites.check_resource_availability` | Check resource availability before adding | `false` | When on, only published and non-deleted resources are added (sync, copy_share). |
| `ms3favorites.list_page` | List page URL (for ms3FavoritesLists) | `wishlist/` | Relative path for list links. |

## Area in the MODX manager

In the transport package every key uses the **default** area (one group in System Settings). Logical grouping:

| Group | Keys |
|-------|------|
| Limits & storage | `max_items`, `storage_type`, `max_lists` |
| Guests & DB | `guest_db_enabled`, `guest_ttl_days` |
| Sharing | `share_ttl_days` |
| Behaviour | `comments_enabled`, `check_resource_availability`, `list_page` |

## Recommendations

- **max_items:** 20–50 for most sites; enforced in JS when `ms3fLexiconScript` is loaded.
- **storage_type:** `cookie` — if you need a shared list across subdomains (cookie expiry 30 days).
- **guest_db_enabled:** enable for server counter and **tab counts** on `/wishlist/` for guests (and DB sync).
- **guest_ttl_days:** for periodic cleanup add `cli/cleanup_guests.php` to cron.
- **share_ttl_days:** `0` — link never expires; otherwise automatic expiry.

## Guest record cleanup (cron)

```bash
0 3 * * * php /path/to/site/core/components/ms3favorites/cli/cleanup_guests.php
```

When `guest_ttl_days = 0`, cleanup is not run.
