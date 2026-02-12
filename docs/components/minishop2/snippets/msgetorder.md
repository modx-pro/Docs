# msGetOrder

Сниппет вывода оформленного заказа.

Используется на странице оформления заказа и отправки почтовых уведомлений покупателям.

## Параметры

| Параметр          | По умолчанию     | Описание                                                                                                                                                                                         |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **id**            |                  | Идентификатор заказа, если не задан, то берется из `$_GET['msorder']`.                                                                                                                           |
| **tpl**           | `tpl.msGetOrder` | Чанк оформления                                                                                                                                                                                  |
| **includeTVs**    |                  | Список ТВ параметров для выборки, через запятую. Например: "action,time" дадут плейсхолдеры `[[+action]]` и `[[+time]]`.                                                                         |
| **includeThumbs** |                  | Список размеров превьюшек для выборки, через запятую. Например: "120x90,360x240" дадут плейсхолдеры `[[+120x90]]` и `[[+360x240]]`. Картинки должны быть заранее сгенерированы в галерее товара. |
| **includeContent**|                  | Выбирать поле "content" у товаров.                                                                                                                                                               |
| **toPlaceholder** |                  | Если не пусто, сниппет сохранит все данные в плейсхолдер с этим именем, вместо вывода не экран.                                                                                                  |
| **payStatus**     | `1`              | Статусы заказа (через запятую), при которых отображается ссылка на оплату.                                                                                                                       |
| **showLog**       | `false`          | Показывать дополнительную информацию о работе сниппета. Только для авторизованных в контекcте "mgr".                                                                                             |

<!--@include: ../parts/tip-general-properties.md-->

## Оформление

Сниппет рассчитывает на работу с [чанком Fenom][2] и передаёт в него 7 переменных:

- **order** - массив с данными заказа из объекта `msOrder`
- **products** - массив заказанных товаров со всеми их свойствами
- **user** - массив данных из объектов `modUser` и `modUserProfile` со всеми свойствами покупателя
- **address** - массив данных из объекта `msAddress` со указанными данными для доставки
- **delivery** - массив со свойствами выбранной доставки из объекта `msDelivery`
- **payment** - массив со свойствами выбранной оплаты из объекта `msPayment`
- **total** - массив с итоговыми данными заказа:
  - **cost** - общая стоимость заказа
  - **weight** - общий вес заказа
  - **delivery_cost** - отдельная стоимость доставки
  - **cart_cost** - отдельная стоимость заказанных товаров
  - **cart_weight** - общий вес заказанных товаров
  - **cart_count** - количество заказанных товаров
  - **cart_discount** - общая сумма скидки

*Так же могут присутствовать и данные, переданные при вызове сниппета.
Например, в чанке оформления новых писем может быть переменная `payment_link`*

### Плейсхолдеры

Вы можете увидеть все доступные плейсхолдеры заказа просто указав пустой чанк:

```modx
<pre>[[!msGetOrder?tpl=``]]</pre>
```

::: details Пример

