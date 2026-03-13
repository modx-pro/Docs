---
title: SeoFilter
description: Friendly URLs, meta tags and text generation
logo: https://modstore.pro/assets/extras/seofilter/logo.png
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

**SeoFilter** is a component that generates virtual pages from filter parameters, replaces content via AJAX, and more.

## How it works

1. Create a rule: add fields and set templates for the link name, title and texts where values will be substituted so that pages differ.
2. You get dozens, hundreds or thousands of pages.
3. All virtual pages are stored in a special table where you can set unique text, page URL and item count per page.

In text templates, besides simple substitution (e.g. "red" for `{$color}`), you can use declensions (red's, to red), result counts `{$count}`, resource id `{$id}`, current result page number `{$page}`. More on the [Substitutions in SEO texts](/en/components/seofilter/substitutions-in-seo) page.

Text processing is done by the **Fenom** templating engine, so you can use conditions, modifiers, resource field values and more.

The add-on integrates with mFilter2 ([mSearch2](/en/components/msearch2/)) and can replace titles, texts and breadcrumbs on the fly.

You can build a flexible SEO blog by tags with SeoFilter. Here is a [guide](/en/components/seofilter/quick-start-without-mfilter2-and-minishop2). The component can output menus from virtual pages, taking into account whether there are articles for a tag; in that case mSearch2 is not required, only pdoResources from pdoTools. pdoTools is required for the add-on to work.

## First-run tips

1. **Check system settings**: ensure friendly URLs are enabled and adjust SeoFilter settings — default replacement fields, counts and other options. To enable declensions you will need a token from morpher.ru.

2. **Add fields** on the first tab, ideally all that you use in filters (so SeoFilter can count results by them).

3. **Create a rule**: add the needed fields (you’ll see the variable name alias), set the link template (used in the menu) and texts. If you use counts, set the extra condition in JSON format.

4. **Adjust layout** in chunks and templates: add classes required for Ajax replacement (sf_h1, sf_content, …) for titles and texts, and placeholders that will replace the original page content. Example: `<h1 class="sf_h1">[[!+sf.h1:default=`[[*pagetitle]]`]]</h1>`

5. **Verify** that everything works: words collected correctly, pages generated and open with updated content. (In component system settings there is an option to disable "empty" pages — 404 where there are no results.)

## Component objects and their parameters

### Field

Field, filter, column — different names for the same idea. The main thing is to understand how class `msProductData` differs from `modResource` or `msProductOptions`. See [Field](/en/components/seofilter/objects/field).

### Rule

The main entity that links a page, fields and values to build links. See [Rule](/en/components/seofilter/objects/rule).

### Dictionary

All words collected when adding a field, tracked when new products are added or added manually. See [Dictionary](/en/components/seofilter/objects/dictionary).

### URL table

All generated links go here when you save a rule. When new words are added, links are generated automatically and appear here. See [URL table](/en/components/seofilter/objects/url-table).
