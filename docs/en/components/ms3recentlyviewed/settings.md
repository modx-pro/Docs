---
title: System settings
---
# System settings

Prefix is `ms3recentlyviewed.`, namespace is **ms3recentlyviewed**.

**Where to edit:** **Manage → System settings** (in MODX 3: **Settings → System settings**). Filter by namespace `ms3recentlyviewed`.

## Settings table

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| `ms3recentlyviewed.max_items` | Max items in “Recently viewed” (`localStorage`/cookie and output) | `20` | 20–50 for most sites, max 100. JS: 20 without config, 100 with config. `ms3rvLexiconScript` sets `ms3rvConfig.maxItems`. |
| `ms3recentlyviewed.storage_type` | Storage type for the viewed list | `localStorage` | `localStorage` until the browser clears it. `cookie`: `ms3_recently_viewed`, current host, `path=/`, 30 days, `SameSite=Lax`, no `Domain`. JS reads the cookie only when `ms3rvLexiconScript` sets `storageType: cookie` in `ms3rvConfig`. Without the snippet, storage stays `localStorage`. |
| `ms3recentlyviewed.sync_enabled` | Write view history to the DB | `true` | After login `viewed.js` sends the browser list (`getAll()`) once per tab. A successful send stores `sessionStorage` key `ms3rv_synced_user`. While it matches `userId`, the request is not sent again. DB writes only when `true`. |
| `ms3recentlyviewed.ttl_days` | Record retention in DB (days) | `90` | 30–365. Only auto-cleanup `ms3rv_cleanup_old_views`, not archive. |
| `ms3recentlyviewed.auto_cleanup_enabled` | Auto-cleanup of old records | `true` | Views older than TTL. Plugin **ms3recentlyviewedSync** (`OnWebPageInit`) at most once a day. |
| `ms3recentlyviewed.archive_enabled` | Monthly archiving | `true` | Last month’s summary in `ms3recentlyviewed_monthly`. Does not touch `ms3recentlyviewed_items`. Dashboard, top and history read `items`. |
| `ms3recentlyviewed.block_bots` | Exclude search bots | `true` | Do not save crawler views to the DB. |
| `ms3recentlyviewed.block_bots_detector` | How bots are detected | `crawler_detect` | `crawler_detect` — **jaybizzle/crawler-detect** (ships with the package). `regex` — built-in regex if the `vendor` directory is unavailable. |
| `ms3recentlyviewed.track_anonymous` | Track anonymous users | `true` | Guest views in DB, by session. Requires sync enabled. |

## Setting groups

- **default** — `max_items`, `storage_type` (limit and browser storage)
- **sync** — `sync_enabled`, `ttl_days`, `auto_cleanup_enabled`, `archive_enabled`, `block_bots`, `block_bots_detector`, `track_anonymous` (DB, bots, guests)

## Hidden keys (not in System Settings)

The package reads these via `getOption`. They are not in transport.

| Key | Where | Purpose |
| --- | --- | --- |
| `ms3recentlyviewed.context` | connector `action=similar` | Context for `switchContext`, default `web` |
| `ms3recentlyviewed.msproduct_class_key` | helpers | Product class_key. Fallback is `MiniShop3\Model\msProduct`, then `msProduct` |
| `ms3recentlyviewed.core_path` | processors and model | Path to `core/components/ms3recentlyviewed/` |
| `ms3recentlyviewed.assets_path` | manager controller | Path to `assets/components/ms3recentlyviewed/` |
