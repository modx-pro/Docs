---
title: "Как это работает"
description: "Шаги с заголовком, текстом и иконкой. Слой Pro."
---

# Как это работает

Секция `how_it_works` выводит шаги из repeater. Chunk: `pagebuilderpro_how_it_works`. Требуется PageBuilder Pro.

## Где уместна

- Процесс заказа или подключения
- Три-четыре шага под hero
- Объяснение услуги без дат

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `intro` | textarea | нет | Вступление |
| `steps` | repeater | да | Шаги |
| `steps.title` | text | да | Название шага |
| `steps.text` | textarea | нет | Текст |
| `steps.icon` | image | нет | Иконка |

## Рендер

Шаги в `<ol>`. Номер это индекс строки плюс 1, атрибут `aria-hidden="true"`. Поле `icon` имеет тип `image`, не [icon](../fields/icon). Картинка идёт через `pagebuilder_partial_image`. Пустой repeater оставляет пустой список. `intro` печатается только если заполнен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Как заказать",
  "intro": "Три шага",
  "steps": [
    {
      "title": "Выбор",
      "text": "Добавьте товар",
      "icon": { "url": "assets/images/step.png" }
    }
  ]
}
```

## Похожие секции

- [Хронология](timeline), если у шагов есть даты
- [Преимущества](features) для пунктов без порядка

## Связанные страницы

- [Каталог секций](index)
