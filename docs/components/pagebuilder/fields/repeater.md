---
title: "repeater"
description: "Массив объектов с nested fields и служебным _rowId"
---

# Поле repeater

Версия: **Free**.

<!-- ![repeater](/components/pagebuilder/screenshots/fields/repeater.png) -->

## Зачем этот тип

- В каждой строке своя вложенная схема полей
- `_rowId` не меняется между сохранениями: ключ для Vue и якорей
- Списки карточек, FAQ и слайдов без Pro

## Когда использовать

- Элементы карточек, вопросы FAQ, слайды
- Любой сценарий «добавить строку» в секции
- Картинка и текст в строке без отдельного JSON-типа

## Советы

- В chunk: `{foreach}` и при необходимости `{$item._rowId|escape}`
- Один объект без списка: [jsongrid](jsongrid) (Pro)

## Похожие типы

- [jsongrid](jsongrid) для одной строки-объекта (Pro)
- [table](table) для табличной сетки с колонками (Pro)

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

Массив объектов. У каждой строки есть `_rowId`.

## Данные секции {#vyvod-v-section-data}

Ключ `items` в данных секции — массив строк; у каждой строки стабильный `_rowId`:

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

Для полей с `name`, которые сохраняются в данных секции:

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
