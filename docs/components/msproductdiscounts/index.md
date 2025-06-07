---
title: msProductDiscounts
description: Создание скидок на товары с широкими возможностями настройки
author: shevartv
modstore: https://modstore.pro/packages/discounts/msproductdiscounts

items: [
  { text: 'Javascript', link: 'javascript' },
  { text: 'Кейсы', link: 'cases' },
]

dependencies: [ 'miniShop2', 'SendIt' ]
---

# msProductDiscounts

`msProductDiscounts` предназначен для управления скидками на товары интернет-магазина на базе `miniShop2`. Работает с модификациями товаров созданными с помощью компонента `msOptionsPrice2`.

## Возможности

1. Скидки на отдельные категории товаров.
2. Скидки для отдельных групп пользователей.
3. Скидки на отдельные товары.
4. Скидки на товары с определенными значениями опций (например, только на товары красного цвета).
5. Скидки на отдельные модификации товара (требуется компонент `msOptionsPrice2`).
6. Скидки ограниченные по времени (от 1 часа).
7. Скидки в определенные дни недели.
8. Скидки на каждый N-ый товар в корзине.
9. Несколько скидок на один товар.
10. Задание своих условий применения скидок.
11. Разделение скидок по контекстам.
12. Создание промокодов.
13. Ограничение количества применений промокодов.
14. Ограничение периода действия промокодов.
15. Привязка нескольких скидок к одному промокоду.

## Системные настройки

| Ключ                           | Значение                            | Для чего                                                                                                                                                                                              |
|--------------------------------|-------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **mspd_base_ctx**              | `web`                               | чтобы строить дерево категорий и товаров, если оставить пустым будет предложен выбор при добавлении скидки.                                                                                           |
| **mspd_cart_sort_direction**   | `DESC`                              | чтобы применять скидку сначала к более дорогим товарам, поставьте `ASC` для применения скидки в первую очередь к более дешёвым товарам.                                                               |
| **mspd_tpls_with_cart**        |                                     | чтобы работала актуализация корзины, укажите ID шаблонов, в которых отображается корзина.                                                                                                             |
| **mspd_catalog_root_id**       |                                     | чтобы корректно строилось дерево категорий в интерфейсе управления скидкой                                                                                                                            |
| **mspd_debug**                 | `Нет`                               | для включения режима отладки, данные будут выводится в Журнал ошибок                                                                                                                                  |
| **mspd_hidden_class**          | `d-none`                            | чтобы скрывать не нужную информацию, но в комплекте стилей для фронтэнда нет, поэтому определять класс скрытия нужно самостоятельно                                                                   |
| **mspd_frontend_js**           | значение под таблицей<sup>*</sup>   | чтобы можно было указать путь к кастомному файлу JS.                                                                                                                                                  |
| **mspd_many_behaviour**        | `3`                                 | для возможности применять несколько скидок сразу и управлять порядком применения скидок                                                                                                               |
| **mspd_product_limit**         | `10`                                | для ограничения количества результатов поиска товаров в админке, если оставить пустым некоторые запросы могут подвесить браузер                                                                       |
| **mspd_product_search_fields** | значение под таблицей<sup>**</sup>  | список полей, по которым будет происходить поиск товаров при добавлении условий применения скидки                                                                                                     |
| **mspd_productdata_fields**    | значение под таблицей<sup>***</sup> | для задания условий применения скидки в зависимости от свойств товара                                                                                                                                 |
| **mspd_reload_interval**       | `01:00-01:01`                       | для актуализации "забытых" корзин раз в сутки в указанный интервал                                                                                                                                    |
| **mspd_root_resource_ids**     |                                     | для указания списка акций. иногда требуется, чтобы у скидки(акции) была отдельная станица, если акций несколько их объединяют в раздел, вот тут можно указать ID этого раздела, для удобства привязки |
| **mspd_use_msearch2**          | `Нет`                               | для поиска категорий и товаров в админке с помощью `mSearch2`. ставьте "Да" только если компонент `mSearch2` установлен на вашем сайте, используются настройки стандартного пресета.                  |
| **mspd_info_tpl**              | `DiscountInfoTpl`                   | определяет внешний вид данных о скидке в карточке и превью товара                                                                                                                                     |
| **mspd_round_precision**       | `1`                                 | позволяет указать точность округления цены после применения скидки                                                                                                                                    |
| **mspd_show_for_all**          | `Да`                                | показывать доступные скидки в карточка товаров даже если корзина пуста                                                                                                                                |
| **mspd_status_cancel**         | `4`                                 | чтобы пересчитать количество применений промокода при отмене заказа                                                                                                                                   |
| **mspd_status_new**            | `1`                                 | чтобы пересчитать количество применений промокода при создании заказа                                                                                                                                 |
| **mspd_min_discount_price**    | `0`                                 | чтобы ограничить минимальную цену товара со скидкой                                                                                                                                                   |
| **mspd_name_field**            | `pagetitle`                         | чтобы указать поле из которого брать название товара                                                                                                                                                  |

