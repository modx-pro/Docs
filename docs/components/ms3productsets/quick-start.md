---
title: Быстрый старт
---
# Быстрый старт

Минимальный сценарий, чтобы за 5-10 минут вывести первую подборку на сайте.

## 1. Установите зависимости

1. В `Extras -> Installer` установите `MiniShop3`, `pdoTools`, `VueTools`.
2. Установите `ms3ProductSets`.
3. Очистите кэш MODX.

## 2. Подключите фронтовые ресурсы

::: code-group

```fenom
{'mspsLexiconScript' | snippet}
<link rel="stylesheet" href="{'assets_url' | option}components/ms3productsets/css/productsets.css">
<script src="{'assets_url' | option}components/ms3productsets/js/productsets.js"></script>
```

```modx
[[!mspsLexiconScript]]
<link rel="stylesheet" href="[[++assets_url]]components/ms3productsets/css/productsets.css">
<script src="[[++assets_url]]components/ms3productsets/js/productsets.js"></script>
```

:::

## 3. Выведите блок в шаблоне карточки товара

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'buy_together',
  'resource_id' => $_modx->resource.id,
  'max_items' => 6,
  'tpl' => 'tplSetItem'
]}
```

```modx
[[!ms3ProductSets?
  &type=`buy_together`
  &resource_id=`[[*id]]`
  &max_items=`6`
  &tpl=`tplSetItem`
]]
```

:::

## 4. Проверьте результат

- Откройте страницу товара.
- Если для товара есть ручные связи, блок покажет их.
- Если ручных связей нет, сработает авто-логика выбранного типа.
- Если подборка пустая, блок не выводится (по умолчанию `hideIfEmpty=true`).

## 5. Добавьте VIP-набор (опционально)

1. Заполните настройку `ms3productsets.vip_set_1` (пример: `12,34,56`).
2. Выведите блок:

::: code-group

```fenom
{'ms3ProductSets' | snippet : [
  'type' => 'vip',
  'set_id' => 1,
  'tpl' => 'tplSetVIP'
]}
```

```modx
[[!ms3ProductSets?
  &type=`vip`
  &set_id=`1`
  &tpl=`tplSetVIP`
]]
```

:::

## Что дальше

- [Типы подборок](types)
- [Интеграция на сайт](integration)
- [API и интерфейсы](api)
- [Руководство по админке](admin)
