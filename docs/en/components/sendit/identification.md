# Identification

User identification and profile editing send data to the server. **SendIt** handles this. User handling uses **identification.class.php** via **Identification** hook (from ~~AjaxFormitLogin~~, deprecated). Basic flow works like **Login** component.

## Registration

Preset variants:

* **register** - basic, no moderation, no email confirmation, no auto-login.
* **register_with_moderate** - moderation, no email confirmation.
* **register_with_activation** - email confirmation required.
* **register_with_autologin** - auto-login after registration.

::: details Form

```html:line-numbers
<form data-si-form="regForm" data-si-preset="register">
  <label>
    <input type="text" name="fullname" placeholder="Full name">
    <p data-si-error="fullname"></p>
  </label>
  <label>
    <input type="email" name="email" placeholder="Email">
    <p data-si-error="email"></p>
  </label>
  <label>
    <input type="password" name="password" placeholder="Enter password">
    <p data-si-error="password"></p>
  </label>
  <label>
    <input type="password" name="password_confirm" placeholder="Confirm password">
    <p data-si-error="password_confirm"></p>
  </label>
  <label>
    <input type="checkbox" name="politics">
    I agree!
  </label>
  <button type="submit">Submit</button>
</form>
```

:::

::: details Preset

```php:line-numbers
'register' => [
  'method' => 'register',
  'hooks' => 'Identification',

  'validate' => 'email:required,password:checkPassLength=^8^,password_confirm:passwordConfirm=^password^,politics:checkbox:required',
  'politics.vTextRequired' => 'Accept our terms.',
  'password.vTextRequired' => 'Enter a password.',
  'password.vTextCheckPassLength' => 'Password must be at least 8 characters.',

  'fiarSubject' => 'Account activation',
  'fiarFrom' => 'email@domain.ru',
  'fiarTpl' => '@FILE chunks/emails/activateEmail.tpl',

  'usergroups' => 2,
  'usergroupsField' => '',
  'passwordField' => '',
  'usernameField' => 'email',
],
'register_with_moderate' => [
  'extends' => 'register',
  'successMessage' => 'Registered. Wait for moderation.',
  'moderate' => 1,
  'activation' => 0,
],
'register_with_autologin' => [
  'extends' => 'register',
  'successMessage' => 'Registered. Redirecting to dashboard.',
  'redirectTo' => 5,
  'redirectTimeout' => 3000,
  'moderate' => 0,
  'autoLogin' => 1,
  'rememberme' => 1,
  'authenticateContexts' => '',
],
'register_with_activation' => [
  'extends' => 'register_with_autologin',
  'hooks' => 'Identification,FormItAutoResponder',
  'successMessage' => 'Registered. Confirm email to activate.',
  'redirectTo' => 0,
  'activation' => 1,
  'activationResourceId' => 1,
  'activationUrlTime' => 10800,
  'afterLoginRedirectId' => 5,
],
```

:::

