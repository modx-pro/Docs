---
title: Сниппет msPriceTiers
description: Вывод таблицы оптовых порогов для товара MiniShop3
---

# Сниппет msPriceTiers

Формирует HTML таблицы (или бейдж/компактный вид) ценовых порогов для товара. Чанки — Fenom (`@FILE`, рендер через pdoTools Fetch).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `product` | ID текущего ресурса | ID товара (`msProduct`) |
| `tpl` | `mspricetiers.table` | Чанк-обёртка |
| `tplRow` | `mspricetiers.row` | Чанк строки (не для `badge`) |
| `quantity` | `1` | Количество для подсветки активного порога и подсказки |
| `toPlaceholder` | — | Имя плейсхолдера вместо прямого вывода |
| `user_groups` / `userGroups` | — | JSON/array ID групп для фильтра отображения |
| `current_time` / `currentTime` | — | Симуляция времени (`YYYY-MM-DD HH:mm:ss`) |
| `variant_id` / `variant` | — | ID варианта ms3Variants для базовой цены |

Сниппет выводит **применимые** пороги: `is_active`, группы (`mspricetiers_user_groups_enabled`), даты (`mspricetiers_time_based_enabled`).

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

Перед вызовом на странице категории — [msPriceTiers.initialize](msPriceTiersInitialize).

## Плейсхолдеры в tplRow

| Плейсхолдер | Описание |
|-------------|----------|
| `count_from` | Минимальное количество |
| `price` / `price_formatted` | Цена порога |
| `old_price` / `old_price_formatted` | Зачёркнутая цена (из MS3, не из tier) |
| `discount_percent` | Скидка % (если режим «%») |
| `rank` | Сортировка |

Полный список чанков: [Чанки](../chunks).

## Условия вывода

Таблица пустая, если:

- `mspricetiers_enabled` = Нет;
- нет активных порогов у товара и категории;
- пороги не подходят по группе пользователя или датам.

Диагностика: [FAQ](../faq#таблица-порогов-пустая).

## См. также

- [msPriceTiers.initialize](msPriceTiersInitialize)
- [Подключение на сайте](../frontend)
