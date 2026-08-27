---
title: Developer
description: Section definitions, data model, extensions, and PageBuilder JS API
---

# Developer

For adding custom sections, extending Pro, or integrating the connector from your own code.

## Reference

| Topic | Pages |
| --- | --- |
| Inspector fields | [Overview](fields/overview), [50 field types](fields/types) |
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

Sections with `category: dev` or a key containing `_` are excluded from the production catalog.

### Pro sections

JSON: `pagebuilderpro/sections/`. Chunk: `pagebuilderpro_{key}`. Default `"requires": ["pro"]`. Commerce: `"requires": ["pro", "minishop3"]`.

### UI types in CMP

Table `pb_section_types`. Processors `mgr/sectiontype/*`. Package code definitions are **not** overwritten on upgrade.

### Availability and requires

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

Check: `SectionRequirementChecker` + event `pbOnCheckSectionRequirement`.

Register from a plugin:

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

Chunks should follow the [design system](design-system): shell `pb-section`, escape text, partial `pagebuilder_partial_image`.

## Data model {#data-model}

### Tables

| Table | Purpose |
| --- | --- |
| `pb_pages` | Separate record: draft and published JSON per `resource_id` (`revision`, `published_revision`, publish metadata) |
| `pb_section_types` | UI definitions (`definition_json`) |
| `pb_data_tables` / `pb_data_table_rows` | Tabular resource data |
| `pb_utm_params` | UTM registry (CMP) |
| `pb_collections` / `pb_collection_tabs` | Collections |
| `pb_basket_items` | Global basket index |
| `pb_user_states` | Reserved: schema exists, not used in runtime yet |

Pro: `pb_library_items`, `pb_revisions`, `pb_section_events`.

### Document JSON

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

Partition `pagebuilder/{resourceId}`. Invalidation on publish/unpublish. Skip cache: UTM visibility runtime, `use_cache=0`, render errors.

### PHP service

```php
/** @var \PageBuilder\PageBuilder $pb */
$pb = $modx->services->get('pagebuilder');
// or: $modx->services->get(\PageBuilder\PageBuilder::class);

$pageService = $pb->pages();
// PageService: same layer as connector load/save/publish
```

## Pro extensions

Plugin on `pbOnRegisterFeatureProviders` registers your `FeatureProvider` alongside `ProFeatureProvider`.

Boot, save, render events: [Manager and events](integration#events).

## Public API (Headless)

Read-only JSON for external frontends. Entry point: `assets/components/pagebuilder/api.php`. Enable and keys: [Public API](public-api) and [settings](settings#public-api).

Writes and drafts: [Agent API](agent-api) (Pro) or the **Sections** tab in the manager.

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

## Tabular resource data {#resource-data-tables}

Processors:

| Processor | Purpose |
| --- | --- |
| `mgr/datatable/list` | Resource tables |
| `mgr/datatable/rows/list` | Rows: `search`, `page`, `limit`, `filters` |
| `mgr/datatable/rows/save` / `remove` | Row CRUD |

Filter JSON: `{ "price": { "op": "gte", "value": "10" } }`. Operators: `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`.

“Tables” tab or tab type `table` in [Collections](cmp#collections). `PageBuilderTableRows` snippet on the front.

## Inspector

Data fields from type JSON. Settings: `contexts`, `utm`, Pro `conditions`. Placeholders <code v-pre>{{utm:key}}</code> in url/button. Details in [fields](fields/overview).

## Related pages

- [Public API](public-api)
- [Agent API](agent-api)
- [PageBuilder Pro](pro)
- [CMP](cmp)
- [Design system](design-system)
