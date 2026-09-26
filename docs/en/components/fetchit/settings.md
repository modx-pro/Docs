---
title: Component settings
description: "FetchIt system settings: the script and error classes, built-in notifications, spam protection and captcha"
---

# Component settings

The MODX namespace is `fetchit`. The keys below are the full ones; in the manager they are split into the Main and Protection areas.

## Frontend

### `fetchit.frontend.js`

- Default: `[[+assetsUrl]]js/fetchit.js`

Path to the script with the form-handling class. The package also ships a minified `js/fetchit.min.js` — about 19 KB instead of 36 (about 7 KB instead of 10 gzipped).

The plugin loads the script in `<head>` with `defer`. When a page with a form has no `<head>`, or the setting points at something that is not a `.js` file, the script is not added and the cause goes to the MODX log.

### `fetchit.frontend.js.classname`

- Default: `FetchIt`

Name of the global class that creates instances. It goes into the inline `FetchIt.create({...})` call. Change it only if you extended the bundled class with your own. When no class of that name is on the page, the form is submitted the normal way and the console gets a warning.

### `fetchit.frontend.input.invalid.class`

- Default: `is-invalid`

CSS class for an `input` / `select` / `textarea` with an error. Several classes are separated by spaces. The field also gets `aria-invalid="true"`.

### `fetchit.frontend.custom.invalid.class`

- Default: empty

Class for elements with `[data-custom="field_name"]` — wrappers for Bootstrap, Bulma and the like.

### `fetchit.frontend.default.notifier`

- Default: `No`

Show the answers of the server and failed submissions with the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications) in the corner of the page. A `FetchIt.Message` of your own takes precedence over the setting.

::: warning
Before FetchIt 4 this setting loaded the Notyf library. Notyf is no longer in the package: styles for `.notyf__toast` and scripts that call `new Notyf()` need to change, or load Notyf yourself.
:::

## Protection

In detail: [Spam protection](/en/components/fetchit/protection).

### `fetchit.protection`

- Default: `Yes`

Every protection check: the token, the fill time, the trap field, the rate limit, the proof of work and the captcha. Turn it off for debugging only.

### `fetchit.protection.secret`

- Default: a random key

The key that signs the tokens, generated when the package is installed. After it changes, pages opened before get one resend each with a new token.

### `fetchit.protection.min_time`

- Default: `3`

The minimum fill time in seconds, counted from the output of the page. `0` turns the check off.

### `fetchit.protection.token_ttl`

- Default: `86400`

How many seconds a page with a form stays valid. `0`, and anything above 30 days, means 30 days.

### `fetchit.protection.rate_limit`

- Default: `10`

How many times one form may be submitted from one address per window. `0` turns the limit off.

### `fetchit.protection.rate_window`

- Default: `600`

The window of the limit, in seconds. `0` turns the limit off.

### `fetchit.protection.log`

- Default: `1`

The protection log: `0` nothing, `1` problems and refusals that may affect people, `2` every refusal. Mistakes in the captcha and proof-of-work settings are always logged.

### `fetchit.protection.proxies`

- Default: empty

Trusted proxies or CDNs: IP addresses or CIDR ranges, comma separated. They make the limit count by the address of the visitor instead of the address of the proxy.

### `fetchit.protection.ip_header`

- Default: `X-Forwarded-For`

The header a trusted proxy passes the visitor's address in, for example `CF-Connecting-IP`.

### `fetchit.protection.pow`

- Default: `0`

The difficulty of the [proof of work](/en/components/fetchit/protection#proof-of-work) in bits. `0` turns it off, and it never goes above 24. With proof of work on, a form cannot be sent without JavaScript.

## Captcha

In detail: [Captcha](/en/components/fetchit/protection#captcha).

### `fetchit.captcha`

- Default: empty

`turnstile`, `recaptcha` or `smartcaptcha`. Empty means no captcha.

### `fetchit.captcha.site_key`

- Default: empty

The site key from the dashboard of the captcha service.

### `fetchit.captcha.secret_key`

- Default: empty

The secret key from the dashboard of the captcha service. Until both keys are set the captcha stays off, and the log says what is missing.

### `fetchit.captcha.min_score`

- Default: `0.5`

For reCAPTCHA v3 only: the minimum score from 0 to 1, below which a submission is refused.
