---
title: FAQ
description: "Common PageBuilder issues: editor, permissions, cache, Pro, migration"
---
# FAQ

## Sections editor tab does not appear

1. Install **VueTools** 1.1.2+ and clear the cache.
2. Set `pagebuilder_resource_tab_enabled = 1`.
3. Check that the resource matches `pagebuilder_resource_tab_parents` (empty parent list means all resources).
4. Grant the user `pagebuilder_view` and the `view` policy on the resource.

Open the browser console: VueTools load errors appear on the **Sections** tab.

## Empty on site, sections exist in manager

- Was **Publish** clicked? The snippet reads the published version, not the draft.
- Template uses `[[!PageBuilder]]` with uncached `!`.
- Clear MODX cache after publish or call with `use_cache=0`.

## Draft preview does not open

- Check `pagebuilder_preview_secret` (not empty after install).
- Preview URL: `{assets_url}components/pagebuilder/preview.php`.
- User needs `pagebuilder_view`.

## Site CSS differs from preview

Preview loads template CSS (`pagebuilder_preview_include_template_css`) and `pagebuilder_preview_css_urls`. The frontend gets `pagebuilder-sections.css` by default. Add theme styles in the layout or copy needed rules.

## Pro section grayed out in palette

You need the **pagebuilderpro** extra and a valid Pro license. Commerce sections also require **miniShop3**.

## “Package provider not found” on install

Paid extra from modstore.pro: add provider `https://modstore.pro/extras/` under **Packages → Providers** before install.

## Custom section missing from list

Register JSON via `pbOnRegisterSectionDefinitions` or CMP import (Pro). Check JSON syntax and unique `key`.

## UTM rules do not work

Call `[[!PageBuilderUtmSession]]` before `PageBuilder` in the same request. UTM must be in the query string on the user’s first hit.

## Connector 403 or 401

User is not logged into the manager or lacks `pagebuilder_view` / `pagebuilder_save` for the processor action.

## Where are logs

Enable debug logging for `pagebuilder` via standard MODX log (`core/cache/logs/`). VueTools writes errors to the browser console on the **Sections** tab.
