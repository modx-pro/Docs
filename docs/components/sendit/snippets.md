# Сниппеты

## RenderForm

### Назначение

Сохраняет пресет(параметры сниппета) в сессию, рендерит чанк формы, позволяет не использовать файл пресетов.

### Параметры

Принимает все те же параметры, что и пресет и ещё:

* `tpl` - чанк формы.
* `presetName` - имя пресета, не должно совпадать ни с одним именем в файле пресетов.

### Результат работы

Возвращает распарсенный чанк формы.

### Пример использования

```fenom
{'RenderForm' | snippet: [
  'tpl' => '@FILE chunks/forms/exampleForm.tpl',
  'presetName' => 'snippet_form',
  'extends' => 'default',
  'redirectTo' => 0,
  'redirectTimeout' => 3000,
  'clearFieldsOnSuccess' => 1,
  'fieldNames' => 'age==Возраст,name==Имя,phone==Телефон,email==Почта',
  'successMessage' => 'Форма отправлена!',
  'validationErrorMessage' => 'Исправьте ошибки!'
]}
```

## ActivateUser

### Назначение

Активации пользователя после подтверждения адреса электронной почты.

### Параметры

* `toPls` - позволяет сохранить результат работы сниппета в указанный плейсхолдер.

### Результат работы

Возвращает массив данных активированного пользователя.

### Пример использования

:::info
Вызывать сниппет следует на странице с ID равным значению параметра `activationResourceId`.
:::

```fenom
{'!ActivateUser' | snippet: ['toPls' => 'userData']}
```

## requiredIf

### Назначение

Сниппет-валидатор для того, чтобы делать проверяемое поле обязательным в зависимости от значения в другом поле.

### Пример использования

```php:line-numbers
...
'validate' => 'ogrn:requiredIf=^legal_form|2^',
...
```

В примере поле с именем **ogrn** будет обязательным, если поле именем **legal_form** имеет значение **2**.

## checkPassLength

### Назначение

Сниппет-валидатор для проверки длины пароля. Используйте именно его, а не стандартный валидатор **minLength**,
так как в компоненте доступна автоматическая генерация пароля, если пользователь его не укажет.
При использовании **minLength** и пустом поле с паролем будет возвращаться ошибка валидации,
в то время как **checkPassLength** проверяет длину только в случае, когда пароль задан.
При этом в качестве параметра можно передать минимальную длину, если этого не сделать будет взято значение системной настройки **password_min_length** или **8**.

### Пример использования

```php:line-numbers
...
'validate' => 'password:checkPassLength=^10^',
...
```

## passwordConfirm

### Назначение

Сниппет-валидатор для проверки совпадения паролей. Используйте именно его, а не стандартный валидатор **password_confirm**,
так как в компоненте доступна автоматическая генерация пароля, если пользователь его не укажет.
При использовании **password_confirm** и пустом поле с паролем будет возвращаться ошибка валидации,
в то время как **passwordConfirm** проверяет длину только в случае, когда пароль задан. При этом в качестве параметра **НУЖНО** передать имя поля с паролем.

### Пример использования

```php:line-numbers
...
'validate' => 'password_confirm:passwordConfirm=^password^',
...
```

## userNotExists

### Назначение

Сниппет-валидатор проверяет существование пользователя с таким username на сайте.
Возвращает ошибку, если пользователь **НЕ НАЙДЕН**. Используется при восстановлении доступа на сайт.

### Пример использования

```php:line-numbers
...
'validate' => 'email:required:userNotExists',
...
```

## userExists

### Назначение

Сниппет-валидатор проверяет существование пользователя с таким username на сайте.
Возвращает ошибку, если пользователь **НАЙДЕН**.

## PasswordReset

### Назначение

Сниппет-активатор сброса пароля.

### Параметры

* `toPls` - позволяет сохранить результат работы сниппета в указанный плейсхолдер.

### Результат работы

Возвращает массив данных пользователя, для которого был сброшен пароль.

### Пример использования

:::info
Вызывать сниппет следует на странице с ID равным значению параметра `activationResourceId`.
:::

```fenom:line-numbers
{'!PasswordReset' | snippet: []}
```

