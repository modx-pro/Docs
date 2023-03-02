pdoSitemap i a snippet that easily creates sitemaps for search engines (sitemap.xml). The snippet understands the parameters used by the snippet [GoogleSitemap][1] (by translation to the native parameters) and can therefore easily replace it.

The main feature is a much higher processing speed compared to the snippet GoogleSitemap. The site [bezumkin.ru][2] with 1700 pages increased the generation speed of the sitemap by ***12 times*** from 8.4 seconds down to 0.7.

By default is the check for user permissions disabled. This can easily be remedied by including the parameter **&checkPermissions** (Note: slows down the generation!):
```
[[!pdoSitemap?
	&checkPermissions=`list`
]]
```

The sitemap generation is more effective if resources are excluded from the output rather than to explicit include resources that shall be visible (see examples below).

## Options
*pdoSitemap* accepts all options for [pdoTools][3]. Here are some of them:

Parameter     			| Default value		                							| Description
--------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------
**&sitemapSchema**	| http://www.sitemaps.org/schemas/sitemap/0.9	  | The scheme used for the sitemap.
**&forceXML**		    | 1											                    	  | Force output as XML.
**&priorityTV**		  |  												                      | An optional field that indicates the [priority][4] of the resource. The template variable stated here must also be added to the parameter **&includeTVs**

### Templates

**&tpl**
```
@INLINE <url>\n\t
<loc>[[+url]]</loc>\n\t
<lastmod>[[+date]]</lastmod>\n\t
<changefreq>[[+update]]</changefreq>\n\t
<priority>[[+priority]]</priority>\n
</url>
```

**&tplWrapper**
```
@INLINE <?xml version=\"1.0\" encoding=\"[[++modx_charset]]\"?>\n<urlset xmlns=\"[[+schema]]\">\n[[+output]]\n</urlset>
```

[Priority][4] and [Change frequency][5] for the resource is mapped based on the date for the last modification of the document:

Time since the last update of the document	  	| Priority  | Change frequency
------------------------------------------------|-----------|--------------------
Less than a day ago						              		| 1.0	    	| daily
Over one day but less than a week ago    		    | 0.75		  | weekly
More than a week ago but less than a month ago	| 0.5	    	| weekly
More than a month ago					              		| 0.25		  | monthly

### Instructions how to create a sitemap.xml resource

1. Create a new document in the root of the site. On the ***Document*** tab, select an empty template. Enter the "Title" of the document (your choice) and set the "Resource Alias" to ***sitemap***. Mark the checkboxes "Hide From Menus" and "Published".
2. Go to the ***Settings*** tab and select XML as the "Content Type".
3. Remove the mark from the checkbox "Rich Text" and save the document.
4. The "Content" of the document should only be a call to the snippet pdoSitemap (see the examples here below).

### Examples

To create a sitemap for the default context, this should be sufficient in the most cases:
```
[[pdoSitemap]]
```

Generate sitemap only from certain containers:
```
[[pdoSitemap?
	&parents=`10`
]]
```

The extend the example above to also exclude resources with id = 15 and 25, together with their descendants:
```
[[pdoSitemap?
	&parents=`10,-15,-25`
]]
```

Change the example above to exclude the resource with id = 25 but include its descendants:
```
[[pdoSitemap?
	&resources=`-25`
	&parents=`-15,10`
]]
```

Add another context (catalog) to the example above (if web is the default context):
```
[[pdoSitemap?
	&resources=`-25`
	&parents=`-15,10`
	&context=`web,catalog`
]]
```

This call forces the http schema of the URL:s to https:
```
[[pdoSitemap?
	&resources=`-25`
	&parents=`-15,10`
	&context=`web,catalog`
	&scheme=`https`
]]
```

This call shows the execution log (remember to change the content type of the resource to HTML):
```
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
[3]: /en/01_Components/01_pdoTools/04_General_settings.md
[4]: http://www.sitemaps.org/protocol.html#prioritydef
[5]: http://www.sitemaps.org/protocol.html#changefreqdef
