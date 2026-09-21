---
title: "gallery"
description: "Массив media-объектов изображений с enrich metadata"
---

# Поле gallery

Версия: **Pro**.

<!-- ![gallery](/components/pagebuilder/screenshots/fields/gallery.jpg) -->

## Зачем этот тип

Несколько фотографий в одном поле. У каждого снимка свои альтернативный текст и подпись. После сохранения у файла появляются адрес, ширина и высота, как у поля [image](image). Тип есть в PageBuilder Pro.

## Когда использовать

- Несколько снимков в одной секции, без отдельной карусели
- Скриншоты товара
- Фото для сетки портфолио

## Советы

Одно фото удобнее полем [image](image). В чанке переберите массив и возьмите адрес снимка: `{$slide.url}`.

## Похожие типы

- [image](image) для одного файла
- [repeater](repeater) с полем image, если нужна своя схема строки. Доступно в Free

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

::: code-group

```modx
{foreach $shots as $image}
[[$pagebuilder_partial_image?
  &image=`{$image}`
  &alt=`{$image.title}`
  &class=`pb-gallery__media`
]]
{/foreach}
```

```fenom
{foreach $shots as $image}
  {include 'pagebuilder_partial_image' image=$image alt=$image.title class='pb-gallery__media'}
{/foreach}
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

- Дополнительно: `groups: true`: группы у элементов галереи.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
