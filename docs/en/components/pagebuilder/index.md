---
title: PageBuilder
description: Visual section builder for MODX 3. Draft and publish without overwriting resource content
author: ibochkarev
dependencies: [VueTools, pdoTools]
categories: utilities

items: [
  {
    text: 'Getting started',
    link: 'quick-start',
    items: [
      { text: 'Key features', link: 'key-features' },
      { text: 'Quick start', link: 'quick-start' },
      { text: 'System settings', link: 'settings' },
    ],
  },
  {
    text: 'Editor and manager',
    link: 'workflow',
    items: [
      { text: 'Workflow', link: 'workflow' },
      { text: 'CMP', link: 'cmp' },
      { text: 'Manager and events', link: 'integration' },
    ],
  },
  {
    text: 'Frontend output',
    link: 'frontend',
    items: [
      { text: 'Template and CSS', link: 'frontend' },
      { text: 'Design system', link: 'design-system' },
      { text: 'Public API', link: 'public-api' },
      {
        text: 'Snippets',
        link: 'snippets/',
        items: [
          { text: 'Overview', link: 'snippets/' },
          { text: 'PageBuilder', link: 'snippets/PageBuilder' },
          { text: 'PageBuilderResource', link: 'snippets/PageBuilderResource' },
          { text: 'PageBuilderSitemap', link: 'snippets/PageBuilderSitemap' },
          { text: 'PageBuilderUtmSession', link: 'snippets/PageBuilderUtmSession' },
          { text: 'PageBuilderUtmUrl', link: 'snippets/PageBuilderUtmUrl' },
          { text: 'PageBuilderTableRows', link: 'snippets/PageBuilderTableRows' },
        ],
      },
    ],
  },
  {
    text: 'PageBuilder Pro',
    link: 'pro',
    items: [
      { text: 'Pro overview', link: 'pro' },
      { text: 'Agent API', link: 'agent-api' },
    ],
  },
  {
    text: 'Developer',
    link: 'developer',
    items: [
      { text: 'Sections, fields, extensions', link: 'developer' },
      { text: 'Fields overview', link: 'fields/overview' },
      { text: 'Field types reference', link: 'fields/types' },
      { text: 'Section catalog', link: 'sections/' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---
# PageBuilder

![Sections tab on a resource](/components/pagebuilder/screenshots/mgr-sections-tab.png)

You build the page from sections in the **Sections** tab in MODX. While you edit, changes stay as a draft. After **Publish**, the same layout goes live. The resource **Content** field is not used for sections. On the storefront, the `PageBuilder` snippet renders the blocks.

The sidebar groups docs by task: getting started, editor, frontend output, Pro, and developer references. Start here: [Quick start](quick-start).

## Features

### Resource editor

On the **Sections** tab you get a block table: add from the catalog, drag-and-drop and Alt+↑/↓, duplicate, copy sections from another page. Deleted sections go to the page trash; you can restore or clear them. The inspector edits content and settings. Draft preview opens in a drawer via a signed link, without publishing. Undo/redo works in the current session. Before publish, the editor validates required fields and opens the inspector on the first error.

### Draft and publish

Edits go to the draft. After **Publish**, the same layout goes live. **Unpublish** clears the published version; the draft stays. On save the server checks the revision number so concurrent edits do not overwrite each other.

### Free: sections and fields

11 built-in types: hero, richtext, gallery, faq, cta, cards, contact, stats, testimonials, image, spacer. In the CMP you can edit the catalog, hide built-in types, and add custom ones via JSON (`pagebuilder_manage_types`). 30 field types in the inspector: text, richtext, repeater, file, select, and more. Some fields support per-breakpoint values (responsive).

### PageBuilder Pro

Global section library, version snapshots and event log, presets, [Agent API](agent-api) for scripts and agents. CMP **Basket** restores deleted sections and table rows across resources. Pro catalog: features, video, team, tabs, maps, forms, miniShop3 commerce blocks (product grids, brands, pricing, and more). 20 more field types: gallery, map, relation, table, embeddedTable, and more.

### Resource tables

The **Tables** tab stores large row sets in the DB: filters, CSV/JSON import, bulk delete. On the storefront, `PageBuilderTableRows` outputs rows. The `data_table` section (Pro) embeds a small table in the section JSON.

### UTM and contexts

Set up a UTM registry in the CMP. In section settings you can limit output by MODX context and UTM. Snippets `PageBuilderUtmSession` and `PageBuilderUtmUrl` help on landing pages. Fields support the <code v-pre>{{utm:key}}</code> placeholder.

### Collections and CMP

With `collections_enabled`, resource tabs (sections, tables, iframe, and more) are configured in the CMP. **Extras → PageBuilder** lists resources with sections and manages section types.

### Snippets, Public API, and events

`PageBuilder` outputs section HTML, `PageBuilderResource` renders another resource’s sections, `PageBuilderSitemap` builds an XML sitemap. [Public API](public-api) returns published sections as JSON for headless frontends (`api.php`). `pbOn*` events hook plugins into save, publish, render, and section type registration. See [workflow](workflow), [cmp](cmp), [pro](pro).

## Requirements

| Requirement | Value |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ (manager editor) |
| pdoTools | 3.0+ (Fenom in section chunks) |
| miniShop3 | optional, for Pro catalog sections |

## Packages

| Extra | Version | Contents |
| --- | --- | --- |
| `pagebuilder` | 1.0.1-beta | Free: core, 11 sections, CMP, snippets |
| `pagebuilderpro` | 1.0.1-beta | Pro: requires `pagebuilder` ≥ 1.0.1, extended catalog and features |

MODX namespace: `pagebuilder`.

## Quick links

| Need | Document |
| --- | --- |
| Feature overview | [Key features](key-features) |
| Install and first page | [Quick start](quick-start) |
| All `pagebuilder_*` keys | [System settings](settings) |
| Draft, publish, basket | [Workflow](workflow) |
| CMP: Blocks, UTM, Collections, Pro basket | [CMP](cmp) |
| Permissions, `pbOn*` events, data model | [Manager and events](integration) |
| Template, preview, snippet cache | [Frontend output](frontend) |
| CSS tokens and section BEM | [Design system](design-system) |
| JSON for headless | [Public API](public-api) |
| Snippets and parameters | [Snippets](snippets/) |
| Pro features | [PageBuilder Pro](pro) |
| Scripts and agents | [Agent API](agent-api) |
| Custom sections and extensions | [Developer](developer) |
| 50 inspector field types | [Field types reference](fields/types) |
| 34 built-in blocks | [Section catalog](sections/) |
| Troubleshooting | [FAQ](faq) |

## Entry points

| URL / path | Purpose |
| --- | --- |
| CMP `pagebuilder` → `index` | Resource catalog with sections, section types (Pro) |
| `assets/components/pagebuilder/connector.php` | MGR API (VueTools) |
| `assets/components/pagebuilder/preview.php` | Draft preview in iframe |
| `assets/components/pagebuilder/api.php` | Public API: published sections as JSON (headless) |
| Snippet `[[!PageBuilder]]` | Published section HTML on the site |

## Permissions

| Permission | Purpose |
| --- | --- |
| `pagebuilder_view` | Sections tab, catalog, preview token |
| `pagebuilder_save` | Save draft and publish (fallback: `save_document`) |
| `pagebuilder_manage_types` | CMP “Section types” (no fallback to view) |

Access to a specific resource is also checked by MODX policy (`view`, `save`).
