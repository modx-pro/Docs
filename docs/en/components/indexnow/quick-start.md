---
title: Quick start
description: Install IndexNow, key, Scheduler, and first queue check
---

# Quick start

## After install

Open **Extras → IndexNow** → **Status** and verify:

- IndexNow is enabled (`indexnow_enabled`)
- key is valid
- key file exists in the site web root
- Scheduler is installed (recommended as backup cron)
- queue task exists

If the key file is missing, create it manually. See [Key and key file](key).

Install adds an IndexNow entry to the **`extension_packages`** system setting so xPDO loads package models. Uninstall removes that entry via resolver.

## Queue tick and Scheduler

**Queue tick** is the primary background path: `OnWebPageComplete` / `OnManagerPageAfterRender`, shutdown, up to 25 due URLs, 55 s lock. Details: [Queue and delivery](queue).

IndexNow registers the recurring task **IndexNow: Process Queue** when [Scheduler](/en/components/scheduler/) is already on the site.

Interval: every minute (`+1 minute`) when your Scheduler version supports it.

If you installed Scheduler after IndexNow:

1. Open IndexNow and click **Test connection** (creates the task if needed), or
2. reinstall / upgrade IndexNow.

Without Scheduler the package still works: the queue fills, HTTP ticks and **Process queue** remain available.

## Permissions

Install adds these permissions to the **Administrator** policy:

| Permission | Purpose |
| --- | --- |
| `indexnow_manage` | IndexNow manager: status, queue, **Process queue**, test connection |
| `indexnow_send` | **Send URL** tab |
| `indexnow_view_history` | View history |

System settings `indexnow_*` are edited under **System → System settings**, not in the CMP.

The package ships **`IndexNowUserPolicy`** and **`IndexNowPolicyTemplate`** with the same three permissions. For editors, assign that policy to a user group instead of full Administrator.

## First check

1. Save a published resource.
2. Open **Queue**: expect `pending` or an already processed row after tick.
3. If needed, click **Process queue**.
4. In **History**, check the HTTP code (`200` / `202` means the notification was accepted).

## Uninstall

Uninstall removes:

- IndexNow system settings;
- plugin and namespace;
- queue and history tables;
- IndexNow Scheduler task;
- key file in the web root (only when file content matches `indexnow_key`);
- transport policy/template vehicles;
- the **`extension_packages`** entry.

Permissions already embedded in **AdministratorTemplate** / Administrator policy are **not** removed. Clean them manually under **Security → Access policies** if needed.
