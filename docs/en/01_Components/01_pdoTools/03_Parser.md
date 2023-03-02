First of all - why do we need chunks? They are needed to separate the view from the logic. In most cases it is needed to allow users to edit default behaviour of installed extras.

In MODX's chunks and templates you can use various types of placeholders:
* `[[+tag]]` - ususal placeholder that will be replaced with a value due chunk processing
* `[[++setting]]` - system settings from `modX::config`
* `[[*field]]` - field of current resource in `modX::resource` property
* `[[%lexicon]]` - entry from lexicon to display text strings from extras dictionaries
* `[[~number]]` - links to resources
* `[[snippet]]` - cached snippet
* `[[!snippet]]` - uncached snippet
* `[[$chunk]]` - chunk

Every tag can be called uncached if you prefix it with the exclamation sign. Also you might disable any tag by a leading dash.
* `[[!uncached_snippet]]`
* `[[-!disabled_snippet]]`

And how exactly does MODX parser process this tags?

modParser collects all tags from chunk with regular expressions, creates modTag objects from them and calls method `process()` from them. Each tag in your chunk is one modTag object instance for modParser.

If you are using output filters for tags - it is another xPDO object. If you are using MODX snippet as output filter - it will be processed each time as modParser catches it in your chunk.

If you are using 3 snippets in a chunk and get 10 records from the database - you will get **30** snippet calls.

modParser is recursive parser, so if it can`t process some tag right away - it will leave it for the next iteration. First, it processes all of the cached tags, then additionally processes all uncached.

If there is no value for a uncached placeholder on the current page - modParser will try to parse it up to 10 times (by default).

That is why a complicated chunk can be parsed a very long time.

### pdoParser
It is the 3rd main class of pdoTools that tries to parse all simple tags by itself. Simple tags are: `[[+tag]]`, `[[*field]]`,  `[[%lexion]]`, `[[~number]]` and `[[~[[+id]]]]`.

They must be called without any output filters, so pdoTools could just replace them to values without modTag objects - with simple `str_replace()`.

If there are still any remaining tags after pdoTools - it will call modParser to parse them. You can read about it in the previous article.

So, by default pdoParser is just a simple pre-processor before modParser. That is why chunks in pdoTools are always a little (or much) faster.

### Fenom
pdoTools 2.0 brings you built-in support of Fenom template engine. Good news everyone - it has english documentation in [its repository on GitHub](https://github.com/fenom-template/fenom/tree/master/docs/en). Why Fenom? Because it is light, simple, fast, flexible and russian.

Fenom works completely different way. It **compiles** chunk to PHP code and caches it in memory. Then pdoTools pass array of values into this PHP code and it executed.

There is no recursive iterations. Only one passage for one chunk at time. If you have no value for placeholder - it will be just empty and nobody will not replace it later. It is much more fair logic, as for me.

Fenom syntax looks similar to Smarty and you could see it in official documentation, I only will show you how you could use it with MODX:
* `{$placeholder}` of `{$_pls['placeholder']}` - for placeholders with dots or dashes (TVs).
* `{$_modx->resource.field}` or `{$_modx->resource['field']}` - for array with current resource (not object!).
* `{$_modx->config.setting}` or `{$_modx->config['setting']}` - for system settings from `modX::config` array.
* `{$_modx->user.proprety}` - get value from mixed array of modUser and modUserProfile properties.
* `{$_modx->context.key}` - get value from array with current modContext values.
* `{$_modx->lexicon('key')}` and `{$_modx->lexicon->load('dict')}` - lexicon strings and ability to load dictionaries
* `{$_modx->makeUrl(number)}` - for making urls
* `{$_modx->runSnippet('snippetName', ['key' => 'value'])}` - for snippets
* `{$_modx->getChunk('chunkName', ['key' => 'value'])}` - for chunks

As you see - you get access to safe variable `{$_modx}`. It is **not** the `modX` object, it is another object from pdoTools with only safe functions.
Your manager will not have access to `modX` object from Fenom chunks by default. You could see sources of `{$_modx}` [here](https://github.com/bezumkin/pdoTools/blob/master/core/components/pdotools/model/pdotools/_micromodx.php
).

The second service variable is `{$_pls}`. It needed to get access to placeholders with dots or dashes. Fenom variables compiled to PHP and PHP do not allows you to use dots or dashes in them. So you can use
```
{$_pls['my.tv']} for placeholders with dots or dashes
or
{$pagetitle} for placeholders without it
```

#### Placeholders filling

Fenom works in one pass, ie, Unlike the MODX parser, it is not recursive

Performing the entire template in one go gives a very high speed, but also should take into account, that
**placeholders** will be available **only after working** corresponding snippet

For example: you need to get the value of the placeholder `{$ mse2_query}` (Search request) in the form, but the search form display above the results.
To do this you must perform a snippet mSearch2 and pass on the results to placeholder, eg `searchResults`:

```
{'!pdoPage' | snippet : [
	'element' => 'mSearch2',
	'toPlaceholder' => 'searchResults'
]}
```
Next, call the snippet of search form, where Fenom parser will substitute the value of the placeholder `{$mse2_query}`:
```
{'!mSearchForm' | snippet}
```
Then display the results of the snippet mSearch2:
```
{'searchResults' | placeholders}
```

If the snippet is not able to save the results of its work to placeholder, you can assign them to a Fenom variable:
```
{var $date = 'dateAgo' | snippet : ['input' => '2016-09-10 12:55:35']}

