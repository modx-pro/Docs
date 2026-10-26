---
title: PageBuilder
description: "Visual section builder for MODX 3: draft and publish without overwriting resource content"
author: Ibochkarev
logo: https://modstore.pro/assets/extras/pagebuilder/logo.png
modstore: https://modstore.pro/packages/sites-themes/pagebuilder
dependencies: [VueTools, pdoTools]
categories: themes

compatibility:
  - modx3
  - php82
  - vue3
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
      { text: 'Control panel', link: 'cmp' },
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
          { text: 'PageBuilderQuiz', link: 'snippets/PageBuilderQuiz' },
          { text: 'PageBuilderContactForm', link: 'snippets/PageBuilderContactForm' },
          { text: 'PageBuilderFormBuilder', link: 'snippets/PageBuilderFormBuilder' },
          { text: 'PageBuilderFetchIt', link: 'snippets/PageBuilderFetchIt' },
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
      { text: 'REST API v1', link: 'rest-api' },
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
      { text: 'Type reference', link: 'fields/types' },
      {
        text: 'Free',
        link: 'fields/types',
        items: [
          { text: 'ace', link: 'fields/ace' },
          { text: 'button', link: 'fields/button' },
          { text: 'checkbox', link: 'fields/checkbox' },
          { text: 'checkboxgroup', link: 'fields/checkboxgroup' },
          { text: 'chunk', link: 'fields/chunk' },
          { text: 'color', link: 'fields/color' },
          { text: 'colorpalette', link: 'fields/colorpalette' },
          { text: 'date', link: 'fields/date' },
          { text: 'datetime', link: 'fields/datetime' },
          { text: 'email', link: 'fields/email' },
          { text: 'file', link: 'fields/file' },
          { text: 'heading', link: 'fields/heading' },
          { text: 'hidden', link: 'fields/hidden' },
          { text: 'image', link: 'fields/image' },
          { text: 'migx', link: 'fields/migx' },
          { text: 'multiselect', link: 'fields/multiselect' },
          { text: 'number', link: 'fields/number' },
          { text: 'radio', link: 'fields/radio' },
          { text: 'readonly', link: 'fields/readonly' },
          { text: 'repeater', link: 'fields/repeater' },
          { text: 'resourcelist', link: 'fields/resourcelist' },
          { text: 'richtext', link: 'fields/richtext' },
          { text: 'select', link: 'fields/select' },
          { text: 'slug', link: 'fields/slug' },
          { text: 'snippet', link: 'fields/snippet' },
          { text: 'tag', link: 'fields/tag' },
          { text: 'text', link: 'fields/text' },
          { text: 'textarea', link: 'fields/textarea' },
          { text: 'time', link: 'fields/time' },
          { text: 'toggle', link: 'fields/toggle' },
          { text: 'tv', link: 'fields/tv' },
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
          { text: 'address', link: 'fields/address' },
          { text: 'combo', link: 'fields/combo' },
          { text: 'currency', link: 'fields/currency' },
          { text: 'datasource', link: 'fields/datasource' },
          { text: 'daterange', link: 'fields/daterange' },
          { text: 'dependent', link: 'fields/dependent' },
          { text: 'documents', link: 'fields/documents' },
          { text: 'editorjs', link: 'fields/editorjs' },
          { text: 'embeddedTable', link: 'fields/embeddedTable' },
          { text: 'fieldset', link: 'fields/fieldset' },
          { text: 'form', link: 'fields/form' },
          { text: 'gallery', link: 'fields/gallery' },
          { text: 'icon', link: 'fields/icon' },
          { text: 'imask', link: 'fields/imask' },
          { text: 'jsongrid', link: 'fields/jsongrid' },
          { text: 'keyvalue', link: 'fields/keyvalue' },
          { text: 'link', link: 'fields/link' },
          { text: 'map', link: 'fields/map' },
          { text: 'multicombo', link: 'fields/multicombo' },
          { text: 'multirelation', link: 'fields/multirelation' },
          { text: 'product', link: 'fields/product' },
          { text: 'products', link: 'fields/products' },
          { text: 'relation', link: 'fields/relation' },
          { text: 'schedule', link: 'fields/schedule' },
          { text: 'table', link: 'fields/table' },
          { text: 'tablecombo', link: 'fields/tablecombo' },
          { text: 'tablemulticombo', link: 'fields/tablemulticombo' },
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
          { text: 'Video', link: 'sections/video' },
          { text: 'FAQ', link: 'sections/faq' },
          { text: 'Gallery', link: 'sections/gallery' },
          { text: 'Image', link: 'sections/image' },
          { text: 'Cards', link: 'sections/cards' },
          { text: 'Contact', link: 'sections/contact' },
          { text: 'Testimonials', link: 'sections/testimonials' },
          { text: 'Spacer', link: 'sections/spacer' },
          { text: 'Hero', link: 'sections/hero' },
          { text: 'Call to action', link: 'sections/cta' },
          { text: 'Rich text', link: 'sections/richtext' },
          { text: 'Stats', link: 'sections/stats' },
        ],
      },
      {
        text: 'Pro',
        link: 'sections/',
        items: [
          { text: 'Accordion', link: 'sections/accordion' },
          { text: 'Addresses', link: 'sections/locations' },
          { text: 'Before / After', link: 'sections/before_after' },
          { text: 'Case study', link: 'sections/case_study' },
          { text: 'Downloads', link: 'sections/downloads' },
          { text: 'Dynamic list', link: 'sections/dynamic_list' },
          { text: 'Filterable grid', link: 'sections/filterable_grid' },
          { text: 'Form builder', link: 'sections/form_builder' },
          { text: 'How it works', link: 'sections/how_it_works' },
          { text: 'Media + text', link: 'sections/media_split' },
          { text: 'Newsletter', link: 'sections/newsletter' },
          { text: 'Notice', link: 'sections/notice' },
          { text: 'Portfolio', link: 'sections/portfolio' },
          { text: 'Quote', link: 'sections/quote' },
          { text: 'Tabs', link: 'sections/tabs' },
          { text: 'Blog posts', link: 'sections/blog_posts' },
          { text: 'Map', link: 'sections/map' },
          { text: 'Gallery carousel', link: 'sections/gallery_carousel' },
          { text: 'Products carousel', link: 'sections/products_carousel' },
          { text: 'Quiz', link: 'sections/quiz' },
          { text: 'Team', link: 'sections/team' },
          { text: 'Contact with map', link: 'sections/contact_map' },
          { text: 'Partner logos', link: 'sections/logos' },
          { text: 'Curated products', link: 'sections/curated_products' },
          { text: 'Related products', link: 'sections/related_products' },
          { text: 'Features', link: 'sections/features' },
          { text: 'Promo banner', link: 'sections/promo_banner' },
          { text: 'Brands row', link: 'sections/brands_row' },
          { text: 'Categories row', link: 'sections/categories_row' },
          { text: 'Products grid', link: 'sections/products_grid' },
          { text: 'Product comparison', link: 'sections/product_comparison' },
          { text: 'Structured content', link: 'sections/structured_content' },
          { text: 'Data table', link: 'sections/data_table' },
          { text: 'Spec table', link: 'sections/spec_table' },
          { text: 'Pricing table', link: 'sections/pricing_table' },
          { text: 'Product spotlight', link: 'sections/product_spotlight' },
          { text: 'Contact form', link: 'sections/contact_form' },
          { text: 'Timeline', link: 'sections/timeline' },
        ],
      },
    ],
  },
  {
    text: 'Recipes',
    link: 'recipes/',
    items: [
      { text: 'Overview', link: 'recipes/' },
      { text: 'Landing', link: 'recipes/landing' },
      { text: 'Shared blocks', link: 'recipes/shared-blocks' },
      { text: 'Page templates', link: 'recipes/page-templates' },
      { text: 'Per-screen values', link: 'recipes/responsive' },
      { text: 'UTM and visibility', link: 'recipes/utm' },
      { text: 'Tables', link: 'recipes/tables' },
      { text: 'Dynamic list', link: 'recipes/dynamic-list' },
      { text: 'Filterable grid', link: 'recipes/filterable-grid' },
      { text: 'Form', link: 'recipes/form' },
      { text: 'Products grid', link: 'recipes/products' },
      { text: 'Shop landing', link: 'recipes/shop-landing' },
      { text: 'Custom section type', link: 'recipes/custom-section' },
      { text: 'Bundle', link: 'recipes/bundle' },
      { text: 'REST token', link: 'recipes/rest-read' },
    ],
  },
  { text: 'FAQ', link: 'faq' },
]
---
# PageBuilder

