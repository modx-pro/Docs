---
title: "Обзор полей"
description: "Схема полей в JSON секции, виджеты инспектора и данные после сохранения"
---

# Обзор полей

Поля задают, что редактор заполняет в секции. Схему хранят в JSON типа (`core/components/pagebuilder/sections/{key}.json`) или собирают в панели управления.

В [справочнике](types) 50 типов. У каждого своя страница: JSON **Настройка**, блок **Данные секции** (как поле выглядит после сохранения) и пример для Fenom или HTML. В chunk значения приходят из `section.data`.

<!-- ![Инспектор секции](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->

## Минимальное поле

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
| `name` | Ключ в данных секции |
| `type` | Виджет и валидация |
| `label` | Подпись в инспекторе |
| `required` | Обязательно при **publish** (черновик сохраняется) |
| `options` | Статический список (select, radio, checkboxgroup, colorpalette) |
| `optionsSource` | Динамический список из xPDO-класса |
| `searchAction` | Connector для picker relation, напр. `mgr/ms3/products/search` |
| `showWhen` | Условная видимость соседнего поля |
| `fields` | Вложенная схема repeater, fieldset, jsongrid |

Полный цикл на примере `richtext`: [richtext.md](richtext).

## Общие свойства поля

Для полей с `name`, которые попадают в данные секции (не `heading` / `dependent`):

| Ключ | Тип | Инспектор | Панель |
| --- | --- | --- | --- |
| `tab` | string | Поля с одним `tab` группируются под подзаголовком | да |
| `width` | 25–100 | Ширина колонки в % (flex-строка), по умолчанию 100 | да |
| `description` | string | Текст под подписью поля | да |
| `default` | any | Начальное значение, если в данных секции пусто | да |
| `active` | bool | `false` скрывает поле в инспекторе | да |
| `required` | bool | Пустое значение блокирует publish (`SectionValidator`) | да |

**Декоративные типы** (`heading`, `dependent`): в data не пишутся. Доступны `tab`, `width`, `label`.

**Fieldset (Pro):** собственного ключа в data нет. Вложенные `fields` попадают в данные секции как плоские ключи. См. [fieldset.md](fieldset).

Остальные ключи схемы (`showWhen`, `currency`, `mask`, `sourceField`, `columns`, `table_key`, …) панель управления не затирает: `sectionTypeForm.ts` сохраняет их в passthrough `extra`.

### Pro: responsive

На типах `text`, `textarea`, `url`, `number`, `currency`, `richtext`, `slug` при `responsive: true` (или уже сохранённой карте breakpoints) в данных секции:

```json
{
  "title": {
    "desktop": "Заголовок",
    "tablet": "Заголовок (планшет)",
    "mobile": "Заголовок (моб.)"
  }
}
```

Имена `alt`, `caption`, `slug` из responsive исключены (`responsiveValues.ts`). На фронте читайте значения через `readResponsiveValue()` или флаг `responsive`.

### Пример meta в JSON

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

В данных секции лежит массив объектов. У каждой строки служебный `_rowId`. В chunk: `{foreach $items as $item}` и `{$item.title|escape}`. Подробнее: [repeater.md](repeater).

## showWhen

```json
{
  "name": "extra_url",
  "type": "url",
  "label": "Доп. ссылка",
  "showWhen": { "field": "show_extra", "value": true }
}
```

Поле видно, если `showWhen.field` совпало с `showWhen.value`. Массив в `value` значит «любое из значений». Код: `fieldVisibility.ts`. Ещё примеры: [types.md](types#составные-сценарии).

## optionsSource

Whitelist классов в `FieldOptionsService` (`modResource`, `modTemplate`, `modChunk`, …). Список опций: connector `mgr/field/options`. Хук: `pbOnFieldValues`.

## Фронт и enrich

`SectionRenderer` передаёт `section.data` в chunk как плейсхолдеры. Дополнительно в properties: `id`, `type`, `settings`.

При сохранении черновика `SectionFieldEnricher` дополняет:

- **image / file / gallery**: media-объекты (`filename`, `extension`, `width`, `height`, `size`, `type`, …)
- **video**: `embed_url`, `provider`, `watch_url`. Плоские `video_*` при `type=video` или имени поля с `video`
- **map**: `embed_url`, `watch_url`. Плоские `map_*`

В chunk для media используйте `{$photo.url}`, не голую строку path. См. [image.md](image), [video.md](video).

## Дальше

- [Справочник типов](types)
- [Инспектор](../integration)
