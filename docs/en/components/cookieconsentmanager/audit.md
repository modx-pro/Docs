---
title: Consent audit
description: JSONL records, filtering, CSV export, protected directories and troubleshooting.
---

# Consent audit

CookieConsentManager can store visitor decisions in **monthly JSONL files** on the site's server. Manager provides an event list, filters, details and CSV export.

## Configuration

On **Settings**, choose an absolute server directory writable by PHP and **inaccessible over HTTP**, particularly when MODX `core` resides below the web root.

```text
/var/www/private/cookie-consent-logs/
```

This is only an example. Use a real server filesystem path, not a public URL. Be careful when manually clearing `core/cache/`, as stored logs might be located there.

## Stored data

Depending on event schema, records may include event type, allowed categories, server time, event ID, browser/IP metadata and page path (`location.pathname`). **Query strings and URL fragments are not written** into the recorded path. Historical schema versions remain readable; category-based records use schema 3.

::: warning
Consent logs may contain personal data. Protect the directory, restrict access, set an appropriate retention period and make backups in accordance with your site's requirements. CSV export requires Manager permissions.
:::

The logs are **preserved during native uninstall**; retain or remove them separately according to your policy. See [Uninstall and reinstall](uninstall).

## Verify audit logging

1. Change consent in a private window and note the event time.
2. In Network, locate the audit POST and its successful server response with `event_id`.
3. Find the event using the **Consent log** filters in Manager.
4. Compare it with the corresponding month's physical JSONL file.

A visible banner does **not** prove that the audit POST was accepted. For HTTP `400`, inspect request data and HTML/JS freshness; for `403`, check Origin and permissions; for `503`, inspect server and directory configuration.

Access to view logs can be granted separately from access to edit component settings.
