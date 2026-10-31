# SEO

## Meta tags and indexing

- On pages with selected filters or a search query, the snippet adds `<meta name="robots" content="noindex, follow">`. Pagination pages without filters stay indexed. Turn this off with `` &noindexFiltered=`0` ``.
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

The [msCatalystSitemap](snippets/service#mscatalystsitemap) snippet outputs a sitemap of landing pages:

```modx
[[!msCatalystSitemap? &parents=`5` &facets=`vendor, option:color`]]
```

The SeoFilter bridge is written for MODX 2. On MODX 3, use `native`.

## SeoFilter (MODX 2)

Set `|alias=` as in mFilter2 and `&seo=`seofilter`` or `both`. The AJAX response has a `seo` block: title, h1, description, canonical, aliases. The `mscatalyst:seo` event on `document` is there for the SeoFilter bridge or for your own meta tag replacement:

```js
document.addEventListener('mscatalyst:seo', function (e) {
    console.log(e.detail.seo.title, e.detail.seo.canonical);
});
```

The [msCatalystSeoFilter](snippets/service#mscatalystseofilter) snippet sets the template placeholders.
