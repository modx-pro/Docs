After creating a fresh MODX install, the next step is often to install a number of extras to add functionality to the site.

The usual set is well-known:
* **getResources** for list your documents
* **getPage** for pagination of your lists
* **Wayfinder** for build menus
* **Breadcrumb(s)** for, hm, breadcrumbs
* **GoogleSitemap** for sitemap

But it's possible to replace all of them with one package: **pdoTools**!

Let's start with an introduction of what pdoTools can do.

### 9 snippets
Yes, I'm serious. pdoTools contains 9 snippets that can perform almost any functionality of usual website. And almost all of them are a drop-in replacement for other popular snippets.

#### pdoResources
pdoResources is a replacement for getResources.
As all other snippets in pdoTools, it doesn't use xPDO objects for representation of resources. It works directly with database tables.
This makes it faster. You don't have to convert resources dates to timestamps before you can pass pass them to "date" output filter.
And it joins only needed TVs, so you must specify them in the `&includeTVs` property as comma-separated list.
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
One of the most important features of pdoTools is the `&showLog` property.
It allows you to check how fast the snippet is. Is it a slow SQL query, or too complicated chunk?
The `&showLog` property will help you figure it out.

[![](https://file.modx.pro/files/d/9/3/d931de6c3c2f67be8879c1765e833bbcs.jpg)](https://file.modx.pro/files/d/9/3/d931de6c3c2f67be8879c1765e833bbc.png)

The second important feature is SQL joins. With pdoTools you can create complex queries and select only what you need.
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
With the above example, you don't have to call any snippets or output filters to get the parent of the resource or the creator name.
How fast it works? Let's look at the log output.

[![](https://file.modx.pro/files/0/4/5/04558020e2a34bd6e94fe734db1b6ae3s.jpg)](https://file.modx.pro/files/0/4/5/04558020e2a34bd6e94fe734db1b6ae3.png)

There are many other cool features, but these are the most important.

#### pdoPage
pdoPage is a replacement for getPage. There are a few differences compared to getPage:
1. It do not shows empty pages. If you do not have results on the page, or the user entered wrong page manually - you will get redirected to the first page.
2. It has a property `&maxLimit`, which is set to 100 by default. It makes sure users can not slow down your site by setting `&limit=100000` in the url. If you are using getPage - just try to do it on your site.
3. It sets metatags to previous and next pages for crawlers in the page header.
4. It has built-in ajax pagination. Here's how that works:
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
Of course, you can change the markup by specifying additional parameters to snippet.

#### pdoMenu
This snippet can replace Wayfinder. It mostly works the same, but it is a bit faster.

Because xPDO objects are bypassed, you need to check permissions of items in menu with a special property manually:
```
[[!pdoMenu?
    &parents=`0`
    &checkPermissions=`list`
]]
```
By default, all permission checks are disabled. This property can be used on all pdoTools snippets, by the way.

#### pdoUsers
This snippets lists users of your site. You can filter them by groups and roles:
```
[[!pdoUsers?
    &groups=`Authors`
    &sortdir=`asc`
]]
```
You can combine this with **pdoPage** to provide a paginated list of users:
```
[[!pdoPage?
    &element=`pdoUsers`
    &groups=`Authors`
    &roles=`Member`
    &sortby=`id`
    &sortdir=`asc`
]]
[[!+page.nav]]
```
Placeholders are all fields from the `modUser` and `modUserProfile` objects.
You can see them all if you will just set blank `&tpl` parameter (or do not set it at all, if snippet does not have a default tpl value).

[![](https://file.modx.pro/files/0/a/d/0ad486c2c7412ad9a32c25f9027b3962s.jpg)](https://file.modx.pro/files/0/a/d/0ad486c2c7412ad9a32c25f9027b3962.png)

The empty &tpl is another common feature of all pdoTools snippets.

#### pdoSitemap
pdoSitemap creates a fast sitemap that does not require the resource to be set to XML if the property `&forceXML` is enabled (by default).

It caches data, and the cache key depends on the snippet params, but you can also set your own key.

To see how fast it is, we can test it by disabling `&forceXML` and enabling `&showLog`.
On my site it takes almost 30 seconds for the first run and only 0.03 for the second:
```
[[!pdoSitemap?
    &forceXML=`0`
    &showLog=`1`
]]
```
There are **6873** resources in my sitemap.

[![](https://file.modx.pro/files/0/d/3/0d3b7798fd8464ee2bb39fbb481e3902s.jpg)](https://file.modx.pro/files/0/d/3/0d3b7798fd8464ee2bb39fbb481e3902.png) [![](https://file.modx.pro/files/1/9/1/1916b6d00e0c7e77e0119c29f1d3aba6s.jpg)](https://file.modx.pro/files/1/9/1/1916b6d00e0c7e77e0119c29f1d3aba6.png)

#### pdoNeighbors
Snippet for make links to previous, next and upper pages of the current document.
```
[[!pdoNeighbors?
    &sortby=`menuindex`
    &sortdirc=`desc`
]]
```
Just neighbors, you know.

#### pdoCrumbs
My version of a simple snippet for breadcrumbs on the site. Nothing special, except it uses the pdoTools core with fast chunks processing and data fetching.
```
[[!pdoCrumbs]]
```

#### pdoTitle
This snippet generates the "title" tag of pages. It runs **pdoCrumbs** and shows the path to the current document in the title.
```
<title>[[!pdoTitle]] / [[++site_name]]</title>
```
It supports **pdoPage** by default, so you will see the number of pages in title.
```
<title>Questions / page 5 from 593 / Sections / mysite.com</title>
```
Crawlers love it!

[![](https://file.modx.pro/files/a/e/f/aef145845f8c84ad6bc104fe31e6d796s.jpg)](https://file.modx.pro/files/a/e/f/aef145845f8c84ad6bc104fe31e6d796.png)

#### pdoField
And, finally, pdoField is a snippet that allows you to get any field from any resources.
It is a replacement both for **UltimateParent** and **getResourceField** snippets.

For example, we need to get `longtitle` of resource with id = 15
```
[[pdoField?
    &id=`15`
    &field=`longtitle`
]]
```
Or if we want to get `pagetitle` of grandparent of current document:
```
[[pdoField?
    &id=`[[*id]]`
    &field=`pagetitle`
    &top=`2`
]]
```

### Conclusion
It is important to remember, that all pdoTools snippets use the same core and most parameters can be used for all of them.

You can use `&showLog` to see how the snippets work, you can specify empty chunks to see the available placeholders, and you can join tables on the fly.

pdoTools is a library, not just set of snippets. Many MODX extras uses pdoTools for their own snippets, like **miniShop2**, **Tickets**, **BannerY**, **AjaxForm**, and more.

And don't forget that all of snippets parameters are described inside them. Just open the snippet in the manager and see the Properties tab.