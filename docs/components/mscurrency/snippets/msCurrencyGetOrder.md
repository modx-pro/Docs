---
title: Сниппет msCurrencyGetOrder
description: Блок заказа MiniShop3 со снимком валюты
---

# Сниппет msCurrencyGetOrder

Обёртка над `ms3_get_order` (или другим сниппетом из параметра `msGetOrder`). Для оформленного заказа подставляет валюту из **`properties.msc`** / **`msmc`**. Если снимка нет, берёт текущую валюту из сессии.

Перед рендером, как и у корзины, вызывается `msc_sync_ms3_price_symbol()`. В строках позиций заказа используйте те же `price_formatted` / `old_price_formatted`, что и в корзине.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | пусто | Чанк-обёртка с `[[+currency]]` и `[[+output]]` |
| `msGetOrder` | `ms3_get_order` | Внутренний сниппет заказа |

Параметры заказа (`id`, `tpl` позиций и т.д.) передаются как у MS3.

## Другой сниппет заказа

::: code-group

```fenom
{'!msCurrencyGetOrder' | snippet : ['msGetOrder' => 'ms3_get_order']}
```

```modx
[[!msCurrencyGetOrder? &msGetOrder=`ms3_get_order`]]
```

:::

## Вызов на странице «Спасибо за заказ»

::: code-group

```fenom
{'!msCurrencyGetOrder' | snippet : ['tpl' => 'tpl.orderWrapper']}
```

```modx
[[!msCurrencyGetOrder? &tpl=`tpl.orderWrapper`]]
```

:::

## Без обёртки

::: code-group

```fenom
{'!msCurrencyGetOrder' | snippet}
```

```modx
[[!msCurrencyGetOrder]]
```

:::

## Код валюты в заказе

::: code-group

```fenom
{$order.properties.msc.code}
{$order.properties.msc.symbol_left}{$order.cost}
{$order.properties.msc.symbol_right}
```

```modx
[[+properties.msc.code]]
[[+properties.msc.symbol_left]][[+cost]]
[[+properties.msc.symbol_right]]
```

:::

## См. также

- [msCurrencyCart](msCurrencyCart)
- [Интеграция](../integration#корзина-и-заказ)
