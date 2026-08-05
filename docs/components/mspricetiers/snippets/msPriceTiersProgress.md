---
title: Сниппет msPriceTiersProgress
description: Прогресс-бар до следующего оптового порога — товар, корзина, сумма заказа
---

# Сниппет msPriceTiersProgress

Блок «До следующей скидки»: сколько ещё добавить и какая будет цена.

Требует **`mspricetiers_progress_bar_enabled`** = Да ([настройки](../settings)).

## Режимы

| Режим | Параметры | Чанк по умолчанию |
|-------|-----------|-------------------|
| Страница товара | `product`, `quantity` | `mspricetiers.progress` |
| Корзина (по количеству) | `cart=1` | `mspricetiers.progress_cart` |
| Сумма корзины | `cartSum=1` / `cart_sum=1` | `mspricetiers.progress_cart_sum` |

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `product` | ID ресурса | Товар (режим страницы товара) |
| `quantity` / `count` | `1` | Текущее количество |
| `cart` | `0` | `1` — прогресс по количеству в корзине |
| `cartSum` / `cart_sum` | `0` | `1` — прогресс по сумме корзины |
| `tpl` | auto по режиму | Чанк вывода |
| `toPlaceholder` | — | Плейсхолдер |
| `cart_items` / `cartItems` | — | JSON позиций для режима `cart` |
| `subtotal` / `cart_subtotal` | — | Сумма корзины для режима `cartSum` |
| `user_groups` / `userGroups` | — | Фильтр групп |
| `current_time` / `currentTime` | — | Симуляция времени |

Режим по сумме корзины требует **`mspricetiers_cart_tiers_enabled`** = Да.

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

## В корзине (по количеству)

::: code-group

```fenom
<div data-mspt-live="progress-cart">
  {'!msPriceTiersProgress' | snippet : ['cart' => 1, 'tpl' => 'mspricetiers.progress_cart']}
</div>
```

```modx
<div data-mspt-live="progress-cart">
  [[!msPriceTiersProgress?
    &cart=`1`
    &tpl=`mspricetiers.progress_cart`
  ]]
</div>
```

:::

## Прогресс по сумме корзины

::: code-group

```fenom
<div data-mspt-live="progress-cart-sum">
  {'!msPriceTiersProgress' | snippet : ['cartSum' => 1, 'tpl' => 'mspricetiers.progress_cart_sum']}
</div>
```

```modx
<div data-mspt-live="progress-cart-sum">
  [[!msPriceTiersProgress?
    &cartSum=`1`
    &tpl=`mspricetiers.progress_cart_sum`
  ]]
</div>
```

:::

На странице корзины нужны [msPriceTiers.initialize](msPriceTiersInitialize) и обёртки `data-mspt-live`. После **`ms3:cart:updated`** JS обновит HTML через `action=sections`.

## Плейсхолдеры (основные)

| Плейсхолдер | Описание |
|-------------|----------|
| `progress_message` | Текст подсказки |
| `progress_bar_width` | Ширина полосы, % |
| `quantity_needed` | Сколько ещё штук до порога |
| `next_price_formatted` | Цена на следующем пороге |
| `savings_formatted` | Экономия |

Тексты прогресс-бара берутся из lexicon с `{count}`, `{amount}`, `{discount}` — см. [Чанки](../chunks#прогресс-бар).

## См. также

- [Интеграция — корзина](../integration#корзина)
- [Системные настройки](../settings#прогресс-бар)
