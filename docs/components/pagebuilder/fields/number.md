---
title: "number"
description: "Число для счётчиков, лимитов и порядков"
---

# Поле number

Версия: **Free**.

<!-- ![number](/components/pagebuilder/screenshots/fields/number.jpg) -->

## Зачем этот тип

В инспекторе это число, а не строка из цифр. В Pro можно задать разные значения для компьютера, планшета и телефона (`responsive`). Число удобно сортировать и считать в чанке.

## Когда использовать

- Лимит элементов, процент скидки, год
- Число в блоке stats рядом с label
- Порядок или вес без select

## Советы

Деньги и формат валюты: [currency](currency) (Pro). Телефон или артикул с маской: [imask](imask) (Pro).

## Похожие типы

- [select](select) для фиксированного набора чисел

## Настройка

```json
{
  "name": "count",
  "type": "number",
  "label": "Количество",
  "min": 0,
  "max": 100,
  "allowDecimals": false,
  "default": 0,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Данные секции {#vyvod-v-section-data}

Ключ `count` — число или `null`:

```json
{
  "count": 12
}
```

## Пример в chunk

::: code-group

```modx
<span class="count">[[+count]]</span>
```

```fenom
{if $count !== null}<span class="count">{$count}</span>{/if}
```

:::

## Примечание

Лимиты: `min`, `max`, `minValue`, `maxValue`, `allowDecimals`.

## Общие свойства

**Pro**: при `responsive: true` в данных секции лежит объект `desktop` / `tablet` / `mobile` вместо числа, см. [responsive](overview#pro-responsive).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
