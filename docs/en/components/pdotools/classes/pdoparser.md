# pdoParser

pdoParser is a replacement for modParser.

## Placeholder processing

It parses MODX tags quickly without creating objects, unlike the original parser. pdoParser works only with simple tags (no filters/conditions):

- `[[%tag]]` - lexicon string
- `[[~id]]` - link
- `[[+tag]]` - placeholders
- `[[++tag]]` - system placeholders
- `[[*tag]]` - resource placeholders
- `[[#tag]]` - FastField placeholders

FastField tags [were proposed by Vitaly Kireev](http://habrahabr.ru/post/161843/) in the fastField addon. [With author consent](https://github.com/argnist/fastField/issues/5), pdoParser supports them.

It can:

- Output resource fields: `[[#15.pagetitle]]`, `[[#20.content]]`
- Output resource TVs: `[[#15.date]]`, `[[#20.some_tv]]`
- Output miniShop2 product fields: `[[#21.price]]`, `[[#22.article]]`
- Output resource/product arrays: `[[#12.properties.somefield]]`, `[[#15.size.1]]`
- Output global arrays: `[[#POST.key]]`, `[[#SESSION.another_key]]`
- Dump arrays for debug: `[[#15.colors]]`, `[[#GET]]`, `[[#12.properties]]`

Number after # = resource id to pull data from. pdoTools handles these without modElement objects, so faster than native MODX. Tags with params go to native modParser.

## Fenom templating engine

Since 2.0 pdoTools includes [Fenom](https://github.com/fenom-template/fenom/tree/master/docs/ru#readme). Works only when pdoParser is enabled and allowed in system settings.

### Features

- Compiles to native PHP; typically **30%-50%** faster than MODX tags
- Works in chunks and pages
- Fenom and MODX tags coexist
- MODX parser skipped if no MODX placeholders in chunk
- Fenom skipped if no Fenom tags in chunk
- Supports @INLINE chunks
- No need to change snippets - works via `pdoTools::getChunk()` and `parseChunk()` automatically
- Compile errors logged

### Settings

![Settings](https://file.modx.pro/files/0/9/0/0902b411c53ef2417f09a03828820b69.png)

- **pdotools_fenom_default** - Fenom in all chunks. On by default.
- **pdotools_fenom_parser** - Fenom on pages (content, templates). Off by default.
- **pdotools_fenom_php** - arbitrary PHP in templates via `{$.php.function()}`. Dangerous, off.
- **pdotools_fenom_modx** - `{$modx}` and `{$pdoTools}` in Fenom. Turn off if managers untrusted.
- **pdotools_fenom_cache** - cache chunks via MODX cache. Use on production with large chunks.

### Fenom execution order

With pdoParser and **pdotools_fenom_parser** enabled, Fenom runs [here](https://github.com/modxcms/revolution/blob/6ab36a4742cde928e03a7ccf8d4e57190c70a08a/core/model/modx/modresponse.class.php#L83). At that moment chunks and snippets are processed; you can use Fenom for conditional snippet calls. Fenom on pages is not cached.

### Fenom chunk caching

Off by default. Enable **pdotools_fenom_cache** to store compiled templates in `/cache/default/fenom/`. DB chunks cached by id; INLINE by content hash. DB chunks update only on cache clear; INLINE get new hash on change. Use `&showLog=1` to check compile/cache timings.

### Examples

Standard chunk from Tickets component:

```modx
<div class="comments">
  [[+modx.user.id:isloggedin:is=`1`:then=`...`]]
  <h4 class="title">[[%comments]] (<span id="comment-total">[[+total]]</span>)</h4>
  ...
</div>
```

Same with Fenom:

```fenom
<div class="comments">
  {if $modx->user->isAuthenticated($modx->context->key)}
    ...
  {/if}
  <h4 class="title">{$modx->lexicon('comments')} (<span id="comment-total">{$total}</span>)</h4>
  ...
</div>
```
