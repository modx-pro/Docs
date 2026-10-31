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

Outputs an XML sitemap of filter landing pages: one URL for every facet value that has products. Works with `&seo=`native``, see [SEO](../seo).

```modx
[[!msCatalystSitemap?
  &parents=`5`
  &facets=`vendor, option:color`
]]
```

| Property | Default | Description |
|---|---|---|
| `parents` | | Catalog category ID. |
| `facets` | `vendor` | Facets whose values need URLs. Ranges are skipped. |
| `limit` | `5000` | Maximum number of URLs, no more than 50,000. |
| `depth` | `10` | How deep to look for products. |

Put the call into a resource with the XML content type and an empty template.

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
