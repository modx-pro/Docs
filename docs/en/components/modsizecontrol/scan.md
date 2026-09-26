---
title: Scanning and cron
description: How modSizeControl walks through the site, what it keeps and how to scan on a schedule
---

# Scanning and cron

The page and the widget show not the live size of the folders but the results of the last scan. Measuring the size on every dashboard visit would take too long on a site with tens of thousands of files, so modSizeControl walks through the site once and remembers what takes how much.

## Starting a scan

- the Scan or Scan again button on the [component page](/en/components/modsizecontrol/page);
- the Refresh button in the [widget](/en/components/modsizecontrol/widget);
- [cron](#cron).

In the manager, a user with the `settings` permission can scan.

## Step by step

A scan runs in steps of a few seconds. This way a large site does not hit `max_execution_time`, and an interrupted scan continues where it stopped.

- You can close the page: the scan continues when you open the page or the dashboard again.
- Two windows, or a window and cron, do not walk the same folders: while a step is busy, the other one waits.
- An unfinished scan started more than a day ago is dropped and started over: the files have changed by then.
- Stop interrupts the scan and throws away what it collected. The results of the previous scan stay.

## What is scanned

The site root and everything MODX keeps outside it: the core, `assets`, the manager and the connectors if they are moved out, and the file sources from the [`modsizecontrol_file_system`](/en/components/modsizecontrol/settings) setting.

Categories are defined by the paths from the MODX constants, so renamed and moved folders are recognised correctly. A file source outside `assets` counts as media.

The size is the real size of the files, not rounded up to disk blocks. The scan does not follow symbolic links: this way whatever lies elsewhere is not counted twice.

## What is kept

| What | How much |
| --- | --- |
| Folders and the file types in them | the last scan only |
| Large files, from 100 KB | the 5000 largest of the last scan |
| Totals: size, number of files and folders, categories, types, components | the last 500 scans, the History tab |

## Cron

The component has a script for scheduled scans:

```bash
php core/components/modsizecontrol/cli/scan.php
```

For example, every night at three:

```bash
0 3 * * * php /var/www/site/core/components/modsizecontrol/cli/scan.php > /dev/null 2>&1
```

The script finds the site on its own: it goes up from its folder to `config.core.php`, and if the core is moved outside the site, it takes the path from the core's `config.inc.php`. If the configuration key is not `config`, pass it in the `MODX_CONFIG_KEY` environment variable.

The script continues a scan started in the manager instead of starting a second one. It prints the progress as it goes; exit code `0` means the scan is finished, and on failure it exits with `1` and prints the reason to stderr.

::: tip
Run the script as the same user PHP runs the site as. Otherwise some folders may be unreadable for the script, and cache files it creates may be unwritable for the web server.
:::
