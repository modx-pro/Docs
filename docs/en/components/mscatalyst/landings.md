# Landing pages

A landing page answers a query like "red Bosch drills": it has its own URL, title, H1, description and text above and below the products. msCatalyst keeps landing pages in its own tables, so you don't need SeoFilter. Landing pages work on MODX 2 and MODX 3 with `mscatalyst_seo_mode` set to `native`. How to turn that mode on is described in [SEO](seo#built-in-friendly-urls).

Demo: [`chelnysite.ru/belye-krossovki/`](https://chelnysite.ru/belye-krossovki/), English version [`chelnysite.ru/en/white-sneakers/`](https://chelnysite.ru/en/white-sneakers/).

## The Landing pages tab

Pick a catalog and a language. A catalog shows up in the list once its page with the msCatalyst call has been opened on the site: the manager page takes the same facets as the page itself.

- **Pages.** Pick a facet or a pair, for example "Vendor + Color". The table lists every combination with products, its URL, the index rule and where the texts come from. "Set up" (or "Edit" on a saved page) opens the editor: own URL, index rule, name in the links block, title, H1, description, HTML above and below the products. On the right you see the search result preview and the links block of this page, both update as you type.
- **Templates.** Texts for every page with one facet combination, for example every "Color + Vendor". A template covers one catalog or all of them, one language or all. Among matching templates the higher priority wins.
- **Word forms.** Forms of values for the placeholders: "красные", "красного", "красных". The grey form comes from the Russian rules. Type your own if a rule got it wrong.
- **Check.** Finds landing pages without products, URLs that clash with site pages or filter paths, and indexed pages without text.

"Export CSV" and "Import CSV" download and upload the landing pages of a catalog. Delimiter `;`, UTF-8, columns `key`, `filters`, `url`, `index_mode`, `active` and the text fields. The `filters` column is for people, the import matches rows by `key`.

## Where texts come from

For each field msCatalyst takes the first filled value:

1. the landing page field;
2. a template of this catalog for the same facet set;
3. a template of all catalogs for the same facet set;
4. the "any combination" template;
5. the `mscatalyst_seo_title_filtered`, `mscatalyst_seo_h1_filtered`, `mscatalyst_seo_description` settings.

## Placeholders in templates

```
{color:plural:lower} {vendor}{?size}, size {size}{/size}: {total} items
```

- `{pagetitle}`, `{total}`, `{page}`, `{filters}`, `{query}`;
- `{color}`: selected values of the facet, `{color.title}`: the facet title;
- singular cases after `:`: `gen`, `dat`, `acc`, `ins`, `pre`, `about`;
- plural: `plural`, `plural_gen`, `plural_dat`, `plural_acc`, `plural_ins`, `plural_pre`, `plural_about`;
- places: `where` ("в Москве"), `to` ("в Москву"), `from` ("из Москвы"). Rules don't guess them, type the forms on the Word forms tab;
- letter case: `lower`, `upper`, `ucfirst`, `title`, for example `{color:plural:lower}`;
- `{?size}…{/size}` prints the part when the facet is selected, `{!size}…{/size}` when it is not.

When the language is Russian, msCatalyst declines adjectives and plural words by rules. A value in the plural ("Экскаваторы", "Буровые установки") gets plural cases: `{parent:gen}` prints "экскаваторов", `{parent:pre}` prints "экскаваторах". The rules guess the plural genitive from the ending, so check it on the Word forms tab. Vendor names skip the noun rules: type the brand forms you need on the Word forms tab. Other languages use the forms from the Word forms tab.

A hand-written form beats the rule. A filled "Nominative" form replaces the value itself: `{vendor}` prints it instead of the stored value. A missing `about` falls back to `pre`, a missing `plural_acc` to `plural`. The old `{{pagetitle}}` syntax in the settings still works.

## URLs and indexing

- Set the own URL without the section: `white-sneakers` or `shoes/white`. The page opens at `/catalog/white-sneakers/`.
- The old friendly URL and GET filters answer 301 to the own URL. Filter links, chips, paging and the sitemap use it too.
- A landing URL typed in another letter case or without the trailing slash answers 301 to the right one.
- A visitor who adds one more filter on a landing page moves to the regular friendly URL.
- Index rule: "Auto" follows `mscatalyst_seo_index_max`, "Always indexed" opens the page with any number of values, "Always noindex" closes it.
- The `mscatalyst_seo_empty` setting decides what a page without products answers: `noindex`, `404` or a normal page.

## Texts on the page

```modx
<div data-msc-intro>[[!+mscatalyst.intro]]</div>
[[!msCatalyst? ...]]
<div data-msc-text>[[!+mscatalyst.text]]</div>
```

After an AJAX update the script replaces the content of the `data-msc-intro` and `data-msc-text` blocks and hides empty ones. Title, H1 and description go to the same placeholders as without landing pages, see [Page placeholders](frontend#page-placeholders).

## Links block

```modx
[[!msCatalystLandings? &mode=`related` &facets=`vendor, color` &limit=`12` &title=`Popular`]]
```

Place the call after msCatalyst: the snippet reuses its index and selected filters. The parameters are listed in [msCatalystLandings](snippets/service#mscatalystlandings). With `&catalog` the block works on any page of the site, for example in a menu or on the home page.

Links lead to the own URL of a landing page when it has one. Links without products are skipped.

## Sitemap

```modx
[[!msCatalystSitemap? &catalogs=`*`]]
```

The sitemap lists landing pages with an own URL or the "Always indexed" rule that have products, plus friendly URLs of single values. The parameters are listed in [msCatalystSitemap](snippets/service#mscatalystsitemap).

## If SeoFilter is already set up

msCatalyst imports SeoFilter rules, URLs and the dictionary, see [Moving from SeoFilter](seofilter).
