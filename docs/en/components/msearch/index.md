---
title: mSearch
description: Full-text search with morphological analysis for MODX 3
logo: https://modstore.pro/assets/extras/msearch/logo-lg.png
author: biz87
repository: https://github.com/modx-pro/msearch

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
  { text: 'Extending the component', link: 'extending' },
]
---
# mSearch

Full-text search with morphological analysis for MODX Revolution 3.x.

## Features

- **Morphological analysis** — search by word forms via phpMorphy (Russian, English, German, Ukrainian)
- **Dictionary index** — fast search with configurable field weights
- **Search aliases** — synonyms and replacements to broaden results
- **Query statistics** — track popular queries
- **Automatic indexing** — on resource save
- **Deferred indexing** — background indexing via [Scheduler](/en/components/scheduler/)
- **Vue interface** — admin panel on Vue 3 + PrimeVue
- **Autocomplete** — suggestions while typing

## Requirements

| Requirement | Version |
|-------------|---------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **pdoTools 3.x** — for snippets and Fenom
- **[VueTools](/en/components/vuetools/)** — for admin interface
- **[Scheduler](/en/components/scheduler/)** *(optional)* — for deferred indexing

## Installation

### Via package manager

1. Go to **Extras → Installer**
2. Click **Download Extras**
3. Find **mSearch** in the list
4. Click **Download** then **Install**

After installation:

1. Go to **Extras → mSearch → Dictionaries**
2. Download a morphological dictionary for your language (Russian, English, German, Ukrainian)
3. Open the **Indexing** tab and create a search index

## Quick start

### 1. Create search page

Create a resource for search results, e.g. `/search/`.

### 2. Add form and results

```fenom
{'!mSearchForm' | snippet: [
    'pageId' => 5,
    'autocomplete' => 1
]}

{'!mSearch' | snippet: [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

### 3. Configure indexing

Set indexed fields in system settings:

```
mse_index_fields = pagetitle:3,longtitle:2,description:2,introtext:2,content:1
```

Numbers are field weights. Higher weight ranks matches in that field higher.

## System settings

All settings use prefix `mse_` and namespace `msearch`.

### Indexing

| Setting | Default | Description |
|---------|---------|-------------|
| `mse_index_fields` | `pagetitle:3,longtitle:2,description:2,introtext:2,content:1` | Indexed fields with weights |
| `mse_index_min_word_length` | `3` | Minimum word length to index |
| `mse_index_split_words` | `#\s\|[,.:;!?"'«»„"()\[\]{}<>]#u` | Regex to split text into words |
| `mse_use_scheduler` | `false` | Use Scheduler for deferred indexing |

### Search

| Setting | Default | Description |
|---------|---------|-------------|
| `mse_search_exact_match_bonus` | `10` | Bonus for exact query match |
| `mse_search_like_match_bonus` | `3` | Bonus for LIKE match |
| `mse_search_all_words_bonus` | `5` | Bonus when all query words are found |
| `mse_search_split_words` | `#\s+#u` | Regex to split query |

### Frontend

| Setting | Default | Description |
|---------|---------|-------------|
| `mse_frontend_css` | `[[++assets_url]]components/msearch/css/web/msearch.css` | CSS URL |
| `mse_frontend_js` | `[[++assets_url]]components/msearch/js/web/msearch.js` | JS URL |

## Placeholders

After search:

| Placeholder | Description |
|-------------|-------------|
| `[[+mse.total]]` | Total results |
| `[[+mse.query]]` | Processed query |

In result chunk (tpl):

| Placeholder | Description |
|-------------|-------------|
| `[[+weight]]` | Result weight (relevance) |
| `[[+intro]]` | Text with highlighted matches |
| `[[+idx]]` | Result index |

## Events

| Event | Description |
|-------|-------------|
| `mseOnRegisterAdapters` | Register adapters for custom model indexing |
| `mseOnBeforeIndex` | Before indexing a resource |
| `mseOnGetWorkFields` | Change list of fields to index |
| `mseOnAfterIndex` | After indexing a resource |
| `mseOnBeforeSearch` | Before running search |
| `mseOnAfterSearch` | After search |

## Differences from mSearch2

mSearch is a full rewrite for MODX 3.x:

| Aspect | mSearch2 | mSearch |
|--------|----------|---------|
| MODX | 2.x | 3.x |
| PHP | 5.6+ | 8.1+ |
| Interface | ExtJS | Vue 3 + PrimeVue |
| Architecture | Procedural | Service-based |
| Aliases | Synonyms | Aliases (synonyms + replacements) |
| Filtering | mFilter2 | No (use pdoTools) |
| phpMorphy | Bundled | Composer `cijic/phpmorphy` |
| Dictionary source | SourceForge | GitHub |
| Estonian | Yes | No |
| Scheduler | No | Yes (deferred indexing) |

::: warning mFilter2
The mFilter2 snippet is not part of mSearch. Use pdoTools or other solutions for filtering.
:::

## Examples

### Basic search

```fenom
<form action="{'search' | url}" method="get">
    <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Search...">
    <button type="submit">Search</button>
</form>

{'!mSearch' | snippet: [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

### With pagination

```fenom
{'!mSearchForm' | snippet: ['pageId' => $_modx->resource.id]}

{'!pdoPage' | snippet: [
    'element' => 'mSearch',
    'tpl' => 'mSearch.row',
    'limit' => 10
]}

{$_modx->getPlaceholder('page.nav')}
```

### MiniShop3 product search

```fenom
{'!pdoPage' | snippet: [
    'element' => 'msProducts',
    'parents' => 0,
    'resources' => '!mSearch' | snippet: ['return' => 'ids', 'limit' => 0] | default : '999999',
    'sortby' => 'ids'
]}

{$_modx->getPlaceholder('page.nav')}
```

## Support

- GitHub Issues: [modx-pro/msearch](https://github.com/modx-pro/msearch/issues)
