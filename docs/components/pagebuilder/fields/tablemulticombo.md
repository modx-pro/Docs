---
title: "tablemulticombo"
description: "Несколько значений из класса MODX через optionsSource"
---

# Поле tablemulticombo

Версия: **Pro**.

<!-- ![tablemulticombo](/components/pagebuilder/screenshots/fields/tablemulticombo.jpg) -->

## Зачем этот тип

Несколько значений из того же источника, что у [tablecombo](tablecombo): класс MODX и `optionsSource`. В инспекторе это список с поиском, не сетка. В данных только значения `valueField`, без самих строк. Без `optionsSource` список пустой.

## Когда использовать

- Фильтр по нескольким брендам
- Несколько ключей категорий из таблицы
- Подборка id без модального relation

## Советы

Объекты с pagetitle: [multirelation](multirelation). Статический список: [multiselect](multiselect).

## Похожие типы

- [tablecombo](tablecombo) для одного table id
- [multicombo](multicombo) для списка xPDO

## Настройка

```json
{
  "name": "templates",
  "type": "tablemulticombo",
  "label": "Шаблоны",
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

Массив значений `valueField`.

## Данные секции {#vyvod-v-section-data}

Ключ `templates` в данных секции: массив значений:

```json
{
  "templates": [3, 5]
}
```

## Пример в chunk

::: code-group

```modx
{foreach $templates as $id}
  <span>{$id}</span>
{/foreach}
```

```fenom
{foreach $templates as $id}
  <span>{$id}</span>
{/foreach}
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
