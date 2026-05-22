---
title: Сниппет msPriceTiers
description: Вывод таблицы оптовых порогов для товара MiniShop3
---

# Сниппет msPriceTiers

Формирует HTML таблицы (или другого вида) ценовых порогов для указанного товара. Чанки — Fenom (`@FILE`).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `product` | ID текущего ресурса | ID товара (`msProduct`) |
| `tpl` | `mspricetiers.table` | Чанк-обёртка |
| `tplRow` | `mspricetiers.row` | Чанк строки |
| `toPlaceholder` | — | Имя плейсхолдера вместо прямого вывода |

## Вызов на карточке товара

::: code-group

```fenom
{'!msPriceTiers' | snippet : [
  'product' => $_modx->resource.id,
  'tpl' => 'mspricetiers.table',
  'tplRow' => 'mspricetiers.row'
]}
```

```modx
[[!msPriceTiers?
  &product=`[[*id]]`
  &tpl=`mspricetiers.table`
  &tplRow=`mspricetiers.row`
]]
```

:::

## В плейсхолдер

::: code-group

```fenom
{'!msPriceTiers' | snippet : [
  'product' => $_modx->resource.id,
  'toPlaceholder' => 'price_tiers'
]}
{$_modx->getPlaceholder('price_tiers')}
```

```modx
[[!msPriceTiers?
  &product=`[[*id]]`
  &toPlaceholder=`price_tiers`
]]
[[+price_tiers]]
```

:::

## В каталоге (ID из строки)

::: code-group

```fenom
{'!msPriceTiers' | snippet : ['product' => $id, 'tpl' => 'mspricetiers.compact', 'tplRow' => 'mspricetiers.row_compact']}
```

```modx
[[!msPriceTiers?
  &product=`[[+id]]`
  &tpl=`mspricetiers.compact`
  &tplRow=`mspricetiers.row_compact`
]]
```

:::

Перед вызовом на странице категории желателен [msPriceTiers.initialize](msPriceTiersInitialize).

## Плейсхолдеры в tplRow

| Плейсхолдер | Описание |
|-------------|----------|
| `count_from` | Минимальное количество |
| `price` / `price_formatted` | Цена порога |
| `old_price` / `old_price_formatted` | Зачёркнутая цена |
| `discount` | Разница с базой |
| `rank` | Сортировка |

Полный список чанков: [Чанки](../chunks).

## Условия вывода

Таблица пустая, если:

- `mspricetiers_enabled` = Нет;
- нет активных порогов у товара и категории;
- пороги не подходят по группе пользователя или датам действия.

Диагностика: [FAQ](../faq#таблица-порогов-пустая).

## См. также

- [msPriceTiers.initialize](msPriceTiersInitialize)
- [Подключение на сайте](../frontend)
