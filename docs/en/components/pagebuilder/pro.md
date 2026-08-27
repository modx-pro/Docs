---
title: PageBuilder Pro
description: Pro flags, section library, versions, presets, and connector actions
---

# PageBuilder Pro

The **pagebuilderpro** extra extends the Free editor. On install it pulls in **pagebuilder** core as a dependency.

## Pro flags

`ProFeatureProvider` registers license and feature flags. The Vue editor reads the list from `PageBuilderConfig.capabilities`.

| Flag | Purpose |
| --- | --- |
| `pro` | Pro license |
| `library` | Section library: save, link, insert, edit master (`pb_library_items`) |
| `versions` | Page publish history, restore, section event log |
| `responsive` | Field values per desktop, tablet, and mobile (text, textarea, url, number, currency, richtext, slug) |
| `conditions` | `settings.conditions` and evaluator (loggedIn, guest, context, GET, …) |
| `presets` | Ready-made presets in the section catalog |
| `i18n-copy` | Copy section between contexts |
| `advanced-fields` | 20 field types in CMP (Pro group in the list). Without Pro, 30 Free types are available |
| `basket` | Global CMP basket (`mgr/basket/*`) |
| `api` | [Agent API](agent-api): snapshot and apply sections |

Module `pro-resource.min.js` on the resource tab adds **Library** and **History** panels in the sidebar.

## Pro sections

Definitions live in `pagebuilderpro/sections/`, chunk name is `pagebuilderpro_{key}`. Register new types via plugin on `pbOnRegisterSectionDefinitions`.

| Group | Example keys |
| --- | --- |
| Universal | features, video, team, tabs |
| Extras | map, contact_map, logos, blog_posts |
| Commerce | products_grid, categories_row, product_spotlight |

Storefront sections require **miniShop3** (`requires: ["pro", "minishop3"]`). Site catalog: [Pro sections](sections/).

## Section library

Save a block from the editor to the library, insert on another resource, or link to a master copy. At render time, master data merges into linked instances.

## Versions and history

Snapshots of the published document, version diff, rollback to draft. Each section has its own event log.

## Presets

Ready-made section sets for typical landings in the add-section catalog.

## Connector actions (Pro)

All requests are POST to `assets/components/pagebuilder/connector.php` with `action=mgr/...`, same as the Vue editor.

| Action | Purpose |
| --- | --- |
| `mgr/library/list` | List library items |
| `mgr/library/save` | Save or update an item |
| `mgr/library/remove` | Remove an item |
| `mgr/library/adjustusage` | Library item usage counter |
| `mgr/versions/list` | List page versions |
| `mgr/versions/get` | One document version |
| `mgr/versions/restore` | Roll draft back to a version |
| `mgr/sectionevents/list` | Section event log list |
| `mgr/sectionevents/get` | One log entry |
| `mgr/sectionevents/record` | Append log entry |
| `mgr/sectionevents/restore` | Restore section state from log |
| `mgr/presets/list` | List presets |
| `mgr/basket/*` | [Global CMP basket](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/ms3/products/search` | Product search for commerce sections |
| `mgr/ms3/categories/search` | miniShop3 category search (parent in grids and carousels) |

## Related pages

- [Agent API](agent-api)
- [CMP](cmp)
- [Developer](developer)
- [Key features](key-features#pagebuilder-pro)
