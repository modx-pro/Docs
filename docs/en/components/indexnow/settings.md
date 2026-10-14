---
title: System settings
description: "indexnow_* keys: endpoint, queue, batch, retry, and history"
---

# System settings

**IndexNow** area under **System → System settings**. Keys use underscores: `indexnow_*`. The IndexNow manager has no settings editor.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `indexnow_enabled` | Yes/No | Yes | Master switch. When No, resources are not enqueued. |
| `indexnow_endpoint` | text | `https://yandex.com/indexnow` | IndexNow API URL. Only `http` / `https`. Default is Yandex; see [their docs](https://yandex.com/support/webmaster/indexing-options/index-now.html). |
| `indexnow_queue_enabled` | Yes/No | Yes | Queue mode. |
| `indexnow_batch_size` | number | `100` | How many due URLs the worker claims per pass, then groups by `host`. Range 1–1000. Queue tick caps this at 25 URLs. |
| `indexnow_max_attempts` | number | `3` | Attempts on temporary errors, then status `failed`. |
| `indexnow_retry_delay` | number | `300` | Seconds before the next attempt. |
| `indexnow_history_retention_days` | number | `30` | Days to keep history. Old rows are purged during worker runs. |
| `indexnow_key` | text | generated | IndexNow key (8–128 chars: letters, digits, `-`). Do not paste it into public tickets or logs. |

The package reads optional keys `indexnow_core_path` and `indexnow_assets_url` via `getOption` with default paths. A clean install **does not** create them. They appear only when migrating old dotted keys (`indexnow.core_path`, `indexnow.assets_url`).

## Common tweaks

- Another IndexNow-compatible endpoint → `indexnow_endpoint`.
- Pause notifications → `indexnow_enabled = No`.
- Large site, many edits → `indexnow_batch_size` (max 1000).
- Frequent 429 → increase `indexnow_retry_delay`.

## Queue enabled vs disabled

Keep `indexnow_queue_enabled = Yes` in production. Scheduler and **Process queue** pick up due URLs when tick did not run.

| | `indexnow_queue_enabled = Yes` | `indexnow_queue_enabled = No` |
| --- | --- | --- |
| After enqueue | `kickQueue()` → queue tick on shutdown | Immediate `worker->run()` in the same request |
| Per-pass limit | Up to **25** URLs (tick); up to `indexnow_batch_size` (**Process queue**, Scheduler) | Full `indexnow_batch_size` |
| Client response | Does not wait for the endpoint | Waits for delivery to the endpoint |
