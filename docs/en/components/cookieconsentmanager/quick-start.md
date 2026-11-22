---
title: Quick start
description: Install CookieConsentManager, add the snippets, configure services and verify network requests.
---

# Quick start

## Installation

1. Back up your database, `core/`, `assets/`, templates and existing consent records.
2. In MODX Package Manager, install the correct native transport: `cookieconsentmanager-1.0.8-pl5` for MODX 2 or `cookieconsentmanager3-1.0.8-pl7` for MODX 3.
3. Open **Extras → CookieConsentManager** (the menu location can vary).
4. On **Services**, make the intended categories visible, enable individual integrations and enter real service IDs.
5. Review labels and translations on **Texts**, then **Save**.
6. For audit logging, choose a writable server directory that is not accessible over HTTP.

A fresh installation does not automatically enable optional third-party services.

## Recommended template integration

Place the uncached Assets snippet once in `<head>`:

```html
<head>
    [[!CookieConsentAssets]]
</head>
```

Place the Banner snippet once before the closing `</body>`:

```html
<body>
    <!-- Site content -->
    [[!CookieConsentBanner]]
</body>
```

Add a settings button anywhere on the site:

```html
<button type="button" data-cookie-settings-open>Cookie settings</button>
```

Keep the calls **uncached** (`[[!…]]`). For Fenom templates, use the form your setup parses reliably, such as `{'!CookieConsentAssets'|snippet}` and `{'!CookieConsentBanner'|snippet}`, after verifying pdoTools/Fenom configuration.

Alternatively use one uncached `[[!CookieConsent]]` instead of the Assets/Banner pair. **Do not mix the two approaches.**

## Move existing tracking scripts

Remove duplicate direct `<script>` tags or tag-manager integrations for services now controlled by CookieConsentManager. Scripts loaded independently cannot be blocked by the component.

## Test the setup

Open a private browsing session and inspect the **Network** tab:

1. In Strict mode, optional SDKs and iframes controlled by the component should not request third-party resources before permission.
2. Allow Analytics and confirm the expected service loads.
3. Reject optional categories, reload, and ensure denied services do not start.
4. Open settings again using `data-cookie-settings-open`.
5. Verify the server-side event in the [consent log](audit).

::: tip
Check actual browser network traffic, not just the banner appearance or cookie values.
:::

For removal and safe reinstall, see [Uninstall and reinstall](uninstall).