![Section editor on a resource](/components/pagebuilder/screenshots/mgr-sections-tab.png)

You build a page from sections on the **Sections** tab in MODX. Autosave writes the draft. **Save** on the MODX resource validates fields and publishes sections to the site. The resource **Content** field is not used for sections. The `PageBuilder` snippet outputs the blocks on the site.

Start here: [Quick start](quick-start).

## Resource editor

The **Sections** tab holds the editor:

- table or compact editorial list (default from `pagebuilder_resource_view_mode`, toggle in the toolbar)
- add from the catalog, drag to reorder, Alt+↑/↓, duplicate, copy sections from another page
- in the editorial list you enable and disable sections on each row
- deleted sections go to the page trash
- edit content in the **Properties** modal inspector
- while the inspector is open for a newly added section, autosave pauses
- **Cancel** rolls the draft back to the state before the add
- visibility rules (context, UTM) open via **Visibility** when the system setting is enabled
- draft preview in a drawer via a signed link
- undo and redo in the current session
- before publish (**Save** resource) the editor validates required fields

## Draft and publish

Autosave writes the draft only. **Save** on the MODX resource: validate → draft → publish to `published_json`. **Unpublish** clears the published version. The draft remains. On save the server compares revision numbers so concurrent edits are not overwritten.

```mermaid
flowchart TD
  A[Autosave in the inspector] -->|mode: draft| B[Draft write, published_json unchanged]
  C[Save MODX resource] --> D{revision matches?}
  D -->|no| E[Revision conflict: edits not overwritten]
  D -->|yes| F[Section field validation]
  F -->|errors| G[Response with the problem list, no publish]
  F -->|ok| H[Publish: draft → published_json]
  I[Unpublish] --> J{revision matches?}
  J -->|no| E
  J -->|yes| K[publishedRevision = 0, draft stays]
```

