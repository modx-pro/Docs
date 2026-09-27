---
title: Manager
description: Status, Queue, History tabs and manual URL enqueue
---

# Manager

Menu: **Extras → IndexNow**.

The **Status** tab starts with a short intro (`indexnow_intro_msg`). At the **bottom** of the same tab, `indexnow_disclaimer` warns that IndexNow does not guarantee indexing, only notification ([Yandex](https://yandex.com/support/webmaster/indexing-options/index-now.html)).

## Status

![Status tab](/components/indexnow/screenshots/indexnow-status.png)

Summary:

- whether IndexNow is enabled
- endpoint
- key (masked in the UI)
- whether the key file was found
- Scheduler installed, queue task present, interval, **next run** (`next_run`), **overdue** flag, manual task run URL (`run_url`)
- counters: pending, processing, failed, sent today
- last send time

“Sent today” counts history with status `success`. The DB query also lists `accepted`, but the worker only writes `success` / `failed` / `retry`. The `accepted` value in the **History** filter is a UI leftover, not a real delivery status ([issue #3](https://github.com/Ibochkarev/IndexNow/issues/3)).

Buttons:

- **Test connection**: key, file, endpoint reachability (creates the Scheduler task if needed)
- **Process queue**: one worker pass immediately, without waiting for tick
- **Refresh**: reload status

## Queue

![Queue tab](/components/indexnow/screenshots/indexnow-queue.png)

Rows in `pending` / `processing` / `failed` (and the retry flow).

Columns: URL, context, action (`update` / `delete`), status, attempts, dates, error.

Row actions:

- **Retry**: sets `failed` back to `pending`, resets `available_at` and `last_error`. It does **not** reset **`attempts`** ([issue #1](https://github.com/Ibochkarev/IndexNow/issues/1)): after several failures, another temporary error may fail again immediately.
- **Delete**: remove the row without sending

Filters: URL search, status. There is **no** action filter on this tab (only on **History**).

## History

![History tab](/components/indexnow/screenshots/indexnow-history.png)

Delivery log: URL, HTTP code, status (`success` / `failed` / `retry`), time.

Old rows are removed per `indexnow_history_retention_days` during worker runs.

## Send URL

![Send URL tab](/components/indexnow/screenshots/indexnow-send.png)

One absolute site URL per line.

Example:

```text
https://example.com/page-1
https://example.com/page-2
```

Rejected:

- hosts outside your MODX contexts (SSRF protection);
- `localhost`, `metadata.google.internal`, private/reserved IPs in the host (same rules as resource URLs).

Each accepted URL is enqueued with action **`update`**. You cannot enqueue **`delete`** manually.

**Send** only enqueues. It does **not** call the worker or queue tick ([issue #2](https://github.com/Ibochkarev/IndexNow/issues/2)). Delivery happens on the next queue tick, Scheduler run, or **Process queue**.
