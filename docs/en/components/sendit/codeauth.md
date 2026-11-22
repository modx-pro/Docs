# Вход по коду

С версии 2.10.0. **SendIt** умеет авторизовывать и регистрировать пользователя по одноразовому коду: пользователь вводит телефон (или email, chat id), получает код и вводит его в форму.

::: warning Требования
Работает **только в MODX 2**.
:::

Как это устроено:

* Сниппет [siSendCode](/components/sendit/snippets#sisendcode) генерирует код и передаёт его классу отправки проекта.
* Валидатор [siCheckCode](/components/sendit/snippets#sicheckcode) проверяет введённый код.
* Хук [siCodeIdentification](/components/sendit/snippets#sicodeidentification) находит пользователя и авторизует его или регистрирует нового.
* В базе хранится не сам код, а его HMAC-подпись, причём под ключом получателя, а не сессии, поэтому код, запрошенный в одном браузере, можно ввести в другом. После успешного входа код сгорает.
* Телефон ищется по цифрам, без учёта маски в профиле: `+7 (900) 000-00-00`, `89000000000` и `79000000000` считаются одним номером.

## Класс отправки кода {#sender}

Доставку кода пакет не реализует: канал (SMS, Telegram, почта) у каждого проекта свой. Проект пишет класс, реализующий интерфейс `siCodeSender`, и подключает его.

::: details Интерфейс siCodeSender

```php:line-numbers
interface siCodeSender
{
  /**
   * @param string $recipient получатель как его ввёл пользователь (телефон, email, chat id)
   * @param string $code код для отправки
   * @param array $params параметры пресета
   * @return bool
   */
  public function send(string $recipient, string $code, array $params): bool;

  /**
   * Текст ошибки для пользователя, если send() вернул false.
   * @return string
   */
  public function getError(): string;
}
```

:::

Конструктор класса получает `\modX $modx` и параметры пресета.

::: details Пример класса отправки по SMS

Файл `core/elements/classes/smscodesender.class.php`:

```php:line-numbers
<?php

class SmsCodeSender implements siCodeSender
{
  private modX $modx;
  private array $params;
  private string $error = '';

  public function __construct(modX $modx, array $params = [])
  {
    $this->modx = $modx;
    $this->params = $params;
  }

  public function send(string $recipient, string $code, array $params): bool
  {
    $phone = preg_replace('/\D+/', '', $recipient);
    $query = http_build_query([
      'api_id' => $this->modx->getOption('sms_api_key'),
      'to' => $phone,
      'msg' => 'Код для входа: ' . $code,
      'json' => 1,
    ]);
    $response = json_decode((string)file_get_contents('https://sms.ru/sms/send?' . $query), true);
    if (($response['status'] ?? '') !== 'OK') {
      $this->error = 'Не удалось отправить SMS. Попробуйте позже.';
      return false;
    }
    return true;
  }

  public function getError(): string
  {
    return $this->error;
  }
}
```

:::

Класс подключается системными настройками или параметрами пресета (параметр пресета важнее настройки):

|          Настройка           |  Параметр пресета  |                                                Описание                                                 |
|:----------------------------:|:------------------:|:-------------------------------------------------------------------------------------------------------:|
|     **si_code_sender**       |    `codeSender`    |                           Имя класса, реализующего `siCodeSender`                                       |
|   **si_code_sender_path**    |  `codeSenderPath`  | Путь к файлу класса, плейсхолдеры `{core_path}` и `{base_path}`. Например `{core_path}elements/classes/smscodesender.class.php` |

Если класс не найден или не реализует `siCodeSender`, пользователь получит «Отправка кода не настроена.», а подробности попадут в журнал.

## Форма {#form}

Одна форма обслуживает и запрос кода, и вход: кнопка «Получить код» отправляет форму пресетом `code_send`, кнопка «Войти» — пресетом формы `code_auth`. Пример лежит в чанке **siExampleCodeAuthForm**.

::: details Чанк siExampleCodeAuthForm

```html:line-numbers
<form action="#" data-si-form="codeAuthForm" data-si-preset="code_auth" data-si-nosave>
  <input type="hidden" name="errorLogin">
  <p data-si-error="errorLogin"></p>
  <label>
    <input type="tel" name="phone" placeholder="Телефон">
    <p data-si-error="phone"></p>
  </label>
  <label>
    <input type="text" name="code" placeholder="Код" inputmode="numeric" autocomplete="one-time-code">
    <p data-si-error="code"></p>
  </label>
  <button type="button" data-si-preset="code_send" data-si-event="click">Получить код</button>
  <button type="submit">Войти</button>
</form>
```

:::

Для регистрации укажите форме `data-si-preset="code_register"`, кнопке запроса кода — `data-si-preset="code_send_register"` и добавьте поле `fullname`.

## Пресеты {#presets}

::: details Пресеты входа и регистрации по коду

```php:line-numbers
'code_send' => [
  'snippet' => 'siSendCode',
  'codeField' => 'phone',
  'codeMode' => 'login',
  'validate' => 'phone:required',
  'phone.vTextRequired' => 'Укажите телефон.',
],
'code_send_register' => [
  'extends' => 'code_send',
  'codeMode' => 'register',
],
'code_auth' => [
  'hooks' => 'siCodeIdentification',
  'method' => 'login',
  'codeField' => 'phone',
  'successMessage' => 'Вы успешно авторизованы.',
  'validate' => 'phone:required,code:required:siCheckCode',
  'phone.vTextRequired' => 'Укажите телефон.',
  'code.vTextRequired' => 'Введите код.',
  'redirectTo' => 'cabinet',
  'reloadPage' => 1,
  'redirectTimeout' => 1000,
  'clearFieldsOnSuccess' => 1,
],
'code_register' => [
  'hooks' => 'siCodeIdentification',
  'method' => 'register',
  'codeField' => 'phone',
  'successMessage' => 'Вы успешно зарегистрированы.',
  'activation' => 0,
  'autoLogin' => 1,
  'usergroups' => '',
  'validate' => 'fullname:required,phone:required,code:required:siCheckCode',
  'fullname.vTextRequired' => 'Укажите ваше имя.',
  'phone.vTextRequired' => 'Укажите телефон.',
  'code.vTextRequired' => 'Введите код.',
  'redirectTo' => 'cabinet',
  'reloadPage' => 1,
  'redirectTimeout' => 1000,
  'clearFieldsOnSuccess' => 1,
],
```

:::

* `codeField` — поле с получателем кода. По нему же ищется пользователь: поле `modUser` или `modUserProfile` (`phone`, `mobilephone`, `email` и т. п.). По умолчанию `phone`.
* `codeInputField` — поле с введённым кодом (для хука), по умолчанию `code`.
* `codeMode` — для `siSendCode`: `login` — отправлять код только существующему пользователю, `register` — только новому. Пусто — без проверки.
* `method` — для хука `siCodeIdentification`: `login` или `register`.
* `errorFieldName` — скрытое поле для ошибки входа, по умолчанию `errorLogin`.
* `redirectTo` = `cabinet` — переход на страницу из настройки [si_cabinet_page_id](/components/sendit/cabinet#settings). Если она равна `0`, сработает `reloadPage` и страница перезагрузится.
* Остальные параметры регистрации (`activation`, `autoLogin`, `usergroups` и т. д.) — как в разделе [Регистрация](/components/sendit/identification#registraciya).

## Лимиты {#limits}

Лимиты задаются параметрами пресета. Задавайте одинаковые значения в пресетах отправки и проверки кода.

| Параметр | Что ограничивает | По умолчанию |
|---|---|---|
| `codeLength` | Длина кода, от 4 до 10 цифр | `4` |
| `codeTtl` | Время жизни кода, секунд | `300` |
| `codeResendDelay` | Пауза перед повторным запросом кода, секунд | `60` |
| `codeAttempts` | Неверных вводов, после которых код сгорает | `5` |
| `codeHourlyLimit` | Отправок кода одному получателю за час | `5` |

::: details Пример: код из 6 цифр, живёт 10 минут

```php:line-numbers
'code_send' => [
  'snippet' => 'siSendCode',
  'codeField' => 'phone',
  'codeMode' => 'login',
  'codeLength' => 6,
  'codeTtl' => 600,
  'codeResendDelay' => 90,
  'validate' => 'phone:required',
],
'code_auth' => [
  'hooks' => 'siCodeIdentification',
  'method' => 'login',
  'codeTtl' => 600,
  'codeAttempts' => 3,
  'validate' => 'phone:required,code:required:siCheckCode',
],
```

:::

## События {#events}

### siOnBeforeSendCode

Генерируется перед отправкой кода. Позволяет подменить код или запретить отправку.

Доступные параметры:

* **$recipient** — получатель, как его ввёл пользователь.
* **$code** — сгенерированный код.
* **$params** — параметры пресета.

Плагин возвращает через `$modx->event->returnedValues`:

* `code` — код, который будет отправлен и сохранён вместо сгенерированного;
* `error` — текст отказа, код не отправляется.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name) {
  case 'siOnBeforeSendCode':
    // постоянный код для тестового номера
    if (preg_replace('/\D+/', '', $recipient) === '79990000000') {
      $modx->event->returnedValues['code'] = '0000';
    }
    // запрет отправки на зарубежные номера
    if (strpos(preg_replace('/\D+/', '', $recipient), '7') !== 0) {
      $modx->event->returnedValues['error'] = 'Вход по коду доступен только для российских номеров.';
    }
    break;
}
```

:::

### siOnCodeLogin

Генерируется после успешного входа или регистрации по коду.

Доступные параметры:

* **$method** — `login` или `register`.
* **$user** — объект `modUser` авторизованного пользователя.
* **$recipient** — получатель, на который был отправлен код.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name) {
  case 'siOnCodeLogin':
    if ($method === 'register') {
      $profile = $user->getOne('Profile');
      $profile->set('mobilephone', $recipient);
      $profile->save();
    }
    break;
}
```

:::
