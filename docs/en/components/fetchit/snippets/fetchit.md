# FetchIt Snippet

This snippet submits a form using the **Fetch API** and runs the snippet specified in the `snippet` parameter by passing parameters to it. By default it calls the **FormIt** snippet, but you can use your own. It also loads the server response processing script on the frontend.

## Snippet properties

| **Property**             | Default value              |                                                                                      |
|--------------------------|----------------------------|--------------------------------------------------------------------------------------|
| **form**                 | `tpl.FetchIt.example`      | Chunk with the form to be processed                                                  |
| **snippet**              | `FormIt`                   | Runable snippet for form processing                                                  |
| **actionUrl**            | `[[+assetsUrl]]action.php` | The address of the connector to which the form is sent                               |
| **clearFieldsOnSuccess** | `1`                        | This parameter is responsible for clearing the form data after a successful response |

All other parameters you specify when calling **FetchIt** will be passed to the snippet specified in the `snippet` parameter.

## Example

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Email subject`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`This form has errors!`
  &successMessage=`The form has been submitted successfully`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Email subject',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'This form has errors!',
  'successMessage' => 'The form has been submitted successfully',
]}
```

:::
