---
author: biz87
---

# Caching

mFilter uses a multi-level caching system for performance.

## Cache types

### 1. Filter cache (DB)

Stored in table `mfl_cache`. Cached data:

- **suggestions** — available filter values with counts
- **filter_values** — values for building the form

**Key format:**

```
suggestions_{resourceId}_{filterHash}
filter_values_{resourceId}_{depth}
```

### 2. Router cache (file)

Stored in `core/cache/mfilter/filter_pages.cache.php`.

Contains URI → resource ID mapping for fast detection of filter pages.

```php
<?php
// mFilter filter pages cache
return [
    'catalog/' => 5,
    'catalog/phones/' => 12,
    'catalog/tablets/' => 15,
];
```

### 3. Slug cache (memory)

Held in memory during the request:

- `slugCache` — value → slug
- `valueCache` — slug → value

Preloaded when parsing the URL to minimize DB queries.

### 4. Warmup cache (DB)

Stored in table `mfl_cache`. Created by the warmup system ahead of time, before the user visits the page.

Three data types are cached:

- **baseIds** — product IDs in the category (result of `ElementRunner::getIds()`)
- **filter values** — values for building the filter form
- **suggestions** — facet counts (number of products per value)

**Key format:**

```
baseids_{resourceId}_{cacheKeyHash}
filters_{resourceId}_{depth}
suggestions_forids_{resourceId}_{filterHash}
```

Warmup configurations are stored in `mfl_warmup_configs` and `mfl_warmup_config_resources`.

More: [Cache warmup](interface/warmup)

## System settings

| Setting | Description | Default |
|-----------|----------|--------------|
| `mfilter.cache_enabled` | Enable caching | `true` |
| `mfilter.cache_lifetime` | Filter cache lifetime (sec) | `3600` |
| `mfilter.cache_router_lifetime` | Router cache lifetime (sec) | `86400` |

## Clearing cache

### From the admin

**Maintenance → Clear cache**

Clears:

- All rows from table `mfl_cache`
- File `filter_pages.cache.php`

### Programmatically

```php
$mfilter = $modx->services->get('mfilter');

// Clear all cache
$mfilter->clearCache();

// Clear cache for a specific page
$mfilter->invalidatePageCache($resourceId);

// Rebuild router cache
$mfilter->rebuildRouterCache();
```

### Via Filter service

```php
$filter = $mfilter->getFilter();

// Clear cache for a resource
$filter->clearCache($resourceId);

// Clear all filter cache
$filter->clearCache(0);
```

## Automatic invalidation

Cache is cleared automatically when:

| Event | What is cleared |
|---------|---------------|
| Filter set saved | Cache for pages in that set |
| Filter set deleted | Cache for all pages |
| Set bindings changed | Router cache |

### Manual invalidation when products change

After bulk product updates, cache is refreshed by the recurring `mfl_warmup` task.

For an immediate refresh:

```php
$mfilter = $modx->services->get('mfilter');

// Clear cache
$mfilter->clearCache();

// Run warmup (if Scheduler is installed)
$mfilter->getWarmupManager()->schedule(true);
```

## Scheduler (background tasks)

With Scheduler installed, two tasks are available:

### mfl_rebuild_cache — rebuild cache

Clears and rebuilds router and filter cache.

```php
$mfilter = $modx->services->get('mfilter');
$taskId = $mfilter->scheduleCacheRebuild();
```

| Parameter | Description | Default |
|----------|----------|--------------|
| `clear_first` | Clear cache before rebuild | `true` |
| `rebuild_router` | Rebuild router cache | `true` |
| `rebuild_filters` | Rebuild filter cache | `true` |

### mfl_warmup — cache warmup

Warms baseIds, filter values, and facet counts for all active configurations. Recurring by default — runs every 50 minutes.

```php
$warmupManager = $mfilter->getWarmupManager();
$runId = $warmupManager->schedule(true); // true = include facet counters
```

| Parameter | Description | Default |
|----------|----------|--------------|
| `warm_suggestions` | Warm facet counters and filter values | `true` |

More: [Cache warmup](interface/warmup)

## Disabling cache

### Globally

```
System settings → mfilter.cache_enabled → No
```

### For debugging

With the profiler on (`mfilter.debug_profiler`) you will see in logs:

- `suggestions.cacheHit` — cache hit
- `suggestions.cacheCheck` — cache check time

## Cache size

### Check in the admin

**mFilter → Maintenance → System status**

Shows:

- Number of cache entries
- Number of cache files

### Programmatically

```php
// Row count in DB
$count = $modx->getCount('MFilter\\Model\\MflCache');

// Cache files
$cachePath = MODX_CORE_PATH . 'cache/mfilter/';
$files = glob($cachePath . '*');
```

## Recommendations

### Small catalogs (up to 1000 products)

- Use default settings
- Cache will refresh automatically when TTL expires

### Medium catalogs (1000–10000 products)

- Increase `cache_lifetime` to 7200–14400
- Clear cache after import

### Large catalogs (10000+ products)

- Set up [cache warmup](interface/warmup) — create a configuration and bind catalog pages
- The recurring `mfl_warmup` task will refresh cache automatically
- Tune warmup interval and TTL to catalog size and update frequency

```
# Example for a 200k-product catalog (warmup ~30 min)
mfilter.cache_lifetime = 7200    # TTL 2 hours
# task interval = 6000           # warmup every 100 min
```

### When products update often

The recurring warmup refreshes cache automatically. Maximum delay equals the warmup interval.

For an immediate refresh after import — run `mfl_warmup` manually from the manager.

### When products rarely change

Increase TTL and warmup interval:

```
mfilter.cache_lifetime = 86400
# task interval = 43200  # warmup twice per day
```

## mfl_cache table structure

| Column | Type | Description |
|------|-----|----------|
| `id` | int | Primary key |
| `cache_key` | varchar(255) | Unique cache key |
| `cache_value` | mediumtext | Serialized data (JSON) |
| `created_at` | datetime | Creation time |
| `expires_at` | datetime | Expiration time |

**Indexes:**

- `uk_cache_key` — unique index on key
- `idx_expires` — index for purging expired rows
