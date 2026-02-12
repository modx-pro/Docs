# События

## Доступны следующие события

### События корзины

- `msOnBeforeAddToCart` - перед добавлением продукта в корзину
  - `product` - объект *msProduct*
  - `count` - кол-во продукта
  - `options` - массив опций
  - `cart` - экземпляр класса *корзина*
- `msOnAddToCart` - после добавления продукта в корзину
  - `key` - ключ продукта
  - `cart` - экземпляр класса *корзина*
- `msOnBeforeChangeInCart` - перед изменением продукта в корзине
  - `key` - ключ продукта
  - `count` - кол-во продукта
  - `cart` - экземпляр класса *корзина*
- `msOnChangeInCart` - после изменения продукта корзины
  - `key` - ключ продукта
  - `count` - кол-во продукта
  - `cart` - экземпляр класса *корзина*
- `msOnBeforeRemoveFromCart` - перед удалением продукта из корзины
  - `key` - ключ продукта
  - `cart` - экземпляр класса *корзина*
- `msOnRemoveFromCart` - после удаления продукта из корзины
  - `key` - ключ продукта
  - `cart` - экземпляр класса *корзина*
- `msOnBeforeEmptyCart` - перед очисткой корзины
  - `cart` - экземпляр класса *корзина*
- `msOnEmptyCart` - после очистки корзины
  - `cart` - экземпляр класса *корзина*
- `msOnGetStatusCart` - получение статуса корзины
  - `status` - статус
  - `cart` - экземпляр класса *корзина*

### События заказа

- `msOnBeforeAddToOrder` - перед добавлением поля заказа
  - `key` - ключ поля
  - `value` - значение поля
  - `order` - экземпляр класса *msOrderHandler*
- `msOnAddToOrder` - после добавления поля заказа
  - `key` - ключ поля
  - `value` - значение поля
  - `order` - экземпляр класса *msOrderHandler*
- `msOnBeforeValidateOrderValue` - перед валидацией поля заказа
  - `key` - ключ поля
  - `value` - значение поля
  - `order` - экземпляр класса *msOrderHandler*
- `msOnValidateOrderValue` - после валидации поля заказа
  - `key` - ключ поля
  - `value` - значение поля
  - `order` - экземпляр класса *msOrderHandler*
- `msOnBeforeRemoveFromOrder` - перед удалением поля заказа
  - `key` - ключ поля
  - `order` - экземпляр класса *msOrderHandler*
- `msOnRemoveFromOrder` - после удаления поля заказа
  - `key` - ключ поля
  - `order` - экземпляр класса *msOrderHandler*
- `msOnBeforeEmptyOrder` - перед очисткой заказа
  - `order` - экземпляр класса *msOrderHandler*
- `msOnEmptyOrder` - после очистки заказа
  - `order` - экземпляр класса *msOrderHandler*
- `msOnBeforeGetOrderCost` - перед получением стоимости заказа
  - `order` - экземпляр класса *msOrderHandler*
  - `cart` - экземпляр класса *корзина*
  - `with_cart` - флаг *с учетом корзины*
  - `only_cost` - флаг *только стоимость*
- `msOnGetOrderCost` - после получения стоимости заказа
  - `order` - экземпляр класса *msOrderHandler*
  - `cart` - экземпляр класса *корзина*
  - `with_cart` - флаг *с учетом корзины*
  - `only_cost` - флаг *только стоимость*
  - `cost` - стоимость
  - `delivery_cost` - стоимость доставки
- `msOnSubmitOrder` - оформление заказа
  - `data` - данные заказа
  - `order` - экземпляр класса *msOrderHandler*
- `msOnBeforeChangeOrderStatus` - перед сменой статуса заказа
  - `order` - объект *msOrder*
  - `status` - новый идентификатор статуса
  - `old_status` - текущий идентификатор статуса
- `msOnChangeOrderStatus` - после смены статуса заказа
  - `order` - объект *msOrder*
  - `status` - новый идентификатор статуса
  - `old_status` - предыдущий идентификатор статуса
- `msOnBeforeGetOrderCustomer` - перед получением пользователя заказа
  - `order` - экземпляр класса *msOrderHandler*
  - `customer` - `null` (пользователь ещё не определён)
- `msOnGetOrderCustomer` - после получения пользователя заказа
  - `order` - экземпляр класса *msOrderHandler*
  - `customer` - объект *modUser* (или `null`)
- `msOnBeforeCreateOrder` - перед созданием заказа
  - `msOrder` - объект *msOrder*
  - `order` - экземпляр класса *msOrderHandler*
- `msOnCreateOrder` - после создания заказа
  - `msOrder` - объект *msOrder*
  - `order` - экземпляр класса *msOrderHandler*
- `msOnBeforeMgrCreateOrder` - перед созданием заказа из панели управления
  - `object` - объект *msOrder*
- `msOnMgrCreateOrder` - после создания заказа из панели управления
  - `object` - объект *msOrder*
- `msOnBeforeUpdateOrder` - перед обновлением заказа из панели управления
  - `object` - объект *msOrder*
- `msOnUpdateOrder` - после обновления заказа из панели управления
  - `object` - объект *msOrder*
- `msOnBeforeSaveOrder` - перед сохранением заказа (модель)
- `msOnSaveOrder` - после сохранения заказа (модель)
  - `mode` - режим сохранения new или upd
  - `object` - объект *msOrder*
  - `msOrder` - объект *msOrder*
  - `cacheFlag` - флаг кеширования
- `msOnBeforeRemoveOrder` - перед удалением заказа (модель)
- `msOnRemoveOrder` - после удаления заказа (модель)
  - `id` - id записи
  - `object` - объект *msOrder*
  - `msOrder` - объект *msOrder*
  - `ancestors` - массив where, переданный в метод

