# Авторизация

Параметры этого контроллера очень похожи на [HybridAuth][1].

| Название               | По умолчанию                     | Описание                                                                                                                                                                                    |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **&tplLogin**          | `tpl.Office.auth.login`          | Этот чанк будет показан анонимному пользователю, то есть любому гостю.                                                                                                                      |
| **&tplLogout**         | `tpl.Office.auth.logout`         | Этот чанк будет показан авторизованному пользователю.                                                                                                                                       |
| **&tplActivate**       | `tpl.Office.auth.activate`       | Чанк для оформления письма активации.                                                                                                                                                       |
| **&tplRegister**       | `tpl.Office.auth.register`       | Чанк для оформления письма регистрации.                                                                                                                                                     |
| **&linkTTL**           | `600`                            | Время жизни ссылки активации профиля в секундах.                                                                                                                                            |
| **&groups**            |                                  | Список групп для регистрации пользователя, через запятую. Можно указывать роль юзера в группе через двоеточие. Например, &groups=`Users:1` добавит юзера в группу "Users" с ролью "member". |
| **&rememberme**        | `1`                              | Запоминает пользователя на долгое время. По умолчанию - включено.                                                                                                                           |
| **&loginContext**      |                                  | Основной контекст для авторизации. По умолчанию - текущий.                                                                                                                                  |
| **&addContexts**       |                                  | Дополнительные контексты, через запятую. Например, &addContexts=`web,ru,en`                                                                                                                 |
| **&loginResourceId**   | `0`                              | Идентификатор ресурса, на который отправлять юзера после авторизации. По умолчанию, это 0 - обновляет текущую страницу.                                                                     |
| **&logoutResourceId**  | `0`                              | Идентификатор ресурса, на который отправлять юзера после завершения сессии. По умолчанию, это 0 - обновляет текущую страницу.                                                               |
| **&HybridAuth**        | `1`                              | Включить интеграцию с [HybridAuth][1], если он установлен.                                                                                                                                  |
| **&providers**         |                                  | Список провайдеров авторизации [HybridAuth][1], через запятую.                                                                                                                              |
| **&providerTpl**       | `tpl.HybridAuth.provider`        | Чанк для вывода ссылки на авторизацию или привязку сервиса HybridAuth к учетной записи.                                                                                                     |
| **&activeProviderTpl** | `tpl.HybridAuth.provider.active` | Чанк для вывода иконки привязанного сервиса HybridAuth.                                                                                                                                     |

Пример вызова, с регистрацией в группу Users и редиректом на главную страницу:

```modx
[[!OfficeAuth?
  &groups=`Users`
  &loginResourceId=`[[++site_start]]`
]]
```

В работе контроллера есть небольшой нюанс: для генерации авторизационных ссылок ему нужно иметь какой то id ресурса по умолчанию.
Этот id хранится в системной настройке **office_auth_page_id** и заполняется при первом вызове сниппета на сайте.

В дальнейшем, есть вы не указываете **&loginResourceId**, то используется именно этот id, и все ссылки в почте будут на эту страницу.

## Режим авторизации

Режим авторизации указывается в системной настройке **office_auth_mode**.
По умолчанию для регистрации и сброса пароля используется *email*, но вы можете включить режим *phone*.

После этого вам нужно выбрать провайдера отправки sms в системной настройке **office_sms_provider**.
По умолчанию доступны [SmsRu][2] и [ByteHand][3].

Для работы провайдеров используются следующие системные настройки

- **office_sms_id** — идентификатор клиента на сервисе.
- **office_sms_key** — ключ клиента на сервисе, для SmsRu не нужен.
- **office_sms_from** — текстовое обозначение отправителя, его нужно согласовывать с сервисом.

В зависимости от режима работы поля **email** и **mobilephone** становятся обязательными для регистрации.

### Действия форм

Стандартный javascript написан таким образом, чтобы обрабатывать все формы авторизации универсально, различая их по указанным действиям в скрытом input:

```html
<input type="hidden" name="action" value="auth/действие" />
```

Возможны следующие действия:

