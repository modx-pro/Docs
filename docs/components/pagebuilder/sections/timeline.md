---
title: "Хронология"
description: "Список событий с датой, заголовком и текстом. Слой Pro."
---

# Хронология

Секция `timeline` выводит события в порядке строк repeater. Chunk: `pagebuilderpro_timeline`. Требуется PageBuilder Pro.

![Хронология](/components/pagebuilder/screenshots/sections/timeline.jpg)

## Где уместна

- История компании или продукта
- Этапы проекта
- Даты релизов

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `items` | repeater | да | События |
| `items.date` | text | да | Дата |
| `items.title` | text | да | Заголовок события |
| `items.text` | textarea | нет | Текст |

## Рендер

Chunk собирает `<ol class="pb-timeline__list">`. Пустой `items` оставляет пустой список. Отдельной фразы нет. Дата и заголовок обязательны. Текст строки выводится только если заполнен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "История",
  "items": [
    { "date": "2019", "title": "Старт", "text": "Первый офис" }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_timeline`:

```fenom
<section class="pb-section pb-section--timeline pb-timeline{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="timeline"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <ol class="pb-timeline__list">
      {foreach $items as $item}
        <li>
          <p class="pb-timeline__date">{$item.date|escape}</p>
          <h3>{$item.title|escape}</h3>
          {if $item.text}<p>{$item.text|escape}</p>{/if}
        </li>
      {/foreach}
    </ol>
  </div>
</section>
```

## Похожие секции

- [Как это работает](how_it_works) для шагов без дат
- [Кейс](case_study) для одной истории

## Связанные страницы

- [Каталог секций](index)
