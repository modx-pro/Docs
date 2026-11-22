---
title: Ace
description: Code editor with syntax highlighting for the MODX Revolution manager
categories: content
author: modx-pro
repository: https://github.com/modx-pro/modx-ace
logo: https://modstore.pro/assets/extras/ace/logo.png
modstore: https://modstore.pro/packages/content/ace

compatibility:
  - modx2
  - modx3
items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Integration', link: 'integration' },
  { text: 'Keyboard shortcuts', link: 'hotkeys' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# Ace

[Ace Editor](https://ace.c9.io/) in the MODX Revolution manager: syntax highlighting in snippets, plugins, chunks, templates, files, and (optionally) resource content.

Package: **1.9.11-pl**. Repository: [modx-pro/modx-ace](https://github.com/modx-pro/modx-ace).

## Features

- **Code editor:** PHP, JS, HTML, CSS/SCSS/LESS, SQL, JSON, Markdown, and more
- **Themes, tabs, fold, invisibles:** `ace.*` keys
- **Find and replace** with regex, multicursor, Emmet
- **MODX:** tag highlighting, completions (Ctrl+Space, Ctrl+Shift+Space, Alt+Space), Tab snippets (`getr`, `pdoResources`, `chunk`, …)
- **Ace TV input** for code fields
- **Drafts** (`ace.draft_restore`), CSS color preview (`ace.color_preview`)

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 2 or 3 |

## Installation

1. Install via **Extras → Installer** ([modstore.pro](https://modstore.pro/packages/content/ace), free)
2. Check `which_element_editor = Ace`. The resolver sets this value on install and on every upgrade
3. **Manage → Clear cache**

After install: plugin **Ace**, system settings under namespace `ace`, TV input type **Ace**.

## Quick links

| Section | Description |
| --- | --- |
| [Quick start](quick-start) | Editor for elements and resources |
| [System settings](settings) | `ace.*` keys |
| [Integration](integration) | RTE vs Ace, mime, Tab snippets, TV |
| [Keyboard shortcuts](hotkeys) | Ctrl+Alt+H and common shortcuts |
| [Troubleshooting](troubleshooting) | Fullscreen, TinyMCE, save |

Material-style theme: [FAQ](/en/faq/ace/modx-ace-material-theme).

## History

Original author: Danil Kostin.
