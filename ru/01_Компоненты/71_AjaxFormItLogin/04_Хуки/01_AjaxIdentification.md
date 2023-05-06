# AjaxIdentification

Хук использующийся для работы с пользователями: регистрации, авторизации, восстановления доступа, выхода из аккаунта, редактирования личных данных.

## Примеры использования

### Регистрация пользователя

```html
    {'!AjaxFormitLogin' | snippet : [
'form' =>  'aflRegisterForm',
'snippet' => 'FormIt',
'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
'method' => 'register',
'successMessage' => 'Вы успешно зарегистрированы. Подтвердите email для активации учётной записи.',
'customValidators' => 'aflCheckPassLength,aflPasswordConfirm',
'formName' => 'Регистрация по email',

'fiarSubject' => 'Активация пользователя',
'fiarFrom' => 'email@domain.ru',
'fiarTpl' => 'aflActivateEmail',

'activation' => 1,
'autoLogin' => 0,
'redirectTo' => '',
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
'validate' => 'email:required:email,password:aflCheckPassLength=^8^,password_confirm:aflPasswordConfirm=^password^,politics:minValue=^1^',
'validationErrorMessage' => 'Исправьте, пожалуйста, ошибки!',
'spamProtection' => 1,

'politics.vTextMinValue' => 'Примите наши условия.',
'phone.vTextRequired' => 'Укажите телефон.',
'password.vTextRequired' => 'Придумайте пароль.',
'password.vTextMinLength' => 'Пароль должен быть не менее 8 символов.',
'fullname.vTextRequired' => 'Укажите ФИО.',
'fullname.vTextMinLength' => 'Слишком короткое ФИО.',
'username.vTextAflUserExists' => 'Этот телефон уже используется. Укажите другой номер.',
'secret.vTextContains' => 'Кажется Вы робот. Если это не так, обновите страницу.'
]}
```

### Авторизация пользователя

```html
    {'!AjaxFormitLogin' | snippet : [
'form' =>  'aflLoginForm',
'snippet' => 'FormIt',
'successMessage' => 'Вы успешно авторизованы и будете перенаправлены в личный кабинет.',
'validate' => 'email:required,password:required',
'validationErrorMessage' => 'Исправьте, пожалуйста, ошибки!',
'hooks' => 'AjaxIdentification',

'method' => 'login',

'redirectTo' => 5,
'redirectTimeout' => 3000,
'usernameField' => 'email',
'spamProtection' => 1,

'email.vTextRequired' => 'Укажите email.',
'password.vTextRequired' => 'Введите пароль.',
'secret.vTextContains' => 'Кажется Вы робот. Если это не так, обновите страницу.'
]}
```

### Редактирование данных пользователя

```html
            {'!AjaxFormitLogin' | snippet : [
'form' =>  'aflUpdateProfileForm',
'snippet' => 'FormIt',
'hooks' => 'AjaxIdentification',
'method' => 'update',
'successMessage' => 'Данные сохранены.',
'clearFieldsOnSuccess' => 0,

'validate' => 'email:required:email',
'validationErrorMessage' => 'Исправьте, пожалуйста, ошибки!',
'email.vTextRequired' => 'Укажите email.'
]}
```

Пароль удобнее всего обновлять отдельно от остальных жанных, чтобы он постоянно не перезаписывался.

```html
 {'!AjaxFormitLogin' | snippet : [
'form' => 'aflUpdatePassForm',
'snippet' => 'FormIt',
'hooks' => 'AjaxIdentification',
'method' => 'update',
'successMessage' => 'Пароль изменён.',

'validate' => 'password:required:minLength=^8^:regexp=^/\A[\da-zA-Z!#\?&]*$/^,password_confirm:password_confirm=^password^',
'validationErrorMessage' => 'Исправьте, пожалуйста, ошибки!',

'password.vTextRequired' => 'Придумайте пароль.',
'password.vTextRegexp' => 'Пароль может содержать только цифры, латинские буквы и символы !,#,?,&',
'password.vTextMinLength' => 'Пароль должен быть не менее 8 символов.',
]}
```

### Выход из аккаунта пользователя

```html
{'!AjaxFormitLogin' | snippet : [
'form' =>  'aflLogoutForm',
'snippet' => 'FormIt',
'hooks' => 'AjaxIdentification',
'method' => 'logout',
'successMessage' => 'До новых встреч!',
'redirectTo' => 1,
'validationErrorMessage' => ''
]}
```

### Восстановление пароля пользователя

```html
{'!AjaxFormitLogin' | snippet : [
'form' =>  'aflForgotForm',
'snippet' => 'FormIt',
'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
'method' => 'forgot',
'successMessage' => 'Новый пароль отправлен на ваш email',
'customValidators' => 'aflUserNotExists',
'formName' => 'Забыли пароль',
'spamProtection' => 1,

'usernameField' => 'email',
'validate' => 'email:required:aflUserNotExists',
'validationErrorMessage' => 'Исправьте, пожалуйста, ошибки!',

'fiarSubject' => 'Восстановление пароля',
'fiarFrom' => 'email@domain.ru',
'fiarTpl' => 'aflResetPassEmail',

'email.vTextRequired' => 'Укажите email.',
'email.vTextUserNotExists' => 'Пользователь не найден',
'secret.vTextContains' => 'Кажется Вы робот. Если это не так, обновите страницу.'
]}
```
