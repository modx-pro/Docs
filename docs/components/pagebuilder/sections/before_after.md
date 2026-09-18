---
title: "До и после"
description: "Два изображения с подписями Before и After. Слой Pro."
---

# До и после

Секция `before_after` ставит два кадра рядом. Chunk: `pagebuilderpro_before_after`. Требуется PageBuilder Pro. Категория: медиа.

## Где уместна

- Результат ремонта, ретуши, клинического случая
- Сравнение двух состояний одного объекта

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок |
| `before_label` | text | нет | Подпись «до» |
| `before_image` | image | да | Кадр «до» |
| `after_label` | text | нет | Подпись «после» |
| `after_image` | image | да | Кадр «после» |
| `caption` | textarea | нет | Общая подпись |

## Рендер

Две колонки `figure.pb-before-after__panel`. Слайдера и JS нет. Картинки через `pagebuilder_partial_image`. Если подпись пустая, alt равен `Before` или `After`. `caption` печатается под сеткой, только если заполнен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Ремонт",
  "before_label": "До",
  "before_image": { "url": "assets/images/before.jpg" },
  "after_label": "После",
  "after_image": { "url": "assets/images/after.jpg" },
  "caption": "Три недели"
}
```

## Похожие секции

- [Галерея](gallery) для нескольких кадров без пары
- [Медиа и текст](media_split) для одного изображения и текста

## Связанные страницы

- [Каталог секций](index)
