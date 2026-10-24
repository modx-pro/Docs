---
title: Upload control
description: Do not let files that do not fit into the site limit be uploaded
---

# Upload control

When the site is close to its limit, upload control does not let a file that does not fit be uploaded. The manager user sees the "Site size limit exceeded" error.

## Enabling

Both settings are needed:

- [`modsizecontrol_control`](/en/components/modsizecontrol/settings) — `Yes`;
- [`modsizecontrol_site_limit`](/en/components/modsizecontrol/settings) — a limit in megabytes above zero.

Without a limit the control checks nothing, even when it is on.

## How it counts

The check is made by the modSizeControl plugin on the `OnFileManagerBeforeUpload` event, that is, for uploads through the MODX file manager.

The current site size is the result of the last scan plus everything uploaded through the file manager since then. If the current size together with the uploaded file exceeds the limit, the file is not uploaded. An uploaded file is counted right away, so the next one is compared with the new size. A new scan resets the uploaded counter.

If the site has never been scanned, the size comes from a quick measurement (`du` or a PHP walk) cached for 12 hours.

::: warning
The control only sees uploads through the MODX file manager. Files uploaded by FTP or created by components are counted after the next scan. So with the control on, it is worth scanning the site by [cron](/en/components/modsizecontrol/scan#cron).
:::
