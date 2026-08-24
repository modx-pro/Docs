---
title: "relation"
description: "Single MODX resource as id and pagetitle object from picker modal"
---

# Field relation

Layer: **Pro**.

<!-- ![relation](/components/pagebuilder/screenshots/fields/relation.png) -->

## Why this type

- Modal picker with search, not manual id
- searchAction for ms3 and custom connectors
- Data stores id and pagetitle, not full resource

## When to use

- Link to About page or MS3 product
- One related resource in section
- Internal link with readable title in chunk

## Tips

- Multiple resources use [multirelation](multirelation)
- xPDO class id without modal is [combo](combo)

## Similar types

- [multirelation](multirelation) for resource lists
- [resourcelist](resourcelist) alias of same picker UX

## Schema

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

## Value

Объект `{ id, pagetitle, … }`.

## Output in section.data в section.data

Ключ `product` в `section.data` (picker сохраняет только выбранное):

```json
{
  "product": {
    "id": 42,
    "pagetitle": "О компании"
  }
}
```

- Поиск в менеджере может показывать `uri` и `context_key`, но в data пишутся `id` и `pagetitle`.

## Chunk example в chunk

```fenom
{if $product.id}
  <span class="related">{$product.pagetitle|escape}</span>
{/if}
```

## Common properties

Для полей с `name`, которые сохраняются в `section.data`:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `searchAction` для кастомного connector (напр. ms3).

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
