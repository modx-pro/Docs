---
title: "Медиа и текст"
description: "Изображение слева или справа и текст с кнопкой. Слой Pro."
---

# Медиа и текст

Секция `media_split` ставит изображение и текст в две колонки. Chunk: `pagebuilderpro_media_split`. Требуется PageBuilder Pro.

`media_side`: `left` или `right`.

## Где уместна

- Блок «о компании» с фото
- Продукт с коротким текстом и кнопкой
- Чередование колонок на лендинге

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок |
| `text` | textarea | нет | Текст |
| `image` | image | да | Изображение |
| `media_side` | select | нет | `left` или `right` |
| `button_label` | text | нет | Подпись кнопки |
| `button_url` | url | нет | URL кнопки |

## Рендер

Класс стороны: `pb-media-split--left` или `pb-media-split--right`. Пустой `media_side` становится `left`. Картинка обязательна и идёт через `pagebuilder_partial_image`. Кнопка рисуется только если заданы и `button_label`, и `button_url`. URL проходит модификатор `pb_href`.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "О нас",
  "text": "Короткий абзац",
  "image": { "url": "assets/images/team.jpg" },
  "media_side": "right",
  "button_label": "Подробнее",
  "button_url": "/about"
}
```

## Похожие секции

- [Изображение](image) для одного кадра без колонки текста
- [До и после](before_after) для пары кадров

## Связанные страницы

- [Каталог секций](index)
