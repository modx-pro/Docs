---
title: Сниппет msCurrencyPrice
description: Конвертация одной цены в выбранную валюту
---

# Сниппет msCurrencyPrice

Обёртка над `MsCurrency::getPrice()`. Возвращает строку (с форматированием MS3) или число.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `price` | `0` | Цена в **базовой** валюте |
| `pid` | `0` | ID товара (`msProduct`). При `price=0` база из товара / `msc_price` |
| `cid` | `0` | ID валюты ответа. `0` — валюта покупателя |
| `course` | `0` | Ручной делитель. `0` — использовать `val` валюты |
| `format` | `1` | `1` — формат по `ms3_price_format`. `0` — число без форматирования. При `1` не дописывайте символ валюты вручную |

## AJAX-разметка

При **`mscurrency_ajax_switch=1`** и **`pid > 0`** сниппет оборачивает вывод в:

```html
<span data-msc-price data-msc-pid="123">…</span>
```

Без `pid` обёртка не ставится — при AJAX цена на странице не обновится без reload. Передавайте `pids[]` в POST `web/currency/set` через JS переключателя (собирается автоматически с `[data-msc-pid]`).

## На карточке товара

::: code-group

```fenom
{'!msCurrencyPrice' | snippet : ['price' => $price, 'pid' => $_modx->resource.id]}
```

```modx
[[!msCurrencyPrice?
  &price=`[[!+price]]`
  &pid=`[[*id]]`
]]
```

:::

## Только ID товара

База подставится из MS3:

::: code-group

```fenom
{'!msCurrencyPrice' | snippet : ['pid' => 123]}
```

```modx
[[!msCurrencyPrice? &pid=`123`]]
```

:::

## В каталоге (msProducts)

::: code-group

```fenom
{'!msCurrencyPrice' | snippet : ['price' => $row.price, 'pid' => $row.id]}
```

```modx
[[!msCurrencyPrice?
  &price=`[[+price]]`
  &pid=`[[+id]]`
]]
```

:::

## Принудительная валюта и формат

::: code-group

```fenom
{'!msCurrencyPrice' | snippet : ['price' => 100, 'cid' => 2, 'format' => 0]}
```

```modx
[[!msCurrencyPrice?
  &price=`100`
  &cid=`2`
  &format=`0`
]]
```

:::

## Событие

После расчёта вызывается **`mscOnGetPrice`** с параметрами `price`, `newPrice`, `currencyId`, `course`.

## См. также

- [msCurrencyPrices](msCurrencyPrices)
- [События MODX](../events#mscongetprice)
