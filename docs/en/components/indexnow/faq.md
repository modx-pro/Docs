---
title: FAQ
description: Indexing, Scheduler, delete, endpoint, MODX 2/3 compatibility
---

# FAQ

## The page is not in search results

IndexNow only notifies the search engine. Timing and indexing are up to the search engine. Yandex: [IndexNow support](https://yandex.com/support/webmaster/indexing-options/index-now.html).

## Do I need Scheduler?

No. Scheduler only backs up tick on sites with little HTTP traffic.

| Method | When | Per-pass limit |
| --- | --- | --- |
| Queue tick | After enqueue: resource save, manager page load, **Send** (shutdown of the same request) | 25 due URLs |
| Scheduler | Minute cron when the package is installed | `indexnow_batch_size` |
| **Process queue** | Button on the **Status** tab | `indexnow_batch_size` |

Without Scheduler and traffic, click **Process queue**. Details: [Queue and delivery](/en/components/indexnow/queue).

## Does “Send URL” submit to Yandex immediately?

No immediate POST to Yandex from the form. URLs are enqueued with `update`. `kickQueue()` schedules a tick when the queue is on. When the queue is off, it runs the worker immediately.

## What is sent when a page is deleted?

URL with action `delete`. Unpublishing also enqueues `delete`.

## Can I notify third-party sites?

No. Manual enqueue only accepts hosts from your contexts. Localhost and private IPs in the URL are rejected too.

## What is the default endpoint?

`https://yandex.com/indexnow` ([Yandex docs](https://yandex.com/support/webmaster/indexing-options/index-now.html)). Set another IndexNow-compatible URL in [`indexnow_endpoint`](/en/components/indexnow/settings).

## Does IndexNow break resource save?

It should not. If save fails, look at another plugin or validation. IndexNow log lines alone do not roll back the save.

## Where is delivery history?

**Extras → IndexNow → History**. Retention is controlled by [`indexnow_history_retention_days`](/en/components/indexnow/settings).

## Separate packages for MODX 2 and 3?

No. One transport package.
