---
title: "gallery"
description: "Массив media-объектов изображений с enrich metadata"
---

# Поле gallery

Версия: **Pro**.

<!-- ![gallery](/components/pagebuilder/screenshots/fields/gallery.png) -->

## Зачем этот тип

Несколько фото с alt и caption в repeater-like UI. Enrich как у [image](image) на каждый кадр. Pro advanced-fields.

## Когда использовать

- Слайды без отдельной carousel-секции
- Набор screenshots продукта
- Источник данных для сетки portfolio

## Советы

Один кадр: [image](image). В chunk перебирайте массив и `{$slide.url}`.

## Похожие типы

- [image](image) для одного файла
- [repeater](repeater) + image для кастомной nested схемы (Free)

## Настройка

```json
{
  "name": "shots",
  "type": "gallery",
  "label": "Галерея",
  "groups": true,
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Массив media-объектов (изображения, видео, pdf и др.).

## Данные секции {#vyvod-v-section-data}

Ключ `shots` в данных секции: массив media-объектов после enrich:

```json
{
  "shots": [
    {
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
      "type": "image",
      "description": "Подпись к кадру",
      "preview": "assets/images/hero.jpg",
      "groups": [
        "main",
        "slider"
      ]
    },
    {
      "url": "assets/files/catalog.pdf",
      "id": 34,
      "path": "assets/files/",
      "filename": "catalog.pdf",
      "extension": "pdf",
      "name": "catalog",
      "title": "catalog.pdf",
      "size": 1048576,
      "type": "pdf",
      "groups": "docs"
    }
  ]
}
```

- `groups`: строка или массив, если включено в schema поля.

## Пример в chunk

```fenom
{foreach $shots as $image}
  <img src="{$image.url|escape}" width="{$image.width}" height="{$image.height}" alt="{$image.title|escape}">
{/foreach}
```

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | CMP |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25–100 | Ширина поля в % строки (flex) | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: `groups: true`: группы у элементов галереи.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
