---
title: "table"
description: "Массив строк по columns с типизированными ячейками"
---

# Поле table

Слой: **Pro**.

<!-- ![table](/components/pagebuilder/screenshots/fields/table.png) -->

## Зачем этот тип

Колонки text, number, image, color, date, tag, currency, url. Все строки хранятся в data секции, редактор правит grid в инспекторе.

## Когда использовать

- Таблица характеристик продукта
- Сравнительная matrix с картинками в ячейках
- Строки характеристик, когда их немного и они живут в секции

## Советы

`columns` задаёт name, label, type для каждой колонки. Большие выборки из БД: [embeddedTable](embeddedTable).

## Похожие типы

- [keyvalue](keyvalue) для простых пар ключ/значение
- [embeddedTable](embeddedTable) для table_key и runtime rows

## Настройка

```json
{
  "name": "specs",
  "type": "table",
  "label": "Характеристики",
  "columns": [
    {
      "name": "key",
      "label": "Ключ",
      "type": "text"
    },
    {
      "name": "value",
      "label": "Значение",
      "type": "text"
    }
  ],
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив строк-объектов по `columns[].name`.

## Данные секции {#vyvod-v-section-data}

Ключ `specs` в данных секции: массив строк по `columns[].name`:

```json
{
  "specs": [
    {
      "key": "Вес",
      "value": "1.2 кг"
    },
    {
      "key": "Цвет",
      "value": "#111827"
    },
    {
      "key": "Фото",
      "value": {
        "url": "assets/images/hero.jpg",
        "id": 12,
        "path": "assets/images/",
        "filename": "hero.jpg",
        "extension": "jpg",
        "name": "hero",
        "title": "hero.jpg",
        "width": 1920,
        "height": 1080,
        "size": 245760,
        "type": "image"
      }
    }
  ]
}
```

- Ячейки с `type: image` хранят media-объект, как у поля `image`.

## Пример в chunk

```fenom
{foreach $specs as $row}
  <div class="spec">
    <span class="spec__key">{$row.key|escape}</span>
    <span class="spec__value">{$row.value|escape}</span>
  </div>
{/foreach}
```

## Примечание

Колонки в CMP: `columnsText` (`name|Подпись|type`). Типы ячеек: text, number, image, color, date, tag, currency, url.

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

- Дополнительно: `columns[]` с `name`, `label`, `type` (text, number, image, color, …).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
