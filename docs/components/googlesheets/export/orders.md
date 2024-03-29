# Заказы (msOrder)

## Стандартные поля

| Поле          | Название               |
| ------------- | ---------------------- |
| id            | Id Заказа              |
| user_id       | Покупатель (id)        |
| createdon     | Дата создание заказа   |
| updatedon     | Дата обновление заказа |
| num           | Номер заказа           |
| cost          | Общая цена с доставкой |
| cart_cost     | Стоимость покупок      |
| delivery_cost | Цена доставки          |
| weight        | Вес                    |
| status        | Статус (id)            |
| delivery      | Доставка (id)          |
| payment       | Оплата (id)            |
| context       | Контекст               |
| comment       | Комментарий менеджера  |

### Модификации полей

| Поле          | Название            |
| ------------- | ------------------- |
| status_name   | Статус (название)   |
| delivery_name | Доставка (название) |
| payment_name  | Оплата (название)   |

## Address

| Поле               | Название                |
| ------------------ | ----------------------- |
| address_receiver   | Получатель              |
| address_phone      | Телефон                 |
| address_country    | Страна                  |
| address_index      | Почтовый индекс         |
| address_region     | Область                 |
| address_city       | Город                   |
| address_metro      | Станция метро           |
| address_street     | Улица                   |
| address_building   | Здание                  |
| address_room       | Комната                 |
| address_comment    | Комментарий             |
| address_properties | Дополнительные свойства |

## User

Поддерживаются все стандартные поля пользователя, но с префиксом **user_**.
Например: user_email,user_fullname

## Список купленных товаров

| Поле                | Название                 |
| ------------------- | ------------------------ |
| products_(имя поля) | Список купленных товаров |

Например:

* **products_id** выведет список id товаров
* **products_name** выведет список названий товаров

## Пример экспорта

**Поля экспорта:** id,num,user_username,status_name,cart_cost,products_name

**Результат:**

![Результат](https://file.modx.pro/files/9/3/b/93bed6c24decff7d8598b9819d82d080.jpg)

## Системные события

Класс **gsOrder** генерирует следующие события:

```php
<?php
switch($modx->event->name) {
  // получение списка заказов
  case 'gsOnBeforeGetOrders':
    // $query - запрос выборки
    // $range - название листа таблицы, куда будут экспортироваться данные
    break;
  case 'gsOnGetOrders':
    // $orders - массив заказов со всеми полями
    // $range - название листа
    break;
}
```

### Примеры

1. Получаем все заказы со статусом 2 (Оплачен)

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetOrders') {
      $query->where(array('status' => 2));
    }
    ```

2. Преобразуем дату создания заказа **createdon**

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetOrders') {
      $modx->event->params['orders'] = array_map(function($order){
        if (!empty($order['createdon'])) {
          $order['createdon'] = date("d-m-Y",strtotime($order['createdon']));
        }
        return $order;
      }, $orders);
    }
    ```
