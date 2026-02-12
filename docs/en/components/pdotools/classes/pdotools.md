# pdoTools

Main component class inherited by others (except pdoParser, which extends modParser).

## Initialization

```php
$pdoTools = $modx->getService('pdoTools');
```

This always returns the original pdoTools. To use a custom class, set path in system settings and init like:

```php
$fqn = $modx->getOption('pdoTools.class', null, 'pdotools.pdotools', true);
if ($pdoClass = $modx->loadClass($fqn, '', false, true)) {
  $pdoTools = new $pdoClass($modx, $scriptProperties);
}
elseif ($pdoClass = $modx->loadClass($fqn, MODX_CORE_PATH . 'components/pdotools/model/', false, true)) {
  $pdoTools = new $pdoClass($modx, $scriptProperties);
}
else {
  $modx->log(modX::LOG_LEVEL_ERROR, 'Could not load pdoTools from "MODX_CORE_PATH/components/pdotools/model/".');
  return false;
}
$pdoTools->addTime('pdoTools loaded');
```

All pdoTools snippets use this pattern, so you can override behavior with your own class.

## Logging

- **addTime(string $message)** - add log entry
- **getTime(bool $string [true])** - add final time, return formatted string or array

Use `&showLog=1` in snippets to view log.

## Caching

- **setStore**(string $name, mixed $object, string $type ["data"]) - add to temp store
- **getStore**(string $name, string $type ["data"]) - get or null

Example: cache user lookups to avoid repeated DB calls. Data lives only for request; not written to disk.

MODX cache (persisted):

- **setCache**(mixed $data, array $options) - save to cache
- **getCache**(array $options) - retrieve from cache

## Utilities

- **makePlaceholders**(array $data, ...) - build placeholder arrays for templates
- **buildTree**(array $resources) - build resource tree; used by [pdoMenu](/en/components/pdotools/snippets/pdomenu)

## Chunk handling

Main method: **getChunk()**. [pdoParser](/en/components/pdotools/classes/pdoparser) processes placeholders. Chunk types:

- @**INLINE**, @**CODE** - chunk from string
- @**FILE** - chunk from file (html/tpl; path via **pdotools_elements_path**)
- @**TEMPLATE** - chunk from site template
- @**CHUNK** or plain name - chunk from DB

Simple conditions via "fast placeholders" - html comments like `<!--pdotools_tag value if tag not empty-->`. Use **&nestedChunkPrefix** to change prefix. **&fastMode** - skip modParser; leftover tags are stripped.

Since 2.0 pdoTools includes [Fenom](/en/components/pdotools/classes/pdoparser) for advanced logic in chunks.
