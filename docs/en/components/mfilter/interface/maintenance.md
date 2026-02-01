# Maintenance

Tools for maintaining and optimizing mFilter.

## Operations

### Reindex

Rebuilds filter indexes and cache.

**When to use:**

- After bulk product import
- After changing option structure
- When counts (suggestions) are wrong

**Action:**

```
Maintenance → Reindex
```

### Clear cache

Removes filter result cache.

**When to use:**

- After changing settings
- After component update
- When results are wrong

**Action:**

```
Maintenance → Clear cache
```

### Regenerate slugs

Recreates slugs for all filter values.

**When to use:**

- When changing transliteration rules
- After data migration

**Action:**

```
Maintenance → Regenerate slugs
```

### Rebuild router

Updates URL router cache.

**When to use:**

- After changing patterns
- After changing set bindings

**Action:**

```
Maintenance → Rebuild router
```

## Statistics

### Overview

| Metric | Description |
|------------|----------|
| **Filter sets** | Number of active sets |
| **Bindings** | Number of resource bindings |
| **Slugs** | Total slug count |
| **SEO templates** | Number of templates |
| **Word forms** | Number of word forms |

### Cache

| Metric | Description |
|------------|----------|
| **Cache entries** | Cached result count |
| **Cache size** | Data size |
| **Expired entries** | Entries past TTL |

## Automatic maintenance

### Expired cache cleanup

Runs via cron or on first request:

```php
// Plugin on OnWebPageInit or cron script
$mfilter = $modx->services->get('mfilter');
$mfilter->cleanExpiredCache();
```

### Cache settings

| Setting | Description |
|-----------|----------|
| `mfilter.cache_enabled` | Enable caching |
| `mfilter.cache_ttl` | Cache lifetime (seconds) |

## Diagnostics

### Check indexes

Ensure all required indexes exist:

```sql
SHOW INDEX FROM modx_mfl_slugs;
SHOW INDEX FROM modx_mfl_cache;
```

### Check configuration

```php
$mfilter = $modx->services->get('mfilter');

// Verify services load
$filter = $mfilter->getFilter();
$slugManager = $mfilter->getSlugManager();
```

### Logging

Enable debug for diagnostics:

```
System → System settings → mfilter.debug = Yes
```

Logs go to `core/cache/logs/error.log`.

## Backup

### Export data

Back up before maintenance:

```sql
-- Filter sets
SELECT * FROM modx_mfl_filter_sets INTO OUTFILE '/tmp/filter_sets.csv';

-- Slugs
SELECT * FROM modx_mfl_slugs INTO OUTFILE '/tmp/slugs.csv';

-- SEO templates
SELECT * FROM modx_mfl_seo_templates INTO OUTFILE '/tmp/seo_templates.csv';
```

### Import data

```sql
LOAD DATA INFILE '/tmp/filter_sets.csv' INTO TABLE modx_mfl_filter_sets;
```

## Performance tuning

### Recommendations

1. **Use cache** — enable `mfilter.cache_enabled`
2. **Set TTL** — 3600–86400 seconds is usually good
3. **DB indexes** — ensure all indexes exist
4. **Clean regularly** — purge expired cache

### Monitoring

```php
// Enable profiling
$modx->setOption('mfilter.profile', true);

// After request, check time
$mfilter = $modx->services->get('mfilter');
$profile = $mfilter->getProfiler()->getReport();
```
