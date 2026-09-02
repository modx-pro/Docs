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
    ],
  },
  {
    text: 'Field types',
    link: 'fields/types',
    items: [
      { text: 'Fields overview', link: 'fields/overview' },
      { text: 'Field types reference', link: 'fields/types' },
      {
        text: 'Free',
        link: 'fields/types',
        items: [
          { text: 'ace', link: 'fields/ace' },
          { text: 'button', link: 'fields/button' },
          { text: 'checkbox', link: 'fields/checkbox' },
          { text: 'checkboxgroup', link: 'fields/checkboxgroup' },
          { text: 'color', link: 'fields/color' },
          { text: 'colorpalette', link: 'fields/colorpalette' },
          { text: 'date', link: 'fields/date' },
          { text: 'datetime', link: 'fields/datetime' },
          { text: 'editorjs', link: 'fields/editorjs' },
          { text: 'file', link: 'fields/file' },
          { text: 'heading', link: 'fields/heading' },
          { text: 'hidden', link: 'fields/hidden' },
          { text: 'image', link: 'fields/image' },
          { text: 'multiselect', link: 'fields/multiselect' },
          { text: 'number', link: 'fields/number' },
          { text: 'radio', link: 'fields/radio' },
          { text: 'readonly', link: 'fields/readonly' },
          { text: 'repeater', link: 'fields/repeater' },
          { text: 'resourcelist', link: 'fields/resourcelist' },
          { text: 'richtext', link: 'fields/richtext' },
          { text: 'select', link: 'fields/select' },
          { text: 'slug', link: 'fields/slug' },
          { text: 'text', link: 'fields/text' },
          { text: 'textarea', link: 'fields/textarea' },
          { text: 'time', link: 'fields/time' },
          { text: 'toggle', link: 'fields/toggle' },
          { text: 'url', link: 'fields/url' },
          { text: 'video', link: 'fields/video' },
          { text: 'xtype', link: 'fields/xtype' },
          { text: 'yesno', link: 'fields/yesno' },
        ],
      },
      {
        text: 'Pro',
        link: 'fields/types',
        items: [
          { text: 'chunk', link: 'fields/chunk' },
          { text: 'combo', link: 'fields/combo' },
          { text: 'currency', link: 'fields/currency' },
          { text: 'dependent', link: 'fields/dependent' },
          { text: 'embeddedTable', link: 'fields/embeddedTable' },
          { text: 'fieldset', link: 'fields/fieldset' },
          { text: 'gallery', link: 'fields/gallery' },
          { text: 'imask', link: 'fields/imask' },
          { text: 'jsongrid', link: 'fields/jsongrid' },
          { text: 'keyvalue', link: 'fields/keyvalue' },
          { text: 'map', link: 'fields/map' },
          { text: 'multicombo', link: 'fields/multicombo' },
          { text: 'multirelation', link: 'fields/multirelation' },
          { text: 'relation', link: 'fields/relation' },
          { text: 'snippet', link: 'fields/snippet' },
          { text: 'table', link: 'fields/table' },
          { text: 'tablecombo', link: 'fields/tablecombo' },
          { text: 'tablemulticombo', link: 'fields/tablemulticombo' },
          { text: 'tag', link: 'fields/tag' },
          { text: 'tv', link: 'fields/tv' },
        ],
      },
    ],
  },
  {
    text: 'Section catalog',
    link: 'sections/',
    items: [
      { text: 'Catalog overview', link: 'sections/' },
      {
        text: 'Free',
        link: 'sections/',
        items: [
          { text: 'Call to action', link: 'sections/cta' },
          { text: 'Cards', link: 'sections/cards' },
          { text: 'Contact', link: 'sections/contact' },
          { text: 'FAQ', link: 'sections/faq' },
          { text: 'Gallery', link: 'sections/gallery' },
          { text: 'Hero', link: 'sections/hero' },
          { text: 'Image', link: 'sections/image' },
          { text: 'Rich text', link: 'sections/richtext' },
          { text: 'Spacer', link: 'sections/spacer' },
          { text: 'Stats', link: 'sections/stats' },
          { text: 'Testimonials', link: 'sections/testimonials' },
        ],
      },
      {
        text: 'Pro',
        link: 'sections/',
        items: [
          { text: 'Blog posts', link: 'sections/blog_posts' },
          { text: 'Brands row', link: 'sections/brands_row' },
          { text: 'Categories row', link: 'sections/categories_row' },
          { text: 'Contact form', link: 'sections/contact_form' },
          { text: 'Contact with map', link: 'sections/contact_map' },
          { text: 'Curated products', link: 'sections/curated_products' },
          { text: 'Data table', link: 'sections/data_table' },
          { text: 'Features', link: 'sections/features' },
          { text: 'Gallery carousel', link: 'sections/gallery_carousel' },
          { text: 'Logo cloud', link: 'sections/logos' },
          { text: 'Map', link: 'sections/map' },
          { text: 'Pricing table', link: 'sections/pricing_table' },
          { text: 'Product comparison', link: 'sections/product_comparison' },
          { text: 'Product spotlight', link: 'sections/product_spotlight' },
          { text: 'Products carousel', link: 'sections/products_carousel' },
          { text: 'Products grid', link: 'sections/products_grid' },
          { text: 'Promo banner', link: 'sections/promo_banner' },
          { text: 'Related products', link: 'sections/related_products' },
          { text: 'Spec table', link: 'sections/spec_table' },
          { text: 'Structured content', link: 'sections/structured_content' },
          { text: 'Tabs', link: 'sections/tabs' },
          { text: 'Team', link: 'sections/team' },
          { text: 'Video', link: 'sections/video' },
        ],
      },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---
# PageBuilder

![Sections tab on a resource](/components/pagebuilder/screenshots/mgr-sections-tab.png)

You build the page from sections in the **Sections** tab in MODX. While you edit, changes stay as a draft. After **Publish**, the same layout goes live. The resource **Content** field is not used for sections. On the storefront, the `PageBuilder` snippet renders the blocks.

Sidebar groups: getting started, editor, frontend, Pro, developer notes, plus separate lists of [field types](fields/types) and [sections](sections/). Start here: [Quick start](quick-start).

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
