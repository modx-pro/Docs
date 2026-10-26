---
title: Quick start
---
# Quick start

## Step 1. Install

1. Install **Ace** via **Extras → Installer** ([overview](index#installation))
2. Clear the MODX cache
3. Ensure plugin **Ace** is active

## Step 2. Editor for elements

`which_element_editor` must be **Ace**.

Open a snippet, chunk, template, or plugin: the code field becomes Ace with highlighting.

## Step 3. Code in resources

**Context** values of `use_editor` and `which_editor` are respected:

| Goal | Settings |
| --- | --- |
| Ace in content on every resource | `use_editor = No`. Textareas with class `modx-richtext` are replaced too |
| Ace only on resources without richtext | `use_editor = Yes`, `which_editor` empty or `Ace`, richtext off |
| TinyMCE / other RTE | `use_editor = Yes`, `which_editor` is not `Ace`, richtext on |
| Plain textarea without Ace | `use_editor = Yes`, `which_editor` is not `Ace`, richtext off |

`which_editor = Ace` with `use_editor` on and richtext on does not put Ace on `#ta` by itself. Details: [Integration](integration#resources-and-rte).

## Step 4. Verify

1. Open a snippet: PHP highlighting is on
2. Press **Ctrl+Alt+H**: shortcut table
3. Type `getr` and Tab: getResources template expands (if `ace.snippets` is set)

## Checklist

- [ ] `which_element_editor = Ace`
- [ ] Snippets/chunks open in Ace
- [ ] Resource `use_editor` / `which_editor` match your setup
- [ ] Theme and font size set under namespace `ace` ([settings](settings))

## Next steps

- [System settings](settings)
- [Integration](integration): Tab snippets, Fenom/Twig mime, Ace TV
- [Keyboard shortcuts](hotkeys)
