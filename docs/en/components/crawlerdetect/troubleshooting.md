---
title: Troubleshooting
---
# Troubleshooting

## Form is not blocked for bots

**Check:**

1. `crawlerDetectBlock` is in FormIt’s `&preHooks`.
2. The form is submitted through FormIt, not another handler.
3. For FetchIt: on the page FetchIt calls, FormIt has `crawlerDetectBlock` in preHooks.
4. For SendIt: the preset has `preHooks` with `crawlerDetectBlock`.

**Test:** submit the form with a bot User-Agent (e.g. `Googlebot`) via dev tools or curl.

## isCrawler always returns 0

**Causes:**

1. **Caching.** Use `[[!isCrawler]]` uncached. With cache the result is the same for all visitors.
2. **Missing `vendor/autoload.php`.** The service is created, `isCrawler()` reports “not a bot”, nothing is written to the log.
3. **Exception from `services->get`.** ERROR in the log, `isCrawler` returns `0`. The `crawlerDetectBlock` preHook **allows** the submit in that case.

## Block message not showing

**Check:**

1. The form template outputs `[[+fi.validation_error_message]]` (MODX) or `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom).
2. Other FormIt hooks do not overwrite this placeholder.

## False positives (human blocked)

Rare, but possible with an unusual User-Agent.

1. Temporarily disable `crawlerDetectBlock` or check logs.
2. Report the User-Agent in the [CrawlerDetect repository](https://github.com/Ibochkarev/CrawlerDetect). [JayBizzle/Crawler-Detect](https://github.com/JayBizzle/Crawler-Detect) is updated regularly.

## Viewing logs

**Manage** → **System log**. With `crawlerdetect_log_blocked` enabled, blocked form submissions are logged.

---

## FAQ

### Do I need to run composer install on the server?

**No.** Dependencies are included. Install CrawlerDetect via Package Manager.

### How do I update JayBizzle/Crawler-Detect?

Update the CrawlerDetect package via Package Manager. New package versions ship an updated library. You do not need to update the library on the server separately.

### Is CrawlerDetect compatible with CAPTCHA?

Yes. Add both preHooks to FormIt: CrawlerDetect and reCAPTCHA or another CAPTCHA.

- **MODX:** `` &preHooks=`crawlerDetectBlock,recaptcha` ``
- **Fenom:** `'preHooks' => 'crawlerDetectBlock,recaptcha'`

CrawlerDetect is first in the list and filters bots before CAPTCHA.

### Does it work with AjaxForm?

AjaxForm is an alternative to FormIt. CrawlerDetect works through FormIt. If AjaxForm calls FormIt on the server, add `crawlerDetectBlock` to FormIt preHooks.

### Does it work with SendIt?

Yes. SendIt uses FormIt. Parameters are in presets. Add `'preHooks' => 'crawlerDetectBlock'` to the preset. When a bot is blocked SendIt returns an error and shows the message from CrawlerDetect settings. See [Integration → AJAX form (SendIt)](integration#ajax-form-sendit).

### Is MODX 2.x supported?

No. MODX Revolution 3.x only.

### Can I add my own User-Agent to the blacklist?

No. The list comes from JayBizzle/Crawler-Detect. The package has no blacklist or whitelist of its own.
