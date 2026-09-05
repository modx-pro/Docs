# Custom snippet handling

Instead of FormIt you can set your own snippet in the `snippet` parameter. It receives the form fields and must return JSON with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `success` | `bool` | Success or error |
| `message` | `string` | Text for notifications and `[data-success]` / `[data-validation-error]` blocks |
| `data` | `object` | On error: field name → error text (for `[data-error]` and invalid classes) |

From **1.1.3**, the FetchIt object is **not** passed in `$scriptProperties` (PDO session serialization). Get the service yourself:

```php
<?php
/** @var modX $modx */
$FetchIt = $modx->getService(
    'fetchit',
    'FetchIt',
    MODX_CORE_PATH . 'components/fetchit/model/'
);

if (!$FetchIt) {
    return json_encode([
        'success' => false,
        'message' => 'FetchIt is not available',
        'data' => [],
    ], JSON_UNESCAPED_UNICODE);
}

$name = trim((string) ($_POST['name'] ?? ''));
if ($name === '') {
    return $FetchIt->error('Form errors', [
        'name' => 'Please enter your name',
    ]);
}

return $FetchIt->success('Validation passed');
```

`error()` / `success()` build the same JSON. You can return an array by hand with the same keys.

## Call

::: code-group

```modx
[[!FetchIt?
  &snippet=`MySnippet`
  &form=`tpl.FetchIt.example`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'MySnippet',
  'form' => 'tpl.FetchIt.example',
]}
```

:::

## What the snippet receives

`$scriptProperties` gets the stored FetchIt call parameters plus a `fields` key: an associative array of POST fields. The same values are in `$_POST`. Files are in `$_FILES`.

Do not put PHP objects in call parameters: they are dropped before writing to session or cache.

The form page context arrives as `pageId` in FormData.