- **auth/formLogin** - обычная авторизация. Если пароль не указан, то будет отправлено письмо со ссылкой для сброса.
- **auth/formRegister** - регистрация нового пользователя
- **auth/formAdd** - дополнительня авторизация в другой аккаунт, для быстрого переключения между ними
- **auth/sendLink** - отправка ссылки на сброс пароля

Выход из учётной записи доступен по простой загрузке страницы с параметром в ссылке: `https://your.site/?action=auth/logout`.

Если вам нужно отменить авторизацию аккаунта, добавленного через `auth/formAdd`, то к этой ссылке нужно указать `user_id`: `https://your.site/?action=auth/logout&user_id=15`.

Такие ссылки обрабатываются плагинами Office, так что их можно указывать на любую страницу.

### Добавление провайдера

Для добавления своего провайдера SMS вам нужно создать новый класс в core/components/office/model/sms/**myprovider**.class.php.

Примерная структура класса:

```php
<?php

class MyProvider {
  function __construct(modX $modx, array $config = array()) {
    $this->modx = &$modx;
  }

  function send($phone, $text) {
    // Получаем системные настройки для работы и шлём сообщение

    return true; // или текст ошибки
  }
}
```

После этого можно указывать *MyProvider* в настройке office_sms_provider.

Провайдера sms можно использовать и для произвольной отправки sms через API MODX:

```php
$provider = $modx->getOption('office_sms_provider');
if ($service = $modx->getService($provider, $provider, MODX_CORE_PATH . 'components/office/model/sms/')) {
  $send = $service->send('79234778899', 'Приветик!');
  return $send === true
    ? 'Сообщение отправлено!'
    : 'Ошибка при отправке сообщения: ' . $send;
  }
}
```

Класс провайдера обязательно должен иметь метод `send`.

## Дополнительные поля

Регистрация в Office требует наличие всего одного заполненного поля - email, всё остальное необязательно.
Так сделано специально, чтобы пользователь как можно скорее зарегистрировался на сайте, а дальше вы уже можете требовать от него заполнения профиля, если хотите.

Заполнение больших форм при регистрации утомляет, поэтому Office старается не напрягать пользователя лишним вводом данных.

Однако, если вам очень хочется, чтобы пользователь обязательно вводил что-то еще, вы можете написать для этого свой системный плагин.
Например, можно дать пользователю выбор, в какую группу регистрироваться.

Для этого добавим select в форму регистрации:

```html
<label for="office-auth-register-group" class="col-md-3 control-label">Группа</label>
<div class="col-md-8">
  <select name="group" class="form-control" id="office-auth-register-group">
    <option value="users">Обычные пользователи</option>
    <option value="admins">Администраторы</option>
  </select>
</div>
```

А затем напишем свой плагин, который будет проверять выбор группы и добавлять её пользователю:

```php
<?php

// Массив заранее определённых для регистрации групп защищает от подмены данных при отправке формы
$groups = array(
  'admins' => 'Administrator',
  'users' => 'Users',
);

if ($modx->context->key != 'mgr') {
  switch ($modx->event->name) {
    // Событие перед регистрацией пользователя
    case 'OnBeforeUserFormSave':
      if ($mode == 'new') {
        if (empty($_POST['group']) || !array_key_exists($_POST['group'], $groups)) {
          // Возврат ошибки, если группа не заполнена или не из нашего списка
          $modx->event->output('Вы должны указать группу пользователя!');
        }
        // Также можно и добавить что-то в профиль
        // $user->Profile->set('comment', 'Комментарий');
      }
      break;
    // Событие после регистрации пользователя
    case 'OnUserFormSave':
      if ($mode == 'new') {
        // Здесь мы добавляем выбранную группу
        $user->joinGroup($groups[$_POST['group']]);
      }
      break;
  }
}
```

Не забудьте включить у плагина события **OnBeforeUserFormSave** и **OnUserFormSave**.
Параметр **&groups**, в таком случае, сниппету OfficeAuth можно не указывать.

[1]: /components/hybridauth/snippets/hybridauth
[2]: http://sms.ru
[3]: http://bytehand.com
