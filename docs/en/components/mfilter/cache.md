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

When updating products in bulk, clear the cache:

```php
// After product import
$mfilter = $modx->services->get('mfilter');
$mfilter->clearCache();
```

## Scheduler (background tasks)

With Scheduler installed, a cache rebuild task is available.

### Running the task

```php
$mfilter = $modx->services->get('mfilter');
$taskId = $mfilter->scheduleCacheRebuild();
```

### Task parameters

| Parameter | Description | Default |
|----------|----------|--------------|
| `clear_first` | Clear cache before rebuild | `true` |
| `rebuild_router` | Rebuild router cache | `true` |
| `rebuild_filters` | Rebuild filter cache | `true` |

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

- Use Scheduler for background rebuild
- Schedule a cron job for off-peak hours:

```php
// Scheduler task
$mfilter->scheduleCacheRebuild();
```

### When products update often

If products change frequently (prices, stock), lower TTL:

```
mfilter.cache_lifetime = 1800
```

### When products rarely change

Increase TTL for maximum performance:

```
mfilter.cache_lifetime = 86400
mfilter.cache_router_lifetime = 604800
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
