---
title: System settings
---
# System settings

Namespace: `ace`, area: `general`.

**Where:** **Manage → System settings** → filter by namespace `ace`.

On package upgrade existing values are **not overwritten**, except resolver logic for empty `ace.snippets` (see below).

## Appearance and editor

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `ace.theme` | textfield | `chrome` | Ace theme: `monokai`, `tomorrow_night`, `github`, `solarized_dark`, … (full list in setting description) |
| `ace.font_size` | textfield | `13px` | Font size |
| `ace.word_wrap` | combo-boolean | — | Wrap long lines (also **Alt+Z**) |
| `ace.soft_tabs` | combo-boolean | `Yes` | Spaces instead of Tab character |
| `ace.tab_size` | textfield | `4` | Tab width in spaces |
| `ace.fold_widgets` | combo-boolean | `Yes` | Fold controls on the gutter |
| `ace.show_invisibles` | combo-boolean | `No` | Spaces, tabs, line endings |
| `ace.height` | textfield | empty | Editor height in px; empty: default height |
| `ace.grow` | textfield | empty | Fit height to text: empty = off; number > 0 = max height; `0` = unlimited |

## Behavior

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `ace.auto_close_tags` | combo-boolean | `Yes` | Auto-close brackets, quotes, HTML/MODX tags |
| `ace.draft_restore` | combo-boolean | `No` | Drafts in localStorage; offer restore after reload (7-day TTL) |
| `ace.color_preview` | combo-boolean | `No` | Tint `#hex`, `rgb()`, `hsl()` in CSS/HTML (capped at 2000 lines) |
| `ace.html_elements_mime` | textfield | empty | MIME for templates, chunks, and HTML resources. Empty: auto (`text/x-smarty` with Fenom pdoTools, `text/x-twig` with Twiggy, else `text/html`) |
| `ace.snippets` | textarea | empty / defaults | Tab snippets. On fresh install/upgrade, resolver writes defaults when empty |

## Related MODX settings

| Key | Role for Ace |
| --- | --- |
| `which_element_editor` | Must be `Ace`, or the plugin skips element forms |
| `use_editor` | Enables RTE logic for resources (context value wins) |
| `which_editor` | RTE name for resources. If not `Ace` and `use_editor = Yes`, Ace leaves `#ta` alone |

## Material-like theme example

[MODX Ace Material Theme](/en/faq/ace/modx-ace-material-theme): `tomorrow_night`, font size, CSS plugin.

## Related

- [Integration](integration)
- [Quick start](quick-start)
- [Troubleshooting](troubleshooting)
