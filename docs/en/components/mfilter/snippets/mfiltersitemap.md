# mFilterSitemap

Snippet for generating an XML sitemap of filtered pages.

## Description

mFilterSitemap creates an XML sitemap for filter virtual pages (SEO URLs). Works on the sitemap index principle — it only generates filter URLs that can be added to the main sitemap.

**Features:**
- Automatic detection of filter pages
- Combination limits to prevent "combinatorial explosion"
- Result caching
- Single and combined filter support
- Integration with MODX Scheduler for automatic generation

## Parameters

### Data source

| Parameter | Default | Description |
|-----------|---------|-------------|
| `parents` | auto | Resource IDs (comma-separated). Empty = all pages with filter sets |
| `filterKeys` | all | Filter keys to include (comma-separated) |

### Limits

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxFilters` | `1` | Max filters per URL (1 = single only) |
| `maxValues` | `1` | Max values per filter |

### SEO parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `priority` | `0.7` | URL priority (0.0–1.0) |
| `changefreq` | `weekly` | Update frequency (always, hourly, daily, weekly, monthly, yearly, never) |

### Templates

| Parameter | Default | Description |
|-----------|---------|-------------|
| `tpl` | built-in | Single URL template |
| `tplWrapper` | built-in | urlset wrapper |
| `sitemapSchema` | http://www.sitemaps.org/schemas/sitemap/0.9 | XML Schema |

### Output

| Parameter | Default | Description |
|-----------|---------|-------------|
| `forceXML` | `true` | Output XML header and exit |
| `return` | `chunks` | Return type: `chunks` (HTML) or `data` (array) |

### Caching

| Parameter | Default | Description |
|-----------|---------|-------------|
| `cache` | `true` | Enable caching |
| `cacheTime` | `3600` | Cache TTL (seconds) |

### Debug

| Parameter | Default | Description |
|-----------|---------|-------------|
| `debug` | `false` | Enable debug logs |

## Placeholders in templates

### tpl (per URL)

| Placeholder | Description |
|-------------|-------------|
| `{$url}` | Full page URL |
| `{$lastmod}` | Last modified date (ISO 8601) |
| `{$changefreq}` | Update frequency |
| `{$priority}` | Priority |
| `{$filterKey}` | Filter key |
| `{$value}` | Filter value |
| `{$resourceId}` | Base resource ID |

### tplWrapper

| Placeholder | Description |
|-------------|-------------|
| `{$output}` | All URL elements |
| `{$schema}` | XML Schema |
| `{$charset}` | Charset |
| `{$total}` | Total URL count |

## Examples

### Basic call (dedicated sitemap page)

Create resource `/sitemap-filters.xml` with template:

```fenom
{'!mFilterSitemap' | snippet}
```

### Specific filters only

```fenom
{'!mFilterSitemap' | snippet: [
    'filterKeys' => 'color,size,brand'
]}
```

### Two-filter combinations

```fenom
{'!mFilterSitemap' | snippet: [
    'maxFilters' => 2,
    'priority' => '0.6'
]}
```

**Warning:** With many values this can produce a very large number of URLs!

### For a specific category

```fenom
{'!mFilterSitemap' | snippet: [
    'parents' => '5,10,15',
    'filterKeys' => 'color,brand'
]}
```

### Without auto XML output

```fenom
{set $sitemapXml = '!mFilterSitemap' | snippet: [
    'forceXML' => false
]}

{* Can process or save *}
{$sitemapXml}
```

### Get data as array

```fenom
{set $urls = '!mFilterSitemap' | snippet: [
    'return' => 'data',
    'forceXML' => false
]}

{* urls is array of data *}
Total URLs: {$urls | count}
```

### Custom URL template

```fenom
{'!mFilterSitemap' | snippet: [
    'tpl' => '@INLINE <url>
    <loc>{$url}</loc>
    <lastmod>{$lastmod}</lastmod>
    <changefreq>{$changefreq}</changefreq>
    <priority>{$priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="{$url}"/>
</url>'
]}
```

## Scheduler task

mFilter includes a task for automatic sitemap generation via MODX Scheduler.

### Setup

1. Ensure Scheduler is installed
2. Task `mfl_generate_sitemap` is created automatically
3. Configure schedule in Scheduler manager

### Task parameters

```json
{
    "parents": "",
    "filterKeys": "",
    "maxFilters": 1,
    "priority": "0.7",
    "changefreq": "weekly",
    "outputFile": "assets/sitemap-filters.xml"
}
```

### Manual run

```php
$scheduler = $modx->services->get('scheduler');
$task = $scheduler->getTask('mfilter', 'mfl_generate_sitemap');
$task->schedule('+0 seconds');
```

## robots.txt integration

```
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-filters.xml
```

## pdoSitemap integration

If you use pdoSitemap for the main sitemap, create a separate resource for filters:

```
/sitemap.xml          — pdoSitemap (main pages)
/sitemap-filters.xml  — mFilterSitemap (filters)
/sitemap-index.xml    — index file
```

### sitemap-index.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://example.com/sitemap.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://example.com/sitemap-filters.xml</loc>
    </sitemap>
</sitemapindex>
```

## Recommendations

### URL count

Google recommends no more than 50,000 URLs per sitemap file. For large catalogs:

- Keep `maxFilters` at 1
- Split by category (use `parents`)
- Exclude rare filters

### Priority

Suggested values:
- Home: 1.0
- Categories: 0.8
- Products: 0.6
- **Filters: 0.5–0.7**

### Update frequency

For filters, `weekly` or `monthly` is usually enough, since structure changes infrequently.
