---
title: "Аккордеон"
description: "Панели на нативных details без JavaScript. Слой Pro."
---

# Аккордеон

Секция `accordion` рендерит панели как `<details>`. Отдельного JS нет. Chunk: `pagebuilderpro_accordion`. Требуется PageBuilder Pro.

У панели `open` отмечает, открыта ли она по умолчанию.

![Аккордеон](/components/pagebuilder/screenshots/sections/accordion.jpg)

## Где уместна

- Короткий FAQ без отдельной секции вопросов
- Условия и оговорки
- Раскрывающиеся блоки в статье

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `items` | repeater | да | Панели |
| `items.title` | text | да | Заголовок панели |
| `items.body` | textarea | да | Текст |
| `items.open` | toggle | нет | Открыта по умолчанию |

## Рендер

Каждая строка это `<details class="pb-accordion__item">`. Атрибут `open` ставится, если `items.open` истинно. JavaScript секция не подключает. Пустой repeater оставляет пустой `div.pb-accordion__list`.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Условия",
  "items": [
    { "title": "Доставка", "body": "По городу на следующий день", "open": true }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_accordion`:

```fenom
<section class="pb-section pb-section--accordion pb-accordion{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="accordion"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <div class="pb-accordion__list">
      {foreach $items as $item}
        <details class="pb-accordion__item"{if $item.open} open{/if}>
          <summary class="pb-accordion__summary">{$item.title|escape}</summary>
          <div class="pb-accordion__body">
            <p>{$item.body|escape}</p>
          </div>
        </details>
      {/foreach}
    </div>
  </div>
</section>
```

## Похожие секции

- [Вопросы и ответы](faq) для готового FAQ
- [Вкладки](tabs), если панели переключаются, а не раскрываются

## Связанные страницы

- [Каталог секций](index)
