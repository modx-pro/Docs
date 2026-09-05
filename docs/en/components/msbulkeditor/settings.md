---
title: System settings
description: msbulkeditor_* keys, permissions, Scheduler, and production tips
---

# System settings

Namespace: **`msbulkeditor`**. DB keys: `msbulkeditor_*`.

## General

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msbulkeditor_chunk_size` | number | `50` | Products per apply / batch pass |
| `msbulkeditor_expert_limit` | number | `5000` | Max products for “all matching filter” |
| `msbulkeditor_preview_detail_limit` | number | `100` | Rows in detailed preview |
| `msbulkeditor_history_retention_days` | number | `90` | History retention (days) |
| `msbulkeditor_enable_save_setting_user` | boolean | `Yes` | Save columns and expert mode in `modUserSetting` |
| `msbulkeditor_expert_mode` | boolean | `No` | Allow expert mode in the UI |
| `msbulkeditor_import_max_rows` | number | `10000` | Max CSV/XLSX rows per upload |

## Scheduler

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msbulkeditor_scheduler_enabled` | boolean | `No` | History cleanup via Scheduler task |

Task **`msbulkeditor / operation_cleanup`** deletes operations older than `history_retention_days`.

1. Install [Scheduler](/en/components/scheduler/).
2. Set `msbulkeditor_scheduler_enabled = Yes`.
3. Point cron at `php /path/to/assets/components/scheduler/run.php` (usually daily).

Without Scheduler, `msbe_operations` / `msbe_operation_items` grow until you clean them up.

## Permissions

| Permission | Purpose |
| --- | --- |
| `msbulkeditor_view` | Grid, preview, history (read), UI state |
| `msbulkeditor_edit` | Apply bulk operations, save UI |
| `msbulkeditor_rollback` | Roll back completed operations |
| `msbulkeditor_presets` | Create / update / delete presets |
| `msbulkeditor_import_export` | Import and export files |

**Presets** and **Import & export** tabs are hidden without the matching permission. A direct URL without permission redirects to **Products**.

## Production tips

- Catalog **> 5000** products: keep `expert_limit` aligned with RAM and PHP timeout. Lower `chunk_size` if a chunk exceeds the time limit.
- **`enable_save_setting_user = Yes`** — per-manager columns. **No** — shared table layout.
- **`expert_mode = No`** — explicit row selection only. Lower risk of a mass mistake.

## Paths

| Path | Contents |
| --- | --- |
| `core/components/msbulkeditor/` | PHP, processors, lexicon |
| `assets/components/msbulkeditor/` | connector, JS/CSS bundle |

Connector: `assets/components/msbulkeditor/connector.php`.

After a package update, clear the MODX cache and hard-reload the panel page.

## Related

- [MODX events](events) — plugins on apply and export
- [FAQ](faq) — permission and limit errors
