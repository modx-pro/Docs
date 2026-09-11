---
title: Interface
description: Areas, search, changing and saving settings, events and the classic view
---

# Interface

## Areas

On the left there is a MODX-style tree: namespaces are folders, areas are nodes, with the number of settings next to them. A click opens an area as a page of its own with its own address, for example `?a=system/settings&ns=core&area=site`. The browser's Back and Forward work, and a link to an area opens in a new tab.

The page does not reload on the way, so unsaved changes are kept. The settings of an area load when you open it, so the page opens equally fast on a site with any number of extras. Expanded folders and the tree scroll position are remembered.

## Search

The search field looks through the name, key, description and value in every namespace at once and highlights the matches. It also finds translations from lexicon files, which the core search misses.

Jump to the search field with `/` or `Ctrl+K`.

## Changing values

Every setting is a row: the name, description and key on the left, the field on the right. The field depends on the setting type:

| Type | Field |
| --- | --- |
| `combo-boolean` | Yes/No switch |
| `numberfield` | number with validation |
| `text-password` | password with a Show button |
| `textfield`, `textarea` | text field that grows with the text |
| JSON | monospace field with validation |
| core combos | list with the same options: language, context, template, media source and others |
| extras' xtypes | the extra's own component |

Core text settings with a known set of values (`log_level`, `link_tag_scheme` and others) are shown as a list. A non-standard value is kept.

A click on the key copies it.

## Saving

Changed rows are marked, and a bar with the number of changes and the Save and Discard buttons appears at the bottom. `Ctrl+S` saves too, in any keyboard layout.

Every setting is saved by the core processor, so all of the MODX logic works: the configuration is reloaded, URIs are rebuilt when `friendly_urls` changes, permissions are checked. If one setting fails, the others are still saved, and the failed one shows its message.

Leaving the page with unsaved changes asks for confirmation.

## Creating, editing and removing

The menu at the end of a row: edit, copy the key, restore the saved value and remove. The edit window changes the field type, namespace, area, name, description and value. The name and description are written to the lexicon of the manager language, and only when they were changed.

A new setting is created with the create button — the window is the same as for editing.

## Events

The Events tab lists system events by group together with the plugins subscribed to them. User events can be created and removed. Core events cannot be removed — just like in the standard grid.

## Classic view

The Classic view button opens the standard MODX grid. There, next to the Help! button, an Easy view button takes you back to EasySettings. The address `?a=system/settings&classic=1` opens the standard grid as well.

To turn EasySettings off completely, use the [`easysettings.enabled`](/en/components/easysettings/settings) setting.
