---
title: Сниппет msPriceTiersProgress
description: Прогресс-бар до следующего оптового порога на товаре или в корзине
---

# Сниппет msPriceTiersProgress

Визуальный блок «До следующей скидки»: сколько ещё добавить и какая будет цена.

Требует **`mspricetiers_progress_bar_enabled`** = Да ([настройки](../settings)).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `product` | ID ресурса | Товар для расчёта (страница товара) |
| `cart` | `0` | `1` — агрегированный прогресс по корзине |
| `tpl` | `mspricetiers.progress` или `mspricetiers.progress_cart` | Чанк вывода |

## На странице товара

::: code-group

```fenom
{'!msPriceTiersProgress' | snippet : [
  'product' => $_modx->resource.id,
  'tpl' => 'mspricetiers.progress'
]}
```

```modx
[[!msPriceTiersProgress?
  &product=`[[*id]]`
  &tpl=`mspricetiers.progress`
]]
```

:::

Компактный вариант — чанк `mspricetiers.progress_popup`.

## В корзине

::: code-group

```fenom
{'!msPriceTiersProgress' | snippet : [
  'cart' => 1,
  'tpl' => 'mspricetiers.progress_cart'
]}
```

```modx
[[!msPriceTiersProgress?
  &cart=`1`
  &tpl=`mspricetiers.progress_cart`
]]
```

:::

На странице корзины также нужен [msPriceTiers.initialize](msPriceTiersInitialize), если используется JS корзины MS3 с пересчётом.

## Плейсхолдеры (основные)

| Плейсхолдер | Описание |
|-------------|----------|
| `progress_message` | Текст подсказки |
| `progress_bar_width` | Ширина полосы, % |
| `quantity_needed` | Сколько ещё штук до порога |
| `next_price_formatted` | Цена на следующем пороге |
| `savings_formatted` | Экономия |

Чанки: [Чанки](../chunks).

## См. также

- [Интеграция — корзина](../integration#корзина)
- [Системные настройки](../settings#прогресс-бар)
