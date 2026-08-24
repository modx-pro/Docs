---
title: FAQ
description: Common PageBuilder issues — editor, permissions, cache, Pro, migration
---
# FAQ

## Sections editor tab does not appear

1. **VueTools** 1.1.2+ is installed and cache is cleared.
2. `pagebuilder_resource_tab_enabled = 1`.
3. Resource matches `pagebuilder_resource_tab_parents` (or parent list is empty).
4. User has `pagebuilder_view` and `view` policy on the resource.

Check the browser console for VueTools load errors.

## Empty on site, sections exist in manager

- Was **Publish** clicked? The snippet reads `published_json`, not the draft.
- Template uses `[[!PageBuilder]]` with uncached `!`.
- Clear MODX cache after publish or call with `use_cache=0`.

## Draft preview does not open

- Check `pagebuilder_preview_secret` (not empty after install).
- Preview URL: `{assets_url}components/pagebuilder/preview.php`.
- User needs `pagebuilder_view`.

## Site CSS differs from preview

Preview loads template CSS (`pagebuilder_preview_include_template_css`) and `pagebuilder_preview_css_urls`. The frontend gets `pagebuilder-sections.css` by default. Add theme styles in the layout or copy needed rules.

## Pro section grayed out in palette

You need transport **pagebuilderpro** and a valid Pro license. Commerce sections also require **miniShop3**.

## “Package provider not found” on install

Paid transport from modstore.pro: add provider `https://modstore.pro/extras/` under **Packages → Providers** before install.

## Custom section missing from list

Register JSON via `pbOnRegisterSectionDefinitions` or CMP import (Pro). Check JSON syntax and unique `key`.

## UTM rules do not work

Call `[[!PageBuilderUtmSession]]` before `PageBuilder` in the same request. UTM must be in the query string on the user’s first hit.

## Connector 403 or 401

User is not logged into the manager or lacks `pagebuilder_view` / `pagebuilder_save` for the processor action.

## Where are logs

Enable MODX debug logging (`core/cache/logs/`). VueTools errors may appear in the browser console on the Sections tab.
