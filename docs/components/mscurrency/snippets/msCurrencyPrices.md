---
title: Сниппет msCurrencyPrices
description: Список цен товара во всех активных валютах
---

# Сниппет msCurrencyPrices

Формирует массив цен для каждой активной валюты и рендерит чанк (по умолчанию `tpl.msCurrencyPrices`).

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `tpl.msCurrencyPrices` | Чанк вывода |
| `price` | `0` | Базовая цена. При `pid` без `price` — из `price` или пересчёт `msc_price` + `currency_id` |
| `old_price` | `0` | Старая цена в базовой валюте. При `pid` — из `old_price` или `msc_old_price` |
| `pid` / `product` | ID ресурса | ID товара |
| `symbol` | `right` | `left` или `right` — какой символ в поле `symbol` строки |

## Поля строки в чанке

| Поле | Описание |
|------|----------|
| `code`, `name` | Код и название валюты |
| `price`, `price_formatted` | Текущая цена |
| `old_price`, `old_price_formatted` | Зачёркнутая цена (если была) |
| `symbol`, `symbol_left`, `symbol_right` | Символы |

Пример разметки чанка `tpl.msCurrencyPrices` (Fenom, как в пакете):

```fenom
{foreach $prices as $row}
  <span class="msc-price-{$row.code}">
    {if $row.old_price_formatted}
      <s>{$row.symbol}{$row.old_price_formatted}</s>
    {/if}
    {$row.symbol}{$row.price_formatted}
  </span>
{/foreach}
```

Вызов сниппета — в обоих синтаксисах ниже.

## Вызов на карточке

::: code-group

```fenom
{'!msCurrencyPrices' | snippet : ['tpl' => 'tpl.msCurrencyPrices', 'pid' => $_modx->resource.id, 'symbol' => 'right']}
```

```modx
[[!msCurrencyPrices?
  &tpl=`tpl.msCurrencyPrices`
  &pid=`[[*id]]`
  &symbol=`right`
]]
```

:::

## Явная базовая цена

::: code-group

```fenom
{'!msCurrencyPrices' | snippet : [
  'tpl' => 'tpl.msCurrencyPrices',
  'price' => 1000,
  'old_price' => 1200,
  'symbol' => 'right'
]}
```

```modx
[[!msCurrencyPrices?
  &tpl=`tpl.msCurrencyPrices`
  &price=`1000`
  &old_price=`1200`
  &symbol=`right`
]]
```

:::

## См. также

- [msCurrencyPrice](msCurrencyPrice)
- [Интеграция](../integration#цена-на-витрине)
