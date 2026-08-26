---
title: "keyvalue"
description: "Массив пар ключ–значение без typed columns"
---

# Поле keyvalue

Слой: **Pro**.

<!-- ![keyvalue](/components/pagebuilder/screenshots/fields/keyvalue.png) -->

## Зачем этот тип

Проще [table](table) для одной text-колонки value. `keyLabel` и `valueLabel` настраивают подписи. Произвольное число строк без schema columns.

## Когда использовать

- Meta-атрибуты, params, простые specs
- Кастомные props для chunk
- Список «название: значение» без типов ячеек

## Советы

Typed cells или image в ячейке: [table](table). Одна плоская map иногда удобнее repeater из двух text.

## Похожие типы

- [table](table) для typed grid
- [repeater](repeater) с двумя text для той же формы (Free)

## Настройка

```json
{
  "name": "meta",
  "type": "keyvalue",
  "label": "Мета",
  "keyLabel": "Параметр",
  "valueLabel": "Значение",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив `{ key, value }`.

## Данные секции {#vyvod-v-section-data}

Ключ `meta` в данных секции: массив пар:

```json
{
  "meta": [
    {
      "key": "author",
      "value": "PageBuilder"
    },
    {
      "key": "version",
      "value": "1.0"
    }
  ]
}
```

## Пример в chunk

```fenom
{foreach $meta as $row}
  <div><strong>{$row.key|escape}:</strong> {$row.value|escape}</div>
{/foreach}
```

## Примечание

Подписи колонок: `keyLabel`, `valueLabel` (или `key_label` / `value_label`).

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `keyLabel`, `valueLabel` (или `key_label` / `value_label`).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
