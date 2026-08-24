---
title: System settings
description: pagebuilder namespace keys — paths, preview, resource tabs, and Collections
---
# System settings

MODX namespace: **pagebuilder**. Database key: `pagebuilder_<name>`.

<!-- ![System Settings → pagebuilder](/components/pagebuilder/screenshots/mgr-system-settings.png) -->

On install or upgrade, transport adds missing keys. Existing values are not overwritten.

## Paths and preview

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_core_path` | text | `{core_path}components/pagebuilder/` | Path to PHP core |
| `pagebuilder_assets_url` | text | `{assets_url}components/pagebuilder/` | URL for connector, preview, assets |
| `pagebuilder_preview_secret` | text | from resolver / `site_uuid` | Secret for draft preview token |
| `pagebuilder_load_frontend_css` | boolean | `1` | Register `pagebuilder-sections.css` when calling `PageBuilder` |
| `pagebuilder_preview_include_template_css` | boolean | `1` | Load template `<link rel="stylesheet">` in preview iframe |
| `pagebuilder_preview_css_urls` | textarea | empty | Extra CSS for preview (comma-separated), placeholders `{assets_url}`, etc. |

## Resource form tabs

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_resource_tab_enabled` | boolean | `0` | “Sections” tab on the resource form |
| `pagebuilder_resource_tab_parents` | text | empty | Parent IDs comma-separated. Empty when enabled = all resources |
| `pagebuilder_resource_tab_index` | number | `-1` | “Sections” tab position: `0` first, `1` second, `-1` last |
| `pagebuilder_resource_tables_tab_enabled` | boolean | `0` | “Tables” tab (resource data tables) |
| `pagebuilder_resource_tables_tab_index` | number | `-1` | “Tables” tab position |

## Collections (CMP)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_collections_enabled` | boolean | `0` | Dynamic multi-tab from CMP Collections |
| `pagebuilder_collections_modx_bridge_enabled` | boolean | `0` | Tab type `modx_collections` |

Enable only if you use Collections and configured tab config in the PageBuilder CMP.

## Snippet relation

| Setting | Snippet param | Behavior |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `load_css` | Param overrides system setting |
| — | `wrap_page` | Wrapper `<div class="pb-page">` (default follows `load_css`) |
| — | `qa_css` | Extra QA CSS for layout debugging |

Params `load_css`, `wrap_page`, `qa_css` are set on the snippet call only; they are not listed in transport properties.
