---
title: "jsongrid"
description: "Один объект с ключами nested fields не массив"
---

# Поле jsongrid

Слой: **Pro**.

<!-- ![jsongrid](/components/pagebuilder/screenshots/fields/jsongrid.png) -->

## Зачем этот тип

- fields schema как у repeater но single row object
- Компактнее repeater из одной строки
- Pro для fixed-shape config block

## Когда использовать

- SEO object title description in one field
- Overlay settings bundle
- Single row table without array foreach

## Советы

- Список строк это [repeater](repeater)
- Flat keys без wrapper object это [fieldset](fieldset)

## Похожие типы

- [repeater](repeater) для массива (Free)
- [fieldset](fieldset) для flat nested keys (Pro)

## Настройка

```json
{
  "name": "row",
  "type": "jsongrid",
  "label": "Строка",
  "fields": [
    {
      "name": "title",
      "type": "text",
      "label": "Title"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект с ключами вложенных полей.

## Вывод в section.data

Ключ `row` в `section.data` — один объект с ключами вложенных полей:

```json
{
  "row": {
    "title": "SEO title",
    "description": "SEO description"
  }
}
```

## Пример в chunk

```fenom
{if $row.title}
  <h4>{$row.title|escape}</h4>
{/if}
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

- Дополнительно: `fields[]` — одна строка = один объект в data (не массив).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
