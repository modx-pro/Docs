---
title: Troubleshooting
---
# Troubleshooting

Common CrawlerDetect issues and how to fix them.

## Form is not blocked for bots

**Check:**

1. `crawlerDetectBlock` is in FormIt’s `&preHooks`.
2. The form is submitted through FormIt (not another handler).
3. For FetchIt — on the page FetchIt calls, FormIt is invoked with `crawlerDetectBlock` in preHooks.
4. For SendIt — the preset has `preHooks` with `crawlerDetectBlock`.

**Test:** submit the form with a bot User-Agent (e.g. `Googlebot`) via dev tools (change headers) or curl.

## isCrawler always returns 0

**Possible causes:**

1. **Caching** — use `[[!isCrawler]]` (uncached). With cache the result is the same for all visitors.
2. **Library not loaded** — check that `core/components/crawlerdetect/vendor/autoload.php` exists. On load error the snippet returns `0` (fail-open) and writes to the MODX log.

## Block message not showing

**Check:**

1. The form template outputs `[[+fi.validation_error_message]]` (MODX) or `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom).
2. The placeholder is not overwritten by other FormIt hooks.

## False positives (human blocked)

Rare, but possible with an unusual User-Agent. Options:

1. Temporarily disable `crawlerDetectBlock` or check logs.
2. Report the User-Agent in the [CrawlerDetect repository](https://github.com/Ibochkarev/CrawlerDetect); [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect) is updated regularly.

## Viewing logs

**Manage** → **System log**. With `crawlerdetect_log_blocked` enabled, blocked form submissions are logged.

---

## FAQ

### Do I need to run composer install on the server?

**No.** Dependencies are included. Install CrawlerDetect via Package Manager — that’s enough.

### How do I update JayBizzle/Crawler-Detect?

Update the CrawlerDetect package via Package Manager. New package versions ship an updated library. You don’t need to update the library on the server separately.

### Is CrawlerDetect compatible with CAPTCHA?

Yes. You can use CrawlerDetect with reCAPTCHA or other CAPTCHA: add both preHooks to FormIt.

- **MODX:** `&preHooks=`crawlerDetectBlock,recaptcha``
- **Fenom:** `'preHooks' => 'crawlerDetectBlock,recaptcha'`

CrawlerDetect runs first and filters bots before CAPTCHA.

### Does it work with AjaxForm?

AjaxForm is an alternative to FormIt. CrawlerDetect integrates with FormIt. If AjaxForm calls FormIt on the server, add `crawlerDetectBlock` to FormIt preHooks — protection will work.

### Does it work with SendIt?

Yes. SendIt uses FormIt; parameters are in presets. Add `'preHooks' => 'crawlerDetectBlock'` to the preset — when a bot is blocked SendIt returns an error and shows the message from CrawlerDetect settings. See [Integration → AJAX form (SendIt)](integration#ajax-form-sendit).

### Is MODX 2.x supported?

No. MODX Revolution 3.x only.

### Can I add my own User-Agent to the blacklist?

Not in the current version. Only the JayBizzle/Crawler-Detect library is used. Custom blacklist/whitelist is planned for future versions.
