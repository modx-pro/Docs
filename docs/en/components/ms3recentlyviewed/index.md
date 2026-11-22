---
title: ms3RecentlyViewed
description: '"Recently viewed products" block for MiniShop3 — browser or DB storage, similar products, manager'
categories: catalog
author: Ibochkarev
logo: https://modstore.pro/assets/extras/ms3recentlyviewed/logo.png
modstore: https://modstore.pro/packages/ecommerce/ms3recentlyviewed

compatibility:
  - modx3
  - php81
  - minishop3
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

"Recently viewed products" block for [MiniShop3](/en/components/minishop3/). The list lives in the browser (`localStorage` or cookie) or in the DB for logged-in users. It fills when a user opens a product page.

**Naming:** user-facing — **ms3RecentlyViewed**. In code (folders, snippets, lexicon) — **ms3recentlyviewed**.

## Features

- **Recently viewed block** — IDs via client **JS** (`render()`), server snippet with **`fromDB`**, or **`ids`** from placeholder / cookie. See [Quick start](/en/components/ms3recentlyviewed/quick-start).
- **Browser storage** — `localStorage` (default) or cookie, no registration
- **DB sync** — after login the list from the current browser store (`localStorage` or cookie) is sent to the DB. The tab then stores `sessionStorage` key `ms3rv_synced_user`
- **Monthly archiving** — `archive_enabled` (on by default): summary in `ms3recentlyviewed_monthly` without deleting `items` rows
- **Bot exclusion** — `block_bots` + `block_bots_detector` (`crawler_detect` — CrawlerDetect library, or `regex` as fallback)
- **Server output with cookie** — plugin **ms3recentlyviewedViewedIdsPlaceholder** (`OnWebPageInit`, priority **-5**). Always sets **`[[+viewedIds]]`**. The value comes from cookie `ms3_recently_viewed` when `storage_type` is `cookie`. Otherwise the placeholder is empty. In Fenom: `{$_modx->getPlaceholder('viewedIds')}`. The plugin does not create a Fenom variable.
- **"Similar to viewed" snippet** — products from the same categories (`ms3recentlyviewedSimilar`)
- **Manager** — dashboard (KPIs, top products), view history with filters, CSV export (BOM UTF-8, GET in connector-mgr for file download)
- **Localization** — MODX Lexicon (ru, en), frontend snippet `ms3rvLexiconScript`
- **Chunks and styles** — Fenom chunks, BEM classes (prefix `ms3rv`). Storefront cards use Bootstrap classes, not `--ms3rv-*` variables

## System requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.3+ |
| PHP | 8.1+ |

### Dependencies

- **[MiniShop3](/en/components/minishop3/) 1.0.0+** — products and categories
- **[pdoTools](/en/components/pdotools/) 3.0.0+** — snippets and `@FILE` chunks
- **[VueTools](/en/components/vuetools/) 1.2.0+** — manager page. The key is not in package `requires`. The check looks for Import Map keys `vue` and `vuetools/theme`. If they are missing, the modules are removed and the alert `ms3rv_vuetools_required` is shown

On upgrade, saved system setting values are kept. Snippets, plugins and chunks are overwritten.

::: tip msProducts and parents
In MODX 3 the msProducts snippet requires the `parents` parameter even when using `resources`. The add-on supplies it when calling msProducts for the viewed list.
:::

## Installation

### Via ModStore

1. [Connect ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **MiniShop3 1.0.0+**, **pdoTools 3.0.0+** and **VueTools 1.2.0+** for the manager are installed
4. Find **ms3RecentlyViewed**, click **Download**, then **Install**
5. **Manage → Clear cache**

### After installation

Load lexicon, CSS and JS. On the product page pass the ID and output the block. [Quick start](/en/components/ms3recentlyviewed/quick-start), [Frontend setup](/en/components/ms3recentlyviewed/frontend).

In the manager the menu item is **Recently Viewed** (parent Extras). The page heading is the same. The child item is **Settings**.

## Terms

| Term | Description |
|------|-------------|
| **Viewed** | List of product IDs the user has opened (in browser or DB) |
| **Sync** | Moving the list from the current browser store to the DB after login |
| **Similar to viewed** | Products from the same categories as viewed (snippet `ms3recentlyviewedSimilar`) |
