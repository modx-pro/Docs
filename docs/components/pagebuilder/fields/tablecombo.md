---
title: "tablecombo"
description: "Выпадающий список из класса MODX через optionsSource"
---

# Поле tablecombo

Версия: **Pro**.

<!-- ![tablecombo](/components/pagebuilder/screenshots/fields/tablecombo.jpg) -->

## Зачем этот тип

Выпадающий список. Варианты загружаются из класса MODX через `optionsSource` и процессор `mgr/field/options`. В инспекторе это не сетка: сетка строк у поля [table](table). Нужны PageBuilder Pro и возможность `advanced-fields`. Без `optionsSource` список пустой.

## Когда использовать

- Шаблон или другой класс MODX (`modTemplate` и похожие)
- Одна запись своего xPDO-класса, если есть поле id и поле подписи
- Когда окно [relation](relation) не нужно

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
    "labelField": "templatename",
    "limit": 50
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

::: code-group

```modx
[[+template]]
```

```fenom
{if $template}{$template}{/if}
```

:::

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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
