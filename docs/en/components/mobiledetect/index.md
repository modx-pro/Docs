---
title: MobileDetect
description: Device type detection in MODX and different content on a single page
author: modx-pro
repository: https://github.com/modx-pro/MobileDetect
logo: https://modstore.pro/assets/extras/mobiledetect/logo.png
modstore: https://modstore.pro/packages/utilities/mobiledetect
categories: utilities

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  {
    text: 'Snippets',
    link: 'snippets',
    items: [
      { text: 'MobileDetect', link: 'snippets/mobiledetect' },
    ],
  },
  { text: 'Integration', link: 'integration' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# MobileDetect

The component detects the visitor's device type (desktop, tablet, mobile) and lets you output different content on one MODX page.

Built on [mobiledetect/mobiledetectlib](https://github.com/serbanghita/Mobile-Detect) ^4.11 (`Detection\MobileDetect`).

## Features

- **Four output methods:** Fenom modifier, Fenom blocks, snippet, HTML tags
- **Forced mode:** GET parameter `?browser=mobile`
- **Cookie:** remembers the user's choice
- **Version switcher:** `tplMobileDetectSwitch` chunk from the package
- **PHP API:** `MobileDetect` service for plugins and snippets

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 2.8+ or 3.x |
| PHP | 8.2+ |
| pdoTools | optional; **required** for Fenom blocks and the `\| mobiledetect` modifier |

Detection uses User-Agent and HTTP headers. "Desktop site" mode in a mobile browser may return incorrect results.

## Installation

1. Install via **Extras → Installer** ([modstore.pro](https://modstore.pro/packages/utilities/mobiledetect), free)
2. Ensure plugin **MobileDetect** is enabled (`md_disable_plugin = No`)
3. **Manage → Clear cache**

After install:

| Element | Purpose |
| --- | --- |
| Plugin **MobileDetect** | HTML tags, Fenom, `mobiledetect.device` placeholder |
| Snippet **MobileDetect** | Conditional output via `:is`/`:then` |
| Chunk **tplMobileDetectSwitch** | Desktop / tablet / mobile / auto links |

The `mobiledetectlib` library is bundled in transport. **Do not** run `composer install` on the server.

## Output methods

| # | Method | When to use |
| --- | --- | --- |
| 1 | Fenom `\| mobiledetect` | Best with pdoTools: code in false branches does not run |
| 2 | Fenom blocks `{mobile}`, `{phone}`, … | Readable markup in Fenom templates |
| 3 | Snippet `[[!MobileDetect]]` | Without Fenom, in any MODX context |
| 4 | HTML tags `<standard>`, `<tablet>`, `<mobile>` | Cache-friendly; MODX tags inside blocks parse before filtering |

Details: [Integration](integration).

## Quick links

| Section | Description |
| --- | --- |
| [Quick start](quick-start) | First integration in 5 minutes |
| [System settings](settings) | `md_*` keys |
| [MobileDetect snippet](snippets/mobiledetect) | `&input` parameter |
| [Integration](integration) | Fenom, HTML tags, PHP API |
| [Troubleshooting](troubleshooting) | Cache, pdoTools, upgrade from 2.0.x |

## History

Originally written by Vasily Naumkin as a tutorial on bezumkin.ru. Current version **2.1.0-pl** is maintained at [modx-pro/MobileDetect](https://github.com/modx-pro/MobileDetect).