```php
Array
(
    [tpl] =>
    [includeTVs] =>
    [includeThumbs] =>
    [toPlaceholder] =>
    [showLog] =>
    [order] => Array
        (
            [id] => 1
            [user_id] => 2
            [session_id] =>
            [createdon] => 2023-11-05 08:31:47
            [updatedon] =>
            [num] => 2311/1
            [cost] => 2100
            [cart_cost] => 2100
            [delivery_cost] => 0
            [weight] => 0
            [status] => 1
            [delivery] => 1
            [payment] => 1
            [context] => web
            [order_comment] =>
            [properties] =>
            [type] => 0
        )

    [products] => Array
        (
            [0] => Array
                (
                    [id] => 4
                    [type] => document
                    [contentType] => text/html
                    [pagetitle] => Товар 1
                    [longtitle] =>
                    [description] =>
                    [alias] => товар-1
                    [alias_visible] => 1
                    [link_attributes] =>
                    [published] => 1
                    [pub_date] => 0
                    [unpub_date] => 0
                    [parent] => 3
                    [isfolder] => 0
                    [introtext] =>
                    [richtext] => 1
                    [template] => 1
                    [menuindex] => 0
                    [searchable] => 1
                    [cacheable] => 1
                    [createdby] => 1
                    [createdon] => 1699161918
                    [editedby] => 0
                    [editedon] => 0
                    [deleted] => 0
                    [deletedon] => 0
                    [deletedby] => 0
                    [publishedon] => 1699161918
                    [publishedby] => 1
                    [menutitle] =>
                    [donthit] => 0
                    [privateweb] => 0
                    [privatemgr] => 0
                    [content_dispo] => 0
                    [hidemenu] => 0
                    [class_key] => msProduct
                    [context_key] => web
                    [content_type] => 1
                    [uri] =>
                    [uri_override] => 0
                    [hide_children_in_tree] => 0
                    [show_in_tree] => 0
                    [properties] =>
                    [article] =>
                    [price] => 500
                    [old_price] => 0
                    [weight] => 0
                    [image] =>
                    [thumb] =>
                    [vendor] => 0
                    [made_in] =>
                    [new] => 0
                    [popular] => 0
                    [favorite] => 0
                    [tags] =>
                    [color] =>
                    [size] =>
                    [source] => 2
                    [original_price] => 500.00
                    [vendor.name] =>
                    [vendor.resource] =>
                    [vendor.country] =>
                    [vendor.logo] =>
                    [vendor.address] =>
                    [vendor.phone] =>
                    [vendor.fax] =>
                    [vendor.email] =>
                    [vendor.description] =>
                    [vendor.properties] =>
                    [vendor.rank] =>
                    [product_id] => 4
                    [order_id] => 1
                    [name] => Товар 1
                    [count] => 3
                    [cost] => 1 500
                    [options] => Array
                        (
                        )

                    [order_product_id] => 1
                    [discount_price] => 0
                    [discount_cost] => 0
                )

            [1] => Array
                (
                    [id] => 5
                    [type] => document
                    [contentType] => text/html
                    [pagetitle] => Товар 2
                    [longtitle] =>
                    [description] =>
                    [alias] => товар-1
                    [alias_visible] => 1
                    [link_attributes] =>
                    [published] => 1
                    [pub_date] => 0
                    [unpub_date] => 0
                    [parent] => 3
                    [isfolder] => 0
                    [introtext] =>
                    [richtext] => 1
                    [template] => 1
                    [menuindex] => 0
                    [searchable] => 1
                    [cacheable] => 1
                    [createdby] => 1
                    [createdon] => 1699161930
                    [editedby] => 1
                    [editedon] => 1699161941
                    [deleted] => 0
                    [deletedon] => 0
                    [deletedby] => 0
                    [publishedon] => 1699161900
                    [publishedby] => 1
                    [menutitle] =>
                    [donthit] => 0
                    [privateweb] => 0
                    [privatemgr] => 0
                    [content_dispo] => 0
                    [hidemenu] => 0
                    [class_key] => msProduct
                    [context_key] => web
                    [content_type] => 1
                    [uri] =>
                    [uri_override] => 0
                    [hide_children_in_tree] => 0
                    [show_in_tree] => 0
                    [properties] =>
                    [article] =>
                    [price] => 600
                    [old_price] => 0
                    [weight] => 0
                    [image] =>
                    [thumb] =>
                    [vendor] => 0
                    [made_in] =>
                    [new] => 0
                    [popular] => 1
                    [favorite] => 0
                    [tags] =>
                    [color] =>
                    [size] =>
                    [source] => 2
                    [original_price] => 600.00
                    [vendor.name] =>
                    [vendor.resource] =>
                    [vendor.country] =>
                    [vendor.logo] =>
                    [vendor.address] =>
                    [vendor.phone] =>
                    [vendor.fax] =>
                    [vendor.email] =>
                    [vendor.description] =>
                    [vendor.properties] =>
                    [vendor.rank] =>
                    [product_id] => 5
                    [order_id] => 1
                    [name] => Товар 2
                    [count] => 1
                    [cost] => 600
                    [options] => Array
                        (
                        )

                    [order_product_id] => 2
                    [discount_price] => 0
                    [discount_cost] => 0
                )

        )

    [user] => Array
        (
            [id] => 2
            [internalKey] => 2
            [fullname] => Ivan Ivanov
            [email] => ivanov@yandex.ru
            [phone] =>
            [mobilephone] =>
            [blocked] =>
            [blockeduntil] => 0
            [blockedafter] => 0
            [logincount] => 0
            [lastlogin] => 0
            [thislogin] => 0
            [failedlogincount] => 0
            [sessionid] =>
            [dob] => 0
            [gender] => 0
            [address] =>
            [country] =>
            [city] =>
            [state] =>
            [zip] =>
            [fax] =>
            [photo] =>
            [comment] =>
            [website] =>
            [extended] =>
            [username] => ivanov@yandex.ru
            [password] => password
            [cachepwd] =>
            [class_key] => modUser
            [active] => 1
            [remote_key] =>
            [remote_data] =>
            [hash_class] => hashing.modNative
            [salt] => e4asd6as62119s6w8aad9a9f5ed174f57325
            [primary_group] => 0
            [session_stale] =>
            [sudo] =>
            [createdon] => 2023-11-05 08:31:47
        )

    [address] => Array
        (
            [id] => 1
            [order_id] => 1
            [user_id] => 2
            [createdon] => 2023-11-05 08:31:47
            [updatedon] =>
            [receiver] => Ivan Ivanov
            [phone] =>
            [email] => ivanov@yandex.ru
            [country] =>
            [index] =>
            [region] =>
            [city] =>
            [metro] =>
            [street] =>
            [building] =>
            [entrance] =>
            [floor] =>
            [room] =>
            [comment] =>
            [text_address] =>
            [properties] =>
        )

    [delivery] => Array
        (
            [id] => 1
            [name] => Самовывоз
            [description] =>
            [price] => 0
            [weight_price] => 0
            [distance_price] => 0
            [logo] =>
            [rank] => 0
            [active] => 1
            [class] =>
            [properties] =>
            [requires] => email,receiver
            [free_delivery_amount] => 0
        )

    [payment] => Array
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

    [total] => Array
        (
            [cost] => 2 100
            [cart_cost] => 2 100
            [delivery_cost] => 0
            [weight] => 0
            [cart_weight] => 0
            [cart_count] => 4
            [cart_discount] => 0
        )

    [scriptProperties] => Array
        (
            [tpl] =>
            [includeTVs] =>
            [includeThumbs] =>
            [toPlaceholder] =>
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

## Оформление писем

Этот сниппет используется классом miniShop2 для оформления почтовых уведомлений покупателям, если вы включили их отправку в [настройках статусов][3].
Все переменные сниппета `msGetOrder`: **order**, **products**, **user**, **address**, **delivery**, **payment** и **total** также доступны для использования в письмах почтовых уведомлений.

По умолчанию все письма расширяют один базовый почтовый шаблон **tpl.msEmail** и меняют заданные в нём блоки:

- **logo** - логотип магазина со ссылкой на главную страницу
- **title** - заголовок письма
- **products** - таблица заказанные товаров
- **footer** - ссылка на сайте в подвале письма

Например, письмо с новым заказом покупателю выглядит так:

```fenom
{extends 'tpl.msEmail'}

{block 'title'}
  {'ms2_email_subject_new_user' | lexicon : $order}
{/block}

{block 'products'}
  {parent}
  {if $payment_link?}
    <p style="margin-left:20px;{$style.p}">
      {'ms2_payment_link' | lexicon : ['link' => $payment_link]}
    </p>
  {/if}
{/block}
```

Как видите, здесь наследуется основной шаблон, меняется заголовок, а к таблице товаров добавляется ссылка на оплату (если есть).

[![](https://file.modx.pro/files/b/1/c/b1c563c0b075caf2afce7609ac3f15e4s.jpg)](https://file.modx.pro/files/b/1/c/b1c563c0b075caf2afce7609ac3f15e4.png)

Подробнее о расширении шаблонов вы можете прочитать в [документации Fenom][4].

[2]: /components/pdotools/parser
[3]: /components/minishop2/interface/settings
[4]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
