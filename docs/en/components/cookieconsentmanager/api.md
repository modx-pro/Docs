---
title: JavaScript API
description: getConsent, openSettings, onAllowed, stillAllowed and mountEmbeds.
---

# JavaScript API

The global object is available on pages where CookieConsentManager assets and banner have been initialized:

```javascript
const cmp = window.web86CookieConsent;
```

## Public methods

| Method | Purpose |
| --- | --- |
| `getConsent()` | Copy of the saved visitor decision, or `null` |
| `openSettings()` | Open the settings dialog |
| `onAllowed(category, callback, options?)` | Run a callback when currently permitted |
| `mountEmbeds(root?)` | Mount controlled embeds within a DOM root |

`getConsent()` represents a **stored visitor decision**. In Legacy mode, loading services before the first choice does not mean `getConsent().categories.analytics === true`.

## Open settings

Use the built-in HTML attribute:

```html
<button type="button" data-cookie-settings-open>Cookie settings</button>
```

Or open settings programmatically after initialization:

```javascript
window.web86CookieConsent?.openSettings();
```

## Run a module after permission

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const cmp = window.web86CookieConsent;
  if (!cmp?.onAllowed) return;

  cmp.onAllowed('external_content', async (stillAllowed) => {
    if (!stillAllowed()) return;

    const module = await import('/assets/js/company-map.js');
    if (!stillAllowed()) return;

    await module.init(stillAllowed);
  });
});
```

The module must not initiate third-party requests just because it is imported. Recheck `stillAllowed()` after each `await` and before requests.

## Check a specific service

When a `yandex_maps` instance belongs to `external_content`:

```javascript
const unsubscribe = window.web86CookieConsent.onAllowed(
  'external_content',
  (stillAllowed) => {
    if (!stillAllowed()) return;
    // Perform an allowed action.
  },
  { service: 'yandex_maps' }
);

// Cancel if no longer needed:
unsubscribe();
```

The service option checks the enabled instance and assigned category; it does not add service-level consent. A callback runs **at most once per registration**. A request already sent cannot be recalled.

## Common mistakes

Do not cache the value of `getConsent()?.categories.analytics` as permanent permission. It can become stale after withdrawal. Use `stillAllowed()` for asynchronous work.

Do not call private internals or treat the existence of an SDK script tag as proof of stored consent.
