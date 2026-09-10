---
title: PageBuilder Pro
description: Pro flags, Shared blocks, versions, Examples, and connector actions
---

# PageBuilder Pro

The **pagebuilderpro** extra extends the Free editor. On install it pulls in **pagebuilder** core as a dependency. Current line: **1.0.4-beta**, requires `pagebuilder` ≥ **1.0.5**.

## Pro flags

`ProFeatureProvider` registers license and feature flags. The Vue editor reads the list from `PageBuilderConfig.capabilities`.

| Flag | Purpose |
| --- | --- |
| `pro` | Pro license |
| `library` | Shared blocks: save, link, insert, edit master (`pb_library_items`) |
| `versions` | Page publish history, restore, section event log |
| `responsive` | Field values per desktop, tablet, and mobile (text, textarea, url, number, currency, richtext, slug) |
| `conditions` | `settings.conditions` and evaluator (loggedIn, guest, context, GET, …) |
| `presets` | **Examples** tab in the add-section catalog (sample-filled blocks) |
| `i18n-copy` | Copy section between contexts |
| `advanced-fields` | 20 field types in CMP (Pro group in the list). Without Pro, 31 Free types are available |
| `basket` | Global CMP basket (`mgr/basket/*`) |
| `api` | [Agent API](agent-api): snapshot and apply sections |

Module `pro-resource.min.js` on the resource tab adds **Shared blocks** and **History** panels in the sidebar.

## Pro sections

Definitions live in `pagebuilderpro/sections/`, chunk name is `pagebuilderpro_{key}`. Register new types via plugin on `pbOnRegisterSectionDefinitions`.

| Group | Example keys |
| --- | --- |
| Universal | features, video, team, tabs |
| Extras | map, contact_map, logos, blog_posts |
| Commerce | products_grid, categories_row, product_spotlight |

Storefront sections require **miniShop3** (`requires: ["pro", "minishop3"]`). Site catalog: [Pro sections](sections/).

## Shared blocks

Save a block from the editor as a shared item, insert on another resource, or link to a master copy. At render time, master data merges into linked instances. The add-section catalog shows the **Shared blocks** tab only when at least one item is saved.

## Versions and history

Snapshots of the published document, version diff, rollback to draft. Each section has its own event log.

## Examples

The **Examples** tab in the add-section catalog: ready-made blocks with sample text (capability `presets`, `mgr/presets/list`). You can edit fields after insert. The connector action is still named `presets`.

## Connector actions (Pro)

All requests are POST to `assets/components/pagebuilder/connector.php` with `action=mgr/...`, same as the Vue editor.

| Action | Purpose |
| --- | --- |
| `mgr/library/list` | List shared-block items |
| `mgr/library/save` | Save or update an item |
| `mgr/library/remove` | Remove an item |
| `mgr/library/adjustusage` | Shared-block usage counter |
| `mgr/versions/list` | List page versions |
| `mgr/versions/get` | One document version |
| `mgr/versions/restore` | Roll draft back to a version |
| `mgr/sectionevents/list` | Section event log list |
| `mgr/sectionevents/get` | One log entry |
| `mgr/sectionevents/record` | Append log entry |
| `mgr/sectionevents/restore` | Restore section state from log |
| `mgr/presets/list` | List examples for the catalog tab |
| `mgr/basket/*` | [Global CMP basket](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/ms3/products/search` | Product search for commerce sections |
| `mgr/ms3/categories/search` | miniShop3 category search (parent in grids and carousels) |

## Related pages

- [Agent API](agent-api)
- [CMP](cmp)
- [Developer](developer)
- [Workflow](workflow)
