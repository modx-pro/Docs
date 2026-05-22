---
title: Сниппет msPriceTiers.initialize
description: Подключение CSS, JS и конфигурации msPriceTiers на витрине
---

# Сниппет msPriceTiers.initialize

Регистрирует фронтенд-ресурсы и создаёт **`window.msPriceTiersConfig`** (URL connector, флаги, лексикон).

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

- `assets/components/mspricetiers/css/mspricetiers.css` (или min)
- `assets/components/mspricetiers/js/mspricetiers.js` (или min)
- Глобальный объект **`msPriceTiers`** с методом `fetchPrice()` и подпиской на `ms3variants:selected`

## Где вызывать

- Шаблон **msProduct** — обязательно, если нужна динамическая цена.
- Шаблон **категории** — если на листинге планируется AJAX-цена или таблицы порогов в карточках.

Без этого сниппета [msPriceTiers](msPriceTiers) выведет только статичный HTML без пересчёта при смене количества.

## См. также

- [Подключение на сайте](../frontend)
- [Сниппет msPriceTiers](msPriceTiers)
