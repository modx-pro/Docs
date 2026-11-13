---
title: Localizator3
description: 'Language versions without contexts for MODX 3: resource fields, TVs, SEO, MiniShop3 products'
categories: utilities
logo: 'https://modstore.pro/assets/extras/localizator3/logo.png'
author: modx-pro
modstore: 'https://modstore.pro/packages/utilities/localizator3'
repository: 'https://github.com/modx-pro/localizator3'
dependencies:
  - pdoTools
  - VueTools
compatibility:
  - modx3
  - php82
  - vue3
items:
  - text: Quick start
    link: quick-start
  - text: System settings
    link: settings
  - text: getLocalizedResources snippet
    link: snippet-localizator
  - text: Language switching
    link: switch-languages
  - text: Events
    link: events
  - text: Sitemap
    link: sitemap-formation
  - text: hreflang attribute
    link: hreflang-attribute
---

# Localizator3

Multilingual sites for MODX Revolution 3 without separate contexts. For MODX 2.x use [Localizator](/components/localizator/).

## Features

- Languages in the **Localizator3** menu (page title «Localizations»)
- **Localization** tab on resources and MiniShop3 products
- Auto-translation: Yandex, Google, DeepL, LibreTranslate, MyMemory, or copy without translation
- Selection via `getLocalizedResources` on top of pdoResources, pdoMenu, msProducts, and ms3Products
- Fenom modifiers `locfield`, `locoptioncaption`, `locproductoptionvalue`
- SEO: `getLocalizedCanonical`, `getLocalizedSitemap`
- Indexing of localized fields in mSearch
- `OnBuildLocalizationTabs` event for custom form fields

## System requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| VueTools | 1.1.2-pl+ |
| pdoTools | 2.11.3-pl or newer |
| Friendly URLs | enabled |

Optional: MiniShop3, mSearch.

Hard transport requirements: PHP and MODX only.

- If VueTools is missing, the resolver tries to download the first `vuetools` package from the provider. It does not upgrade an already installed VueTools below 1.1.2-pl.
- The resolver downloads the first `pdoTools` package if none is installed or the installed version is older than 2.11.3-pl.
- A failed VueTools or pdoTools download does not roll back the Localizator3 install.

The tab and the Localizations page show a warning if the `vuetools` service is down or the built `languages.min.js` / tab bundle is missing. Without pdoTools, `getLocalizedResources` cannot find `pdoResources`.

## Dependencies

- [pdoTools](/components/pdotools/): resource selection and output
- [VueTools](/components/vuetools/): Vue UI for the tab and the Localizations page

## Installation

### Via ModStore

1. [Connect the modstore.pro provider](https://modstore.pro/info/connection).
2. Install **VueTools** 1.1.2-pl+ if it is not installed yet.
3. Find **Localizator3** under **Package Management**, download and install.
4. Clear the MODX cache.

Package: [modstore.pro/packages/utilities/localizator3](https://modstore.pro/packages/utilities/localizator3).

### After install

1. Create languages in the **Localizator3** menu (Localizations page).
2. Set `localizator3_default_language`. An empty value falls back to the first active language by rank for the site, manager auto-translation, and the `translate_resources.php` CLI. Without the setting and without an active language, auto-translation and CLI stop with an error.
3. Enable required TVs with the «TV available in localizations» flag.
4. Fill the **Localization** tab on resources.
5. Output lists with `getLocalizedResources`.

The resolver sets `pdotools_fetch_class` = `ModxPro\PdoTools\FetchLocalizator` (extends `Fetch`). The class is loaded by the Localizator3 namespace bootstrap via Composer PSR-4, so `getLocalizedResources` and pdoTools snippets return localized fields.

[Quick start](quick-start) and [System settings](settings).
