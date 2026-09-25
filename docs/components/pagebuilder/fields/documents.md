---
title: "documents"
description: "Список файлов с названием. Слой Pro."
---

# Поле documents

Версия: **Pro** (`advanced-fields`).

Список строк `{ title, file }`. Строка без `title` и без непустого `file` (строка или media-объект) отбрасывается. Объект `file` с пустым `url` сохраняется. `file` — media-значение, как у поля [file](file). В чанке берите `{$row.file.url}`.

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
    {
      "title": "Прайс",
      "file": { "url": "/assets/files/price.pdf", "filename": "price.pdf" }
    }
  ]
}
```

## Пример в chunk

Перебор списка — блок Fenom. В MODX без Fenom нужен сниппет или доступ по индексу.

::: code-group

```modx
<a href="[[+files.0.file.url]]">[[+files.0.title]]</a>
```

```fenom
{foreach $files as $row}
  <a href="{$row.file.url|escape}">{$row.title|pb_text}</a>
{/foreach}
```

:::

## Похожие типы

- [file](file) для одного файла
- Секция [Загрузки](../sections/downloads) для готового блока
