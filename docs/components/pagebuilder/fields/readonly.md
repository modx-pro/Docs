---
title: "readonly"
description: "Строка только для чтения с отображением в инспекторе"
---

# Поле readonly

Версия: **Free**.

<!-- ![readonly](/components/pagebuilder/screenshots/fields/readonly.jpg) -->

## Зачем этот тип

Редактор видит значение, но не меняет его. В данных это строка, как у [text](text).

## Когда использовать

- Артикул (SKU) из miniShop3 в секции товара
- Slug или id после сохранения
- Подсказка «заполняется автоматически»

## Советы

Полностью скрытое значение: [hidden](hidden). Редактируемый текст: [text](text).

## Похожие типы

- [hidden](hidden) без UI
- [text](text) для обычного ввода

## Настройка

```json
{
  "name": "sku",
  "type": "readonly",
  "label": "SKU",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Данные секции {#vyvod-v-section-data}

Ключ `sku` — строка только для чтения:

```json
{
  "sku": "sku-001"
}
```

## Пример в chunk

::: code-group

```modx
<span class="sku">[[+sku]]</span>
```

```fenom
<span class="sku">{$sku|pb_text}</span>
```

:::

## Общие свойства

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
