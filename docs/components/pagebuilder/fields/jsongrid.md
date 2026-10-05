---
title: "jsongrid"
description: "Один объект с ключами nested fields не массив"
---

# Поле jsongrid

Версия: **Pro** (`advanced-fields`).

<!-- ![jsongrid](/components/pagebuilder/screenshots/fields/jsongrid.jpg) -->

## Зачем этот тип

Набор полей как у [repeater](repeater), но одна запись, а не список: форма блока всегда одна и та же.

## Когда использовать

- SEO title и description одним объектом
- Набор настроек overlay

## Похожие типы

- [repeater](repeater) для массива (Free)
- [fieldset](fieldset) для плоских вложенных ключей (Pro)

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

## Данные секции {#vyvod-v-section-data}

Ключ `row` в данных секции:

```json
{
  "row": {
    "title": "SEO title",
    "description": "SEO description"
  }
}
```

## Пример в chunk

::: code-group

```modx
<h4>[[+row.title]]</h4>
```

```fenom
{if $row.title}
  <h4>{$row.title|pb_text}</h4>
{/if}
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `fields[]` — один объект в данных секции, а не массив.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
