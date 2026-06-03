---
title: Сниппеты
description: Обзор сниппетов msCurrency для витрины MiniShop3
---

# Сниппеты msCurrency

| Сниппет | Назначение |
|---------|------------|
| [msCurrency](msCurrency) | Переключатель валют. Пустой `tpl` — таблица плейсхолдеров |
| [msCurrencyPrice](msCurrencyPrice) | Одна цена в выбранной валюте: `price`, `pid`, `cid`, `course`, `format` |
| [msCurrencyPrices](msCurrencyPrices) | Цены по всем активным валютам: `price`, `old_price`, `pid`, `symbol`, `tpl` |
| [msCurrencyCart](msCurrencyCart) | Как `ms3_cart` + `tpl` с `[[+currency]]` / `[[+output]]` |
| [msCurrencyGetOrder](msCurrencyGetOrder) | Как `ms3_get_order` + обёртка и снимок валюты |
| `mscLexiconScript` | JSON лексикона для JS на витрине |

## Порядок на типовой странице

1. **msCurrency** — в шапке или на карточке (один раз на странице достаточно).
2. **msCurrencyPrice** или стандартные плейсхолдеры MS3 (если включён `mscurrency_product_price`).
3. В корзине и оформлении — **msCurrencyCart** / **msCurrencyGetOrder** при `mscurrency_order_price_mode=user`. В строке позиции достаточно `price_formatted` / `old_price_formatted` MS3.

## Таблица соответствий (MODX / Fenom)

| Назначение | MODX | Fenom |
|------------|------|-------|
| Переключатель | `[[!msCurrency? &tpl=`tpl.msCurrency`]]` | `{'!msCurrency' \| snippet : ['tpl' => 'tpl.msCurrency']}` |
| Цена | `[[!msCurrencyPrice? &price=`100`]]` | `{'!msCurrencyPrice' \| snippet : ['price' => 100]}` |
| Цена + товар | `[[!msCurrencyPrice? &pid=`123`]]` | `{'!msCurrencyPrice' \| snippet : ['pid' => 123]}` |
| Код валюты | `[[!+msc.code]]` | `{$_modx->getPlaceholder('msc.code')}` |
| Курс | `[[!+msc.val]]` | `{$_modx->getPlaceholder('msc.val')}` |
| Символы | `[[!+msc.symbol_left]]` / `[[!+msc.symbol_right]]` | `{$_modx->getPlaceholder('msc.symbol_left')}` |
| Корзина | `[[!msCurrencyCart? &tpl=`tpl.cart`]]` | `{'!msCurrencyCart' \| snippet : ['tpl' => 'tpl.cart']}` |
| Код в чанке корзины | `[[+currency]]` | `{$currency}` |
| Цена в строке корзины | `[[+price_formatted]]` | `{$product.price_formatted}` |
| Старая цена в корзине | `[[+old_price_formatted]]` | `{$product.old_price_formatted}` |
| Заказ | `[[!msCurrencyGetOrder]]` | `{'!msCurrencyGetOrder' \| snippet}` |
| Список валют | `[[!msCurrencyPrices? &tpl=`tpl.msCurrencyPrices`]]` | `{'!msCurrencyPrices' \| snippet : ['tpl' => 'tpl.msCurrencyPrices']}` |
| Лексикон JS | `[[!mscLexiconScript]]` | `{'!mscLexiconScript' \| snippet}` |
| Отладка `msc.*` | `[[!msCurrency? &tpl=``]]` | `{'!msCurrency' \| snippet : ['tpl' => '']}` |

Подробнее про чанк корзины (рекомендуемый и запасной вариант): [Интеграция — корзина и заказ](../integration#корзина-и-заказ).

## Кэширование

Вызывайте сниппеты некэшированно (`[[!...]]` или `{'!...' | snippet}`), иначе валюта из сессии не подтянется.

## Плейсхолдеры сессии

После выбора валюты доступны `msc.*` и дубли `msmc.*`:

::: code-group

```fenom
{$_modx->getPlaceholder('msc.code')} — {$_modx->getPlaceholder('msc.name')} ({$_modx->getPlaceholder('msc.val')})
```

```modx
[[!+msc.code]] — [[!+msc.name]] ([[!+msc.val]])
```

:::

## Лексикон для JS

::: code-group

```fenom
{'!mscLexiconScript' | snippet}
```

```modx
[[!mscLexiconScript]]
```

:::

## См. также

- [Интеграция](../integration)
- [Системные настройки](../settings)
