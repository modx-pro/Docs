# pdoTools

Main class of the component; all other classes inherit from it (except pdoParser, which extends modParser).

## Initialization

Simple initialization:

```php
$pdoTools = $modx->getService('pdoTools');
```

This always returns the original pdoTools.

To use a custom or extended class, set its path in system settings and initialize like this:

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

This pattern is used in all pdoTools snippets, so you can replace their behavior with your own pdoTools class.

## Logging

pdoTools can log what it does. Methods:

- **addTime(string $message)** — add a new log entry
- **getTime(bool $string [true])** — add final time and return either a formatted string (default) or an array of time => message

Example:

```php
$pdo = $modx->getService('pdoTools');
$pdo->addTime('pdoTools initialized');
print_r($pdo->getTime());
```

Output:

```
0.0000150: pdoTools initialized
0.0000272: Total time
1 572 864: Memory usage
```

So you can use pdoTools in your own snippets just for logging. The built-in snippets write to the log too; the manager can read it with **&showLog=`1`**.

## Caching

pdoTools can cache arbitrary data for the request. You can use this too.

- **setStore**(string $name, mixed $object, string $type ["data"]) — add data to the temporary store.
- **getStore**(string $name, string $type ["data"]) — get data or null.

Example: cache user names during the snippet so you don't query every time. Check cache first; if missing, load and store:

```php
foreach ($users as $id) {
  $user = $pdo->getStore($id, 'user');
  if ($user === null) {
    if (!$user = $modx->getObject('modUser', $id)) {
      $user = false;
    }
    $pdo->setStore($id, $user, 'user');
  }
  elseif ($user === false) {
    echo 'User not found: id = ' . $id;
  }
  else {
    echo $user->get('username');
  }
}
```

Here we use namespace `user` so we don't clash with other snippets. The cache can return `null` (not loaded yet) or `false` (not found). In any case, only one DB query per user.

pdoTools uses this for chunk calls. Data is kept only for the request; it is not written to disk.

For persistent cache, use MODX-style methods:

- **setCache**(mixed $data, array $options) — save `$data` to cache; key is built from `$options`
- **getCache**(array $options) — get data by `$options`

Cache is written to disk; you can pass cache time in the options array:

```php
$pdo = $modx->getService('pdoTools');
$options = array(
  'user' => $modx->user->get('id'),
  'page' => @$_REQUEST['page'],
  'cacheTime' => 10,
);
$pdo->addTime('pdoTools loaded');
if (!$data = $pdo->getCache($options)) {
  $pdo->addTime('Cache miss, generating data');
  $data = array();
  for ($i = 1; $i <= 100000; $i++) {
    $data[] = rand();
  }
  $data = md5(implode($data));
  $pdo->setCache($data, $options);
  $pdo->addTime('Data saved to cache');
}
else {
  $pdo->addTime('Data loaded from cache');
}
print_r($data);
```

So different user and page get different cached data.

First run may show:

```
0.0000281: pdoTools loaded
0.0004001: No cached data for key "default/e713939a1827e7934ff0242361c06b4b10c53d97"
0.0000079: Cache miss, generating data
0.0581820: Saved data to cache "default/e713939a1827e7934ff0242361c06b4b10c53d97"
0.0000181: Data saved to cache
0.0586412: Total time
1 835 008: Memory usage
```

Later:

```
0.0000310: pdoTools loaded
0.0007479: Retrieved data from cache "default/e713939a1827e7934ff0242361c06b4b10c53d97"
0.0000081: Data loaded from cache
0.0007918: Total time
1 572 864: Memory usage
```

pdoTools logs cache operations, so you don't have to.

## Utilities

Two methods.

**makePlaceholders**(array $data, string $plPrefix, string $prefix ['[[+'], string $suffix [']]'], bool $uncacheable [true])

Takes key => value array and returns two arrays (placeholders => values) for templating. First param is the data array; then you can set prefix for placeholders, opening/closing delimiters, and disable uncacheable placeholder generation.

```php
$data = array(
  'key1' => 'value1',
  'key2' => 'value2',
);

$pls = $pdo->makePlaceholders($data);
print_r($pls);
```

