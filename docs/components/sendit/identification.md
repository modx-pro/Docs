# Идентификация

Идентификация пользователя, как и редактирование его данных, также предполагает отправку данных на сервер. Вот это неожиданность!:upside_down_face: А значит **SendIt** 
справится и с этим. Есть, конечно, нюанс: непосредственно для работы с пользователем используется отдельный класс **identification.class.php**,
который подключается в хуке **Identification**, но он уже проверен в бою, так как взят из моего же компонента **~~AjaxFormitLogin~~** (устарел).
В базовом варианте идентификация пользователей работает аналогично компоненту **Login**.

## Регистрация
Ниже приведены варианты пресетов для организации регистрации на сайте.
* **register** - базовый пресет, без модерации, необходимости подтверждать почту и без автоматической авторизации.
* **register_with_moderate** - пресет с модерацией, но без необходимости подтверждать почту.
* **register_with_activation** - пресет с необходимостью подтверждать почту.
* **register_with_autologin** - пресет с автоматической авторизацией.

::: details Форма

```html:line-numbers
<form data-si-form="regForm" data-si-preset="register">
    <label>
        <input type="text" name="fullname" placeholder="Полное имя">
        <p data-si-error="fullname"></p>
    </label>
    <label>
        <input type="email" name="email" placeholder="Email">
        <p data-si-error="email"></p>
    </label>
    <label>
        <input type="password" name="password" placeholder="Введите пароль">
        <p data-si-error="password"></p>
    </label>   
    <label>
        <input type="password" name="password_confirm" placeholder="Подтврдите пароль">
        <p data-si-error="password_confirm"></p>
    </label>     
    <label>
        <input type="checkbox" name="politics">
        Я на всё согласен!
    </label>
    <button type="submit">Отправить</button>
</form>
```

:::
::: details Пресет

```php:line-numbers
'register' => [
    'method' => 'register',              
    'hooks' => 'Identification',
        
    'validate' => 'email:required,password:checkPassLength=^8^,password_confirm:passwordConfirm=^password^,politics:checkbox:required',
    'politics.vTextRequired' => 'Примите наши условия.',
    'password.vTextRequired' => 'Придумайте пароль.',
    'password.vTextCheckPassLength' => 'Пароль должен быть не менее 8 символов.',   

    'fiarSubject' => 'Активация пользователя',
    'fiarFrom' => 'email@domain.ru',
    'fiarTpl' => '@FILE chunks/emails/activateEmail.tpl',    
        
    'usergroups' => 2,
    'usergroupsField' => '',
    'passwordField' => '',
    'usernameField' => 'email',  
],
'register_with_moderate' => [
    'extends' => 'register',    
    'successMessage' => 'Вы успешно зарегистрированы. Дождидесь завершения модерации.',
    'moderate' => 1,
    'activation' => 0,      
], 
'register_with_autologin' => [
    'extends' => 'register',   
    'successMessage' => 'Вы успешно зарегистрированы и будете перенаправлены в личный кабинет.',
    'redirectTo' => 5,
    'redirectTimeout' => 3000 
    
    'moderate' => 0,
    'autoLogin' => 1,
    'rememberme' => 1,
    'authenticateContexts' => '',
]      
'register_with_activation' => [
    'extends' => 'register_with_autologin',
    'hooks' => 'Identification,FormItAutoResponder',
    'successMessage' => 'Вы успешно зарегистрированы. Подтвердите email для активации учётной записи.', 
    
    'redirectTo' => 0,    
      
    'activation' => 1,
    'activationResourceId' => 1,
    'activationUrlTime' => 10800,     
    'afterLoginRedirectId' => 5,          
],    
 
```
:::

