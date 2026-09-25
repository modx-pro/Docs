---
title: "embeddedTable"
description: "Конфиг table_key limit filters без строк таблицы в data"
---

# Поле embeddedTable

Версия: **Pro** (`advanced-fields`).

<!-- ![embeddedTable](/components/pagebuilder/screenshots/fields/embeddedTable.jpg) -->

## Зачем этот тип

Строки на сайте отдаёт сниппет PageBuilderTableRows. В секции хранятся не сами строки, а настройки: ключ таблицы, лимит, фильтры, контекст и UTM. Поле берут, когда строк слишком много, чтобы править их в инспекторе.

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
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

Ключ `table_key`, лимит и фильтры задаются в данных секции (инспектор), не в JSON определения поля.

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

::: code-group

```modx
[[!PageBuilderTableRows? &table_key=`products`]]
```

Без `&limit` сниппет берёт **20** строк. В data поля значение по умолчанию для `limit` — **10**: передайте `&limit` из данных секции, если нужен другой размер.

```fenom
{'!PageBuilderTableRows' | snippet : [
  'table_key' => 'products',
  'limit' => 10,
]}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
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
