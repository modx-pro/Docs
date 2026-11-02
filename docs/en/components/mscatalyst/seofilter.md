# Moving from SeoFilter

msCatalyst doesn't need SeoFilter. On a site without SeoFilter you don't have to install it: msCatalyst gives you landing pages, texts, word forms, friendly URLs and the sitemap, see [Landing pages](landings). SeoFilter has no MODX 3 release (modstore.pro marks it as incompatible with MODX 3), so on MODX 3 msCatalyst is the way to get landing pages with texts.

## Import

If SeoFilter already runs on the site, move it into msCatalyst. The "Import from SeoFilter" block shows up on the Landing pages tab once msCatalyst finds the SeoFilter tables. msCatalyst reads those tables directly, so the import works on MODX 3 and after SeoFilter is removed.

1. Open every catalog page that uses SeoFilter on the site, so msCatalyst learns its facets.
2. Press "Check the import". The report lists how many landing pages, templates, word forms and old URLs msCatalyst will move, and what it can't import: fields without a facet, pages msCatalyst hasn't seen yet, texts with Fenom logic.
3. Add the missing facets to the msCatalyst call and check again.
4. Press "Import". Running it again updates the records instead of making copies.
5. Press "Turn on msCatalyst addresses". msCatalyst disables the SeoFilter plugin without removing it and turns on its own URLs (`mscatalyst_seo_mode` = `native`). "Back to SeoFilter" undoes it. Without a SeoFilter plugin and with `native` already on, the button is hidden.
6. Press "Snippet calls". msCatalyst finds `sfLink`, `sfMenu`, `sfSitemap`, `sfWord`, `sfNearLink` and `sfNeighbors` calls in templates, chunks and resources and shows the replacement. `sfLink` and `sfSitemap` get an exact replacement, `sfMenu` an approximate one (a flat list). After you confirm, msCatalyst rewrites the calls and keeps the original text, "Put back" restores it. Fix calls in Fenom syntax and static elements by hand, the report lists them.
7. Check the pages and remove SeoFilter. Its uninstaller leaves the tables in the database, so you can run the import again after removal.

## What moves

- SeoFilter rules become text templates for the same facet set, URLs from `seofilter_urls` become landing pages with an own URL and the "Always indexed" rule;
- `{$color}`, `{$color_r}`, `{$m_color_r}` and `[[+color]]` become `{color}`, `{color:gen}`, `{color:plural_gen}`;
- the SeoFilter dictionary becomes forms on the Word forms tab, forms you already typed in msCatalyst stay;
- old URLs (`old_url`), and URLs in another letter case or without the trailing slash, answer 301 to the new URL. msCatalyst keeps them in the `mscatalyst_seo_redirects` table;
- the `h2`, `keywords` and `content` fields have no place to go, the report counts them.

## sf.* placeholders

The import turns on the `mscatalyst_seofilter_placeholders` setting. On filtered pages msCatalyst fills `[[+sf.title]]`, `[[+sf.h1]]`, `[[+sf.description]]`, `[[+sf.introtext]]`, `[[+sf.text]]`, `[[+sf.content]]`, `[[+sf.link]]`, `[[+sf.total]]` and `[[+sf.url]]`. Templates built for SeoFilter keep working. Once you switch them to `[[+mscatalyst.*]]`, turn the setting off.

## SeoFilter bridge (MODX 2)

While SeoFilter stays on the site, msCatalyst can run next to it. Set `|alias=` as in mFilter2 and `&seo=`seofilter`` or `both`. The AJAX response has a `seo` block: title, h1, description, canonical, aliases. The `mscatalyst:seo` event on `document` is there for the SeoFilter bridge or for your own meta tag replacement:

```js
document.addEventListener('mscatalyst:seo', function (e) {
    console.log(e.detail.seo.title, e.detail.seo.canonical);
});
```

The snippet [msCatalystSeoFilter](snippets/service#mscatalystseofilter) sets the template placeholders. The bridge works only on MODX 2 with SeoFilter installed.
