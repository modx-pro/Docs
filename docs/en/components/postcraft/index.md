---
title: PostCraft
description: Email campaigns from the MODX manager with a send window, tracking and unsubscribe pages
categories: notifications
author: denius-dev

compatibility:
  - modx2
  - modx3
  - php72
items: [
  { text: 'Quick start', link: 'quick-start' },
  {
    text: 'Manager page',
    items: [
      { text: 'Tabs overview', link: 'interface/' },
      { text: 'Campaign', link: 'interface/campaign' },
      { text: 'Templates', link: 'interface/templates' },
      { text: 'Unsubscribe page', link: 'interface/unsubscribe' },
      { text: 'Stats', link: 'interface/stats' },
    ],
  },
  { text: 'Several sites', link: 'multisite' },
  { text: 'Settings, cron and bounces', link: 'settings' },
  { text: 'Changelog', link: 'changelog' },
]
---
# PostCraft

PostCraft sends email campaigns right from the MODX manager. You build a letter from a chunk, paste addresses or take them from FormIt submissions, and pick a day and hours. Cron spreads the letters over that window, and the stats show opens, clicks, unsubscribes and bounces.

You need no external mailing service: letters go out through the server mail or your SMTP. Babel is not needed either, PostCraft takes unsubscribe page languages from MODX contexts.

## Features

- A letter template lives in a `PostCraft.*` chunk. HTML or visual editor (CKEditor, TinyMCE RTE), preview for phone, tablet and desktop.
- Recipients: a list of addresses, saved lists, unique emails from FormIt submissions. Duplicates are dropped, blacklisted addresses are always skipped.
- Send window: a date and hours from/to in the site time zone. Inside the window each address gets the letter at the hour it usually reads mail.
- Pause, resume, cancel and edit a scheduled campaign: subject, preheader, window, addresses, text.
- Preheader, Reply-To and sender mailbox per campaign. A mailbox works through PHP mail or SMTP.
- Option to skip addresses that already got this template.
- Open and click tracking. Bots, mail provider proxies and instant prefetch stay out of the stats.
- Unsubscribe page per site and language, your own form with an unsubscribe reason. `List-Unsubscribe` header for the Unsubscribe button in Gmail and other mail apps.
- Stats export to Excel without third-party libraries.
- Bounce processing over IMAP: a hard bounce goes to the blacklist.
- Several domains from one manager: letter links lead to the site whose domain the letter was sent from.

## Requirements

| | |
|---|---|
| MODX | 2.8 or 3.x |
| PHP | 7.2 or newer, extensions `pdo_mysql`, `mbstring`, `zip` (Excel export) |
| Cron | a task every minute |
| Bounces | `imap` extension, a separate mailbox |

One package for MODX 2.8 and MODX 3.
