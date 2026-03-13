---
title: Quick start
---
# Quick start

In 3 steps: enable Dev Toolbar and see request metrics.

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.x |
| PHP | 8.1+ |

## Step 1: Install

1. Go to **Packages → Installer**.
2. Find **Modx3ProfilerToolbar** in the list.
3. Click **Install**.

## Step 2: Configure

1. Open **Manage → System settings** (in MODX 3: **Settings → System settings**).
2. Filter by namespace **modx3profilertoolbar**.
3. Enable:
   - **modx3profilertoolbar.enabled** — Yes
   - **modx3profilertoolbar.frontend_toolbar** — Yes

## Step 3: Check

1. Log in to the Manager.
2. Open any site page in the **web** context.
3. The Dev Toolbar panel with request metrics will appear in the bottom-right corner.

The toolbar is shown only to users logged into the Manager. Traces are not stored — data is for the current request only.

## What's next

- [System settings](settings) — sampling, thresholds, CLI
- [Frontend Dev Toolbar](toolbar) — tabs, metrics, interpretation
- [pdoTools limitations](limitations) — what is and isn’t profiled
- [Troubleshooting](troubleshooting) — if the toolbar doesn’t appear
