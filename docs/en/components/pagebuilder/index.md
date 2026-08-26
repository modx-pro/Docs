---
title: PageBuilder
description: Visual section builder for MODX 3. Draft and publish without overwriting resource content
author: ibochkarev
dependencies: [VueTools, pdoTools]
categories: utilities

items: [
  { text: 'Key features', link: 'key-features' },
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Snippets', link: 'snippets' },
  { text: 'Frontend output', link: 'frontend' },
  { text: 'Design system', link: 'design-system' },
  { text: 'Manager and events', link: 'integration' },
  { text: 'Workflow', link: 'workflow' },
  { text: 'CMP', link: 'cmp' },
  { text: 'PageBuilder Pro', link: 'pro' },
  { text: 'Agent API', link: 'agent-api' },
  { text: 'Developer', link: 'developer' },
  {
    text: 'Fields',
    link: 'fields/overview',
    items: [
      { text: 'Overview', link: 'fields/overview' },
      { text: 'Field types reference', link: 'fields/types' },
      {
        text: 'Free',
        items: [
          { text: 'text', link: 'fields/text' },
          { text: 'textarea', link: 'fields/textarea' },
          { text: 'richtext', link: 'fields/richtext' },
          { text: 'ace', link: 'fields/ace' },
          { text: 'number', link: 'fields/number' },
          { text: 'url', link: 'fields/url' },
          { text: 'slug', link: 'fields/slug' },
          { text: 'select', link: 'fields/select' },
          { text: 'multiselect', link: 'fields/multiselect' },
          { text: 'radio', link: 'fields/radio' },
          { text: 'checkbox', link: 'fields/checkbox' },
          { text: 'checkboxgroup', link: 'fields/checkboxgroup' },
          { text: 'yesno', link: 'fields/yesno' },
          { text: 'toggle', link: 'fields/toggle' },
          { text: 'date', link: 'fields/date' },
          { text: 'time', link: 'fields/time' },
          { text: 'datetime', link: 'fields/datetime' },
          { text: 'color', link: 'fields/color' },
          { text: 'colorpalette', link: 'fields/colorpalette' },
          { text: 'file', link: 'fields/file' },
          { text: 'image', link: 'fields/image' },
          { text: 'video', link: 'fields/video' },
          { text: 'button', link: 'fields/button' },
          { text: 'resourcelist', link: 'fields/resourcelist' },
          { text: 'hidden', link: 'fields/hidden' },
          { text: 'readonly', link: 'fields/readonly' },
          { text: 'xtype', link: 'fields/xtype' },
          { text: 'heading', link: 'fields/heading' },
          { text: 'repeater', link: 'fields/repeater' },
          { text: 'editorjs', link: 'fields/editorjs' },
        ],
      },
      {
        text: 'Pro',
        items: [
          { text: 'relation', link: 'fields/relation' },
          { text: 'multirelation', link: 'fields/multirelation' },
          { text: 'gallery', link: 'fields/gallery' },
          { text: 'map', link: 'fields/map' },
          { text: 'table', link: 'fields/table' },
          { text: 'embeddedTable', link: 'fields/embeddedTable' },
          { text: 'keyvalue', link: 'fields/keyvalue' },
          { text: 'tag', link: 'fields/tag' },
          { text: 'currency', link: 'fields/currency' },
          { text: 'imask', link: 'fields/imask' },
          { text: 'combo', link: 'fields/combo' },
          { text: 'multicombo', link: 'fields/multicombo' },
          { text: 'tablecombo', link: 'fields/tablecombo' },
          { text: 'tablemulticombo', link: 'fields/tablemulticombo' },
          { text: 'fieldset', link: 'fields/fieldset' },
          { text: 'dependent', link: 'fields/dependent' },
          { text: 'tv', link: 'fields/tv' },
          { text: 'chunk', link: 'fields/chunk' },
          { text: 'snippet', link: 'fields/snippet' },
          { text: 'jsongrid', link: 'fields/jsongrid' },
        ],
      },
    ],
  },
  {
    text: 'Sections',
    link: 'sections/',
    items: [
      { text: 'Catalog', link: 'sections/' },
      {
        text: 'Free',
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

<!-- ![Sections tab on a resource](/components/pagebuilder/screenshots/mgr-sections-tab.png) -->

PageBuilder stores page structure in a separate table `pb_pages` tied to the resource: draft (`draft_json`) and published version (`published_json`). The editor does not touch `modResource.content`. On the site, the `PageBuilder` snippet renders sections.

## Features

- Sections tab: VueTools and PrimeVue on the resource form or in the CMP
- Draft and publish: separate revisions, draft preview via signed token
- 11 built-in sections (Free): hero, richtext, gallery, faq, cta, and more
- PageBuilder Pro: section library, versions, presets, extended catalog (commerce, forms, maps)
- Tabular resource data: **Tables** tab on a resource, `data_table` section, `PageBuilderTableRows` snippet
- UTM and contexts: section visibility rules by UTM and MODX context
- `pbOn*` events: register section types, save/publish/render hooks

## Requirements

| Requirement | Value |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ (manager editor) |
| pdoTools | 3.0+ (Fenom in section chunks) |
| miniShop3 | optional, for Pro catalog sections |

## Packages

| Transport | Contents |
| --- | --- |
| `pagebuilder` | Free: core, 11 sections, CMP, snippets |
| `pagebuilderpro` | Pro: depends on Free, extended catalog and features |

Install Pro with the single transport package `pagebuilderpro`. You do not need a separate Free install first.

MODX namespace: `pagebuilder`.

## Quick links

- [Key features](key-features)
- [Install and first resource](quick-start)
- [`pagebuilder_*` settings](settings)
- [Snippets](snippets)
- [Template and CSS on the site](frontend)
- [Design system](design-system)
- [Permissions, CMP, events](integration)
- [Editor workflow](workflow)
- [CMP: Blocks, UTM, Collections](cmp)
- [PageBuilder Pro](pro)
- [Agent API](agent-api)
- [Developer](developer)
- [Inspector fields](fields/overview)
- [Section blocks](sections/)

## Entry points

| URL / path | Purpose |
| --- | --- |
| CMP `pagebuilder` → `index` | Resource catalog with sections, section types (Pro) |
| `assets/components/pagebuilder/connector.php` | MGR API (VueTools) |
| `assets/components/pagebuilder/preview.php` | Draft preview in iframe |
| Snippet `[[!PageBuilder]]` | Published section HTML on the site |

## Permissions

| Permission | Purpose |
| --- | --- |
| `pagebuilder_view` | Sections tab, catalog, preview token |
| `pagebuilder_save` | Save draft and publish (fallback: `save_document`) |
| `pagebuilder_manage_types` | CMP “Section types” (no fallback to view) |

Access to a specific resource is also checked by MODX policy (`view`, `save`).
