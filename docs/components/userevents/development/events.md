# События

Доступны следующие события:

- `UserEventsOnEventBeforeSave`
- `UserEventsOnEventSave` - сохранение события
  - `event` - событие объект
- `UserEventsOnEventBeforeRemove`
- `UserEventsOnEventRemove` - удаление события
  - `event` - событие объект
- `UserEventsOnBeforeChangeStatus`
- `UserEventsOnChangeStatus` - смена статуса события
  - `instance` - сущность событие
  - `status` - идентификатор статуса
- `UserEventsOnBeforeAddToOrder`
- `UserEventsOnAddToOrder` - добавление поля заказа
  - `key` - ключ поля
  - `value` - значение поля
- `UserEventsOnBeforeValidateOrderValue`
- `UserEventsOnValidateOrderValue` - валидация поля заказа
  - `key` - ключ поля
  - `value` - значение поля
- `UserEventsOnBeforeRemoveFromOrder`
- `UserEventsOnRemoveFromOrder` - удаление поля заказа
  - `key` - ключ поля
  - `order` - заказ объект
- `UserEventsOnBeforeEmptyOrder`
- `UserEventsOnEmptyOrder` - очистка заказа
  - `order` - заказ объект
- `UserEventsOnBeforeGetOrderCost`
- `UserEventsOnGetOrderCost` - получение стоимости заказа
  - `order` - заказ объект
  - `cost` - стоимость
- `UserEventsOnSubmitOrder` - обработка заказа
  - `order` - заказ объект
  - `data` - данные массив
- `UserEventsOnBeforeCreateOrder`
- `UserEventsOnCreateOrder` - создание заказа
  - `msOrder` - заказ объект
  - `order` - заказ объект
- `UserEventsOnDaysState` - состояние дней
  - `state` - состояние массив
  - `order` - заказ объект
- `UserEventsOnTimesState` - состояние времени
  - `state` - состояние массив
  - `order` - заказ объект

## Примеры

Расчитать стоимость события

```php
<?php

switch ($modx->event->name) {

  case "UserEventsOnBeforeGetOrderCost":
    /** @var UserEventsOrderInterface $orderHandler */
    $orderHandler = $modx->getOption("order", $scriptProperties);
    if (!$orderHandler OR !($orderHandler instanceof UserEventsOrderInterface)) {
      return;
    }
    $values = $modx->Event->returnedValues;
    $data = $orderHandler->get();
    $rid = $modx->getOption("resource", $data);

    $cost = 0;
    // расчет стоимости согласно своей логике
    if ($resource = $modx->getObject("modResource", $rid)) {
      $cost = $resource->get("id") * 100;
    }
    $values["cost"] = $cost;

    $modx->event->returnedValues = $values;
    break;

}
```
