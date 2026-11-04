---
title: LLMS Forge quick start
description: Install the package and publish your first llms.txt on MODX 3
---

# Quick start

## Requirements

MODX Revolution 3, PHP 8.1+, and the DOM, JSON, and mbstring extensions. Friendly URLs must route unknown paths into MODX. An existing file or resource with URI `llms.txt` takes precedence over the extra's route.

PHP needs write access to `core/components/llmsforge/var/visits` for request statistics.

## Installation

1. Upload and install `llmsforge-1.0.0-pl.transport.zip` in the MODX package manager.
2. Open **Components → LLMS Forge**. Your manager user needs the `settings` permission.
3. Select the site context and run **Check**. Resolve any reported issues.
4. Enter the site title and short summary.
5. Search and select useful pages. Optionally assign sections. The resource list shows 25 rows per page.
6. Preview the result, enable publication, and save.
7. Open `https://your-domain/llms.txt` in an anonymous browser session.

```text
# Site title

> Short summary

## Pages

- [Page](https://example.com/page): Page summary.
```

Preview uses current form values but does not save them. Configure each context separately. To update, install a newer package over the old one; context settings are preserved.

## Web server

LLMS Forge handles requests through `OnPageNotFound`. Friendly URL rules must pass `/llms.txt` and `/llms-txt/…` into MODX. After installation, check both the main file and one card URL. See [troubleshooting](troubleshooting.md) if either returns 404.
