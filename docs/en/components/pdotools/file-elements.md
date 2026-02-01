# File elements

pdoTools can load and use elements from files, using methods `getChunk` and `runSnippet` with the `@FILE` binding.

You can do this via API:

```php
if ($pdoTools = $modx->getService('pdoTools')) {
  $chunk = $pdoTools->getChunk('@FILE chunks/my_chunk.tpl', array('placeholder' => 'value'));

  $snippet = $pdoTools->runSnippet('@FILE snippets/my_snippet.php', array('param' => 'value'));
}
```

All elements are loaded from the directory specified in system setting **pdotools_elements_path**.

You can specify an arbitrary directory directly when calling the method:

```php
$chunk = $pdoTools->getChunk('@FILE chunks/my_chunk.tpl', array(
  'placeholder' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
));
```

Element loading is only allowed from files with extension `.tpl`, `.html` and `.php`.

## Working with Fenom

To load chunks and snippets in Fenom you can use this syntax for chunks:

```fenom
{$_modx->getChunk('@FILE chunks/my_chunk.tpl', [
  'placeholder' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
])}

// or

{'@FILE chunks/my_chunk.tpl' | chunk : [
  'placeholder' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
]}
```

and for snippets:

```fenom
{$_modx->runSnippet('@FILE snippets/my_snippet.php', [
  'param' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
])}

// or

{'@FILE snippets/my_snippet.php' | snippet: [
  'param' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
]}
```

### Caching

File-based snippets are not cached, but you can enable caching of compiled Fenom templates using setting **pdotools_fenom_cache**.

When this setting is enabled, all compiled chunks loaded via `@FILE` will be saved in MODX cache.
By default, this is directory `MODX_CORE_PATH . 'cache/default/pdotools'`.
When clearing the site cache, this directory is also cleared.

Note that the procedure of caching chunks via the `@FILE` binding in MODX is somewhat redundant, since Fenom is designed to work with file-based templates.
To fully use this advantage (and Fenom's native file cache) you need to load elements via the `file` source and Fenom syntax.

Simple template loading:

```fenom
{include 'file:chunks/my_chunk.tpl'}
```

Template extension:

```fenom
{extends 'file:chunks/my_chunk.tpl'}

{block 'myblock'}
  Hello world!
{/block}
```

There is also the `template` source, which creates chunks from system `modTemplate` objects:

```fenom
{include 'template:MyTemplate'}

// or by id

{include 'template:1'}
```

If no source is specified, a regular chunk from the database is loaded:

```fenom
{include 'myChunk'}

// or by id

{include '10'}
```

Caching is disabled by default.

You can also cache only files without caching regular chunks from the database.
To do this, disable pdotools_fenom_cache and pass parameters directly to Fenom via setting **pdotools_fenom_options**:

```json
{
  "force_compile": false,
  "disable_cache": false,
  "force_include": false,
  "auto_reload": true
}
```

All Fenom parameters can be found [in its documentation](https://github.com/fenom-template/fenom/blob/master/docs/ru/configuration.md).

### Examples

How can you move site layout into files using pdoTools and Fenom?

For full functionality you need to enable system setting **pdotools_fenom_parser**.

#### Templates

Create the needed number of templates in the system and assign them to resources. In the templates themselves write simply:

```fenom
{include 'file:templates/my_template1.tpl'}
```

After that your template will load from disk and update without cache clearing.

Unfortunately, you cannot fully avoid creating templates in the database, even with a single line, since they are assigned to resources by `id`.

#### Chunks

Chunks are much easier to use. They can be freely called and extended from anywhere.

For example, we can write in our template `templates/my_template1.tpl`:

```fenom
{include 'file:chunks/head.tpl'}
{include 'file:chunks/body.tpl'}
{include 'file:chunks/footer.tpl'}
```

and the entire template will be loaded from these file-based chunks.

#### Snippets

The same with snippets. Nothing besides files needs to be created. Since this is PHP code, use pdoTools method:

```fenom
{$_modx->runSnippet('@FILE snippets/my_snippet.php')}
```

When returning data from a snippet use `return`;

#### Plugins

Plugins, like templates, need to be created in the database first, to **assign them events** they will react to.

After that, simply call your file-based snippet from this plugin via API:

```php
<?php

if ($pdoTools = $modx->getService('pdoTools')) {
  $pdoTools->runSnippet('@FILE plugins/my_plugin.php', $scriptProperties);
}

```

It will check and handle events. For example:

```php
<?php

switch ($modx->event->name) {
  case 'OnLoadWebDocument':
    echo '<pre>'; print_r($modx->resource->toArray()); die;
    break;
}
```

*This plugin needs to be assigned event **OnLoadWebDocument**.*

### Conclusion

Thus you can move your templates, chunks, plugins and snippets into files.

This allows connecting a version control system and developing the site more conveniently from your favorite editor.
