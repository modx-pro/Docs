---
title: System settings
---
# System settings

Namespace: `ace`, area: `general`.

**Where:** **Manage → System settings** → filter by namespace `ace`.

On package upgrade, `ace.*` keys are **not overwritten**. Exceptions: an empty `ace.snippets` is filled with the default set. The resolver sets `which_element_editor` to `Ace` on every install and upgrade, even when another element editor was selected.

## Appearance and editor

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `ace.theme` | textfield | `chrome` | Theme module name: `monokai`, `tomorrow_night`, `github`, `kr_theme`. The setting description lists kr as `kr`. The working value is `kr_theme` |
| `ace.font_size` | textfield | `13px` | Font size |
| `ace.word_wrap` | combo-boolean | — | Wrap long lines (also **Alt+Z**) |
| `ace.soft_tabs` | combo-boolean | `Yes` | Spaces instead of Tab character |
| `ace.tab_size` | textfield | `4` | Tab width in spaces |
| `ace.fold_widgets` | combo-boolean | `Yes` | Fold controls on the gutter |
| `ace.show_invisibles` | combo-boolean | `No` | Spaces, tabs, line endings |
| `ace.height` | textfield | empty | Height in px for elements, files, `#ta`, and the cache buffer. Empty: the Ext field height. Ace TVs and `.modx-richtext` textareas do not read this key. They use the field height or 200 |
| `ace.grow` | textfield | empty | Fit height to text. Empty = off. Number > 0 = max height. `0` = unlimited |

## Behavior

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `ace.auto_close_tags` | combo-boolean | `Yes` | Auto-close brackets, quotes, HTML/MODX tags |
| `ace.draft_restore` | combo-boolean | `No` | Drafts in localStorage. Offer restore after reload (7-day TTL) |
| `ace.color_preview` | combo-boolean | `No` | Tint `#rgb`, `#rrggbb`, `#rrggbbaa`, `rgb`/`rgba`, `hsl`/`hsla`. Mime: css, scss, less, html, smarty, twig, svg. Cap 2000 lines. No preview in PHP or JSON |
| `ace.html_elements_mime` | textfield | empty | MIME for templates, chunks, and HTML resources. Empty: auto (`text/x-smarty` with Fenom pdoTools, `text/x-twig` with Twiggy, else `text/html`) |
| `ace.snippets` | textarea | empty / defaults | Tab snippets. On install or upgrade, resolver writes defaults when the value is empty |

## Related MODX settings

| Key | Role for Ace |
| --- | --- |
| `which_element_editor` | A value other than `Ace` disables the plugin everywhere except RTE name registration. An empty or missing setting counts as `Ace` |
| `use_editor` | Turns on the resource RTE branch. A context value wins when present |
| `which_editor` | An empty value and `Ace` are not treated as another RTE. Any other name with `use_editor = Yes` leaves `#ta` as a plain textarea when richtext is off |

## Paths

Not shipped in the package. Create them when core or assets are not in the default place.

| Key | Default |
| --- | --- |
| `ace.core_path` | `{core_path}components/ace/` |
| `ace.assets_url` | `{assets_url}components/ace/` |

## Material-like theme example

[MODX Ace Material Theme](/en/faq/ace/modx-ace-material-theme): `tomorrow_night`, font size, CSS plugin.

## Related

- [Integration](integration)
- [Quick start](quick-start)
- [Troubleshooting](troubleshooting)
