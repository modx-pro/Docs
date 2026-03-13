---
title: ms3RecentlyViewed
description: '"Recently viewed products" block for MiniShop3 — browser or DB storage, similar products, manager'
logo: "https://modstore.pro/assets/extras/ms3recentlyviewed/logo.png"
author: ibochkarev

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'ms3recentlyviewed', link: 'snippets/ms3recentlyviewed' },
      { text: 'ms3recentlyviewedSimilar', link: 'snippets/ms3recentlyviewedSimilar' },
      { text: 'ms3rvLexiconScript', link: 'snippets/ms3rvLexiconScript' },
    ],
  },
  {
    text: 'Manager interface',
    link: 'interface',
    items: [
      { text: 'Dashboard', link: 'interface/dashboard' },
      { text: 'View history', link: 'interface/history' },
    ],
  },
  { text: 'Frontend setup', link: 'frontend' },
  { text: 'Permissions', link: 'permissions' },
]
---
# ms3RecentlyViewed

Component for [MiniShop3](/en/components/minishop3/): "Recently viewed products" block. The list is stored in the browser (localStorage or cookie) or in the DB for logged-in users, and is filled when users open product pages.

**Naming:** user-facing — **ms3RecentlyViewed**; in code (folders, snippets, lexicon) — **ms3recentlyviewed**.

## Features

- **Recently viewed block** — output by list of IDs (AJAX via connector or server-side snippet)
- **Browser storage** — localStorage (default) or cookie, no registration
- **DB sync** — for logged-in users: on login, data from localStorage is moved to the DB
- **Auto-sync on login** — anonymous views from localStorage are moved to the DB on first visit after login
- **Monthly archiving** — setting `archive_enabled` (on by default): aggregation into summary table, smaller main table
- **Bot exclusion** — setting `block_bots`: crawler views (Googlebot, Yandex, etc.) are not stored in the DB
- **"Similar to viewed" snippet** — products from the same categories (ms3recentlyviewedSimilar)
- **Manager** — dashboard (KPIs, top products), view history with filters, CSV export (BOM UTF-8, GET support in connector-mgr for file download)
- **Localization** — MODX Lexicon (ru, en), frontend snippet ms3rvLexiconScript
- **Customization** — Fenom chunks, BEM classes (prefix `ms3rv`), CSS variables

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/)** — products and categories
- **[pdoTools](/en/components/pdotools/) 3.0.0+** — for snippets and @FILE chunks

::: tip msProducts and parents
In MODX 3 the msProducts snippet requires the `parents` parameter even when using `resources`. The add-on automatically supplies it when calling msProducts for the viewed list.
:::

## Installation

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3** and **pdoTools** are installed
4. Find **ms3RecentlyViewed**, click **Download**, then **Install**
5. **Manage → Clear cache**

Package is available at [modstore.pro](https://modstore.pro/).

### After installation

Load lexicon, CSS and JS on the site, pass the product ID on the product page and output the "Recently viewed" block.

See: [Quick start](quick-start) and [Frontend setup](frontend).

In the manager: **Extras → ms3RecentlyViewed** — dashboard and view history.

## Terms

| Term | Description |
|------|-------------|
| **Viewed** | List of product IDs the user has opened (in browser or DB) |
| **Sync** | Moving the list from localStorage to the DB when the user logs in |
| **Similar to viewed** | Products from the same categories as viewed (snippet ms3recentlyviewedSimilar) |
