# Parser pdoTools

Parser pdoTools is a separate class, set in MODX system settings and intercepts page tag processing.

In older versions, parser had to be enabled during install, but since version 2.1.1-pl it is enabled by default. If for some reason this does not suit you - remove system settings

- `parser_class` - parser class name
- `parser_class_path` - path to parser class

MODX has no such settings by default, needed only for third-party parser, as in our case.

## How it works

pdoParser is used in two cases:

- when rendering chunk by snippet - this always happens in all snippets, using pdoTools, regardless of system settings.
- when rendering page - only if parser is enabled in system settings.

## Chunk processing

pdoTools has 2 methods for this, similar to those in modX:

- `getChunk` - full chunk processing, may use native MODX parser
- `parseChunk` - only replace placeholders with values, modParser is not called

Main feature of these methods is that, that chunk loading uses protected method `_loadChunk`, which can load chunk from DB, and convert arbitrary strings to it.

### Chunk variants

Both pdoTools methods support these chunk name types:

> @INLINE or @CODE

One of the most popular options - specify chunk body directly on page. For example:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
]]
```

This has a nuance, that many people overlook - all placeholders in chunk are processed by parser **before** snippet call.

I.e. if you call snippet like this:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
]]
```

and placeholders are set in system memory `[[+id]]` or `[[+pagetitle]]`, snippet will receive already processed chunk and you get identical lines on page, e.g.:

```
15 - test
15 - test
15 - test
```

::: v-pre
Just values set by another snippet earlier. That is why in example we use unusual placeholders - `{{+}}` instead of `[[+]]`. System parser leaves them alone, pdoTools replaces them during processing.
:::

You can use curly braces for placeholders in all pdoTools chunks - it will convert them to `[[+]]` on load.

For this reason snippet and filter calls never work in INLINE chunks. **This will not work**:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@INLINE <p>[[+id]] - [[+pagetitle:default=`page title`]]</p>`
]]
```

But this works fine

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@INLINE <p>{{+id}} - {{+pagetitle:default=`page title`}}</p>`
]]
```

Remember this when using INLINE chunks.

> @FILE

Many blame MODX for, not storing chunks in files and requiring DB access. This is inconvenient for version control, and slower.

Since version 2.2 MODX [offers static elements for this][3], but for various reasons this may still be less convenient, than direct file access.

pdoTools enables this with @FILE:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@FILE resources/mychunk.tpl`
]]
```

For security, only files with extension `html` and `tpl`, and only from predefined directory in setting `pdotools_elements_path`.

You can specify custom directory via param `&elementsPath`:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@FILE resources/mychunk.tpl`
  &elementsPath=`/core/elements`
]]
```

File will be loaded from `/core/elements/resources/mychunk.tpl` from site root.

> @TEMPLATE

This chunk type allows using system templates (i.e. modTemplate objects) for output display.

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@TEMPLATE Base Template`
]]
```

If empty template and selected records have field `template` with id or template name, record will be wrapped in this template:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@TEMPLATE`
]]
```

This is analogous to snippet [renderResources][4].

When outputting template you can specify param set (as with snippets):

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@TEMPLATE Base Template@MyPropertySet`
]]
```

Then values from this set will be inserted into template.

#### Regular chunks

Default mode loads chunk from DB:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`MyChunk`
]]
```

Param sets are also supported:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`MyChunk@MyPropertySet`
]]
```

These chunk loading methods work in **all pdoTools snippets** and others that use `getChunk` and `parseChunk`.

### Method getChunk

Method signature:

```php
getChunk(string $chunkName, array $properties, bool $fastMode = false)
```

Method loads chunk (following @BINDING if any) and processes it, replacing placeholders with values ($properties).

Third param `fastMode` strips unprocessed placeholders to avoid stray tags on page. Otherwise parser recursively parses (up to 10 iterations by default), slowing execution. Recursive parser is MODX default; leftover tags are common. So `fastMode` off by default. pdoTools parser will not call system parser if it can parse all placeholders. If chunk has filter/snippet calls, processing passes to modParser.

### Method parseChunk

Method signature:

```php
parseChunk(string $name, array $properties, string $prefix = '[[+', string $suffix = ']]')
```

It also creates chunk from given name, parsing @BINDING if any, then replaces placeholders with values, without extra processing.

Simplest and fastest way to format data for chunks.

## Page processing

If pdoParser is enabled, it is called for whole page output to user.

With this parser all chunks and MODX extras process a bit faster. Only "a bit" because it handles no conditions/filters, only simple tags like `[[+id]]` and `[[~15]]`. But faster than modParser since it creates no extra objects.

Besides speed, you get extra options for outputting data from different resources.

### Tags fastField

In late 2012 [a small plugin][5] added new tags to MODX parser, which grew into [fastField component][1].

It adds extra placeholder handling like `[[#15.pagetitle]]`. [With author permission][2], this is included in pdoParser and extended.

All fastField tags start with `#` and then contain either **resource id** or **global array name**.

Output resource fields:

```modx
[[#15.pagetitle]]
[[#20.content]]
```

Resource TVs:

```modx
[[#15.date]]
[[#20.some_tv]]
```

miniShop2 product fields:

```modx
[[#21.price]]
[[#22.article]]
```

Resource and product arrays:

```modx
[[#12.properties.somefield]]
[[#15.size.1]]
```

Superglobal arrays:

```modx
[[#POST.key]]
[[#SESSION.another_key]]
[[#GET.key3]]
[[#REQUEST.key]]
[[#SERVER.key]]
[[#FILES.key]]
[[#COOKIE.some_key]]
```

You can specify any fields in arrays:

```modx
[[#15.properties.key1.key2]]
```

If you don't know array contents - specify it and it will be printed in full:

```modx
[[#GET]]
[[#15.colors]]
[[#12.properties]]
```

fastField tags can be combined with MODX tags:

```modx
[[#[[++site_start]].pagetitle]]

[[#[[++site_start]]]]
```

### Fenom templating engine

Fenom support [added in pdoTools 2.0][6], since then it requires PHP 5.3+.

It works much faster than native modParser, and if you rewrite your chunk so it has no MODX tags, modParser will not run at all. Of course, simultaneous use of old and new tags in one chunk **is allowed**.

Templating engine is controlled by these system settings:

- `pdotools_fenom_default` - Fenom processing for pdoTools chunks. Enabled by default.
- `pdotools_fenom_parser` - enables templating engine for all site pages. That is, not only chunks but also templates.
- `pdotools_fenom_php` - PHP functions in templates. Very dangerous - any manager gets direct PHP access.
- `pdotools_fenom_modx` - adds system variables `{$modx}` and `{$pdoTools}` to Fenom templates. Very dangerous - any manager can control MODX objects from chunks.
- `pdotools_fenom_options` - JSON options per [official docs][7]. E.g. `{"auto_escape":true,"force_include":true}`
- `pdotools_fenom_cache` - cache compiled templates. Use only for complex chunks on production. Off by default.

