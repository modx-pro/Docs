# Changelog

Before version 1.2.0 the component was called msFacets.

## 1.3.0-pl1

- Multilingual catalogs. The language comes from `&lang`, the Localizator URL or the context culture (Babel). It is part of the index cache key and is passed to AJAX requests.
- Localizator: translated titles, texts, category names and localized TVs in filters, search and cards. `` &langStrict=`0` `` shows products without a translation with their original fields.
- "Translations" tab: filter titles and values per language, search, an "Untranslated only" filter, CSV download and upload. Translations are stored as ordinary lexicon entries.
- Value dictionary: one value translation for all filters, or for one group through `mscatalyst_value_<key>_<value>`.
- Filter titles pick up mFilter2 lexicon keys. A title from the "Translations" tab wins over `|title=` in the call.
- English lexicon entries no longer leak into other languages.
- Available values move to the top of the group after each selection. `&hideUnavailable` (on by default) hides values and groups without products.
- "Export" tab: products, categories, vendors and options to CSV, XLSX, JSON or XML, in a format that sync reads. An "Export" button on the category page.
- Sync and export of Localizator translations. Missing translations are created, and rollback restores them.
- MODX 3: localizator3 support.
- Babel: sync updates text fields of linked resources in other contexts.
- The component page hides settings for packages that are not installed.
- `&scrollOnUpdate` and `&scrollOffset`: turn off the scroll to the results after "Show results" and page links, or set the top offset for a sticky header. The default offset is 16px instead of 100px.
- Friendly filter URLs (`mscatalyst_seo_mode` = `native`) cover the whole visit: the address bar, pagination, remove icons, "Clear all", Back and Forward show `/catalog/vendor-nike/color-red/`. GET filters and values in another order get a 301 to the one URL. A catalog on the start page and Localizator language prefixes work too.
- Unknown filter paths answer 404 instead of the catalog or another page under a duplicate URL.
- Friendly pages with up to `mscatalyst_seo_index_max` selected values (2 by default) stay indexable. Ranges, search, sorting and more values get `noindex`.
- Canonical no longer points to a friendly path when friendly URLs are off.
- The `mscatalyst.canonical` placeholder holds the full URL with scheme and host, ready for `<link rel="canonical">`.
- [Landing pages](landings) without SeoFilter: own URLs (`/catalog/white-sneakers/`) for filter combinations with their title, H1, description and HTML above and below the products. Old friendly paths and GET filters get a 301 to the own URL, the sitemap lists it.
- Text templates per facet combination for one catalog or all, per language, with priority. Placeholders `{color}`, `{color.title}`, `{total}`, case and letter case modifiers, conditions `{?size}…{/size}`.
- All six Russian cases in both numbers (`:gen`, `:dat`, `:acc`, `:ins`, `:pre`, `:about`, `:plural_gen` and others) plus `:where`, `:to`, `:from`. A hand-written nominative form replaces the stored value.
- Plural values are declined too: "Буровые установки" with `:gen` gives "буровых установок", `:pre` gives "буровых установках". Vendor names keep their nouns as they are.
- Per-page index rule (auto, always indexed, always `noindex`) and the `mscatalyst_seo_empty` setting for pages without products.
- The [msCatalystLandings](snippets/service#mscatalystlandings) snippet: a links block with refinements, popular values or saved landing pages. With `&catalog` it works on any page of the site. Placeholders `mscatalyst.intro` and `mscatalyst.text`, AJAX updates `[data-msc-intro]` and `[data-msc-text]`.
- Landing pages tab: combinations with product counts, editor with a search result preview, templates, word forms, a check for empty pages and clashing URLs, CSV export and import.
- [Import from SeoFilter](seofilter): rules become templates, saved URLs become landing pages, the dictionary becomes word forms, old URLs answer 301. SeoFilter tables are read directly, so the import works after SeoFilter is removed and on MODX 3.
- A dry run report before the import, a button that turns off the SeoFilter plugin and switches to msCatalyst URLs, and a way back.
- `sfLink`, `sfMenu` and `sfSitemap` calls in templates, chunks and resources are rewritten to msCatalyst snippets after a preview. The original text is kept and can be put back.
- The `mscatalyst_seofilter_placeholders` setting: `sf.title`, `sf.h1`, `sf.description`, `sf.text` and other `sf.*` placeholders on filtered pages, so templates built for SeoFilter keep working. The import turns it on.
- A landing URL typed in another letter case or without the trailing slash answers 301 to the right one.
- `msCatalystSitemap` with `&catalogs`: one sitemap for every catalog the site has rendered, placed on any page.

## 1.2.0-pl1

- New name: msCatalyst. Installing on top of msFacets moves the settings, synonyms and filter sets. Old calls, placeholders, CSS classes and JS events work until version 2.0.
- Profile-based catalog sync: CSV, XLSX, JSON and XML APIs, Google Sheets both ways, 1C CommerceML 2 with orders and statuses, export feeds.
- Setup wizard: source analysis, key and modification detection, field matching with confidence and rules, matching of categories, vendors, options and values.
- Approved schema versions. A scheduled run stops when the source structure changes.
- Dry run with a change plan, and safeguards against mass unpublishing, price jumps and a truncated source.
- Writing miniShop2 and MiniShop3 products and msOptionsPrice2 and ms3Variants modifications. Creating categories, vendors and options. Image downloads.
- A rule for missing products. Rollback of any run. Product change history.
- Emails to the profile addresses when a run stops or ends with errors.
- The `msCatalystSync` snippet for cron.
- The `msCatalystDemoAdmin` public demo admin.
- Images: relative paths, signature check, no duplicates in the gallery, retries of failed downloads.
- Empty cells no longer erase site values by default.
- Fixed: live search previews on MiniShop3, gallery image order on MiniShop3, a TV used as the key created duplicates on the first import.

## 1.1.1-pl1

- The "Find in list" field of long groups is styled like the other fields.
- CSS and JS URLs include the package version, so the browser reloads them after an update.

## 1.1.0-pl1

- A new index for large catalogs. On 100,000 products a filter request takes 25–40 ms, and the index takes 4.7 MB.
- Live search on 100,000 products responds in 60–80 ms.
- The index is built in parts of 2,000 products. Peak memory on 100,000 products is under 100 MB.
- Typo tolerance does not touch words with digits: part numbers and sizes are matched exactly.
- AJAX responses include statistics and a `Server-Timing` header.

## 1.0.0-pl1

- Browser history: every filter, page and sort change. "Back" works over AJAX.
- Search with word forms, transliteration, typos, field weights and synonyms.
- Card chunk, grid and list views.
- Search modes `filter`, `page`, `live`, `live+page`, a search snippet with suggestions.
- Index modes `memory`, `table`, `auto`.
- SEO: friendly filter URLs, meta tag templates, sitemap, SeoFilter bridge.
- msOptionsPrice2 and ms3Variants modifications.
- REST connector, filter sets, index reset snippet.
- Component page in the manager.

## 1.0.0-beta1

- First public release.
