---
title: Spam protection
description: Token, fill time, trap field and rate limit, proof of work, captcha and your own rules on the OnFetchItBeforeProcess event
---

# Spam protection

Every FetchIt form is protected right after the install, with nothing to configure. The checks run before FormIt or your snippet — both for FetchIt submissions and for forms sent without JavaScript.

The [`fetchit.protection`](/en/components/fetchit/settings#fetchitprotection) setting turns it all off. Turn it off for debugging only.

## What is always checked

**Token.** A hidden `fetchit_token` field is added to the form, signing the key of the form, the time the page was output and a random number. The token is single-use and needs no session. A new token is only issued in answer to a well-signed token of that form, so a bot that never loaded the page cannot submit it. The answer to a submission carries the next token in the `X-FetchIt-Token` header, so the form can be sent again without a reload.

**Fill time.** A form sent sooner than `fetchit.protection.min_time` seconds after the page was output (3 by default) is refused. A resend counts from the same output, so a person who fixed a field after an error is not refused.

**Trap field.** A hidden field with a random name per installation: people do not see it and browser autofill does not recognise it. A bot that fills it gets an answer of success with the `successMessage` of the form, but the form is not processed and no e-mail is sent. Such cases go to the MODX log.

**Rate limit.** No more than `fetchit.protection.rate_limit` submissions of one form from one address per `fetchit.protection.rate_window` seconds — 10 per 10 minutes by default. Every attempt with a well-signed token counts, refused ones included, so replaying an old token does not get around the limit.

The service fields are removed from `$_POST` before FormIt, so they never reach e-mails. The signing key is generated when the package is installed and lives in `fetchit.protection.secret`.

## Proof of work

Off by default, for when spam gets through the checks above. It works only while `fetchit.protection` is on.

`fetchit.protection.pow` sets the difficulty in bits: `0` turns it off, and it never goes above 24 — anything higher, or not a number, is logged and replaced. Before a submission the browser looks for a number `n` whose SHA-256 of `token:n` starts with that many zero bits, and sends it in the `fetchit_pow` field.

The solving starts as soon as the visitor enters the form, so it is usually ready by the time the button is pressed, while every submission costs a bot processor time. At 16 bits it takes about 65 thousand hashes on average: roughly a third of a second on a computer, several times that on a phone. Every further bit doubles the time; 20 bits is about 16 times longer.

When a page from a cache asks for less than the server does, FetchIt solves the task again and sends the form once more.

::: warning
With proof of work on, a form cannot be sent without JavaScript.
:::

## Captcha

Put the service in `fetchit.captcha` and the keys from its dashboard in `fetchit.captcha.site_key` and `fetchit.captcha.secret_key`:

| Value | Service | How it works |
| --- | --- | --- |
| `turnstile` | [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) | A widget in a `.fetchit-captcha` block before the first `type="submit"` button, or at the end of the form when there is none |
| `recaptcha` | [Google reCAPTCHA v3](https://developers.google.com/recaptcha/docs/v3) | No widget; an answer is requested on every submission with the `fetchit` action. A score below `fetchit.captcha.min_score` (`0.5` by default) is refused |
| `smartcaptcha` | [Yandex SmartCaptcha](https://yandex.cloud/en/services/smartcaptcha) | Invisible mode; a challenge is shown only when the service is unsure |

Until both keys are set the captcha stays off, and the log says what is missing — the same goes for a typo in the name of the service. FetchIt adds the script of the service itself and gets its answer before each submission.

The answer is checked on the server last among the protection checks (`OnFetchItBeforeProcess` plugins run after it), so bots without a token never reach the captcha service.

::: warning
The captcha works through FetchIt only: a form sent without JavaScript will not pass it.
:::

For a development site Turnstile has [test keys](https://developers.cloudflare.com/turnstile/troubleshooting/testing/): site `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`.

## What the visitor sees

A refusal arrives as an ordinary form error: a message from the lexicon, the `fetchit:error` event and a notification.

| Lexicon key | When |
| --- | --- |
| `fetchit_err_token` | the form is stale: no token, or one that does not fit |
| `fetchit_err_too_fast` | sent sooner than `min_time` |
| `fetchit_err_rate` | the rate limit is reached |
| `fetchit_err_store` | the mark of a used token could not be written |
| `fetchit_err_pow` | the proof of work did not add up |
| `fetchit_err_captcha` | the captcha service did not accept the answer |
| `fetchit_err_captcha_unavailable` | the captcha service is unreachable or did not accept the secret key |
| `fetchit_err_captcha_client` | the captcha gave no answer in the browser: a blocker, a CSP, the visitor closed the challenge |

When the token of a page is stale — a cached page, a page open for long, a new key — FetchIt sends the form once more with a new token by itself, and the visitor notices nothing.

Without JavaScript the message goes to `[[+fi.validation_error_message]]`, and the entered values are kept, as in the `tpl.FetchIt.example` chunk of the package.

## What to keep in mind

- **A cache of the whole page** — nginx, a CDN, a static cache plugin — gives every visitor the same token. Through FetchIt this works thanks to the resend, but pages with forms are better left out of such a cache: without JavaScript the first submission is refused.
- **FormIt 5.2 and later** can send forms over AJAX on its own. For FetchIt forms that mode is turned off: FetchIt removes the stored FormIt properties, the `fi.ajaxToken` placeholder and `formit.js`, or the form could be sent through FormIt's `action.php` past the protection. FormIt forms of their own on the same page keep their AJAX mode. The reCAPTCHA of FormIt 5.2 gets its answer through `formit.js`, so it does not work in FetchIt forms — use `fetchit.captcha` instead.
- **Forms inserted into the page over AJAX** after it loaded are not picked up: the script finds forms when the page loads. Such forms are sent the normal way.
- **Behind a proxy or a CDN** every visitor arrives from one address and the limit becomes shared across the site. List the proxy addresses in `fetchit.protection.proxies` (IPs or CIDR, comma separated) and the header with the visitor's address in `fetchit.protection.ip_header` (`X-Forwarded-For`, `CF-Connecting-IP`).
- **Marks of used tokens** live in `core/cache/fetchit/tokens/`, which "Clear cache" leaves alone. When the folder cannot be written to, forms are refused and the cause is logged. On several servers without a shared `core/cache` a token can be used once on each of them.
- **The log**, `fetchit.protection.log`: `0` writes nothing, `1` (the default) writes problems and refusals that may affect people (the trap, the limit, writing the marks, an unreachable captcha service), `2` writes every refusal, captcha answers the service did not accept included. Mistakes in the captcha and proof-of-work settings are always logged.
- **On a development site** and in automated tests set `fetchit.protection.min_time` and `fetchit.protection.rate_limit` to `0`. Turning the whole protection off is for debugging only.

## Your own JavaScript instead of the bundled script

Your script has to send the form to `action.php` with the `X-FetchIt-Action` header equal to the `data-fetchit` attribute of the form, and a `pageId` field with the id of the page. On top of that it has to:

- send the `fetchit_token` field of the form and take the next token from the `X-FetchIt-Token` header of every answer;
- send the form once more with the new token when an answer carries `X-FetchIt-Refused: token`;
- with proof of work, send in `fetchit_pow` the solution for the token that goes in this request, and solve it again on a resend. On a `pow` refusal the `X-FetchIt-Pow` header tells the difficulty needed;
- with a captcha, send the answer of the service in its own field (`cf-turnstile-response`, `g-recaptcha-response` or `smart-token`), and run reCAPTCHA v3 with the `fetchit` action.

## Your own rules

A plugin on the `OnFetchItBeforeProcess` event gets:

| Parameter | What is in it |
| --- | --- |
| `$action` | the key of the form |
| `$fields` | the submitted fields, without the service ones and without files |
| `$properties` | the properties of the snippet call, may be `null` |
| `$FetchIt` | the service instance |

To refuse a submission the plugin outputs a message for the visitor, or a lexicon key, through `$modx->event->output()`. Returning a string with `return` does not refuse anything: MODX only writes it to the log.

```php
// A plugin on the OnFetchItBeforeProcess event
$email = isset($fields['email']) && is_string($fields['email']) ? $fields['email'] : '';
if (preg_match('/@(mailinator|tempmail)\./i', $email)) {
    $modx->event->output('Disposable addresses are not accepted.');
}
```

The event fires with the protection off too.
