---
title: "types reference"
description: "All 50 PageBuilder inspector field types (Free and Pro)"
---

# Field types reference

Inspector: `SectionInspectorFields.vue` → `SectionFieldInput.vue` и вложенные компоненты. Алиасы типов нормализует `normalizeFieldType()` в `fieldDefaults.ts`.

50 типов: 26 Free и 24 Pro в CMP (Pro включается capability `advanced-fields`). У каждого типа своя страница: JSON **Настройка** (с `tab`, `width`, …), блок **Вывод** (JSON в `section.data`), пример Fenom/HTML, **Общие свойства**.

Общие meta-ключи (`tab`, `width`, `description`, `default`, `active`): [обзор](overview#общие-свойства-поля).

<!-- ![Field types in inspector](/components/pagebuilder/screenshots/mgr-section-inspector.png) -->

## Free

| type | Layer | Page | Output and example |
| --- | --- | --- |
| `text` | Free | [text](text) | [JSON and Fenom](text#output-in-section-data) |
| `textarea` | Free | [textarea](textarea) | [JSON and Fenom](textarea#output-in-section-data) |
| `richtext` | Free | [richtext](richtext) | [JSON and Fenom](richtext#output-in-section-data) |
| `ace` | Free | [ace](ace) | [JSON and Fenom](ace#output-in-section-data) |
| `number` | Free | [number](number) | [JSON and Fenom](number#output-in-section-data) |
| `url` | Free | [url](url) | [JSON and Fenom](url#output-in-section-data) |
| `slug` | Free | [slug](slug) | [JSON and Fenom](slug#output-in-section-data) |
| `select` | Free | [select](select) | [JSON and Fenom](select#output-in-section-data) |
| `radio` | Free | [radio](radio) | [JSON and Fenom](radio#output-in-section-data) |
| `checkbox` | Free | [checkbox](checkbox) | [JSON and Fenom](checkbox#output-in-section-data) |
| `checkboxgroup` | Free | [checkboxgroup](checkboxgroup) | [JSON and Fenom](checkboxgroup#output-in-section-data) |
| `yesno` | Free | [yesno](yesno) | [JSON and Fenom](yesno#output-in-section-data) |
| `toggle` | Free | [toggle](toggle) | [JSON and Fenom](toggle#output-in-section-data) |
| `date` | Free | [date](date) | [JSON and Fenom](date#output-in-section-data) |
| `time` | Free | [time](time) | [JSON and Fenom](time#output-in-section-data) |
| `datetime` | Free | [datetime](datetime) | [JSON and Fenom](datetime#output-in-section-data) |
| `color` | Free | [color](color) | [JSON and Fenom](color#output-in-section-data) |
| `colorpalette` | Free | [colorpalette](colorpalette) | [JSON and Fenom](colorpalette#output-in-section-data) |
| `file` | Free | [file](file) | [JSON and Fenom](file#output-in-section-data) |
| `image` | Free | [image](image) | [JSON and Fenom](image#output-in-section-data) |
| `button` | Free | [button](button) | [JSON and Fenom](button#output-in-section-data) |
| `hidden` | Free | [hidden](hidden) | [JSON and Fenom](hidden#output-in-section-data) |
| `readonly` | Free | [readonly](readonly) | [JSON and Fenom](readonly#output-in-section-data) |
| `heading` | Free | [heading](heading) | [JSON and Fenom](heading#output-in-section-data) |
| `repeater` | Free | [repeater](repeater) | [JSON and Fenom](repeater#output-in-section-data) |
| `editorjs` | Free | [editorjs](editorjs) | [JSON and Fenom](editorjs#output-in-section-data) |

## Pro

| type | Layer | Page | Output and example |
| --- | --- | --- |
| `multiselect` | Pro | [multiselect](multiselect) | [JSON and Fenom](multiselect#output-in-section-data) |
| `relation` | Pro | [relation](relation) | [JSON and Fenom](relation#output-in-section-data) |
| `multirelation` | Pro | [multirelation](multirelation) | [JSON and Fenom](multirelation#output-in-section-data) |
| `resourcelist` | Pro | [resourcelist](resourcelist) | [JSON and Fenom](resourcelist#output-in-section-data) |
| `video` | Pro | [video](video) | [JSON and Fenom](video#output-in-section-data) |
| `gallery` | Pro | [gallery](gallery) | [JSON and Fenom](gallery#output-in-section-data) |
| `map` | Pro | [map](map) | [JSON and Fenom](map#output-in-section-data) |
| `table` | Pro | [table](table) | [JSON and Fenom](table#output-in-section-data) |
| `embeddedTable` | Pro | [embeddedTable](embeddedTable) | [JSON and Fenom](embeddedTable#output-in-section-data) |
| `keyvalue` | Pro | [keyvalue](keyvalue) | [JSON and Fenom](keyvalue#output-in-section-data) |
| `tag` | Pro | [tag](tag) | [JSON and Fenom](tag#output-in-section-data) |
| `currency` | Pro | [currency](currency) | [JSON and Fenom](currency#output-in-section-data) |
| `imask` | Pro | [imask](imask) | [JSON and Fenom](imask#output-in-section-data) |
| `combo` | Pro | [combo](combo) | [JSON and Fenom](combo#output-in-section-data) |
| `multicombo` | Pro | [multicombo](multicombo) | [JSON and Fenom](multicombo#output-in-section-data) |
| `tablecombo` | Pro | [tablecombo](tablecombo) | [JSON and Fenom](tablecombo#output-in-section-data) |
| `tablemulticombo` | Pro | [tablemulticombo](tablemulticombo) | [JSON and Fenom](tablemulticombo#output-in-section-data) |
| `fieldset` | Pro | [fieldset](fieldset) | [JSON and Fenom](fieldset#output-in-section-data) |
| `dependent` | Pro | [dependent](dependent) | [JSON and Fenom](dependent#output-in-section-data) |
| `xtype` | Pro | [xtype](xtype) | [JSON and Fenom](xtype#output-in-section-data) |
| `tv` | Pro | [tv](tv) | [JSON and Fenom](tv#output-in-section-data) |
| `chunk` | Pro | [chunk](chunk) | [JSON and Fenom](chunk#output-in-section-data) |
| `snippet` | Pro | [snippet](snippet) | [JSON and Fenom](snippet#output-in-section-data) |
| `jsongrid` | Pro | [jsongrid](jsongrid) | [JSON and Fenom](jsongrid#output-in-section-data) |

## Composite scenarios

### showWhen

The field is visible when another field matches `value` (не `equals`).

```json
{
  "name": "extra_url",
  "type": "url",
  "label": "Доп. ссылка",
  "showWhen": { "field": "show_extra", "value": true }
}
```

Реализация: `fieldVisibility.ts`.

### optionsSource

```json
{
  "name": "template",
  "type": "tablecombo",
  "label": "Шаблон",
  "optionsSource": {
    "class": "modTemplate",
    "valueField": "id",
    "labelField": "templatename",
    "limit": 100
  }
}
```

Processor: `mgr/field/options`. Event: `pbOnFieldValues`.

### Таблицы ресурса

Use the resource **Tables** tab or Collections tab type `table`. Field `embeddedTable` stores `table_key` and query options. See [settings](../settings) and [integration](../integration).

## Aliases

Полный список в `FIELD_TYPE_ALIASES` (`fieldDefaults.ts`). Частые: `relationship` → `relation`, `resources` → `resourcelist`, `boolean` / `listyesno` → `yesno`, `onlyreading` → `readonly`, `colorpicker` → `color`, `editor_js` → `editorjs`.

## See also

- [Fields overview](overview)
- [Manager and events](../integration)
