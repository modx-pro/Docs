---
title: FAQ
description: 'Типовые ошибки ms3OptionsColor: VueTools, CSS, mFilter, variants'
---

# FAQ

## Раздел менеджера не открывается / белый экран

Проверьте, что установлен **VueTools** ≥ 1.1.2-pl. Откройте `manager/?a=index&namespace=ms3optionscolor` и посмотрите ошибки в консоли браузера. Без VueTools раздел и вкладка товара не откроются.

## Не сохраняется словарь / ошибка доступа

Нужно право `msproduct_save` у роли менеджера (как у сохранения товара miniShop3). Своих отдельных прав пакет не добавляет. Проверьте политику доступа.

## Вкладка Swatches пустая или нет значений

Сначала на **Свойства товара** добавьте значения опции (`color` или ключи из `ms3optionscolor_default_option_key`) и сохраните товар. Потом откройте **Swatches**. Цвет хранится в словаре пакета, не в свойствах самой опции miniShop3.

## Свотчи на витрине без размера / невидимы

Включите `ms3optionscolor_frontend_css` или подключите вручную:

::: code-group

```fenom
<link rel="stylesheet" href="{'assets_url' | option}components/ms3optionscolor/css/web/main.css">
```

```modx
<link rel="stylesheet" href="[[++assets_url]]components/ms3optionscolor/css/web/main.css">
```

:::

Без CSS элемент `[data-ms3oc-swatch]` часто остаётся с нулевой шириной, особенно в корзине.

## Select без цветных квадратов в списке

Подключите `js/web/select.js`:

::: code-group

```fenom
<script src="{'assets_url' | option}components/ms3optionscolor/js/web/select.js"></script>
```

```modx
<script src="[[++assets_url]]components/ms3optionscolor/js/web/select.js"></script>
```

:::

Для Select2 на странице нужны jQuery и Select2. Иначе поставьте `native=1`: останется обычный `<select>` с `data-color` / `data-pattern` на option.

## Фильтр mFilter без свотчей

В Filter Set укажите `"type": "ms3oc"`, не встроенный `colors`. Тип появляется только если установлен mFilter и сработал `OnMFilterInit`. На витрине сначала `mFilter` (результаты), затем `mFilterForm`. В части версий mFilter задайте `&tplItem=tplMFilterMs3OptionsColor`. Подробнее: [mFilter](mfilter).

## В каталоге нет `variants[].swatches`

Чеклист и разметка: [ms3variants](ms3variants). Пакет не загружает варианты сам. Он только дополняет уже подготовленный `row.variants`.

## Другой товар не видит мой цвет

Словарь общий по паре `option_key` + `value`. Значения должны совпадать буквально: `Синий` и `синий` это разные записи. Проверьте фильтр **Не задан** в CMP.
