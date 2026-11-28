---
title: System Settings
---
# System Settings

Namespace: `cmx`. Settings are divided into the `general`, `appearance`, `editing`, `modx`, and `completion` areas.

**Where to edit:** **System → System Settings** → filter by the `cmx` namespace.

System values can be overridden for an individual manager user via **Users → user → Settings**. The theme, font size, and word wrap can also be changed in the editor's quick menu and are stored in the user's browser. The reset command restores the system values.

Existing setting values are preserved when the package is updated.

## General

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `cmx.theme` | cmx-combo | `auto` | Theme: `auto`, `manager`, `light`, `light-quiet`, `light-solarized`, `dark`, `dark-dracula`, `dark-nord`, `dark-gruvbox`, `dark-vscode`, `dark-monokai`, `dark-solarized` |
| `cmx.height` | textfield | empty | Editor height in px. Empty: the original field height or the standard CMX height. TVs have a separate `height` property |
| `cmx.toolbar` | combo-boolean | `Yes` | Editor toolbar |
| `cmx.statusbar` | combo-boolean | `Yes` | Status bar: position, selection, size, language, theme, and diagnostics |
| `cmx.command_palette` | combo-boolean | `Yes` | Command palette via `Ctrl/Cmd+Shift+P` |

## Appearance

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `cmx.font_family` | textfield | empty | Custom monospace font. Empty: the system monospace font stack |
| `cmx.font_size` | textfield | `13` | Font size in px |
| `cmx.line_numbers` | combo-boolean | `Yes` | Line numbers. Click to select a line; drag to select a range |
| `cmx.active_line` | combo-boolean | `Yes` | Highlight the active line |
| `cmx.fold_gutter` | combo-boolean | `Yes` | Block folding buttons in the gutter |
| `cmx.word_wrap` | combo-boolean | `No` | Wrap long lines |
| `cmx.bracket_matching` | combo-boolean | `Yes` | Highlight the matching bracket |
| `cmx.bracket_colors` | combo-boolean | `No` | Color brackets by nesting level |
| `cmx.indent_guides` | combo-boolean | `Yes` | Indentation guides |
| `cmx.ruler` | textfield | `0` | Vertical ruler at the specified column; `0` disables it |
| `cmx.highlight_trailing` | combo-boolean | `Yes` | Highlight trailing spaces and tabs |

## Editing

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `cmx.soft_tabs` | combo-boolean | `Yes` | Spaces instead of the Tab character |
| `cmx.tab_size` | textfield | `4` | Indentation width |
| `cmx.close_brackets` | combo-boolean | `Yes` | Automatically close brackets and quotes |
| `cmx.auto_close_tags` | combo-boolean | `Yes` | Automatically close HTML/MODX tags and Fenom blocks |
| `cmx.format_button` | combo-boolean | `Yes` | Indentation formatting button on the toolbar |
| `cmx.search_panel` | combo-boolean | `Yes` | Search and replace via `Ctrl/Cmd+F` |
| `cmx.highlight_matches` | combo-boolean | `Yes` | Highlight occurrences of the selected word |
| `cmx.emmet` | combo-boolean | `Yes` | Expand Emmet abbreviations with Tab in supported contexts |
| `cmx.autosave` | combo-boolean | `Yes` | Local drafts in `localStorage` |
| `cmx.autosave_lifetime` | textfield | `240` | Draft retention period in minutes |
| `cmx.keymap` | cmx-combo | `standard` | Keymap: `standard`, `sublime`, or `vim` |
| `cmx.trim_trailing` | combo-boolean | `No` | Remove trailing spaces and tabs before submitting the form |

## MODX Integration

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `cmx.goto_definition` | combo-boolean | `Yes` | Open a snippet, chunk, TV, or resource in a new tab via `Ctrl/Cmd + click` |
| `cmx.hovers` | combo-boolean | `Yes` | Hover tooltips for MODX tags, filters, and modifiers |
| `cmx.media_button` | combo-boolean | `Yes` | Button for the standard MODX media browser |
| `cmx.versions` | combo-boolean | `Yes` | Snapshots of elements and resources when saved |
| `cmx.versions_max` | textfield | `20` | Maximum number of stored snapshots per object |
| `cmx.php_lint` | combo-boolean | `Yes` | Browser-based PHP validation and server-side `php -l` validation when PHP CLI is available |
| `cmx.php_path` | textfield | `php` | Path to the PHP CLI executable |
| `cmx.css_lint` | combo-boolean | `Yes` | Validate CSS files and `<style>` blocks |
| `cmx.tv` | combo-boolean | `Yes` | Register and replace TVs with the `cmx` input type |
| `cmx.template_lint` | combo-boolean | `Yes` | Validate Fenom and MODX tags |
| `cmx.warn_on_save` | combo-boolean | `Yes` | Confirm saving when critical template or PHP errors are detected |

## Autocompletion

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `cmx.autocomplete` | combo-boolean | `Yes` | Main autocompletion switch |
| `cmx.autocomplete_modx` | combo-boolean | `Yes` | MODX tags, elements, properties, filters, and property sets |
| `cmx.autocomplete_fenom` | combo-boolean | `Yes` | Fenom and Twig |
| `cmx.autocomplete_php` | combo-boolean | `Yes` | PHP functions and keywords |
| `cmx.autocomplete_settings` | combo-boolean | `Yes` | `[[++key]]` system settings |
| `cmx.autocomplete_lexicons` | combo-boolean | `Yes` | `[[%key]]` lexicon entries |
| `cmx.autocomplete_api` | combo-boolean | `Yes` | MODX/xPDO API and Fenom objects |
| `cmx.autocomplete.insert_defaults` | combo-boolean | `Yes` | Insert default property and filter values |
| `cmx.autocomplete.close_tags` | combo-boolean | `Yes` | Add closing constructs after selecting a suggestion |
| `cmx.autocomplete.skeletons` | combo-boolean | `Yes` | Insert skeletons for block Fenom tags |
| `cmx.snippets` | textarea | empty | Custom snippets, one per line: `label :: text to insert` |

Example `cmx.snippets`:

```text
pdoResources :: [[!pdoResources? &parents=`0` &limit=`10` &tpl=``]]
```

## Related MODX Settings

| Key | Role in CMX |
| --- | --- |
| `which_element_editor` | The value `cmx` enables replacement of standard fields. Another value disables the editor on forms; TVs, history, and RTE name registration are handled separately |
| `use_editor` | Enables the RTE branch for a resource. The context-specific value is used when available |
| `which_editor` | An empty value or `cmx` allows CMX for a resource without richtext. Another name leaves the field to another editor or a textarea |

### Optional `cmx.html_elements_mime`

This key is not created by the installer but is read by the plugin. Create it manually if you need to force a MIME type for templates, regular chunks, and HTML resources:

- `text/html`;
- `text/x-smarty` - Fenom;
- `text/x-twig` - Twig.

Without this key, CMX selects Twig if `twiggy_class` is set, then Fenom if `pdotools_fenom_parser` is enabled, and HTML otherwise.

## Related Sections

- [Integration](integration)
- [Quick Start](quick-start)
- [Troubleshooting](troubleshooting)
