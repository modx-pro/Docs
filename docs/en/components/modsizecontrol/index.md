---
title: modSizeControl
description: How much space a MODX 2 or 3 site takes, what exactly takes it and how much is left before the limit
logo: https://modstore.pro/assets/extras/modsizecontrol/logo.png
author: GulomovCreative
categories: utilities
modstore: https://modstore.pro/packages/utilities/modsizecontrol

items:
  - text: Quick start
    link: quick-start
  - text: Widget
    link: widget
  - text: Component page
    link: page
  - text: Scanning and cron
    link: scan
  - text: Cleanup
    link: cleanup
  - text: Upload control
    link: upload-control
  - text: Component settings
    link: settings
---

# modSizeControl

MODX Revolution 2 and 3 component: shows how much space the site takes, what exactly takes it and how much is left before the limit. A widget sits on the dashboard, and a page in the menu breaks the size down by folders, components and file types.

![The Overview tab](/components/modsizecontrol/screenshots/overview.png)

## Why

Hosting plans and maintenance contracts usually cap the disk space, and a site grows unnoticed: full-size pictures, archives of old package versions, logs, a forgotten backup in the site root. When the space runs out, finding out where it went usually means SSH.

modSizeControl walks through every file of the site once and remembers what takes how much. From then on, the answer to "where did the space go" is in the manager, no console needed.

## Features

- Dashboard widget: the site size, how much of the limit is used and a breakdown by category.
- Component page with the Overview, Explorer, Components, File types, Large files and History tabs.
- Step-by-step scanning: a large site does not hit `max_execution_time`, and an interrupted scan continues where it stopped.
- Scanning by cron.
- Clearing the cache, logs and old package versions with the standard MODX permissions.
- Upload control: a file that does not fit into the limit is not uploaded.
- The interface follows the MODX 3 and MODX 2 manager.

## History

The component was originally made by Pavel Zarubin and Bakhtovar Gulomov. The current version is a complete rewrite: its own page, step-by-step scanning, cleanup and a new widget. The system setting keys have not changed, so a limit set in the old version keeps working.

## Installation

Via Package Manager with the [modstore.pro](https://modstore.pro/packages/utilities/modsizecontrol) provider ([how to connect the repository](https://modstore.pro/faq)).

The widget places itself on the dashboard on the first install. Next: [Quick start](/en/components/modsizecontrol/quick-start).

::: warning Upgrading from 1.0.x
The installer removes what is left of the old version: the `assets/components/modsizecontrol/action.php` file and the `modsizecontrol_tpl` setting. The `tpl.modSizeControl` chunk is no longer used and can be removed. pdoTools and Ace are no longer required.
:::

## Requirements

- MODX Revolution 2.8+ or 3.x.
- PHP 7.4 or later.
- The `settings` permission for the component page, scanning and the widget buttons. Cleanup also needs `empty_cache`, `error_log_erase` and `packages`.
