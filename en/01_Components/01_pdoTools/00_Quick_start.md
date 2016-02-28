The first thing you need to do right after install of new copy of MODX - is the install of extras.

The usual set is well-known:
* **getResources** for list your documents
* **getPage** for pagination of your lists
* **Wayfinder** for build menus
* **Breadcrumb(s)** for, hm, breadcrumbs
* **GoogleSitemap** for sitemap

But now you can replace all of them by **one** package - pdoTools. And why pdoTools?

### 9 snippets
Yes, I`m not joking. It contains 9 snippets (for now) that could to realize almost any functionality of usual website. And, what important, almost of them is a drop-in replacement for other popular snippets.

#### pdoResources
It is replacement for getResources.
As all other snippets, it is not use xPDO objects for representation of resources. It works directly with database tables, so you do not need to convert resources dates to timestamps before pass them to "date" output filter.
And it joins only needed TVs, so you must specify them in `&includeTVs` parameter as comma-separated list.
```
[[!pdoResources?
    &parents=`0`
    &includeTVs=`my_tv1,my_tv2`
    &tvPrefix=`tv.`
    &processTVs=`1`
    &includeContent=`1`
    &showLog=`1`
]]
```
`&showLog` - is the one of the most important futures of pdoTools snippets. It allows you to controll how fast this snippet processing, exaclty. Is there a slow SQL query, or too complicated chunk? You will know.

[![](https://file.modx.pro/files/d/9/3/d931de6c3c2f67be8879c1765e833bbcs.jpg)](https://file.modx.pro/files/d/9/3/d931de6c3c2f67be8879c1765e833bbc.png)

The second important future that you could see on screenshot - SQL joins. Yes, you can create complicate queries and select only what you need:
```
[[!pdoResources?
    &parents=`0`
    &class=`modResource`
    &leftJoin=`{
        "Parent": {
            "class": "modResource",
            "on": "modResource.parent = Parent.id"
        },
        "CreatedBy": {
            "class": "modUserProfile",
            "on": "modResource.createdby = CreatedBy.internalKey"
        }
    }`
    &select=`{
        "modResource": "modResource.id, modResource.pagetitle",
        "Parent": "Parent.pagetitle as parent",
        "CreatedBy": "CreatedBy.fullname as author"
    }`
    &showLog=`1`
]]
```
No need to call any snippets or output filters to get parent of resource or creator name. How fast it works? You tell me:

[![](https://file.modx.pro/files/0/4/5/04558020e2a34bd6e94fe734db1b6ae3s.jpg)](https://file.modx.pro/files/0/4/5/04558020e2a34bd6e94fe734db1b6ae3.png)

There is many other cool features, but you should know at list about this two.

#### pdoPage
It is replacement for getPage. What the difference?
1. It do not shows empty pages. If you do not have results on page or user entered wrong page manually - you will get redirect to the first page.
2. It has parameter `&maxLimit` equal to 100 by default. User could not hang your site by setting `&limit=100000` in url. If you are using getPage - just try to do it on your site.
3. It sets metatags to previous and next pages for crawlers.
4. It has built-in ajax pagination, seriosly. You need only correct markup and one parameter:
```
<div id="pdopage">
    <div class="rows">
        [[!pdoPage?
            &parents=`0`
            &ajaxMode=`default`
        ]]
    </div>
    [[!+page.nav]]
</div>
```
Of course, you can change markup by specifying additional parameters to snippet.

#### pdoMenu
This snippet has no so many difference with Wayfinder but works a little faster.

Because of bypass of xPDO objects you need to check permissions of items in menu by special parameter:
```
[[!pdoMenu?
    &parents=`0`
    &checkPermissions=`list`
]]
```
By default, all permissions checks are disabled. This parameter common for all pdoTools snippets, by the way.

#### pdoUsers
This snippets lists users of your site. You can filter them by groups and roles:
```
[[!pdoUsers?
    &groups=`Authors`
    &sortdir=`asc`
]]
```
You could combine it with **pdoPage**:
```
[[!pdoUsers?
    &groups=`Authors`
    &roles=`Member`
    &sortby=`id`
    &sortdir=`asc`
]]
[[!+page.nav]]
```
Placeholders are `modUser` and `modUserProfile` fields. You can see them all if you will just set blank `&tpl` parameter (or do not set it at all, if snippet do not has default tpl value).

[![](https://file.modx.pro/files/0/a/d/0ad486c2c7412ad9a32c25f9027b3962s.jpg)](https://file.modx.pro/files/0/a/d/0ad486c2c7412ad9a32c25f9027b3962.png)

Blank `&tpl` is another common feauture of pdoTools snippets. You will not forget usable placeholders, right?

#### pdoSitemap
Fast sitemap that do not requires to set XML type of resource. If parameter `&forceXML` is enabled (by default).

It caches data by default and cache key depends from snippet params but you can set your own key. How fast it is?

Well, we can test it by disabling `&forceXML` and enabling `&showLog`. On my site it takes almost 30 seconds for the first run and only 0.03 for the second:
```
[[!pdoSitemap?
    &forceXML=`0`
    &showLog=`1`
]]
```
There are **6873** resources in my sitemap.

[![](https://file.modx.pro/files/0/d/3/0d3b7798fd8464ee2bb39fbb481e3902s.jpg)](https://file.modx.pro/files/0/d/3/0d3b7798fd8464ee2bb39fbb481e3902.png) [![](https://file.modx.pro/files/1/9/1/1916b6d00e0c7e77e0119c29f1d3aba6s.jpg)](https://file.modx.pro/files/1/9/1/1916b6d00e0c7e77e0119c29f1d3aba6.png)

#### pdoNeighbors
Snippet for make links to previous, next and upper pages of current document.
```
[[!pdoNeighbors?
    &sortby=`menuindex`
    &sortdirc=`desc`
]]
```
Just neighbors, you know.

#### pdoCrumbs
My version of simple snippet for breadcrumbs of site. Nothing special except use of pdoTools core with fast chunks processing and data fetching.
```
[[!Breadcrumbs]]
```

#### pdoTitle
This snippet generates "title" tag of pages. It runs **pdoCrumbs** and shows path to current document in title.
```
<title>[[!pdoTitle]] / [[++site_name]]</title>
```
Also it supports **pdoPage** by default and you will see number of pages in title.
```
<title>Questions / page 5 from 593 / Sections / mysite.com</title>
```
Crawlers loves it!

[![](https://file.modx.pro/files/a/e/f/aef145845f8c84ad6bc104fe31e6d796s.jpg)](https://file.modx.pro/files/a/e/f/aef145845f8c84ad6bc104fe31e6d796.png)

#### pdoField
And, finally, snippet that allows you to get any field from any resources. It is replacement both for **UltimateParent** and **getResourceField** snippets.

For example, we need to get `longtitle` of resource with id = 15
```
[[pdoField?
    &id=`15`
    &field=`longtitle`
]]
```
Or we want to get `pagetitle` of grandparent of current document:
```
[[pdoField?
    &id=`[[*id]]`
    &field=`pagetitle`
    &top=`2`
]]
```

### Conclusion
I can wright more and more about pdoTools but it is enought for the first time.

It is important to remember, that all pdoTools snippets uses one core and most parameters are common for all of them.

You can use `&showLog` for details about snippets work, you can specify empty chunks to see available placeholders and you can join tables on the fly.

pdoTools - is a library, not just set of snippets. Many MODX extras uses pdoTools for their own snippets: **miniShop2, Tickets, BannerY, AjaxForm**, etc.

And do not forget that all of snippets parameters are described inside them. Just see the appropriate tab in MODX manager.