---
title: "Как это работает"
description: "Шаги с заголовком, текстом и иконкой. Слой Pro."
---

# Как это работает

Секция `how_it_works` выводит шаги из repeater. Chunk: `pagebuilderpro_how_it_works`. Требуется PageBuilder Pro.

![Как это работает](/components/pagebuilder/screenshots/sections/how_it_works.jpg)

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

## Шаблон chunk

Fenom chunk `pagebuilderpro_how_it_works`:

```fenom
<section class="pb-section pb-section--how-it-works pb-how-it-works{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="how_it_works"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $intro}<p class="pb-how-it-works__intro">{$intro|escape}</p>{/if}
    <ol class="pb-how-it-works__steps">
      {foreach $steps as $step}
        <li class="pb-how-it-works__step">
          <span class="pb-how-it-works__num" aria-hidden="true">{$step@index + 1}</span>
          {if $step.icon}{include 'pagebuilder_partial_image' image=$step.icon alt=$step.title class='pb-how-it-works__icon'}{/if}
          <h3>{$step.title|escape}</h3>
          {if $step.text}<p>{$step.text|escape}</p>{/if}
        </li>
      {/foreach}
    </ol>
  </div>
</section>
```

## Похожие секции

- [Хронология](timeline), если у шагов есть даты
- [Преимущества](features) для пунктов без порядка

## Связанные страницы

- [Каталог секций](index)
