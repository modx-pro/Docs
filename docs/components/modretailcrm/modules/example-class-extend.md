# Пример расширения класса

Для того, чтобы можно было индивидуально конфигурировать передаваемую в RetailCRM информацию, и при этом не переживать о том, что при обновлении ваш код будет затерт - предусмотрена модульная система.
На данный момент доступны два класса-модуля, которые можно наследовать и конфигурировать по своему.

- **Orders** (управляет сбором и передачей информации о заказе),
- **Customers** (сбор и передача информации о клиенте).

Давайте разберемся как настроить и подключить свой собственный модуль.
Оба модуля расширяются идентично, потому для примера рассмотрим только один случай.
Для примера будем создавать свой модуль управления заказами

## Шаг 1

Создаем новый php файл в любом месте вашего проекта. Например в каталоге `/core/components/modretailcrm/model/modretailcrm/`.

Назовем его **custom_orders.php**

## Шаг 2

Открываю свежесозданный файл и начинаю заполнять

```php
<?php

// Подключаю основной класс управления заказами. Мы будем его наследовать
if (!class_exists('ordersInterface')) {
  require_once dirname(__FILE__) . '/orders.class.php';
}

// Объявляю свой класс. Он должен наследовать родительский класс и реализовывать определенный интерфейс
class Custom_orders extends Orders implements ordersInterface {

  // Интерфейс  ordersInterface  требует чтобы в классе обязательно был метод  msOnCreateOrder
  public function msOnCreateOrder($msOrder)
  {
    // Для начала можно вызвать родительский метод и ничего больше не делать.
    parent::msOnCreateOrder($msOrder);
  }
}
```

## Шаг 3

Заполняем системную настройку **modretailcrm_custom_orders_class** указываем имя кастомного класса и его расположение.

Я пока не делал специального инструмента для быстрого заполнения этой системной настройки, как это сделано в miniShop2, потому придется выполнить в консоли простенький скрипт следующего содержания

```php
$value = array(
  // Имя класса
  'Custom_orders',
  // Путь к классу, включая имя файла
  '{core_path}components/modretailcrm/model/modretailcrm/custom_orders.php'
);

$setting = $modx->getObject('modSystemSetting', array('key' => 'modretailcrm_custom_orders_class'));
$setting->set('value', json_encode($value));
$setting->save();
```

После выполнения этого кода, по идее мы уже задействовали свой собственный класс, который можем как хотим кастомизировать. При этом сам компонент будет без проблем обновляться и поддерживать в актуальном состоянии главный класс приложения, вспомогательные классы и скрипты.

## Шаг 4

Изменяю метод **msOnCreateOrder** в моем новом кастомном файле, чтобы реализовать свою собственную дополнительную логику

```php
<?php

// Подключаю основной класс управления заказами. Мы будем его наследовать
if (!class_exists('ordersInterface')) {
  require_once dirname(__FILE__) . '/orders.class.php';
}

// Объявляю свой класс. Он должен наследовать родительский класс и реализовывать определенный интерфейс
class Custom_orders extends Orders implements ordersInterface {

  // Интерфейс ordersInterface требует чтобы в классе обязательно был метод msOnCreateOrder
  public function msOnCreateOrder($msOrder)
  // Главный метод пока не трогаю
  {
    // Для начала можно вызвать родительский метод и ничего больше не делать.
    parent::msOnCreateOrder($msOrder);
  }

  // Переписываю метод сбора данных о заказе, добавляю туда информацию о свежевыпеченном msPromoCode2
  /**
   * @param xPDOObject $msOrder
   * @return mixed
   */
  public function orderCombine($msOrder)
  {
    $pdo =& $this->pdo;
    $order = $msOrder->toArray();
    $order['address'] = $pdo->getArray('msOrderAddress', array('id' => $order['address']), array('sortby' => 'id'));
    $order['delivery'] = $pdo->getArray('msDelivery', array('id' => $order['delivery']), array('sortby' => 'id'));
    $order['payment'] = $pdo->getArray('msPayment', array('id' => $order['payment']), array('sortby' => 'id'));
    $order['profile'] = $pdo->getArray('modUserProfile', array('internalKey' => $order['user_id']), array('sortby' => 'id'));
    $order['products'] = $pdo->getCollection('msOrderProduct', array('order_id' => $order['id']), array('sortby' => 'id'));
    // Теперь я могу работать с информацией о примененному к заказу промокоду
    $order['sale'] = $pdo->getArray('mspc2CouponOrder', array('order' => $order['id']));

    return $order;
  }
}
```
