---
title: "image"
description: "Media-объект изображения с alt и enrich metadata"
---

# Поле image

Версия: **Free**.

<!-- ![image](/components/pagebuilder/screenshots/fields/image.png) -->

## Зачем этот тип

- После enrich в объекте есть width, height, extension
- Alt и caption задаёте в схеме секции
- Один кадр, без repeater и gallery

## Когда использовать

- Фон hero, превью карточки, фото автора
- Превью в стиле OG внутри секции
- Логотип партнёра с alt

## Советы

- Несколько кадров: [gallery](gallery) (Pro)
- В chunk берите `{$photo.url}`, не строку path

## Похожие типы

- [gallery](gallery) для набора изображений (Pro)
- [file](file) для любых файлов, не только изображений

## Настройка

```json
{
  "name": "photo",
  "type": "image",
  "label": "Изображение",
  "description": "Рекомендуемый размер 1920×1080",
  "width": 50,
  "tab": "Контент",
  "active": true
}
```

## Значение

Media-объект. Кнопка Info редактирует width, height, title. При выборе из браузера подтягиваются size и имя файла.

## Данные секции {#vyvod-v-section-data}

Ключ `photo` в данных секции после save enrich:

```json
{
  "photo": {
    "url": "assets/images/hero.jpg",
    "id": 12,
    "path": "assets/images/",
    "filename": "hero.jpg",
    "extension": "jpg",
    "name": "hero",
    "title": "hero.jpg",
    "width": 1920,
    "height": 1080,
    "size": 245760,
    "type": "image"
  }
}
```

- Поля `width`, `height`, `size` дополняются с диска, если файл доступен MODX.

## Пример в chunk

```html
<img src="{$photo.url|escape}" width="{$photo.width}" height="{$photo.height}" alt="{$photo.title|escape}">
```

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false` — скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно в schema: нет `responsive`. Значение — media-объект, enrich при save.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
