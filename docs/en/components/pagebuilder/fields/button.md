---
title: "button"
description: "Object with label, url, and target for CTA in section.data"
---

# Field button

Layer: **Free**.

<!-- ![button](/components/pagebuilder/screenshots/fields/button.png) -->

## Why this type

- Three related props in one field
- UTM placeholders in url
- Ready object for `<a>` in chunk

## When to use

- Primary hero or CTA button
- Secondary link with target _blank
- Label plus link without two fields

## Tips

- URL-only fits [url](url)
- Multiple buttons use repeater with nested button or text+url

## Similar types

- [url](url) for bare href
- [text](text) + [url](url) for split layout control

## Schema

```json
{
  "name": "cta",
  "type": "button",
  "label": "Кнопка",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Value

Объект `{ label, url, target }`.

## Output in section.data в section.data

Ключ `cta` в `section.data`:

```json
{
  "cta": {
    "label": "Подробнее",
    "url": "https://example.com",
    "target": "_blank"
  }
}
```

## Chunk example в chunk

```html
<a class="btn" href="{$cta.url|escape}" target="{$cta.target|escape}">{$cta.label|escape}</a>
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

- Дополнительно: UTM-плейсхолдеры в `url`.

See [fields overview](overview#common-field-properties).

## See also

- [Field types reference](types)
- [Fields overview](overview)
