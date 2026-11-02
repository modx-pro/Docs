# Service snippets

## msCatalystSync

Runs sync profiles on schedule and continues unfinished runs. Call it from cron or a scheduler, for example through a resource with an empty template or Scheduler.

```modx
[[!msCatalystSync? &seconds=`50`]]
```

| Property | Default | Description |
|---|---|---|
| `seconds` | `50` | How many seconds one call may run. Minimum 5. |
| `profile` | | Profile ID. Runs it right away, ignoring the schedule. |

A long exchange runs in steps. The step size is set by the `mscatalyst_sync_chunk` and `mscatalyst_sync_step_seconds` settings. Keep the step length below the server `max_execution_time`.

## msCatalystSitemap

Outputs an XML sitemap of filter URLs. It lists [landing pages](../landings) with an own URL or the "Always indexed" rule that have products, plus friendly URLs of single values. Works with `&seo=`native``, see [SEO](../seo).

```modx
[[!msCatalystSitemap? &catalogs=`*`]]
```

| Property | Default | Description |
|---|---|---|
| `catalogs` | `*` | Catalog page IDs separated by commas. `*`: every catalog the site has rendered. |
| `limit` | `5000` | Maximum number of URLs, no more than 50,000. |
| `parents` | | The old call on the catalog page itself: the category ID. With it `&catalogs` is not filled in. |
| `facets` | `vendor` | For the old call: facets whose values need URLs. Ranges are skipped. |
| `depth` | `10` | For the old call: how deep to look for products. |

Put the call into a separate resource with the XML content type and an empty template, for example `sitemap-filters.xml`. A catalog gets into the sitemap once its page has been opened on the site.

## msCatalystLandings

A links block of selections: refinements of the current choice, popular values or landing pages from the manager, see [Landing pages](../landings).

```modx
[[!msCatalystLandings? &mode=`related` &facets=`vendor, color` &limit=`12` &title=`Popular`]]
```

| Property | Default | Description |
|---|---|---|
| `mode` | `related` | `related` refines the current choice (a Bosch page shows "Bosch, red"), `auto` shows popular values, `saved` lists the landing pages from the manager. |
| `facets` | | Facets the links may use. Empty: every list facet. |
| `limit` | `12` | Number of links, 1 to 200. |
| `title` | | Block title. Empty: "Popular selections" from the lexicon. |
| `tpl` | `msCatalyst.landing` | Link chunk. |
| `tplOuter` | `msCatalyst.landings` | Wrapper chunk. |
| `toPlaceholder` | | Put the block into a placeholder instead of printing it. |
| `catalog` | `0` | Catalog page ID. With it the block works on any page of the site: `` [[!msCatalystLandings? &mode=`saved` &catalog=`5`]] ``. |

Without `&catalog`, place the call after msCatalyst: the snippet reuses its index and selected filters. Links lead to the own URL of a landing page when it has one. Links without products are skipped.

## msCatalystReindex

Clears the catalog index: the msCatalyst cache partitions and the `table` mode index files. Use it after imports by third-party tools that the msCatalyst plugin does not see. Suitable for cron.

```modx
[[!msCatalystReindex]]
```

From PHP, `MsCatalyst::clearIndex($modx);` does the same. msCatalyst sync clears the index by itself.

## msCatalystSeoFilter

A bridge to SeoFilter on MODX 2. Call it after `msCatalyst` in the catalog template. The snippet sets the placeholders `msc.seo.active` (how many filters are selected) and `msc.seo.query` (the query string of the current state).

```modx
[[!msCatalystSeoFilter]]
```

For AJAX updates the `mscatalyst:seo` event is more convenient, see [SEO](../seo).

## msCatalystDemoAdmin

A public component page without a manager login, for a demo site. Turn on the `mscatalyst_demo_admin` setting and call the snippet on a separate resource:

```modx
[[!msCatalystDemoAdmin? &docsUrl=`https://docs.modx.pro/components/mscatalyst/`]]
```

The visitor sees every tab. Edits to settings, synonyms and filter sets stay in the visitor's session and do not change the site. Sync is limited to dry runs. Writing and rollback are disabled. Export returns at most 200 rows. The demo connector answers only allowlisted actions, rate-limits requests per IP and sends `noindex`.

::: danger
While the setting is off, the snippet outputs nothing and the connector returns 404. Turn it on only on a demo site.
:::
