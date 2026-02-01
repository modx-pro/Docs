---
title: SeoFilter
description: Friendly URLs, meta tags and text generation
logo: https://modstore.pro/assets/extras/seofilter/logo-lg.png
author: sheronov
modstore: https://modstore.pro/packages/ecommerce/seofilter
repository: https://github.com/sheronov/SeoFilter

items: [
  { text: 'Quick start with mFilter2', link: 'quick-start-mfilter2' },
  { text: 'Quick start without mFilter2 and miniShop2', link: 'quick-start-without-mfilter2-and-minishop2' },
  { text: 'Additional features', link: 'additional-features' },
  {
    text: 'Snippets',
    link: 'snippets/',
    items: [
      { text: 'sfWord', link: 'snippets/sfword' },
      { text: 'sfLink', link: 'snippets/sflink' },
      { text: 'sfMenu', link: 'snippets/sfmenu' },
      { text: 'sfSitemap', link: 'snippets/sfsitemap' },
    ],
  },
  { text: 'Substitutions in SEO texts', link: 'substitutions-in-seo' },
  {
    text: 'Component objects',
    items: [
      { text: 'Field', link: 'objects/field' },
      { text: 'Rule', link: 'objects/rule' },
      { text: 'Dictionary', link: 'objects/dictionary' },
      { text: 'URL table', link: 'objects/url-table' },
    ],
  },
]
---
# SeoFilter

**SeoFilter** generates virtual pages from filter params, replaces content via AJAX and more.

## How it works

1. Create a rule with fields and templates for URL, title and texts.
2. Get dozens, hundreds or thousands of pages.
3. Virtual pages stored in a table; set unique text, URL, item count per page.

In text templates, besides simple substitution (e.g. "red" for `{$color}`), you can use declensions (red's, to red), counts `{$count}`, resource id `{$id}`, page number `{$page}`. See [Substitutions in SEO texts](/en/components/seofilter/substitutions-in-seo).

**Fenom** handles templates, so you can use conditions, modifiers, resource fields and more.

Integrates with mFilter2 ([mSearch2](/en/components/msearch2/)), replaces titles, texts, breadcrumbs on the fly.

Use SeoFilter for flexible tag-based SEO blogs. See [guide](/en/components/seofilter/quick-start-without-mfilter2-and-minishop2). Can output menus from virtual pages (with/without articles per tag). With pdoResources from pdoTools; mSearch2 optional. pdoTools required.

## First-run tips

1. **Check system settings**: enable friendly URLs; configure SeoFilter - default replacement fields, counts, options. For declensions, get token from morpher.ru.

2. **Add fields** - all used in filters (so SeoFilter can count results).

3. **Create rule** - add fields, templates for link, texts; set JSON conditions for counts.

4. **Adjust layout** - add classes (sf_h1, sf_content…) for AJAX replacement; placeholders. Example: `<h1 class="sf_h1">[[!+sf.h1:default=`[[*pagetitle]]`]]</h1>`

5. **Verify** - words correct, pages generated, content replaced. (Option to disable "empty" pages → 404 where no results.)

## Component objects

### Field

Field, filter, column - different names for same concept. Important: difference between `msProductData`, `modResource`, `msProductOptions`. See [Field](/en/components/seofilter/objects/field).

### Rule

Main entity linking page, fields and values for URLs. See [Rule](/en/components/seofilter/objects/rule).

### Dictionary

Words collected from fields, new products or manually. See [Dictionary](/en/components/seofilter/objects/dictionary).

### URL table

Generated links stored here when saving rule. New words auto-generate links. See [URL table](/en/components/seofilter/objects/url-table).
