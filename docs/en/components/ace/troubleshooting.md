---
title: Troubleshooting
---
# Troubleshooting

Common Ace issues and what to check.

## Editor does not appear on snippet / chunk

1. Plugin **Ace** is enabled
2. `which_element_editor = Ace`
3. Manager cache cleared
4. No 404 for `assets/components/ace/` in the browser console

## Resource shows textarea or TinyMCE instead of Ace

Expected with another RTE setup:

- `use_editor = Yes` and `which_editor` ≠ Ace → Ace does **not** claim `#ta`
- richtext on → the selected RTE runs

For Ace in content: `use_editor = No` or `which_editor = Ace`. [Integration](integration#resources-and-rte).

Check **context** values of `use_editor` / `which_editor`, not only globals.

## Fullscreen covered by MODX 3 panels

Upgrade Ace to **1.9.9+**: the editor moves to `document.body` with a proper z-index. On 3.1+ insets keep the manager header visible.

## Ctrl+S in fullscreen saves stale text

Fixed in **1.9.10**: the hidden field stays in the form; `getValue()` runs before submit. Upgrade the package.

## CSS comments highlight as `<!--` instead of `//`

In **1.9.10** MODX mixed mode applies only to HTML/Smarty/Twig mimes. Upgrade or do not force HTML mime on CSS chunks.

## Tab snippets do not expand

1. `ace.snippets` is not empty (after 1.9.10 defaults are written when empty)
2. Cursor after the snippet name, then **Tab**
3. Definitions use a real Tab (**Alt+09**), not spaces

## Draft is not offered

`ace.draft_restore = Yes`. Empty drafts are hidden. Successful save clears the draft. TTL: 7 days. Data lives only in the user’s browser (localStorage).

## Install / Zip / preserved errors

On **1.9.7+** PREEXISTING_MODE = REMOVE_PREEXISTING. Upgrade Ace or remove a broken `.preserved.zip` and retry.

## PHP worker complains about `??`

Fixed in **1.9.9** (ace-builds worker 1.37.5). Upgrade the package.

## FAQ

### Ace and TinyMCE together?

Yes. TinyMCE (or another RTE) for richtext resources, Ace for elements. Since 1.9.10 Ace does not claim `#ta` when `which_editor` ≠ Ace.

### Do I need composer on the server?

No for production. `composer` / `npm test` are for package development only.

### Material-like theme?

[FAQ: MODX Ace Material Theme](/en/faq/ace/modx-ace-material-theme).

## Related

- [Quick start](quick-start)
- [Integration](integration)
- [System settings](settings)
