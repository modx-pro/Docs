---
title: System settings
description: "pagebuilder namespace keys: preview, tabs, visibility, responsive, Public API, REST"
---
# System settings

MODX namespace: **pagebuilder**. Database key: `pagebuilder_<name>`.

The extra manifest has **28 keys**. On install or upgrade Phinx/resolver adds missing ones. Existing values are not overwritten (`update.settings = false`).

Keys added in 1.0.3+:

| Key | Section |
| --- | --- |
| `pagebuilder_inspector_visibility_enabled` | [Editor](#editor) |
| `pagebuilder_default_breakpoint` | [Responsive](#responsive-breakpoints) |
| `pagebuilder_responsive_breakpoints` | [Responsive](#responsive-breakpoints) |
| `pagebuilder_responsive_apply` | [Responsive](#responsive-breakpoints) |

Keys added in 1.0.9–1.0.10:

| Key | Section |
| --- | --- |
| `pagebuilder_catalog_examples_enabled` | [Catalog](#catalog) |
| `pagebuilder_resource_view_mode` | [Editor](#editor) |
| `pagebuilder_responsive_editor_enabled` | [Responsive](#responsive-breakpoints) |

## Paths and preview

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_core_path` | text | `{core_path}components/pagebuilder/` | Path to component PHP core |
| `pagebuilder_assets_url` | text | `{assets_url}components/pagebuilder/` | URL for connector, preview, static assets |
| `pagebuilder_preview_secret` | text | from resolver / `site_uuid` | Secret for signing draft preview tokens |
| `pagebuilder_load_frontend_css` | boolean | `1` | Load `pagebuilder-sections.css` when the `PageBuilder` snippet runs |
| `pagebuilder_preview_include_template_css` | boolean | `1` | Pull `<link rel="stylesheet">` from the resource template into preview iframe |
| `pagebuilder_preview_css_urls` | textarea | empty | Extra CSS for preview (comma-separated), placeholders `{assets_url}` and others |

Empty `pagebuilder_preview_secret` falls back to `site_uuid`. On production set a separate secret if manager preview should not rely on a predictable UUID.

CSS order in preview iframe (`preview.php`):

1. Stylesheet from the resource template if `pagebuilder_preview_include_template_css = 1`
2. URLs from `pagebuilder_preview_css_urls` (comma or newline separated)
3. `pagebuilder-sections.css` and `pagebuilder-preview.css`

If the theme loads CSS only via Fenom or `@import` without `<link>`, add files explicitly to `preview_css_urls`. Placeholders: `{assets_url}`, `{base_url}`, `{site_url}`.

## Resource form tabs {#resource-form-tabs}

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_resource_tab_enabled` | boolean | `0` | Sections tab on the resource form |
| `pagebuilder_resource_tab_parents` | text | empty | Parent IDs comma-separated. Empty with tab enabled = all resources |
| `pagebuilder_resource_tab_index` | number | `-1` | Sections tab position: `0` first, `1` second, `-1` last |
| `pagebuilder_resource_tables_tab_enabled` | boolean | `0` | Tables tab (resource table data) |
| `pagebuilder_resource_tables_tab_index` | number | `-1` | Tables tab position |

## Collections (control panel) {#collections-cmp}

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_collections_enabled` | boolean | `0` | Dynamic tab set from Collections. Needs capability `collections` (Pro). Without it the tabs are absent |
| `pagebuilder_collections_modx_bridge_enabled` | boolean | `0` | Tab type `modx_collections` |

Enable only with PageBuilder Pro, after you configured tabs in the control panel. Details: [Control panel → Collections](cmp#collections).

## Resource table data

Tables tab on the resource (`pagebuilder_resource_tables_tab_enabled`) or `table` tab type in Collections.

| Processor | Purpose |
| --- | --- |
| `mgr/datatable/list` | Resource tables |
| `mgr/datatable/rows/list` | Rows: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | Row CRUD |

JSON filters by column: `{ "price": { "op": "gte", "value": "10" } }`. Operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`.

On the site: `PageBuilderTableRows` snippet, [data_table](sections/data_table) section. Details: [Developer](developer#resource-data-tables).

## Editor {#editor}

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_fake_enabled` | boolean | `0` | **Fake** button in section inspector: fills fields with deterministic demo data (`mgr/section/fake`) |
| `pagebuilder_inspector_visibility_enabled` | boolean | `0` | **Visibility** button in inspector: conditions, contexts, UTM, context copy dialog. Off by default: editor sees content fields only |
| `pagebuilder_resource_view_mode` | text | `editorial` | Section list on **Sections** tab: `editorial` or `table`. Manager can override with toolbar toggle (value in `localStorage`) |

## Catalog {#catalog}

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_catalog_examples_enabled` | boolean | `1` | **Examples** tab in section catalog (Pro JSON presets). Turn off to hide without deleting package files. Toggle also in CMP **Section types** with capability `presets` (`mgr/config/save`) |

## Responsive breakpoints {#responsive-breakpoints}

Screen thresholds for fields with `responsive: true` and preview iframe width in the manager.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_responsive_editor_enabled` | boolean | `0` | Button and tabs for different field values on desktop / tablet / mobile in the inspector. Off by default. Saved breakpoint maps on the site work until the editor saves the field as a single value |
| `pagebuilder_default_breakpoint` | text | `desktop` | Key from breakpoints JSON when `responsive_apply=manual`, if no `?pb_bp=` |
| `pagebuilder_responsive_breakpoints` | textarea | desktop / tablet / mobile JSON | Array `{ key, minWidth, previewWidth, label }`. Section type can override with `responsiveBreakpoints` |
| `pagebuilder_responsive_apply` | text | `manual` | `manual`: one value on the site (SEO-safe). `css`: all values in HTML + media queries. In chunks for such fields use `{$title\|pb_text}` instead of `\|escape` |

Default JSON example:

```json
[
  { "key": "desktop", "minWidth": 1024, "previewWidth": 1280, "label": "Desktop" },
  { "key": "tablet", "minWidth": 768, "previewWidth": 768, "label": "Tablet" },
  { "key": "mobile", "minWidth": 0, "previewWidth": 390, "label": "Mobile" }
]
```

Field data details: [Fields overview → responsive](fields/overview#pro-responsive).

## Public API {#public-api}

Read-only JSON for headless frontends. Details: [Public API](public-api).

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_public_api_enabled` | boolean | `0` | Enable `assets/components/pagebuilder/api.php` |
| `pagebuilder_public_api_key` | text | empty | API key. Empty: requests without key (dev only) |
| `pagebuilder_public_api_cors_origins` | textarea | `*` | Allowed CORS origins for browser requests |

## REST API v1 {#rest-api}

Pro read-only transport. Details: [REST API v1](rest-api). Issue tokens on the CMP **API tokens** tab. Do not edit the JSON by hand.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| `pagebuilder_rest_api_enabled` | boolean | `0` | Enable `assets/components/pagebuilder/api/v1.php`. Requires PageBuilder Pro |
| `pagebuilder_rest_token_pepper` | text | empty | Pepper for the token SHA-256 hash. Empty means `site_id` |
| `pagebuilder_rest_tokens` | textarea | `[]` | Token JSON without secrets (`prefix` and `hash`) |
| `pagebuilder_rest_throttle_per_minute` | number | `120` | Request limit per token prefix. `0` disables the limit |

## Snippet relation {#snippet-relation}

| Setting | Snippet parameter | Behavior |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `load_css` | Parameter overrides system setting |
| — | `wrap_page` | Wrap in `<div class="pb-page">` (default same as `load_css`) |

Parameters `load_css` and `wrap_page` are set only on snippet call; they are not listed in snippet properties.
