---
title: System settings
---
# System settings

All settings use the `ms3recentlyviewed.` prefix and live in the **ms3recentlyviewed** namespace.

**Where to edit:** **Manage → System settings** (in MODX 3: **Settings → System settings**) — filter by namespace `ms3recentlyviewed`.

## Settings table

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| `ms3recentlyviewed.max_items` | Maximum items in “Recently viewed” block (localStorage/cookie and output) | `20` | 20–50 for most sites; max 100. Enforced in JS when ms3rvLexiconScript is loaded. |
| `ms3recentlyviewed.storage_type` | Storage type for viewed list | `localStorage` | `localStorage` — data in browser until cleared; `cookie` — shared across subdomains, 30-day expiry. |
| `ms3recentlyviewed.sync_enabled` | Sync for logged-in users | `true` | Enable if you need history across devices. On login, data from localStorage is moved to DB. |
| `ms3recentlyviewed.ttl_days` | Record retention in DB (days) | `90` | 30–365 days. Used by auto-cleanup and archiving. |
| `ms3recentlyviewed.auto_cleanup_enabled` | Auto-cleanup of old records | `true` | Removes views older than TTL. Runs once per day on site visit (OnWebPageInit plugin). |
| `ms3recentlyviewed.archive_enabled` | Monthly archiving | `true` | Aggregates past month data into `ms3recentlyviewed_monthly` and removes detail rows. Reduces table size. On by default. |
| `ms3recentlyviewed.block_bots` | Exclude search bots | `true` | Do not save crawler views to the DB. |
| `ms3recentlyviewed.block_bots_detector` | How bots are detected | `crawler_detect` | `crawler_detect` — **jaybizzle/crawler-detect** (ships with the package). `regex` — built-in regex fallback if vendor is unavailable. |
| `ms3recentlyviewed.track_anonymous` | Track anonymous users | `true` | Save guest views to DB. Identified by session. Requires sync enabled. |

## Setting groups

- **default** — `max_items`, `storage_type` (front-end limit and browser storage type).
- **sync** — `sync_enabled`, `ttl_days`, `auto_cleanup_enabled`, `archive_enabled`, `block_bots`, `block_bots_detector`, `track_anonymous` (DB, bots, guests).

## Recommendations

- **max_items:** 20–50 for most sites; enforced in JS when ms3rvLexiconScript is loaded.
- **storage_type:** `cookie` — if you need a shared list across subdomains (cookie expiry 30 days).
- **archive_enabled:** on by default; with high view volume it reduces main table size.
- **block_bots / block_bots_detector:** by default crawlers are filtered with **CrawlerDetect**; if vendor is missing, `regex` mode is used.
