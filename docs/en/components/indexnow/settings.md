---
title: System settings
description: "indexnow_* keys: endpoint, queue, batch, retry, and history"
---

# System settings

**IndexNow** area under **System → System settings**. Keys use underscores: `indexnow_*`. The IndexNow CMP has no settings editor.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `indexnow_enabled` | Yes/No | Yes | Master switch. When No, resources are not enqueued. |
| `indexnow_endpoint` | text | `https://yandex.com/indexnow` | IndexNow API URL. Only `http` / `https`. Default is Yandex; see [their docs](https://yandex.com/support/webmaster/indexing-options/index-now.html). |
| `indexnow_queue_enabled` | Yes/No | Yes | Queue mode. See below. |
| `indexnow_batch_size` | number | `100` | How many due URLs the worker claims per pass, then groups by `host`. Range 1–1000. Queue tick caps this at 25 URLs. |
| `indexnow_max_attempts` | number | `3` | Attempts on temporary errors, then status `failed`. |
| `indexnow_retry_delay` | number | `300` | Seconds before the next attempt. |
| `indexnow_history_retention_days` | number | `30` | Days to keep history. Old rows are purged during worker runs. |
| `indexnow_key` | text | generated | IndexNow key (8–128 chars: letters, digits, `-`). Do not paste it into public tickets or logs. |

The code reads optional keys `indexnow_core_path` and `indexnow_assets_url` via `getOption` with default paths. A clean install **does not** create them. They appear only when migrating old dotted keys (`indexnow.core_path`, `indexnow.assets_url`).

## Common tweaks

- Another IndexNow-compatible endpoint → `indexnow_endpoint`.
- Pause notifications → `indexnow_enabled = No`.
- Large site, many edits → `indexnow_batch_size` (max 1000).
- Frequent 429 → increase `indexnow_retry_delay`.

## Queue enabled vs disabled

**`indexnow_queue_enabled = Yes` (recommended in production).** URLs go to the queue table. After enqueue (resource save), a **queue tick** is scheduled in `register_shutdown_function`: up to 25 due URLs are sent in the same HTTP request after the client gets the response. Tick does not use the full `indexnow_batch_size`. Plus optional Scheduler and **Process queue**.

**`indexnow_queue_enabled = No`.** The worker runs **immediately** in the same request as the resource save, for the full `indexnow_batch_size` (blocking). Manager responses are slower and more sensitive to network latency to the endpoint.