:::details <sup>*</sup>Значение mspd_product_search_fields

```text
assets/components/msproductdiscounts/js/web/index.js
```

:::

:::details <sup>**</sup>Значение mspd_product_search_fields

```text
modResource.pagetitle,modResource.longtitle,modResource.menutitle,Data.article
```

:::

:::details <sup>***</sup>Значение mspd_productdata_fields

```json
{
  "article": "Артикул",
  "price": "Цена",
  "old_price": "Старая Цена",
  "weight": "Вес",
  "vendor": "Производитель",
  "made_in": "Страна",
  "new": "Новый",
  "popular": "Популярный",
  "favorite": "Особый",
  "tags": "Тег",
  "color": "Цвет",
  "size": "Размер"
}
```

:::

Необходимость изменения тех или иных настроек, Вы определяете самостоятельно, со стандартными настройками компонент тоже будет работать, но, скорее всего, не так, как вы ожидаете.

## Описание дополнительной разметки

Дополнительная разметка используются для корректной работы JavaScript, который отображает информацию о скидках пользователю и отправляет данных на сервер.

### Разметка карточки товара

```html:line-numbers
<form method="post" class="ms2_form" data-mspd-product="p-{$id}">
    <input type="hidden" name="id" value="{$id}">
    <input type="hidden" name="count" value="1">
    <a href="{$id | url}">{$pagetitle}</a>
    <span data-mspd-prop="price_str">{$price}</span>
    <span>{'ms2_frontend_currency' | lexicon}</span>
    <s data-mspd-prop-wrap="d-none" class="{!$old_price ? 'd-none' : ''}">
        <span data-mspd-prop="old_price_str">{$old_price}</span>
        {'ms2_frontend_currency' | lexicon}
    </s>
    <div data-mspd-info="p-{$id}"></div>
    <button type="submit" name="ms2_action" value="cart/add">
        {'ms2_frontend_add_to_cart' | lexicon}
    </button>
</form>
```

* `[data-mspd-product]` - обозначает корневой элемент товара; в качестве значение должен содержать уникальный ключ;
если выводите список модификаций, то помимо id самого товара в ключ следует добавить ещё и id модификации.
* `[name="id"]` -  поле содержащее id товара, даже если выводите список модификаций в поле нужно указывать id товара, а не отдельной модификации.
* `[name="count"]` - опционально количество можно не передавать, тогда по умолчанию будет принято значение 1.
* `[data-mspd-prop="price_str"]` - блок вывода отфроматированной цены товара, если нужна неотформатированная цена укажите в качестве значения `price`.
* `[data-mspd-prop="old_price_str"]` - блок вывода отфроматированной цены старой товара, если нужна неотформатированная старая цена укажите в качестве значения `old_price`.
* `[data-mspd-prop-wrap="d-none"]` - атрибут блока-обёртки свойства, в качестве значения должен принимать список классов добавляемых если свойство меньше 0, и удаляемых если больше.
* `[data-mspd-info]` - блок вывода дополнительной информации о скидках, в качестве значения должен содержать ключ товара такой же как в `[data-mspd-product]`

