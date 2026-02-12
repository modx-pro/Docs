# Custom snippets

## Writing your own snippets for AjaxFormitLogin

As with `AjaxForm`, you can use any snippets for form processing, including your own. In custom snippets the `AjaxFormitLogin` object is available to return success or error messages. For example:

```php
<?php
if ((int)$_POST['age'] > 18) {
  return $AjaxFormitLogin->success('Adult', array('age' => (int)$_POST['age']));
} else {
  return $AjaxFormitLogin->error('Minor', array('errors' => ['age' => 'Your age is too low.']));
}
```

You can return any data from your snippet, but for the standard error display to work, the response must include an `errors` array of field name to error message pairs.
