---
title: "fieldset"
description: "Nested field group with flat keys in section.data"
---

# Field fieldset

Layer: **Pro**.

<!-- ![fieldset](/components/pagebuilder/screenshots/fields/fieldset.png) -->

## Why this type

- Inspector legend without fieldset key in data
- Nested names unique within section
- Pro organization for long forms

## When to use

- SEO title description block in one group
- Overlay settings separate from content
- CMP readability for 15+ fields

## Tips

- Heading only without nested is [heading](heading)
- Chunk uses flat keys seo_title not seo.title

## Similar types

- [heading](heading) decorative divider (Free)
- [repeater](repeater) for object arrays (Free)

## Schema

```json
{
  "name": "seo",
  "type": "fieldset",
  "label": "SEO",
  "fields": [
    {
      "name": "seo_title",
      "type": "text",
      "label": "SEO title"
    }
  ]
}
```

## Value

Плоские ключи вложенных полей в `section.data`.

## Output in section.data в section.data

Ключ `seo` в schema не попадает в `section.data`. Вложенные поля — плоские ключи:

```json
{
  "seo_title": "SEO title"
}
```

- Имена вложенных полей должны быть уникальны в пределах секции.

## Chunk example в chunk

```fenom
{$seo_title|escape}
```

## Common properties

У `fieldset` нет собственного ключа в `section.data`. Вложенные поля — **плоские** ключи рядом с остальными полями секции.

| Ключ | Роль |
| --- | --- |
| `label` | Заголовок группы (legend) |
| `fields` | Вложенная схема |
| `tab` / `width` | Группировка в инспекторе |

У вложенных полей работают обычные meta-ключи (`tab`, `width`, `default`, …).

## See also

- [Field types reference](types)
- [Fields overview](overview)
- [Pro в менеджере](../integration)
