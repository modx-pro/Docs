---
title: System settings
---
# System settings

Prefix is `ms3recentlyviewed.`, namespace is **ms3recentlyviewed**.

**Where to edit:** **Manage → System settings** (in MODX 3: **Settings → System settings**). Filter by namespace `ms3recentlyviewed`.

## Settings table

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| `ms3recentlyviewed.max_items` | Maximum items in the “Recently viewed” block (`localStorage`/cookie and output) | `20` | 20–50 for most sites. Max 100. JS caps at 20 without config, at 100 with it. `ms3rvLexiconScript` puts the setting into `ms3rvConfig.maxItems`. |
| `ms3recentlyviewed.storage_type` | Storage type for the viewed list | `localStorage` | `localStorage` — data in the browser until cleared. `cookie` — host-only, `path=/`, 30 days, `SameSite=Lax`. No `Domain` attribute: the cookie is not shared across subdomains. |
| `ms3recentlyviewed.sync_enabled` | Sync for logged-in users | `true` | Enable if you need history across devices. On login, data from `localStorage` moves to the DB. |
| `ms3recentlyviewed.ttl_days` | Record retention in DB (days) | `90` | 30–365 days. Read only by auto-cleanup `ms3rv_cleanup_old_views`, not by archive. |
| `ms3recentlyviewed.auto_cleanup_enabled` | Auto-cleanup of old records | `true` | Removes views older than TTL. Runs once per day on site visit (`OnWebPageInit` plugin). |
| `ms3recentlyviewed.archive_enabled` | Monthly archiving | `true` | Writes last month’s summary into `ms3recentlyviewed_monthly`. Does not delete `ms3recentlyviewed_items` rows. Dashboard, top and history still read `items`. |
| `ms3recentlyviewed.block_bots` | Exclude search bots | `true` | Do not save crawler views to the DB. |
| `ms3recentlyviewed.block_bots_detector` | How bots are detected | `crawler_detect` | `crawler_detect` — **jaybizzle/crawler-detect** (ships with the package). `regex` — built-in regex if the `vendor` directory is unavailable. |
| `ms3recentlyviewed.track_anonymous` | Track anonymous users | `true` | Save guest views to DB. Identified by session. Requires sync enabled. |

## Setting groups

- **default** — `max_items`, `storage_type` (front-end limit and browser storage type)
- **sync** — `sync_enabled`, `ttl_days`, `auto_cleanup_enabled`, `archive_enabled`, `block_bots`, `block_bots_detector`, `track_anonymous` (DB, bots, guests)

## Hidden keys (not in System Settings)

The package reads these via `getOption`. They are not in transport.

| Key | Where | Purpose |
| --- | --- | --- |
| `ms3recentlyviewed.context` | connector `action=similar` | Context for `switchContext`, default `web` |
| `ms3recentlyviewed.msproduct_class_key` | helpers | Product class_key; fallback list is MS3 / `msProduct` |
