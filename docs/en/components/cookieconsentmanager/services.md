---
title: Services and categories
description: Provider adapters, multiple instances, custom JavaScript and Google Consent Mode.
---

# Services and categories

## Categories

Visitors grant permission to **categories**, not individual services. `necessary` is always enabled. Optional `analytics`, `marketing` and `external_content` categories may be shown or hidden independently.

Each provider can be assigned to any appropriate visible optional category. The suggested default category is not a fixed restriction.

## Built-in providers

| Purpose | Integrations |
| --- | --- |
| Analytics | Yandex Metrica, Top.Mail.Ru, Google Analytics 4 |
| Tags and ads | Google Tag Manager, Google Ads, VK Ads Pixel, Meta Pixel |
| Maps | Google Maps, Yandex Maps |
| Video | YouTube, RUTUBE, VK Video |
| Custom code | Custom JavaScript (`custom_js`) |

In Manager: **Services → Add service → select adapter → configure IDs → assign category → enable → Save**.

Additional instances can have their own keys, such as `youtube_help`. A visible category does not by itself enable its assigned services.

## Custom JavaScript

Upload a script, for example:

```text
/assets/js/integrations/company-widget.js
```

Use **Create custom service** to enter its name, purpose, category and URL. Both root-relative paths and supported HTTPS `.js` URLs with valid query parameters can be used.

In Strict mode the script starts after consent to its assigned category. Do not separately add the same script in a template. Custom JS files are loaded separately rather than bundled with built-in adapters.

::: warning
Custom JS has normal page-level JavaScript privileges. The site developer must verify its security, CSP permissions, external dependencies and behavior after consent is withdrawn.
:::

## Google Consent Mode v2 and GTM

CookieConsentManager supplies Google Consent Mode v2 signals based on stored category choices and the selected mode. **GTM does not automatically block every container tag**: configure consent checks for GA4, Google Ads and Custom HTML tags inside the container. Legacy does not fake a `granted` decision before the first user choice.

See [JavaScript API](api) for your own modules.
