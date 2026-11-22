---
title: LLMS Forge
description: llms.txt generator and Markdown page cards for MODX 3
categories: utilities
author: Mishiko23
repository: https://github.com/Mishiko23/LLMSForge
logo: /components/llmsforge/logo.png
compatibility:
  - modx3
  - php81
items:
  - text: Quick start
    link: quick-start
  - text: Page cards and miniShop3
    link: cards
  - text: Settings and access
    link: settings
  - text: Troubleshooting
    link: troubleshooting
---

# LLMS Forge

![Website pages organized into a document for AI search](/components/llmsforge/overview.png)

LLMS Forge publishes `/llms.txt` and individual Markdown page cards from the MODX 3 manager. Build the main document from selected resources or edit it manually. Automatic miniShop3 product cards can include price, article number, and other selected fields.

The extra is free and licensed under [GPL-3.0](https://github.com/Mishiko23/LLMSForge/blob/main/COPYING). Source code: [Mishiko23/LLMSForge](https://github.com/Mishiko23/LLMSForge).

## Features

- Select up to 5000 pages, search resources, and group links into sections.
- Create up to 200 individual cards at `/llms-txt/slug`, manually or from MODX resources, including bulk creation.
- Add selected TVs and miniShop3 fields to automatic cards: `price`, `old_price`, `article`, `weight`, `vendor`, and `made_in`.
- Preview and download documents and configure each MODX context separately.
- Check the installation and inspect the last 30 days of known AI-bot requests.

MODX serves the URLs dynamically; no physical `llms.txt` file is written to the site root. Publishing a document does not guarantee that an AI system will read, index, or cite it.

Start with the [installation guide](quick-start.md). For products, read [page cards and miniShop3](cards.md).
