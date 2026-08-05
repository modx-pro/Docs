---
title: Сниппет msPriceTiers.initialize
description: Подключение CSS, JS и конфигурации msPriceTiers на витрине
---

# Сниппет msPriceTiers.initialize

Регистрирует фронтенд-ресурсы и создаёт **`window.msPriceTiersConfig`**.

## Параметры

Нет.

## Вызов

::: code-group

```fenom
{'!msPriceTiers.initialize' | snippet}
```

```modx
[[!msPriceTiers.initialize]]
```

:::

## Что подключается

- `assets/components/mspricetiers/js/web/mspricetiers.css` (cache bust `?v=filemtime`)
- `assets/components/mspricetiers/js/web/mspricetiers.js`
- Скрипт инициализации **`window.msPriceTiersConfig`**
- Глобальный объект **`msPriceTiers`** с `fetchPrice()`, `fetchSections()`, подписками на события

## msPriceTiersConfig

| Поле | Описание |
|------|----------|
| `assetsUrl` | Базовый URL assets |
| `connectorUrl` | Web connector |
| `enabled` | `mspricetiers_enabled` |
| `applyOnProductPage` | `mspricetiers_apply_on_product_page` |
| `quantityHintEnabled` | `mspricetiers_progress_bar_enabled` |
| `numberLocale` | `ru-RU` / `en-US` |
| `messages.untilNext` | Шаблон подсказки «ещё N шт.» (`{count}`) |
| `messages.tierPrice` | Шаблон цены на пороге |
| `messages.maxDiscount` | Максимальная скидка достигнута |
| `messages.savings` | Префикс экономии |
| `messages.currency` | Символ валюты из lexicon |

## Где вызывать

- Шаблон **msProduct** — если нужна динамическая цена.
- Шаблон **корзины** — для прогресса с `data-mspt-live`.
- Шаблон **категории** — если на листинге AJAX-цена или таблицы в карточках.

Без этого сниппета [msPriceTiers](msPriceTiers) выведет статичный HTML без пересчёта при смене количества.

## См. также

- [Подключение на сайте](../frontend)
- [Сниппет msPriceTiers](msPriceTiers)
