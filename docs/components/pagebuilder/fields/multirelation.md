---
title: "multirelation"
description: "Массив ресурсов с id и pagetitle из AutoComplete с поиском"
---

# Поле multirelation

Версия: **Pro** (`advanced-fields`).

<!-- ![multirelation](/components/pagebuilder/screenshots/fields/multirelation.jpg) -->

## Зачем этот тип

Порядок выбранных записей сохраняется. В инспекторе Autocomplete с поиском и сортируемый список, модального окна нет. На этом поле собраны секции с подборками товаров.

## Когда использовать

- Подборка товаров по точному списку SKU
- Связанные статьи или кейсы
- Несколько внутренних ссылок с title

## Советы

Статический список id без Autocomplete: [combo](combo), но `pagetitle` в данные секции не попадёт.

## Похожие типы

- [relation](relation) для одного ресурса
- [resourcelist](resourcelist) при alias-именовании в схеме

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

## Данные секции {#vyvod-v-section-data}

Ключ `products` — массив ресурсов:

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

::: code-group

```modx
<span class="related">[[+products.0.pagetitle]]</span>
```

```fenom
{foreach $products as $p}
  <span class="related">{$p.pagetitle|pb_text}</span>
{/foreach}
```

:::

## Общие свойства

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
