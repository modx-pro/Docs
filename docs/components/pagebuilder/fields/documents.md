---
title: "documents"
description: "Список файлов с названием. Слой Pro."
---

# Поле documents

Версия: **Pro** (`advanced-fields`).

Список строк `{ title, file }`. `file` — строка или media-объект, как у поля [file](file).

- Строка без `title` и без непустого `file` отбрасывается.
- Объект `file` с пустым `url` сохраняется.

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
