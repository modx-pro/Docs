---
title: CMX
description: CodeMirror 6 code editor with MODX autocompletion, code linting, and version history
categories: content
author: vitos88
repository: https://github.com/vitos88/Cmx
logo: https://raw.githubusercontent.com/vitos88/Cmx/main/image/logo.png
modstore: https://en.modstore.pro/packages/content/cmx

compatibility:
  - modx3
items: [
  { text: 'Quick Start', link: 'quick-start' },
  { text: 'System Settings', link: 'settings' },
  { text: 'Integration', link: 'integration' },
  { text: 'Keyboard Shortcuts', link: 'hotkeys' },
  { text: 'Troubleshooting', link: 'troubleshooting' },
]
---
# CMX

[CodeMirror 6](https://codemirror.net/) in the MODX Revolution 3 manager: an editor for snippets, plugins, chunks, templates, files, resources without an RTE, the resource/data cache buffer, and TVs.

Package: **1.0.0-pl**. Repository: [vitos88/Cmx](https://github.com/vitos88/Cmx).

## Features

- **Code editor:** PHP, HTML, CSS/SCSS/Less, JavaScript, JSON, SQL, XML/SVG, Markdown, Fenom, and Twig
- **MODX integration:** semantic tag highlighting, element and property autocompletion, go to element, and hover tooltips
- **Tools:** search and replace, multiple cursors, Emmet, formatting, command and element palettes, and a media browser
- **Appearance:** 12 themes, Standard, Sublime, and Vim keyboard layouts, and configurable fonts, word wrap, and indentation
- **Validation:** PHP in the browser and via `php -l`, plus CSS, Fenom, and MODX tag validation
- **Change safety:** local drafts with diffs and version history with viewing, comparison, and export
- **Additional features:** the CMX input type for TVs and the CMX Scratchpad widget

All editor JavaScript is included in the package. No external CDNs are used for CodeMirror, language modes, or themes.

## System Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.x |
| PHP | 8.0+ |
| PHP CLI | Optional; only required for server-side `php -l` validation |

## Installation

1. Download `cmx-1.0.0-pl.transport.zip` from the [v1.0.0 release](https://github.com/vitos88/Cmx/releases/tag/v1.0.0) or install the Package via the installer [modstore.pro](https://modstore.pro/packages/content/cmx)
2. Install the package via **Packages → Package Management**
3. Check that `which_element_editor = cmx`
4. Reload an element editing page

The installer registers the **CMX** plugin, creates the `cmx_revision` table, adds 50 settings to the `cmx` namespace, and adds the **cmx** input type and the **CMX Scratchpad** widget.

## Quick Links

| Section | Description |
| --- | --- |
| [Quick Start](quick-start) | Installation, elements, resources, and initial checks |
| [System Settings](settings) | All 50 `cmx.*` keys and their default values |
| [Integration](integration) | Forms, RTE, MIME, autocompletion, TVs, drafts, and history |
| [Keyboard Shortcuts](hotkeys) | Essential Windows/Linux and macOS shortcuts |
| [Troubleshooting](troubleshooting) | Editor, tooltips, TVs, PHP linting, drafts, and history |

## License

GNU General Public License v2.0 or, at your option, any later version.
