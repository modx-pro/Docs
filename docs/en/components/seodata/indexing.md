# Indexing

Category prices and product counts are calculated ahead of time, so the storefront does not assemble them on every view. The result goes into `{$price.min}`, `{$price.max}`, `{$price.avg}`, and `{$count}`.

![Maintenance tab](./img/maintenance.png)

The **Build index** button walks categories in batches. The batch size is the `seodata.index_chunk` setting. On a live site a daily cron is more convenient:

```bash
0 1 * * * php /path/to/core/components/seodata/cron/run.php
```

The path in the panel is already filled into the cron line on the “Maintenance” tab.

The index includes MiniShop3 categories. Which products to count is limited by the `seodata.product_where` JSON filter, for example `{"Data.discontinued":0}`. The `seodata.include_zero_price_in_count` setting decides whether products with a zero price are included in `{$count}`.

Without MiniShop3 the tab says that catalog indexing is unavailable. Document templates still work.
