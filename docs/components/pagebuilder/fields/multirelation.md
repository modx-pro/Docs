---
title: "multirelation"
description: "Массив ресурсов с id и pagetitle из модального picker"
---

# Поле multirelation

Слой: **Pro**.

<!-- ![multirelation](/components/pagebuilder/screenshots/fields/multirelation.png) -->

## Зачем этот тип

- Порядок строк сохраняется для curated lists
- Тот же модальный поиск, что у relation
- Основа секций curated_products и похожих

## Когда использовать

- Подборка товаров по точному списку SKU
- Связанные статьи или case studies
- Несколько внутренних ссылок с title

## Советы

- Один ресурс достаточно → [relation](relation)
- Статический список id без picker возможен через combo, но без pagetitle enrich

## Похожие типы

- [relation](relation) для одного ресурса
- [resourcelist](resourcelist) при alias naming в схеме

## Настройка

```json
{
  "name": "products",
  "type": "multirelation",
  "label": "Товары",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив ресурсов.

## Вывод в section.data

Ключ `products` в `section.data` — массив ресурсов:

```json
{
  "products": [
    {
      "id": 10,
      "pagetitle": "Товар A"
    },
    {
      "id": 11,
      "pagetitle": "Товар B"
    }
  ]
}
```

## Пример в chunk

```fenom
{foreach $products as $p}
  <span class="related">{$p.pagetitle|escape}</span>
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

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
