---
title: Key features
description: "PageBuilder section builder for MODX 3: editor, draft, catalog, Pro, tables, and UTM"
---

# Key features

PageBuilder builds a page from section blocks instead of the resource **Content** field. Editors work on the **Sections** tab: draft, preview, publish. Developers add custom section types, fields, and output templates and hook in via `pbOn*` events.

## Who it is for

| Role | What you get |
| --- | --- |
| **Editor** | Drag-and-drop sections, field inspector, draft, preview, publish without editing the template |
| **Junior developer** | 35 ready-made sections, 51 field types, JSON schema and Fenom in chunks without your own Vue |
| **Senior developer** | Events, custom section types, resource table data, UTM, miniShop3 and Collections integration |

## Page builder

### 1. Section editor on the resource

The **Sections** tab on the resource form and in the **PageBuilder** control panel uses one Vue bundle via [VueTools](https://docs.modx.pro/en/components/vuetools/). Add sections from the catalog, reorder by drag or Alt+↑/↓, duplicate, and copy blocks between resources. If you close the **Properties** inspector with **Cancel** right after adding a section, the draft rolls back: no empty block remains on the page.

Details: [Quick start](quick-start), [Manager and events](integration).

### 2. Draft and publish

Autosave writes the draft. Preview shows it without publishing. **Save** on the MODX resource validates fields and publishes the layout to the site. The `[[!PageBuilder]]` snippet outputs only the published version.

Storage details: [Workflow](workflow), [Developer → Data model](developer#data-model).

### 3. Free and Pro section catalog

| Layer | Sections | Examples |
| --- | --- | --- |
| **Free** | 11 | [hero](sections/hero), [richtext](sections/richtext), [gallery](sections/gallery), [faq](sections/faq), [cta](sections/cta) |
| **Pro** | 24 | [products_grid](sections/products_grid), [contact_form](sections/contact_form), [quiz](sections/quiz), [pricing_table](sections/pricing_table), [tabs](sections/tabs) |

Each section has its own page in the [catalog](sections/): why to use the block, where to place it, what to fill in the inspector, similar sections.

### 4. Inspector and 51 field types

The field schema lives in section JSON: **31 Free types** (text, repeater, migx, editorjs, image, multiselect, video…) and **20 Pro** (relation, gallery, combo, embeddedTable…). Each type has a reference page with "Why", "When to use", and "Tips".

See [Fields overview](fields/overview) and [type reference](fields/types).

## PageBuilder Pro

The `pagebuilderpro` extra adds Pro flags and extends the editor:

- Shared blocks: save as shared (immediate link), pull from another page (Link | Copy), local fields `libraryLocalFields`
- Section event journal: View / Restore (capability `versions`)
- Page templates: ordered empty sections (`pb_page_templates`)
- Examples: ready-made blocks in the catalog tab (`pagebuilder_catalog_examples_enabled`)
- Breakpoint field values: UI with `pagebuilder_responsive_editor_enabled`, output `pagebuilder_responsive_apply` (`manual` or `css`)
- Advanced fields: 20 types in the control panel (Pro group in the list). Without Pro, 31 Free types are available
- Global basket in the control panel: restore and permanent delete for sections and table rows (flag `basket`)

Commerce sections (`products_grid`, `curated_products`…) require [miniShop3](/en/components/minishop3/).

Details: [PageBuilder Pro](pro), [Agent API](agent-api) for scripts and agents.

## Data and integrations

### 5. Resource table data

The **Tables** tab on a resource stores rows in `pb_*`: filters, pagination, CSV/JSON import, row basket. The [data_table](sections/data_table) section and `PageBuilderTableRows` snippet output data on the site. The [embeddedTable](fields/embeddedTable) field connects a table by `table_key` without inline rows in document JSON.

### 6. UTM and contexts

UTM registry in the control panel, section visibility rules by tags and MODX context. The **Visibility** dialog in the inspector is enabled by `pagebuilder_inspector_visibility_enabled`. Placeholder <code v-pre>{{utm:key}}</code> in fields. Snippets `PageBuilderUtmSession` and `PageBuilderUtmUrl` for session and links.

### 7. Collections

With `pagebuilder_collections_*` enabled, Collections iframe tabs appear on the resource. The section editor and collections share one form.

### 8. Basket and undo

Page-level basket exists in Free. Global basket in the control panel is PageBuilder Pro (flag `basket`). The editor supports undo and redo. Copy sections between resources without manual JSON edits.

## Frontend output

### 9. Fenom and section chunks

Each section renders through a chunk with Fenom (pdoTools). Field data lives in `section.data`. See MODX and Fenom examples on field pages and in [Frontend output](frontend).

### 10. Snippets

| Snippet | Purpose |
| --- | --- |
| `PageBuilder` | HTML of published sections |
| `PageBuilderResource` | Sections from another resource |
| `PageBuilderSitemap` | XML sitemap for pages with sections |
| `PageBuilderTableRows` | Resource table rows |
| `PageBuilderUtmSession` / `PageBuilderUtmUrl` | UTM on the frontend |
| `PageBuilderQuiz` / `PageBuilderContactForm` | FetchIt handlers for Pro (`quiz`, `contact_form`; do not call from the template) |
| [Public API](public-api) | JSON of published sections for headless (`api.php`) |

Full list: [Snippets](snippets/).

### 11. `pbOn*` events

Plugins subscribe to save, publish, render, and Pro provider registration. Extension point without editing component core.

Event list: [Events](integration#events).

## System requirements

| | |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ |
| pdoTools | 3.0+ |
| miniShop3 | optional, for Pro commerce sections |

MODX namespace: `pagebuilder`. Pro installs as `pagebuilderpro` (Free core is pulled as a dependency).

## Where to start

1. [Installation and first resource](quick-start)
2. [System settings](settings)
3. [Section catalog](sections/)
4. [FAQ](faq)
