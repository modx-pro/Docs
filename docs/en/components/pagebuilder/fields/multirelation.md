---
title: "multirelation"
description: "Array of resources with id and pagetitle from picker modal"
---

# Field multirelation

Layer: **Pro**.

<!-- ![multirelation](/components/pagebuilder/screenshots/fields/multirelation.png) -->

## Why this type

- Row order preserved for curated lists
- Same modal search as relation
- Base for curated_products and similar sections

## When to use

- Product picks by exact SKU list
- Related articles or case studies
- Multiple internal links with titles

## Tips

- Single resource fits [relation](relation)
- Static ids without picker possible via combo but no pagetitle enrich

## Similar types

- [relation](relation) for one resource
- [resourcelist](resourcelist) when schema uses alias naming

## Schema

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

## Value

Массив ресурсов.

## Output in section.data в section.data

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

## Chunk example в chunk

```fenom
{foreach $products as $p}
  <span class="related">{$p.pagetitle|escape}</span>
{/foreach}
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