By default Fenom is on only for chunks processed by pdoTools. Safe; managers get no extra powers except better syntax and speed.

Enabling **pdotools_fenom_parser** allows Fenom in document/template content, but curly braces in MODX can confuse Fenom.

Often on first Fenom use you see raw code instead of result; usually because JavaScript has curly braces. Wrap scripts in `{ignore}` `{/ignore}` - {[ignore][8]}.

If enabling Fenom globally, verify it works on all pages.

#### Syntax

Start with [official Fenom docs][9], then we cover MODX usage.

All snippet variables pass to chunk as-is; rewriting chunks to Fenom syntax is straightforward.

| MODX                                                  | Fenom                               |
|-------------------------------------------------------|-------------------------------------|
| `[[+id]]`                                             | `{$id}`                             |
| ``[[+id:default=`test`]]``                            | `{$id ?: 'test'}`                   |
| ```[[+id:is=``:then=`test`:else=`[[+pagetitle]]`]]``` | `{$id == '' ? 'test' : $pagetitle}` |

For more complex usage, pdoParser provides `{$_modx}`, giving safe access to some system variables and methods.

| MODX                    | Fenom                                          | Short form                                                    |
|-------------------------|------------------------------------------------|-------------------------------------------------------------------|
| `[[*pagetitle]]`        | `{$_modx->resource.pagetitle}`                 | `{'pagetitle' \| resource}`                                       |
| `[[*tv_name]]`          | `{$_modx->resource.tv_name}`                   | `{'tv.tv_name' \| resource}`                                      |
| `[[$chunk_name]]`       | `{$_modx->getChunk('chunk_name')}`             | `{'chunk_name' \| chunk}` or `{include 'chunk_name'}`            |
| `[[!snippet_name]]`     | `{$_modx->runSnippet('!snippet_name')}`        | `{'!snippet_name' \| snippet}`                                    |
| `[[++system_setting]]`  | `{$_modx->config.system_setting}`              | `{'system_setting' \| config}` or `{'system_setting' \| option}` |
| `[[%lexicon_name]]`     | `{$_modx->lexicon('lexicon_name')}`            | `{'lexicon_name' \| lexicon}`                                     |
| `[[~15]]`               | `{$_modx->makeUrl(15)}`                        | `{15 \| url}`                                                     |
| `[[~[[*id]]]]`          | `{$_modx->makeUrl($_modx->resource.id)}`       | `{('id' \| resource) \| url}`                                     |
| `[[+placeholder_name]]` | `{$_modx->getPlaceholder('placeholder_name')}` | `{'placeholder_name' \| placeholder}`                             |

::: warning
Don't confuse snippet-returned placeholders, e.g. `{'page.nav' | placeholder}` for **pdoPage**, with snippet-passed variables in chunk, e.g. `{$pagetitle}`. MODX parser uses `[[+...]]` for both: `[[+page.nav]]` and `[[+pagetitle]]`.
:::

Available variables:
`{$_modx->config}` - system settings

```fenom
{$_modx->config.site_name}
{$_modx->config.emailsender}
{$_modx->config['site_url']}
{$_modx->config['any_system_setting']}
```

`{$_modx->user}` - current user array. If authenticated, profile data added:

```fenom
{if $_modx->user.id > 0}
  Hello, {$_modx->user.fullname}!
{else}
  You need to log in.
{/if}
```

`{$_modx->context}` - current context array

```fenom
You are in context {$_modx->context.key}
```

`{$_modx->resource}` - current resource array, seen in examples above

```fenom
{$_modx->resource.id}
{$_modx->resource.pagetitle}
{$_modx->makeUrl($_modx->resource.id)}
```

`{$_modx->lexicon}` - **modLexicon** object (not array) for loading lexicons:

```fenom
{$_modx->lexicon->load('ms2gallery:default')}
ms2Gallery lexicon: {$_modx->lexicon('ms2gallery_err_gallery_exists')}
```

Lexicon output uses `{$_modx->lexicon()}`.

#### fastField tags

fastField tags with Fenom, example for heading:

`{27 | resource : 'pagetitle'}`

Where `27` is **resource id**, `pagetitle` - field to output.

#### System variables

Anonymous system variable starts with `$.` and gives access to globals and system info:

- `$.env` — `$_ENV`
- `$.get` — `$_GET`
- `$.post` — `$_POST`
- `$.files` — `$_FILES`
- `$.cookie` — `$_COOKIE`
- `$.server` — `$_SERVER`
- `$.session` — `$_SESSION`
- `$.globals` — `$GLOBALS`
- `$.request` — `$_REQUEST`
- `$.tpl.name` — current template name
- `$.tpl.basename` — template name without scheme
- `$.tpl.scm` — template scheme
- `$.tpl.options` returns template parameters as integer.
- `$.tpl.depends` returns array of templates the current template depends on.
- `$.tpl.time` returns timestamp when template was last modified
- `$.version` returns version Fenom.
- `$.const` access to PHP constant: `$.const.PHP_EOL` access to `PHP_EOL`. Supports namespaced names with dot: `$.const.Storage.FS::DIR_SEPARATOR` access to `Storage\FS::DIR_SEPARATOR`; if not found, `Storage\FS\DIR_SEPARATOR` is used.
- `$.call` access to static method. `$.call.Storage.FS::put($filename, $data)` calls `Storage\FS::put($filename, $data)`. Setting `disable_call` disables `$.call`. You can also restrict the list of callable classes and functions.
- `$.block` check existence of blocks defined before accessor. Example: `{$.blocks.BLOCK_NAME}`. You can also add your own or remove existing system variables and functions.

#### Operators

Like any programming/templating language, Fenom supports many operators:

- Arithmetic — `+, -, *, /, %`
- Logical — `||, &&, !$var, and, or, xor`
- Comparison — `>, >=,<, <=, ==, !=, !==, <>`
- Bitwise — `|, &, , ~$var, >>,<<`
- Assignment — `=, +=, -=, *=, /=, %=, &=, |=, =, >>=,<<=`
- String — `$str1 ~ $str2`
- Ternary — `$a ? $b : $c, $a ! $b : $c, $a ?: $c, $a !: $c`
- Checking — `$var?, $var!`
- Testing — `is, is not`
- Containment — `in, not in`

