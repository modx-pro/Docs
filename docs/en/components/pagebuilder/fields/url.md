---
title: "url"
description: "URL string with basic format checks in the inspector"
---

# Field url

Layer: **Free**.

<!-- ![url](/components/pagebuilder/screenshots/fields/url.png) -->

## Why this type

- Dedicated type instead of text for links
- Pro: `responsive` for per-breakpoint URLs
- UTM placeholders pair well with button fields

## When to use

- Button href, external asset, anchor link
- Card or partner logo link
- Fallback when a button object is not needed

## Tips

- Label plus target fit [button](button) better
- Internal MODX pages often use [relation](relation) or [resourcelist](resourcelist) (Pro)

## Similar types

- [button](button) for label + url + target
- [slug](slug) for path segments, not full URLs

## Schema

```json
{
  "name": "link",
  "type": "url",
  "label": "Ссылка",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Строка URL.

## Output in section.data в section.data

Ключ `link` в `section.data`:

```json
{
  "link": "https://example.com/page"
}
```

## Chunk example в chunk

```html
<a href="{$link|escape}">Подробнее</a>
```

## Notes

Pro: `responsive`.

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

**Pro** (capability `responsive`): при `responsive: true` в `section.data` — ключи `desktop`, `tablet`, `mobile` вместо скаляра.

- Дополнительно: `showWhen`, UTM-плейсхолдеры `\{\{utm:key\}\}` в строке URL.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