Чтобы показать новый пароль пользователю на странице активации:

```fenom:line-numbers
{set $resetResult = '!PasswordReset' | snippet: []}

{if $resetResult}
  <p>Пароль изменён.</p>

  {if $resetResult.extended.temp_password}
    <p>Новый пароль: <strong>{$resetResult.extended.temp_password}</strong></p>
  {/if}
{/if}
```

## Pagination

### Назначение

Сниппет-обёртка для вывода результатов работы сниппета с постраничной навигацией.

### Параметры

* `snippet` - сниппет, который будет вызван при смене страницы, всегда должен иметь значение *!Pagination*.
* `render` - сниппет, который будет вызван для отрисовки результатов, он должен возвращать HTML и устанавливать плейсхолдер указанный в параметре **totalVar**.
  По умолчанию используется *!pdoResources* и для него обязательно указывать параметр **setTotal**.
* `presetName` - имя пресета, в который будут сохранены параметры вызова, должен быть уникальным для каждого вызова Pagination на страницы.
* `tplEmpty` - чанк для пустого результата работы сниппета из параметра **render**.
* `pagination` - префикс уникализации get-параметра page и плейсхолдеров **currentPage**, **currentPage**, **limit**,
должен соответствовать значениям data-атрибутов **data-pn-result**, **data-pn-pagination**
* `resultBlockSelector` - CSS-селектор блока для вставки результатов работы сниппета.
* `resultShowMethod` - метод вывода результатов; **insert** - вставляет контент взамен имеющемуся, **append** - добавляет контент к существующему.
* `hashParams` - список ключей параметров вызова сниппета, которые попадут в хеш.
* `totalVar` - ключ плейсхолдера для сохранения общего количества результатов.
* `limit` - количество результатов на одной странице.

Остальные параметры относятся в сниппету из параметра **render**

### Результат работы

Возвращает HTML первой страницы(порции) результатов работы сниппета из параметра **render**.

### Пример использования

```fenom:line-numbers
{'!Pagination' | snippet: [
  'snippet' => '!Pagination',
  'render' => '!pdoResources',
  'presetName' => 'pagination',
  'tplEmpty' => '@FILE chunks/pdoresources/empty.tpl',
  'pagination' => 'one',
  'resultBlockSelector' => '[data-pn-result="one"]',
  'resultShowMethod' => 'insert',
  'hashParams' => '',
  'totalVar' => 'total',
  'limit' => 6,

  'parents' => 7,
  'tpl' => '@FILE chunks/pdoresources/item.tpl',
  'includeContent' => 1,
  'setTotal' => 1,
]}
```

## siUserOrders

### Назначение

