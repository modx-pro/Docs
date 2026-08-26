---
title: Key features
description: PageBuilder section builder for MODX 3. Editor, draft, catalog, Pro, tables, and UTM
---

# Key features

PageBuilder stores a page as a set of **sections** in a separate table `pb_pages`. Editors assemble landings and inner pages in the **Sections** tab. Developers extend the type catalog, fields, and output via chunks and `pbOn*` events. The component does not overwrite `modResource.content`.

## Who it is for

| Role | What you get |
| --- | --- |
| **Editor** | Drag-and-drop sections, field inspector, draft, preview, publish without editing the template |
| **Beginner developer** | 34 built-in sections, 50 field types, JSON schema and Fenom in chunks without custom Vue |
| **Experienced developer** | Events, custom section types, tabular resource data, UTM, miniShop3 and Collections integration |

## Page builder

### 1. Section editor on the resource

The **Sections** tab on the resource form and in the **PageBuilder** CMP share one Vue bundle via [VueTools](https://docs.modx.pro/en/components/vuetools/). Add sections from the catalog, reorder by drag or Alt+↑/↓, duplicate, and copy between resources.

See [Quick start](quick-start) and [Manager and events](integration).

### 2. Draft and publish

Draft (`draft_json`) and published version (`published_json`) are separate. Editors save draft, open signed preview, and publish when ready. Revision counters live in `pb_pages`.

On the site, `[[!PageBuilder]]` renders published sections only.

### 3. Free and Pro section catalog

| Tier | Sections | Examples |
| --- | --- | --- |
| **Free** | 11 | [hero](sections/hero), [richtext](sections/richtext), [gallery](sections/gallery), [faq](sections/faq), [cta](sections/cta) |
| **Pro** | 23 | [products_grid](sections/products_grid), [contact_form](sections/contact_form), [pricing_table](sections/pricing_table), [tabs](sections/tabs) |

Each section has a catalog page: what the block is for, where to use it, what to fill in the inspector, and related sections.

### 4. Inspector and 50 field types

Field schema lives in section JSON: **30 Free types** (text, repeater, editorjs, image, multiselect, video…) and **20 Pro** (relation, gallery, combo, embeddedTable…). Each type has a reference page with **Why**, **When to use**, and **Tips** sections.

See [Fields overview](fields/overview) and [Field types reference](fields/types).

## PageBuilder Pro

The `pagebuilderpro` transport adds capabilities and extends the editor:

- Section library: save a block, insert on another resource, edit linked copy
- Versions: document snapshots, diff, rollback
- Presets: ready-made section sets for typical landings
- Breakpoint fields: different values for desktop, tablet, and mobile
- Advanced fields: 20 types in the CMP (relation, map, table, dependent, and more; capability `advanced-fields`)
- Global CMP basket: restore or purge deleted sections and table rows (capability `basket`)

Commerce sections (`products_grid`, `curated_products`…) require [miniShop3](/en/components/minishop3/).

Details: [PageBuilder Pro](pro). [Agent API](agent-api) for scripts and agents.

## Data and integrations

### 5. Tabular resource data

The resource **Tables** tab stores rows in `pb_*`: filters, pagination, CSV/JSON import, row basket. The [data_table](sections/data_table) section and `PageBuilderTableRows` snippet render data on the site. The [embeddedTable](fields/embeddedTable) field loads a table by `table_key` without inline rows in document JSON.

### 6. UTM and contexts

UTM registry in CMP, section visibility rules by tags and MODX context. `\{\{utm:key\}\}` placeholders in fields. `PageBuilderUtmSession` and `PageBuilderUtmUrl` snippets for session and links.

### 7. Collections

With `pagebuilder_collections_*` enabled, Collections tabs with iframe appear on the resource form alongside the section editor.

### 8. Basket and undo

Per-page basket is in Free. Global CMP basket is in PageBuilder Pro (capability `basket`). Undo and redo in the editor. Copy sections between resources without hand-editing JSON.

## Front-end output

### 9. Fenom and section chunks

Each section renders through a chunk with Fenom (pdoTools). Field data is in the section data. MODX and Fenom examples are on field pages and in [Frontend output](frontend).

### 10. Snippets

| Snippet | Purpose |
| --- | --- |
| `PageBuilder` | HTML of published sections |
| `PageBuilderResource` | Sections from another resource |
| `PageBuilderSitemap` | XML sitemap for pages with sections |
| `PageBuilderTableRows` | Resource data table rows |
| `PageBuilderUtmSession` / `PageBuilderUtmUrl` | UTM on the front |

Full parameter list: [Snippets](snippets).

### 11. `pbOn*` events

Plugins hook save, publish, render, section type registration, and Pro providers. Extend PageBuilder without forking core.

Event list: [Manager and events → Events](integration#events).

## Requirements

| | |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ |
| pdoTools | 3.0+ |
| miniShop3 | optional, for Pro commerce sections |

MODX namespace: `pagebuilder`. Pro installs as transport `pagebuilderpro` (Free core is pulled in as a dependency).

## Next steps

1. [Installation and first resource](quick-start)
2. [System settings](settings)
3. [Section catalog](sections/)
4. [FAQ](faq)
