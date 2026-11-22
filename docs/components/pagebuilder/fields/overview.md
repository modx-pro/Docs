---
title: "Обзор полей"
description: "Схема полей в JSON секции, виджеты инспектора и данные после сохранения"
---

# Обзор полей

Поля задают, что редактор заполняет в секции. Схему хранят в JSON-файле типа (`core/components/pagebuilder/sections/{key}.json`) или собирают в панели управления.

В [справочнике](types) 62 типа (35 Free и 27 Pro).

<!-- ![Инспектор секции](/components/pagebuilder/screenshots/mgr-section-inspector.jpg) -->

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
| `options` | Статический список (select, radio, multiselect, checkboxgroup, colorpalette, tablecombo, tablemulticombo) |
| `optionsSource` | Динамический список из xPDO-класса |
| `searchAction` | Connector для picker relation, напр. `mgr/ms3/products/search` |
| `showWhen` | Условная видимость соседнего поля |
| `fields` | Вложенная схема repeater, fieldset, jsongrid |

Полный цикл на примере [richtext](richtext).

## Общие свойства поля

Для полей с `name`, попадающих в данные секции:

| Ключ | Тип | Инспектор | Панель |
| --- | --- | --- | --- |
| `tab` | string | Поля с одним `tab` группируются под подзаголовком | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина колонки в % (flex-строка); в CMP только эти значения, по умолчанию 100 | да |
| `description` | string | Текст под подписью поля | да |
| `default` | any | Начальное значение, если в данных секции пусто | да |
| `active` | bool | `false` скрывает поле в инспекторе | да |
| `required` | bool | Пустое значение блокирует publish (`SectionValidator`) | да |

**Декоративные типы** (`heading`, `dependent`): в data не пишутся. Доступны `tab`, `width`, `label`.

**Fieldset (Pro):** собственного ключа в data нет. Вложенные `fields` попадают в данные секции как плоские ключи. См. [fieldset](fieldset).

Остальные ключи схемы (`showWhen`, `currency`, `mask`, `sourceField`, `columns`, `table_key`, …) панель управления не затирает: `sectionTypeForm.ts` сохраняет их в passthrough `extra`.

### Pro: responsive {#pro-responsive}

Сначала включите `pagebuilder_responsive_editor_enabled`. Пока оно выкл., в инспекторе нет кнопки и вкладок Desktop / Tablet / Mobile: одно поле. На сайте сохранённые карты breakpoints работают, пока редактор не сохранит поле одним значением.

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

Имена `alt`, `caption`, `slug` из responsive исключены (`responsiveValues.ts`). Если в JSON поля стоит `"responsive": true`, разные значения включены всегда и свернуть их в одну строку нельзя.

Пороги экранов задаются в `pagebuilder_responsive_breakpoints` (или `responsiveBreakpoints` на типе секции). По умолчанию: desktop ≥1024, tablet ≥768, mobile ≥0; превью в менеджере берёт `previewWidth`. Режим вывода: `pagebuilder_responsive_apply`.

| Режим | Поведение |
| --- | --- |
| `manual` (по умолчанию) | На сайте одно значение: `?pb_bp=` или `pagebuilder_default_breakpoint`. SEO-безопасно |
| `css` | В HTML все значения в `<span class="pb-rv">…</span>`, переключение через CSS media queries |

В chunk для responsive-полей при `css` используйте модификатор Fenom `pb_text` вместо `escape`:

```fenom
{$title|pb_text}
```

При `manual` достаточно обычного `{$title|escape}` (значение уже скаляр). Настройки: [Системные настройки → Responsive](../settings#responsive).

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

Живые примеры: секция **QA: все типы полей** в каталоге, в ней блок «Meta parity».

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

В данных секции лежит массив объектов. У каждой строки служебный `_rowId`. В chunk: `{foreach $items as $item}` и `{$item.title|escape}`. Порядок строк меняют ручкой перетаскивания или стрелками, ручка есть и у gallery, keyvalue, inline table и связанных списков. Подробнее: [repeater](repeater).

## showWhen

```json
{
  "name": "extra_url",
  "type": "url",
  "label": "Доп. ссылка",
  "showWhen": { "field": "show_extra", "value": true }
}
```

Поле видно, когда значение поля `showWhen.field` равно `showWhen.value`. Массив в `value` значит «любое из значений». Код: `fieldVisibility.ts`. Ещё примеры: [types](types#составные-сценарии).

## optionsSource

Список разрешённых классов в `FieldOptionsService` (`modResource`, `modTemplate`, `modChunk`, …). Список опций: connector `mgr/field/options`. Хук: `pbOnFieldValues`.

## Фронт и enrich

`SectionRenderer` передаёт `section.data` в chunk как плейсхолдеры. Дополнительно в properties: `id`, `type`, `settings`. Массив секции теги MODX не обходят, поэтому примеры показывают цикл на Fenom. Вкладка MODX повторяет этот цикл без фильтра `pb_text`: такого выходного фильтра в тегах нет.

При сохранении черновика `SectionFieldEnricher` дополняет:

- **image / file / gallery**: media-объекты (`filename`, `extension`, `width`, `height`, `size`, `type`, …)
- **video**: `embed_url`, `provider`, `watch_url`. Плоские `video_*` — только при `type=video`; имя поля с «video» enrich-ит вложенный объект, без плоских ключей
- **map**: `embed_url`, `watch_url`. Плоские `map_*`

В chunk для media берите `{$photo.url}`, а не строку пути к файлу. См. [image](image), [video](video).

## Дальше

- [Справочник типов](types)
- [Менеджер и события](../integration)
