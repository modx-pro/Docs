# pdoSitemap

Fast snippet for generating a sitemap for search engines (sitemap.xml). Accepts parameters from [GoogleSitemap][1] snippet (converts them to its own) and can replace it.

Main advantage is much higher speed compared to alternatives. On [bezumkin.ru][2] with 1700 pages, generation time dropped to ***12x*** faster, from 8.4 sec to 0.7.

By default permission check for document access is disabled. You can enable it with the parameter **&checkPermissions** (Warning: slows execution!):

```modx
[[!pdoSitemap?
  &checkPermissions=`list`
]]
```

Prefer excluding resources from the map via snippet parameters.

## Parameters

*pdoSitemap* accepts all [pdoTools][3] parameters and some of its own:

| Parameter           | Default                                    | Description                                                                                                           |
|--------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| **&sitemapSchema** | `<http://www.sitemaps.org/schemas/sitemap/0.9>` | Sitemap schema.                                                                                                 |
| **&forceXML**      | `1`                                             | Force output as XML.                                                                           |
| **&priorityTV**    |                                                 | Extra field that stores [priority][4] of the document. Add it to the parameter **&includeTVs** |

### Templates

::: code-group

```modx [&tpl]
@INLINE <url>\n\t
<loc>[[+url]]</loc>\n\t
<lastmod>[[+date]]</lastmod>\n\t
<changefreq>[[+update]]</changefreq>\n\t
<priority>[[+priority]]</priority>\n
</url>
```

```modx [&tplWrapper]
@INLINE <?xml version=\"1.0\" encoding=\"[[++modx_charset]]\"?>\n<urlset xmlns=\"[[+schema]]\">\n[[+output]]\n</urlset>
```

:::

Priority and [update frequency][5] for search engines are set from the document last-modified date:

| Time since last update | Priority | Update frequency |
|-------------------------------------------|-----------|--------------------|
| Less than a day ago                         | 1.0       | daily              |
| More than a day, less than a week          | 0.75      | weekly             |
| More than a week, less than a month         | 0.5       | weekly             |
| More than a month ago                        | 0.25      | monthly            |

### How to create sitemap.xml

1. Create a new document in the site root. On the ***Document*** tab choose an empty template, set any title, and alias ***sitemap***. Ensure "Published" and "Hide from menu" are set as needed.
2. Go to ***Settings*** and set "Content type" to "XML".
3. Uncheck "Use HTML editor" and save.
4. In the resource content, call only the pdoSitemap snippet (see Examples below).

## Examples

Standard sitemap output for the current context. In most cases that is enough:

```modx
[[pdoSitemap]]
```

Generate sitemap only from specific containers:

```modx
[[pdoSitemap?
  &parents=`10`
]]
```

Exclude resources with id 15 and 25, including their children:

```modx
[[pdoSitemap?
  &parents=`10, -15,-25`
]]
```

Exclude id 15 with children and 25 without:

```modx
[[pdoSitemap?
  &resources=`-25`
  &parents=`-15,10`
]]
```

Add another context:

```modx
[[pdoSitemap?
  &resources=`-25`
  &parents=`-15,10`
  &context=`web,catalog`
]]
```

View the sitemap query log:

```modx
[[pdoSitemap?
  &resources=`-25`
  &parents=`-15,10`
  &context=`web,catalog`
  &showLog=`1`
  &forceXML=`0`
]]
```

[1]: http://rtfm.modx.com/extras/revo/googlesitemap
[2]: http://bezumkin.ru/sitemap.xml
[3]: /en/components/pdotools/general-properties
[4]: http://www.sitemaps.org/ru/protocol.html#prioritydef
[5]: http://www.sitemaps.org/ru/protocol.html#changefreqdef
