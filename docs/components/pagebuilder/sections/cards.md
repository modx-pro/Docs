---
title: "Карточки"
description: "Сетка карточек с заголовком и текстом в каждой."
---

# Карточки

Универсальная сетка: в каждой карточке заголовок и короткий текст. Без иконок и кнопок. только структурированный список блоков.

<!-- ![Карточки](/components/pagebuilder/screenshots/sections/cards.png) -->

## Когда брать карточки

- Универсальная сетка без иконок и цен
- Подходит для услуг, этапов, коротких тезисов
- Free-слой, не требует Pro

## Сценарии

- Для услуг: три–шесть направлений
- Для этапов работы или roadmap
- Для преимуществ в простом виде (без иконок Pro-секции Features)

## Примеры страниц

- Услуги: [Hero](hero) → [Карточки](cards) → [FAQ](faq) → [CTA](cta)
- Процесс: [Текст](richtext) → [Карточки](cards) → [Отзывы](testimonials)

## Как заполнить repeater

Repeater **Карточки**: **Заголовок** и **Текст** на строку. Порядок перетаскиванием в инспекторе.

## Похожие секции

- [Преимущества](features) с иконками (Pro)
- [Тарифы](pricing_table), если в карточках нужны цены

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `cards` |
| Слой | Free |
| Категория | контент (`content`) |
| Chunk | `pagebuilder_cards` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Карточки (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `title` | [text](../fields/text#vyvod-v-section-data) | Заголовок | да |
| `text` | [textarea](../fields/textarea#vyvod-v-section-data) | Текст | нет |

## Что видит посетитель

Сетка `pb-cards` с элементами title + text.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "title": "Заголовок секции",
      "text": "Дополнительный текст под заголовком."
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_cards`:

```fenom
<section class="pb-section pb-section--cards pb-cards{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="cards"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-cards__inner">
    {if $title}
      <h2 class="pb-heading pb-cards__title">{$title|escape}</h2>
    {/if}
    <div class="pb-cards__grid pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-cards__item">
          <h3 class="pb-cards__item-title">{$item.title|escape}</h3>
          {if $item.text}
            <p class="pb-cards__item-text">{$item.text|escape}</p>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/cards.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