С версии 2.9.0. Выводит заказы miniShop2 текущего авторизованного пользователя с составом и флагами доступных действий. Подходит как `render` сниппета [Pagination](#pagination). Подробнее — в разделе [Кабинет покупателя](/components/sendit/cabinet#orders).

### Параметры

* `tpl` - чанк заказа, по умолчанию *siUserOrderTpl*.
* `tplProduct` - чанк позиции заказа, по умолчанию *siUserOrderProductTpl*. Пустое значение отключает рендер позиций.
* `tplEmpty` - чанк для пустого результата.
* `limit` - количество заказов, по умолчанию *10*.
* `offset` - смещение, по умолчанию *0*.
* `sortby` - поле `msOrder` для сортировки, по умолчанию *createdon*.
* `sortdir` - направление сортировки, по умолчанию *DESC*.
* `totalVar` - ключ плейсхолдера с общим количеством заказов, по умолчанию *total*.
* `context` - контекст заказов, по умолчанию текущий. Пустое значение выводит заказы всех контекстов.
* `outputSeparator` - разделитель результатов, по умолчанию перенос строки.

### Результат работы

Возвращает HTML списка заказов. Плейсхолдеры чанков описаны в разделах [siUserOrderTpl](/components/sendit/cabinet#tpl-order) и [siUserOrderProductTpl](/components/sendit/cabinet#tpl-order-product).

### Пример использования

```fenom
{'!siUserOrders' | snippet: [
  'tpl' => 'siUserOrderTpl',
  'tplProduct' => 'siUserOrderProductTpl',
  'limit' => 5,
]}
```

## siUserAddresses

### Назначение

С версии 2.9.0. Выводит сохранённые адреса доставки текущего пользователя: список в кабинете и быстрый выбор на странице оформления. Ничего не выводит гостю и при выключенном действии `addresses`. Подробнее — в разделе [Адреса доставки](/components/sendit/cabinet#addresses).

### Параметры

* `tpl` - чанк адреса, по умолчанию *siUserAddressTpl*.
* `tplEmpty` - чанк для пустого результата.
* `tplWrapper` - чанк-обёртка, получает результат в плейсхолдере `{$output}`.
* `outputSeparator` - разделитель результатов, по умолчанию перенос строки.

### Результат работы

Возвращает HTML списка адресов. Плейсхолдеры чанка описаны в разделе [siUserAddressTpl](/components/sendit/cabinet#tpl-address).

### Пример использования

```fenom
{'!siUserAddresses' | snippet: [
  'tpl' => 'siUserAddressTpl',
  'tplEmpty' => '@INLINE <p>Адресов пока нет.</p>',
]}
```

## siCabinetAction

### Назначение

С версии 2.9.0. Выполняет действие кабинета покупателя. Указывается в параметре `snippet` пресета, действие задаёт параметр `method`. Подробнее — в разделе [Кабинет покупателя](/components/sendit/cabinet#order-actions).

### Параметры

* `method` - действие: *toCart*, *repeat*, *pay*, *cancel* (заказы), *requestReturn* (возврат), *save*, *remove*, *setDefault*, *apply* (адреса).
* `cleanCart` - очистить корзину перед добавлением товаров (*toCart*, *repeat*).
* `redirectTo` - ID ресурса или URL для перехода после действия.
* `reloadPage` - перезагрузить страницу после успешного действия, если переход не задан.
* `successMessage` - сообщение вместо стандартного.

### Пример использования

```php
'order_cancel' => [
  'snippet' => 'siCabinetAction',
  'method' => 'cancel',
  'reloadPage' => 1,
],
```

## siSendCode

### Назначение

С версии 2.10.0. Генерирует одноразовый код входа и передаёт его классу отправки проекта (интерфейс `siCodeSender`). Указывается в параметре `snippet` пресета. Подробнее — в разделе [Вход по коду](/components/sendit/codeauth).

### Параметры

* `codeField` - поле с получателем кода, по умолчанию *phone*.
* `codeMode` - *login* — отправлять только существующему пользователю, *register* — только новому, пусто — без проверки.
* `codeSender`, `codeSenderPath` - класс отправки кода и путь к его файлу, важнее системных настроек `si_code_sender` и `si_code_sender_path`.
* `codeLength`, `codeTtl`, `codeResendDelay`, `codeHourlyLimit` - [лимиты](/components/sendit/codeauth#limits).

### Результат работы

Успешный ответ содержит `data.codeSent = 1`.

### Пример использования

```php
'code_send' => [
  'snippet' => 'siSendCode',
  'codeField' => 'phone',
  'codeMode' => 'login',
  'validate' => 'phone:required',
],
```

## siCheckCode

### Назначение

С версии 2.10.0. Валидатор: проверяет одноразовый код, не расходуя его. Поле получателя задаётся параметром валидатора, иначе берётся `codeField` пресета (по умолчанию *phone*).

### Пример использования

```php
'validate' => 'phone:required,code:required:siCheckCode',
// получатель в поле email
'validate' => 'email:required,code:required:siCheckCode=^email^',
```

## siCodeIdentification

### Назначение

С версии 2.10.0. Хук: находит пользователя по полю `codeField`, проверяет и расходует код, затем авторизует пользователя (`method` = *login*) или регистрирует нового (`method` = *register*, параметры регистрации — как у хука **Identification**). После успеха генерирует событие [siOnCodeLogin](/components/sendit/codeauth#events).

### Пример использования

```php
'code_auth' => [
  'hooks' => 'siCodeIdentification',
  'method' => 'login',
  'codeField' => 'phone',
  'validate' => 'phone:required,code:required:siCheckCode',
  'redirectTo' => 'cabinet',
],
```
