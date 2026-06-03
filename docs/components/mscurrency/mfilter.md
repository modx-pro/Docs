---
title: mFilter
description: Фильтр каталога currency_price — цена в валюте пользователя
---

# mFilter + msCurrency

Опциональная интеграция: слайдер и SEO-URL фильтра по цене показывают диапазон в **валюте покупателя**, а в индексе mFilter цена хранится в **базовой** валюте.

## Настройка

1. Установите **[mFilter](/components/mfilter/)** и **msCurrency**.
2. Включите плагин **`mscurrency_mfilter`** (событие `OnMFilterInit`).
3. В наборе фильтров каталога укажите тип **`currency_price`** вместо обычного числового фильтра по `price`.

Пример:

::: code-group

```fenom
{'!mFilter' | snippet : ['filters' => 'ms3_product|price:currency_price']}
```

```modx
[[!mFilter?
  &filters=`ms3_product|price:currency_price`
]]
```

:::

После смены типа очистите кэш. При необходимости переиндексируйте каталог.

## Поведение

- Индекс фасетов хранит цену в базовой валюте (как в MS3).
- На витрине слайдер и подписи показывают валюту пользователя (`SelectedCurrencyResolver`: сессия + `mscurrency_selected_currency_default`).
- При применении фильтра диапазон сначала переводится в базовую валюту.

Реализация: `CurrencyPriceNumberFilterType` (extends `NumberFilterType` из mFilter). Без mFilter подключается fallback-класс для dev.

## JS на витрине

На страницах каталога с mFilter подключите:

`assets/components/mscurrency/js/web/mfilter-currency.js`

(или включите логику в свой frontend-бандл).

## Headless / API apply

Перед запросом к API mFilter переведите `price.min` / `price.max` из валюты пользователя в базовую:

```php
$container = \mscurrency\Application\ServiceContainer::get($modx);
$filter = \mscurrency\Integration\MFilter\CurrencyPriceFilterTypeFactory::create(
    $container->priceConversion(),
    $container->selectedCurrency(),
    $modx,
);
```

Конвертация диапазона также в `PriceConversionService::convertBoundsToBase()`.

## Цена в чанке каталога

::: code-group

```fenom
{'!msCurrencyPrice' | snippet : ['price' => $row.price, 'pid' => $row.id]}
```

```modx
[[!msCurrencyPrice?
  &price=`[[!+price]]`
  &pid=`[[+id]]`
]]
```

:::

## См. также

- [Интеграция](integration)
- [Сниппет msCurrencyPrice](snippets/msCurrencyPrice)
