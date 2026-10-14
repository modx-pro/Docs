---
title: Manager
description: Status, Queue, History tabs and manual URL enqueue
---

# Manager

Menu: **Extras → IndexNow**.

Above the tabs is `indexnow_intro_msg`. At the **bottom** of **Status**, `indexnow_disclaimer` warns that IndexNow does not guarantee indexing, only notification ([Yandex](https://yandex.com/support/webmaster/indexing-options/index-now.html)).

## Status

![Status tab](/components/indexnow/screenshots/indexnow-status.png)

- whether IndexNow is enabled
- endpoint
- key (masked in the UI)
- whether the key file was found
- Scheduler: installed, queue task present, interval
- **next run** (`next_run`), **overdue** flag, manual task run URL (`run_url`)
- counters: pending, processing, failed, sent today
- last send time

“Sent today” counts history rows with status `success` for the current day. The worker writes `success` / `failed` / `retry`.

Buttons:

- **Test connection**: key, file, endpoint reachability. The Scheduler task is also created when **Status** loads if Scheduler is installed and the task is missing.
- **Process queue**: one worker pass immediately, without waiting for tick
- **Refresh**: reload status

## Queue

![Queue tab](/components/indexnow/screenshots/indexnow-queue.png)

Rows in `pending` / `processing` / `failed` and retry statuses.

Columns: URL, context, action (`update` / `delete`), status, attempts, dates, error.

Row actions:

- **Retry**: sets the row to `pending`, zeros `attempts`, and clears `available_at` and `last_error`. The next worker pass starts a full attempt series.
- **Delete**: remove the row without sending

Filters: URL search, status. There is **no** action filter on this tab (only on **History**). The status filter includes `success`, but a successful row is deleted from the queue table, so that filter is empty.

## History

![History tab](/components/indexnow/screenshots/indexnow-history.png)

Delivery log: URL, HTTP code, status (`success` / `failed` / `retry`), time.

Old rows are removed per [`indexnow_history_retention_days`](/en/components/indexnow/settings) during worker runs.

## Send URL

![Send URL tab](/components/indexnow/screenshots/indexnow-send.png)

One absolute site URL per line.

Example:

```text
https://example.com/page-1
https://example.com/page-2
```

Rejected:

- hosts outside your MODX contexts (SSRF protection)
- `localhost`, `metadata.google.internal`, private/reserved IPs in the host (same rules as resource URLs)

Each accepted URL is enqueued with action **`update`**. You cannot enqueue **`delete`** manually.

**Send** enqueues the URLs and calls `kickQueue()`. With the queue on, a queue tick is scheduled in the same request (shutdown, up to 25 URLs). With the queue off, `worker->run()` runs immediately for the full `indexnow_batch_size`.
