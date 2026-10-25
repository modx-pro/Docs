---
title: Uninstall and reinstall
description: Native package removal, retained user files and safe reinstall in MODX.
---

# Uninstall and reinstall

Starting with **CookieConsentManager 1.0.8-pl5 (MODX 2)** and **CookieConsentManager3 1.0.8-pl7 (MODX 3)**, both packages support native Package Manager uninstall. **Uninstall** is different from merely deleting a downloaded transport archive.

## Uninstall procedure

1. Back up the database, `assets/js/cookie-consent/services/` and private consent logs.
2. In Package Manager choose **Uninstall** for the installed `cookieconsentmanager` or `cookieconsentmanager3` package.
3. Read console warnings. If removal fails, fix the cause and retry. MODX does not guarantee a complete rollback of every transport vehicle.
4. After successful uninstall, optionally delete the old transport archive record in Package Manager.

Do not uninstall an old historical `cookieconsent` or `cookieconsent3` package on top of the new one: its original uninstall code cannot be retroactively updated.

## What gets removed

When ownership is verified, the package deletes five snippets (`CookieConsent`, `CookieConsentAssets`, `CookieConsentBanner`, `CookieConsentMap`, `CookieConsentVideo`), the `CookiesPopup` chunk, its build plugin and event bindings, the `cookie_consent` namespace, menu entry, seven system settings, owned permission definitions and shipped files.

Recognized unmodified adapters and generated assets are removed; directories are pruned **only when empty**. Ownership metadata and file SHA256 checks prevent deleting unrelated items merely because their names match.

## What is retained

- JSONL consent logs and related private files, including logs in a shared `core/cache/logs/` directory.
- Modified adapters, unknown JavaScript files and other user-created content.
- External audit configuration and arbitrary owner-configured file paths.
- Permission definitions that predated installation, foreign objects and shared categories.
- Cookie decisions stored in visitors' browsers: server-side uninstall cannot clear them.

Retained files can block a later fresh install, because preflight refuses to overwrite unknown data. Review warnings, back up the files and decide manually whether to move or delete them.

## Reinstall and upgrades

A normal successful uninstall **without custom or unknown files** permits installation of the same transport again without manual SQL cleanup. Upgrades within the same package family retain settings and modified adapters as described under [Adapters](adapters).

Automatic migration from unpublished `cookieconsent`/`cookieconsent3` package families is **not supported**. Back up and remove the old package separately before using the new one.

See [Troubleshooting](troubleshooting) and [Consent audit](audit).
