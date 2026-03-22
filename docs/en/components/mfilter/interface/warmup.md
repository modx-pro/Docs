# Cache warmup

The **Cache warmup** tab lets you manage warmup configurations — precompute and cache filter data so catalog pages load instantly on first request.

## Why warmup

On first open of a catalog page, mFilter runs three heavy steps:

1. **baseIds** — load all product IDs in the category
2. **filter values** — compute available filter values (brands, colors, sizes)
3. **suggestions** — count products for each filter value

For large catalogs (10 000+ products) this can take 5–60 seconds. Warmup runs these steps in the background and stores results in cache.

## Configuration table

| Column | Description |
|--------|-------------|
| ID | Configuration ID |
| Name | Configuration name |
| Element | Data snippet (msProducts, pdoResources) |
| Pages | Number of bound catalog pages |
| Auto | “Auto” if created automatically |
| Last warmup | Date and duration of last warmup |
| Status | Active / Disabled |

## Creating a configuration

### Automatic

On first visit to any catalog page with filters, a configuration is created automatically. The table shows a row marked **Auto** bound to that page.

### Manual

1. Click **Add configuration**
2. Enter a name (optional — generated from element and date)
3. Choose Element (msProducts, pdoResources, etc.)
4. Paste the snippet call into “Snippet call” and click **Parse** — parameters fill in automatically
5. Select catalog pages in the resource tree
6. Click **Save**

### Parsing snippet calls

Three formats are supported:

**Fenom:**

```smarty
{'!mFilter'|snippet:['element' => 'msProducts', 'parents' => $_modx->resource.id, 'limit' => 12]}
```

**MODX tag:**

```
[[!mFilter? &element=`msProducts` &parents=`5` &limit=`12`]]
```

**JSON:**

```json
{"element": "msProducts", "parents": 5, "limit": 12}
```

## Configuration editor

### Left column

- **Name** — arbitrary label
- **Element** — data snippet (msProducts, pdoResources, etc.)
- **Snippet call** — paste call code here and parse parameters
- **Parameters** — key/value table of snippet properties
- **Active** — enable/disable configuration

### Right column

- **Resource tree** — select catalog pages (lazy loading and bulk select buttons)

::: tip
When you check a parent category, child resources load and are selected automatically.
:::

## Running warmup

### From the manager (synchronous)

Click **Warm all** — warmup runs in the current request. Suitable for small catalogs or testing.

### Via Scheduler (background)

Click **Via Scheduler** — a scheduled job runs on cron. Recommended for large catalogs.

### Single configuration

Click the lightning icon in the row — only that configuration is warmed.

### “+ counters” checkbox

On by default. When enabled, warmup also computes and caches:

- Filter values (used by the mFilterForm filter form)
- Facet counters (product count per value)

If unchecked, only baseIds are cached.

## Recurring warmup

The `mfl_warmup` task is recurring by default — every 50 minutes. With default cache TTL (3600 sec = 1 hour) the cache is refreshed with a ~10 minute margin and does not expire between runs.

### Tuning interval

Interval and TTL depend on the project:

| Scenario | TTL | Interval | Description |
|----------|-----|----------|-------------|
| Small catalog | 3600 | 3000 | Default |
| Medium catalog | 7200 | 6000 | Warmup every 100 min |
| Large catalog | 14400 | 10800 | Warmup every 3 hours |
| Rare updates | 86400 | 43200 | Twice per day |

- **TTL** — system setting `mfilter.cache_lifetime`
- **Interval** — `interval` field on Scheduler task `mfl_warmup`

::: warning Important
Warmup interval must be **less than** cache TTL. If warmup takes N minutes, use: `TTL - N - margin`.
:::

## When products change

| Scenario | Action |
|----------|--------|
| Regular price/stock import | Nothing — recurring task updates cache |
| Bulk product import | Run warmup manually via **Via Scheduler** |
| Filter structure changed | Clear cache (Maintenance → Clear cache) + run warmup |
