# FetchIt snippet

This snippet submits the form via **Fetch API** and runs the snippet specified in the `snippet` parameter, passing it the form data. By default it calls **FormIt**, but you can use your own snippet. It also loads the front-end script that handles the server response.

## Snippet parameters

| **Parameter**           | Default                   | Description                                                                 |
|-------------------------|---------------------------|-----------------------------------------------------------------------------|
| **form**                | `tpl.FetchIt.example`      | Chunk containing the form to process                                       |
| **snippet**             | `FormIt`                  | Snippet to run for form processing                                         |
| **actionUrl**           | `[[+assetsUrl]]action.php`| URL of the connector that receives the form                                 |
| **clearFieldsOnSuccess**| `1`                       | Clear form fields after a successful response                               |

All other parameters you pass to **FetchIt** are forwarded to the snippet named in **snippet**.

## Example call

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Email subject`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`The form contains errors!`
  &successMessage=`Message sent successfully!`
]]
```

```fenom
{'!FetchIt' | snippet: [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Email subject',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'The form contains errors!',
  'successMessage' => 'Message sent successfully!',
]}
```

:::