### Разметка опций товара

Компонент использует стандартную для `miniShop2` разметку опций, с той лишь разницей, что полям ввода содержащим опции,
влияющие на размер скидки, необходимо добавить атрибут `data-mspd-prop` без значения
```html
<select name="options[{$name}]" class="form-control col-md-6" id="option_{$name}" data-mspd-prop></select>
```

### Разметка товара в корзине

Разметка товара в корзине отличается от разметки карточки товара корневым атрибутом 

* `[data-mspd-cart-product]` - обозначает корневой элемент товара; в качестве значение должен содержать ключ товара в корзине;

А также отсутствием необходимости размещать поле с id товара.


### Разметка формы ввода промокода

```html:line-numbers
<form data-mspd-promocode-form action="{$.session.mspd.promocode.id ? 'cancelpromocode': 'applypromocode'}">
    <input type="text" name="promocode" value="{$.session.mspd.promocode.code}" placeholder="promocode">
    <p data-si-error="promocode"></p>
    {set $applyText = 'mspd_promocode_apply_text' | lexicon}
    {set $cancelText = 'mspd_promocode_cancel_text' | lexicon}
    <button type="submit" data-mspd-text="{!$.session.mspd.promocode.id ? $cancelText : $applyText}">{$.session.mspd.promocode.id ? $cancelText: $applyText}</button>
</form>
```

* `[data-mspd-promocode-form]` - атрибут корневого элемента формы
* `[name="promocode"]` - поле ввода промокода
* `[data-si-error="promocode"]` - блок вывода ошибок (опционально)
* `[data-mspd-text]` - атрибут текста кнопки, зависит от того применён промокод или нет.


## Устаревшие данные.


Показ цены со скидкой происходит автоматически, если в чанк товара добавлены соответствующие атрибуты. Так вся информация о товаре должна быть внутри блока с атрибутом `data-mspd-product="{$id}"`  где `$id` - идентификатор товара в админке. Блок вывода цены должен содержать атрибут `data-mspd-price` в качестве значения
нужно указать цену товара, для старой цены `data-mspd-old-price` - значение старая цена. Свойства и опции влияющие на цену нужно обозначать соответственно `data-mspd-data` (свойство: артикул, цвет, вес) и `data-mspd-option` (любая кастомная опция). При этом, если html элемент, которому вы добавляете эти атрибуты НЕ содержит атрибута name, то необходимо в качестве значения указать ключ опции или свойства, например так: `data-mspd-data="color"` или `data-mspd-option="length"`. Такие свойства как:

* Производитель
* Страна изготовитель
* Новый
* Особый
* Популярный
* Старая цена

можно не обозначать и не передавать в корзину, они проверяются по умолчанию. Чтобы нулевая старая цена скрывалась необходимо обернуть весь блок вывода старой цены в элемент с атрибутом `data-mspd-old-price-wrap` и убедиться, что в стилях описан класс `d-none`, либо, если за визуальное скрытие элементов у вас отвечает другой класс, указать свой класс в системных настройках компонента. Так же важно отметить, что при использовании компонента `msOptionsPrice2`, который предусматривает свою разметку, очень важно НЕ ИСПОЛЬЗОВАТЬ классы `msoptionsprice-cost` и `msoptionsprice-old-cost`, поскольку в
случае их добавления, в разметке появятся инлайновые стили, препятствующие корректному скрытию данных. Кроме того, при использовании модификаций ОБЯЗАТЕЛЬНО указывать:

``` html
<input type="text" name="options[modification]" value="0" data-mspd-option>
```

Для вывода информации о скидке, добавьте в разметку блок с атрибутом `data-mspd-info`, он также должен быть внутри блока с атрибутом `data-mspd-product="{$id}"`. Сам шаблон блока с информацией о скидке задаётся в системной настройке `mspd_info_tpl`. Внутри шаблона доступны плейсхолдеры `name`, `url`, `id`, `relation`, `count`, `value`, `unit`, `user_groups`, `resource`, `start`, `end`, `week_days`, `priority`, `min_sum`, `by_position`, `active`, `properties`.

