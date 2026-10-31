# System settings and cache

## System settings

All settings are easier to edit on the "Settings" tab of the component page: it has hints and value checks.

| Key | Default | Description |
|---|---|---|
| `mscatalyst_frontend_css` | `[[+assetsUrl]]css/mscatalyst.css` | Stylesheet file. Empty: no styles are added. |
| `mscatalyst_frontend_js` | `[[+assetsUrl]]js/mscatalyst.js` | Script file. Empty: no AJAX, the filter works as a GET form. |
| `mscatalyst_cache_lifetime` | `21600` | Index lifetime in seconds. `0` keeps the index until the cache is cleared, `-1` disables the cache (for debugging only). |
| `mscatalyst_index_mode` | `memory` | `memory`: index in the MODX cache. `table`: in the `core/cache/mscatalyst_index/` files. `auto`: pick by product count. |
| `mscatalyst_index_auto_threshold` | `8000` | From this many products, `auto` mode stores the index in files. |
| `mscatalyst_seo_mode` | `off` | SEO mode when the call has no `&seo`, see [SEO](seo). |
| `mscatalyst_seo_index_max` | `2` | How many selected values a friendly URL page may have and stay indexable. `0`: every filtered page gets `noindex`. |
| `mscatalyst_seo_title_filtered` | `{{pagetitle}} — {{filters}}` | Filtered page title. |
| `mscatalyst_seo_h1_filtered` | `{{pagetitle}}: {{filters}}` | Filtered page H1. |
| `mscatalyst_seo_description` | `{{pagetitle}}. {{filters}}. Найдено: {{total}}` | Filtered page description. |
| `mscatalyst_search_synonyms` | | JSON of search synonyms, for example `{"шланг":"рукав,hose"}`. |
| `mscatalyst_legacy_markup` | `No` | Add `msf-*` classes for styles written for msFacets. Turned on automatically on upgrade. |
| `mscatalyst_sync_path` | | Folder for source files and 1C exchange files. Empty: `core/cache/mscatalyst_sync/`. The folder is closed to browsers. |
| `mscatalyst_sync_chunk` | `200` | How many source rows are handled in one pass. Lower it on weak hosting. |
| `mscatalyst_sync_step_seconds` | `20` | Sync step length in seconds. Keep it below `max_execution_time`. |
| `mscatalyst_sync_images_path` | | Folder for photos from the source. Empty: `assets/images/products/`. |
| `mscatalyst_sync_images_url` | | URL of the same folder. Empty: `/assets/images/products/`. |
| `mscatalyst_demo_admin` | `No` | Public demo admin. For a demo site only. |

Filter sets are stored in `mscatalyst_set_<name>` settings, see [Filter sets](snippets/mscatalyst#filter-sets).

## Cache and index

msCatalyst builds a catalog index: facet values, sort values and search strings of every product in the category. Counting and filtering run on the in-memory index, without database queries on every click.

| Mode | Where it is stored | Use for |
|---|---|---|
| `memory` | The `core/cache/mscatalyst/` cache partition | Catalogs up to a few thousand products. |
| `table` | Files in `core/cache/mscatalyst_index/` | Large catalogs. On 100,000 products a filter request takes 25–40 ms. |
| `auto` | Picked by `mscatalyst_index_auto_threshold` | When the product count is not known in advance. |

The msCatalyst plugin clears the index when you save, publish, unpublish, delete, undelete, duplicate or move a product or category, and also when the cache or the trash is cleared. msCatalyst sync clears the index by itself.

The plugin does not see imports through the API or direct database queries. After such an import:

- click "Clear index" on the "Index" tab of the component page;
- or call the `[[!msCatalystReindex]]` snippet;
- or run `MsCatalyst::clearIndex($modx);`.
