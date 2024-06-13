---
title: msAltCart
description: динамическая корзина для MiniShop2 с JS API.
outline: [ 2,3 ]
lastUpdated: true
logo: https://msaltcart.art-sites.ru/assets/components/msaltcart/logo.jpg
modstore: https://modstore.pro/packages/integration/msaltcart
repository: https://github.com/ShevArtV/msaltcart
author: ShevArtV
items: [
  { text: 'Начало работы', link: 'index' },
  { text: 'Сниппеты', link: 'snippets' },
  { text: 'JavaScript', link: 'javascript' },
  { text: 'Поле ввода типа число', link: 'inputnumber' },

]
dependencies: [ 'pdoTools', 'SendIt', 'miniShop2' ]
---

# msAltCart
На этой странице представлены примеры чанков, описание атрибутов и вызов сниппета. Навигация в правом сайдбаре поможет перейти к описанию нужного шага.
::: danger
Компонент некорректно работает с другими компонентами, меняющими ключи товаров в корзине, например, с msPromoCode2.
:::
::: warning
Перед установкой компонента убедитесь, что у вас уже установлены **pdoTools**, **SendIt**, **miniShop2**.
:::
::: tip
Данный компонент может заменить и основную корзину. В нём есть поддержка стандартных JS событий из miniShop2. Однако совместимость с другими дополнениями не тестировалась,
поэтому применение этого кейса может привести к поломке какой-либо функциональности, предоставляемой другими компонентами, в том числе связанным с оформлением заказов.
:::

## Системные требования
1. miniShop2 >= 3.0.7
2. SendIt >= 2.0.2
3. PHP >= 7.4 (работа на PHP 8 не тестировалась, но IDE ошибок не нашла).


## Возможности

1. Вывод любого количества корзин на одной страницы.
2. Динамическое обновление всех корзин.
3. Каждая корзина может иметь собственный шаблон.
4. Изменение опций в корзине.
5. JS API для программного управления корзиной.
6. Получение статуса и состава корзины на фронте.
7. Изменение логики работы посредством JS событий.
8. Есть поддержка модификаций msOptionsPrice2.
9. Кастомизация поля ввода количества.

## Особенности
1. Компонент заменяет стандартный класс-обработчик корзины на свой.
2. Компонент делает метод getProductKey() публичным.
3. Компонент добавляет плагин на событие **msOnCreateOrder**, меняющий имя товара на имя модификации, если таковая была выбрана.

