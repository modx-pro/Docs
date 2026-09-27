---
title: CrawlerDetect
description: Detect bots from request headers and protect forms from spam without CAPTCHA
categories: other
author: Ibochkarev
logo: https://modstore.pro/assets/extras/crawlerdetect/logo.png
modstore: https://modstore.pro/packages/other/crawlerdetect
repository: https://github.com/Ibochkarev/CrawlerDetect

compatibility:
  - modx3
  - php82
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

Detects bots from request headers (User-Agent and the rest of the JayBizzle set) and blocks FormIt submits without CAPTCHA. Library: [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect).

## Features

- **Form protection:** FormIt preHook blocks bot submits
- **Hide widgets:** do not load chat, analytics, or heavy scripts for bots
- **Visitor counts:** exclude bots from “online” and “views” counters

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.x |
| PHP | 8.2+ |

## Dependencies

- **FormIt:** form protection (preHook `crawlerDetectBlock`)
- **FetchIt:** not required, for AJAX forms
- **SendIt:** not required, for AJAX forms

## Installation

1. **Manage** → **Install packages**
2. Find **CrawlerDetect** in the repository
3. Click **Install**

JayBizzle is already in the package (`vendor/autoload.php`). You do not need `composer install` on the server.

On install and upgrade the package sends anonymous telemetry to `https://metrics.modx.pro/` (no site domain).

After install, **Elements → Snippets** will have `isCrawler` and `crawlerDetectBlock`.

Next: [Quick start](quick-start), [Integration](integration).
