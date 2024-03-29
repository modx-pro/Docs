# Подключение

Для того, чтобы изменить работу какого-то из сервисов по умолчанию, вам нужно зарегистрировать PHP файл с его логикой.
Это можно сделать двумя способами.

Первый - физически положить файл `любое_имя.class.php` в директорию `MODX_CORE_PATH . 'components/minishop2/custom/тип_сервиса/'`.
**Этот способ является устаревшим и его не нужно использовать**.

## Подключение сервиса

Правильный способ - создать php файл и зарегистрировать его через метод `miniShop2::addService()`:

```php
if ($miniShop2 = $modx->getService('miniShop2')) {
  $miniShop2->addService('payment', 'CustomerAccount',
      '{core_path}components/msprofile/model/msprofile/customeraccount.class.php');
}
```

Данный код нужно выполнить 1 раз в сниппете на странице или в компоненте Console. Каждый раз регистрировать php файл не нужно.

Метод принимает следующие параметры:

1. Тип сервиса: **cart**, **order**, **delivery** или **payment**.
2. Уникальное название
3. Путь к PHP файлу с классом. Можно использовать плейсхолдеры `{base_path}`, `{core_path}` и `{assets_path}`.

## Удаление сервиса

Удаление сервиса производится через метод `miniShop2::removeService()`:

```php
if ($miniShop2 = $modx->getService('miniShop2')) {
  $miniShop2->removeService('payment', 'CustomerAccount');
}
```

Здесь нужно указать только тип и уникальное имя зарегистрированного сервиса.

## Пример подключения собственного класса доставки

Допустим нам необходимо обнулить стоимость доставки при общей сумме заказа свыше 5000, для этого, создадим php файл `msdeliveryhandlermsk.class.php` в произвольном каталоге, например: `/core/components/minishop2/custom/delivery`*, со следующим содержимым:

```php
<?php

if (!class_exists('msDeliveryInterface')) {
  require_once dirname(dirname(dirname(__FILE__))) . '/model/minishop2/msdeliveryhandler.class.php';
}

class msDeliveryHandlerMsk extends msDeliveryHandler implements msDeliveryInterface {

  public function getCost(msOrderInterface $order, msDelivery $delivery, $cost = 0) {

    $freedeliverysumm = 5000;
    $cart = $order->ms2->cart->status();
    $cart_cost = $cart['total_cost'];

    if ($cart_cost > $freedeliverysumm) {
      return $cost;
    } else{
      $delivery_cost = parent::getCost($order, $delivery, $cost);
      return $delivery_cost;
    }
  }
}
```

Далее, зарегистрируем службу по этому адресу выполнив код ниже в сниппете или в Console:

```php
if ($miniShop2 = $modx->getService('miniShop2')) {
  $miniShop2->addService('delivery', 'MskDelivery',
      '{core_path}components/minishop2/custom/delivery/msdeliveryhandlermsk.class.php');
}
```

Теперь нам остается выбрать класс обработчик в настройках minishop2

[![](https://file.modx.pro/files/5/a/d/5ad467e41a21922d0ab6bbf7e41e1627s.jpg)](https://file.modx.pro/files/5/a/d/5ad467e41a21922d0ab6bbf7e41e1627.png)
