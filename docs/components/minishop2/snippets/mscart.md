# msCart

Сниппет предназначен для вывода корзины покупателя.

[![](https://file.modx.pro/files/4/d/8/4d8ddea00da1c2ff10c94720ee26a588s.jpg)](https://file.modx.pro/files/4/d/8/4d8ddea00da1c2ff10c94720ee26a588.png)

## Параметры

| Параметр          | По умолчанию | Описание                                                                                                                                                                                         |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **tpl**           | `tpl.msCart` | Чанк оформления                                                                                                                                                                                  |
| **includeTVs**    |              | Список ТВ параметров для выборки, через запятую. Например: "action,time" дадут плейсхолдеры `[[+action]]` и `[[+time]]`.                                                                         |
| **includeThumbs** |              | Список размеров превьюшек для выборки, через запятую. Например: "120x90,360x240" дадут плейсхолдеры `[[+120x90]]` и `[[+360x240]]`. Картинки должны быть заранее сгенерированы в галерее товара. |
| **toPlaceholder** |              | Если не пусто, сниппет сохранит все данные в плейсхолдер с этим именем, вместо вывода не экран.                                                                                                  |
| **showLog**       |              | Показывать дополнительную информацию о работе сниппета. Только для авторизованных в контексте "mgr".                                                                                             |

<!--@include: ../parts/tip-general-properties.md-->

## Оформление

Сниппет рассчитывает на работу с чанком Fenom. Он передаёт в него 2 переменные:

- **total** - массив итоговых значений корзины, в котором:
  - **count** - количество товаров
  - **cost** - стоимость товаров
  - **weight** - общий вес товаров
- **products** - массив товаров корзины, каждый из них содержит:
  - **key** - ключ товара в корзине, хэш от его значений и опций
  - **count** - количество товара
  - **cost** - стоимость одной единицы
  - **id** - идентификатор товара
  - **pagetitle** - название страницы товара
  - **uri** - адрес товара
  - прочие свойства товара, включая опции, свойства производителя и т.д.

### Плейсхолдеры

Вы можете увидеть все свойства товаров и итоговых значений просто указав пустой чанк:

```modx
<pre>[[!msCart?tpl=``]]</pre>
```

::: details Пример

```php
Array
(
    [total] => Array
        (
            [count] => 4
            [weight] => 0
            [cost] => 2 100
            [discount] => 0
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
                    [key] => ms71f884312767d1249c9093a3aad9b168
                    [count] => 3
                    [cost] => 1 500
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
                    [key] => msb2f01124a10b7f46a6b4e58e999a69bc
                    [count] => 1
                    [cost] => 600
                    [discount_price] => 0
                    [discount_cost] => 0
                )

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

Также для отладки можно использовать [модификатор print][2]. Просто создайте чанк `TestCart` и укажите в нём:

```fenom
{$total | print}
{foreach $products as $product}
  {$product | print}
{/foreach}
```

Затем вызовите его в корзине:

```modx
[[!msCart?
  &tpl=`TestCart`
]]
```

И вы увидите все доступные плейсхолдеры.

## Создание заказа

Данный сниппет рекомендуется вызывать в связке с другими на странице оформления заказа:

```modx
[[!msCart]] <!-- Просмотр и изменение корзины, скрывается после создания заказа -->

[[!msOrder]] <!-- Форма оформления заказа, скрывается после его создания -->

[[!msGetOrder]] <!-- Вывод информации о заказе, показывается после его создания -->
```

[2]: /components/pdotools/parser
