# Расширения

Использование в сторонних компонентах:

## Создание хэш-кода авторизации

```php
$options = [
  'user' => 'test@gmail.com',
  'lifeTime' => '1m' // срок жизни хэш-кода 1 месяц
];
/** @var UserAuthHash $UserAuthHash */
if ($UserAuthHash = $modx->getService('userauthhash.UserAuthHash', '', MODX_CORE_PATH.'components/userauthhash/model/')) {
  $hash = $UserAuthHash->getAuthHash($options);
}
```

## Удаление хэш-кода авторизации

```php
$options = [
  'user' => 'test@gmail.com',
];
/** @var UserAuthHash $UserAuthHash */
if ($UserAuthHash = $modx->getService('userauthhash.UserAuthHash', '', MODX_CORE_PATH.'components/userauthhash/model/')) {
  $hash = $UserAuthHash->removeAuthHash($options);
}
```
