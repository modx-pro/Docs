---
title: Quick start
---
# Quick start

Ace in the manager in a few minutes.

## Step 1. Install

1. Install **Ace** via **Extras → Installer** ([overview](index#installation))
2. Clear the MODX cache
3. Ensure plugin **Ace** is active

## Step 2. Editor for elements

System setting **which_element_editor** must be **Ace**.

Open a snippet, chunk, template, or plugin: the code field becomes Ace with highlighting.

## Step 3. Code in resources

Behavior depends on `use_editor` and `which_editor` (**context** overrides are respected):

| Goal | Settings |
| --- | --- |
| Ace in content | `use_editor = No` **or** `which_editor = Ace` |
| TinyMCE / other RTE | `use_editor = Yes`, `which_editor` ≠ Ace; enable “Use Rich Text Editor” on the resource |
| Plain textarea without Ace | `use_editor = Yes`, `which_editor` ≠ Ace, richtext off on the resource |

Since **1.9.10** Ace does not replace `#ta` when another RTE is selected. Details: [Integration](integration#resources-and-rte).

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
