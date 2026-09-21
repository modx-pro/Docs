---
title: "daterange"
description: "Две даты start и end. Публикация падает, если начало позже конца. Слой Pro."
---

# Поле daterange

Версия: **Pro** (`advanced-fields`).

Два конца диапазона: `start` и `end`, строки дат. Если заданы оба и `start` позже `end`, публикация завершается ошибкой. Один пустой конец проверку не роняет.

## Настройка

```json
{
  "name": "period",
  "type": "daterange",
  "label": "Период"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "period": { "start": "2026-09-01", "end": "2026-09-30" }
}
```

## Пример в chunk

::: code-group

```modx
<time>[[+period.start]]</time> - <time>[[+period.end]]</time>
```

```fenom
<time>{$period.start|escape}</time> - <time>{$period.end|escape}</time>
```

:::

## Похожие типы

- [date](date) для одной даты
- [datetime](datetime) для даты со временем