Карточка товара может выглядеть так:

```fenom
{'!msOptionsPrice.initialize' | snippet : []}

<div class="text-center text-md-left mb-2 mb-md-0">
  {if $_modx->resource.new?}
  <span class="badge badge-secondary badge-pill col-auto">{'ms2_frontend_new' | lexicon}</span>
  {/if}
  {if $_modx->resource.popular?}
  <span class="badge badge-secondary badge-pill col-auto">{'ms2_frontend_popular' | lexicon}</span>
  {/if}
  {if $_modx->resource.favorite?}
  <span class="badge badge-secondary badge-pill col-auto">{'ms2_frontend_favorite' | lexicon}</span>
  {/if}
</div>
<div id="msProduct" class="row align-items-center" itemtype="http://schema.org/Product" itemscope>
  <meta itemprop="name" content="{$_modx->resource.pagetitle}">
  <meta itemprop="description" content="{$_modx->resource.description ?: $_modx->resource.pagetitle}">
  <div class="col-12 col-md-6">
    {'!msGallery' | snippet : []}
  </div>
  <div class="col-12 col-md-6" itemtype="http://schema.org/AggregateOffer" itemprop="offers" itemscope data-mspd-observe>
    <meta itemprop="category" content="{$_modx->resource.parent | resource: 'pagetitle'}">
    <meta itemprop="offerCount" content="1">
    <meta itemprop="price" content="{$price | replace:' ':''}">
    <meta itemprop="lowPrice" content="{$price | replace:' ':''}">
    <meta itemprop="priceCurrency" content="RUR">

    <form class="form-horizontal ms2_form msoptionsprice-product" method="post" data-mspd-product="{$_modx->resource.id}">
      <input type="text" name="options[modification]" value="0" data-mspd-option>
      <h1 class="text-center text-md-left msoptionsprice-name msoptionsprice-[[*id]]">{$_modx->resource.pagetitle}</h1>
      <input type="hidden" name="id" value="{$_modx->resource.id}"/>

      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_article' | lexicon}:</label>
        <div class="col-6 col-md-9 msoptionsprice-article msoptionsprice-[[*id]]">
          {$article ?: '-'}
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_price' | lexicon}:</label>
        <div class="col-6 col-md-9">
          <span class="msoptionsprice-[[*id]]" data-mspd-price="{$_modx->resource.price}">{$_modx->resource.price}</span>
          {'ms2_frontend_currency' | lexicon}<sup data-mspd-sup class="d-none" style="color:red;">*</sup>
          <span data-mspd-old-price-wrap class="old_price {$old_price == 0 ? 'd-none' : ''}">
          <span class=" ml-2 msoptionsprice-[[*id]]" data-mspd-old-price="{$_modx->resource.old_price}">{$_modx->resource.old_price}</span>
          {'ms2_frontend_currency' | lexicon}
          </span>

        </div>
      </div>
      <div class="mb-3" data-mspd-info=""></div>
      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label" for="product_price">{'ms2_cart_count' | lexicon}:</label>
        <div class="col-6 col-md-9">
          <div class="input-group">
            <input type="number" name="count" id="product_price" class="form-control col-md-6" value="1"/>
            <div class="input-group-append">
              <span class="input-group-text">{'ms2_frontend_count_unit' | lexicon}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_weight' | lexicon}:</label>
        <div class="col-6 col-md-9">
          <span class="msoptionsprice-mass msoptionsprice-[[*id]]" data-mspd-data="weight">{$weight}</span> {'ms2_frontend_weight_unit' | lexicon}
        </div>
      </div>

      <div class="form-group row align-items-center">
        <label class="col-6 col-md-3 text-right text-md-left col-form-label">{'ms2_product_made_in' | lexicon}:</label>
        <div class="col-6 col-md-9">
          {$made_in ?: '-'}
        </div>
      </div>

      {'msOptions' | snippet : [
        'options' => 'colors,list,list_multiple'
      ]}

      {'msProductOptions' | snippet : []}

      <div class="form-group row align-items-center">
        <div class="col-12 offset-md-3 col-md-9 text-center text-md-left">
          <button type="submit" class="btn btn-primary" name="ms2_action" value="cart/add">
            {'ms2_frontend_add_to_cart' | lexicon}
          </button>
        </div>
      </div>
    </form>

  </div>
</div>
```

