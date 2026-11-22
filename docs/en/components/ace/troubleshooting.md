---
title: Troubleshooting
---
# Troubleshooting

## Editor does not appear on snippet / chunk

1. Plugin **Ace** is enabled
2. `which_element_editor = Ace`
3. Manager cache cleared
4. No 404 for `assets/components/ace/` in the browser console

## Resource shows textarea or TinyMCE instead of Ace

Expected:

- `use_editor = Yes` and richtext on: Ace does not claim `#ta`. The package has no RTE initializer of its own
- `use_editor = Yes` and `which_editor` is not `Ace`: a resource without richtext keeps a plain textarea

To put Ace on content for every resource, set `use_editor = No`. [Integration](integration#resources-and-rte).

Check **context** values of `use_editor` / `which_editor`, not only globals.

## Fullscreen covered by MODX 3 panels

Upgrade Ace to **1.9.11**: the editor moves to `document.body` with z-index `12000`. Insets are measured from `#modx-header` and `#modx-action-buttons`. Until that measurement runs, `top` stays `60px` and `left` stays `70px`.

## Ctrl+S in fullscreen saves stale text

Fixed in **1.9.10**: the hidden field stays in the form, and `getValue()` runs before submit. Since **1.9.11**, `<?php` stays in the editor after a snippet or plugin save when MODX removed only the wrapper. Undo is not reset. After a reload the editor shows the database text, already without the wrapper.

## CSS comments highlight as `<!--` instead of `//`

In **1.9.10** MODX mixed mode applies only to HTML/Smarty/Twig mimes. Upgrade or do not force HTML mime on CSS chunks.

## Tab snippets do not expand

1. `ace.snippets` is not empty (after 1.9.10 defaults are written when empty)
2. Cursor after the snippet name, then **Tab**
3. Definitions use a real Tab (**Alt+09**), not spaces

## Draft is not offered

`ace.draft_restore = Yes`. The banner stays hidden when the draft is empty or matches the open text. A successful save clears the draft. TTL: 7 days. Data lives only in the user’s browser (localStorage).

## Install / Zip / preserved errors

On **1.9.7+** PREEXISTING_MODE = REMOVE_PREEXISTING. Upgrade Ace or remove a broken `.preserved.zip` and retry.

## PHP worker complains about `??`

Fixed in **1.9.9** (ace-builds worker 1.37.5). Upgrade the package.

## FAQ

### Ace and TinyMCE together?

Yes. Another RTE for richtext resources, Ace for elements. With `use_editor = Yes`, Ace does not claim `#ta` on a richtext resource or on a resource whose `which_editor` is not `Ace`.

### Do I need composer on the server?

No for production. `composer` / `npm test` are for package development only.

### Material-like theme?

[FAQ: MODX Ace Material Theme](/en/faq/ace/modx-ace-material-theme).

## Related

- [Quick start](quick-start)
- [Integration](integration)
- [System settings](settings)
