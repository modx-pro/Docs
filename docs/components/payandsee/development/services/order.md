# Заказ

Процессом оформления заказа занимается специальный класс **PasOrderHandler**, который реализует интерфейс **PasOrderInterface**.
Конечно, вы можете подключить собственный класс для заказа и указать его в системной настройке **order_handler_class**

![Заказ](https://file.modx.pro/files/4/8/3/483ef49c65873a11583048dd19e9eb85.png)

Итак, обязательные методы интерфейса `msOrderInterface`:

- `initialize` - Инициализирует класс в контекст. Может загружать скрипты и стили.
- `add` - Добавляет одно поле в заказ.
- `remove` - Удаляет одно поле из заказа.
- `validate` - Проводит проверку поля при добавлении и возвращает фильтрованное значение.
- `get` - Возвращает содержимое заказа, целиком.
- `set` - Перезаписывает содержимое заказа полученным массивом.
- `submit` - Оформление заказа, в нём уже должна быть доставка и обязательные поля.
- `clean` - Полная очистка заказа.
- `getcost` - Получение стоимости.
- `getDeliveryCost` - Получение стоимости доставки.
- `getPaymentCost` - Получение стоимости оплаты.
- `getDeliveries` - Получение вариантов доставки.
- `getPayments` - Получение вариантов оплаты.

## Системные события

Класс `PasOrderInterface` генерирует определённые события при работе с заказом. Для удобства, вот они в виде заготовки-плагина:

```php
<?php

switch ($modx->event->name) {
  // Добавление полей в заказ
  case 'PasOnBeforeAddToOrder'; break; // получает $key с именем поля, $value - значение поля
  case 'PasOnAddToOrder'; break; // получает $key с именем поля, $value - значение поля

  // Удаление полей из заказа
  case 'PasOnBeforeRemoveFromOrder'; break; // получает $key с именем поля
  case 'PasOnRemoveFromOrder'; break; // получает $key с именем поля

  // Отправка заказа
  case 'PasOnSubmitOrder'; break; // необязательный массив $data с переназначаемыми полями

  // Создание заказа
  case 'PasOnBeforeCreateOrder'; break; // получает готовый объект $order со всеми прицепленными объектами
  case 'PasOnCreateOrder'; break; // тоже самое

  // Очистка заказа
  case 'PasOnBeforeEmptyOrder'; break; // получает только объект $order
  case 'PasOnEmptyOrder'; break; // получает только объект $order

  // Смена статуса заказа (оплата, отмена и т.д.)
  case 'msOnBeforeChangeOrderStatus': break; // получает объект $order и id статуса в $status
  case 'msOnChangeOrderStatus': break; // получает объект $order и id статуса в $status
}
```

Все события также получают объект `$order` с заказом.
