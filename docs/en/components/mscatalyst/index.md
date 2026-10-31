---
title: msCatalyst
description: Faceted filter, search and catalog sync for miniShop2 and MiniShop3
categories: [catalog, import-export]
logo: https://modstore.pro/assets/extras/mscatalyst/logo.png
author: denius-dev

compatibility:
  - modx2
  - modx3
  - minishop2
  - minishop3
  - php72
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'Upgrading from msFacets', link: 'upgrade' },
  {
    text: 'Snippets',
    items: [
      { text: 'msCatalyst', link: 'snippets/mscatalyst' },
      { text: 'msCatalystSearch', link: 'snippets/mscatalystsearch' },
      { text: 'Service snippets', link: 'snippets/service' },
    ],
  },
  {
    text: 'Manager page',
    items: [
      { text: 'Tabs overview', link: 'interface/' },
      { text: 'Sync', link: 'interface/sync' },
      { text: 'Export', link: 'interface/export' },
    ],
  },
  { text: 'Multilingual', link: 'multilingual' },
  { text: 'Frontend', link: 'frontend' },
  { text: 'SEO', link: 'seo' },
  { text: 'System settings and cache', link: 'settings' },
  { text: 'MODX 3 and modifications', link: 'modx3' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
  { text: 'Changelog', link: 'changelog' },
]
---
# msCatalyst

msCatalyst renders a miniShop2 or MiniShop3 catalog as a faceted filter with search and keeps that catalog up to date. One snippet outputs the filter panel, counters, sorting, search, pagination and product cards. Sync loads and updates products from CSV and XLSX, any JSON or XML API, Google Sheets and 1C.

Without JavaScript the filter works as a plain GET form. With JavaScript the page updates over AJAX, and the browser URL changes along with the filters.

Demo: [`chelnysite.ru`](https://chelnysite.ru/), a catalog of 100,000 products on shared hosting. The English version of the same catalog runs on Localizator: [`chelnysite.ru/en/`](https://chelnysite.ru/en/). The component manager page is open without a manager login: [`chelnysite.ru/admin-demo`](https://chelnysite.ru/admin-demo).

## Features

- Facets by vendor, category, product fields, TVs, options and resource fields. Prices and options of msOptionsPrice2 and ms3Variants modifications.
- "From–to" ranges with a slider for price, weight and any numeric field.
- A counter next to every value. Picking a value in a group does not zero out the other values of that group.
- Search with word forms, transliteration, typos, field weights and synonyms. Modes: inside the catalog, a separate page, a dropdown.
- Every filter and page change goes into the browser history. The "Back" button returns to the previous results.
- Speed on 100,000 products: results and all counters are recalculated in 10–40 ms on the server.
- SEO: title, H1 and description with the selected filters arrive in the HTML on first load. Friendly filter URLs, a sitemap, a bridge to SeoFilter.
- Profile-based sync: source analysis, field and catalog matching, an approved schema, a change plan with safeguards, run rollback.
- Export of products, categories, vendors and options to CSV, XLSX, JSON and XML.
- Multilingual catalog with Localizator, localizator3 or Babel.
- A manager page without ExtJS: search test, synonyms, settings, index, filter sets, sync, export and translations.

## Requirements

- MODX 2.8 with miniShop2 or MODX 3 with MiniShop3. miniShop2 does not install on MODX 3. For MODX 3 its authors release MiniShop3.
- pdoTools.
- PHP 7.2 or newer. MODX 3.2 itself requires PHP 8.1.

Without a shop or pdoTools the installer stops and writes the reason to the error log.

Tested combinations:

- MODX 2.8.8, miniShop2 3.0.7 and 4.4.2, pdoTools 2.13.3, PHP 7.4;
- MODX 3.2.0, MiniShop3 1.14.1-beta2, pdoTools 3.0.3, PHP 8.4.

## Installation

1. Add the modstore.pro provider in "Extras → Installer" and install msCatalyst.
2. The installer creates the msCatalyst category: the snippets `msCatalyst`, `msCatalystSearch`, `msCatalystSitemap`, `msCatalystReindex`, `msCatalystSeoFilter`, `msCatalystSync`, `msCatalystDemoAdmin`, a plugin, eight chunks, system settings and the sync tables.
3. Call the snippet in the catalog template as described in [Quick start](quick-start).

License: one purchase per site.