## Базовое использование
Добавим динамическую корзину, которая будет появляться из-за экрана слева в элементе [offcanvas](https://bootstrap-4.ru/docs/5.0/components/offcanvas/).

:::warning
В примере ниже будет рассмотрен пример созданный с помощью Bootstrap 5, если хотите чтобы на вашем сайте всё заработало подключите скрипты и стили Bootstrap 5 по инструкции из
[документации](https://bootstrap-4.ru/docs/5.0/getting-started/download/#cdn-via-jsdelivr)
:::

:::danger
Одновременное использование стандартных для miniShop2 атрибутов и атрибутов данного компонента недопустимо. Исключение можно сделать только для класса **ms2_form**
:::

### Порядок действий
1. Создаём чанк-обёртку(wrapper).
2. Создаём чанк товара(row) (опционально).
3. В шаблоне вызываем сниппет [getCarts](https://docs.modx.pro/components/msaltcart/snippets#getcarts).
4. Вставляем плейсхолдер там, где должна быть динамическая корзина.
5. Пользуемся.

## Чанк-обертка(wrapper)

```fenom:line-numbers
<div data-msac-rows class="{!$rows ? 'd-none':''}">
    {$rows}
</div>
<div class="col-12 {!$rows ? 'd-none':''}" data-msac-totals>
    <div class="row">
        <p class="col-5 mb-3 h6">Сумма: <br><span  data-msac-prop="total_cost">{$total.cost}</span> {'ms2_frontend_currency' | lexicon}</p>
        <p class="col-3 mb-3 h6">Вес: <br><span data-msac-prop="total_weight">{$total.weight}</span> {'ms2_frontend_weight_unit' | lexicon}</p>
        <p class="col-4 mb-3 h6">Кол-во: <br><span data-msac-prop="total_count">{$total.count}</span> {'ms2_frontend_count_unit' | lexicon}</p>
        <div class="col-6">
            <button class="btn btn-danger" type="button" data-si-form data-si-preset="cart_clean" data-si-event="click">
                {'ms2_cart_clean' | lexicon}
            </button>
        </div>
        <div class="col-6">
            <a href="{179 | url}" class="btn btn-primary">Оформить заказа</a>
        </div>
    </div>
</div>

<div class="alert alert-warning {$rows ? 'd-none':''}" data-msac-empty>
    {'ms2_cart_is_empty' | lexicon}
</div>
```

Этот чанк содержит три **отдельных** блока обозначенных соответствующими атрибутами.

### Список товаров
**data-msac-rows** - блок вывода списка товаров, если не указан - товары выведены не будут.

```fenom:line-numbers
<div data-msac-rows class="{!$rows ? 'd-none':''}">
    {$rows}
</div>
```

### Суммарные значения
**data-msac-totals** - блок вывода суммарных значений цены, веса и количества.

```fenom:line-numbers
<div class="col-12 {!$rows ? 'd-none':''}" data-msac-totals>
    <div class="row">
        <p class="col-5 mb-3 h6">Сумма: <br><span  data-msac-prop="total_cost">{$total.cost}</span> {'ms2_frontend_currency' | lexicon}</p>
        <p class="col-3 mb-3 h6">Вес: <br><span data-msac-prop="total_weight">{$total.weight}</span> {'ms2_frontend_weight_unit' | lexicon}</p>
        <p class="col-4 mb-3 h6">Кол-во: <br><span data-msac-prop="total_count">{$total.count}</span> {'ms2_frontend_count_unit' | lexicon}</p>
        <div class="col-6">
            <button class="btn btn-danger" type="button" data-si-form data-si-preset="cart_clean" data-si-event="click">
                {'ms2_cart_clean' | lexicon}
            </button>
        </div>
        <div class="col-6">
            <a href="{179 | url}" class="btn btn-primary">Оформить заказа</a>
        </div>
    </div>
</div>
```

### Пустая корзина
**data-msac-empty** - блок, который будет показан, если корзина пуста.

```fenom:line-numbers
<div class="alert alert-warning {$rows ? 'd-none':''}" data-msac-empty>
    {'ms2_cart_is_empty' | lexicon}
</div>
```

:::danger
Ни один из блоков не должен быть вложен в другой.
:::

### Очистка корзины
Поскольку для отправки данных на сервер используется [SendIt](https://docs.modx.pro/components/sendit/#standartnoe-ispolzovanie), то для кнопки очистки корзины необходимо добавить следующие атрибуты:

* **data-si-form** - без значения.
* **data-si-preset** - со значением **cart_clean**.
* **data-si-event** - со значением **click**, для очистки корзины по клику.

```fenom:line-numbers
<button class="btn btn-danger" type="button" data-si-form data-si-preset="cart_clean" data-si-event="click">
    {'ms2_cart_clean' | lexicon}
</button>
```

### Вывод данных
Также обратите внимание на атрибуты **data-msac-prop**, которые позволяют выводить любые данные из корзины по ключу, его нужно указать в качестве значения данного атрибута.

```fenom:line-numbers
<span  data-msac-prop="total_cost">{$total.cost}</span>
```

## Чанк товара(row)

:::danger
Это опциональный чанк, если вам нужно вывести только общие значения, например в шапке, то не нужно указывать параметр **row** в сниппите [getCarts](https://docs.modx.pro/components/msaltcart/snippets#getcarts)
:::

```fenom:line-numbers
<div class="col-12 py-2" data-msac-product="{$key}">
    <div class="row align-items-center justify-content-between">
        <div class="col-12 mb-3 d-flex" style="gap:15px;">
            {if $thumb?}
                <img src="{$thumb}" alt="{$pagetitle}" title="{$pagetitle}"/>
            {else}
                <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
                     srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
                     alt="{$pagetitle}" title="{$pagetitle}"/>
            {/if}
            <form  data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
                <input type="hidden" name="key" value="{$key}"/>
                {if $id?}
                    <a href="{$id | url}">{$pagetitle}</a>
                {else}
                    {$name}
                {/if}
                {'!msOptions' | snippet: [
                'options' => 'color',
                'product' => $id,
                'currentOptions' => $options,
                'tpl' => '@FILE chunks/selectoption.tpl'
                ]}
                <div class="small">
                    Размеры: {$options['size']}
                </div>
                <div class="small">
                    Вес: {$options['weight']}
                </div>
            </form>
        </div>
        <form class="col-10 mb-3" data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
            <input type="hidden" name="key" value="{$key}"/>
            <div class="ms-input-number-wrap">
                <button class="ms-input-number-btn ms-input-number-minus btn btn-sm btn-secondary" type="button">&#8722;</button>
                <input class="ms-input-number-emulator" value="{$count}" name="count" data-msac-prop="count" type="text">
                <button class="ms-input-number-btn ms-input-number-plus btn btn-sm btn-secondary" type="button">&#43;</button>
            </div>
        </form>
        <form class="col-2 mb-3" data-si-form data-si-preset="cart_remove">
            <input type="hidden" name="key" value="{$key}">
            <button class="btn btn-sm btn-danger" type="button" data-si-event="click">&times;</button>
        </form>
        <div class="col-3 mb-3">
            <span class="text-nowrap">{$weight} {'ms2_frontend_weight_unit' | lexicon}</span>
        </div>
        <div class="col-6 mb-3">
            <span class="mr-2 text-nowrap">{$price | replace: ' ': '' | number: 0: '.': ' '} {'ms2_frontend_currency' | lexicon}</span>
            {if $old_price?}
                <s class="old_price text-nowrap">{$old_price | replace: ' ': '' | number: 0: '.': ' '} {'ms2_frontend_currency' | lexicon}</s>
            {/if}
        </div>
        <div class="col-3 mb-3">
            <span class="mr-2 text-nowrap"><span data-msac-prop="cost">{$cost | replace: ' ': '' | number: 0: '.': ' '}</span> {'ms2_frontend_currency' | lexicon}</span>
        </div>
    </div>
</div>
```

:::warning
Все данные отдельного товара должны располагаться внутри блока с атрибутом  **data-msac-product**, которому в качестве значения нужно передать ключ товара в корзине.
:::

### Изменение опций
Если хотите, чтобы можно было менять какую-то опцию товара в динамической корзине, то следует обернуть select с нужной опцией в форму. Если нужно менять несколько опций,
то можно каждую из них обернуть в отдельную форму или все в одну. При этом каждая форма обязательно должна иметь следующие атрибуты:

* **data-si-form** - без значения.
* **data-si-preset** - со значением **cart_change**
* **data-si-event** - со значением **change**, чтобы обновление корзины происходило при изменении в форме.
* **data-si-nosave** - без значения, чтобы выбранные значения не сохранялись.
И скрытый input с именем **key** и значением равным ключу товара.

```fenom:line-numbers
<form  data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
    <input type="hidden" name="key" value="{$key}"/>
    {if $id?}
        <a href="{$id | url}">{$pagetitle}</a>
    {else}
        {$name}
    {/if}
    {'!msOptions' | snippet: [
    'options' => 'color',
    'product' => $id,
    'currentOptions' => $options,
    'tpl' => '@FILE chunks/selectoption.tpl'
    ]}
    <div class="small">
        Размеры: {$options['size']}
    </div>
    <div class="small">
        Вес: {$options['weight']}
    </div>
</form>
```
### Изменение количества
Изменение количества происходит аналогичным образом, с той лишь разницей, что для кастомизации поля количества используется [самописный плагин](https://docs.modx.pro/components/msaltcart/inputnumber)

```fenom:line-numbers
<form class="col-10 mb-3" data-si-form data-si-preset="cart_change" data-si-event="change" data-si-nosave>
    <input type="hidden" name="key" value="{$key}"/>
    <div class="ms-input-number-wrap">
        <button class="ms-input-number-btn ms-input-number-minus btn btn-sm btn-secondary" type="button">&#8722;</button>
        <input class="ms-input-number-emulator" value="{$count}" name="count" data-msac-prop="count" type="text">
        <button class="ms-input-number-btn ms-input-number-plus btn btn-sm btn-secondary" type="button">&#43;</button>
    </div>
</form>
```

### Удаление товара
Чтобы была возможность удалить отдельный товар из корзины, нужно добавить в чанк товара форму со следующими атрибутами:

* **data-si-form** - без значения.
* **data-si-preset** - со значением **cart_remove**

Внутри формы следует разместить скрытый input с именем **key** и значением равным ключу товара. А так же кнопку с типом **button** и атрибутом **data-si-event="click"**.

```fenom:line-numbers
<form class="col-2 mb-3" data-si-form data-si-preset="cart_remove">
    <input type="hidden" name="key" value="{$key}">
    <button class="btn btn-sm btn-danger" type="button" data-si-event="click">&times;</button>
</form>
```

### Вывод свойств
Для динамического обновления свойств товара, каждый блок содержащий конкретное свойство должен иметь атрибут **data-msac-prop** со значением равным ключу свойства, для стоимости отдельного товара ключом будет **cost**.

```fenom:line-numbers
<span data-msac-prop="cost">{$cost | replace: ' ': '' | number: 0: '.': ' '}</span>
```

## Вызов сниппета
Сниппет [getCarts](https://docs.modx.pro/components/msaltcart/snippets#getcarts) имеет только один параметр **tpls**, который принимает в качестве значения строку в формате JSON.
```fenom:line-numbers
{'!getCarts' | snippet: [
    'tpls' => '{ "maincart": { "wrapper":"@FILE msac/cart.tpl","row":"@FILE msac/cartrow.tpl" } }'
]}
```
:::warning
Сниппет следует вызывать некешированным
:::

## Вставка плейсхолдера
Поскольку по задумке наша динамическая корзина должна присутствовать на всех страницах, мы разместим плейсхолдер перед закрывающим тегом **body**.
```fenom:line-numbers
<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
        <h5 class="offcanvas-title" id="offcanvasExampleLabel">Корзина</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Закрыть"></button>
    </div>
    <div class="offcanvas-body" data-msac-cart="maincart" data-mspd-cart-wrap>
        {'maincart' | placeholder}
    </div>
</div>
```

:::warning
Обратите внимание, что имя плейсхолдера равно ключу в JSON в вызове сниппета, а сам плейсхолдер расположен внутри блока с атрибутами **data-mspd-cart-wrap** и **data-msac-cart**.
При этом **data-msac-cart** обязательно должен иметь значение равное имени плейсхолдера.
:::



## Системные настройки

|             Ключ             |          Описание           |                     Значение                      |
|:----------------------------:|:---------------------------:|:-------------------------------------------------:|
| **msac_frontend_js**         | Путь к основным JS скриптам | *assets/components/msaltcart/js/web/default.js*   |
