---
title: PageBuilder Pro
description: Pro capabilities, section library, versions, presets, and processors
---

# PageBuilder Pro

Transport **pagebuilderpro** extends the Free editor. Installed as one package: core `pagebuilder` is pulled in as a dependency.

## Capabilities

`ProFeatureProvider` registers flags. The client reads the list via `PageBuilderConfig.capabilities`.

| Capability | Purpose |
| --- | --- |
| `pro` | Base license flag |
| `library` | Reusable sections: save/link/insert/edit master (`pb_library_items`) |
| `versions` | Page publish history + restore; section event log |
| `responsive` | Breakpoint desktop / tablet / mobile for text, textarea, url, number, currency, richtext, slug |
| `conditions` | `settings.conditions` + evaluator (loggedIn, guest, context, GET, …) |
| `presets` | Ready-made section presets in the catalog |
| `i18n-copy` | Copy section between contexts |
| `advanced-fields` | 20 field types in CMP (Pro group in dropdown). Without Pro, 30 Free types are available |
| `basket` | Global CMP basket (`mgr/basket/*`) |
| `api` | [Agent API](agent-api): snapshot and apply sections |

Vue module `pro-resource.min.js` on the resource tab adds **Library** and **History** panels in the sidebar.

## Pro sections

JSON in `pagebuilderpro/sections/`. Chunk: `pagebuilderpro_{key}`. Registration via plugin on `pbOnRegisterSectionDefinitions`.

| Group | Examples |
| --- | --- |
| Universal | features, video, team, tabs |
| Extras | map, contact_map, logos, blog_posts |
| Commerce | products_grid, categories_row, product_spotlight |

Commerce requires **miniShop3** (`requires: ["pro", "minishop3"]`). Site catalog: [Pro sections](sections/).

## Section library

Save a block from the editor to the library, insert on another resource, or link to a master copy. At render time, master data merges into linked instances.

Processors: `mgr/library/list`, `save`, `remove`.

## Versions and history

Snapshots of the published document, diff, rollback to draft. Per-section event log.

Processors: `mgr/versions/list`, `get`, `restore`, `mgr/sectionevents/*`.

## Presets

Preset section sets in the add-section catalog.

Processor: `mgr/presets/list`.

## Pro processors (summary)

| Action | Purpose |
| --- | --- |
| `mgr/library/*` | Section library |
| `mgr/versions/*` | Page versions |
| `mgr/sectionevents/*` | Section log |
| `mgr/presets/list` | Presets |
| `mgr/basket/*` | [Global CMP basket](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/ms3/products/search` | Product autocomplete in commerce sections |

## Related pages

- [Agent API](agent-api)
- [CMP](cmp)
- [Developer](developer)
- [Key features](key-features#pagebuilder-pro)
