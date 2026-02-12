# AjaxIdentification

Hook for user flows: registration, login, password recovery, logout, and profile editing.

[[toc]]

## Usage examples

### User registration

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' =>  'aflRegisterForm',
  'snippet' => 'FormIt',
  'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
  'method' => 'register',
  'successMessage' => 'You have been registered. Confirm your email to activate your account.',
  'customValidators' => 'aflUserExists,aflCheckPassLength,aflPasswordConfirm',
  'formName' => 'Email registration',

  'fiarSubject' => 'User activation',
  'fiarFrom' => 'email@domain.ru',
  'fiarTpl' => 'aflActivateEmail',

  'activation' => 1,
  'autoLogin' => 0,
  'redirectId' => '',
  'authenticateContexts' => '',
  'passwordField' => '',
  'usernameField' => 'email',
  'usergroupsField' => '',
  'moderate' => '',
  'redirectTimeout' => 3000,
  'usergroups' => 2,
  'activationResourceId' => 1,
  'extendedFieldPrefix' => 'extended_',
  'activationUrlTime' => 10800,
  'validate' => 'email:required:aflUserExists,password:aflCheckPassLength=^8^,password_confirm:aflPasswordConfirm=^password^,politics:minValue=^1^',
  'validationErrorMessage' => 'Please fix the errors.',
  'spamProtection' => 1,

  'politics.vTextMinValue' => 'You must accept the terms.',
  'phone.vTextRequired' => 'Enter your phone number.',
  'password.vTextRequired' => 'Choose a password.',
  'password.vTextMinLength' => 'Password must be at least 8 characters.',
  'fullname.vTextRequired' => 'Enter your full name.',
  'fullname.vTextMinLength' => 'Full name is too short.',
  'username.vTextAflUserExists' => 'This phone number is already in use. Use another.',
  'secret.vTextContains' => 'You appear to be a bot. If not, refresh the page.',
]}
```

### User login

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' =>  'aflLoginForm',
  'snippet' => 'FormIt',
  'successMessage' => 'You have been logged in and will be redirected to your account.',
  'validate' => 'email:required,password:required',
  'validationErrorMessage' => 'Please fix the errors.',
  'hooks' => 'AjaxIdentification',

  'method' => 'login',

  'redirectTo' => 5,
  'redirectTimeout' => 3000,
  'usernameField' => 'email',
  'spamProtection' => 1,

  'email.vTextRequired' => 'Enter your email.',
  'password.vTextRequired' => 'Enter your password.',
  'secret.vTextContains' => 'You appear to be a bot. If not, refresh the page.',
]}
```

### Profile update

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' =>  'aflUpdateProfileForm',
  'snippet' => 'FormIt',
  'hooks' => 'AjaxIdentification',
  'method' => 'update',
  'successMessage' => 'Data saved.',
  'clearFieldsOnSuccess' => 0,

  'validate' => 'email:required:email',
  'validationErrorMessage' => 'Please fix the errors.',
  'email.vTextRequired' => 'Enter your email.',
]}
```

Updating the password separately from other fields avoids overwriting it on every save.

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' => 'aflUpdatePassForm',
  'snippet' => 'FormIt',
  'hooks' => 'AjaxIdentification',
  'method' => 'update',
  'successMessage' => 'Password changed.',

  'validate' => 'password:required:minLength=^8^:regexp=^/\A[\da-zA-Z!#\?&]*$/^,password_confirm:password_confirm=^password^',
  'validationErrorMessage' => 'Please fix the errors.',

  'password.vTextRequired' => 'Choose a password.',
  'password.vTextRegexp' => 'Password may only contain digits, Latin letters and !,#,?,&',
  'password.vTextMinLength' => 'Password must be at least 8 characters.',
]}
```

### Logout

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' =>  'aflLogoutForm',
  'snippet' => 'FormIt',
  'hooks' => 'AjaxIdentification',
  'method' => 'logout',
  'successMessage' => 'Goodbye!',
  'redirectTo' => 1,
  'validationErrorMessage' => '',
]}
```

### Password recovery

```fenom
{'!AjaxFormitLogin' | snippet: [
  'form' =>  'aflForgotForm',
  'snippet' => 'FormIt',
  'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
  'method' => 'forgot',
  'successMessage' => 'A new password has been sent to your email.',
  'customValidators' => 'aflUserNotExists',
  'formName' => 'Forgot password',
  'spamProtection' => 1,

  'usernameField' => 'email',
  'validate' => 'email:required:aflUserNotExists',
  'validationErrorMessage' => 'Please fix the errors.',

  'fiarSubject' => 'Password recovery',
  'fiarFrom' => 'email@domain.ru',
  'fiarTpl' => 'aflResetPassEmail',

  'email.vTextRequired' => 'Enter your email.',
  'email.vTextAflUserNotExists' => 'User not found.',
  'secret.vTextContains' => 'You appear to be a bot. If not, refresh the page.',
]}
```
