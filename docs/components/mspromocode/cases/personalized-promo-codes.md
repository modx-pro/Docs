# Именные промокоды для пользователя

Кейс позволяет привязать промо-код к конкретному юзеру, запрещая применение в любом другом случае.

## Вариант 1

Всё очень просто! Создаёте плагин на событие `mspcOnBeforeSetCoupon` с кодом:

```php
switch ($modx->event->name) {
  case 'mspcOnBeforeSetCoupon':
    // Купон является именным, если в описании у него "user: [[+username]]", иначе никаких проверок не делаем
    if (!preg_match('/^user\: /i', $coupon['description'])) {
      break;
    }
    $username = preg_replace('/^user\: (.*)$/ui', '$1', $coupon['description']);

    // Если в описании промокода указан username пользователя, то применяем промокод
    if (is_object($modx->user) && $modx->user->get('username') == $username) {
      break;
    }

    // Выдаём ошибку применения купона
    $modx->event->output('Промокод "' . $coupon['code'] . '" не является вашим именным!');
    break;
}
```

::: warning Важно
При создании промокода, в описании ему указать `user: [[+username]]`, где вместо `[[+username]]` логин юзера, которому принадлежит промокод.
:::

## Вариант 2

Можно вообще обойтись без проверки имени в описании, а купоны создавать с кодом `username` пользователя. То бишь, промокод будет равен `username` того пользователя, чей это купон. Вот код для такого решения:

```php
switch ($modx->event->name) {
  case 'mspcOnBeforeSetCoupon':
    // Именной промокод, это когда в description купона написано "user"
    if ($coupon['description'] != 'user') {
      break;
    }

    // Если код купона равен username пользователя, то применяем
    if (is_object($modx->user) && $modx->user->get('username') == $coupon['code']) {
      break;
    }

    // Выдаём ошибку применения купона
    $modx->event->output('Промокод "' . $coupon['code'] . '" не является вашим именным!');
    break;
}
```

::: warning Важно
При создании промокода, в описании ему написать `user`, чтобы скрипт мог понять, что купон именной.
:::
