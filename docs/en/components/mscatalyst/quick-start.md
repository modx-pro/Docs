# Quick start

## Filter in the catalog

In the catalog category template (an msCategory resource), replace the `msProducts` call with the code below. On MODX 3 with MiniShop3 the call is the same.

```modx
[[!msCatalyst?
  &facets=`vendor, parent, option:color, ms:price|range`
]]
```

::: warning Uncached call
The exclamation mark is required. The snippet answers AJAX requests from the same page and reads the filters from the URL. A cached call would show every visitor the same selection.
:::

Styles and the script are added automatically. The page needs `</head>` and `</body>` for that.

An example with every facet type:

```modx
[[!msCatalyst?
  &parents=`5`
  &facets=`vendor|sort=count, parent|label=menutitle, tv:color|lex=color_, option:size|first=5, ms:price|range|step=100, ms:weight|range|title=Вес (кг), ms:made_in|title=Страна`
  &sorts=`menuindex, pagetitle, ms:price:asc, ms:price:desc, publishedon:desc`
  &limits=`12, 24, 48`
  &searchFields=`pagetitle^3, ms:article^5, introtext, content, option:brand`
]]
```

All properties and the facet syntax are described on the [msCatalyst](snippets/mscatalyst) snippet page.

## Search in the header

```modx
[[!msCatalystSearch?
  &parents=`5`
  &searchPage=`5`
]]
```

More: [msCatalystSearch](snippets/mscatalystsearch).

## SEO headings

```modx
<title>[[!+mscatalyst.title]]</title>
<meta name="description" content="[[!+mscatalyst.description]]">
<h1 data-msc-h1>[[!+mscatalyst.h1]]</h1>
```

Heading templates and indexing rules are described in [SEO](seo).

## Loading the catalog

Open "Extras → msCatalyst", the "Sync" tab, and create a profile: a CSV or XLSX file, an API, a Google Sheet or 1C. The wizard walks you through source analysis, field matching and a dry run. More: [Sync](interface/sync).

## Cron for sync

After you approve the schema, put `cron.php` into the system crontab. No separate MODX resource is needed:

```bash
*/5 * * * * /usr/bin/php /var/www/site/assets/components/mscatalyst/cron.php
```

Replace the PHP binary and the site path with yours. Every five minutes the script continues unfinished runs and starts profiles whose schedule is due. The file refuses HTTP — CLI only.

Common variants:

```bash
php /var/www/site/assets/components/mscatalyst/cron.php
php /var/www/site/assets/components/mscatalyst/cron.php --seconds=50
php /var/www/site/assets/components/mscatalyst/cron.php --profile=3
```

`--seconds` limits one call (default 50). `--profile=ID` starts that profile now, ignoring its schedule. If the site already uses Scheduler, call `[[!msCatalystSync? &seconds=`50`]]` instead of the file. More: [service snippets](snippets/service#mscatalystsync).