## Free: sections and fields

11 built-in types: hero, richtext, faq, cta, cards, contact, stats, testimonials, image, spacer, video.

Pro creates a new `gallery` (`authoring: pro`). Rendering an existing `gallery` stays in Free.

In the control panel (**Blocks**):

- **All / From package / Mine** chips
- bulk-hide of preset types
- your own catalog preview instead of the schematic image

35 field types in Free and 27 in Pro (62 total): text, richtext, repeater, migx, file, select, and more. With `pagebuilder_responsive_editor_enabled`, the inspector shows per-device value tabs.

## PageBuilder Pro

- global library (**Shared blocks**): pull from another page (Link | Copy), write-through for linked sections
- page templates and section event journal (View/Restore)
- **Examples** tab in the catalog (Examples toggle / `pagebuilder_catalog_examples_enabled`)
- [Agent API](agent-api) for scripts and agents
- **Basket** in the control panel: sections and table rows across resources
- catalog: [gallery](sections/gallery), features, team, tabs, maps, [forms](sections/contact_form), [quiz](sections/quiz), miniShop3 blocks
- image/gallery crop: capability `image-crop`
- the `video` section is created in Free
- 27 more field types: gallery, map, relation, table, embeddedTable, editorjs, and more

## Resource tables

The **Tables** tab stores large row sets in the database: filters, CSV/JSON import, bulk delete. On the site, `PageBuilderTableRows` outputs rows. The `data_table` section (Pro) embeds a small table in section JSON.

