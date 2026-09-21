---
title: "file"
description: "Media-объект файла после enrich при save draft"
---

# Поле file

Версия: **Free**.

<!-- ![file](/components/pagebuilder/screenshots/fields/file.jpg) -->

## Зачем этот тип

Поле для PDF, архива и других файлов, не только для картинок. После сохранения в данных есть имя файла, расширение, размер и адрес. Файлы обрабатываются так же, как у [image](image).

## Когда использовать

- PDF с ценами, презентация, файл для скачивания
- Вложение в форме или в блоке с кнопкой
- Любой файл из медиа MODX

## Советы

В чанке берите `{$file.url}`, не путь к файлу. Для одних фотографий чаще хватает [image](image).

## Похожие типы

- [image](image) для фото с alt и размерами
- [url](url) для внешней ссылки, если файл не загружают

## Настройка

```json
{
  "name": "pdf",
  "type": "file",
  "label": "Файл",
  "description": "PDF или другой документ",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект media: `url`, `size`, `title`, `name`, `filename`, `extension`, `type` и др. Legacy-строка при чтении оборачивается в `{ url }`.

## Данные секции {#vyvod-v-section-data}

Ключ `pdf` в данных секции после save enrich (`MediaFieldEnricher`):

```json
{
  "pdf": {
    "url": "assets/files/catalog.pdf",
    "id": 34,
    "path": "assets/files/",
    "filename": "catalog.pdf",
    "extension": "pdf",
    "name": "catalog",
    "title": "catalog.pdf",
    "size": 1048576,
    "type": "pdf"
  }
}
```

- Legacy-строка URL при чтении нормализуется в `{ url }`.

## Пример в chunk

::: code-group

```modx
<a href="[[+pdf.url]]" download="[[+pdf.title]]">[[+pdf.title]]</a>
```

```fenom
<a href="{$pdf.url|escape}" download="{$pdf.title|escape}">{$pdf.title|pb_text}</a>
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно в schema: media-объект, enrich при save.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