Превью товара в каталоге может выглядеть так:

```fenom
<div class="ms2_product mb-5 mb-md-3" itemtype="http://schema.org/Product" itemscope>
  <meta itemprop="description" content="{$description = $description ?: $pagetitle}">
  <meta itemprop="name" content="{$pagetitle}">

  <form method="post" class="ms2_form d-flex flex-column flex-md-row align-items-center no-gutters" data-mspd-product="{$id}">
    <input type="hidden" name="id" value="{$id}">
    <input type="hidden" name="count" value="1">
    <input type="hidden" name="options" value="[]">
    <div class="col-md-2 text-center text-md-left">
      <a href="{$id | url}">
        {if $thumb?}
        <img src="{$thumb}" class="mw-100" alt="{$pagetitle}" title="{$pagetitle}" itemprop="image"/>
        {else}
        <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
            srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
            class="mw-100" alt="{$pagetitle}" title="{$pagetitle}"/>
        {/if}
      </a>
    </div>
    <div class="col-md-10 d-flex flex-column flex-md-row align-items-center no-gutters" itemtype="http://schema.org/AggregateOffer" itemprop="offers" itemscope>
      <meta itemprop="category" content="{$_modx->resource.parent | resource: 'pagetitle'}">
      <meta itemprop="offerCount" content="1">
      <meta itemprop="price" content="{$price | replace:' ':''}">
      <meta itemprop="lowPrice" content="{$price | replace:' ':''}">
      <meta itemprop="priceCurrency" content="RUR">

      <div class="col-12 col-md-8 mt-2 mt-md-0 flex-grow-1">
        <div class="d-flex justify-content-around justify-content-md-start">
          <a href="{$id | url}" class="font-weight-bold">{$pagetitle}</a>
          <span class="price ml-md-3" data-mspd-price="{$price}">{$price}</span> <span>{'ms2_frontend_currency' | lexicon}<sup data-mspd-sup class="d-none" style="color:red;">*</sup></span>
          <span data-mspd-old-price-wrap class="{!$old_price ? 'd-none' : ''} old_price">
            <span class="ml-md-3" data-mspd-old-price="{$old_price}">{$old_price}</span>
            {'ms2_frontend_currency' | lexicon}
          </span>
        </div>
        <div class="mb-3" data-mspd-info=""></div>
        <div class="flags mt-2 d-flex justify-content-around justify-content-md-start">
          {if $new?}
          <span class="badge badge-secondary badge-pill mr-md-1">{'ms2_frontend_new' | lexicon}</span>
          {/if}
          {if $popular?}
          <span class="badge badge-secondary badge-pill mr-md-1">{'ms2_frontend_popular' | lexicon}</span>
          {/if}
          {if $favorite?}
          <span class="badge badge-secondary badge-pill mr-md-1">{'ms2_frontend_favorite' | lexicon}</span>
          {/if}
        </div>
        {if $introtext}
        <div class="mt-2 text-center text-md-left">
          <small>{$introtext | truncate : 200}</small>
        </div>
        {/if}
      </div>
      <div class="col-12 col-md-4 mt-2 mt-md-0 text-center text-md-right">
        <button class="btn btn-primary" type="submit" name="ms2_action" value="cart/add">
          {'ms2_frontend_add_to_cart' | lexicon}
        </button>
      </div>
    </div>
  </form>
</div>
```

В корзине используются другие атрибуты, а так же есть вывод размера скидки за единицу товара, за всё количество товара и общая скидка по всей корзине. При чём размер скидки за общее количество отдельного товара и общая скидка выводятся внутри блока с атрибутом `data-mspd-cart-wrap`. Для иллюстрации ниже приведёт пример чанка корзины.

