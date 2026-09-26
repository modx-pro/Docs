---
title: Upgrading to FetchIt 4
description: One package instead of the 1.x and 3.x lines, the old API on MODX 2 and 3, and what may affect your code
---

# Upgrading to FetchIt 4

FetchIt 1.x was the package for MODX 2 and FetchIt 3.x the package for MODX 3. FetchIt 4 replaces both: one package installs on MODX 2.8 and on MODX 3, over either of the old ones, through Package Manager. System settings and chunks are kept.

::: warning
The FetchIt snippet and plugin are replaced on upgrade, together with the default properties of the snippet, so edits to their code and properties are lost. The snippet calls on your pages need no changes.
:::

## The old API still works

- In your own snippets get FetchIt like this: `$FetchIt = FetchIt::service($modx);`. The 1.x way (`$modx->getService('fetchit', 'FetchIt', MODX_CORE_PATH . 'components/fetchit/model/')`) and the 3.x way (`$modx->services->get('FetchIt')`, MODX 3 only) return the same object.
- The `FetchIt\FetchIt` class of 3.x is the same class, and `instanceof \FetchIt\FetchIt` works. `get_class()` now returns `FetchIt`.
- `storeActionProperties()` / `loadActionProperties()` and their 3.x names `saveActionProperties()` / `getActionProperties()`.
- Chunks through pdoTools (Fenom, `@FILE`) on both MODX 2 and MODX 3.

## What may affect your code

- The service fields of the [protection](/en/components/fetchit/protection) are added to the form. A script of your own instead of the bundled one has to send the token — see [Your own JavaScript instead of the bundled script](/en/components/fetchit/protection#your-own-javascript-instead).
- The `fetchit.frontend.default.notifier` setting no longer loads Notyf; it shows the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications). Styles for `.notyf__toast` and calls to `new Notyf()` need to change, or load Notyf yourself.
- `fetchit:error` also fires when a request fails: `detail.response` is then `null` and the cause is in `detail.error`.
- The processing snippet gets only the submitted form in `fields`: `$_POST`, and `$_FILES` for FetchIt submissions; only `$_POST` for a normal submission. No GET values and no cookies — it used to get `$_REQUEST`.
- `fetchit:success` can be cancelled: `event.preventDefault()` keeps the fields filled.
- A second submission while a request is running is ignored.
- `method` and `data-fetchit` come last among the attributes of the form tag.

## After the upgrade

- Check the pages with forms that are cached on the server or by a CDN: the token of the form is cached with the page, see [What to keep in mind](/en/components/fetchit/protection#what-to-keep-in-mind).
- On a development site set `fetchit.protection.min_time` and `fetchit.protection.rate_limit` to `0`, so the protection does not get in the way of tests.
- If the site runs FormIt 5.2 or later with reCAPTCHA, turn the captcha on through [`fetchit.captcha`](/en/components/fetchit/protection#captcha) for FetchIt forms: FormIt's own AJAX mode is disabled in them.

The full list of changes is in the [changelog](https://github.com/GulomovCreative/FetchIt/blob/master/core/components/fetchit/docs/changelog.txt) of the component, and the packages of every version are in the [GitHub releases](https://github.com/GulomovCreative/FetchIt/releases).
