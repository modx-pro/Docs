# sfSitemap

Based on menu class; supports most [sfMenu](/en/components/seofilter/snippets/sfmenu) params except nesting and grouping. Use DB counts and fast mode for sitemap.

Also based on [pdoSitemap](/en/components/pdotools/snippets/pdositemap); combine for full sitemap on one page.

## Params different from sfMenu

| Param | Default | Description |
| --- | --- | --- |
| **&sitemapSchema** | `<http://www.sitemaps.org/schemas/sitemap/0.9>` | Sitemap schema |
| **&sortby** | `link` | Sort by link name |
| **&sortdir** | `ASC` | Sort direction |
| **&outputSeparator** | `\n` | Link separator |
| **&forceXML** | 1 | Force XML output. Disable when combined with pdoSitemap |

### Templates

**&tpl** - link chunk

```xml
@INLINE <url>\n\t
<loc>[[+url]]</loc>\n\t
<lastmod>[[+date]]</lastmod>\n\t
<changefreq>[[+update]]</changefreq>\n\t
<priority>[[+priority]]</priority>\n
</url>
```

**&tplWrapper** - sitemap wrapper

```xml
@INLINE <?xml version=\"1.0\" encoding=\"[[++modx_charset]]\"?>\n<urlset xmlns=\"[[+schema]]\">\n[[+output]]\n</urlset>
```

### changefreq

Same as pdoSitemap. Base date: link edit or creation. Edit date changes when result count changes.

## Examples

1. With pdoSitemap:

pdoSitemap call:

```modx
[[!pdoSitemap?
  &tplWrapper=`sitemap.wrapper`
]]
```

sitemap.wrapper chunk:

```fenom
<?xml version="1.0" encoding="{'modx_charset' | option}"?>
<urlset xmlns="{$schema}">
{$output}
{$_modx->runSnippet('sfSitemap', ['tplWrapper'=>'@INLINE {$output}', 'fast'=>1, 'mincount'=>1, 'forceXML'=>0])}
</urlset>
```

2. SEO sitemap only:

```modx
[[!sfSitemap?
  &fast=`1`
  &mincount=`1`
]]
```
