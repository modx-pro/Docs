---
title: Troubleshooting
---
# Troubleshooting

Common MobileDetect issues and fixes.

## Content does not change between desktop and mobile

**Check:**

1. Plugin **MobileDetect** is enabled, `md_disable_plugin = No`
2. For HTML tags — markup `<standard>`, `<mobile>` is in **page output** (after MODX parsing), event `OnWebPagePrerender` fires
3. For Fenom — **pdoTools** is installed, template is parsed via Fenom (`pdoToolsOnFenomInit`)
4. Cookie with old mode: open `?browser=detect` or clear the `browser` cookie

## Fenom blocks are always empty

**Possible causes:**

1. **No pdoTools** — blocks `{mobile}`, `{desktop}` register only on `pdoToolsOnFenomInit`
2. **Plugin disabled** — `md_disable_plugin = Yes`
3. **Static Fenom cache** — ensure pdoTools parses the template per request or device type is part of the cache key
4. **Wrong block** — `{mobile}` does not show on desktop; `{desktop}` does not show on phone

## Desktop site in mobile browser

Chrome and Safari may send a desktop User-Agent. MobileDetect reads UA and headers: the result will be `standard`.

Fix: forced mode `?browser=mobile` or `tplMobileDetectSwitch` switcher.

## Mode cookie is not saved

Cookie is not written:

- in CLI (cron, console scripts);
- after response headers are sent (`headers_sent()`);
- when `md_use_cookie = No`.

Check MODX cookie settings: `session_cookie_path`, `session_cookie_domain`, `session_cookie_secure`.

## Snippet always returns the same value

1. Call **uncached**: `[[!MobileDetect]]`, not `[[MobileDetect]]`
2. Parameter `&input` must match current type: `standard`, `tablet`, `mobile`
3. Cookie may have locked another mode — reset via `?browser=detect`

## HTML tags: snippet inside block still runs

Expected behavior. The plugin filters HTML **after** MODX parsing. Snippets in hidden blocks have already executed.

Use Fenom modifier `{if 'mobile' | mobiledetect}` or Fenom blocks.

## Upgrade from 2.0.x to 2.1.0-pl

| Change | Action |
| --- | --- |
| PHP 8.2+ | Upgrade PHP on hosting |
| Detector class | `Detection\MobileDetect` instead of `\Mobile_Detect` |
| Service API | `resolveDevice()`, `getDeviceType()`, `isMobile()`, `isTablet()`, `isDesktop()` |
| Fenom | Fixed blocks and memory leak on repeated registration |

Update custom code using `$md->getDetector()` for [mobiledetectlib 4.x](https://github.com/serbanghita/Mobile-Detect).

## modstore version vs documentation

[modstore.pro](https://modstore.pro/packages/utilities/mobiledetect) may list **2.0.2-pl** while docs describe **2.1.0-pl** from [GitHub](https://github.com/modx-pro/MobileDetect). Features in 2.1.0 (Fenom modifier, `tplMobileDetectSwitch`, PHP API) are available after installing the current transport.

## FAQ

### Do I need composer install on the server?

**No.** `vendor/` is bundled in the transport package.

### Does it work with MODX 2.8?

Yes. Transport targets MODX 2.8+ and 3.x.

### Do I need a separate `mobile` context?

No. MobileDetect filters content on the page without redirect or a second context.

### Can I disable HTML tags but keep Fenom?

There is no separate toggle. With `md_disable_plugin = Yes` the whole plugin stops. Simply do not use HTML tags in markup.

## Related

- [Quick start](quick-start)
- [Integration](integration)
- [System settings](settings)
