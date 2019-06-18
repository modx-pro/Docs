Snippet **pdoPage** allows you to view the work of other snippets with the pagination.

There are several serious differences from the snippet *getPage*:

* 2 types of pagination: skip pages and classic (depending on the parameter **&pageLimit**).
* Pagination does not float. If set to show 5 page links - will always be 5 and no more.
* You can specify chunks to output when there are no links to the first, last, next or previous page.
* **&maxLimit** does not allow the user to slow down your website with a large numbers in a $_GET['limit'].
* Redirect to first page if no results or an invalid parameter **&page**.
* Works with the snippet [pdoResources][1], by default.
* Supports the work via ajax.

## Settings
Name                    | Default       | Description
------------------------|---------------|---------------------------------------------
**plPrefix**            |               | Prefix for output placeholders.
**limit**               | 10            | Limits the number of resources returned.  Use "0" for unlimited results.
**maxLimit**            | 100           | The maximum limit of the query. Overrides the limit specified by the user via a url.
**offset**              |               | An offset of resources returned by the criteria to skip.
**page**                |               | Number of page for output. Overlaps number specified by the user via the url.
**pageVarKey**          | page          | The Name of the variable to search for the page number in the url.
**totalVar**            | page.total    | Define the key of a placeholder set by getResources indicating the total number of Resources that would be selected not considering the limit value.
**pageLimit**           | 5             | Number of links on a pages. If is 7 or more turns on the advanced mode.
**element**             | pdoResources  | The name of the snippet to run.
**pageNavVar**          | page.nav      | Name of placeholder for output pagination.
**pageCountVar**        | pageCount     | Name of placeholder for output number of pages.
**pageLinkScheme**      |               | Scheme of generation link to page. You can use placeholders [[+pageVarKey]] and [[+page]]
**cache**               |               | Caching the results of the snippet.
**cacheTime**           | 3600          | Time until the cache expires, in seconds.
**cacheAnonymous**      |               | Enable caching only for unauthorized visitors.
**toPlaceholder**       |               | If set, will assign the result to this placeholder instead of outputting it directly.
**ajax**                |               | Enable support of ajax requests.
**ajaxMode**            |               | Ajax pagination out of the box. Available in 3 modes: "default", "button" and "scroll".
**ajaxElemWrapper**     | #pdopage      | jQuery selector for wrapper element with the results and pagination.
**ajaxElemRows**        | #pdopage .rows| jQuery selector for element with results.
**ajaxElemPagination**  | #pdopage .pagination| jQuery selector for element with pagination.
**ajaxElemLink**        | #pdopage .pagination a| jQuery selector for pagination links.
**ajaxElemMore**        | #pdopage .btn-more| jQuery selector for "load more" button in ajaxMode = button.
**ajaxHistory**         |               | Save the page number in the url when working in ajax mode.
**frontend_js**         | [[+assetsUrl]]js/pdopage.min.js| Link on javascript for loading by the snippet.
**frontend_css**        | [[+assetsUrl]]css/pdopage.min.css| Link on css styles for loading by the snippet.
**frontend_startup_js** |               | Name of a chunk that contains the script code at the end of the head section used with enabled support of ajax requests.
**frontend_init_js**    |               | Name of a chunk that contains the script code at the end of the body section used with enabled support of ajax requests.
**setMeta**             | 1             | Registration of meta tags with links to previous and next page.
**strictMode**          | 1             | Strict mode. pdoPage do redirects when loading non-existent pages.

Chunks                  | By default
------------------------|------------------------------------------------------------------------------
**tplPage**             | `@INLINE <li><a href="[[+href]]">[[+pageNo]]</a></li>`
**tplPageWrapper**      | `@INLINE <div class="pagination"><ul class="pagination">[[+first]][[+prev]][[+pages]][[+next]][[+last]]</ul></div>`
**tplPageActive**       | `@INLINE <li class="active"><a href="[[+href]]">[[+pageNo]]</a></li>`
**tplPageFirst**        | `@INLINE <li class="control"><a href="[[+href]]">[[%pdopage_first]]</a></li>`
**tplPageLast**         | `@INLINE <li class="control"><a href="[[+href]]">[[%pdopage_last]]</a></li>`
**tplPagePrev**         | `@INLINE <li class="control"><a href="[[+href]]">&laquo;</a></li>`
**tplPageNext**         | `@INLINE <li class="control"><a href="[[+href]]">&raquo;</a></li>`
**tplPageSkip**         | `@INLINE <li class="disabled"><span>...</span></li>`
**tplPageFirstEmpty**   | `@INLINE <li class="disabled"><span>[[%pdopage_first]]</span></li>`
**tplPageLastEmpty**    | `@INLINE <li class="disabled"><span>[[%pdopage_last]]</span></li>`
**tplPagePrevEmpty**    | `@INLINE <li class="disabled"><span>&laquo;</span></li>`
**tplPageNextEmpty**    | `@INLINE <li class="disabled"><span>&raquo;</span></li>`
**ajaxTplMore**         | `@INLINE <button class="btn btn-default btn-more">[[%pdopage_more]]</button>`


