---
title: "documents"
description: "Список файлов с названием. Слой Pro."
---

# Поле documents

Версия: **Pro** (`advanced-fields`).

Список строк `{ title, file }`. Пустые строки инспектор не сохраняет. `file` это media-значение, как у поля [file](file).

## Настройка

```json
{
  "name": "files",
  "type": "documents",
  "label": "Документы"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "files": [
    { "title": "Прайс", "file": "/assets/files/price.pdf" }
  ]
}
```

## Пример в chunk

```html
{foreach $files as $row}
  <a href="{$row.file|escape}">{$row.title|escape}</a>
{/foreach}
```

## Похожие типы

- [file](file) для одного файла
- Секция [Загрузки](../sections/downloads) для готового блока
