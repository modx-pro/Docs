# Processing with your own snippet

You can use your own snippet, instead of **FormIt**, which will do anything (even create pages on the site). The only requirement is that it must return a JSON array with keys:

| Property | Description                                                                                        |
|----------|----------------------------------------------------------------------------------------------------|
| status   | `1` or `0`, i.e. success or error                                                                  |
| message  | snippet message, output if status = 0                                                              |
| data     | array for fields with errors, where the keys are the field name and the value is the error message |

For convenience, the `$FetchIt` variable with the component class is passed into the snippet parameters so that you can call the `error` and `success` methods from it when it produces a response.

The simplest example of your snippet:

```php
<?php
if (empty($_POST['name'])) {
  return $FetchIt->error('Errors in the form', [
    'name' => 'You didn\'t fill the name field'
  ]);
}
else {
  return $FetchIt->success('The form submitted successfully');
}
```

This is how we call it:

:::code-group

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

This snippet doesn't do anything, it just returns the result of the name check.