```fenom
<div id="msCart">
  {if $products | length == 0}
  <div class="alert alert-warning">
    {'ms2_cart_is_empty' | lexicon}
  </div>
  {else}
  <div class="table-responsive">
    <table class="table table-striped">
      <tr class="ms-header">
        <th class="ms-title">{'ms2_cart_title' | lexicon}</th>
        <th class="ms-count">{'ms2_cart_count' | lexicon}</th>
        <th class="ms-weight">{'ms2_cart_weight' | lexicon}</th>
        <th class="ms-price">{'ms2_cart_price' | lexicon}</th>
        <th class="ms-cost">{'ms2_cart_cost' | lexicon}</th>
        <th class="ms-remove"></th>
      </tr>

      {foreach $products as $product}
        {var $image}
        {if $product.thumb?}
        <img src="{$product.thumb}" alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
        {else}
        <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
            srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
            alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
        {/if}
        {/var}
        <tr id="{$product.key}">
          <td class="ms-title">
            <div class="d-flex">
              <div class="ms-image mw-100 pr-3">
                {if $product.id?}
                <a href="{$product.id | url}">{$image}</a>
                {else}
                {$image}
                {/if}
              </div>
              <div class="title">
                {if $product.id?}
                <a href="{$product.id | url}">{$product.pagetitle}</a>
                {else}
                {$product.name}
                {/if}
                {if $product.options?}
                <div class="small">
                  {$product.options | join : '; '}
                </div>
                {/if}
              </div>
            </div>
          </td>
          <td class="ms-count">
            <form method="post" class="ms2_form" role="form">
              <input type="hidden" name="key" value="{$product.key}"/>
              <div class="form-group">
                <div class="input-group input-group-sm">
                  <input type="number" name="count" value="{$product.count}" class="form-control"/>
                  <div class="input-group-append">
                    <span class="input-group-text">{'ms2_frontend_count_unit' | lexicon}</span>
                  </div>
                </div>
                <button class="btn btn-sm" type="submit" name="ms2_action" value="cart/change">&#8635;</button>
              </div>
            </form>
          </td>
          <td class="ms-weight">
            <span class="text-nowrap">{$product.weight} {'ms2_frontend_weight_unit' | lexicon}</span>
          </td>
          <td class="ms-price">
            <span class="mr-2 text-nowrap" data-mspd-cart-price>{$product.price}</span> {'ms2_frontend_currency' | lexicon}
            <span class="text-nowrap {!$product.old_price ? 'd-none' : ''}" data-mspd-cart-wrap>
              <span class="old_price"><span data-mspd-cart-old-price>{$product.old_price}</span> {'ms2_frontend_currency' | lexicon}</span> <br>
              Скидка за шт: <span data-mspd-cart-discount-price>{$product.discount_price}</span> {'ms2_frontend_currency' | lexicon}
            </span>
          </td>
          <td class="ms-cost">
            <span class="mr-2 text-nowrap">
              <span class="ms2_cost" data-mspd-cart-cost>{$product.cost}</span> {'ms2_frontend_currency' | lexicon}<br>
              <span data-mspd-cart-wrap>
                Экономия: <span data-mspd-cart-discount-cost>{$product.discount_cost}</span>
                {'ms2_frontend_currency' | lexicon}
              </span>
            </span>
          </td>
          <td class="ms-remove">
            <form method="post" class="ms2_form text-md-right">
              <input type="hidden" name="key" value="{$product.key}">
              <button class="btn btn-sm btn-danger" type="submit" name="ms2_action" value="cart/remove">&times;</button>
            </form>
          </td>
        </tr>
      {/foreach}

      <tr class="ms-footer">
        <th class="total">{'ms2_cart_total' | lexicon}:</th>
        <th class="total_count">
          <span class="ms2_total_count">{$total.count}</span>
          {'ms2_frontend_count_unit' | lexicon}
        </th>
        <th class="total_weight text-nowrap" colspan="2">
          <span class="ms2_total_weight">{$total.weight}</span>
          {'ms2_frontend_weight_unit' | lexicon}
        </th>
        <th class="total_cost text-nowrap" colspan="2">
          <span class="ms2_total_cost">{$total.cost}</span>
          {'ms2_frontend_currency' | lexicon}
          <span data-mspd-cart-wrap class="d-none">
            Общая экономия: <span data-mspd-cart-total-discount>{$total.discount}</span>
            {'ms2_frontend_currency' | lexicon}
          </span>
        </th>
      </tr>
    </table>
  </div>

  <form method="post" class="ms2_form">
    <button type="submit" name="ms2_action" value="cart/clean" class="btn btn-danger">
      {'ms2_cart_clean' | lexicon}
    </button>
  </form>
  {/if}
</div>
```

