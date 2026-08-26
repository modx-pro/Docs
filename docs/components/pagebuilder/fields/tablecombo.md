---
title: "tablecombo"
description: "Одно id строки custom table через optionsSource table"
---

# Поле tablecombo

Слой: **Pro**.

<!-- ![tablecombo](/components/pagebuilder/screenshots/fields/tablecombo.png) -->

## Зачем этот тип

Select с поиском по строкам embedded/custom table. Альтернатива [combo](combo), когда источник не xPDO-класс. Требует Pro и capability `advanced-fields`.

## Когда использовать

- Строка бренда или вендора из таблицы MS
- id из колонки Collections
- Динамический pick, когда modResource не подходит

## Советы

Picker modResource: [relation](relation) или [combo](combo). Несколько id: [tablemulticombo](tablemulticombo).

## Похожие типы

- [combo](combo) для стандартного xPDO-класса
- [embeddedTable](embeddedTable) для вывода многих строк по `table_key`

## Настройка

```json
{
  "name": "template",
  "type": "tablecombo",
  "label": "Шаблон",
  "optionsSource": {
    "class": "modTemplate",
    "valueField": "id",
    "labelField": "templatename"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Значение `valueField`.

## Данные секции {#vyvod-v-section-data}

Ключ `template` в данных секции: значение `valueField` из `optionsSource`:

```json
{
  "template": 3
}
```

## Пример в chunk

```fenom
{if $template}{$template}{/if}
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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
