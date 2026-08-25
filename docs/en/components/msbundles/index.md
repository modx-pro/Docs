---
title: msBundles
description: Product bundles for miniShop3 with shared pricing, discounts, and cart sync
author: ibochkarev
dependencies:
  - miniShop3
  - VueTools
categories: minishop3
items:
  - text: Getting started
    items:
      - text: Quick start
        link: quick-start
      - text: System settings
        link: settings
  - text: Storefront
    items:
      - text: Frontend
        link: frontend
      - text: Snippets (overview)
        link: snippets/index
      - text: msBundles snippet
        link: snippets/msBundles
      - text: msBundles.initialize snippet
        link: snippets/msBundles.initialize
  - text: Interface
    items:
      - text: Manager overview
        link: interface/index
      - text: Flows
        link: interface/flows
  - text: For developers
    items:
      - text: Events
        link: events
  - text: FAQ
    link: faq
---

# msBundles

With msBundles you build product sets in [miniShop3](/components/minishop3/) and sell them as one offer. The shopper clicks one button. Every product in the set lands in the cart. Price and discount follow the rules you set in the manager. When the shopper changes quantity or removes the set, the lines move together.

Start here: [Quick start](quick-start).

![Bundle list in the manager](/components/msbundles/screenshots/overview.png)

## Features

### Manager

**Extras → msBundles** runs on Vue 3 and PrimeVue via [VueTools](/components/vuetools/). You search by name, filter active and inactive sets, and reorder rows by dragging.

In the editor you set the name, description, image, and composition. Duplicate a ready set in one click, check the “As on storefront” preview, and save with a stock check. Access needs `msbundles_view` and `msbundles_save`.

Screens and walkthroughs: [Interface](interface/), [Flows](interface/flows).

### Pricing and composition

Each composition line has its own price mode:

| Mode | What happens |
| --- | --- |
| Original | Product price from miniShop3 |
| Fixed | You set the unit price |
| Discount % | Percent off the product price |
| Discount amount | Amount subtracted from the product price |
| Free | The line costs 0 |

A line can be required or optional. The editor footer shows the bundle total and savings vs regular prices. The bundle card appears on pages for every product in the set, not only a “main” one.

### Stock

How the storefront reacts when a required line is short is controlled by `msbundles_stock_behavior`:

| Value | What the shopper sees |
| --- | --- |
| `block` | Card stays, Add button disabled |
| `message` | Card stays, text from `stock_message` |
| `hide` | No card |

An optional line with zero stock does not block the whole set. On add that line is skipped. How many bundles you can take at once is limited by `msbundles_max_bundle_quantity`. Keys and permissions: [System settings](settings).

### Storefront

Call the `msBundles` snippet on the product page. Put `msBundles.initialize` in `<head>`. The shopper changes the bundle count with “−” / “+” or the quantity field. The price recalculates without a full page reload.

You can replace the stock Fenom chunks. Custom templates need data attributes (`data-msbundles`, `data-ms-bundle`, `data-msbundles-action`), not specific CSS class names. Match your theme with `--msbundles-*` variables.

Code and placeholders: [Frontend](frontend), [Snippets](snippets/).

![Storefront card](/components/msbundles/screenshots/storefront-travel.png)

### Cart

A bundle sits in the cart as several miniShop3 rows linked by a shared `bundle_hash`.

The main row shows a “Bundle” badge, a quantity field, and “Remove bundle”. Other rows show “Part of bundle…”, quantity locked, per-item × hidden. Change quantity on the main row. The rest follow. Remove any row of the set. The whole set leaves.

For the on-page cart block to refresh after add, `msCart` needs `selector`. Call `tplMsBundlesCartInfo` in the cart chunk.

### For developers

Storefront REST routes: `calculate`, `add`, `remove`, `get` via the miniShop3 router. Custom price, stock, and CRUD rules use `msOnBundle*` events. Plugin examples: [Events](events).

## Requirements

| Component | Why |
| --- | --- |
| MODX Revolution 3 | Core |
| miniShop3 | Cart and API |
| VueTools ≥ 1.1.2-pl | Manager UI |
| pdoTools | Fenom storefront chunks |
| PHP 8.2+ | Server |

After install, give the manager role `msbundles_view` (section and list) and `msbundles_save` (create, edit, delete).

## Where to go next

| Task | Page |
| --- | --- |
| Install and build the first bundle | [Quick start](quick-start) |
| Configure stock and qty limit | [System settings](settings) |
| Wire the card and cart into a template | [Frontend](frontend) |
| `msBundles` parameters | [msBundles](snippets/msBundles) |
| Load CSS/JS | [msBundles.initialize](snippets/msBundles.initialize) |
| Manager screens | [Interface](interface/) |
| Walkthroughs A–E | [Flows](interface/flows) |
| Write a plugin on events | [Events](events) |
| Fix a common issue | [FAQ](faq) |
