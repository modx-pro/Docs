---
title: "number"
description: "Число для счётчиков, лимитов и порядков"
---

# Поле number

Версия: **Free**.

<!-- ![number](/components/pagebuilder/screenshots/fields/number.png) -->

## Зачем этот тип

Тип number в инспекторе, не строка с цифрами. Pro: `responsive` для разных breakpoint. Удобен для сортировки и арифметики в chunk.

## Когда использовать

- Лимит элементов, процент скидки, год
- Число в блоке stats рядом с label
- Порядок или вес без select

## Советы

Деньги и формат валюты: [currency](currency) (Pro). Телефон или артикул с маской: [imask](imask) (Pro).

## Похожие типы

- [currency](currency) для сумм с символом валюты
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

## Значение

Число или `null`.

## Данные секции {#vyvod-v-section-data}

Ключ `count` в данных секции (число или `null`):

```json
{
  "count": 12
}
```

## Пример в chunk

```fenom
{if $count !== null}<span class="count">{$count}</span>{/if}
```

## Примечание

Лимиты: `min`, `max`, `minValue`, `maxValue`, `allowDecimals`. Pro: `responsive`.

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

**Pro** (capability `responsive`): при `responsive: true` в данных секции: ключи `desktop`, `tablet`, `mobile` вместо скаляра.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
