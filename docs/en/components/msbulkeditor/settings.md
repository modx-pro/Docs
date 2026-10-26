---
title: System settings
description: msbulkeditor_* keys, permissions, Scheduler, and production tips
---

# System settings

Namespace **`msbulkeditor`**, DB keys: `msbulkeditor_*`.

## General

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msbulkeditor_chunk_size` | number | `50` | Products per apply batch |
| `msbulkeditor_expert_limit` | number | `5000` | Max products for “all matching filter” |
| `msbulkeditor_preview_detail_limit` | number | `100` | Rows in detailed preview |
| `msbulkeditor_history_retention_days` | number | `90` | History retention (days) |
| `msbulkeditor_enable_save_setting_user` | boolean | `Yes` | Save columns and expert mode in `msbe_user_states` |
| `msbulkeditor_expert_mode` | boolean | `No` | Allow expert mode in the UI |
| `msbulkeditor_import_max_rows` | number | `10000` | Max CSV/XLSX rows per upload |

## Scheduler

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `msbulkeditor_scheduler_enabled` | boolean | `No` in transport | History cleanup via Scheduler. With Scheduler installed, package install and update set `Yes` |
| `msbulkeditor_cleanup_task_stub` | textarea | JSON | Internal key: built-in cleanup without Scheduler. Not for manual edits |

Task **`msbulkeditor / operation_cleanup`** deletes operations older than `history_retention_days`.

With Scheduler at install or update, the package sets `msbulkeditor_scheduler_enabled = Yes` and disables the stub. The next package update turns the setting on again even if you switched it off. The task still needs cron: `php /path/to/assets/components/scheduler/run.php` (usually daily).

Without Scheduler the transport value stays `No`. Plugin `msbulkeditor_bootstrap` on `OnManagerPageInit` runs cleanup at most once a day while `msbulkeditor_cleanup_task_stub` has `enabled: true`.

## Permissions

Permissions are created on install. Assign them to the shop managers policy.

| Permission | Purpose |
| --- | --- |
| `msbulkeditor_view` | Grid, preview, history (read), read and save UI state |
| `msbulkeditor_edit` | Apply bulk operations |
| `msbulkeditor_rollback` | Roll back completed operations |
| `msbulkeditor_presets` | Create / update / delete presets |
| `msbulkeditor_import_export` | Import and export files |

The component page also opens with global **`view`** (read-only).

### API route → permission

| Group | Routes | Permission |
| --- | --- | --- |
| Read | `health/ping`, `products/list`, `products/preview`, `products/progress`, `history/list`, `history/items`, `presets/list`, `ui/state/get`, `ui/state/save`, `fields/catalog`, `filters/references`, `bindings/check` | `view` |
| Write | `products/apply`, `bindings/apply` | `edit` |
| Rollback | `products/rollback` | `rollback` |
| Presets | `presets/save`, `presets/delete` | `presets` |
| Files | `export/run`, `import/run`, `import/parse` | `import_export` |

**Presets** and **Import & export** tabs are hidden without the matching permission. A direct URL without permission redirects to **Products**.

## Production tips

- Catalog **> 5000** products: align `expert_limit` with RAM and PHP timeout. Lower `chunk_size` if a batch exceeds the time limit.
- **`enable_save_setting_user = Yes`**: each manager keeps their own columns. **`No`**: the server does not store the layout, the browser still keeps a copy in `localStorage`.
- **`expert_mode = No`**: explicit row selection only, lower risk of a mass mistake.

## Paths

| Path | Contents |
| --- | --- |
| `core/components/msbulkeditor/` | PHP, processors, lexicon |
| `assets/components/msbulkeditor/` | connector, JS/CSS bundle |

Connector: `assets/components/msbulkeditor/connector.php`.

After a package update, clear the MODX cache and hard-reload the panel page (Ctrl/Cmd + Shift + R).

## Related

- [MODX events](events): plugins on apply and export
- [FAQ](faq): permission and limit errors
