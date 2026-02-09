---
title: AjaxFormItLogin
description: Modern, feature-rich replacement for AjaxForm
author: shevartv
repository: https://github.com/ShevArtV/ajaxformitlogin

items: [
  { text: 'System settings', link: 'settings' },
  { text: 'Scripts and styles', link: 'scripts-and-styles' },
  { text: 'System events', link: 'events' },
  {
    text: 'Snippets',
    items: [
      { text: 'AjaxFormitLogin', link: 'snippets/ajaxformitlogin' },
      { text: 'aflActivateUser', link: 'snippets/aflactivateuser' },
      { text: 'Custom snippets', link: 'snippets/custom-snippets' },
    ],
  },
  {
    text: 'Hooks',
    items: [
      { text: 'AjaxIdentification', link: 'hooks/ajaxidentification' },
    ],
  },
  {
    text: 'Validators',
    items: [
      { text: 'aflCheckPassLength', link: 'validators/aflcheckpasslength' },
      { text: 'aflPasswordConfirm', link: 'validators/aflpasswordconfirm' },
      { text: 'aflRequiredIf', link: 'validators/aflrequiredif' },
      { text: 'aflUserExists', link: 'validators/afluserexists' },
      { text: 'aflUserNotExists', link: 'validators/aflusernotexists' },
    ],
  },
]
---

# AjaxFormItLogin

AjaxFormItLogin is a modern take on the AjaxForm component. It keeps all original features and adds more.

## Features {#traits}

