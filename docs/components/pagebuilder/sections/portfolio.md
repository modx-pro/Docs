---
title: "Портфолио"
description: "Карточки проектов с изображением, ссылкой и текстом. Слой Pro."
---

# Портфолио

Секция `portfolio` показывает проекты из repeater. Chunk: `pagebuilderpro_portfolio`. Требуется PageBuilder Pro.

![Портфолио](/components/pagebuilder/screenshots/sections/portfolio.jpg)

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

## Шаблон chunk

Fenom chunk `pagebuilderpro_portfolio`:

```fenom
<section class="pb-section pb-section--portfolio pb-portfolio{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="portfolio"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <div class="pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-portfolio__item">
          {if $item.image}{include 'pagebuilder_partial_image' image=$item.image alt=$item.title class='pb-portfolio__image'}{/if}
          <h3>{$item.title|escape}</h3>
          {if $item.text}<p>{$item.text|escape}</p>{/if}
          {if $item.url}<p><a href="{$item.url|escape}">{$item.title|escape}</a></p>{/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## Похожие секции

- [Галерея](gallery), если нужны только кадры
- [Кейс](case_study) для одной истории с результатом

## Связанные страницы

- [Каталог секций](index)
