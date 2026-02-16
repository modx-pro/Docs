---
title: Localizator
description: Language versions and satellites without contexts — auto-translation of resource fields and lexicons, SEO
author: modx-pro
modstore: https://modstore.pro/packages/utilities/localizator
repository: https://github.com/modx-pro/localizator

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Snippet Localizator', link: 'snippet-localizator' },
  { text: 'Language switching', link: 'switch-languages' },
  { text: 'Events', link: 'events' },
  { text: 'Sitemap formation', link: 'sitemap-formation' },
  { text: 'Import in localization', link: 'import-in-localization' },
  { text: 'seoTemplates', link: 'seotemplates' },
  { text: 'hreflang attribute', link: 'hreflang-attribute' },
]
---
# Localizator

Component for creating language versions and satellites without contexts: automatic translation of resource fields (including TVs and SEO), auto-translation of lexicons. Works via “localization” pseudo-contexts (e.g. site.com/ and site.com/en/).

## Features

- **Language versions without contexts** — localization pseudo-contexts, one site with multiple languages
- **“Localizator” tab on resources** — standard fields, SEO and TVs; button to translate into other languages
- **Auto-translation** — Yandex, Google, DeepL or copy without translation
- **pdoTools integration** — output localized resources via pdoResources, pdoMenu, etc. (via system setting `pdoFetch.class`)
- **mFilter2** — handler for localization-aware filtering
- **Events** — hooks on save/remove of localizations and languages, tab building

## System requirements

| Requirement | Description |
|-------------|-------------|
| MODX Revolution | 2.x / 3.x |
| PHP | 7.4+ |
| pdoTools | installed |
| MIGX | installed |
| Friendly URLs | enabled |

## Dependencies

- **[pdoTools](/en/components/pdotools/)** — for fetching and outputting resources (pdoResources, pdoMenu, etc.)
- **MIGX** — for working with multi-fields in localizations

## Installation

### Via ModStore

1. [Connect the ModStore repository](https://modstore.pro/info/connection)
2. Go to **Extras → Installer** and click **Download Extras**
3. Ensure **pdoTools** and **MIGX** are installed
4. Find **Localizator** in the list and click **Download**, then **Install**
5. **Manage → Clear cache**

The package is available in the [modstore.pro](https://modstore.pro/) catalog.

### After installation

Set `pdoFetch.class` so pdoTools snippets work with localizations, create languages in the Manager, and fill the “Localizator” tab on resources.

See: [Quick start](quick-start) and [System settings](settings).
