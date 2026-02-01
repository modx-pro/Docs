# System settings

All settings use the `mfilter.` prefix and live in the `mfilter` namespace.

## Paths

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.core_path` | `{core_path}components/mfilter/` | Path to component core |
| `mfilter.assets_path` | `{assets_path}components/mfilter/` | Path to assets |
| `mfilter.assets_url` | `{assets_url}components/mfilter/` | Assets URL |

## URL and SEO

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.seo_urls_enabled` | `true` | Enable SEO-friendly URLs |
| `mfilter.url_separator` | `_` | Separator between key and value in URL (`brand_apple`) |
| `mfilter.values_separator` | `-or-` | Separator for multiple values (`red-or-blue`) |
| `mfilter.trailing_slash` | `true` | Add trailing slash to URL |

### URL examples

With default settings:

```
/catalog/brand_apple/color_red-or-blue/price_1000-5000/
```

With `url_separator` = `-` and `values_separator` = `,`:

```
/catalog/brand-apple/color-red,blue/price-1000-5000/
```

## Filtering

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.default_limit` | `20` | Default items per page |
| `mfilter.max_limit` | `100` | Maximum items per page |
| `mfilter.default_sort` | `pagetitle` | Default sort field |
| `mfilter.default_sortdir` | `ASC` | Default sort direction |

## SEO optimization

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.seo_noindex_filtered` | `false` | Add noindex for all filtered pages |
| `mfilter.seo_noindex_multiple` | `true` | Add noindex when multiple values of one filter are selected |
| `mfilter.seo_canonical_base` | `true` | Canonical points to the category base page |
| `mfilter.seo_max_filters` | `3` | Maximum active filters for indexing |

### noindex logic

```
seo_noindex_filtered = true     → noindex for any filtering
seo_noindex_multiple = true     → noindex for color_red-or-blue (multiple selection)
seo_max_filters = 3             → noindex if more than 3 filters are active
```

## Caching

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.cache_enabled` | `true` | Enable caching |
| `mfilter.cache_lifetime` | `3600` | Result cache lifetime (seconds) |
| `mfilter.cache_router_lifetime` | `86400` | URL router cache lifetime (seconds) |

### Cache clearing

Cache is cleared automatically when:

- A resource with configured filters is saved
- MODX cache is cleared
- A filter set is changed in the admin

Manual clear: **mFilter → Maintenance → Clear cache**

## Word forms

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.morpher_api_key` | `` | Morpher API key for automatic word form generation |
| `mfilter.wordforms_auto_generate` | `true` | Auto-generate word forms |

### Morpher API

For automatic declension you can use [Morpher API](https://morpher.ru/):

1. Register on the site
2. Get an API key
3. Set it in `mfilter.morpher_api_key`

Free tier: 1000 requests per day.

## Slugs

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.slugs_auto_generate` | `true` | Auto-generate slugs for values |
| `mfilter.slugs_transliterate` | `true` | Transliterate Cyrillic to Latin |

### Slug examples

| Value | slugs_transliterate | Slug |
|----------|---------------------|------|
| Red | true | `red` |
| Value in Cyrillic | true | `krasnyj` (transliterated) |
| Value in Cyrillic | false | (value unchanged in URL) |
| Apple iPhone | true | `apple-iphone` |

## Debugging

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.debug_profiler` | `false` | Enable profiler for performance debugging |

When the profiler is on, the AJAX response includes a `profiler` section:

```json
{
  "success": true,
  "data": { ... },
  "profiler": {
    "total_time": 0.045,
    "queries": 12,
    "memory": "2.5 MB"
  }
}
```

## Frontend

| Setting | Default | Description |
|-----------|--------------|----------|
| `mfilter.register_frontend` | `true` | Auto-register CSS/JS on the frontend |
| `mfilter.auto_submit` | `true` | Submit form automatically when filters change |
| `mfilter.auto_submit_delay` | `300` | Auto-submit delay (ms) |

### Frontend assets list

| Setting | Description |
|-----------|----------|
| `mfilter.frontend_assets` | JSON array of CSS/JS files to load |

Default:

```json
[
    "[[+cssUrl]]web/mfilter.css",
    "[[+jsUrl]]web/core/ApiClient.js",
    "[[+jsUrl]]web/core/FilterAPI.js",
    "[[+jsUrl]]web/modules/hooks.js",
    "[[+jsUrl]]web/mfilter.headless.js",
    "[[+jsUrl]]web/ui/FilterUI.js",
    "[[+jsUrl]]web/mfilter.slider.js",
    "[[+jsUrl]]web/mfilter.js"
]
```

### Disabling auto-registration

To load scripts manually:

1. Set `mfilter.register_frontend` = `false`
2. Include the files in your template:

```html
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>
<script src="/assets/components/mfilter/js/web/ui/FilterUI.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.js"></script>
```

## Configuration examples

### Minimal SEO config

```
mfilter.seo_urls_enabled = true
mfilter.seo_noindex_multiple = true
mfilter.seo_max_filters = 2
mfilter.seo_canonical_base = true
```

### High-traffic site

```
mfilter.cache_enabled = true
mfilter.cache_lifetime = 7200
mfilter.cache_router_lifetime = 86400
mfilter.default_limit = 24
mfilter.max_limit = 48
```

### No SEO URL (AJAX only)

```
mfilter.seo_urls_enabled = false
mfilter.auto_submit = true
mfilter.auto_submit_delay = 500
```
