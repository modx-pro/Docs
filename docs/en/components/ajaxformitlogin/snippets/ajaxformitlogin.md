# AjaxFormitLogin

Snippet for outputting the form.

## Parameters

| Parameter                 | Default                                                            | Description                                                                                                                                                                                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **form**                 | `aflExampleForm`                                                        | Form chunk                                                                                                                                                                                                                                                                           |
| **snippet**              | `FormIt`                                                                | Snippet that will process the form                                                                                                                                                                                                                                            |
| **hooks**                | `FormItSaveForm,email`                                                  | Hooks used to process the form.                                                                                                                                                                                                                                |
| **emailTo**              |                                                                         | Recipient email                                                                                                                                                                                                                                                                     |
| **emailFrom**            |                                                                         | Sender email. When using SMTP, specify the SMTP user email.                                                                                                                                                                                                   |
| **emailSubject**         |                                                                         | Email subject.                                                                                                                                                                                                                                                                         |
| **emailTpl**             | `aflExampleEmail`                                                       | Email chunk.                                                                                                                                                                                                                                                                         |
| **successMessage**       | `Form submitted successfully! A manager will contact you within 5 minutes.` | Success notification message.                                                                                                                                                                                                                                              |
| **clearFieldsOnSuccess** | `1`                                                                     | Whether JS should clear fields after form submission.                                                                                                                                                                                                                                   |
| **transmittedParams**    | `["success" => "", "error" => "aliases"]`                               | List of parameters to pass to JS.                                                                                                                                                                                                                                                 |
| **aliases**              | `email==Email`                                                          | List of field aliases for displaying validation error messages.                                                                                                                                                                                                                    |
| **validate**             | `email:required:email`                                                  | List of fields and their validators.                                                                                                                                                                                                                                                       |
| **showUploadProgress**   | `1`                                                                     | Whether JS should show file upload progress.                                                                                                                                                                                                                                  |
| **spamProtection**       | `1`                                                                     | Enables built-in spam protection.                                                                                                                                                                                                                                               |
| **redirectTimeout**      | `2000`                                                                  | Delay before redirect in milliseconds.                                                                                                                                                                                                                                       |
| **redirectTo**           |                                                                         | Redirect page ID or URL.                                                                                                                                                                                                                                    |
| **autoLogin**            |                                                                         | Whether to log the user in automatically after account registration.                                                                                                                                                                                                       |
| **passwordField**        | `password`                                                              | Name of the field containing the password.                                                                                                                                                                                                                                                         |
| **usernameField**        | `username`                                                              | Name of the field containing the username.                                                                                                                                                                                                                                               |
| **activation**           |                                                                         | Whether activation is required; if yes, an email with an activation link will be sent to the user.                                                                                                                                                                            |
| **moderate**             |                                                                         | Whether moderation is required. If yes, the user profile will be blocked until a moderator unblocks it.                                                                                                                                                                         |
| **activationResourceId** |                                                                         | ID of the resource to which the user will be sent to activate the account.                                                                                                                                                                                                          |
| **usergroupsField**      |                                                                         | Field with a comma-separated list of groups to add the user to on registration. You can also specify access level (Member or SuperUser) and rank: group_id:permission_id:rank, e.g. `2:1:0`. You may specify only the first two parameters or just the group ID. |
| **authenticateContexts** |                                                                         | Field with a comma-separated list of contexts in which to authenticate the user.                                                                                                                                                                                          |
| **rememberme**           |                                                                         | Whether to remember the user.                                                                                                                                                                                                                                                          |
| **activationUrlTime**    | `10800`                                                                 | Activation link validity time in seconds.                                                                                                                                                                                                                                       |
| **method**               |                                                                         | AjaxIdentification class method (register, login, logout, forgot, update).                                                                                                                                                                                                           |

::: tip
You can also use any [FormIt snippet parameters](https://docs.modx.com/current/ru/extras/formit).
:::

As shown in the table, the snippet is configured by default for form submission and saving data in the manager.

## Usage example

A minimal call should look like this:

```fenom
{'!AjaxFormitLogin' | snippet: [
  'emailTo' => 'name@domain.ru',
  'emailFrom' => 'noreply@domain.ru',
  'emailSubject' => 'Email subject',
]}
```

and must be called uncached. You can pass any data into the form chunk by specifying it as snippet parameters. You can also pass data to JS via the `transmittedParams` parameter.
An optimal call looks like this:

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' =>  'aflExampleForm',
  'snippet' => 'FormIt',
  'hooks' => 'FormItSaveForm,email',
  'emailTo' => 'shev.art.v@yandex.ru',
  'emailFrom' => 'noreply@art-sites.ru',
  'emailSubject' => 'Test form',
  'emailTpl' => 'aflExampleEmail',
  'successMessage' => 'Form submitted successfully! A manager will contact you within 5 minutes.',
  'clearFieldsOnSuccess' => 1,
  'transmittedParams' => ["success" => 'ym_goal', "error" => 'aliases'],
  'aliases' => 'email==Email,phone==Phone,name==Name,politics==Terms of service',
  'showUploadProgress' => 1,
  'spamProtection' => 1,
  'ym_goal' => 'TEST_GOAL',

  'validate' => 'email:required:email,name:required:minLength=^3^,phone:required,politics:minValue=^1^',
  'validationErrorMessage' => 'Please fix the errors!',
  'email.vTextRequired' => 'Specify email.',
  'fullname.vTextRequired' => 'Specify full name.',
  'fullname.vTextMinLength' => 'Full name is too short.',
  'secret.vTextContains' => 'You appear to be a bot. If not, please refresh the page.',
  'politics.vTextMinValue' => 'Please accept our terms.',
]}
```
