---
title: Quick start
---
# Quick start

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0.0 or newer |
| PHP | 8.1.0 or newer |

## Step 1. Install

1. Open the package installer.
2. Find **Modx3ProfilerToolbar**.
3. Click **Install**.

Install and upgrade send an anonymized POST to `https://metrics.modx.pro/`. The payload is described in the [overview](/en/components/modx3profilertoolbar/#installation). A failed send does not roll the package back.

## Step 2. Settings

Open the MODX system settings and filter by the `modx3profilertoolbar` namespace. The package does not create its own menu item.

Turn on:

- `modx3profilertoolbar.enabled`
- `modx3profilertoolbar.frontend_toolbar`

The other keys are in [System settings](settings).

## Step 3. Check

1. Log in to the manager.
2. Open a site page in the `web` context.
3. The panel appears in the bottom-right corner.

The panel is visible only with an `mgr` context session. The data belongs to this request and is already embedded in the HTML. If the request is outside `sampling_rate`, there is no panel. With `enabled` on, the package still replaces the parser on that request. See [Troubleshooting](troubleshooting).
