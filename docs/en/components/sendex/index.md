---
title: Sendex
description: Email newsletters in MODX — subscribers, send queue, and a front-end subscribe form
logo: https://modstore.pro/assets/extras/sendex/logo-lg.jpg
author: modx-pro
modstore: https://modstore.pro/packages/alerts-mailing/sendex
repository: https://github.com/modx-pro/Sendex
categories: utilities

items: [
  { text: 'Quick start', link: 'quick-start' },
  {
    text: 'Snippets',
    items: [
      { text: 'Sendex', link: 'snippets/sendex' },
    ],
  },
  {
    text: 'Interface',
    items: [
      { text: 'Subscriptions', link: 'interface/subscriptions' },
      { text: 'Email queue', link: 'interface/queue' },
    ],
  },
  { text: 'System settings', link: 'settings' },
  { text: 'Events', link: 'integration/events' },
  { text: 'PHP API', link: 'integration/api' },
  { text: 'FAQ', link: 'faq' },
]
---
# Sendex

Email newsletter component for MODX Revolution: newsletters and subscribers in the manager, a send queue, and a subscribe form on the site via the `Sendex` snippet.

## Features

- **Newsletters in the manager** — letter template, subject, sender, subscribers
- **Site subscription** — logged-in users subscribe in one click; guests confirm by email
- **Group subscribe** — add active, unblocked MODX users from a user group
- **Send queue** — build, send manually, or flush via cron
- **Subscriber export** — CSV from the manager
- **Guest → user merge** — when a MODX account is created or activated with the same email

## Requirements

| Requirement | Description |
| --- | --- |
| MODX Revolution | 2.8+ or 3.x |
| PHP | 7.4–8.4 |
| ExtJS | MODX manager (MODX 3 — namespace + action) |

Verified on MODX **3.2.0-pl**. xPDO models are global `sx*` classes (not namespaced).

## Installation

### Via ModStore

1. [Connect the ModStore repository](https://modstore.pro/info/connection)
2. Open **Extras → Installer** and click **Download Extras**
3. Find **Sendex**, click **Download**, then **Install**
4. **Manage → Clear cache**

Package page: [modstore.pro](https://modstore.pro/packages/alerts-mailing/sendex).

On install and upgrade the `migrations` resolver runs Phinx schema migrations. Tables are **not removed** on package uninstall.

### After install

Open **Components → Sendex**. Create a newsletter, place `[[!Sendex]]` on a page, and set up cron for the queue.

See [Quick start](quick-start) and [System settings](settings).

## Quick links

| Section | Description |
| --- | --- |
| [Quick start](quick-start) | First newsletter and subscription test |
| [Sendex snippet](snippets/sendex) | Parameters, chunks, AJAX |
| [Subscriptions](interface/subscriptions) | Newsletters and subscribers in the manager |
| [Email queue](interface/queue) | Sending and cron |
| [System settings](settings) | `sendex_*` keys |
| [Events](integration/events) | `sxOn*` hooks |
| [PHP API](integration/api) | Subscribe and queue from code |
| [FAQ](faq) | Common issues |

## History

The component was originally written as a MODX development demo on bezumkin.ru. The current version is maintained in [modx-pro/Sendex](https://github.com/modx-pro/Sendex).
