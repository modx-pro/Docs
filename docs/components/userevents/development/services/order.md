# Заказ

Процессом оформления заказа занимается специальный класс **UserEventsOrderHandler**, который реализует интерфейс **UserEventsOrderInterface**.
Конечно, вы можете подключить собственный класс для заказа и указать его в системной настройке **order_handler_class**

Итак, обязательные методы интерфейса `UserEventsOrderInterface`:

- `initialize` - Инициализирует класс в контекст. Может загружать скрипты и стили.
- `add` - Добавляет одно поле в заказ.
- `remove` - Удаляет одно поле из заказа.
- `validate` - Проводит проверку поля при добавлении и возвращает фильтрованное значение.
- `get` - Возвращает содержимое заказа.
- `set` - Перезаписывает содержимое заказа полученным массивом.
- `submit` - Оформление заказа, в нём уже должна быть обязательные поля.
- `clean` - Полная очистка заказа.
- `getcost` - Получение стоимости.
- `getDaysState` - Получение состояния дней календаря.
- `getTimesState` - Получение состояния времени календарного дня.
- `getDeliveryCost` - Получение стоимости доставки.
- `getPaymentCost` - Получение стоимости оплаты.
- `getDeliveries` - Получение вариантов доставки.
- `getPayments` - Получение вариантов оплаты.

## Системные события

Класс `UserEventsOrderInterface` генерирует определённые события при работе с заказом. Для удобства, вот они в виде заготовки-плагина:

```php
<?php

switch ($modx->event->name) {
    // Добавление полей в заказ
  case 'UserEventsOnBeforeAddToOrder'; break; // получает $key с именем поля, $value - значение поля
  case 'UserEventsOnAddToOrder'; break; // получает $key с именем поля, $value - значение поля

  // Удаление полей из заказа
  case 'UserEventsOnBeforeRemoveFromOrder'; break; // получает $key с именем поля
  case 'UserEventsOnRemoveFromOrder'; break; // получает $key с именем поля

  // Отправка заказа
  case 'UserEventsOnSubmitOrder'; break; // необязательный массив $data с переназначаемыми полями

  // Создание заказа
  case 'UserEventsOnBeforeCreateOrder'; break; // получает готовый объект $order со всеми прицепленными объектами
  case 'UserEventsOnCreateOrder'; break; // тоже самое

  // Очистка заказа
  case 'UserEventsOnBeforeEmptyOrder'; break; // получает только объект $order
  case 'UserEventsOnEmptyOrder'; break; // получает только объект $order

  // Смена статуса заказа (оплата, отмена и т.д.)
  case 'msOnBeforeChangeOrderStatus': break; // получает объект $order и id статуса в $status
  case 'msOnChangeOrderStatus': break; // получает объект $order и id статуса в $status
}
```

Все события также получают объект `$order` с заказом.