Result:

```php
Array
(
  [pl] => Array
    (
      [key1] => [[+key1]]
      [!key1] => [[!+key1]]
      [key2] => [[+key2]]
      [!key2] => [[!+key2]]
    )

  [vl] => Array
    (
      [key1] => value1
      [!key1] => value1
      [key2] => value2
      [!key2] => value2
    )
)
```

Then process HTML:

```php
$html = str_replace($pls['pl'], $pls['vl'], $html);
```

- **buildTree**(array $resources) — build a tree from a flat resource array; used by [pdoMenu][1].

```php
$pdo = $modx->getService('pdoFetch');
$resources = $pdo->getCollection('modResource');
$tree = $pdo->buildTree($resources);
print_r($tree);
```

You get the site resource tree. Note: **getCollection()** requires [pdoFetch][2].

## Chunk handling (templating)

The main method is **getChunk()**; the implementation is tuned for speed and features.

[pdoParser][3] processes all placeholders it can. One rule: the placeholder must have no conditions or filters. So:

- `[[%tag]]` — lexicon string
- `[[~id]]` — link
- `[[+tag]]` — normal placeholders
- `[[++tag]]` — system placeholders
- `[[*tag]]` — resource placeholders

getChunk also supports chunk types:

- @**INLINE**, @**CODE** — chunk from string
- @**FILE** — chunk from file. For security, only .html and .tpl are allowed; directory is set by **pdotools_elements_path**
- @**TEMPLATE** — chunk from site template (by id or name)
- @**CHUNK** or plain string (no @) — chunk from DB

Example:

```php
$tpl = '@INLINE <p>[[+param]] - [[+value]]</p>';
$res = '';
for ($i = 1; $i <= 10000; $i++) {
  $pls = array('param' => $i, 'value' => rand());
  $res .= $pdo->getChunk($tpl, $pls);
}
print_r($pdo->getTime());
print_r($res);
```

That’s 10,000 rows in about **0.17** seconds. Same speed for a normal chunk. With `$modx->getChunk()` it’s about **8** seconds — so in this example MODX is roughly **3000** times slower. So keep chunks simple, avoid conditions where possible, and use pdoTools.

For simple “empty / not empty” you can use “fast placeholders”:

1. Chunk has a tag, e.g. `[[+tag]]`.
2. Chunk has an HTML comment:

```
<!--pdotools_tag value when tag is not empty-->
<!--pdotools_!tag value when tag is empty (since 1.9.3)-->
```

The comment name is prefix + tag name. Prefix is set by **&nestedChunkPrefix**.

Why put the value in a comment? So the chunk still works if processed by something other than pdoTools.

Example:

```php
$tpl = '@INLINE
  <p>[[+tag]]</p>
  <!--pdotools_tag [[+tag]] - value when tag not empty-->
  <!--pdotools_!tag value when tag is empty (since 1.9.3)-->
';

$pls = array('tag' => 1);
echo $pdo->getChunk($tpl, $pls);

$pls = array('tag' => 0);
echo $pdo->getChunk($tpl, $pls);
```

Output:

```
1 - value when tag not empty

value when tag is empty (since 1.9.3)
```

You can put other placeholders or the tag value inside the fast placeholder. Less powerful than MODX filters, but much faster.

**&fastMode** — do not pass placeholders to the native MODX parser; whatever pdoParser doesn’t handle is stripped. In recent pdoTools versions it’s rarely needed: if pdoParser handled everything and no `[[+tag]]` remains, the result is returned without calling modParser. You can turn it on to force simpler chunks (no complex MODX constructs).

Since 2.0 pdoTools includes the [Fenom][4] template engine, so you can avoid MODX tags and use more logic in chunks. See [pdoParser][3] for Fenom.

[1]: /en/components/pdotools/snippets/pdomenu
[2]: /en/components/pdotools/classes/pdofetch
[3]: /en/components/pdotools/classes/pdoparser
[4]: https://github.com/fenom-template/fenom/tree/master/docs/ru#readme
