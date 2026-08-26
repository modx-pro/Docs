---
title: PageBuilder CMP
description: Blocks, UTM, Collections, and global basket in the PageBuilder component
---

# PageBuilder CMP

**Components → PageBuilder** (`SectionTypesManager.vue`). Permission **pagebuilder_manage_types** is required for the Blocks tab. Other CMP tabs use standard manager permissions.

Four site-level tabs, not tied to a single resource:

| Tab | Tier | Purpose |
| --- | --- | --- |
| **Blocks** | Free | UI builder for section types (`pb_section_types`) |
| **UTM** | Free | Global UTM parameter registry (`pb_utm_params`) |
| **Collections** | Free | Resource form tab sets by template (`pb_collections`) |
| **Basket** | Pro | Global basket for deleted sections and table rows |

<!-- ![PageBuilder CMP](/components/pagebuilder/screenshots/mgr-cmp-index.png) -->

## Blocks

CRUD section types without PHP deploy. Built-in JSON from `core/components/pagebuilder/sections/*.json` can be edited, hidden, and restored in the catalog via CMP.

On transport upgrade, `pb_section_types` rows are **not overwritten**: the database wins. Hiding a built-in type creates a stub with `published = 0`. Repo JSON is not deleted. Sections on already published pages keep rendering.

JSON schema details: [Developer → Section definition](developer#section-definition).

<!-- ![Section types in CMP](/components/pagebuilder/screenshots/mgr-cmp-section-types.png) -->

## UTM

Parameters for `{{utm:key}}` placeholders and default values. Section **visibility** rules are set in the resource inspector (`settings.utm`), not on this tab.

Call `[[!PageBuilderUtmSession]]` before `PageBuilder` on the front. See [Snippets](snippets#pagebuilderutmsession).

## Collections

A collection binds to `template_ids` (empty list = all templates). When `pagebuilder_collections_enabled = 1`, legacy tabs `resource_tab_enabled` / `resource_tables_tab_enabled` are replaced by the dynamic set from CMP.

### Tab types (`tab_type`)

| Type | Behavior on resource |
| --- | --- |
| `sections` | “Sections” tab (Vue `pagebuilder-resource`) |
| `table` | Tabular resource data (`table_key` optional) |
| `resources` | Child resources |
| `empty` | Placeholder (`config.message`) |
| `modx_collections` | Bridge to MODX Collections (`pagebuilder_collections_modx_bridge_enabled`) |
| `iframe` | URL in `<iframe>` |

Processors: `mgr/collection/list`, `save`, `remove`, `resolve`.

Settings: [System settings → Collections](settings#collections-cmp).

## Basket (Pro) {#basket-pro}

Capability `basket`. Per-page basket in the resource draft stays in Free.

Indexes sections from `draft.trash[]` and table rows on delete. Syncs on `pbOnAfterSave`. On resource `OnEmptyTrash`, index entries for that `resource_id` are removed.

| Action | Purpose |
| --- | --- |
| `mgr/basket/list` | List (`item_type`, pagination) |
| `mgr/basket/restore` | Restore section or table row |
| `mgr/basket/purge` | Remove from index |
| `mgr/basket/restoreall` / `purgeall` | Bulk by `ids` array |

| Where | What it does |
| --- | --- |
| Resource editor → **Basket** | Per-page: restore / purge in draft (Free) |
| CMP → **Basket** | Cross-resource: list, restore to source resource, purge (Pro) |

CMP restore inserts the section at `settings._trashIndex`, same as per-page basket.

## Related pages

- [Workflow](workflow)
- [PageBuilder Pro](pro)
- [Manager and events](integration)
