---
title: pdoTools
description: Fast retrieval of site pages and users
logo: https://modstore.pro/assets/extras/pdotools/logo-lg.jpg
author: sergant210
modstore: https://modstore.pro/packages/utilities/pdotools
modx: https://extras.modx.com/package/pdotools
repository: https://github.com/modx-pro/pdoTools3

items: [
  {
    text: 'Snippets',
    items: [
      { text: 'pdoResources', link: 'snippets/pdoresources' },
      { text: 'pdoMenu', link: 'snippets/pdomenu' },
      { text: 'pdoPage', link: 'snippets/pdopage' },
      { text: 'pdoCrumbs', link: 'snippets/pdocrumbs' },
      { text: 'pdoUsers', link: 'snippets/pdousers' },
      { text: 'pdoSitemap', link: 'snippets/pdositemap' },
      { text: 'pdoNeighbors', link: 'snippets/pdoneighbors' },
      { text: 'pdoField', link: 'snippets/pdofield' },
      { text: 'pdoTitle', link: 'snippets/pdotitle' },
      { text: 'pdoArchive', link: 'snippets/pdoarchive' },
    ],
  },
  {
    text: 'Classes',
    link: 'classes/',
    items: [
      { text: 'pdoTools', link: 'classes/pdotools' },
      { text: 'pdoFetch', link: 'classes/pdofetch' },
      { text: 'pdoParser', link: 'classes/pdoparser' },
    ],
  },
  { text: 'General properties', link: 'general-properties' },
  { text: 'File elements', link: 'file-elements' },
  { text: 'Parser', link: 'parser' },
]
---
# pdoTools

pdoTools is a set of handy snippets for everyday use plus a small library that makes them very fast.

::: tip MODX 3 line
**pdoTools 3.x** (current: [3.1.0-pl](https://github.com/modx-pro/pdoTools3/releases/tag/v3.1.0-pl)) needs **MODX Revolution 3** and **PHP 8.1+**. Source: [modx-pro/pdoTools3](https://github.com/modx-pro/pdoTools3). For MODX 2 use [pdoTools 2.x](https://github.com/modx-pro/pdoTools).
:::

Thanks to the shared library, all pdoTools snippets share the same minimal feature set:

- All database queries use PDO. xPDO objects are not created unless they are actually needed.
- Simple placeholders are preprocessed in chunks. The MODX parser only handles complex calls.
- Proper sorting, preparation, processing and output of TV parameters.
- Chunk code can be specified right in the snippet call, or loaded as usual or from static files.
- "Fast placeholders" in chunks that replace filters like "isempty" and wrap values in tags only when non-empty.
- Timestamped snippet log for debugging (`&showLog`). In 3.x the log is a placeholder: [general parameters](general-properties#showlog).

All queries are built on xPDO; data is fetched via PDO for resource and speed efficiency.

The package includes:

- [pdoResources](/en/components/pdotools/snippets/pdoresources) — Much faster replacement for getResources, parameter-compatible.
- [pdoMenu](/en/components/pdotools/snippets/pdomenu) — Replacement for Wayfinder, builds menus.
- [pdoUsers](/en/components/pdotools/snippets/pdousers) — Select and output site users, with filtering by roles and groups.
- [pdoCrumbs](/en/components/pdotools/snippets/pdocrumbs) — Breadcrumbs, replacement for BreadCrumb.
- [pdoSitemap](/en/components/pdotools/snippets/pdositemap) — Fast sitemap generation, replacement for GoogleSiteMap.
- [pdoNeighbors](/en/components/pdotools/snippets/pdoneighbors) — Output links to neighboring documents.
- [pdoField](/en/components/pdotools/snippets/pdofield) — Output any document field, replacement for getResourceField and UltimateParent.
- [pdoPage](/en/components/pdotools/snippets/pdopage) — Paginated output, replacement for getPage.

## Main features

- Arbitrary queries from any tables with any conditions and joins.
- Time tracking per operation, detailed log to find bottlenecks.
- Full compatibility with getPage for paginated output.
- Fastest chunk processing — only going without chunks is faster.
- Built-in [Fenom](/en/components/pdotools/parser) template engine.

## What is new in 3.1.0 (MODX 3)

::: tip Available in pdoTools 3.1.0+ (MODX 3)
These items need the [3.1.0-pl](https://github.com/modx-pro/pdoTools3/releases/tag/v3.1.0-pl) package (or newer) on MODX 3.
:::

- Row flags in chunks: `isFirst`, `isLast`, `isActive` (pdoMenu, pdoPage, pdoCrumbs); menu also `hasChildren` / `hasChilds`, `isHere`, `isStart`, `isCategory`, `isInner`; page `isSkip`; crumbs `isHome`. Existing `tpl*` chunks still work when set.
- pdoMenu: `[[+children]]` in **&tplInner**.
- Fenom type casts: `boolval`, `doubleval`, `floatval`, `intval`, `strval`. `array_merge` is allowed by default.
- Option key `pdotools_cache_path` for Fenom/pdoTools cache directory (default `{core_path}cache/pdotools`).
- pdoPage: snippet call properties are available as placeholders inside pagination templates.
- pdoFetch: extra categories use MiniShop3 (`msCategoryMember`). Pass **&disableMS3**=`1` to skip. miniShop2 / `&disableMS2` are removed.
- Fenom compile/runtime errors name the chunk or resource and include a source excerpt (cache key stays a content hash).
- Snippet result cache keys include the current context.
