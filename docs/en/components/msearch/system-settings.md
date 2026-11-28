# System settings

All component settings live in the **`msearch`** namespace and have the **`mse_`** prefix. In the manager they are grouped into three areas: **Indexing**, **Search**, **Frontend**.

## Indexing (`mse_index`) {#index-settings}

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `mse_index_fields` | textfield | `pagetitle:3,longtitle:2,description:2,introtext:2,content:1` | `modResource` fields to index, with weights. Used by `ResourceAdapter::getIndexableFields()` |
| `mse_index_fields_product` | textfield | `pagetitle:3,longtitle:2,description:2,introtext:2,article:3` | Fields to index for `msProduct` products (miniShop3). Used by `MsProductAdapter::getIndexableFields()`. Supports `article` from `msProductData` |
| `mse_index_min_word_length` | numberfield | `3` | Minimum word length for indexing. Shorter words are ignored. Used in `Indexer::extractWords()` and `Searcher::splitQuery()` |
| `mse_index_split_words` | textfield | `#\s\|[,.:;!?"'«»„"()\[\]{}<>]#u` | Regular expression for splitting text into words during indexing |
| `mse_use_scheduler` | combo-boolean | `0` | Use MODX Scheduler for deferred background indexing on resource save. Requires the Scheduler component |

### `mse_index_fields` / `mse_index_fields_product` format

A comma-separated list of fields, each as `name:weight`:

```
pagetitle:3,longtitle:2,description:2,introtext:2,content:1
```

The weight affects ranking: a match in a field with weight `3` contributes three times as much to the score as a match in a field with weight `1`.

Supported:

- Regular `modResource` fields (`pagetitle`, `longtitle`, `description`, `introtext`, `content`, `alias`, etc.).
- TV fields with the `tv_` or `tv.` prefix (e.g. `tv_color:2` or `tv.tags:1`).
- For `mse_index_fields_product` — `msProductData` fields (e.g. `article`).

::: warning Reindex after changes
Changing the setting requires a reindex — existing index entries were built from the previous field list.
:::

## Search (`mse_search`)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `mse_search_split_words` | textfield | `#\s+#u` | Regular expression for splitting the search query into words. Usually simpler than the indexing one (whitespace only) |
| `mse_search_exact_match_bonus` | numberfield | `10` | Extra weight when the whole query occurs verbatim in `mse_intro` |
| `mse_search_like_match_bonus` | numberfield | `3` | Extra weight for every result found by the LIKE search — the whole query as a substring of `mse_intro`. Added both to resources that are not in the word index and to those already found there |
| `mse_search_all_words_bonus` | numberfield | `5` | Extra weight when **all** query words are found in the document (not just some of them) |
| `mse_suggest_min_query_length` | numberfield | `2` | Minimum query length for autocomplete. For shorter queries `/search/suggest` answers `{"items": []}` without touching the index. The lower bound is `1`: `0` is treated as `1`, and an empty query never returns suggestions |

### How bonuses work

The base score of a result is the sum of `(field_weight × match_count)` over all found words. Bonuses are added on top:

| Scenario | Score increase |
|----------|----------------|
| The whole phrase occurs verbatim | `+exact_match_bonus` |
| All query words are found in the document | `+all_words_bonus` |
| The document is found by the LIKE search | `+like_match_bonus` |

The exact match and all-words bonuses are calculated only for the top 100 results by the score accumulated before them. The LIKE search returns at most 1000 matches.

Increasing `exact_match_bonus` and `all_words_bonus` lifts "quality" results above partial matches. Decreasing `like_match_bonus` reduces the influence of LIKE matches on the top of the results.

## Frontend (`mse_frontend`)

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `mse_frontend_css` | textfield | `[[++assets_url]]components/msearch/css/web/msearch.css` | URL of the CSS file registered by `mSearchForm` and by `mSearch` (with `return=chunks`). An empty value means no CSS is loaded |
| `mse_frontend_js` | textfield | `[[++assets_url]]components/msearch/js/web/msearch.js` | Reserved; in the current implementation `mSearchForm` uses a hard-coded layered stack of 6 files (see below). The setting is not loaded automatically |

### Replacing the CSS

To replace the styles, copy the file to your theme and set its path:

```
mse_frontend_css = [[++assets_url]]templates/mytheme/css/my-msearch.css
```

The `[[++assets_url]]` and `{$assets_url}` substitutions are supported in the value.

### Note on `mse_frontend_js`

The setting is inherited from mSearch2, where all the JS was a single file. After the move to the layered architecture (1.2.0+) the `mSearchForm` snippet registers six separate files in code. The JS stack cannot be configured through this setting.

Ways to extend JS behavior without changing the stack:

- Subscribe to `msearchHooks` hooks in your own `<script>` after our files are loaded (see [JavaScript API](/en/components/msearch/javascript-api)).
- Install your own plugin and register additional scripts via `OnWebPagePrerender`.

Reviving the setting is planned — see [issue #6](https://github.com/biz87/mSearch/issues/6).

## Optional settings (not registered automatically)

These settings are read by the code but are **not created** when the package is installed. If needed, create them manually via **System Settings → New Setting** in the manager.

### `mse_cors_origin`

| Type | Default | Read in |
|------|---------|---------|
| textfield | `''` (empty) | `assets/components/msearch/api.php` |

Controls the CORS policy of the public API (`api.php`):

- **Empty value** (default) — only same-origin requests are allowed. This is the safe mode for a typical site.
- **A specific origin** (e.g. `https://my-spa.example.com`) — the `Access-Control-Allow-Origin: <value>` header is added, allowing cross-origin requests only from that origin.

Used when integrating mSearch with a separate SPA frontend on another domain.

::: warning Cookies with cross-origin
The autocomplete configuration (`tpl`, `limit`, `element`, etc.) is stored in the **MODX cache** under `formId`, not in cookies, so there are usually no `withCredentials` issues. But if the SPA client does not call the `mSearchForm` snippet to register the configuration, it works in headless mode with default values. See [mSearchForm snippet → Headless mode](/en/components/msearch/snippets/msearchform#headless-mode).
:::
