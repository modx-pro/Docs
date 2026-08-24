---
title: "resourcelist"
description: "relation alias with same picker modal and id pagetitle object"
---

# Field resourcelist

Layer: **Pro**.

<!-- ![resourcelist](/components/pagebuilder/screenshots/fields/resourcelist.png) -->

## Why this type

- "Pick a page" semantics in CMP labels
- Same behavior and data as relation
- searchAction and modal search built in

## When to use

- page or blog_parent field in section
- When type name should read as page list to editors
- Legacy schemas with type resourcelist

## Tips

- Functionally same as [relation](relation)
- Page array is [multirelation](multirelation)

## Similar types

- [relation](relation) same picker
- [multirelation](multirelation) for multiple pages

## Schema

```json
{
  "name": "page",
  "type": "resourcelist",
  "label": "Страница",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Как у `relation`.

## Output in section.data в section.data

Ключ `page` в `section.data` (picker сохраняет только выбранное):

```json
{
  "page": {
    "id": 42,
    "pagetitle": "О компании"
  }
}
```

- Поиск в менеджере может показывать `uri` и `context_key`, но в data пишутся `id` и `pagetitle`.

## Chunk example в chunk

```fenom
{if $page.id}
  <span>{$page.pagetitle|escape}</span>
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

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
