---
title: "multicombo"
description: "Массив значений из xPDO optionsSource через MultiSelect с поиском"
---

# Поле multicombo

Версия: **Pro**.

<!-- ![multicombo](/components/pagebuilder/screenshots/fields/multicombo.jpg) -->

## Зачем этот тип

Несколько id из одного класса MODX. Источник списка тот же, что у [combo](combo): `optionsSource`. В данных лежат id, а не объекты с заголовком, как у [relation](relation).

## Когда использовать

- Несколько шаблонов или категорий по id
- Несколько внешних ключей в кастомной секции
- Теги из DISTINCT SQL-запроса

## Советы

Объекты ресурса с заголовком: [multirelation](multirelation). Фиксированный список: [multiselect](multiselect).

## Похожие типы

- [combo](combo) для одного xPDO-значения
- [tablemulticombo](tablemulticombo) для нескольких значений из того же `optionsSource`

## Настройка

```json
{
  "name": "ids",
  "type": "multicombo",
  "label": "ID",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив значений.

## Данные секции {#vyvod-v-section-data}

Ключ `ids` в данных секции: массив значений:

```json
{
  "ids": [
    "admin",
    "editor"
  ]
}
```

## Пример в chunk

::: code-group

```modx
{foreach $ids as $id}
  <span>{$id|escape}</span>
{/foreach}
```

```fenom
{foreach $ids as $id}
  <span>{$id|escape}</span>
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
