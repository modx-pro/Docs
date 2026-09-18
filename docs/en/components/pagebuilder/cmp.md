---
title: PageBuilder control panel
description: "Blocks, UTM, Collections, Forms, Bundle, API tokens, and the PageBuilder basket"
---

# PageBuilder control panel

**Components → PageBuilder** (`SectionTypesManager.vue`). Permission **pagebuilder_manage_types** is required for the Blocks tab. Other control panel tabs use standard manager permissions.

Four Free tabs plus Pro registries:

| Tab | Layer | Purpose |
| --- | --- | --- |
| **Blocks** | Free | UI builder for section types (`pb_section_types`) |
| **UTM** | Free | Global UTM parameter registry (`pb_utm_params`) |
| **Collections** | Free | Resource form tab sets by template (`pb_collections`) |
| **Basket** | Pro | Global basket for deleted sections and table rows |
| **Page templates** | Pro | Empty section skeletons (`pb_page_templates`), capability `page-templates` |
| **Forms** | Pro | Schemas for [form builder](sections/form_builder), capability `forms` |
| **Bundle** | Pro | Export and import of UI section types |
| **API tokens** | Pro | Bearer tokens for [REST API v1](rest-api) |

![PageBuilder control panel](/components/pagebuilder/screenshots/mgr-cmp-index.png)

## Blocks

CRUD section types without PHP deploy. Built-in JSON from `core/components/pagebuilder/sections/*.json` can be edited, hidden, and restored in the catalog via the control panel.

Filter by source (chips, choice persists in the browser):

| Chip | Shows |
| --- | --- |
| **All** | Package and custom types |
| **From package** | Types from package JSON (and their DB UI overrides) |
| **Mine** | Types created in the control panel |

**Hide presets** bulk-hides package types (`published = 0` for UI overrides and custom; for code types hide still goes through lifecycle). Custom types remain. Sections on already built pages are unchanged.

On the type card, **Catalog preview**: upload a layout screenshot. In **+ Create** on the resource it replaces the package schematic image.

With capability `presets` (Pro), the **Blocks** tab has **Show examples in catalog** toggle that writes `pagebuilder_catalog_examples_enabled` via `mgr/config/save`. Same value in [system settings](settings#catalog).

| Action | What happens |
| --- | --- |
| Override | Row in `pb_section_types`, flag `overridesCode`. DB wins at runtime |
| Hide | Type hidden in resource catalog, stays in control panel with "Hidden" badge |
| Delete (code type) | Tombstone `removedCode` in DB. Package JSON is not deleted |
| Restore | Enable "Show hidden" → **Restore** |

On extra upgrade, `pb_section_types` rows are **not overwritten**: DB wins. User system settings are not reset either (`update.settings = false`). Sections on already published pages keep rendering.

Connector `mgr/sectiontype/remove` accepts POST parameter `lifecycle`: `hide`, `remove`, `restore` (not the connector `action`). Bulk hide passes array `keys`.

JSON schema details: [Developer → Section definition](developer#section-definition).

<!-- ![Section types in control panel](/components/pagebuilder/screenshots/mgr-cmp-section-types.png) -->

## UTM

Parameters for <code v-pre>{{utm:key}}</code> placeholders and default values. Section **visibility** rules are set in the **Visibility** dialog on the resource inspector (`settings.utm`) when `pagebuilder_inspector_visibility_enabled` is on. Not on this tab.

Frontend UTM session: [PageBuilderUtmSession](snippets/PageBuilderUtmSession) before `PageBuilder`. Links: [Snippets](snippets/).

## Collections {#collections}

A collection binds to `template_ids` (empty list means all templates). With `pagebuilder_collections_enabled = 1`, legacy tabs `resource_tab_enabled` and `resource_tables_tab_enabled` are replaced by the dynamic set from the control panel.

### Tab types (`tab_type`)

| Type | Behavior on resource |
| --- | --- |
| `sections` | Sections tab (Vue `pagebuilder-resource`) |
| `table` | Resource table data (`table_key` optional) |
| `resources` | Child resources |
| `empty` | Placeholder (`config.message`) |
| `modx_collections` | MODX Collections integration (`pagebuilder_collections_modx_bridge_enabled`) |
| `iframe` | URL in `<iframe>` |

Collection CRUD and tab resolution for a template: `mgr/collection/list`, `save`, `remove`, `resolve`.

Settings: [System settings → Collections](settings#collections-cmp).

## Basket (Pro) {#basket-pro}

Flag `basket`. Page basket in the resource draft remains in Free.

Index of sections from `draft.trash[]` and table rows on delete. Sync on `pbOnAfterSave`. On resource `OnEmptyTrash`, index rows for that `resource_id` are removed.

| Action | Purpose |
| --- | --- |
| `mgr/basket/list` | List (`item_type`, pagination) |
| `mgr/basket/restore` | Restore section or table row |
| `mgr/basket/purge` | Remove entry from index |
| `mgr/basket/restoreall` / `purgeall` | Bulk ops on array `ids` |

| Where | What it does |
| --- | --- |
| Resource editor → **Basket** | On page: restore and permanent delete in draft (Free) |
| Control panel → **Basket** | Cross-resource: list, restore to source resource, permanent delete (Pro) |

Restore from the control panel inserts the section at `settings._trashIndex`, same as the page basket.

## Forms {#forms}

Capability `forms`. On this tab you create a schema with a key and fields. On the page, [form builder](sections/form_builder) selects that key. Submit goes through FetchIt and the `PageBuilderFormBuilder` snippet.

The server checks CSRF and the `nospam` honeypot. Email and webhook leave synchronously after commit, in the same HTTP request. Submissions are not stored. Form v1 does not accept a file. Processors: `mgr/form/*`.

## Bundle {#bundle}

Export UI section types, dry-run, and import in one transaction through `UiSectionTypeService`.

1. On the source site open **Bundle** and export JSON.
2. On the target site paste the JSON and run dry-run.
3. The plan shows `create`, `update`, or `conflict`. A conflict is not imported.
4. Import applies create and update.

Bundle v1 does not include secrets, tokens, page content, table rows, forms, or datasources. Processors: `mgr/bundle/*`.

## API tokens {#api-tokens}

Capability `api`. A new token gets a name and scopes `pages.read` and `catalog.read`. The secret is shown once. System setting `pagebuilder_rest_tokens` keeps `prefix` and the hash.

A revoked token returns `401`. Enable the transport with `pagebuilder_rest_api_enabled`. Routes: [REST API v1](rest-api). Processors: `mgr/resttoken/*`.

## Related pages

- [Workflow](workflow)
- [PageBuilder Pro](pro)
- [Manager and events](integration)
