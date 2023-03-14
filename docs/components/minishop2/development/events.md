# События

## Доступны следующие события

* `msOnBeforeAddToCart`
  *`product` - объект  *msProduct*
  *`count` - кол-во продукта
  *`options` - массив опций
  *`cart` - экземпляр класса *корзина*
* `msOnAddToCart` - добавление продукта корзины
  *`key` - ключ продукта
  *`cart` - экземпляр класса *корзина*
* `msOnBeforeChangeInCart`
* `msOnChangeInCart` - изменение продукта корзины
  *`key` - ключ продукта
  *`count` - кол-во продукта
  *`cart` - экземпляр класса *корзина*
* `msOnBeforeRemoveFromCart`
* `msOnRemoveFromCart` - удаление продукта корзины
  *`key` - ключ продукта
  *`cart` - экземпляр класса *корзина*
* `msOnBeforeEmptyCart`
* `msOnEmptyCart` - очистка корзины
  *`cart` - экземпляр класса *корзина*
* `msOnGetStatusCart` - статус корзины
  *`status` - статус
  *`cart` - экземпляр класса *корзина*
* `msOnBeforeAddToOrder`
* `msOnAddToOrder` - добавление поля заказа
  *`key` - ключ поля
  *`value` - значение поля
  *`order` - экземпляр класса *заказ*
* `msOnBeforeValidateOrderValue`
* `msOnValidateOrderValue` - валидация поля заказа
  *`key` - ключ поля
  *`value` - значение поля
  *`order` - экземпляр класса *заказ*
* `msOnBeforeRemoveFromOrder`
* `msOnRemoveFromOrder` - удаление поля заказа
  *`key` - ключ поля
  *`order` - экземпляр класса *заказ*
* `msOnBeforeEmptyOrder`
* `msOnEmptyOrder` - очистка заказа
  *`order` - экземпляр класса *заказ*
* `msOnBeforeGetOrderCost`
  *`order` - экземпляр класса *заказ*
  *`cart` - экземпляр класса *корзина*
  *`with_cart` - флаг *с учетом корзины*
  *`only_cost` - флаг *только стоимость*
* `msOnGetOrderCost` - получение стоимости заказа
  *`order` - экземпляр класса *заказ*
  *`cart` - экземпляр класса *корзина*
  *`with_cart` - флаг *с учетом корзины*
  *`only_cost` - флаг *только стоимость*
  *`cost` - стоимость
  *`delivery_cost` - стоимость доставки
* `msOnSubmitOrder` - оформление заказа
  *`data` - данные заказа
  *`order` - экземпляр класса *заказ*
* `msOnBeforeChangeOrderStatus`
* `msOnChangeOrderStatus` - смена статуса заказа
  *`order` - объект *msOrder*
  *`status` - идентификатор статуса
* `msOnBeforeGetOrderCustomer`
* `msOnGetOrderCustomer` - получение пользователя заказа
  *`order` - экземпляр класса *заказ*
  *`customer` - объект *modUser*
* `msOnBeforeCreateOrder`
* `msOnCreateOrder` - создание заказа
  *`order` - экземпляр класса *заказ*
  *`msOrder` - объект *msOrder*
* `msOnBeforeUpdateOrder`
* `msOnUpdateOrder` - обновление заказа
  *`msOrder` - объект *msOrder*
* `msOnBeforeSaveOrder`
* `msOnSaveOrder` - сохранение заказа
  *`mode` - режим сохранения new или upd
  *`object` - объект *msOrder*
  *`msOrder` - объект *msOrder*
  *`cacheFlag` - флаг кеширования
* `msOnBeforeRemoveOrder`
* `msOnRemoveOrder` - удаление заказа
  *`id` - id записи
  *`object` - объект *msOrder*
  *`msOrder` - объект *msOrder*
  *`ancestors` - массив where, переданный в метод
* `msOnBeforeCreateOrderProduct`
* `msOnCreateOrderProduct` - создание продукта заказа
  *`msOrderProduct` - объект *msOrderProduct*
* `msOnBeforeUpdateOrderProduct`
* `msOnUpdateOrderProduct` - обновление продукта заказа
  *`msOrderProduct` - объект *msOrderProduct*
* `msOnBeforeRemoveOrderProduct`
* `msOnRemoveOrderProduct` - удаление продукта заказа
  *`msOrderProduct` - объект *msOrderProduct*

* `msOnGetProductFields` - манипуляции с товаром на вывод
  *`product` - объект *msProductData*
  * `data` - массив данных
* `msOnGetProductPrice` - получение цены продукта
  *`product` - объект *msProductData*
  *`data` - данные продукта
  *`price` - цена продукта
* `msOnGetProductWeight` - получение веса продукта
  *`product` - объект *msProductData*
  *`data` - данные продукта
  *`weight` - вес продукта

* `msOnManagerCustomCssJs` - загрузка скриптов *minishop2*
  *`controller` - экземпляр класса *контроллер*
  *`page` - идентификатор страницы

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

Общее правило для плагинов.  Все входящие данные попадают сюда
`$modx->event->returnedValues`

Взаимодействатвать можно с числами, строками и массивами данных.
Если хотите что то на лету поменять, просто меняйте это в `$modx->event->returnedValues`

Для удобства можно создать переменную-ссылку  `$values = & $modx->event->returnedValues;`
Обратите внимание.  Ссылка со знаком & означает, что все что вы напишите в `$values` сразу же, без дополнительного сохранения появится  `$modx->event->returnedValues` и будет возвращена в класс, вызывающий событие.

### Как получить список всех входящих переменных

Это правило работает везде, с любым событием MODX.  Достаточно распечатать в лог такой код

```php
<?php
$modx->log(1, print_r(array_keys($scriptProperties), 1));
```

### Как вызвать нужно событие в собственном PHP классе.

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