* `method`: method called in Identification hook.
* `usergroups`: comma-separated group ids.
* `usergroupsField`: group selection field name.
* `passwordField`: password field name.
* `usernameField`: username field name.
* `moderate`: 1 - requires moderation and manual unlock.
* `activation`: 1 - email link activation; 0 - auto-activate.
* `redirectTo`: resource id or URL.
* `redirectTimeout`: redirect delay (ms).
* `autoLogin`: 1 - auto-login after registration (if no moderation).
* `rememberme`: remember on device.
* `authenticateContexts`: comma-separated contexts.
* `activationResourceId`: resource with [ActivateUser](/en/components/sendit/snippets#activateuser).
* `activationUrlTime`: activation link lifetime (ms).
* `afterLoginRedirectId`: redirect after activation.
* Other params in [FormIt docs](https://docs.modx.com/current/en/extras/formit).

::: tip
If password empty - auto-generated and sent by email.
:::

## Login

::: details Form

```html:line-numbers
<form data-si-form="authForm" data-si-preset="auth">
  <input type="hidden" name="errorLogin">
  <label>
    <input type="email" name="email" placeholder="Email">
    <p data-si-error="email"></p>
  </label>
  <label>
    <input type="password" name="password" placeholder="Enter password">
    <p data-si-error="password"></p>
  </label>
  <button type="submit">Submit</button>
</form>
```

:::

::: details Preset

```php:line-numbers
'auth' => [
  'successMessage' => 'Logged in. Redirecting to dashboard.',
  'validate' => 'email:required,password:required',
  'hooks' => 'Identification',
  'method' => 'login',
  'redirectTo' => 5,
  'redirectTimeout' => 3000,
  'usernameField' => 'email',
  'email.vTextRequired' => 'Enter email.',
  'password.vTextRequired' => 'Enter password.',
  'errorFieldName' => 'errorLogin'
],
```

:::

* `errorFieldName` - hidden field for login error; if empty, error shows in notification.
::: warning
Add hidden field with name from `errorFieldName` manually.
:::

## Profile editing

::: details Form

```fenom:line-numbers
<form data-si-form="dataForm" data-si-preset="dataedit">
  <label>
    <input type="text" name="fullname" value="{$_modx->user.fullname}" placeholder="Full name">
    <p data-si-error="fullname"></p>
  </label>
  <label>
    <input type="email" name="email" value="{$_modx->user.email}" placeholder="Email">
    <p data-si-error="email"></p>
  </label>
  <label>
    <input type="tel" name="phone" value="{$_modx->user.phone}" placeholder="Phone">
    <p data-si-error="phone"></p>
  </label>
  <label>
    <input type="text" name="extended[inn]" value="{$_modx->user.extended['inn']}" placeholder="Tax ID">
    <p data-si-error="extended[inn]"></p>
  </label>
  <button type="submit">Save</button>
</form>
```

:::

::: details Preset

```php:line-numbers
'dataedit' => [
  'hooks' => 'Identification',
  'method' => 'update',
  'successMessage' => 'Data saved.',
  'clearFieldsOnSuccess' => 0,
  'validate' => 'email:required:email',
  'email.vTextRequired' => 'Enter email.'
],
```

:::

## Password change

::: details Form

```html:line-numbers
<form data-si-form="editPassForm" data-si-preset="editpass">
  <label>
    <input type="password" name="password" placeholder="Enter password">
    <p data-si-error="password"></p>
  </label>
  <label>
    <input type="password" name="password_confirm" placeholder="Confirm password">
    <p data-si-error="password_confirm"></p>
  </label>
  <button type="submit">Change</button>
</form>
```

:::

::: details Preset

```php:line-numbers
'editpass' => [
  'hooks' => 'Identification',
  'method' => 'update',
  'successMessage' => 'Password changed.',
  'validate' => 'password:required:minLength=^8^:regexp=^/\A[\da-zA-Z!#\?&]*$/^,password_confirm:password_confirm=^password^',
  'password.vTextRequired' => 'Enter a password.',
  'password.vTextRegexp' => 'Password: digits, latin letters and !,#,?,& only.',
  'password.vTextMinLength' => 'Password must be at least 8 characters.',
],
```

:::

## Logout

::: details Form

```html:line-numbers
<form data-si-form="logoutForm" data-si-preset="logout">
  <input type="hidden" name="errorLogout">
  <button type="submit">Logout</button>
</form>
```

:::

::: details Preset

```php:line-numbers
'logout' => [
  'hooks' => 'Identification',
  'method' => 'logout',
  'successMessage' => 'See you!',
  'redirectTo' => 1,
  'errorFieldName' => 'errorLogout'
],
```

:::

## Password reset

Since 2.0.0: reset requires email link confirmation (not just email/username).

Call **PasswordReset** snippet on page from **activationResourceId**.

* **afterLoginRedirectId** - redirect after password change.
* **autoLogin** - auto-login after reset.
* If neither set - returns user data or empty array.

::: details Form

```html:line-numbers
<form data-si-form="forgotForm" data-si-preset="forgot">
  <label>
    <input type="email" name="email" placeholder="Email">
    <p data-si-error="email"></p>
  </label>
  <button type="submit">Reset</button>
</form>
```

:::

::: details Preset

```php:line-numbers
'forgot' => [
  'hooks' => 'Identification,FormItSaveForm,FormItAutoResponder',
  'method' => 'forgot',
  'successMessage' => 'New password sent to your email',
  'usernameField' => 'email',
  'validate' => 'email:required:userNotExists',
  'fiarSubject' => 'Password recovery',
  'fiarFrom' => 'email@domain.ru',
  'fiarTpl' => '@FILE chunks/emails/resetPassEmail.tpl',
  'email.vTextRequired' => 'Enter email.',
  'email.vTextUserNotExists' => 'User not found',
  'rememberme' => 1,
  'authenticateContexts' => 'web',
  'afterLoginRedirectId' => 5,
  'autoLogin' => 1,
  'activationResourceId' => 1,
  'activationUrlTime' => 3600,
]
```

:::

## Validators

* [**requiredIf**](/en/components/sendit/snippets#requiredif)
* [**checkPassLength**](/en/components/sendit/snippets#checkpasslength)
* [**passwordConfirm**](/en/components/sendit/snippets#passwordconfirm)
* [**userNotExists**](/en/components/sendit/snippets#usernotexists)