## Ajax support
pdoPage is able to work with ajax out of the box. There are 3 conditions for it:

* The snippet option `&ajax` is enabled.
* A request was made with XMLHttpRequest, eg ajax request.
* A request contains the variable specified in the &pageVarKey parameter of snippet call. By default it is a `page`.

So, you just need to enable the parameter **&ajax=`1`** and to send a GET request to the page with jQuery:
```
$.get('document.html?page=5', function(response) {
    console.log(response);
}, 'json');
```
And you will receive JSON response with results of query and service data: the number of current page, the total number of pages and total number of a results.
Given that pdoPage is a snippet-wrapper, so you can get to work via ajax many other snippets.

## Built-in Ajax pagination
Starting with version **1.10** pdoPage is able to load pages via ajax automatically.
You only need to wrap the call in a special markup:
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
Within a [[+page.nav]] we have a div with class "pagination" — so pdoPage by default.

You can change the IDs for that layout with the following parameters:
* **ajaxElemWrapper** — jQuery selector of wrapper with results and pagination. By default is `#pdopage`.
* **ajaxElemRows** — jQuery selector of element with results. By default is `#pdopage .rows`
* **ajaxElemPagination** — jQuery selector of element with pagination. By default is `#pdopage .pagination`
* **ajaxElemLink** — jQuery selector of pagination links. By default is `pdopage .pagination a`

The last two selector hopes that you have not changed the standard markup of pagination block in the parameter **&tplPageWrapper**.
The whole logic is provided by connecting the javascript file from the parameter **&frontent_js**.

You do not need to enable parameter `&ajax`, non-empty `&ajaxMode` will do it himself.

### Load by button
In contrast to the standard pagination, this type of work assumes that the user will only move down, loading new elements and therefore moves the block pagination when scrolling.

So, it will be correct to place it at the top:
```
<div id="pdopage">
    [[!+page.nav]]
    <div class="rows">
        [[!pdoPage?
            &parents=`0`
            &ajaxMode=`button`
            &limit=`5`
        ]]
    </div>
</div>
```

Uses all the same selectors, plus:
* **ajaxElemMore** — jQuery selector for button to load results if your &ajaxMode is "button". Default is `#pdopage .btn-more`.
* **ajaxTplMore** — the template of a button to load the new results when ajaxMode is "button". Must include the selector listed in the **&ajaxElemMore**.

When you click on the button it will load `&limit` elements and add them to the end of the results block.
If there is no more results — the button will hide.

Floating navigation bar shows the current page and allows you to quickly go where you want.
Clicks on its links are not processed via ajax, because this is appears to be quite difficult.

If the output of a floating pagination block is not needed, just make it `display:none` in your css.

### Load on scroll
This method is very similar to the previous one but there is no button and you do not need to click on it — 
everything is done automatically when you scroll the page.
```
<div id="pdopage">
    [[!+page.nav]]
    <div class="rows">
        [[!pdoPage?
            &parents=`0`
            &ajaxMode=`scroll`
        ]]
    </div>
</div>
```

### History API
pdoPage supports History API in your browser.
This means that when **&ajaxMode** enabled, the snippet can save the page number in the address bar, so when you reload nothing was lost.
Also works correctly using the navigation buttons "forward\back" of the browser.

You can change this behavior by setting **&ajaxHistory** by switching "on" or "off". By default, it works as follows:
* If ajaxMode set to **default**, the History API is enabled, the page number is stored.
* If ajaxMode set to **scroll** or **button**, the History API is disabled.

When **&ajaxHistory** is disabled, the navigation block is hidden, so pages cannot be switched manually.

### Javascript callbacks
You can specify the functions that will be called before and after page load via ajax:
```
pdoPage.callbacks['before'] = function(config) {
    console.log('The config before load!', config);
};
pdoPage.callbacks['after'] = function(config, response) {
    console.log('The config after load!', config);
    console.log('The response from server!', response);
}
```

Version 1.11.0-pl brings the ability to add a handler to the event **pdopage_load**:
```
$(document).on('pdopage_load', function(e, config, response) {
    console.log(e, config, response);
});
```
The checking of the data in the config will allow you to distinguish between different pdoPage calls on the same page.

## Use your own javascripts in ajax mode

From version 2.7.4 you could use your own javascripts in ajax mode. The frontend javascripts could be modified with the pdoPage snippet parameters **&frontend_js**, **&frontend_startup_js** and **&frontend_init_js**. Per default the external **[[+assetsUrl]]js/pdopage.min.js** javascript is referenced and the belonging script tags are placed at the end of the head/body section.

