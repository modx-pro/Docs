---
title: Troubleshooting and FAQ
description: Tracking, iframe, CSP, Fenom, package installation, adapter builds and audit issues.
---

# Troubleshooting and FAQ

## Tracking starts before consent

Check whether **Legacy** is enabled. In Strict mode inspect templates, chunks, plugins, GTM and widgets for direct `<script>` tags bypassing CookieConsentManager. Test a fresh private browser session and real Network traffic.

## A service does not start after consent

Verify that the service is **enabled**, its category is visible, its ID/URL is valid, the category is currently allowed and the bundle was built successfully. In GTM check each tag's consent checks. For media, check official embed URLs and whether the media can be embedded.

## An iframe loads despite the banner

A normal `<iframe src="…">` requests its URL immediately. Use `CookieConsentVideo`, `CookieConsentMap` or a `data-cc-embed` wrapper with a direct `<template>` child. For AJAX content, call `mountEmbeds(root)` after adding it to the DOM.

## CSP blocks a permitted provider

Consent and `Content-Security-Policy` solve different problems. For `script-src`, `connect-src`, `img-src` and `frame-src` errors, allow only required verified provider domains rather than disabling CSP.

## Adapter build fails

Check **Settings → Additional settings → Adapter build**. Validate ES2020 syntax, required source files and write permissions under `assets/`. An upgrade build failure preserves the previous working bundle when available. Correct the source and rebuild in Manager.

## Fenom or warm-cache errors

Use uncached snippets in a form supported by the site template and avoid manually embedding registry JSON into Fenom-parsed code. Diagnose warm-cache issues independently from a cold request. Certain pdoTools3/Fenom configurations were outside the verified MODX 3 native-release scope.

## Consent log is empty

Check the absolute log directory, PHP permissions, actual audit POST and receiver response. Compare Manager results with the month's JSONL file. A functioning banner does not guarantee successful logging.

## Preflight blocks installation

`Unowned cookie_consent objects`, `Unowned component files` or `Namespace path conflict` indicates a conflicting object, unknown file or incompatible path. **Do not automatically delete database rows**. Verify the origin of the data first. A single correctly configured empty namespace does not block fresh installation. Automatic migration from historical `cookieconsent` / `cookieconsent3` families is not supported.

## Files remain after uninstall

Modified adapters, unknown files and consent logs are intentionally preserved. See [Uninstall and reinstall](uninstall). A preserved unknown file may block a later fresh install until its owner reviews and removes or moves it.

## Old behavior after an edit

Clear MODX cache and any HTML/CDN cache, and check the bundle's `?v=` parameter. Do not simply delete the active minified JS: visitor requests do not trigger a rebuild.

## Before launch

Test both modes, RU/EN, visible categories, return visits, withdrawal, videos, maps, actual network traffic and audit logs in separate browser profiles. On upgrade verify that settings and modified adapters are retained.