#### Placeholders with dot or hyphen

MODX uses placeholders that cannot be used in Fenom, as they don't match [PHP variable naming rules][17].
E.g. placeholders with dot (MODX often outputs array data that way) or hyphen (TV parameters).

Use the **{$\_pls}** variable to access these placeholders:

```fenom
<!-- Output directly -->
{$_pls['tag.subtag']}

<!-- Or via variable -->
{var $tv_name = $_pls['tv-name']}
{$tv_name}
```

If placeholder was set in `modX::placeholders`, get it like this:

```fenom
{var $tag_sub_tag = $_modx->getPlaceholder('tag.sub_tag')}
{$tag_sub_tag}

{$_modx->getPlaceholder('tv_name')}
```

Invalid variables will prevent template compilation; error will be logged.

#### Filling placeholders

Fenom works in a single pass; it is not recursive like native MODX parser.

Single-pass templating is very fast, but **placeholders** are available **only after** the corresponding snippet runs.

Example: need value of `{$mse2_query}` (search query) in form, but form above search results.
Run snippet mSearch2 and pass results to placeholder, e.g. `searchResults`:

```fenom
{'!pdoPage' | snippet: [
  'element' => 'mSearch2',
  'toPlaceholder' => 'searchResults'
]}
```

Then call search form snippet; Fenom will substitute `{$mse2_query}`:

```fenom
{'!mSearchForm' | snippet}
```

Then output mSearch2 results:

```fenom
{'searchResults' | placeholder}
```

If snippet doesn't save results to placeholder, assign to Fenom variable:

```fenom
{var $date = 'dateAgo' | snippet: ['input' => '2016-09-10 12:55:35']}

...

Your date: {$date}.
```

Similar to ordinary script logic.

#### Output snippets and chunks

Variable `{$_modx}` is a simple and safe [microMODX class][10]

So snippets and chunks are called like this:

```fenom
{$_modx->runSnippet('!pdoPage@PropertySet', [
  'parents' => 0,
  'element' => 'pdoResources',
  'where' => ['isfolder' => 1],
  'showLog' => 1,
])}
{$_modx->getPlaceholder('page.total')}
{$_modx->getPlaceholder('page.nav')}
```

As you see, syntax closely matches PHP, enabling new options. E.g. you can use arrays instead of JSON strings.

By default snippets are cached; add `!` before name to disable - as in MODX tags.

If snippet is called via native MODX method, chunk output uses pdoTools and its features:

```fenom
{$_modx->getChunk('MyChunk@PropertySet')}

{$_modx->parseChunk('MyChunk', [
  'pl1' => 'placeholder1',
  'pl2' => 'placeholder2',
])}

{$_modx->getChunk('@TEMPLATE Base Template')}

{$_modx->getChunk('@INLINE
  Site name: {$_modx->config.site_name}
')}

{$_modx->getChunk(
  '@INLINE Pass variable to chunk: {$var}',
  ['var' => 'Test']
)}

{$_modx->getChunk('
  @INLINE Pass variable to snippet call:
  {$_modx->runSnippet("pdoResources", [
    "parents" => $parents
  ])}
  Total results: {$_modx->getPlaceholder("total")}
  ',
  ['parents' => 0]
)}
```

Examples above are a bit crazy but work fine.

#### Cache management

`{$_modx}` has `modX::cacheManager` for custom caching of snippet calls:

```fenom
{if !$snippet = $_modx->cacheManager->get('cache_key')}
  {set $snippet = $_modx->runSnippet('!pdoResources', [
    'parents' => 0,
    'tpl' => '@INLINE {$id} - {$pagetitle}',
    'showLog' => 1,
  ])}
  {set $null = $_modx->cacheManager->set('cache_key', $snippet, 1800)}
{/if}

{$snippet}
```

Check cache in `/core/cache/default/`; in example it is saved for 30 minutes.

`set $null = ...` prevents `cacheManager->set` from outputting 1 (true).

You can also run system processors (if you have permission):

```fenom
{$_modx->runProcessor('resource/update', [
  'id' => 10,
  'alias' => 'test',
  'context_key' => 'web',
])}
```

#### Authentication check

As there is no user object in `{$_modx}`, auth and permission methods are in the class:

```fenom
{$_modx->isAuthenticated()}
{$_modx->hasSessionContext('web')}
{$_modx->hasPermission('load')}
```

#### Performance info output

**Since version 2.1.4** you can use `{$_modx->getInfo(string, bool, string)}` to get system performance data.
Three parameters:

- **string** - output specific key from data array (empty, default)
- **bool** - output all data as string, not array (`true`, default)
- **string** - format output in chunk; any pdoTools chunk type (`@INLINE {$key}: ${value}`).

Default output (string with all data):

```fenom
{$_modx->getInfo()}
// queries: 39
// totalTime: 0.1067 s
// queryTime: 0.0069 s
// phpTime: 0.0998 s
// source: database
```

Output specific value:

```fenom
{$_modx->getInfo('totalTime')}
// 0.1067 s
{$_modx->getInfo('source')}
// database
```

Format output in your chunk:

```fenom
{$_modx->getInfo('', true, '@INLINE {$key} => {$value}')}
// queries => 39
// totalTime => 0.1155 s
// queryTime => 0.0091 s
// phpTime => 0.1064 s
// source => database
```

You can add strings to pdoTools lexicon (or any other) and output keys:

```fenom
{$_modx->lexicon->load('pdotools:default')}
{$_modx->getInfo('', true, '@INLINE {$_modx->lexicon("pdotools_" ~ $key)} => {$value}')}
```

Or without lexicons: assign data array to variable and output keys:

```fenom
{set $info = $_modx->getInfo('', false)}
Total time: {$info.totalTime}
Query time: {$info.queryTime}
Queries: {$info.queries}
Source: {$info.source}
```

Output info only to manager users:

```fenom
{if $_modx->hasSessionContext('mgr')}
  {$_modx->getInfo()}
{/if}
```

#### Other methods

These methods are familiar to MODX developers, shown by example:

```fenom
{$_modx->regClientCss('/assets/css/style.css')}
{$_modx->regClientScript('/assets/css/script.js')}

{$_modx->sendForward(10)}
{$_modx->sendRedirect('http://yandex.ru')}

{$_modx->setPlaceholder('key', 'value')}
{$_modx->getPlaceholder('key')}

{if $res = $_modx->findResource('url-to/doc/')}
  {$_modx->sendRedirect( $_modx->makeUrl($res) )}
{/if}
```

You can get and output resources without snippets:

