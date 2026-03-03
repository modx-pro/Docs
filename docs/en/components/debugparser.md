---
title: DebugParser
description: Plugin to find site bottlenecks. Shows all processed tags and time spent
logo: https://modstore.pro/assets/extras/debugparser/logo-lg.jpg
author: gvozdb
modstore: https://modstore.pro/packages/utilities/debugparser
modx: https://extras.modx.com/package/debugparser
repository: https://github.com/modx-pro/debugParser
---
# DebugParser

Plugin to find site bottlenecks. Shows all processed tags and time spent.

You can pinpoint and optimize slow calls on each page.

![DebugParser](https://file.modx.pro/files/1/a/c/1acbdf642c641a641ad6a646576fe4b3.png)

The table shows each MODX tag call, database queries count, query time, and total processing time.

If a tag is called multiple times on a page, those calls are summed.

::: warning
`Queries` and `Queries time` may be inaccurate if a snippet uses the database directly and does not write to `modX::executedQueries` and `modX::queryTime`. For example, **pdoResources** does, **getProducts** does not.
:::

At the bottom you see totals and general info: PHP version, DB, etc.

## Parameters

The debugParser plugin runs only for users logged in to the mgr context. It reads parameters from `$_GET`.

- `debug` — Enables debug mode and shows the table.
- `cache` — Allow page caching. Default: no.
- `top` — Number of tags to show. Default: unlimited.
- `add` — Append the table to the page instead of replacing it. Default: no.

## Fenom support

To see Fenom template engine tag execution you need:

- pdoTools **2.1.8**-pl or higher
- debugParser **1.1.0**-pl or higher
- Calls via `{$_modx}`; the default `{$modx}` cannot be tracked

![Fenom support](https://file.modx.pro/files/f/f/2/ff2a021a63bfda91d10dab7a5cc84be6.png)

## Examples

Basic output:

`http://mysite.com/?debug=1`

The report table replaces the page content, so you only see the table.

With cache:

`http://mysite.com/?debug=1&cache=1`

If the page is loaded from cache, only uncached tags are processed and shown.

Top 10 slowest tags:

`http://mysite.com/?debug=1&cache=1&top=10`

Tags are sorted by execution time, so you can show only the heaviest ones.

Append table to page content:

`http://mysite.com/?debug=1&cache=1&top=10&add=1`
