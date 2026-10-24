---
title: CookieConsentManager
description: Manage consent and control analytics, advertising scripts, maps, video, and custom JavaScript in MODX Revolution.
author: web86
categories: utilities
compatibility:
  - modx2
  - modx3
  - php81
outline: [2, 3]
items:
  - text: Quick start
    link: quick-start
  - text: Modes and settings
    link: settings
  - text: Services and categories
    link: services
  - text: Video, maps and iframes
    link: embeds
  - text: JavaScript API
    link: api
  - text: Adapters and builds
    link: adapters
  - text: Consent audit
    link: audit
  - text: Troubleshooting
    link: troubleshooting
  - text: Uninstall and reinstall
    link: uninstall
---

# CookieConsentManager

**CookieConsentManager** manages visitors' consent and the loading of integrated analytics, advertising pixels, scripts, videos and maps. Configuration, third-party integrations, controlled embeds, a JavaScript API and a consent audit log are available in MODX Manager. No external CMP subscription is required.

## Features

- **Strict** mode delays optional integrated services until the corresponding category is allowed. **Legacy** mode can load enabled services on a first visit without a stored choice.
- Three banner positions: bottom, bottom-right and bottom-left; compact layouts adapt to narrow screens.
- Localizable labels, optional heading, categories, services and placeholder messages; RU/EN included.
- Assign any service to a visible optional category, add instances, or register custom JavaScript.
- YouTube, RUTUBE and VK Video, Google Maps, Yandex Maps and trusted HTML inside inert `<template>` elements.
- Editable adapters, SHA256-aware upgrades and a single minified bundle built in Manager.
- JSONL consent records, filters and CSV export.

## Compatibility and releases

| Platform | Native transport package | Supported MODX |
| --- | --- | --- |
| MODX 2 | `cookieconsentmanager-1.0.8-pl5` | `>=2.8.4,<3.0.0` |
| MODX 3 | `cookieconsentmanager3-1.0.8-pl7` | `>=3.1.2,<3.3.0` |

Both require **PHP 8.1+**. Tested combinations include MODX 2.8.4/2.8.8 and MODX 3.1.2/3.2.4 on PHP 8.1/8.2. These are independent packages; automatic migration from unpublished `cookieconsent` or `cookieconsent3` packages is not provided. MODX 3 native testing used deprecated global aliases disabled; warmed pdoTools3/Fenom caches and live third-party playback were not part of the verified scope.

::: warning Legal requirements
Strict mode controls integrations registered with CookieConsentManager, not scripts inserted independently. Legacy mode can send third-party requests before consent. The component does not itself guarantee GDPR or other legal compliance.
:::

## Get started

Follow [Quick start](quick-start), [Modes and settings](settings) and [Services and categories](services). To add media, see [Video, maps and iframes](embeds). Developers can use the [JavaScript API](api) and [Adapters](adapters). Review the [audit](audit), [troubleshooting](troubleshooting) and [uninstall](uninstall) guides before going live.
