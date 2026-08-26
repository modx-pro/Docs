---
title: "jsongrid"
description: "Один объект с ключами nested fields не массив"
---

# Поле jsongrid

Версия: **Pro**.

<!-- ![jsongrid](/components/pagebuilder/screenshots/fields/jsongrid.png) -->

## Зачем этот тип

Схема `fields` как у repeater, но один объект, не массив. Компактнее repeater из одной строки. Pro для config block фиксированной формы.

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

```fenom
{if $row.title}
  <h4>{$row.title|escape}</h4>
{/if}
```

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
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