...

Your date: {$date}.
```
Very similar to the logic of the usual script.

#### System settings
There is some important system settings for Fenom:
* `pdotools_fenom_default` - use Fenom syntax in chunks. It is enabled by default.
* `pdotools_fenom_modx` - enables very dangerous variable `{$modx}` with full access to `modX` object. Disabled by default and strongly recommended do not enable.
* `pdotools_fenom_php`- enables pure PHP functions in chunks. Disabled by default and strongly recommended do not enable.
* `pdotools_fenom_modifiers` - list of snippets that will be available as output filters. Also can be specified at snippet runtime.
* `pdotools_fenom_parser` - enables processing of Fenom tags on the whole site. Do not recomended to newbies.

Fenom works with MODX in two modes: only in chunks and site-wide. First mode enabled and recommended by default.

You could use Fenom syntax along with MODX:
```
{if $_modx->isAuthenticated($_modx->context.key)}
    Hello, {$_modx->user.fullname}!
{else}
    [[Login?params...]]
{/if}
```
Fenom will be run at first turn in chunks, so it can help you to fair devide their parts.
In this example snippet **Login** will be called only for unauthorised user. modParser, as you klow, would run both parts of code and then select only one for current user.

But you should now, that when you are using mixed syntax - there will be called both Fenom and MODX parser, and it is not good for maximum performance. It is always better and faster to use only Fenom syntax, but you can smoothly migrate to it with mixed syntax.

Fenom has no drawbacks in chunks mode. It is preferred mode of work.

When you will play enough with chunks you may want to enable Fenom for the whole site. Yes, you can do it, but you must know some important things.
1. It will not be cached as MODX tags. Every Fenom condition will be processed on every page load. And it is good for many reasons when your site is fast.
2. MODX tags on page will be always processed at first turn. You will not be able to separate you logic by Fenom conditions with MODX tags. Fenom will be run by pdoParser at the end of page processing, when MODX will start to process all remaining uncached placeholders.
3. Fenom will stop process page on any "wrong" `{tag}` condition. Any JSON or javascript on page could break processing. You need to separate first symbol from brace by space in this case.
```
<script>
var y = {"key": "value"}; // will cause an error
var x = { "key": "value" } // it is ok
</script>
```
Also you can use tag `{ignore}`:
```
<script>
{ignore}
var y = {"key": "value"}; // it is ok now
{/ignore}
</script>
```

You must remember this 3 items when you enable `pdotools_fenom_parser` system setting. Every compile error will be recorded to error log of manager.

#### What about speed?
It is my favorite part. Lets make some tests now.

MODX test:
```
[[!pdoResources?
    &parents=`0`
    &tpl=`@INLINE <p>{{+id}}. {{+longtitle:default=`{{+pagetitle}}`}} {{+createdon:dateago}}</p>`
    &limit=`1000`
    &sortby=`id`
    &sortdir=`asc`
    &showLog=`1`
]]
```
[![](https://file.modx.pro/files/e/9/a/e9a720e155f60b490580083b42a2938ds.jpg)](https://file.modx.pro/files/e/9/a/e9a720e155f60b490580083b42a2938d.png)

And Fenom. Just notice that we need to specify snippet **dateAgo** as fenom modifier to use it in chunk:
```
[[!pdoResources?
    &fenomModifiers=`dateAgo`
    &parents=`0`
    &tpl=`@INLINE <p>{$id}. {$longtitle ?: $pagetitle} {$createdon | dateago}</p>`
    &limit=`1000`
    &sortby=`id`
    &sortdir=`asc`
    &showLog=`1`
]]
```
[![](https://file.modx.pro/files/f/f/4/ff4e241604b907dfe478983c8d12b6acs.jpg)](https://file.modx.pro/files/f/f/4/ff4e241604b907dfe478983c8d12b6ac.png)

2.7 seconds against 1. Fenom is almost up to 3 times faster in the same conditions. I think all comments will be unnecessary.

We also could make another test with chunks without output modifiers. All is the same but now chunks are:
```
&tpl=`@INLINE <p>{{+id}}. {{+pagetitle}} {{+createdon}}`
```
[![](https://file.modx.pro/files/c/d/d/cdd807767b6b5402b41496cd4245f723s.jpg)](https://file.modx.pro/files/c/d/d/cdd807767b6b5402b41496cd4245f723.png)
```
&tpl=`@INLINE <p>{$id}. {$pagetitle} {$createdon}</p>`
```
[![](https://file.modx.pro/files/5/e/4/5e4a84a13bd55718156425b5337ad4e2s.jpg)](https://file.modx.pro/files/5/e/4/5e4a84a13bd55718156425b5337ad4e2.png)

And we see that Fenom is faster again even when pdoTools just `str_replace()` placeholders.

### FastField tags

I think many people know about interesting component **fastField**, which adds the processing extra placeholders to the system, like `[[#15.pagetitle]]`.
This functional has already been added to pdoParser by the permission of the author and it has even been a bit expanded.

All fastField tags begin with # and contain either recourse id or the name of the global array.

General field resource:
```
[[#15.pagetitle]]
[[#20.content]]
```

TV resource parameters:
```
[[#15.date]]
[[#20.some_tv]]
```

Fields of goods miniShop2:
```
[[#21.price]]
[[#22.article]]
```

Arrays of resources and goods:
```
[[#12.properties.somefield]]
[[#15.size.1]]
```

Superglobal arrays:
```
[[#POST.key]]
[[#SESSION.another_key]]
[[#GET.key3]]
[[#REQUEST.key]]
[[#SERVER.key]]
[[#FILES.key]]
[[#COOKIE.some_key]]
```

You can indicate any fields in arrays:
```
[[#15.properties.key1.key2]]
```

If you do not know what values are in an array – just indicate it and it will be printed entirely:
```
[[#GET]]
[[#15.colors]]
[[#12.properties]]
```

Tags fastField can be combined with tags MODX:
```
[[#[[++site_start]].pagetitle]]
<pre>
	[[#[[++site_start]]]]
</pre>
```

**Today you do not need to use FastField tags**, because Fenom replaces them totally:
```
{var $resource = $_modx->getResource(15)}
{if $resource?}
    {$resource.pagetitle}
{/if}
```

You even can fetch and display some resources:
```
{var $resources = $_modx->getResources(
	['published' => 1, 'deleted' => 0],
	['sortby' => 'id', 'sortdir' => 'ASC', 'limit' => 50]
)}
{foreach $resources as $resource}
	{$_modx->getChunk('@INLINE <p>{$id} {$pagetitle}</p>', $resource)}
{/foreach}
```

And of course, there are a global variables:
```
{$.session['your_key']}
{$.get['query']} or {$.get.query}
{$.server['REQUEST_URI']}
```

[1]: http://modx.com/extras/package/fastfield
[2]: https://github.com/argnist/fastField/issues/5
