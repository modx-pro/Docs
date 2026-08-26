---
title: "embeddedTable"
description: "Конфиг table_key limit filters без строк таблицы в data"
---

# Поле embeddedTable

Слой: **Pro**.

<!-- ![embeddedTable](/components/pagebuilder/screenshots/fields/embeddedTable.png) -->

## Зачем этот тип

Строки грузит сниппет PageBuilderTableRows на фронте. В data объект с `table_key`, `limit`, `filters`, `use_context`, `utm`. Подходит для catalog-scale data.

## Когда использовать

- Products grid из Collections table
- Любая зарегистрированная `table_key`
- Когда строк слишком много для field [table](table)

## Советы

В chunk: `[[!PageBuilderTableRows? &table_key=`...`]]`. Статические 5–10 строк: [table](table).

## Похожие типы

- [table](table) для inline rows в секции
- [combo](combo) если нужен только один id из таблицы

## Настройка

```json
{
  "name": "table",
  "type": "embeddedTable",
  "label": "Таблица",
  "table_key": "products",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ table_key, limit, filters, … }`.

## Данные секции {#vyvod-v-section-data}

Ключ `table` в данных секции: конфиг выборки (строки таблицы не входят в data):

```json
{
  "table": {
    "table_key": "products",
    "limit": 10,
    "filters": {
      "category": "phones"
    },
    "use_context": true,
    "context_column": "context_key",
    "use_utm": false,
    "utm": {}
  }
}
```

- Строки на фронте: сниппет `PageBuilderTableRows` с тем же `table_key`.

## Пример в chunk

```html
[[!PageBuilderTableRows? &table_key=`products` &limit=`10`]]
```

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

- Дополнительно: `table_key`, `limit`, `filters`, `use_context`, `utm`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
