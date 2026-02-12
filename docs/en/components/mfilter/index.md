---
title: mFilter
description: Faceted filtering for MODX 3 with SEO URL support
logo: https://modstore.pro/assets/extras/mfilter/logo-lg.png
author: biz87

items: [
  { text: 'Quick start', link: 'quick-start' },
  { text: 'System settings', link: 'settings' },
  { text: 'Caching', link: 'cache' },
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'mFilter', link: 'snippets/mfilter' },
      { text: 'mFilterForm', link: 'snippets/mfilterform' },
    ],
  },
  {
    text: 'Manager interface',
    link: 'interface/',
    items: [
      { text: 'Filter sets', link: 'interface/filter-sets' },
      { text: 'Slugs', link: 'interface/slugs' },
      { text: 'URL patterns', link: 'interface/patterns' },
      { text: 'SEO templates', link: 'interface/seo-templates' },
      { text: 'Word forms', link: 'interface/word-forms' },
      { text: 'Maintenance', link: 'interface/maintenance' },
    ],
  },
  {
    text: 'Front-end',
    link: 'frontend/',
    items: [
      { text: 'Templates', link: 'frontend/templates' },
      { text: 'Placeholders', link: 'frontend/placeholders' },
    ],
  },
  {
    text: 'Development',
    link: 'development/',
    items: [
      { text: 'JavaScript', link: 'development/javascript' },
      { text: 'JS API', link: 'development/js-api' },
      { text: 'Headless API', link: 'development/headless' },
      { text: 'Services', link: 'development/services' },
      { text: 'Filter types', link: 'development/filter-types' },
      { text: 'Events', link: 'development/events' },
      { text: 'Models and DB', link: 'development/models' },
    ],
  },
  {
    text: 'Integrations',
    link: 'integration/',
    items: [
      { text: 'MiniShop3', link: 'integration/minishop3' },
      { text: 'mSearch', link: 'integration/msearch' },
    ],
  },
  {
    text: 'Cookbook',
    link: 'cookbook/',
    items: [
      { text: 'Filter values sorting', link: 'cookbook/filter-values-sorting' },
      { text: 'External filters', link: 'cookbook/external-filters' },
      { text: 'Custom filter type', link: 'cookbook/custom-filter-type' },
    ],
  },
]
---
# mFilter

Faceted filtering of products and resources for MODX Revolution 3.x with SEO-friendly URL support.

## Features

- **Faceted filtering** — filter by any resource fields, TV, MiniShop3 options
- **SEO URL** — human-readable URLs like `/catalog/brand_apple/color_black/`
- **Cross-filtering** — count available values based on active filters
- **AJAX** — update results without page reload
- **Headless API** — REST API for integration with Vue, React, Svelte
- **SEO optimization** — dynamic title, description, H1, canonical
- **Word forms** — word forms for filter names in SEO text
- **Integration** — works with MiniShop3, mSearch, pdoTools
- **Vue interface** — modern admin panel on Vue 3 + PrimeVue

## System requirements

| Requirement | Version |
|------------|--------|
| MODX Revolution | 3.0.0+ |
| PHP | 8.1+ |
| MySQL | 5.7+ / MariaDB 10.3+ |

### Dependencies

- **pdoTools 3.x** — for snippets and Fenom
- **[VueTools](/en/components/vuetools/)** — for the manager UI
- **MiniShop3** *(optional)* — for product filtering

## Installation

### Via package manager

1. Go to **Extras → Installer**
2. Click **Download Extras**
3. Find **mFilter** in the list
4. Click **Download** then **Install**

After installation:

1. Go to **Extras → mFilter → Filter sets**
2. Create a filter set for your catalog
3. Add snippets to the catalog page

## Quick start

### 1. Create a filter set

In **Extras → mFilter → Filter sets**:

- Create a new set
- Add the filters you need (MS3 options, TV, resource fields)
- Link to catalog categories

### 2. Add snippets to the page

```fenom
{* Filter form *}
{'!mFilterForm' | snippet}

{* Paginated results *}
{'!mFilter' | snippet: [
    'element' => 'msProducts',
    'paginator' => 'pdoPage',
    'parents' => $_modx->resource.id,
    'limit' => 24,
    'tpl' => 'mfilter.row'
]}

{* Pagination *}
{$_modx->getPlaceholder('page.nav')}
```

### 3. SEO URL (optional)

SEO URLs are on by default. Filters produce URLs like:

```
/catalog/brand_apple/color_black-or-white/price_1000-5000/
```

To customize, go to **Filter sets** and set slugs for filter values.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      Front-end                           │
├─────────────────┬───────────────────────────────────────┤
│   SSR mode     │           Headless mode              │
│  (mFilterForm)  │        (Vue/React/Svelte)             │
├─────────────────┴───────────────────────────────────────┤
│                    JavaScript API                        │
│         FilterUI / ApiClient / FilterAPI / Hooks         │
├─────────────────────────────────────────────────────────┤
│                      REST API                            │
│    /api/v1/filter/schema | apply | suggestions | ...     │
├─────────────────────────────────────────────────────────┤
│                       Services                            │
│  Filter | FilterSet | SlugManager | UrlRouter | SEO...   │
├─────────────────────────────────────────────────────────┤
│                     Database                          │
│   FilterSets | Slugs | Patterns | WordForms | Cache      │
└─────────────────────────────────────────────────────────┘
```

## Differences from mFilter2

mFilter is a fully rewritten component for MODX 3.x:

| Aspect | mFilter2 | mFilter |
|--------|----------|---------|
| MODX | 2.x | 3.x |
| PHP | 5.6+ | 8.1+ |
| Interface | ExtJS | Vue 3 + PrimeVue |
| Architecture | Procedural | Service-based |
| SEO URL | Separate plugin | Built-in |
| Headless API | No | REST API v1 |
| Filter types | Fixed | Extensible |
| Configuration | In snippet | Filter sets in admin |
| Caching | Basic | Multi-level |

## Operating modes

### SSR (Server-Side Rendering)

Traditional mode — HTML is generated on the server:

```fenom
{'!mFilterForm' | snippet}
{'!mFilter' | snippet: ['element' => 'msProducts']}
```

Advantages:

- Works out of the box
- SEO-friendly
- No JavaScript required for first load

### Headless (for SPA)

API mode for modern frameworks:

```javascript
// Get filter schema
const schema = await mfilter.getSchema(resourceId);

// Apply filters
const result = await mfilter.apply(
    { brand: ['apple'], price: { min: 1000, max: 5000 } },
    { sort: 'price-asc', page: 1 }
);
```

More: [Headless API](development/headless)
