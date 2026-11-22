---
title: "repeater"
description: "Массив объектов с nested fields и служебным _rowId"
---

# Поле repeater

Версия: **Free**.

<!-- ![repeater](/components/pagebuilder/screenshots/fields/repeater.jpg) -->

## Зачем этот тип

- В каждой строке своя вложенная схема полей
- `_rowId` не меняется между сохранениями, его используют как якорь строки

## Когда использовать

- Элементы карточек, вопросы FAQ, слайды
- Любой сценарий «добавить строку» в секции
- Картинка и текст в строке без отдельного JSON-типа

## Советы

Порядок строк: ручка перетаскивания или стрелки вверх/вниз.

## Похожие типы

- [jsongrid](jsongrid) для одной строки-объекта (Pro)
- [migx](migx) для нативного MIGX-грида (Free)
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

## Данные секции {#vyvod-v-section-data}

Ключ `items` — массив строк, у каждой стабильный `_rowId`:

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

::: code-group

```modx
[[+items.0.title]]
```

```fenom
{foreach $items as $item}
  <article id="{$item._rowId|escape}">
    <h3>{$item.title|pb_text}</h3>
  </article>
{/foreach}
```

:::

## Общие свойства

Дополнительно: `fields[]` — схема строк.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