1. No jQuery dependency.
2. Uses [IziToast](https://izitoast.marcelodolza.com/) for notifications.
3. `clearFieldsOnSuccess` — control whether form fields are cleared after a successful submit.
4. `transmittedParams` (valid JSON) — pass custom params to JS separately for success and error.
5. `showUploadProgress` (1) — show file upload progress.
6. Event `af_complete` is replaced by `afl_complete`.

    ```js
    document.addEventListener('afl_complete', e => {
      console.log(e.detail.response); // server response
      console.log(e.detail.form); // current form
    });
    ```

7. Server response format: `e.detail.response.data` includes `errors` (validation errors when form is not submitted), plus any params you pass via `transmittedParams`. Pass either JSON or an object with keys `success` and/or `error` (comma-separated snippet param names to pass to JS). On success, response also includes `e.detail.response.data.redirectTimeout` and `e.detail.response.data.redirectUrl`.
8. Redirects: set snippet param `redirectTo` (URL or resource ID) and optionally `redirectTimeout` (ms, default 2000).
9. Checkbox validation: add `data-afl-required` (value = key from `validate`) to the checkbox and a hidden field with that name in the form. The checkbox itself can be unnamed.
10. No Google reCAPTCHA; built-in spam protection by [Alexey Smirnov](https://modx.pro/users/alexij). Set `spamProtection` to 1 in the snippet call. On by default.
11. Registration, login, password reset, and profile editing when FormIt is installed. See [this note](https://modx.pro/solutions/22936) for supported params.
12. On user profile update, system event aiOnUserUpdate fires with $user (updated user), $profile (profile), $data (submitted data).
13. Yandex.Metrika goals: set system setting `afl_metrics` to Yes and `afl_counter_id` to your counter ID, add the counter code to the site, and in the snippet call set `ym_goal` (JS goal name) and `transmittedParams` to `['success' => 'ym_goal']`.
14. You can still use your own snippets for form handling; only the API object and response format changed. Example snippet `MySnippet` that checks field `name`:

```php
<?php
if (empty($_POST['name'])) {
  return $AjaxFormItLogin->error('Form errors', array(
    'errors' => array(
      'name' => 'Please enter your name.'
    )
  ));
}
else {
  return $AjaxFormItLogin->success('Form validated.', array('name' => 'Name is valid.'));
}
```

Call example:

```fenom
{'!AjaxFormItLogin' | snippet: [
  'snippet' => 'MySnippet',
  'tpl' => 'myTpl',
]}
```

## Quick start {#qstart}

1. Install AjaxFormItLogin from <https://modstore.pro>. FormIt will be installed automatically if missing.
2. Copy everything between `<form></form>` (including the tags) into a chunk. Remember the chunk name.
3. Replace the form on the page (not in the chunk) with one of these calls:

    :::code-group

    ```modx
    [[!AjaxFormitLogin?
      &form=`aflExampleForm`
      &emailTo=`name@domain.ru`
      &emailFrom=`noreply@domain.ru`
      &emailSubject=`Email subject`
      &emailTpl=`aflExampleEmail`
      &validate=`email:required:email,name:required:minLength=^3^,phone:required,politics:minValue=^1^`
    ]]
    ```

    ```fenom
    {'!AjaxFormItLogin' | snippet: [
      'form' => 'aflExampleForm', 'hooks' => 'FormItSaveForm,email',
      'emailTo' => 'recipient@example.com',
      'emailFrom' => 'noreply@example.com',
      'emailSubject' => 'Email subject',
      'emailTpl' => 'aflExampleEmail',
      'validate' => 'email:required:email,name:required:minLength=^3^,phone:required,politics:minValue=^1^',
    ]}
    ```

    :::

    ::: tip
    For email params, hooks, and validation see [FormIt](https://docs.modx.com/current/ru/extras/formit) documentation; AjaxFormItLogin supports all FormIt params.
    :::

    Example form:

    ```html
    <form id="aflExampleForm">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="text" class="form-control" name="name" placeholder="John Doe">
        <small class="text-danger d-block error_name"></small>
      </div>
      <div class="mb-3">
        <label class="form-label">Phone</label>
        <input type="tel" name="phone" class="form-control" placeholder="+7(999)123-45-67">
        <small class="text-danger d-block error_phone"></small>
      </div>
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input type="email" name="email" class="form-control" placeholder="name@mail.ru">
        <small class="text-danger d-block error_email"></small>
      </div>
      <div class="mb-3 form-check">
        <input type="hidden" name="politics" value="0">
        <input type="checkbox" class="form-check-input" id="politics" data-afl-required="politics">
        <label class="form-check-label" for="politics">I accept the site <a href="#" target="_blank">terms of use</a>.</label>
        <small class="text-danger d-block error_politics"></small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
      <button type="reset" class="btn btn-secondary">Reset</button>
    </form>
    ```

    ::: danger
    You do not have to add `error_fieldname` blocks for validation errors; if you omit them, errors show as a toast in the format `fieldname: message`. To show custom labels instead of field names, set snippet params `aliases` (e.g. `fieldname==Display text`) and `transmittedParams` to `['error' => 'aliases']`.
    :::

    Checkbox validation block:

    ```html
    <input type="hidden" name="politics" value="0">
    <input type="checkbox" class="form-check-input" id="politics" data-afl-required="politics">
    ```

    The checkbox must be checked; in `validate` we require `politics` to be greater than 0.

4. Create an email chunk (e.g. aflExampleEmail). Example:

    :::code-group

    ```modx
    [[+name:isnot=``:then=`<p>Name: [[+name]]</p>`]]
    [[+phone:isnot=``:then=`<p>Phone: [[+phone]]</p>`]]
    [[+email:isnot=``:then=`<p>Email: [[+email]]</p>`]]
    ```

    ```fenom
    {$name ? '<p>Name: ' ~ $name ~ '</p>' : ''}
    {$phone ? '<p>Phone: ' ~ $phone ~ '</p>' : ''}
    {$email ? '<p>Email: ' ~ $email ~ '</p>' : ''}
    ```

    :::

::: danger
The example uses database chunks; the component also supports file chunks. Using file chunks with pdoTools parser is recommended. Your form will then save data in the manager and send email.
:::

Example calls and chunks are in `core/components/ajaxformitlogin/elements/templates/` and `public_html/core/components/ajaxformitlogin/elements/chunks/`.