* `method`: метод, который будет вызван в хуке *Identification*.
* `usergroups`: список групп, в которые нужно добавить пользователя, разделенных запятыми.
* `usergroupsField`: имя поля выбора группы.
* `passwordField`: имя поля ввода пароля.
* `usernameField`: имя поля ввода username.
* `moderate`: 1 - требуется модерация и ручная разблокировка пользователя.
* `activation`: 1 - требуется активация путем перехода по ссылке из письма, 0 - пользователь будет активирован сразу после регистрации.
* `redirectTo`: ID ресурса или ссылка на страницу для переадресации.
* `redirectTimeout`: задержка в милисекундах перед переадресацией.
* `autoLogin`: 1 - пользователь будет авторизован сразу после регистрации, при условии, что не требуется модерация.
* `rememberme`: позволяет запомнить авторизованного пользователя на данном устройстве.
* `authenticateContexts`: список дополнительных контекстов для авторизации, разделенных запятыми.
* `activationResourceId`: ID ресурса, где будет вызван сниппет [**ActivateUser**](https://docs.modx.pro/components/sendit/snippets#activateuser).
* `activationUrlTime`: время жизни ссылки для активации в милисекундах.
* `afterLoginRedirectId`: ID ресурса или ссылка на страницу для переадресации после успешной активации учётной записи.
* остальные параметры ищите в [документации компонента **FormIt**](https://docs.modx.com/current/ru/extras/formit).

::: tip
Если пароль не указан - он будет сгенерирован автоматически и отправлен на почту пользователю.
:::

## Авторизация

::: details Форма

```html:line-numbers
<form data-si-form="authForm" data-si-preset="auth">
    <input type="hidden" name="errorLogin">  // [!code warning]     
    <label>
        <input type="email" name="email" placeholder="Email">
        <p data-si-error="email"></p>
    </label>
    <label>
        <input type="password" name="password" placeholder="Введите пароль">
        <p data-si-error="password"></p>
    </label>     
    <button type="submit">Отправить</button>
</form>
```

:::
::: details Пресет

```php:line-numbers
    'auth' => [
        'successMessage' => 'Вы успешно авторизованы и будете перенаправлены в личный кабинет.',
        'validate' => 'email:required,password:required',
        'hooks' => 'AjaxIdentification',

        'method' => 'login',

        'redirectTo' => 5,
        'redirectTimeout' => 3000,
        'usernameField' => 'email',

        'email.vTextRequired' => 'Укажите email.',
        'password.vTextRequired' => 'Введите пароль.',
        'errorFieldName' => 'errorLogin' // [!code warning]
    ],
```

:::

* `errorFieldName` - в этом параметре необходимо указать имя скрытого поля, в которое будет записан текст ошибки авторизации, если оставить пустым ошибка будет показана во 
  вплывающем сообщении.
  ::: warning
  Скрытое поле с именем из параметра `errorFieldName` необходимо добавить самостоятельно.
  :::

## Редактирование профиля

::: details Форма

```html:line-numbers
<form data-si-form="dataForm" data-si-preset="dataedit">
    <label>
        <input type="text" name="fullname" value="{$_modx->user.fullname}" placeholder="ФИО">
        <p data-si-error="fullname"></p>
    </label>      
    <label>
        <input type="email" name="email" value="{$_modx->user.email}" placeholder="Email">
        <p data-si-error="email"></p>
    </label>
    <label>
        <input type="tel" name="phone" value="{$_modx->user.phone}" placeholder="Телефон">
        <p data-si-error="phone"></p>
    </label>      
    <label>
        <input type="text" name="extended[inn]" value="{$_modx->user.extended['inn']}" placeholder="ИНН">
        <p data-si-error="extended[inn]"></p>
    </label>     
    <button type="submit">Сохранить</button>
</form>
```

:::
::: details Пресет

```php:line-numbers
    'dataedit' => [
        'hooks' => 'AjaxIdentification',
        'method' => 'update',
        'successMessage' => 'Данные сохранены.',
        'clearFieldsOnSuccess' => 0,

        'validate' => 'email:required:email',
        'email.vTextRequired' => 'Укажите email.'
    ],
```

:::

## Смена пароля

::: details Форма

```html:line-numbers
<form data-si-form="editPassForm" data-si-preset="editpass">
    <label>
        <input type="password" name="password" placeholder="Введите пароль">
        <p data-si-error="password"></p>
    </label>   
    <label>
        <input type="password" name="password_confirm" placeholder="Подтврдите пароль">
        <p data-si-error="password_confirm"></p>
    </label>     
    <button type="submit">Изменить</button>
</form>
```

:::
::: details Пресет

```php:line-numbers
    'editpass' => [
        'hooks' => 'AjaxIdentification',
        'method' => 'update',
        'successMessage' => 'Пароль изменён.',

        'validate' => 'password:required:minLength=^8^:regexp=^/\A[\da-zA-Z!#\?&]*$/^,password_confirm:password_confirm=^password^',

        'password.vTextRequired' => 'Придумайте пароль.',
        'password.vTextRegexp' => 'Пароль может содержать только цифры, латинские буквы и символы !,#,?,&',
        'password.vTextMinLength' => 'Пароль должен быть не менее 8 символов.',
    ],
```

:::

## Выход из аккаунта

::: details Форма

```html:line-numbers
<form data-si-form="logoutForm" data-si-preset="logout">
    <input type="hidden" name="errorLogout">  // [!code warning]         
    <button type="submit">Выйти</button>
</form>
```

:::
::: details Пресет

```php:line-numbers
    'logout' => [
        'hooks' => 'AjaxIdentification',
        'method' => 'logout',
        'successMessage' => 'До новых встреч!',
        'redirectTo' => 1,
        'errorFieldName' => 'errorLogout' // [!code warning]
    ],
```

:::

## Сброс пароля

С версии 2.0.0 сбросить пароль просто зная email или username нельзя. Теперь для сброса пароля требуется подтвердить это действие, перейдя по ссылке из письма.

Для активации нового пароля следует вызвать сниппет **PasswordReset** на странице из параметра **activationResourceId**. 

Если указан параметр **afterLoginRedirectId** пользователь после подтверждения смены пароля будет переадресован на указанную страницу.

Если указан параметр **autoLogin** - пользователь будет авторизован автоматически.

Если ни один из параметров не указан - будет возвращен массив данных пользователя, если пароль активирован, или пустой массив в противном случае.

Комбинация этих параметров позволяет после восстановления пароля сразу авторизовать пользователя и отправить на любую страницу сайта.

::: details Форма

```html:line-numbers
<form data-si-form="forgotForm" data-si-preset="forgot">   
    <label>
        <input type="email" name="email" placeholder="Email">
        <p data-si-error="email"></p>
    </label>        
    <button type="submit">Сбросить</button>
</form>
```

:::
::: details Пресет

```php:line-numbers
    'forgot' => [
        'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
        'method' => 'forgot',
        'successMessage' => 'Новый пароль отправлен на ваш email',

        'usernameField' => 'email',
        'validate' => 'email:required:userNotExists',

        'fiarSubject' => 'Восстановление пароля',
        'fiarFrom' => 'email@domain.ru',
        'fiarTpl' => '@FILE chunks/emails/resetPassEmail.tpl',

        'email.vTextRequired' => 'Укажите email.',
        'email.vTextUserNotExists' => 'Пользователь не найден',        
                
        'rememberme' => 1, // [!code ++]
        'authenticateContexts' => 'web', // [!code ++]
        'afterLoginRedirectId' => 5, // [!code ++]
        'autoLogin' => 1, // [!code ++]

        'activationResourceId' => 1, // [!code ++]
        'activationUrlTime' => 3600, // [!code ++]
    ]
```

:::

## Валидаторы

* [**requiredIf**](https://docs.modx.pro/components/sendit/snippets#requiredif)
* [**checkPassLength**](https://docs.modx.pro/components/sendit/snippets#checkpasslength)
* [**passwordConfirm**](https://docs.modx.pro/components/sendit/snippets#passwordconfirm)
* [**userNotExists**](https://docs.modx.pro/components/sendit/snippets#usernotexists)