```fenom
{var $resources = $_modx->getResources(
  ['published' => 1, 'deleted' => 0],
  ['sortby' => 'id', 'sortdir' => 'ASC', 'limit' => 50]
)}
{foreach $resources as $resource}
  {$_modx->getChunk('@INLINE <p>{$id} {$pagetitle}</p>', $resource)}
{/foreach}
```

New methods are added periodically; see [source file][18]

### Modifiers

Fenom can use MODX snippets as modifiers.
E.g. with **dateAgo** installed, you can use it for date output:

```modx
[[!pdoResources?
  &parents=`0`
  &tpl=`@INLINE <p>{$id} - {$pagetitle} {$createdon | dateago}</p>`
]]
```

Also works with **Jevix** and other MODX filter snippets accepting `$input` and `$options` per [docs][19].

```modx
[[!pdoResources?
  &parents=`0`
  &includeContent=`1`
  &tpl=`@INLINE <p>{$id} - {$pagetitle} {$createdon | dateago} {$content | jevix}</p>`
]]
```

Modifiers can be chained:

```modx
[[!pdoResources?
  &parents=`0`
  &includeContent=`1`
  &tpl=`@INLINE <p>{$id} - {$pagetitle} {$createdon | date_format:"%Y-%m-%d %H:%M:%S" | dateago}</p>`
]]
```

If modifier not found, variable stays unchanged and error is logged.

### Array merge

```fenom
{set $arr1 = [2,15,55]}
{set $arr2 = [44,88,11]}
{set $arr = $arr1 | array_merge : $arr2}
<pre>
  {$arr | print_r}
</pre>
```

#### Built-in modifiers

Currently available Fenom modifiers (synonyms in parentheses):

- **date_format** - date formatting via `strftime`. If variable empty, current time is used.

    ```fenom
    {'2015-01-10 12:45' | date_format : '%d.%m.%Y'} // 10.01.2015
    {'' | date_format : '%Y'} // current year
    ```

