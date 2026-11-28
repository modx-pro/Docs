---
title: Quick Start
---
# Quick Start

## Step 1. Installation

1. Install **CMX** via **Packages → Package Management** ([overview](index#installation))
2. Make sure the **CMX** plugin is enabled
3. Reload the manager page; clear the MODX and browser caches if necessary

## Step 2. Editor for Elements

`which_element_editor` = **cmx**.

Open a snippet, chunk, template, or plugin: the standard code field will become a CMX editor with syntax highlighting and a toolbar.

To temporarily switch back to another editor, change the value of `which_element_editor`. You do not need to uninstall CMX.

## Step 3. Code in Resources

The **context-specific** values of `use_editor` and `which_editor`, as well as the resource's `richtext` property, are taken into account:

| Goal | Settings |
| --- | --- |
| CMX in the content field of all resources | `use_editor = No`. This also replaces `<textarea>` elements with the `modx-richtext` class |
| CMX only for resources without richtext | `use_editor = Yes`, `which_editor` empty or `cmx`, richtext disabled |
| TinyMCE / another RTE | `use_editor = Yes`, `which_editor` not `cmx`, richtext enabled for the resource |
| Textarea without CMX | `use_editor = Yes`, `which_editor` not `cmx`, richtext disabled |

Learn more: [Integration](integration#resources-and-rte).

## Step 4. Verification

1. Open a snippet: PHP syntax highlighting should appear
2. In an HTML template, type `[[` and wait for the element list, or press **Ctrl+Space**
3. Press **Ctrl+Shift+P** / **Cmd+Shift+P**: the command palette will open
4. While holding **Ctrl** / **Cmd**, click the name of an existing snippet: it will open in a new tab
5. Open the settings using the gear button and select a theme

## Checklist

- [ ] `which_element_editor = cmx`
- [ ] Snippets and chunks open in CMX
- [ ] The `use_editor` / `which_editor` combination is configured for your resource workflow
- [ ] `cmx.autocomplete` autocompletion is enabled
- [ ] The theme and font size are selected in the quick menu or the `cmx` namespace ([settings](settings))

## What's Next

- [System Settings](settings)
- [Integration](integration): forms, MIME, TVs, drafts, and history
- [Keyboard Shortcuts](hotkeys)
