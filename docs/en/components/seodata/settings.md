# Settings

System settings live in the `seodata` namespace: **Settings → System Settings**.

| Key | Purpose |
| --- | --- |
| `seodata.use_rte` | The manager rich-text editor in the content template field |
| `seodata.product_where` | JSON filter of products during indexing, for example `{"Data.discontinued":0}` |
| `seodata.index_chunk` | How many categories one indexing step in the panel processes |
| `seodata.keep_filled_on_empty` | With “component” priority, do not overwrite a resource field when the template returns an empty string |
| `seodata.fallback_empty_resource` | With “resource” priority, use the template when the native field is empty |
| `seodata.always_append_page` | When `?page=N`, append the page-number template to title, pagetitle, and description |
| `seodata.include_zero_price_in_count` | Include products with a zero price in `{$count}` |
| `seodata.debug` | Write `[SeoData debug]` lines to the error log |
| `seodata.morpher_token` | Token for [ws3.morpher.ru](https://www.morpher.ru/ws3/), used by the word-form generation buttons |

A package update does not overwrite these values.

## Debugging

If a rule does not apply on the site:

1. Turn on `seodata.debug`.
2. Clear the MODX cache.
3. Open the page on the storefront.
4. Open **Reports → Error log**.

SeoData lines start with `[SeoData debug]`:

| Label | Meaning |
| --- | --- |
| `plugin:OnLoadWebDocument` | The plugin ran on this page |
| `resolve:personal` / `resolve:common` | Which rule was chosen |
| `process:rule` | H1, title, description, and content templates of that rule |
| `process:output` | The text after Fenom and the data priority |
| `plugin:apply` | Fields were written into the resource |
| `plugin:skip` / `process:no-rule` | No rule matched, the resource was not changed |
| `placeholders:fields` | Which custom fields were read |
| `placeholders:words` | How many word forms were loaded |
| `resolve:wrong-class` | The rule row was not loaded as a SeoData template. Update the package: the installer renames the old `class_key` column to `resource_class` |

Saves from the panel are logged too: `mgr:template-update` with the `active` and `resource_class` fields.

Turn `seodata.debug` off after the check, otherwise the log grows on every page view.
