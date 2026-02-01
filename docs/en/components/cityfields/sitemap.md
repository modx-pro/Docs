# Sitemap generation

If you use subdomains or subdirectories for cities, you need to generate a correct `sitemap.xml`. Create a page in the manager with these parameters:

* Template: `empty`
* Alias: `sitemap`
* Content type: `XML`
* Content:

```modx
[[!pdoSitemap?
  &cache=`0`
  &scheme=`-1`
  &tpl=`tpl.Sitemap`
]]
```

![Sitemap page](https://file.modx.pro/files/e/1/c/e1c702d8c9c0d8ab4ce2d14926c38d5d.png)

Since INLINE chunks cannot use modifiers and conditions, also create a chunk `tpl.Sitemap` with this content:

```modx
<url>
<loc>[[!+cf.current_city.url]]{$url != '/' ? $url : ''}</loc>
<lastmod>[[+date]]</lastmod>
<changefreq>[[+update]]</changefreq>
<priority>[[+priority]]</priority>
</url>
```

Thus a sitemap.xml will be generated for each subdomain or subdirectory.
