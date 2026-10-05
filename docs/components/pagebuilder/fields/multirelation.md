---
title: "multirelation"
description: "Массив ресурсов с id и pagetitle из AutoComplete с поиском"
---

# Поле multirelation

Версия: **Pro** (`advanced-fields`).

<!-- ![multirelation](/components/pagebuilder/screenshots/fields/multirelation.jpg) -->

## Зачем этот тип

Порядок выбранных записей сохраняется. В инспекторе AutoComplete с поиском и сортируемый список (модального окна нет). На этом поле собраны секции вроде подборки товаров.

## Когда использовать

- Подборка товаров по точному списку SKU
- Связанные статьи или кейсы
- Несколько внутренних ссылок с title

## Советы

Один ресурс: [relation](relation). Статический список id без AutoComplete возможен через combo, но без pagetitle enrich.

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

## Значение

Массив ресурсов.

## Данные секции {#vyvod-v-section-data}

Ключ `products` в данных секции: массив ресурсов:

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
