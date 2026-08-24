---
title: "Fields overview"
description: "Field schema in section JSON, inspector widgets, and section.data output"
---

# Fields overview

Поля описывают, что редактор заполняет в секции. Схема лежит в JSON типа (`core/components/pagebuilder/sections/{key}.json`) или собирается в CMP.

У каждого из 50 типов своя страница в [справочнике](types): JSON **Настройка** (с meta-ключами), значение в `section.data`, блок **Вывод** (JSON после save) и пример для Fenom/HTML.

<!-- ![Section inspector](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->

## Minimal field

```json
{
  "name": "title",
  "type": "text",
  "label": "Заголовок",
  "required": true
}
```

| Свойство | Роль |
| --- | --- |
| `name` | Ключ в `section.data` |
| `type` | Виджет и валидация |
| `label` | Подпись в инспекторе |
| `required` | Обязательно при **publish** (черновик сохраняется) |
| `options` | Статический список (select, radio, checkboxgroup, colorpalette) |
| `optionsSource` | Динамический список из xPDO-класса |
| `searchAction` | Connector для picker relation, напр. `mgr/ms3/products/search` |
| `showWhen` | Условная видимость соседнего поля |
| `fields` | Вложенная схема repeater, fieldset, jsongrid |

Полный цикл на примере `richtext`: [richtext.md](richtext).

## Common properties поля

Для полей с `name`, которые попадают в `section.data` (не `heading` / `dependent`):

| Ключ | Тип | Инспектор | CMP |
| --- | --- | --- | --- |
| `tab` | string | Поля с одним `tab` группируются под подзаголовком | да |
| `width` | 25–100 | Ширина колонки в % (flex-строка), по умолчанию 100 | да |
| `description` | string | Текст под подписью поля | да |
| `default` | any | Начальное значение, если в `section.data` пусто | да |
| `active` | bool | `false` скрывает поле в инспекторе | да |
| `required` | bool | Пустое значение блокирует publish (`SectionValidator`) | да |

**Декоративные типы** (`heading`, `dependent`): в data не пишутся. Доступны `tab`, `width`, `label`.

**Fieldset (Pro):** собственного ключа в data нет. Вложенные `fields` — плоские ключи в `section.data`. См. [fieldset.md](fieldset).

Остальные ключи схемы (`showWhen`, `currency`, `mask`, `sourceField`, `columns`, `table_key`, …) CMP не затирает: `sectionTypeForm.ts` сохраняет их в passthrough `extra`.

### Pro: responsive

На типах `text`, `textarea`, `url`, `number`, `currency`, `richtext`, `slug` при `responsive: true` (или уже сохранённой карте breakpoints) в `section.data`:

```json
{
  "title": {
    "desktop": "Заголовок",
    "tablet": "Заголовок (планшет)",
    "mobile": "Заголовок (моб.)"
  }
}
```

Имена `alt`, `caption`, `slug` из responsive исключены (`responsiveValues.ts`). На фронте — `readResponsiveValue()` / capability `responsive`.

### Chunk example meta в JSON

```json
{
  "name": "title",
  "type": "text",
  "label": "Заголовок",
  "tab": "Контент",
  "width": 50,
  "description": "Подсказка под полем",
  "default": "",
  "active": true,
  "required": true
}
```

Живые примеры: секция `_qa_field_matrix`, блок «Meta parity».

## Repeater

```json
{
  "name": "items",
  "type": "repeater",
  "label": "Элементы",
  "fields": [
    { "name": "title", "type": "text", "label": "Заголовок" }
  ]
}
```

В `section.data` — массив объектов. У каждой строки служебный `_rowId`. В chunk: `{foreach $items as $item}` и `{$item.title|escape}`. Подробнее: [repeater.md](repeater).

## showWhen

```json
{
  "name": "extra_url",
  "type": "url",
  "label": "Доп. ссылка",
  "showWhen": { "field": "show_extra", "value": true }
}
```

Условие сравнивает поле `showWhen.field` со значением `showWhen.value`. Массив в `value` означает «любое из». Код: `fieldVisibility.ts`. Ещё примеры: [types.md](types#составные-сценарии).

## optionsSource

Whitelist классов в `FieldOptionsService` (`modResource`, `modTemplate`, `modChunk`, …). Processor: `mgr/field/options`. Event: `pbOnFieldValues`.

## Frontend and enrich

`SectionRenderer` передаёт `section.data` в chunk как плейсхолдеры. Дополнительно в properties: `id`, `type`, `settings`.

При **save draft** `SectionFieldEnricher` дополняет:

- **image / file / gallery** — media-объекты (`filename`, `extension`, `width`, `height`, `size`, `type`, …)
- **video** — `embed_url`, `provider`, `watch_url`; плоские `video_*` при `type=video` или имени поля с `video`
- **map** — `embed_url`, `watch_url`; плоские `map_*`

В chunk для media используйте `{$photo.url}`, не голую строку path. См. [image.md](image), [video.md](video).

## See also

- [Field types reference](types)
- [Manager and events](../integration)
