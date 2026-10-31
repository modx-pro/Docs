# SEO

## Meta tags and indexing

- On pages with selected filters or a search query, the snippet adds `<meta name="robots" content="noindex, follow">`. Pagination pages without filters stay indexed. Turn this off with `` &noindexFiltered=`0` ``. With friendly URLs some of these pages stay indexable, see "Indexing friendly URL pages" below.
- AJAX responses are sent with the `X-Robots-Tag: noindex, nofollow` header.
- Pagination links and the remove icons on selected filters are real links with `href`. A search bot can follow them without JavaScript.
- For `<title>`, H1, description and `<link rel="canonical">`, use the placeholders `mscatalyst.title`, `mscatalyst.h1`, `mscatalyst.description` and `mscatalyst.canonical`, see [Page placeholders](frontend#page-placeholders).

## Title, H1 and description templates

The templates are set in system settings and apply when at least one filter is selected:

| Setting | Default |
|---|---|
| `mscatalyst_seo_title_filtered` | `{{pagetitle}} — {{filters}}` |
| `mscatalyst_seo_h1_filtered` | `{{pagetitle}}: {{filters}}` |
| `mscatalyst_seo_description` | `{{pagetitle}}. {{filters}}. Найдено: {{total}}` |

Placeholders: `{{pagetitle}}`, `{{filters}}` (selected values and the search query), `{{total}}`, `{{page}}`.

## Modes

The mode is set by the `&seo` property, or by the `mscatalyst_seo_mode` setting if the property is not set.

| Mode | What it does |
|---|---|
| `off` | No friendly filter URLs, the URL has GET parameters. |
| `native` | Built-in friendly filter URLs. The plugin parses them on `OnPageNotFound`. |
| `seofilter` | A bridge to SeoFilter on MODX 2. |
| `both` | SeoFilter and built-in URLs together. |

## Built-in friendly URLs

With `&seo=`native`` every selected filter becomes a URL segment:

```
/catalog/vendor-nike/color-krasnyy-or-siniy/price-1000-2000/
```

A segment starts with the facet key. Values come from the labels and are transliterated to Latin. Several values are joined with `-or-`. Here `krasnyy-or-siniy` is the transliteration of "красный" (red) and "синий" (blue). For a range, the "from" and "to" bounds follow the key.

### How to turn it on

1. Turn on MODX friendly URLs (`friendly_urls`).
2. Set the `mscatalyst_seo_mode` system setting to `native` or `both`. The plugin reads only the setting. The `&seo` property in a call does not turn it on.
3. The catalog section URL must end with `/`. With the `.html` suffix, or on sites without friendly URLs, filters stay in GET parameters.
4. The msCatalyst plugin must be attached to `OnPageNotFound` and `OnWebPagePrerender`. The 1.3.0 installer attaches both.

### How the URL behaves

- Filters go into the path. Sorting, page number, page size and search stay in the query string: `/catalog/vendor-nike/?page=2&sort=ms-price-asc`.
- AJAX updates, pagination, the remove icons on selected values, "Clear all", Back and Forward all use these URLs.
- Old links with GET filters (`/catalog/?vendor=31`) and values in another order get a 301 to the one URL. Values inside a segment and the segments themselves follow a fixed order, so each selection has one URL.
- If any segment does not resolve (unknown key or value, a repeated key, an empty range), the visitor gets the 404 page. The catalog never opens under a stray URL.
- A catalog on the start page works too: `/vendor-nike/`.
- With Localizator the language prefix stays at the start: `/en/vendor-nike/color-white/`. Each language builds segments from its own labels. A Russian segment on the English version gets a 301 to the English one.

### Indexing friendly URL pages

A friendly URL page stays indexable when it has no more than `mscatalyst_seo_index_max` selected values (2 by default). Ranges, search, non-default sorting, a non-default page size and more values get `noindex, follow`. With `0`, every filtered page is noindex. While friendly URLs are off, the old `&noindexFiltered` rule applies.

`mscatalyst.canonical` holds the full URL with scheme and host, without sorting and page number. The language prefix is already included. Put it into the template `<head>` as is:

```modx
<link rel="canonical" href="[[!+mscatalyst.canonical]]">
```

The [msCatalystSitemap](snippets/service#mscatalystsitemap) snippet outputs a sitemap of filter URLs and landing pages:

```modx
[[!msCatalystSitemap? &catalogs=`*`]]
```

## Landing pages

A page with its own URL, title, H1 and text for a filter combination, for example `/catalog/white-sneakers/`. Works in `native` mode on MODX 2 and MODX 3, no SeoFilter needed. See [Landing pages](landings).

## SeoFilter

If SeoFilter is already set up on the site, msCatalyst imports its rules, URLs and dictionary, and templates with `[[+sf.*]]` keep working. While SeoFilter stays on a MODX 2 site, the `seofilter` and `both` modes act as a bridge to it. See [Moving from SeoFilter](seofilter).
