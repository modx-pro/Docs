# Простые формы

## Пример формы

```html:line-numbers
<form data-si-form="oneStepForm" data-si-preset="onestepform"> // [!code warning]
    <label>
        <input type="text" name="name" placeholder="Полное имя">
        <p data-si-error="name"></p> // [!code warning]
    </label>
    <label>
        <input type="text" name="email" placeholder="Email">
        <p data-si-error="email"></p>
    </label>
    <label>
        <input type="tel" name="phone" placeholder="+7(">
        <p data-si-error="phone"></p>
    </label>
    <label for="politics">
        <input type="checkbox" name="politics" id="politics">
        Я на всё согласен!
    </label>    
    <button type="submit">Отправить</button>
</form>
```

### Описание атрибутов

* **data-si-preset** - содержит название набора параметров(необязательный).
* **data-si-form** - содержит название формы; сам атрибут нужен, чтобы комопнент мог работать с этой формой;
  значение атрибута позволяет [сохранять введённые данные](https://docs.modx.pro/components/sendit/saveformdata)
  и [редактировать параметры из админки](https://docs.modx.pro/components/sendit/development).
* **data-si-error** - содержит имя валидируемого поля, указывает на элемент, в котором будет показан текст ошибки(необязательный); если не указан
  ошибка будет выведена при помощи [всплывающих уведомлений](https://docs.modx.pro/components/sendit/notify).

## Пресеты

Путь к файлу с пресетами указан в системной настройке **si_path_to_presets**. Путь следует указывать относительно **base_path** (**MODX_BASE_PATH**).
Это подключаемый PHP файл, который должен возвращать массив вот такого формата:

```php:line-numbers
return [
    'default' => [ // [!code warning]
        'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
    ]
]
```

::: info
Подсвеченная строка (№2) содержит ключ пресета, который следует указывать в атрибуте **data-si-preset**.
:::
Компонент поддерживает все параметры доступные для **FormIt**. Полный список представлен в [документации](https://docs.modx.com/current/ru/extras/formit).
Кроме того, вы можете добавлять произвольные параметры. Параметры можно наследовать.

```php:line-numbers
return [
    'default' => [ // [!code warning]
        'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
        'successMessage' => 'Мы всё послали!', // [!code --]
    ],
    'onestepform' => [
        'extends' => 'default', // [!code warning]
        'redirectTo' => 0,
        'redirectTimeout' => 3000,
        'clearFieldsOnSuccess' => 1,
        'fieldNames' => 'age==Возраст',
        'successMessage' => 'Форма отправлена!', // [!code ++]
    ],    
]
```

В примере видно, пресет **onestepform** имеет параметр `extends`, это означает, что к пресету будут добавлены параметры из пресета **default**.
Если в обоих наборах есть одинаковые ключи, приоритет будет у значений из **onestepform**, т.е. в случае успешной отправки пользователь увидит сообщение
**_Форма отправлена!_**.  
::: warning
Наследование рекурсивное, другими словами, если пресет **default** наследует пресет **third**,
параметры пресета **third** будут добавлены кк набору **onestepform**
:::

Если вы используете кастомные валидаторы, то нет необходимости вручную добавлять параметр `customValidators`,
т.к. он будет добавлен автоматически из данных в параметре `validate`.
::: warning
Валидатор **checkbox** не имеет реализации в виде сниппета и создавать его не нужно. Задача этого валидатора указать на то, что поле с именем *politics*
это **input[type="checkbox"]**.  
Таким образом комбинация **:checkbox:required** позволяет сделать поле **politics** обязательным.
:::
Никакие дополнительые манипуляции для валидации чекбоксов выполнять не требуется, т.е. добавлять скрытые поля и заполнять их средствами JS не нужно.

## Отправка на событие "change"

Как реализовать регистрацию с подтверждением номера телефона по смс? Сначала рассмотрим общий алгоритм:

1. Дожидаемся ввода номера.
2. Проверяем его валидность.
3. Отправляем проверочный код.
4. Дожидаемся ввода кода.
5. Отправляем данные для регистрации.

**БЕЗ SendIt** нужно повесить обработчик события *"change"* на поле ввода номера телефона. Написать функцию отправки данных на сервер.
На сервере создать приёмник этих данных, валидатор телефона и обработчик, который отправит код.
Потом нужно получить ответ сервера и показать ошибки, если есть. Ну а уже заполненные данные отправит условный *AjaxForm*.

**C SendIt** просто добавьте полю ввода телефона атрибуты **data-si-event="change"** и **data-si-preset="sendcode"**

```html:line-numbers
<form data-si-form="regForm" data-si-preset="register">
    <label>
        <input type="text" name="fullname" placeholder="Полное имя">
        <p data-si-error="fullname"></p>
    </label>
    <label>
        <input type="tel" name="phone" placeholder="Телефон" data-si-event="change" data-si-preset="sendcode"> // [!code warning]
        <p data-si-error="phone"></p>
    </label>
    <label>
        <input type="tel" name="code" placeholder="Код">
        <p data-si-error="code"></p>
    </label>
    <label>
        <input type="checkbox" name="politics">
        Я на всё согласен!
    </label>
    <button type="submit">Отправить</button>
</form>
```

::: details создайте пресеты

```php:line-numbers
[
    'sendcode' => [
        'validate' => 'phone:required:minLength=^11^'
        'snippet' => 'SendCode',
        'successMessage' => 'Код отправлен!'
    ], 
    'register' => [
        'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
        'method' => 'register',
        'successMessage' => 'Вы успешно зарегистрированы. Подтвердите email для активации учётной записи.',  

        'fiarSubject' => 'Активация пользователя',
        'fiarFrom' => 'email@domain.ru',
        'fiarTpl' => '@FILE chunks/emails/activateEmail.tpl',

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
        'activationUrlTime' => 10800,
        
        'validate' => 'phone:required,code:required:checkCode,password:checkPassLength=^8^,password_confirm:passwordConfirm=^password^,politics:checkbox:required',
        'politics.vTextRequired' => 'Примите наши условия.',
        'password.vTextRequired' => 'Придумайте пароль.',
        'password.vTextMinLength' => 'Пароль должен быть не менее 8 символов.',
    ],      
]
```

:::

создайте сниппет **SendCode**, который отправит код и запишет его в $_COOKIE или в $_SESSION.
И валидатор **checkCode**, который проверит правильность введённого кода. Таким образом вся задача сводится к написанию функций отправки кода и его проверки.

## Отправка на событие "input"

::: info
Отправка при вводе работает аналогично отправке при изменении, только атрибут будет таким **data-si-event="input"**.
:::

Для чего нужна такая возможность? Представьте, что вам нужно, чтобы пользователь выбрал 1 вариант из 1000.
Обычный select тут будет, мягко говоря, неудобным, зато можно по мере ввода отправлять данные на сервер, осуществлять поиск по 1000 значениям, и
выводить пользователю подсказки. Отслеживание изменений в поле и отправку данных берёт на себя **SendIt**, поиск и вывод подсказок остается за вами.

## Отправка целей в Яндекс.Метрику

Для того, чтобы **SendIt** отправлял цели в метрику, нужно установить значение *ДА* для системной настройки **si_send_goal**, указать ID счётчика в настройке
**si_counter_id** и передать в пресете параметр `goalName` с названием цели.
::: warning
Цель должна иметь тип **JavaScript-событие**
:::
::: info
Убедитесь, что на сайте установлен актуальный код метрики

```html
<!-- Yandex.Metrika counter -->
<script type="text/javascript">
    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        for (var j = 0; j < document.scripts.length; j++) {
            if (document.scripts[j].src === r) {
                return;
            }
        }
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mcc.yandex.ru/metrika/tag.js", "ym");

    ym(12345678, "init", { // [!code focus]
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
</script>
<noscript>
    <div>
        <img src="https://mc.yandex.ru/watch/57463354" style="position:absolute; left:-9999px;" alt=""/>
    </div>
</noscript>
<!-- /Yandex.Metrika counter -->
```

:::

## Идентификация

Идентификация пользователя, как и редактирование его данных, происходит посредством форм. Вот это неожиданность!:upside_down_face: А значит **SendIt** справится и с этим.
Есть, конечно, нюанс: непосредственно для работы с пользователем используется отдельный класс **ajaxidentification.class.php**,
который подключается в хуке **AjaxIdentification**, но он уже проверен в бою, так как взят из моего же компонента **~~AjaxFormitLogin~~** (больше не поддерживается).

### Регистрация

Для активации пользователя в комплекте есть сниппет **ActivateUser**, который не принимает ни каких параметров, всё нужное он получает из get-параметров. В случае успешной
активации возвращает массив данных активированного пользователя. Вызывать сниппет следует на странице с ID равным значению параметра `activationResourceId`.
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
        'hooks' => 'AjaxIdentification,FormItSaveForm,FormItAutoResponder',
        'method' => 'register',
        'successMessage' => 'Вы успешно зарегистрированы. Подтвердите email для активации учётной записи.', 

        'fiarSubject' => 'Активация пользователя',
        'fiarFrom' => 'email@domain.ru',
        'fiarTpl' => '@FILE chunks/emails/activateEmail.tpl',

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
        'activationUrlTime' => 10800,
        
        'validate' => 'email:required,password:checkPassLength=^8^,password_confirm:passwordConfirm=^password^,politics:checkbox:required',
        'politics.vTextRequired' => 'Примите наши условия.',
        'password.vTextRequired' => 'Придумайте пароль.',
        'password.vTextMinLength' => 'Пароль должен быть не менее 8 символов.',
    ],
```

:::

* `activation`: 1 - требуется активация путем перехода по ссылке из письма, 0 - пользователь будет активирован сразу после регистрации.
* `moderate`: 1 - требуется модерация и ручная разблокировка пользователя.
* `autoLogin`: 1 - пользователь будет залогинен сразу после регистрации, при условии, что не требуется активация и модерация.
* `authenticateContexts`: список дополнительных контекстов для авторизации, разделенных запятыми.
* `usergroups`: список групп, в которые нужно добавить пользователя, разделенных запятыми.
* `redirectTo`: ID ресурса или ссылка на сраницу для переадресации.
* `redirectTimeout`: задержка в милисекундах перед переадресацией.
* `activationUrlTime`: время жизни ссылки для активации в милисекундах.
* `passwordField`: имя поля ввода пароля.
* `usernameField`: имя поля ввода username.
* `usergroupsField`: имя поля выбора группы.

::: tip
Если пароль не указан - он будет сгенерирован автоматически и отправлен на почту пользователю.
:::

### Авторизация

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

* `errorFieldName` - в этом параметре необходимо указать имя скрытого поля, которое необходимо для вывода ошибок.
  ::: warning
  Скрытое поле с именем из параметра `errorFieldName` необходимо добавить самостоятельно.
  :::

### Редактирование профиля

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

### Смена пароля

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

### Выход из аккаунта

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

### Сброс пароля

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
    ]
```

:::

## Валидаторы

### requiredIf

Позволяет делать проверяемое поле обязательным в зависимости от значения в другом поле.
::: details Пример использования

```php:line-numbers
...
'validate' => 'ogrn:requiredIf=^legal_form|2^',
...
```

:::
В примере поле с именем **ogrn** будет обязательным, если поле именем **legal_form** имеет значение **2**.

### checkPassLength

Сниппет для проверки длины пароля. Используйте именно его, а не стандартный валидатор **minLength**,
так как в компоненте доступна автоматическая генерация пароля, если пользователь его не укажет.
При использовании **minLength** и пустом поле с паролем будет возвращаться ошибка валидации,
в то время как **checkPassLength** проверяет длину только в случае, когда пароль задан.
При этом в качестве параметра можно передать минимальную длину, если этого не сделать будет взято значение системной настройки **password_min_length** или **8**.
::: details Пример использования

```php:line-numbers
...
'validate' => 'password:checkPassLength=^10^',
...
```

:::

### passwordConfirm

Сниппет для проверки совпадения паролей. Используйте именно его, а не стандартный валидатор **password_confirm**,
так как в компоненте доступна автоматическая генерация пароля, если пользователь его не укажет.
При использовании **password_confirm** и пустом поле с паролем будет возвращаться ошибка валидации,
в то время как **passwordConfirm** проверяет длину только в случае, когда пароль задан. При этом в качестве параметра **НУЖНО** передать имя поля с паролем.
::: details Пример использования

```php:line-numbers
...
'validate' => 'password_confirm:passwordConfirm=^password^',
...
```

:::

### userNotExists

Сниппет проверяет существование пользователя с таким username на сайте.
Возвращает ошибку, если пользователь **НЕ НАЙДЕН**. Используется при восстановлении доступа на сайт.
::: details Пример использования

```php:line-numbers
...
'validate' => 'email:required:userNotExists',
...
```

:::

## Конфигурация JavaScript

::: details Конфигурация по умолчанию

```js:line-numbers{3-12}
export default function returnConfigs() {
    return {
        Sending: { 
            pathToScripts: './modules/sending.js',
            rootSelector: '[data-si-form]', 
            rootKey: 'siForm', 
            presetKey: 'siPreset', 
            actionUrl: 'assets/components/sendit/web/action.php', 
            antiSpamEvent: 'click', 
            eventSelector: '[data-si-event="${eventName}"]', 
            errorClass: 'si-error' 
        },
    }
}
```

:::

|      Ключ       |                              Описание                               |                             Значение                              |
|:---------------:|:-------------------------------------------------------------------:|:-----------------------------------------------------------------:|
| `pathToScripts` |                   **./modules&nbsp;/sending.js**                    |     путь к модулю, указывается относительно файла *sendit.js*     |
| `rootSelector`  |                         **[data-si-form]**                          |                          селектор формы                           |
|    `rootKey`    |                             **siForm**                              |              ключ свойства *dataset* с именем формы               |
|   `presetKey`   |                            **siPreset**                             |             ключ свойства *dataset* с именем пресета              |
|   `actionUrl`   | **assets&nbsp;/components&nbsp;/sendit&nbsp;/web&nbsp;/action.php** |             путь к файлу-приёмнику запроса на сервере             |
| `antiSpamEvent` |                              **click**                              |  событие, по которому будем определять, что пользователь не бот   |
| `eventSelector` |                 **[data-si-event="${eventName}"]**                  | селектор элемента, который нужно отправить не на событие *submit* |
|  `errorClass`   |                            **si-error**                             |        класс добавляемый к полю в котором допущена ошибка         |

::: warning
**${eventName}** плейсхолдер, который будет заменён на *change* или *input*
:::
## Защита от ботов и внешнего доступа
::: info
Из коробки компонент не поддерживает капчу, но вы можете добавить её проверку самостоятельно, иcпользуя [События](https://docs.modx.pro/components/sendit/events)
:::
Вместо этого перед отправкой есть проверка **event.isTrusted**, т.е. действие должно быть инициировано пользователем,
а не с помощью функции **dispatchEvent()**. Кроме того, по клику (можно изменить `antiSpamEvent`) в куки записывается значение свойства **event.isTrusted**,
если значение равно *false* обработка запроса произведена не будет, пользователь получит уведомление (см. *"Управление словарями"*, ключ *si_msg_antispam*).  
Чтобы предотвратить доступ из вне, каждый запрос на сервер подписывается специальным токеном, это не полноценный CSRF-токен, так как живёт он до перезагрузки страницы и 
сгенерировать его достаточно просто, если получить идентификатор "живой" сессии. Однако этого должно быть достаточно для того, чтобы отвадить шутников. 
