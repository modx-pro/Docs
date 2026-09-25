---
title: Developer
description: Section definitions, data model, extensions, and PageBuilder JS API
---

# Developer

For adding custom sections, extending Pro, or calling the connector from your code.

## References

| Topic | Pages |
| --- | --- |
| Inspector fields | [Overview](fields/overview), [62 type reference](fields/types) |
| Built-in sections | [Section catalog](sections/) |
| Styles and BEM | [Design system](design-system) |
| Headless JSON | [Public API](public-api) |

## Section definition {#section-definition}

### Code sections (Free)

| Artifact | Path / name |
| --- | --- |
| JSON | `core/components/pagebuilder/sections/{key}.json` |
| Chunk | `core/components/pagebuilder/elements/chunks/pagebuilder_{key}.tpl` |
| BEM block | `pb-{key}` |

Minimal JSON:

```json
{
  "key": "promo",
  "version": 1,
  "label": "Promo",
  "category": "conversion",
  "chunk": "pagebuilder_promo",
  "fields": [
    {"name": "title", "type": "text", "label": "Title", "required": true}
  ]
}
```

Sections with `category: dev` or a key containing `_` do not appear in the production catalog.

### Pro sections

JSON: `pagebuilderpro/sections/`. Chunk: `pagebuilderpro_{key}`. Default `"requires": ["pro"]`. Commerce: `"requires": ["pro", "minishop3"]`.

### UI types in control panel

Table `pb_section_types`. Processors `mgr/sectiontype/*`. Package code definitions are **not** overwritten on upgrade.

### Availability and requires

In the type dialog (CMP **Blocks**) open the **Availability** tab. Empty lists mean everywhere. The limit applies to the **Create** catalog. A section already placed on a page stays visible.

Fields: **Templates**, **Parent resources**, **Resources**, **Contexts**.

```json
"availability": {
  "templates": [4, 7],
  "parents": [10],
  "resources": [100],
  "contexts": ["web", "en"]
}
```

```json
"requires": ["pro", "minishop3"]
```

Check: `SectionRequirementChecker` and event `pbOnCheckSectionRequirement`.

Register from plugin:

```php
<?php
switch ($modx->event->name) {
    case 'pbOnRegisterSectionDefinitions':
        /** @var \PageBuilder\Section\SectionRegistry $registry */
        $registry = $modx->event->params['registry'];
        $registry->registerFromFile($modx->getOption('core_path') . 'components/mypackage/sections/custom.json');
        break;
}
```

Build chunks per [design system](design-system): `pb-section` wrapper, escape text, partial `pagebuilder_partial_image`.

### Categories, JSON, and cache

A type can have several categories: a `categories` array and a compatible `category` field. CMP filters show the type under each selected slug.

The JSON tab in the type editor edits the definition, including nested repeater fields, and applies the edit before save. In a repeater, **Copy item** deep-copies the row with a new `_rowId`.

The type flag `cacheable` defaults to `true`. If the page has an enabled type with `cacheable: false`, the document HTML cache is not written. MODX **Clear Cache** resets the `pagebuilder` partition (`OnSiteRefresh`).

## Data model {#data-model}

### Tables

| Table | Purpose |
| --- | --- |
| `pb_pages` | One row per resource: draft and published JSON (`revision`, `published_revision`, publish metadata) |
| `pb_section_types` | UI type definitions (`definition_json`) |
| `pb_data_tables` / `pb_data_table_rows` | Resource table data |
| `pb_utm_params` | UTM registry in control panel |
| `pb_collections` / `pb_collection_tabs` | Collections |
| `pb_basket_items` | Global basket index |
| `pb_user_states` | Reserved: schema exists, not used in runtime yet |

Pro: `pb_library_items`, `pb_section_events`, `pb_page_templates`. Table `pb_revisions` may exist in the Pro schema, but there is no page-level version UI. Section journal: `pb_section_events` + `mgr/sectionevents/*`.

### Document JSON

Page document format:

```json
{
  "schemaVersion": 1,
  "sections": [
    {
      "id": "uuid",
      "type": "hero",
      "enabled": true,
      "data": { "title": "Hello" },
      "settings": { "contexts": ["web"] }
    }
  ],
  "trash": []
}
```

`revision` enables optimistic locking: the client sends the current number, the server compares. On mismatch the response is `revision_conflict`.

### Render cache

Cache partition: `pagebuilder/{resourceId}`. Cleared on publish and unpublish. Cache is not used when checking UTM visibility during the request, with `use_cache=0`, or on render errors.

### PHP service

```php
/** @var \PageBuilder\PageBuilder $pb */
$pb = $modx->services->get('pagebuilder');
// or: $modx->services->get(\PageBuilder\PageBuilder::class);

$pageService = $pb->pages();
// PageService: load/save/publish via the same layer as the connector
```

## Pro extensions

Plugin on `pbOnRegisterFeatureProviders` registers your `FeatureProvider` alongside `ProFeatureProvider`. The provider must implement `serverContributions()` and `cmpContributions()`. Install Free and Pro from this line together.

Boot, save, and render events: [Manager and events](integration#events).

In `pbOnBeforeSave` extensions can replace the document before draft or publish write via `PageDocumentBag`. `DocumentChangeSet` separately records section enable/disable (no false "update" on a pure toggle).

## Public API (Headless)

Read-only JSON for external frontends. Entry point `assets/components/pagebuilder/api.php`. Enable and keys: [Public API](public-api) and [settings](settings#public-api).

Writes and drafts: [Agent API](agent-api) (Pro) or **Sections** tab in the manager.

## JavaScript API

| File | Purpose |
| --- | --- |
| `pagebuilder-api.js` | `PageBuilderApi`: POST to connector from custom manager UI |
| `pb-fetch-lite.js` | Minimal POST without Vue |

```js
import { PageBuilderApi } from '/assets/components/pagebuilder/js/pagebuilder-api.js'

const api = new PageBuilderApi({
  baseUrl: '/assets/components/pagebuilder/connector.php',
  modAuth: MODx.siteId,
})
await api.post('mgr/catalog/list', { resource_id: 42 })
```

For agents and bulk section writes use [Agent API](agent-api).

## Resource data tables {#resource-data-tables}

Processors:

| Processor | Purpose |
| --- | --- |
| `mgr/datatable/list` | Resource tables |
| `mgr/datatable/rows/list` | Rows: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | Create, update, delete rows |

JSON filters: `{ "price": { "op": "gte", "value": "10" } }`. Operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`.

Tables tab or `table` tab type in [Collections](cmp#collections). Rows on the site via `PageBuilderTableRows` snippet.

## Inspector

Fields in `data` come from type JSON. Settings: `contexts`, `utm`, in Pro also `conditions`. In url and button fields <code v-pre>{{utm:key}}</code> placeholders work. Details: [fields overview](fields/overview). <!-- markdownlint-disable-line MD033 -->

## Related pages

- [Public API](public-api)
- [Agent API](agent-api)
- [PageBuilder Pro](pro)
- [Control panel](cmp)
- [Design system](design-system)
