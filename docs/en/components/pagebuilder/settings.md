---
title: System settings
description: "pagebuilder namespace keys: paths, preview, resource tabs, and Collections"
---
# System settings

MODX namespace: **pagebuilder**. Database key: `pagebuilder_<name>`.

<!-- ![System Settings → pagebuilder](/components/pagebuilder/screenshots/mgr-system-settings.png) -->

On install or upgrade, the extra resolver adds missing keys. Existing values are not overwritten.

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
| `pagebuilder_resource_tables_tab_enabled` | boolean | `0` | “Tables” tab (tabular resource data) |
| `pagebuilder_resource_tables_tab_index` | number | `-1` | “Tables” tab position |

## Collections (CMP)

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_collections_enabled` | boolean | `0` | Dynamic multi-tab from CMP Collections |
| `pagebuilder_collections_modx_bridge_enabled` | boolean | `0` | Tab type `modx_collections` |

Enable only if you use Collections and configured tab config in the PageBuilder CMP. Details: [CMP → Collections](cmp#collections).

## Tabular resource data

Resource **Tables** tab (`pagebuilder_resource_tables_tab_enabled`) or tab type `table` in Collections.

| Processor | Purpose |
| --- | --- |
| `mgr/datatable/list` | Resource tables |
| `mgr/datatable/rows/list` | Rows: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | Row CRUD |

Column filter JSON: `{ "price": { "op": "gte", "value": "10" } }`. Operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`.

On the front: `PageBuilderTableRows` snippet, [data_table](sections/data_table) section. Details: [Developer](developer#resource-data-tables).

## Editor

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_fake_enabled` | boolean | `0` | **Fake** button in the section inspector: fills fields with deterministic demo data (`mgr/section/fake`) |

## Public API {#public-api}

Read-only JSON for headless frontends. Details: [Public API](public-api).

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_public_api_enabled` | boolean | `0` | Enable `assets/components/pagebuilder/api.php` |
| `pagebuilder_public_api_key` | text | empty | API key. Empty allows unauthenticated requests (dev only) |
| `pagebuilder_public_api_cors_origins` | textarea | `*` | Allowed CORS origins for browser clients |

## Snippet relation

| Setting | Snippet param | Behavior |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `load_css` | Param overrides system setting |
| — | `wrap_page` | Wrapper `<div class="pb-page">` (default follows `load_css`) |

Params `load_css` and `wrap_page` are set on the snippet call only; they are not listed in snippet properties.
