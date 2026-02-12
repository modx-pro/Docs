# Custom snippet

You can use your own snippet instead of **FormIt** to do whatever you need (e.g. create pages). The only requirement is that it must return a JSON object with these keys:

| Property | Description                                                                 |
|----------|-----------------------------------------------------------------------------|
| status   | 1 or 0 (success or error)                                                   |
| message  | Message about the snippet result; shown when status = 0                      |
| data     | Object mapping field names to error messages for invalid fields              |

For convenience, the snippet receives a `$FetchIt` parameter with the component class so you can call its `error` and `success` methods when returning a response.

Minimal custom snippet example:

```php
<?php
if (empty($_POST['name'])) {
  return $FetchIt->error('Form errors', [
    'name' => 'Please enter your name'
  ]);
}
else {
  return $FetchIt->success('Validation passed');
}
```

Call it like this:

:::code-group

```modx
[[!FetchIt?
  &snippet=`MySnippet`
  &form=`tpl.FetchIt.example`
]]
```

```fenom
{'!FetchIt' | snippet: [
  'snippet' => 'MySnippet',
  'form' => 'tpl.FetchIt.example',
]}
```

:::

This snippet only validates the name field and returns the result.
