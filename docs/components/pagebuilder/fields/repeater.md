---
title: "repeater"
description: "Массив объектов с nested fields и служебным _rowId"
---

# Поле repeater

Слой: **Free**.

<!-- ![repeater](/components/pagebuilder/screenshots/fields/repeater.png) -->

## Зачем этот тип

- Любая вложенная схема полей в каждой строке
- _rowId стабилен для key в Vue и anchor
- Free-способ списков cards, FAQ, slides

## Когда использовать

- items карточек, вопросы FAQ, слайды
- Любой «добавить строку» в секции
- Nested image + text без отдельного JSON типа

## Советы

- В chunk `{foreach}` и `{$item._rowId|escape}` при нужде
- Один объект без списка это [jsongrid](jsongrid) (Pro)

## Похожие типы

- [jsongrid](jsongrid) для одной строки-объекта (Pro)
- [table](table) для табличного grid с columns (Pro)

## Настройка

```json
{
  "name": "items",
  "type": "repeater",
  "label": "Элементы",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "label": "Заголовок"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив объектов; у строк есть `_rowId`.

## Вывод в section.data

Ключ `items` в `section.data` — массив строк; у каждой строки стабильный `_rowId`:

```json
{
  "items": [
    {
      "_rowId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "title": "Пункт 1"
    },
    {
      "_rowId": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
      "title": "Пункт 2"
    }
  ]
}
```

## Пример в chunk

```fenom
{foreach $items as $item}
  <article id="{$item._rowId|escape}">
    <h3>{$item.title|escape}</h3>
  </article>
{/foreach}
```

## Общие свойства

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `fields[]` — схема строк; в data у каждой строки `_rowId`.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
