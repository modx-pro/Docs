---
title: Сниппет msCurrencyCart
description: Корзина MiniShop3 с кодом валюты и конвертацией цен
---

# Сниппет msCurrencyCart

Обёртка над сниппетом корзины MS3 (по умолчанию `ms3_cart`). Перед рендером она:

- обновляет плейсхолдеры `msc.*`
- синхронизирует символ валюты для `ms3->format->price()` через `msc_sync_ms3_price_symbol()`

При `mscurrency_order_price_mode=user` цены в корзине пересчитывает плагин `mscurrency_product_price` на событии `msOnGetProductPrice`. В строке позиции используйте `price_formatted` / `old_price_formatted` MS3, а не отдельный `msCurrencyPrice`.

Плейсхолдер **`currency`** доступен в чанке `ms3_cart`, если страницу вызываете через этот сниппет (обёртка выставляет его до рендера внутреннего сниппета).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | пусто | Чанк-обёртка с `[[+currency]]` и `[[+output]]` |
| `msCart` | `ms3_cart` | Имя внутреннего сниппета корзины |

Остальные параметры пробрасываются во внутренний сниппет MS3 без изменений.

## Другой сниппет корзины

::: code-group

```fenom
{'!msCurrencyCart' | snippet : ['msCart' => 'ms3_cart']}
```

```modx
[[!msCurrencyCart? &msCart=`ms3_cart`]]
```

:::

## С обёрткой

::: code-group

```fenom
{'!msCurrencyCart' | snippet : ['tpl' => 'tpl.cartWrapper']}
```

```modx
[[!msCurrencyCart? &tpl=`tpl.cartWrapper`]]
```

:::

Пример чанка `tpl.cartWrapper`:

::: code-group

```fenom
<div class="cart" data-currency="{$currency}">
  {$output}
</div>
```

```modx
<div class="cart" data-currency="[[+currency]]">
  [[+output]]
</div>
```

:::

## Без обёртки

::: code-group

```fenom
{'!msCurrencyCart' | snippet}
```

```modx
[[!msCurrencyCart]]
```

:::

Эквивалентно вызову `[[!ms3_cart]]` с подготовкой валюты и символов.

## Строка товара в чанке корзины

Рекомендуется выводить готовые поля MS3:

::: code-group

```fenom
{$product.price_formatted}
{if $product.old_price?}
  <span class="old_price">{$product.old_price_formatted}</span>
{/if}
```

```modx
[[+price_formatted]]
[[+old_price_formatted]]
```

:::

Запасной вариант с `msCurrencyPrice` в строке и нюансы с символом валюты — в [Интеграции](../integration#чанк-корзины-строка-товара).

## См. также

- [msCurrencyGetOrder](msCurrencyGetOrder)
- [Интеграция](../integration#корзина-и-заказ)
- [Системные настройки](../settings) — `mscurrency_order_price_mode`
