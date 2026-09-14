---
title: FAQ
description: "Common PageBuilder issues: editor, permissions, cache, Pro, and migration"
---
# FAQ

## Sections tab does not appear

1. Install **VueTools** 1.1.2+ and clear cache.
2. Set `pagebuilder_resource_tab_enabled = 1`.
3. Check that the resource matches `pagebuilder_resource_tab_parents` (empty parent list means all resources).
4. Grant the user `pagebuilder_view` and `view` on the resource.

Open the browser console: VueTools load errors show on the Sections tab.

## Site is empty but sections exist in the manager

- Did you save the MODX resource (**Save**)? Autosave writes the draft only. The snippet reads the published version.
- The template uses `[[!PageBuilder]]` with uncached `!`.
- After publish, clear MODX cache or call the snippet with `use_cache=0`.

## Draft preview does not open

- Check `pagebuilder_preview_secret` (after install the value must not be empty).
- Preview URL: `{assets_url}components/pagebuilder/preview.php`.
- The user needs `pagebuilder_view`.

## CSS on the site differs from preview

Preview loads template CSS (`pagebuilder_preview_include_template_css`) and URLs from `pagebuilder_preview_css_urls`. On the site only `pagebuilder-sections.css` loads by default. Add theme styles in the shared layout or move the needed rules.

## Pro section is gray in the palette

You need **pagebuilderpro** and an active Pro license. Commerce sections also require **miniShop3**.

## "Package provider not found" on install

Paid extra from modstore.pro: add provider `https://modstore.pro/extras/` under **Packages → Providers** before install.

## Custom section missing from the list

Register JSON via `pbOnRegisterSectionDefinitions` or import in the control panel (Pro). Check JSON syntax and unique `key`.

## UTM rules do not work

Call `[[!PageBuilderUtmSession]]` before `PageBuilder` in the same request. UTM must be in the query string on the user's first visit. In the inspector open **Visibility** (needs `pagebuilder_inspector_visibility_enabled = 1`).

## migx field has no grid

The **MIGX** package must be installed. Without it the field shows a JSON textarea. See [migx](fields/migx).

## New settings keys missing after upgrade

The resolver does not overwrite existing values (`update.settings = false`). Missing keys (breakpoints, visibility) are added by Phinx on package install or upgrade. Clear MODX cache after upgrade.

## Connector 403 or 401

The user is not logged into the manager or lacks `pagebuilder_view` / `pagebuilder_save` for the processor being called.

## Quiz or contact_form form unavailable

You need **FetchIt**. Without it the section shows lexicon message `pagebuilder_fe_form_unavailable`. Email recipient: **Notify email** on the section or system setting `emailsender`.

Setup: [quiz](sections/quiz), [contact_form](sections/contact_form).

## Where are logs

Enable debug related to `pagebuilder` via standard MODX log (`core/cache/logs/`). VueTools writes errors to the browser console on the Sections tab.