## Алгоритм работы

Для того, чтобы скидка могла быть применена, она должна быть активирована. Вручную можно активировать только бессрочные скидки. Если же для скидки задан хотя бы один `Период действия`, то скидка будет активироваться и деактивироваться автоматически, при этом завершившийся интервал будет удален. Когда интервалы закончатся, скидка деактивируется.

Фактический расчёт скидки происходит только при добавлении товара в корзину и изменении состава корзины, а так же при загрузке страницы корзины. Все данные о стоимости получаемые, например, на странице товара, являются ознакомительными. Что это означает? Представим, что вы создали скидку на каждый второй товар в корзине с учётом общего количества товаров в ней. Пока корзина пуста, мы не можем знать сколько товаров будет в ней к моменту оформления заказа, и поэтому не можем произвести точный расчёт. В связи с этим, на странице товара и в каталоге выводится та цена, которая была бы у товара, если бы он подходил под все условия скидки, включая количество. В общем, скрипт получает все активные на данный момент скидки и корзину. А потом в цикле проверяет каждый товар на соответствие условиям каждой скидки. При этом сначала проверяется наличие исключений, потом соответствие вхождениям. Порядок проверки такой:

* исключенные категории;
* включенные категории;
* исключенные товары;
* включенные товары;
* исключенные модификации;
* включенные модификации;
* исключенные свойства и опции;
* включенные свойства и опции;

Этот порядок и определяет приоритет правил применения скидки, т.е. если для скидки указана исключаемая категория "Инструменты" и указано, что она (скидка) доступна для инструмента "Дрель", то вся категория, в том числе и "Дрель", скидку не получат, так как после проверки исключаемых категорий, дальнейшие проверки проводится не будут. Подходящие скидки записываются в сессию, а затем происходит перерасчёт корзины. Если пользователь оставил корзину, не закрыл вкладку браузера с ней, не выключил компьютер, то страница всё равно будет перезагружена в указанное вами время и корзина будет пересчитана.
Стоит отметить, что предусмотрены разные варианты расчёта скидок в зависимости от количества. Первое, это `Отношение к кол-ву`. Тут есть два варианта:

1. `кратно` - означает, что скидка будет применена к каждому N-му товару, соответствующему условиям скидке;
2. `больше или равно` - означает, что скидка будет применена ко всем товарам, если общее количество товаров которым доступна скидка больше или равно указанному количеству.

Это свойство скидки неразрывно связано с другим `Какое кол-во учитывать?`, у которого есть три варианта:

1. `Общее кол-во товаров в корзине` - означает, что количество товаров со скидкой будет определено в зависимости от общего количества товаров в корзине;
2. `Кол-во уникальных товаров в корзине` - означает, что количество товаров со скидкой будет определено в зависимости от количества уникальных товаров в корзине;
3. `Учитывать кол-во каждого товара отдельно` - означает, что количество товаров со скидкой будет определено в зависимости от количества каждого отдельного товара в корзине.

Рассмотрим абстрактный пример, в котором будем менять только 3 настройки `Отношение к кол-ву`, `Кол-во`, `Какое кол-во учитывать?`, никаких других ограничений нет. Есть Корзина следующего состава:

| Товар   | Кол-во | Цена | Сумма |
|---------|--------|------|-------|
| Товар А | 2      | 100  | 200   |
| Товар Б | 1      | 150  | 150   |
| Товар В | 1      | 200  | 200   |
| Товар С | 1      | 300  | 300   |

