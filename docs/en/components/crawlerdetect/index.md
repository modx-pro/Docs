---
title: CrawlerDetect
description: Detect web crawlers by User-Agent and protect forms from spam without CAPTCHA
author: ibochkarev
repository: https://github.com/Ibochkarev/CrawlerDetect
logo: https://modstore.pro/assets/extras/crawlerdetect/logo.png
modstore: https://modstore.pro/packages/utilities/crawlerdetect

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'isCrawler', link: 'snippets/isCrawler' },
      { text: 'crawlerDetectBlock', link: 'snippets/crawlerDetectBlock' },
    ],
  },
  { text: 'Integration', link: 'integration' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# CrawlerDetect

MODX extra that detects web crawlers (bots) by the User-Agent header and protects forms from spam without CAPTCHA. Uses [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect).

## Features

- **Form protection** — block bot form submissions via FormIt preHook
- **Hide widgets from bots** — don’t load chat, analytics or heavy scripts for bots
- **Accurate visitor counts** — exclude bots from “online” and “views” counters

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.x |
| PHP | 8.2+ |

## Dependencies

- **FormIt** — for form protection (preHook `crawlerDetectBlock`)
- **FetchIt** — optional, for AJAX forms
- **SendIt** — optional, for AJAX forms

## Installation

Install via MODX **Package Manager**:

1. **Manage** → **Install packages**
2. Find **CrawlerDetect** in the repository
3. Click **Install**

Dependencies (JayBizzle/Crawler-Detect) are included. You do **not** need to run `composer install` on the server.

After install, **Elements → Snippets** will have: `isCrawler`, `crawlerDetectBlock`.

## Next steps

See [Quick start](quick-start) and [Integration](integration).
