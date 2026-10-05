---
title: "multicombo"
description: "Массив значений из xPDO optionsSource через MultiSelect с поиском"
---

# Поле multicombo

Версия: **Pro** (`advanced-fields`).

<!-- ![multicombo](/components/pagebuilder/screenshots/fields/multicombo.jpg) -->

## Зачем этот тип

Несколько id из одного класса MODX. Источник списка тот же, что у [combo](combo): `optionsSource`. В данных лежат id, а не объекты с заголовком, как у [relation](relation).

## Когда использовать

- Несколько шаблонов или категорий по id
- Несколько внешних ключей в собственной секции
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
  "optionsSource": {
    "class": "modUser"
  },
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Данные секции {#vyvod-v-section-data}

Ключ `ids` — массив значений:

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
<span>[[+ids.0]]</span>
```

```fenom
{foreach $ids as $id}
  <span>{$id|escape}</span>
{/foreach}
```

:::

## Общие свойства

`optionsSource` задаётся как у [combo](combo), список разрешённых классов — в [types](types#optionssource).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
