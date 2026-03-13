---
title: System settings
---
# System settings

Settings use the prefix `crawlerdetect.` and are in the **crawlerdetect** namespace.

**Where to change:** **System → System settings** — filter by namespace `crawlerdetect`.

## Settings table

| Setting | Description | Default |
|---------|-------------|---------|
| `crawlerdetect_block_message` | Message when form is blocked (bot) | "Failed to submit form. Please try again later." |
| `crawlerdetect_log_blocked` | Log blocked submissions to MODX system log | Yes |

The block message is output via FormIt placeholder `[[+fi.validation_error_message]]` (MODX) or `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom). Ensure your form template outputs this placeholder.

## isCrawler snippet properties

| Property | Description | Default |
|----------|-------------|---------|
| **userAgent** | User-Agent string to check (if empty — from current request) | — |
| **placeholderPrefix** | Placeholder prefix for detected bot name | `crawlerdetect.` |

Placeholder `crawlerdetect.matches` (or with your prefix) is set to the bot name when detected (useful for debugging).