### jQuery plugin
Since version 2.7.4 **[[+assetsUrl]]js/jquery.pdopage.min.js** is available and could be referenced in **&frontend_js** parameter in the pdoPage snippet call. If you want to use it, you have to create two chunks and reference them in the **&frontend_startup_js** and **&frontend_init_js** parameter.

The chunk for **frontend_startup_js** should stay empty and the chunk for **frontend_init_js** could be filled with the following script tag:

```
<script type="text/javascript">
    $('[[+wrapper]]').pdoPage([[+config]]);
</script>
```

The plugin triggers two events on the wrapper element. These could be catched the following:

```
$('[[+wrapper]]').on('beforeLoad', function(event, pdopage, settings){
  console.log(settings);
});
$('[[+wrapper]]').on('afterLoad', function(event, pdopage, settings, response){
  console.log(settings);
  console.log(response);
});
```

All public methods of the jQuery plugin could be called with the following code:

```
$('[[+wrapper]]').pdoPage('<methodname>', <comma>, <separated>, <parameters>);
```

#### Example call with form filtering
Form filtering the pdoPage ajax result could be done with the following code:

```
<script type="text/javascript">
    var pdoPageWrapper = $('[[+wrapper]]');
    pdoPageWrapper.pdoPage([[+config]]);
    $(document).ready(function () {
		$("form#my_id").on('click', 'button[type="submit"]', function(e) {
            e.preventDefault();
            var form = $(e.delegateTarget);
            $('[[+wrapper]]').pdoPage('loadPage', 
                form.attr('action') + '?' + form.serialize(), 'force');
        });
    });
</script>
```

## Friendly urls pagination
From version 2.2.2 you can use the parameter **&pageLinkScheme** to specify the schema of generated links to the pages.
There can be only two placeholders in the parameters:
* `[[+pageVarKey]]` - a variable with name of the page. By default is `page`.
* `[[+page]]` - the number of the page.

For example just specify such parameter:
```
[[!pdoPage?
    &parents=`0`
    &pageLinkScheme=`/[[+pageVarKey]]-[[+page]]`
]]
[[!+page.nav]]
```
And you will get links like
```
/res/news/
/res/news/page-2
/res/news/page-3
```

But when you will go to this links, MODX will show you 404 error, because theese pages are not wxists.
You need to create the plugin to handle this links:
```
<?php
// Work only with OnPageNotFound
if ($modx->event->name == 'OnPageNotFound') {
    // Get the key from system settings
    $req = $modx->getOption('request_param_alias');
    // Trying to catch this key in a request
    $pageVarKey = 'page';
    // We continue only if the request is matched to our pattern "pageVarKey-page"
    if (preg_match("#.*?({$pageVarKey}-(\d+))#", $_REQUEST[$req], $matches)) {
        // Remove furl string and get the exact address of current page
        $uri = str_replace($matches[1], '', $matches[0]);

        // Find a page by this address
        $id = 0;
        // First, as it is, with the slash at the end
        if (!$id = $modx->findResource($uri)) {
            // If there is no mathes - then we try to cut slash and search again
            $id = $modx->findResource(rtrim($uri, '/'));
        }

        // If we found the resource
        if ($id) {
            // Adding the number of the page to the globals, so pdoPage could see them
            $_GET[$pageVarKey] = $_REQUEST[$pageVarKey] = $matches[2];
            // And load this page
            $modx->sendForward($id);
        }
        // If the resource was not found - do nothing. Maybe another plugin will catch this request
    }
}
```
Now this plugin will handle your friendly urls pagination.

## Examples
As pdoPage is part of pdoTools, in the parameter **&element** it contains a snippet *pdoResources*.
Therefore, a simple call of the snippet will show the child resources:
```
[[!pdoPage?
    &tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
]]
[[!+page.nav]]
```

Output all available documents of the site:
```
[[!pdoPage?
    &tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
    &parents=`0`
]]
[[!+page.nav]]
```

Included navigation with skip of pages.
Please note that if the number of pages is less than 7, it will work as normal navigation.
```
[[!pdoPage?
    &tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
    &parents=`0`
    &pageLimit=`7`
]]
[[!+page.nav]]
```

Enable cache for 30 minutes:
```
[[!pdoPage?
    &tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
    &parents=`0`
    &pageLimit=`7`
    &cache=`1`
    &cacheTime=`1800`
]]
[[!+page.nav]]
```

Specify the maximum limit of the query.
Now, whichever limit is not specified by the user in the url will still be no more than 10 results per page.
```
[[!pdoPage?
    &tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
    &parents=`0`
    &pageLimit=`7`
    &cache=`1`
    &cacheTime=`1800`
    &maxLimit=`10`
]]
[[!+page.nav]]
```

[1]: /en/01_Components/01_pdoTools/01_Snippets/01_pdoResources.md
