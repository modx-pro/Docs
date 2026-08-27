---
title: "tablemulticombo"
description: "Массив id строк custom table через MultiSelect"
---

# Поле tablemulticombo

Версия: **Pro**.

<!-- ![tablemulticombo](/components/pagebuilder/screenshots/fields/tablemulticombo.png) -->

## Зачем этот тип

Несколько id из того же table source. Парный тип к [tablecombo](tablecombo). В data только id, без inline-строк.

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
    "class": "modTemplate"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив id.

## Данные секции {#vyvod-v-section-data}

Ключ `templates` в данных секции: массив значений:

```json
{
  "templates": [
    "admin",
    "editor"
  ]
}
```

## Пример в chunk

```fenom
{foreach $templates as $id}
  <span>{$id}</span>
{/foreach}
```

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
