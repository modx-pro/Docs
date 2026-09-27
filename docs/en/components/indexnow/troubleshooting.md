---
title: Troubleshooting
description: Stuck queue, HTTP 403/429, key file, connector
---

# Troubleshooting

## Queue grows, nothing is sent

1. Check `indexnow_enabled = Yes` and valid key and `indexnow_endpoint`. With invalid values the worker skips silently: the queue grows, **history stays empty**, MODX log shows `Worker skipped`.
2. Wait for queue tick (any front-end request or manager reload) or click **Process queue**.
3. If the site has little HTTP traffic, install [Scheduler](/en/components/scheduler/) and task **IndexNow: Process Queue**.
4. Open **History** for HTTP code and error text.

## Key file not found

Create `{key}.txt` in the web root. File body must be the key only.

On multi-domain setups, place the file in each public document root. See [Key and key file](key).

## HTTP 403

Common causes: missing key file, wrong key, endpoint rejected the request (including local hosts like `project.test`).

Fix the key file, then **Retry** on the failed row. **Retry** does not reset `attempts` ([issue #1](https://github.com/Ibochkarev/IndexNow/issues/1)).

## HTTP 429 or 5xx

Temporary error. Worker schedules retry after `indexnow_retry_delay`. Increase delay or lower `indexnow_batch_size` if needed.

## HTTP 401, 404, 410, and other 4xx

Treated as permanent: immediate `failed`, no retry loop (except codes explicitly treated as temporary in the worker).

## Resource saved but IndexNow error in the log

Expected. The plugin catches exceptions and logs them. The save is not rolled back.

## Manual URL rejected

Only hosts from your contexts are allowed. `localhost`, private/reserved IPs, and `metadata.google.internal` are blocked. Check the absolute URL and `site_url` / `http_host`.

## Manager / AJAX errors

Ensure `assets/components/indexnow/connector.php` finds the site `config.core.php`. With non-standard directory layout the connector walks up to eight levels.
