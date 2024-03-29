# msOrder

Сниппет оформления заказа.

[![](https://file.modx.pro/files/4/b/b/4bb767c02e0e7b09ddae5e426b34c7e6s.jpg)](https://file.modx.pro/files/4/b/b/4bb767c02e0e7b09ddae5e426b34c7e6.png)

## Параметры

| Параметр       | По умолчанию  | Описание                                                                                                             |
| -------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| **tpl**        | `tpl.msOrder` | Чанк оформления                                                                                                      |
| **userFields** |               | Ассоциативный массив соответствия полей заказа полям профиля пользователя в формате "поле заказа" => "поле профиля". |
| **showLog**    |               | Показывать дополнительную информацию о работе сниппета. Только для авторизованных в контексте "mgr".                 |

<!--@include: ../parts/tip-general-properties.md-->

## Оформление

Сниппет рассчитывает на работу с [чанком Fenom][1]. Он передаёт в него 5 переменных:

- **order** - массив заказа из сессии пользователя
  - **delivery** - выбранный способ доставки
  - **payment** - выбранный способ оплаты
  - **cost** - общая стоимость заказа
- **deliveries** - массив доступных свойств доставки заказа покупателю
- **payments** - массив способов оплаты
- **form** - массив с заполненными данными от покупателя. Там могут быть:
  - **email** - адрес покупателя
  - **receiver** - имя получателя
  - **phone** - телефон
  - **index** - почтовый индекс
  - **region** - область
  - **city** - город
  - **street** - улица
  - **building** - дом
  - **room** - комната
  - могут быть и другие значения, заданные при помощи параметра **&userFields**
- **errors** - массив полей формы, заполненных с ошибками

### Плейсхолдеры

Вы можете увидеть все доступные плейсхолдеры заказа просто указав пустой чанк:

```modx
<pre>[[!msOrder?tpl=``]]</pre>
```

::: details Пример

```php
Array
(
    [order] => Array
        (
            [cost] => 2 300
            [cart_cost] => 2 300
            [delivery_cost] => 0
            [discount_cost] => 0
        )

    [form] => Array
        (
            [receiver] => Ivan Ivanov
            [email] => ivanov@yandex.ru
        )

    [deliveries] => Array
        (
            [1] => Array
                (
                    [id] => 1
                    [name] => Самовывоз
                    [description] =>
                    [price] => 0
                    [weight_price] => 0.00
                    [distance_price] => 0.00
                    [logo] =>
                    [rank] => 0
                    [active] => 1
                    [class] =>
                    [properties] =>
                    [requires] => email,receiver
                    [free_delivery_amount] => 0.00
                    [payments] => Array
                        (
                            [0] => 1
                        )

                )

        )

    [payments] => Array
        (
            [1] => Array
                (
                    [id] => 1
                    [name] => Оплата наличными
                    [description] =>
                    [price] => 0
                    [logo] =>
                    [rank] => 0
                    [active] => 1
                    [class] =>
                    [properties] =>
                )

        )

    [errors] => Array
        (
        )

    [scriptProperties] => Array
        (
            [tpl] =>
            [userFields] =>
            [showLog] =>
        )

)
```

:::

## Создание заказа

Данный сниппет рекомендуется вызывать в связке с другими на странице оформления заказа:

```modx
[[!msCart]] <!-- Просмотр и изменение корзины, скрывается после создания заказа -->

[[!msOrder]] <!-- Форма оформления заказа, скрывается после его создания -->

[[!msGetOrder]] <!-- Вывод информации о заказе, показывается после его создания -->
```

## Примеры

Указываем получать имя авторизованного пользователя не из `fullname`, а из `username`:

```modx
[[!msOrder?
  &userFields=`{"receiver":"username"}`
]]
```

[1]: /components/pdotools/parser