- **date** - date formatting via `date`. If variable empty, current time is used.

    ```fenom
    {'2015-01-10 12:45' | date : 'd.m.Y'} // 10.01.2015
    {'' | date : 'Y'} // current year
    ```

    for date +1 day use format per [strftime()](http://docs.php.net/ru/strftime)

    ```fenom
    {'+1 days' | date : 'Y-m-d'} // tomorrow
    ```

- **escape (e)** - variable escaping. First parameter accepts mode, second - encoding.

    ```fenom
    {'<p>value</p>' | escape : 'html' : 'utf-8'} // &lt;p&gt;value&lt;/p&gt;
    {'http://site.com/?key=value' | escape : 'url'} // http%3A%2F%2Fsite.com%2F%3Fkey%3Dvalue
    {['key' => 'value'] | escape : 'js'}
    ```

- **unescape** - variable decoding

    ```fenom
    {'&lt;p&gt;value&lt;/p&gt;' | unescape : 'html' : 'utf-8'} // <p>value</p>
    {'http%3A%2F%2Fsite.com%2F%3Fkey%3Dvalue' | unescape : 'url'} // http://site.com/?key=value
    {'{"key":"value"}' | unescape : 'js'}
    ```

- **truncate (ellipsis)** - Truncates variable to specified length, by default - 80 characters.
    As optional second parameter, you can pass string text, which is displayed at end of truncated variable.
    Characters of this string are not included in total length truncated string. Default, truncate attempts to truncate string between words.
    If you want to truncate string strictly at specified length, pass to third optional parameter value true.

    ```fenom
    {var $str = 'very very long string'}
    {$str | truncate : 10 : ' read more...'} // very very read more...
    {$str | truncate : 5 : ' ... ' : true : true} // very ... string
    ```

- **strip** - removes spaces at start and end text. If additional parameter specified, then removed and all repeated spaces in text.

    ```fenom
    {'text     with      spaces' | strip : true} // text with spaces
    ```

- **length (len, strlen)** - outputs variable length. Accepts string or array.

    ```fenom
    {'var' | length} // 3
    {['key' => 'value'] | len} // 1
    ```

- **in** - operator checking substring in string or value in array

    ```fenom
    {var $key = '10'}
    // string
    {if $key | in : 'I have 10 apples'}
      Key found
    {/if}
    // array + ternary operator
    {$key | in : [1, 3, 42] ? 'key found' : 'not found'}
    ```

- **iterable** - check iterability variable

    ```fenom
    {var $array = ['key' => 'value']}
    {if $array | iterable}
      {foreach $array as $key => $value}
        <p>{$key} is {$value}</p>
      {/foreach}
    {/if}
    ```

- **replace** - replaces all occurrences search string with replacement string

    ```fenom
    {$fruits | replace : "pear" : "orange"} // all pear replaced with orange
    ```

- **ereplace** - performs search and replace by regex.

    ```fenom
    {'April 15, 2014' | ereplace : '/(\w+) (\d+), (\d+)/i' : '${1}1, $3'} // April1, 2014
    ```

- **match** - checks string match with pattern, via function `fnmatch`. You can use simple masks:

    ```fenom
    {if $color | match : '*gr[ae]y'}
    some shade of gray
    {/if}
    ```

- **ematch** - performs check against regex

    ```fenom
    {if $color | ematch : '/^(.*?)gr[ae]y$/i'}
    some shade of gray
    {/if}
    ```

- **split** - splits string and returns array, using first parameter as delimiter (by default `,`).

    ```fenom
    {var $fruits = 'banana,apple,pear' | split} // ["banana", "apple", "pear"]
    {var $fruits = 'banana,apple,pear' | split : ',apple,'} // ["banana", "pear"]
    ```

- **esplit** splits string by regex in first parameter (by default `/,\s*/`).

    ```fenom
    {var $fruits = 'banana, apple, pear' | esplit} // ["banana", "apple", "pear"]
    {var $fruits = 'banana; apple; pear' | esplit : '/;\s/'} // ["banana", "apple", "pear"]
    ```

- **join** - joins array elements into string, using first parameter as joiner (by default `,`).

    ```fenom
    {var $fruits1 = ["banana", "apple", "pear"]}
    {$fruits1 | join} // banana, apple, pear
    {$fruits1 | join : 'is not'} // banana is not apple is not pear
    ```

- **number (number_format)** - number formatting PHP function `number_format()`

    ```fenom
    {var $number = 10000}
    {$number | number : 0 : '.' : ' '} // outputs 10 000
    ```

- **rand** - random number generation via PHP function `rand()`

    ```fenom
    {rand(1, 10)} // outputs random number from 1 to 10
    ```

- **md5, sha1, crc32** - checksum string by different algorithms

    ```fenom
    {'text' | md5} // 1cb251ec0d568de6a929b520c4aed8d1
    {'text' | sha1} // 372ea08cab33e71c02c651dbc83a474d32c676ea
    {'text' | crc32} // 999008199
    ```

- **urldecode, urlencode, rawurldecode** - string processing corresponding PHP function.

    ```fenom
    {'http://site.com/?key=value' | urlencode} // http%3A%2F%2Fsite.com%2F%3Fkey%3Dvalue
    {'http%3A%2F%2Fsite.com%2F%3Fkey%3Dvalue' | urldecode} // http://site.com/?key=value
    ```

- **base64_decode, base64_encode** - encoding and decoding string by algorithm base 64

    ```fenom
    {'text' | base64_encode} // dGV4dA==
    {'dGV4dA==' | base64_decode} // text
    ```

- **json_encode (toJSON), json_decode (fromJSON)**

    ```fenom
    {'{"key":"value"}' | fromJSON} // ["key" => "value"]
    {["key" => "value"] | toJSON} // {"key":"value"}
    ```

- **http_build_query** - URL-encoded string generation string from array

    ```fenom
    {['foo'=>'bar','baz'=>'boom'] | http_build_query} // foo=bar&baz=boom
    ```

- **print_r** - prints variable via PHP function. If parameter passed, then result can be saved.

    ```fenom
    {var $printed = (['key' => 'value'] | print_r : true)} // Array ( [key] => value )
    ```

- **var_dump (dump)** - prints variable with type

- **nl2br** - inserts HTML line break before each line break

- **lower (low, lcase, lowercase, strtolower)** - string to lower case

    ```fenom
    {'Text for check' | lower} // text for check
    ```

- **upper (up, ucase, uppercase, strtoupper)** - string to upper case

    ```fenom
    {'Text for check' | upper} // TEXT FOR CHECK
    ```

- **ucwords** - converts to upper case first character of each word in string, and rest to lower

    ```fenom
    {'teXt For checK' | ucwords} // Text For Check
    ```

- **ucfirst** - converts to upper case first character first word in string, and rest to lower

    ```fenom
    {'teXt For checK' | ucfirst} // Text for check
    ```

- **htmlent (htmlentities)** - converts all characters in HTML entities

    ```fenom
    {'<b>Text for check</b>' | htmlent} // &lt;b&gt;Text for check&lt;/b&gt;gt;
    ```

- **limit** - string truncation to specified number characters

    ```fenom
    {'Hello, how are you' | limit : 6} // Hello
    ```

- **esc (tag)** - HTML escaping and MODX tags

    ```fenom
    {'Hello, [[+username]]' | esc} // username tag will not be processed
    ```

- **notags (striptags, stripTags, strip_tags)** - removal HTML tags from string

    ```fenom
    {'<b>Hello!</b>' | notags} // Hello!
    ```

- **stripmodxtags** - removal tags MODX from string

    ```fenom
    {'Hello, [[+username]]' | stripmodxtags} // Hello,
    ```

- **cdata** - wraps output in CDATA tags. Usually needed for value escaping in XML markup.
- **reverse (strrev)** - reverses string character by character

    ```fenom
    {'mirrortext' | reverse} // txetrorrim
    ```

- **wordwrap** - inserts line break after each nth character (words not split)

    ```fenom
    {'very very long text' | wordwrap : 3} // very<br />very<br />long<br />text
    ```

- **wordwrapcut** - inserts line break after each nth character, even if character is inside word

    ```fenom
    {'very very long text' | wordwrapcut : 3} // ver<br />y<br />ver<br />y<br />lon<br />g<br />tex<br />t
    ```

- **fuzzydate** - outputs date relative to today and yesterday, using system lexicons. If more than 2 days passed, then formats date via `strftime`.

    ```fenom
    {'2016-03-20 13:15' | fuzzydate : '%d.%m.%Y'} // 20.03.2016
    {'' | date : 'Y-m-d 13:15' | fuzzydate} // today in 01:15 PM
    ```

- **declension (decl)** - declines word, following number by Russian grammar rules. For example: 1 item, 2 items, 10 items. Second parameter specifies whether to output number itself, by default outputs only matching word form. Form separator can be set third parameter, by default `|`.

    ```fenom
    {6 | declension : 'item|items'} // items
    {3 | declension : 'item|items' : true} // 3 items
    {101 | decl : 'item,items' : false : ','} // item
    ```

- **ismember (memberof, mo)** - check membership user to group or groups MODX users. If variable empty, then check conducted for current user.

    ```fenom
    {1 | ismember : 'Administrator'} // true
    {0 | ismember : ['Administrator', 'Manager']} // false
    ```

- **isloggedin, isnotloggedin** - auth check current user in the. If context not specified, then current checked.

    ```fenom
    {'' | isloggedin : 'web'} // true
    {'' | isnotloggedin : 'web'} // false
    ```

- **url** - URL generation to system document via `modX::makeUrl`.

    ```fenom
    {10 | url}
    {10 | url : ['scheme' => 'full'] : ['param' => 'value']}
    ```

- **lexicon** - output of entry from lexicons system via `modX::lexicon`. Some lexicons need to be loaded first.

    ```fenom
    {$_modx->lexicon->load('en:core:default')}
    {'action_err_nfs' | lexicon : ['id' => 25] : 'en'} // No action with 25 found.
    ```

- **user (userinfo)** - output of field system user

    ```fenom
    {1 | user : 'fullname'} // Administrator
    ```

- **resource** - output of field system document. Can output TV parameters

    ```fenom
    {1 | resource : 'longtitle'} // Home page
    {1 | resource : 'my_tv'} // My_tv value
    ```

- **print** - print function and escaping any variables. Very useful for debugging when you need to know, that is inside. Single parameter specifies, whether to wrap data in tag `<pre>` (default - yes).

    ```fenom
    {1 | resource | print} // prints array with data of entire resource
    {0 | user : 'extended' | print : false} // prints array field extended current user in one line
    ```

- **setOption** - setting value in array `modX::config`. Must specify key value in array.

    ```fenom
    {'New site name' | setOption : 'site_name'}
    ```

- **option (getOption)** - getting value from array `modX::config`

    ```fenom
    {'site_name' | option} // New site name
    ```

- **setPlaceholder (toPlaceholder)** - setting value in array `modX::placeholders`. Must specify key value in array.

    ```fenom
    {'My text' | setPlaceholder : 'my_text'}
    ```

- **placeholder (fromPlaceholder)** - getting value from array `modX::placeholders`.

    ```fenom
    {'my_text' | placeholder} // My text
    ```

- **cssToHead** - registration CSS code in page head page
- **htmlToHead** - registration of arbitrary HTML in page head page
- **htmlToBottom** - registration of arbitrary HTML in footer page
- **jsToHead** - registration of javascript file in page head page. If pass parameter `true`, then can register code directly.
- **jsToBottom** - registration of javascript in footer page. If pass parameter `true`, then can register code directly.

    ```fenom
    {'<script>alert();</script>' | jsToBottom : true} // On page load will be javascript alert
    ```

::: warning
For registration functions on page must have tags head and `body`
:::

#### PCRE modifiers

- **preg_quote** - adds backslash before each special character. Useful when, if template composition involves string variables, value of which during script execution may change in regex special are considered following characters:

    ```php
    . \ + * ? [ ^ ] $ ( ) { } = ! < > | : -
    ```

- **preg_match** - performs check against regex

    For example, output _email_ if matches regex:

    ```fenom
    {if 'email@mail.ru'|preg_match : '/^.+@.+\\.\\w+$/' }
    email
    {/if}
    ```

- **preg_get** - performs search by regex, result contains first set of matches

    For example, get first image from field _content_:

    ```fenom
    {set $image = $_modx->resource.content|preg_get : '!http://.+\.(?:jpe?g|png|gif)!Ui}
    ```

- **preg_get_all** - performs search by regex, result contains set of all matches
- **preg_grep** - returns array matches, that match pattern

    For example, get only _dates_:

    ```fenom
    {["26-04-1974", "John", "27-11-1977", "Jane"] | preg_grep : "/(\d{2})-(\d{2})-(\d{4})/" | print_r : true}
    ```

- **preg_replace** - performs search and replace by regex

    For example, output name site without _http_:

    ```fenom
    Website: {'http://site.name'|preg_replace : '~^https?://~': ''}
    ```

- **preg_filter** - performs search and replace by regex identical to _preg_replace_ except that, that returns only values, in where match found

- **preg_split** - splits string by regex

    For example:

    ```fenom
    {'I love MODX' | preg_split : '/ /' | print_r : true}// Array ( [0] => I [1] => love [2] => MODX )
    ```

- Simple concatenation arrays (You can use HTML tags)

    Example:

    ```fenom
    {set $array = [1,2,3,4]}

    {set $output}
      {foreach $array as $item}{$item}{/foreach}
    {/set}

    {$output} //Output 1234
    ```

#### Custom modifiers

Snippet filter must accept 2 params: required `$input` and optional `$options`. Can return only strings.

As example let us create snippet **randomize**, which will take received string and append to it random set characters.
In parameter we can pass number of added characters:

```php
<?php
if (empty($options)) {
  $options = 10;
}
$rand = md5(rand());

return $input . ' ' . substr($rand, 0, $options);
```

Now you can use new modifier as in Fenom

```fenom
{'any text' | randomize : 5}
```

so and in MODX

```modx
[[!*pagetitle:randomize=`5`]]
```

#### Custom Fenom modifiers

Since version **2.6.0**, for adding modifiers you can use system event **pdoToolsOnFenomInit**:

```php
<?php
/** @var modX $modx */
switch ($modx->event->name) {
  case 'pdoToolsOnFenomInit':
    /** @var Fenom $fenom
      We receive variable $fenom at its first initialization, so that can add
      modifier "website" for output of domain name from arbitrary URL.
    */
    $fenom->addModifier('website', function ($input) {
      if (!$url = parse_url($input)) {
        return $input;
      }
      $output = str_replace('www.', '', $url['host']);

      return strtolower($output);
    });
    break;
}
```

Now modifier _website_ can use in any chunks and Fenom templates:

```fenom
<a href="{$link}" target="blank">{$link | website}</a>
```

Such modifiers are internal Fenom methods and work faster snippets, because no query to DB needed for their loading, then cache code to file for execution.

#### Useful examples custom modifiers Fenom

##### Reading time

Modifier for calculation reading time content on page, may be useful for blogs and sections with text articles.

```php
$fenom->addModifier('readingtime', static function (string $input, int $threshold = 200) {
  $words = count(preg_split('~[^\p{L}\p{N}\']+~u', strip_tags($input)));
  return ceil($words / $threshold) ?: 0;
});
```

Usage example: `{$_modx->resource.content | readingtime : 150 | decl : 'minute|minutes' : true}`

#### Custom Fenom tags

In Fenom you can create custom tags

```php
<?php
/** @var modX $modx */
switch ($modx->event->name) {
  case 'pdoToolsOnFenomInit':
    $fenom->addCompiler('exit', function () {
      return "return;";
    });
    break;
}
```

Now you can stop template engine using `{exit}`
Example:

```fenom
text here
{exit}
text here after exit
output "text here"
```

### Extending templates

Usage template engine Fenom allows including one chunks (templates in others) and even extend them.

For example, you can simply load chunk content:

```fenom
Regular chunk {include 'chunk name'}
Template modTemplate {include 'template:template name'}
Chunk with parameter set
{include 'chunk@propertySet'}
{include 'template:Name@propertySet'}
```

More about {[include][11]} read in official docs.

More interesting feature - {[extends][12]} templates, requires enabled system setting **pdotools_fenom_parser**.

Write base template "Fenom Base":

```fenom
<!DOCTYPE html>
<html lang="en">
  <head>
    {include 'head'}
  </head>
  <body>
    {block 'navbar'}
      {include 'navbar'}
    {/block}
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          {block 'content'}
            {$_modx->resource.content}
          {/block}
        </div>
        <div class="col-md-2">
          {block 'sidebar'}
            Sidebar
          {/block}
        </div>
      </div>
      {block 'footer'}
        {include 'footer'}
      {/block}
    </div>
  </body>
</html>
```

It includes regular chunks (in which, incidentally, regular MODX placeholders from component **Theme.Bootstrap**) and defines several blocks `{block}`, which can be extended in another template.

Now write "Fenom Extended":

```fenom
{extends 'template:Fenom Base'}

{block 'content'}
  <h3>{$_modx->resource.pagetitle}</h3>
  <div class="jumbotron">
    {parent}
  </div>
{/block}
```

Thus you can write one base template and extend it with children.

Similarly you can write and extend chunks, only note, that for modTemplate must specify prefix **template:**, for chunks no — they work by default in all `{include}` and `{extends}`.

::: warning
Important! On inheritance Fenom requires declaring at least one block to template. I.e. simply inheriting base template with line `{extends 'template:Fenom Base'}` is not allowed, will cause 502 error at level PHP. Sufficient to declare any block or override from base:
:::

```fenom
{extends 'template:Fenom Base'}
{block 'empty'}{/block}
```

### Testing performance

Create new site and add to it 1000 resources with this console script:

```php
<?php
define('MODX_API_MODE', true);
require 'index.php';

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_FATAL);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

for ($i = 1; $i <= 1000; $i++) {
  $modx->runProcessor('resource/create', array(
    'parent' => 1,
    'pagetitle' => 'page_' . rand(),
    'template' => 1,
    'published' => 1,
  ));
}
```

Then create 2 chunk: `modx` and `fenom` with following content respectively:

:::code-group

```modx
<p>[[+id]] - [[+pagetitle]]</p>
```

```fenom
<p>{$id} - {$pagetitle}</p>
```

:::

And add two console scripts for testing. For native MODX parser

```php
<?php
define('MODX_API_MODE', true);
require 'index.php';

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_FATAL);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

$res = array();
$c = $modx->newQuery('modResource');
$c->select($modx->getSelectColumns('modResource'));
$c->limit(10);
if ($c->prepare() && $c->stmt->execute()) {
  while ($row = $c->stmt->fetch(PDO::FETCH_ASSOC)) {
    $res .= $modx->getChunk('modx', $row);
  }
}
echo number_format(microtime(true) - $modx->startTime, 4), 's<br>';
echo number_format(memory_get_usage() / 1048576, 4), 'mb<br>';
echo $res;
```

And for pdoTools:

```php
<?php
define('MODX_API_MODE', true);
require 'index.php';

$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_FATAL);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');
$pdoTools = $modx->getService('pdoTools');

$res = array();
$c = $modx->newQuery('modResource');
$c->select($modx->getSelectColumns('modResource'));
$c->limit(10);
if ($c->prepare() && $c->stmt->execute()) {
  while ($row = $c->stmt->fetch(PDO::FETCH_ASSOC)) {
    $res .= $pdoTools->getChunk('fenom', $row);
    //$res .= $pdoTools->getChunk('modx', $row);
  }
}
echo number_format(microtime(true) - $modx->startTime, 4), 's<br>';
echo number_format(memory_get_usage() / 1048576, 4), 'mb<br>';
echo $res;
```

As pdoTools understands both syntaxes, for it 2 tests - in mode tags MODX, and in mode Fenom.
Scripts have `limit = 10`, table shows numbers with its increase:

| Limit | MODX             | pdoTools (MODX)  | pdoTools (Fenom) |
|-------|------------------|------------------|------------------|
| 10    | 0.0369s 8.1973mb | 0.0136s 7.6760mb | 0.0343s 8.6503mb |
| 100   | 0.0805s 8.1996mb | 0.0501s 7.6783mb | 0.0489s 8.6525mb |
| 500   | 0.2498s 8.2101mb | 0.0852s 7.6888mb | 0.0573s 8.6630mb |
| 1000  | 0.4961s 8.2232mb | 0.1583s 7.7019mb | 0.0953s 8.6761mb |

Now, let us complicate chunks - add to them URL generation for resource and output `menutitle`:

:::code-group

```modx
<p><a href="[[~[[+id]]]]">[[+id]] - [[+menutitle:default=`[[+pagetitle]]`]]</a></p>
```

```fenom
<p><a href="{$_modx->makeUrl($id)}">{$id} - {$menutitle ?: $pagetitle}</a></p>
```

:::

| Limit | MODX             | pdoTools (MODX)  | pdoTools (Fenom) |
|-------|------------------|------------------|------------------|
| 10    | 0.0592s 8.2010mb | 0.0165s 7.8505mb | 0.0346s 8.6539mb |
| 100   | 0.1936s 8.2058mb | 0.0793s 7.8553mb | 0.0483s 8.6588mb |
| 500   | 0.3313s 8.2281mb | 0.2465s 7.8776mb | 0.0686s 8.6811mb |
| 1000  | 0.6073s 8.2560mb | 0.4733s 7.9055mb | 0.1047s 8.7090mb |

As you see, chunk processing via pdoTools is faster in all cases.
Notice, that Fenom chunks have some startup minimum, due to template compilation need.

## Disabling

Parser pdoTools well tested and not found in any errors, but you suspect it - since 2.8.1 you can easily enable native MODX parser.

Change exactly one system setting: **parser_class** - set to **modParser**.

To enable pdoParser set its name back in this setting.

## Problems and solutions

When using pdoParser, and fenom template engine, developers often encounter with white screen instead of pages site. John Shlohov in in his article — [Why ignore tag does not work][22], details mechanics of pdo parser and explains, what causes the error.

If front-end fell (white page or 500 error), and logs show similar errors:

```php
(ERROR @ /public_html/core/components/pdotools/model/pdotools/pdotools.class.php : 582) Unexpected token 'm' in expression in file:chunks/metrika.tpl line 3, near '{(m' <- there
```

this means, that fenom parser tries to process tag in curly braces and does not find it. Use one of solutions below to avoid this.

### Spaces around curly braces

Put spaces around curly braces, no extra manipulation needed.

```js
function(){ //code }
```

### Tag {ignore}

Often inconvenient to add spaces around braces, as code may be large, it may grow, easy to miss a brace. Use tag {ignore}

```fenom
{ignore}
  function(){ //code }
{/ignore}
```

Note, that fenom does not work inside this tag.
Tag {ignore} must be in iteration, after which no more Fenom tags. Unfortunately not always achievable.
In new pdoTools version this error is fixed, but still occurs with file elements.

### From modzone site author

If {ignore} did not help, article linked above has two solutions.

1. Specify to template cached tag `[[*content]]` instead of `{$_modx->resource.content}`.
2. Move block with {ignore} to resource (often such tags go in chunks).

### Built-in modifiers

Useful when including JS code. For example use modifier `jsToBottom`.
@iWatchYouFromAfar gives example code:

```fenom
{'
<script type="text/javascript">
  {Google Analytics or Yandex.Metrica script}
</script>
' | jsToBottom : true}
```

### Custom ignore modifier

You can also write custom ignore modifier using event **pdoToolsOnFenomInit**. Much better, than separate snippet for this. Useful when, you use `{}` outside JS code, e.g. in element markup.

```php
<?php
/** @var modX $modx */
switch ($modx->event->name) {
  case 'pdoToolsOnFenomInit':
    $fenom->addModifier('ignore', function ($input) {
      $output = '{ignore}' . $input . '{/ignore}';
      return $output;
    });
    break;
}
```

Usage:

```fenom
<div data-attr='{'{"0":{"items":1,"nav":"false"},"100":{"items":2}}' | ignore}'>
```

### Examples

#### Running snippets in Fenom

**Method 1:**

```fenom
{'!pdoPage' | snippet: [
  'parents' => $_modx->resource.id,
  'limit' => 7,
  'toPlaceholder' => 'result'
]}
{$_modx->getPlaceholder('result')}
{$_modx->getPlaceholder('page.total')}
{$_modx->getPlaceholder('page.nav')}
```

**Method 2:**

```fenom
{$_modx->runSnippet('!pdoPage', [
  'parents' => $_modx->resource.id,
  'limit' => 7,
  'toPlaceholder' => 'result'
])}


{$_modx->getPlaceholder('result')}
{$_modx->getPlaceholder('page.total')}
{$_modx->getPlaceholder('page.nav')}
```

To call pdopage without params:

Method 1:

```fenom
{'!pdoPage' | snippet}
```

Method 2:

```fenom
{$_modx->runSnippet('!pdoPage')}
```

#### Condition IF

Set current page id to variable

```fenom
{set $id = $_modx->resource.id}
```

Condition:

```fenom
{if $id == '1'}
<p>Main page</p>
{else}
<p>Not main</p>
{/if}>
```

#### IF with ternary operator

Set current page id to variable

```fenom
{set $id = $_modx->resource.id}
```

Condition:

```fenom
{$id == '1' ? '<p>Main page</p>' : '<p>Not main</p>'}
```

#### Output chunk

```fenom
{include 'myChunk'}
```

Getting value TV for arbitrary resource:

```fenom
{7 | resource: 'tv_name'}
```

**7** — id resource

#### Vendor info in miniShop2

```fenom
{$_modx->makeUrl($_pls['vendor.resource'])}
{$_pls['vendor.name']})
{$_modx->getPlaceholder('vendor.name')}
```

#### Getting image via variable with dot ($\_pls)

```fenom
{$_pls["tv.img"] | phpthumbon : "w=300&h=200&zc=1"}

// Without prefix

{$img | phpthumbon : "w=300&h=200&zc=1"}
```

#### Getting preview images in cart

```fenom
{if $product['120x90']?}
  <img src="{$product['120x90']}" alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
{else}
  <img src="{'assets_url' | option}components/minishop2//web/ms2_small.png"
  srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
  alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
{/if}
```

#### Output current year

```fenom
{'' | date : 'Y'}
```

#### Output full URL current page with protocol + canonical

```fenom
{$_modx->makeUrl($_modx->resource.id, '', '', 'full')}
<link rel="canonical" href="{$_modx->makeUrl($_modx->resource.id, '', '', 'full')}">
```

#### Output base URL

```fenom
<base href="{$_modx->config.site_url}">
```

#### meta robots

```fenom
{if $_modx->resource.searchable}
  <meta name="robots" content="index, follow">
{else}
  <meta name="robots" content="noindex, nofollow">
{/if}
```

Index/noindex checkbox in resource: Searchable.

#### title

Output extended title in title, if not filled then output simple title

```fenom
<title>{$_modx->resource.longtitle ?: $_modx->resource.pagetitle} | {$_modx->config.site_name}</title>
```

#### Output author name content

```fenom
<meta name="author" content="{$_modx->user.fullname}">
```

#### Remove circular link from main page

Many SEO experts, believe that logo on main page should not link to itself, you can write such condition.

```fenom
{if $_modx->resource.id != 1}
  <a class="logo" href="{1 | url}" title="Go to main page" >
  <img src="images/logotip.png" alt="{'site_name' | config}, go to main"></a>
{else}
  <div class="logo"><img src="images/logotip.png" alt="{$_modx->config.site_name}"></div>
{/if}
```

### Output chunk on specific resource

Often carousels are used only on main page and to avoid separate template for main, output slider in separate chunk and call with such construct:

```fenom
{if $_modx->resource.id = 1}{include 'slider'}{/if}
```

### Output chunks by template ID

```fenom
{include ('tpl.' ~ $_modx->resource.template)}
```

### Output date

```fenom
{$_modx->resource.publishedon | date_format:"%d-%m-%Y %H:%M:%S"}
```

#### Remove spaces from phone

E.g. with `ClientConfig` we created system setting phone with value `8 800 7000 700` and need to remove spaces from value `tel`, call will be:

```fenom
<a href="tel:{$_modx->config.phone  | preg_replace : '/[^0-9+]/' : ''}">  {$_modx->config.phone}</a>
```

#### Output MIGX via fenom

Output migx using fenom for current resource

```fenom
{set $rows = $_modx->resource.elements | fromJSON}
{foreach $rows as $idx => $row}
  {$row.image}
{/foreach}
```

where `elements` migx TV name.

#### Output migx using fenom for arbitrary resource

```fenom
{set $rows = ID | resource : 'elements' | fromJSON}
{foreach $rows as $idx => $row}
  {$row.image}
{/foreach}
```

where `ID` id resource TV to output, `elements` migx TV name.

#### Image resize using phpthumbon via fenom

```fenom
{$img | phpthumbon : "w=220&h=150&zc=1"}
```

## Summary

Let's summarize capabilities of parser pdoTools:

- Fast execution
- Support for tags fastField
- Support for template engine Fenom
- Inheritance templates
- Extending templates
- Safe access to advanced functions MODX

Currently pdoTools downloaded over 114,000 times from [official repo][13] and over 25,000 from [modstore.pro repo][14], enabling widespread adoption of new templating tech in MODX.

[1]: http://modx.com/extras/package/fastfield
[2]: https://github.com/argnist/fastField/issues/5
[3]: https://rtfm.modx.com/revolution/2.x/administering-your-site/upgrading-modx/upgrading-to-2.2.x#Upgradingto2.2.x-StaticElements
[4]: https://rtfm.modx.com/extras/revo/renderresources
[5]: http://habrahabr.ru/post/161843/
[6]: https://modx.pro/components/5598-pdotools-2-0-0-beta-c-templating-fenom/
[7]: https://github.com/fenom-template/fenom/blob/master/docs/ru/configuration.md
[8]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/ignore.md
[9]: https://github.com/fenom-template/fenom/blob/master/docs/ru/syntax.md
[10]: https://github.com/bezumkin/pdoTools/blob/master/core/components/pdotools/model/pdotools/_micromodx.php
[11]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/include.md
[12]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
[13]: http://modx.com/extras/package/pdotools
[14]: https://modstore.pro/pdotools
[17]: http://php.net/manual/ru/language.variables.basics.php
[18]: https://github.com/bezumkin/pdoTools/blob/master/core/components/pdotools/model/pdotools/_micromodx.php
[19]: /en/system/basics/modifiers/
[22]: https://modzone.ru/blog/2017/10/06/why-doesnt-work-tag-ignore/
