---
title: msSetInCart
description: Компонент реализует функционал покупки комплектов товаров в Minishop2
logo: https://modstore.pro/assets/extras/mssetincart/logo-lg.jpg
author: vgrish
modstore: https://modstore.pro/packages/ecommerce/mssetincart

dependencies: miniShop2
---

# msSetInCart

Компонент реализует функционал покупки комплектов товаров.

![msSetInCart](https://file.modx.pro/files/d/9/e/d9efbebbfef6b748a2027a3a8813a3be.png)

## Настройка пакета

![Настройка пакета](https://file.modx.pro/files/c/7/1/c7163e1f39c4bbb6baba7ed904077128.png)

- id связи товаров, задается в настройках miniShop2.
- максимум комплектов, максимум одновременно добавляемых комплектов
- включить / выключить работу пакет
- файл с js на фронте сайта

## Настройка вывода

- в шаблоне вывода товара добавить кнопку покупки комплекта

## Пример добавления кнопки

```modx
<!-- стандартная кнопка отправить в корзину -->
<div class="form-group">
  <div class="col-sm-3">
    <button type="submit" class="btn btn-default" name="ms2_action" value="cart/add">
      <i class="glyphicon glyphicon-barcode"></i> [[%ms2_frontend_add_to_cart]]
    </button>
  </div>
</div>
<!-- /стандартная кнопка отправить в корзину -->

<!-- кнопка покупки комплекта -->
[[!+mssetincart.total_cost:is=`0`:then=``:else=`
<div class="form-group">
  <div class="col-sm-3">
    <button type="submit" class="btn btn-primary" name="ms2_action_set" value="cart/addset">
      <i class="glyphicon glyphicon-barcode"></i> [[%ms2_frontend_add_to_cart]] набор
    </button>
  </div>
</div>
<!-- /кнопка покупки комплекта -->
`]]
```

## Доступные плейсхолдеры

- `[[!+mssetincart.total_cost]]` - общая стоимость связанных товаров
- `[[!+mssetincart.total_count]]` - общее количество связанных товаров

## Вывод связанных товаров стандартно с помощью сниппета msProducts

```modx
<div class="row">
  <div class="span5 col-md-3">
    <h5>цена соп.товаров - [[!+mssetincart.total_cost]] руб.</h5>
    <h5>кол-во соп.товаров - [[!+mssetincart.total_count]] шт.</h5>
  </div>

  <div class="span5 col-md-10">
    [[!msProducts?
      &tpl=`tpl.msProducts.row.mini`
      &parents=`0`
      &link=`1`
      &master=`[[*id]]`
    ]]
  </div>
</div>
```
