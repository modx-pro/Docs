---
title: "jsongrid"
description: "Один объект с ключами nested fields не массив"
---

# Поле jsongrid

Версия: **Pro** (`advanced-fields`).

<!-- ![jsongrid](/components/pagebuilder/screenshots/fields/jsongrid.jpg) -->

## Зачем этот тип

Набор полей как у [repeater](repeater), но одна запись, не список. Так короче, чем repeater из единственной строки. Есть в Pro, когда блок настроек всегда одной и той же формы.

## Когда использовать

- SEO title/description в одном поле
- Набор настроек overlay
- Одна строка таблицы без `foreach` по массиву

## Советы

Список строк: [repeater](repeater). Плоские ключи без wrapper-объекта: [fieldset](fieldset).

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

Ключ `row` в данных секции: один объект с ключами вложенных полей:

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

- Дополнительно: `fields[]`: одна строка = один объект в data (не массив).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
