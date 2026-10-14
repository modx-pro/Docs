---
title: IndexNow
description: URL queue and search-engine notifications via the IndexNow protocol
categories: utilities
author: Ibochkarev
logo: https://modstore.pro/assets/extras/indexnow/logo.png
modstore: https://modstore.pro/packages/utilities/indexnow
compatibility:
  - modx2
  - modx3
  - php72
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Key and key file', link: 'key' },
  { text: 'Manager', link: 'manager' },
  { text: 'Queue and delivery', link: 'queue' },
  { text: 'Contexts and domains', link: 'contexts' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
  { text: 'FAQ', link: 'faq' },
]
---

# IndexNow

IndexNow queues MODX page URLs and notifies search engines using the [IndexNow](https://www.indexnow.org/) protocol. The default endpoint is Yandex: `https://yandex.com/indexnow`. Yandex docs: [IndexNow support](https://yandex.com/support/webmaster/indexing-options/index-now.html).

One transport package works on MODX Revolution **2.x and 3.x**.

IndexNow **does not index** pages. It only tells the search engine that a URL changed. Whether it appears in results is up to the search engine.

## How it works

1. You save, publish, unpublish, or delete a resource.
2. The plugin enqueues the URL (or updates an existing row).
3. After the HTTP response, a **queue tick** runs: up to 25 due URLs in one shutdown. See [Queue and delivery](queue). You can also use [Scheduler](/en/components/scheduler/) on a cron schedule or **Process queue** in the manager.
4. Results are written to history.

IndexNow errors do not block resource saves: plugin handlers run inside try/catch.

## Features

- queue on create, update, unpublish, and delete
- key and `{key}.txt` in the site web root
- batches per host, retries on temporary errors
- delivery history
- manual URL enqueue (`update` only)
- background processing: queue tick, optional Scheduler, manager button

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 2.8+ or 3.x |
| PHP | 7.2+ |
| curl | recommended |
| [Scheduler](/en/components/scheduler/) | optional backup cron for the queue |

The manager UI uses ExtJS. Composer is not required on the server.

## Installation

Package Manager needs the modstore.pro provider (service URL `https://modstore.pro/extras/`). Without it, install fails with `[encryptedVehicle] package provider not found` (or a similar provider message). Setup: [ModStore connection guide](https://modstore.pro/info/connection).

1. [Add the ModStore repository](https://modstore.pro/info/connection) if it is not there yet.
2. **Extras → Installer** (MODX 3: **Packages**) → find **IndexNow** → **Download** → **Install**.
3. Open **Extras → IndexNow** and check the **Status** tab.

Install registers the package in the `extension_packages` system setting. Next: [Quick start](quick-start).
