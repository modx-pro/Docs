---
title: "Портфолио"
description: "Карточки проектов с изображением, ссылкой и текстом. Слой Pro."
---

# Портфолио

Секция `portfolio` показывает проекты из repeater. Chunk: `pagebuilderpro_portfolio`. Требуется PageBuilder Pro.

## Где уместна

- Работы студии
- Кейсы без отдельной страницы на каждый проект
- Подборка ссылок с обложкой

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `items` | repeater | да | Проекты |
| `items.image` | image | нет | Обложка |
| `items.title` | text | да | Название |
| `items.url` | url | нет | Ссылка |
| `items.text` | textarea | нет | Короткий текст |

## Рендер

Карточки лежат в `div.pb-grid.pb-grid--cards`. Картинка идёт через chunk `pagebuilder_partial_image`, только если `image` задан. Ссылка рисуется, если есть `url`. Текст ссылки равен `title`. Пустой repeater оставляет пустую сетку.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Работы",
  "items": [
    {
      "image": { "url": "assets/images/case.jpg" },
      "title": "Витрина",
      "url": "/cases/store",
      "text": "Каталог на miniShop3"
    }
  ]
}
```

## Похожие секции

- [Галерея](gallery), если нужны только кадры
- [Кейс](case_study) для одной истории с результатом

## Связанные страницы

- [Каталог секций](index)
