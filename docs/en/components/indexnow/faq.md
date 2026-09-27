---
title: FAQ
description: Indexing, Scheduler, delete, endpoint, MODX 2/3 compatibility
---

# FAQ

## The page is not in search results

IndexNow only notifies the search engine. Timing and indexing are up to the search engine. Yandex: [IndexNow support](https://yandex.com/support/webmaster/indexing-options/index-now.html).

## Do I need Scheduler?

No. Basic background processing uses **queue tick** after a resource save or a manager page load (up to 25 due URLs on shutdown). Scheduler adds backup cron every minute when tick did not run or the site has little HTTP traffic. Without Scheduler and traffic, use **Process queue**.

## Does “Send URL” submit to Yandex immediately?

No. It only enqueues URLs with `update`. Delivery uses queue tick, Scheduler, or **Process queue** ([issue #2](https://github.com/Ibochkarev/IndexNow/issues/2)).

## What is sent when a page is deleted?

URL with action `delete`. Unpublishing also enqueues `delete`.

## Can I notify third-party sites?

No. Manual enqueue only accepts hosts from your contexts. Localhost and private IPs in the URL are rejected too.

## Default endpoint

`https://yandex.com/indexnow` ([Yandex docs](https://yandex.com/support/webmaster/indexing-options/index-now.html)). Set another IndexNow-compatible URL in `indexnow_endpoint`.

## IndexNow breaks resource save

It should not. If save fails, look at another plugin or validation. IndexNow log lines alone do not roll back the save.

## Where is delivery history?

**Extras → IndexNow → History**. Retention is controlled by `indexnow_history_retention_days`.

## Separate packages for MODX 2 and 3?

No. One transport package.
