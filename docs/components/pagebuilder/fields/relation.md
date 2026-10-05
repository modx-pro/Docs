---
title: "relation"
description: "Один ресурс MODX: объект id и pagetitle через Autocomplete с поиском"
---

# Поле relation

Версия: **Pro** (`advanced-fields`).

<!-- ![relation](/components/pagebuilder/screenshots/fields/relation.jpg) -->

## Зачем этот тип

Выбор записи через Autocomplete с поиском в выпадающем списке, без модального окна: запросы идут через `searchAction`. По умолчанию это `mgr/resources/search` (до 20 результатов на запрос), свой connector — например `mgr/ms3/products/search` для miniShop3. В данных сохраняются `id` и `pagetitle`, не весь ресурс.

## Когда использовать

- Ссылка на страницу «О нас» или товар miniShop3
- Один связанный ресурс в секции
- Внутренняя ссылка с читаемым title в chunk

## Советы

Только id из xPDO без picker: [combo](combo).

## Похожие типы

- [multirelation](multirelation) для списка ресурсов
- [resourcelist](resourcelist): тот же редактор picker, отдельный Free-тип в каталоге

## Настройка

```json
{
  "name": "product",
  "type": "relation",
  "label": "Товар",
  "searchAction": "mgr/ms3/products/search",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Данные секции {#vyvod-v-section-data}

Ключ `product` — объект `{ id, pagetitle }`, picker сохраняет только выбранное:

```json
{
  "product": {
    "id": 42,
    "pagetitle": "О компании"
  }
}
```

- Поиск в менеджере может показывать `uri` и `context_key`, но в data пишутся `id` и `pagetitle`.

## Пример в chunk

::: code-group

```modx
<span class="related">[[+product.pagetitle]]</span>
```

```fenom
{if $product.id}
  <span class="related">{$product.pagetitle|pb_text}</span>
{/if}
```

:::

## Общие свойства

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Менеджер и события](../integration)
