---
title: "relation"
description: "Один ресурс MODX: объект id и pagetitle через Autocomplete с поиском"
---

# Поле relation

Версия: **Pro** (`advanced-fields`).

<!-- ![relation](/components/pagebuilder/screenshots/fields/relation.jpg) -->

## Зачем этот тип

Выбор записи через Autocomplete с поиском в выпадающем списке, без модального окна. Поиск идёт через `searchAction`. В данных сохраняются `id` и `pagetitle`, не весь ресурс.

По умолчанию `searchAction` = `mgr/resources/search` (до 20 результатов на запрос). Свой connector — например `mgr/ms3/products/search` для miniShop3.

## Когда использовать

- Ссылка на страницу «О нас» или товар MS3
- Один связанный ресурс в секции
- Внутренняя ссылка с читаемым title в chunk

## Советы

Несколько ресурсов: [multirelation](multirelation). Только id из xPDO без picker: [combo](combo).

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

Без `searchAction` в схеме используется `mgr/resources/search`.

## Значение

Объект `{ id, pagetitle, … }`.

## Данные секции {#vyvod-v-section-data}

Ключ `product` в данных секции (picker сохраняет только выбранное):

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

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `searchAction` для своего connector (напр. ms3).

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