### События продуктов заказа

- `msOnBeforeCreateOrderProduct` - перед созданием продукта заказа
  - `object` - объект *msOrderProduct*
- `msOnCreateOrderProduct` - после создания продукта заказа
  - `object` - объект *msOrderProduct*
- `msOnBeforeUpdateOrderProduct` - перед обновлением продукта заказа
  - `object` - объект *msOrderProduct*
- `msOnUpdateOrderProduct` - после обновления продукта заказа
  - `object` - объект *msOrderProduct*
- `msOnBeforeRemoveOrderProduct` - перед удалением продукта заказа
  - `object` - объект *msOrderProduct*
- `msOnRemoveOrderProduct` - после удаления продукта заказа
  - `object` - объект *msOrderProduct*

### События товаров

- `msOnGetProductFields` - манипуляции с товаром на вывод
  - `product` - объект *msProductData*
  - `data` - массив данных
- `msOnGetProductPrice` - получение цены продукта
  - `product` - объект *msProductData*
  - `data` - данные продукта
  - `price` - цена продукта
- `msOnGetProductWeight` - получение веса продукта
  - `product` - объект *msProductData*
  - `data` - данные продукта
  - `weight` - вес продукта

### События менеджера

- `msOnManagerCustomCssJs` - загрузка скриптов *minishop2*
  - `controller` - экземпляр класса *контроллер*
  - `page` - идентификатор страницы

- `msOnBeforeVendorCreate` - перед созданием нового производителя
  - `mode` - для данного события = new
  - `data` - данные вендора
  - `object` - объект *msVendor*

- `msOnAfterVendorCreate` - после создания нового производителя
  - `mode` - для данного события = new
  - `id` - id созданного вендора
  - `data` - данные вендора
  - `object` - объект *msVendor*

- `msOnBeforeVendorUpdate` - перед обновлением производителя
  - `mode` - для данного события = upd
  - `data` - данные вендора
  - `id` - id вендора
  - `object` - объект *msVendor*

- `msOnAfterVendorUpdate` - после обновления производителя
  - `mode` - для данного события = upd
  - `id` - id вендора
  - `object` - объект *msVendor*

- `msOnBeforeVendorDelete` - перед удалением производителя
  - `id` - id вендора
  - `object` - объект *msVendor*

- `msOnAfterVendorDelete` - после удаления производителя
  - `id` - id вендора
  - `object` - объект *msVendor*

## Работа с событиями

По большей части события и передаваемые в них данные позволяют вмешаться в процесс, без необходимости править исходный PHP класс и на лету изменить данные.
Некоторые события предусматривают возможность остановки процесса и возврата ошибки.  Все зависит от того, как вызывается событие, и что происходит с результатом работы этого события, если такой результат есть.

Рассмотрим несколько примеров.

*Вы можете предотвратить добавление товара в корзину, создав плагин на событие `msOnBeforeAddToCart`*
Достаточно просто вернуть любой текст в метод
`$modx->event->_output`

```php
<?php

if ($modx->event->name = 'msOnBeforeAddToCart') {
  $modx->event->output('Error');
}
```

Еще пример. Вы можете "на лету" модифицировать переменные `$count` и `$options`  добавив нужные значения в `$modx->event->returnedValues`

```php
<?php

if ($modx->event->name = 'msOnBeforeAddToCart') {
  $values = & $modx->event->returnedValues;
  $values['count'] = $count + 10;
  $values['options'] = array('size' => '99');
}
```

Общее правило для плагинов.  Все входящие данные попадают сюда `$modx->event->returnedValues`

Взаимодействовать можно с числами, строками и массивами данных.
Если хотите что то на лету поменять, просто меняйте это в `$modx->event->returnedValues`

Для удобства можно создать переменную-ссылку  `$values = & $modx->event->returnedValues;`
Обратите внимание.  Ссылка со знаком & означает, что все что вы напишите в `$values` сразу же, без дополнительного сохранения появится  `$modx->event->returnedValues` и будет возвращена в класс, вызывающий событие.

### Как получить список всех входящих переменных

Это правило работает везде, с любым событием MODX.  Достаточно распечатать в лог такой код

```php
<?php
$modx->log(1, print_r(array_keys($scriptProperties), 1));
```

### Как вызвать нужно событие в собственном PHP классе

Вызываем нужное событие, передаем в него требуемые параметры.
Обратите внимание!  Событие плагина не регламентирует того, какие в него передавать параметры.
Никто не мешает вам в уже известное, зарегистрированное событие, передать абсолютно произвольный параметр, или наоборот передать меньше параметров чем это указано в документации.

```php
<?php
$params = array(
  'count' => 2,
);
$eventName = 'msOnAddToCart';
$modx->invokeEvent($eventName, $params);
```

В самом плагине модифицируем входящий `$count`
У нас есть два равнозначных подхода.  У обоих суть изменить глобальный массив `$modx->event->returnedValues`

```php
<?php
switch ($modx->event->name) {
case "msOnAddToCart":
  $sp = &$scriptProperties;
  $sp['count'] = 100;
  $modx->event->returnedValues = $sp;
  break;
}
```

```php
<?php
if ($modx->event->name = 'msOnAddToCart') {
  $values = & $modx->event->returnedValues;
  $values['count'] = $count + 10;
}
```

Далее возвращаемся в код, вызвавший событие.   Проверять нужно не $response, а доступный сразу глобально `$modx->event->returnedValues`

```php
<?php
//  Здесь count = 2
$params = array(
  'count' => 2,
);
$eventName = 'msOnAddToCart';
$modx->invokeEvent($eventName, $params);

// а вот здесь count уже изменился из плагина
$count = $modx->event->returnedValues['count']
```
