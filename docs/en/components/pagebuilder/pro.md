---
title: PageBuilder Pro
description: "Pro flags, library pull, page templates, section journal, and connector actions"
---

# PageBuilder Pro

The **pagebuilderpro** extra extends the free editor. On install it pulls **pagebuilder** core as a dependency. Current line: **1.0.12-beta**, requires `pagebuilder` ≥ **1.0.12**.

## Pro flags

`ProFeatureProvider` registers license and feature flags. The Vue editor reads the list from `PageBuilderConfig.capabilities`.

| Flag | Purpose |
| --- | --- |
| `pro` | Pro license |
| `library` | Shared blocks: save/link/insert/edit master, pull from another page, write-through (`pb_library_items`) |
| `versions` | Section event journal (create/update/copy/remove/enable/disable) + View / Restore |
| `page-templates` | Page templates: ordered empty sections (`pb_page_templates`, `mgr/pagetemplate/*`) |
| `responsive` | Separate field values for desktop, tablet, and mobile (text, textarea, url, number, currency, richtext, slug) |
| `conditions` | `settings.conditions` and evaluator (loggedIn, guest, context, GET, …) |
| `presets` | **Examples** tab in catalog (hidden when `pagebuilder_catalog_examples_enabled = 0`) |
| `i18n-copy` | Copy section between contexts |
| `advanced-fields` | 27 field types in control panel (Pro group in list). Without Pro, 35 Free types |
| `basket` | Global basket in control panel (`mgr/basket/*`) |
| `utm` | New UTM rules and the registry. Already published rules still run in Free |
| `datasources` | [Dynamic list](sections/dynamic_list) and [Filterable grid](sections/filterable_grid): providers `modx-resources`, `pagebuilder-tables`, `minishop3`, `mgr/datasource/*` |
| `forms` | CMP Forms, [form builder](sections/form_builder), FetchIt, CSRF, honeypot. Email and webhook after commit. Submissions are not stored |
| `api` | [Agent API](agent-api) and [REST v1](rest-api) tokens (`mgr/resttoken/*`, API tokens tab) |

Module `pro-resource.min.js` on the resource tab adds **Inherit / Library** panel in the sidebar column. Section history opens from the row context menu.

## Pro sections

Definitions live in `pagebuilderpro/sections/`, chunk name `pagebuilderpro_{key}`. New types register via plugin on `pbOnRegisterSectionDefinitions`.

| Group | Example keys |
| --- | --- |
| General | features, team, tabs |
| Content and conversion | pricing_table, contact_form, quiz, spec_table, how_it_works, case_study, newsletter, accordion |
| Additional | map, contact_map, logos, blog_posts, timeline, portfolio, downloads, locations |
| Datasources and forms | dynamic_list, filterable_grid, form_builder |
| Commerce | products_grid, categories_row, product_spotlight, promo_banner |

Storefront sections require **miniShop3** (`requires: ["pro", "minishop3"]`). Site catalog: [Pro sections](sections/).

[quiz](sections/quiz) and [contact_form](sections/contact_form) sections need **FetchIt** on the frontend.

## Shared blocks {#shared-blocks}

A block from the editor can be saved as shared. After **Save as shared** the section on the current page is immediately linked to the new master (`libraryLocalFields: []`).

| Action | Behavior |
| --- | --- |
| Catalog → **Shared blocks** → Insert | Insert linked or copy from master |
| Menu → **Pull from another page** | `mgr/library/pull`: **Link** or **Copy** mode |
| Local fields checklist | `settings.libraryLocalFields` in inspector |
| Page save / publish | Write-through synced fields to master on server (`pbOnBeforeSave`) |

**Pull** reads the source **draft**. **Link** creates or reuses master, sets `libraryId` on source and inserts linked section on target. **Copy** adds sections without a link.

On render, master merge + local fields from `libraryLocalFields`. Without the key in settings the old overlay remains (local keys override master). After Library write, HTML cache `pagebuilder/*` is cleared.

**Shared blocks** catalog tab is visible even when the list is empty.

## Section event journal

Capability `versions` is a **journal of events for one section**, not snapshots of the whole page. From row menu: View / Restore (`mgr/sectionevents/*`). Page-level UI `mgr/versions/*` is not in the current line.

## Page templates

Capability `page-templates`. Named skeleton: ordered list of section types **without content** (`pb_page_templates`).

| Where | What it does |
| --- | --- |
| CMP → **Page templates** | CRUD: name, MODX template IDs, type order, default |
| Editor → **Save as template** | Takes only `type` / `typeVersion` from current page |
| Empty outline | "Apply …" buttons for matching templates |

Apply writes draft via `mgr/pagetemplate/apply` (non-empty draft needs `force`).

## Examples

**Examples** tab in add catalog: ready blocks with text (capability `presets`, `mgr/presets/list`). After insert you can edit fields. Hide without deleting JSON: `pagebuilder_catalog_examples_enabled` or toggle in CMP Blocks.

## Constructor Bundle

**Bundle** tab: export, dry-run (`create`, `update`, `conflict`), and import of UI types in one transaction through `UiSectionTypeService`. A conflict is not imported. Details: [Control panel](cmp#bundle).

Bundle v1 must not include secrets, tokens, page content, or table rows. Forms and datasources are not part of this format.

## Connector actions (Pro)

All requests are POST to `assets/components/pagebuilder/connector.php` with `action=mgr/...`, same as the Vue editor.

| Action | Purpose |
| --- | --- |
| `mgr/library/list` | Library item list |
| `mgr/library/save` | Save or update item |
| `mgr/library/remove` | Delete item |
| `mgr/library/adjustusage` | Library item usage counter |
| `mgr/library/pull` | Pull sections from another page (link \| copy) |
| `mgr/sectionevents/list` | Section event journal |
| `mgr/sectionevents/get` | One journal entry / section snapshot |
| `mgr/sectionevents/record` | Add journal entry (internal / tests) |
| `mgr/sectionevents/restore` | Restore section state from journal |
| `mgr/pagetemplate/list` / `get` / `save` / `remove` | Page template CRUD |
| `mgr/pagetemplate/apply` | Apply template to draft |
| `mgr/presets/list` | Example list for catalog tab |
| `mgr/basket/*` | [Global basket in control panel](cmp#basket-pro) |
| `mgr/api/page/snapshot` / `apply` | [Agent API](agent-api) |
| `mgr/datasource/*` | Datasource preview |
| `mgr/form/*` | CMP Forms |
| `mgr/bundle/*` | Export, dry-run, and import of UI types |
| `mgr/resttoken/*` | [REST API v1](rest-api) tokens |
| `mgr/ms3/products/search` | Product search for commerce sections |
| `mgr/ms3/categories/search` | miniShop3 category search (parent in grids and carousels) |

## Related pages

- [Agent API](agent-api)
- [Control panel](cmp)
- [Developer](developer)
- [Key features](key-features#pagebuilder-pro)
