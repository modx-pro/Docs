---
title: "Кейс"
description: "История клиента с результатом, текстом и кнопкой. Слой Pro."
---

# Кейс

Секция `case_study` описывает один проект. Chunk: `pagebuilderpro_case_study`. Требуется PageBuilder Pro.

## Где уместна

- Один клиентский пример на лендинге
- Результат в одной строке и история ниже
- Ссылка на полную страницу проекта

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | да | Заголовок |
| `client` | text | нет | Клиент |
| `result` | text | нет | Результат |
| `text` | textarea | нет | История |
| `image` | image | нет | Изображение |
| `button_label` | text | нет | Подпись кнопки |
| `button_url` | url | нет | URL кнопки |

## Рендер

Картинка слева, только если `image` задан, через `pagebuilder_partial_image`. `client` и `result` печатаются отдельно от текста. Кнопка появляется, если заданы оба поля `button_label` и `button_url`. URL проходит `pb_href`. `title` обязателен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Сеть магазинов",
  "client": "North",
  "result": "+18% к заказам",
  "text": "Собрали витрину из секций",
  "image": { "url": "assets/images/case.jpg" },
  "button_label": "Читать",
  "button_url": "/cases/north"
}
```

## Похожие секции

- [Портфолио](portfolio) для нескольких проектов
- [Отзывы клиентов](testimonials) для коротких цитат

## Связанные страницы

- [Каталог секций](index)
