# Создаем новый контакт из заявки на сайте

Как следует из заголовка, это может быть полезно, когда клиент тем или иным способом оставляет на сайте свой контакт.
Здесь возможны два варината.

1. Клиент заполнил контактную форму и нужно передать контакт в RetailCRM
2. Клиент тем или иным способом зарегистрировался на сайте. Передаем профиль пользователя в CRM

## Контакт получаем из контактной формы

В этом случае на сайте почти наверняка установлен компонент FormIt, для которого я напишу хук, получающий данные клиента и отправляющий их дальше в RetailCRM

Создаю сниппет contactToRetailCRM примерно следующего содержимого:

```php
<?php
// Вызов и первоначальная настройка компонента
if (!$modRetailCrm = $modx->getService(
  'modretailcrm',
  'modRetailCrm',
  MODX_CORE_PATH . 'components/modretailcrm/model/modretailcrm/',
  array($modx)
)) {
  $modx->log(modX::LOG_LEVEL_ERROR, '[modRetailCrm] - Not found class modRetailCrm');
  return;
}

// Принимаю необходимый массив полей из формы
$contact = array();
$name = trim(filter_var($hook->getValue('firstName'), FILTER_SANITIZE_STRING));
$contact['firstName'] = $name;
$contact['phones'][0]['number'] = trim(filter_var($hook->getValue('phone'), FILTER_SANITIZE_STRING));
$contact['email'] = trim(filter_var($hook->getValue('email'), FILTER_VALIDATE_EMAIL));
// Генерируем externalId клиента
$contact['externalId'] = md5($contact['phones'][0]['number'] . $contact['email']);
// Отправляю данные в RetailCRM

$response = $modRetailCrm->request->customersCreate($contact);
if ($response->isSuccessful()) {
  return true;
} else {
  $modx->log(1, '[modRetailCRM] contactToRetailCRM '.print_r($response, 1));
  return false;
}

```

Важный нюанс, который обязательно следует знать и понимать. При создании нового клиента через API - RetailCRM требует наличие параметра  ExternalID (идентификатор клиента на сайте).
Подразумевается, что такой клиент обязательно у меня зарегистрирован перед отправкой данных. Так как в данном случае я клиента в базе никак не регистрирую, и приходится генерировать ExternalId на лету.
Это можно сделать разными способами, первое что пришло в голову это создать md5  хэш клиента и подставить его в нужный параметр

```php
$contact['externalId'] = md5($contact['phones'][0]['number'] . $contact['email']);
```

Ну и пример вызова формы (я использую ajaxForm, который по умолчанию работает с FormIT)

```fenom
{'!ajaxForm' | snippet : [
  'form' => '@INLINE
    <form>
      <div class="form-group">
        <label>Имя</label>
        <input class="form-control" type="text" name="firstName" value="" placeholder="Имя">
      </div>
      <div class="form-group">
        <label>Телефон</label>
        <input class="form-control" type="text" name="phone" value="" placeholder="Телефон">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input class="form-control" type="text" name="email" value="" placeholder="Email">
      </div>
      <button type="submit" class="btn btn-primary">Оставить заявку</button>
    </form>
  ',
  'hooks' => 'contactToRetailCRM',
]}

```

### Контакт получен при регистрации пользователя

Этот случай уже предусмотрен в плагине, который идет в комплекте
