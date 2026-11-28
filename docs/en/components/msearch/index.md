---
title: mSearch
description: Full-text search with morphological analysis for MODX 3
categories: catalog
logo: https://modstore.pro/assets/extras/msearch/logo.png
author: biz87
repository: https://github.com/modx-pro/msearch

compatibility:
  - modx3
  - php81
  - vue3
items: [
  {
    text: 'Snippets',
    items: [
      { text: 'mSearch', link: 'snippets/msearch' },
      { text: 'mSearchForm', link: 'snippets/msearchform' },
    ],
  },
  {
    text: 'Interface',
    items: [
      { text: 'Search', link: 'interface/search' },
      { text: 'Indexing', link: 'interface/indexes' },
      { text: 'Queries', link: 'interface/queries' },
      { text: 'Aliases', link: 'interface/aliases' },
      { text: 'Dictionaries', link: 'interface/dictionaries' },
    ],
  },
  { text: 'JavaScript API', link: 'javascript-api' },
  { text: 'System settings', link: 'system-settings' },
  { text: 'Plugin and events', link: 'plugin-and-events' },
  { text: 'Extending the component', link: 'extending' },
]
---
# mSearch

Full-text search with morphological analysis for MODX Revolution 3.x.

## Features

- **Morphological analysis** — search by word forms with the phpMorphy library (Russian, English, German, Ukrainian)
- **Dictionary index** — fast search with configurable field weights
- **Search aliases** — synonyms and replacements that broaden results
- **Query statistics** — track popular queries
- **Automatic indexing** — on resource save
- **Deferred indexing** — background indexing via [Scheduler](/en/components/scheduler/)
- **Vue interface** — admin panel on Vue 3 + PrimeVue
- **Autocomplete** — suggestions while typing
- **Public API** — REST endpoint for AJAX search and integrations
- **Headless mode** — JavaScript API (`window.msearch`) for React, Vue and custom UIs
- **Hook system** — extend search behavior with `msearchHooks`
- **Multi-context** — filter results by MODX contexts

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **pdoTools 3.x** — for snippets and the Fenom template engine
- **[VueTools](/en/components/vuetools/) 1.2.0+** — for the admin interface
- **[Scheduler](/en/components/scheduler/)** *(optional)* — for deferred indexing

## Installation

### Via package manager

1. Go to **Extras → Installer**
2. Click **Download Extras**
3. Find **mSearch** in the list
4. Click **Download**, then **Install**

After installation:

1. Go to **Extras → mSearch → Dictionaries**
2. Download a morphological dictionary for your language (Russian, English, German, Ukrainian)
3. Open the **Index** tab and create the search index

![Dictionaries tab: the Russian dictionary is installed, the others have install buttons](/components/msearch/img/dictionaries-tab.png)

## Quick start

### 1. Create a search page

Create a resource for search results, e.g. `/search/`.

### 2. Add the form and results

```fenom
{'!mSearchForm' | snippet : [
    'pageId' => 5,
    'autocomplete' => 1
]}

{'!mSearch' | snippet : [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

### 3. Configure indexing

Set the indexed fields in system settings:

```
mse_index_fields = pagetitle:3,longtitle:2,description:2,introtext:2,content:1
```

The numbers are field weights. The higher the weight, the higher results with matches in that field rank.

mSearch settings are grouped into the **Indexing**, **Search** and **Frontend** areas — filter system settings by the `msearch` namespace:

![mSearch system settings grouped by area; mse_index_fields with its default value](/components/msearch/img/system-settings.png)

## System settings

Settings live in the `msearch` namespace with the `mse_` prefix and are grouped into the **Indexing**, **Search** and **Frontend** areas.

Full reference with defaults and use cases: [System settings](/en/components/msearch/system-settings).

## Placeholders

After a search the following placeholders are available:

| Placeholder | Description |
|-------------|-------------|
| `[[+mse.total]]` | Total number of results found |
| `[[+mse.query]]` | Search query as entered (before alias processing) |

In the result chunk (tpl):

| Placeholder | Description |
|-------------|-------------|
| `[[+weight]]` | Result weight (relevance) |
| `[[+intro]]` | Text with highlighted matches |
| `[[+idx]]` | Result number in the list |

## Events

| Event | Description |
|-------|-------------|
| `mseOnRegisterAdapters` | Register adapters for indexing your own models |
| `mseOnBeforeIndex` | Before indexing a resource |
| `mseOnGetWorkFields` | Change the list of fields to index |
| `mseOnAfterIndex` | After indexing a resource |
| `mseOnBeforeSearch` | Before running a search |
| `mseOnAfterSearch` | After running a search |

## Differences from mSearch2

mSearch is a full rewrite for MODX 3.x:

| Aspect | mSearch2 | mSearch |
|--------|----------|---------|
| MODX | 2.x | 3.x |
| PHP | 5.6+ | 8.1+ |
| Interface | ExtJS | Vue 3 + PrimeVue |
| Architecture | Procedural | Service-based |
| Aliases | Synonyms | Aliases (synonyms + replacements) |
| Filtering | mFilter2 | None (use pdoTools) |
| phpMorphy | Bundled | Composer package `cijic/phpmorphy` |
| Dictionary source | SourceForge | GitHub |
| Estonian | Yes | No |
| Scheduler | No | Yes (deferred indexing) |

::: warning mFilter2
The mFilter2 snippet is not part of mSearch. Use the standard pdoTools features or third-party solutions for filtering.
:::

## Examples

### Basic search

```fenom
<form action="{'search' | url}" method="get">
    <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Search...">
    <button type="submit">Search</button>
</form>

{'!mSearch' | snippet : [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

### With pagination

`mSearch` reads `offset` and writes the total number of results to `totalVar`, so `pdoPage` can page through it directly:

```fenom
{'!pdoPage' | snippet : [
    'element' => 'mSearch',
    'totalVar' => 'page.total',
    'tpl' => 'mSearch.row',
    'limit' => 10
]}

{$_modx->getPlaceholder('page.nav')}
```

For miniShop3 products (they are rendered by `msProducts`, not `mSearch`) use the `return=ids` pattern — see below.

### MiniShop3 product search

```fenom
{'!pdoPage' | snippet : [
    'element' => 'msProducts',
    'parents' => 0,
    'resources' => '!mSearch' | snippet : ['return' => 'ids', 'limit' => 0] | default : '999999',
    'sortby' => 'ids'
]}

{$_modx->getPlaceholder('page.nav')}
```

## Support

- GitHub Issues: [modx-pro/msearch](https://github.com/modx-pro/msearch/issues)