| Отношение к кол-ву | Кол-во | Какое кол-во учитывать?                  | Товары со скидкой |
|--------------------|--------|------------------------------------------|-------------------|
| кратно             | 1      | Общее кол-во товаров в корзине           | А, Б, В, С        |
| кратно             | 2      | Общее кол-во товаров в корзине           | А, В              |
| кратно             | 3      | Общее кол-во товаров в корзине           | Б                 |
| кратно             | 1      | Кол-во уникальных товаров в корзине      | А, Б, В, С        |
| кратно             | 2      | Кол-во уникальных товаров в корзине      | Б, С              |
| кратно             | 3      | Кол-во уникальных товаров в корзине      | В                 |
| кратно             | 1      | Учитывать кол-во каждого товара отдельно | А, Б, В, С        |
| кратно             | 2      | Учитывать кол-во каждого товара отдельно | А                 |
| кратно             | 3      | Учитывать кол-во каждого товара отдельно |                   |
| больше или равно   | 1      | Общее кол-во товаров в корзине           | А, Б, В, С        |
| больше или равно   | 2      | Общее кол-во товаров в корзине           | А, Б, В, С        |
| больше или равно   | 3      | Общее кол-во товаров в корзине           | А, Б, В, С        |
| больше или равно   | 1      | Кол-во уникальных товаров в корзине      | А, Б, В, С        |
| больше или равно   | 2      | Кол-во уникальных товаров в корзине      | А, Б, В, С        |
| больше или равно   | 3      | Кол-во уникальных товаров в корзине      | А, Б, В, С        |
| больше или равно   | 1      | Учитывать кол-во каждого товара отдельно | А, Б, В, С        |
| больше или равно   | 2      | Учитывать кол-во каждого товара отдельно | А                 |
| больше или равно   | 3      | Учитывать кол-во каждого товара отдельно |                   |

## Исключения и Включения

* Категории включаются или исключаются со всеми дочерними категориями.
* Товары включаются и исключаются со всеми модификациями. При этом если есть включенные категории добавить товары из других не получится.
* При установке скидки на определенную модификацию, информация о скидке будет выводиться, только если передан идентификатор модификации.
* Опции и Свойства исключаются только по значению равному указанному в настройках, т.е. если исключена опция `width` со значением `10`, то товар с `width` равным `20` пройдёт проверку. При включении Опции или Свойства можно указать знак сравнения, при этом у товара значение опции должно быть задано явно, иначе товар проверку не пройдёт, `0` считается действительным значением.

## Максимальная сумма заказа

Вы можете ограничить применение скидки минимальной суммой заказа, в этом случае даже если все остальные условия выполнены, скидка не будет применена пока сумма товаров в корзине по реальным ценам ни станет больше или равна указанной Вами как минимальной.

## Выбор скидки или порядок применения скидок

Это определяется системной настройкой `mspd_many_behaviour`. По умолчанию она имеет значение `3`, это означает, что к товару соответствующему нескольким скидкам будут применены они все в порядке уменьшения приоритета. Если указать значение `2`, то будет применена одна скидка с наименьшим абсолютным значением. Другими словами, если одному товару подходит скидка в 50% и 40%, но скидка в 50% кратна двум, то применится именно она, т.к. при заказе двух товаров за 100 руб. при применении скидки 50% ко второму товару стоимость каждого будет равна 75 руб., а при применении скидки 40% в обоим - каждый товар будет стоить 60 руб. Поэтому первая скидка имеет меньшее значение, чем вторая.
Значение `1` приведёт к обратному результату, т.е. будет применена скидка в 40% к каждому товару. Значение `0`, приведёт к тому, что применится скидка с максимальным приоритетом, при равенстве оных, применится та, у которой больше id.

## Название акции и Ресурс

Вы можете указать ресурс, содержащий подробное описание акции. Чтобы не искать по всем ресурсам, можете ограничить выборку одним ресурсом, указав его `id` в системной настройке `mspd_root_resource_ids`. При этом название акции заполнится автоматически, однако вы можете его изменить.