## UTM and contexts

The UTM registry in the control panel requires capability `utm` (Pro). Already published rules still run in Free. Visibility rules (context, UTM, Pro conditions) open via **Visibility** in the inspector when `pagebuilder_inspector_visibility_enabled` is on. Snippets `PageBuilderUtmSession` and `PageBuilderUtmUrl` help on landing pages. Fields support the <code v-pre>{{utm:key}}</code> placeholder. <!-- markdownlint-disable-line MD033 -->

## Collections and control panel

Requires PageBuilder Pro and capability `collections`. With `collections_enabled`, resource tabs (sections, tables, iframe, and more) are configured in the control panel. Without the capability the tabs are absent. **Components → PageBuilder** opens the type builder and Pro tabs. The CMP has no resource list. The section editor is the resource tab.

## Snippets, Public API, and events

| What | Why |
| --- | --- |
| `PageBuilder` | section HTML |
| `PageBuilderResource` | sections from another resource |
| `PageBuilderSitemap` | XML sitemap |
| [Public API](public-api) | published sections as JSON (`api.php`) |
| `pbOn*` events | plugins on save, publish, render, and type registration |

## System requirements

| Requirement | Value |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| VueTools | 1.1.2+ (manager editor) |
| pdoTools | 3.0+ (Fenom in section chunks) |
| miniShop3 | optional, for Pro catalog sections |

## Packages

| Package | Version | Contents |
| --- | --- | --- |
| `pagebuilder` | 1.0.17-beta | Free: core, sections, control panel, snippets, MIGX, responsive, Save = publish, type filter and custom previews |
| `pagebuilderpro` | 1.0.17-beta | Pro: requires `pagebuilder` ≥ 1.0.17, quiz, library pull, page templates, section journal |

MODX namespace: `pagebuilder`.

## Quick links

| Need | Document |
| --- | --- |
| Feature overview | [Key features](key-features) |
| Install and build the first page | [Quick start](quick-start) |
| All `pagebuilder_*` keys | [System settings](settings) |
| Draft, publish, basket | [Workflow](workflow) |
| Blocks, UTM, Collections, Pro basket | [Control panel](cmp) |
| Permissions, `pbOn*` events, data model | [Manager and events](integration) |
| Template, preview, snippet cache | [Frontend output](frontend) |
| CSS tokens and section BEM | [Design system](design-system) |
| JSON for headless | [Public API](public-api) |
| Snippets and parameters | [Snippets](snippets/) |
| Pro, basket, examples | [PageBuilder Pro](pro) |
| Scripts and agents | [Agent API](agent-api) |
| Custom sections and extensions | [Developer](developer) |
| Landing, lists, forms, UTM, REST | [Recipes](recipes/) |
| 62 inspector field types | [Field type reference](fields/types) |
| 50 built-in blocks | [Section catalog](sections/) |
| Common issues | [FAQ](faq) |

## Entry points

| URL / path | Purpose |
| --- | --- |
| Component `pagebuilder` → `index` | Section type builder and Pro tabs. There is no resource list. The section editor is the resource tab |
| `assets/components/pagebuilder/connector.php` | MGR API (VueTools) |
| `assets/components/pagebuilder/preview.php` | Draft preview in iframe |
| `assets/components/pagebuilder/api.php` | Public API: published sections JSON (headless) |
| `assets/components/pagebuilder/api/v1.php` | REST API v1 (Pro): Bearer tokens, scopes `pages.read` / `catalog.read` |
| Snippet `[[!PageBuilder]]` | Published section HTML on the site |

## Permissions

| Permission | Purpose |
| --- | --- |
| `pagebuilder_view` | Sections tab, type catalog, preview token. `save_document` opens the same |
| `pagebuilder_save` | Draft save and publish (also `save_document`) |
| `pagebuilder_manage_types` | Control panel section types (no `view` substitute) |

Access to a specific resource is also checked by the MODX policy (`view`, `save`).
