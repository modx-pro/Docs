---
title: "Преимущества"
description: "Пункты с иконкой, заголовком и описанием. Слой Pro."
---

# Преимущества

Блок «Почему мы»: у каждого пункта иконка (URL или класс), заголовок и пояснение. Визуально богаче, чем секция **Карточки**.

<!-- ![Преимущества](/components/pagebuilder/screenshots/sections/features.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Чем Features богаче карточек

- Иконка + заголовок + текст в каждой ячейке
- Визуально сильнее [Карточек](cards) на лендинге продукта
- Иконка через URL или CSS-класс темы

## Типичные лендинги

- На лендинге продукта: ключевые фичи
- Для сравнения с альтернативами без таблицы
- После hero на SaaS-сайте

## Примеры страниц

- SaaS: [Hero](hero) → [Features](features) → [Stats](stats) → [Pricing](pricing_table)
- Продукт: [Features](features) → [Видео](video) → [CTA](cta)

## Repeater преимуществ

Repeater **Преимущества**: **Иконка**, **Заголовок**, **Описание**. Иконку можно задать URL к SVG/PNG или CSS-класс темы.

## Похожие секции

- [Карточки](cards) (Free), если иконки не нужны
- [Сравнение товаров](product_comparison) для табличного contrast (Pro, MS3)

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `features` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilderpro_features` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Преимущества (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `icon` | [image](../fields/image#vyvod-v-section-data) | Иконка | нет |
| `title` | [text](../fields/text#vyvod-v-section-data) | Заголовок | да |
| `text` | [textarea](../fields/textarea#vyvod-v-section-data) | Текст | нет |

## Что видит посетитель

Секция `pb-features` с иконками и текстом.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "icon": {
        "url": "assets/images/example.jpg",
        "id": 12,
        "filename": "example.jpg",
        "extension": "jpg",
        "title": "example.jpg",
        "width": 1920,
        "height": 1080,
        "type": "image"
      },
      "title": "Заголовок секции",
      "text": "Дополнительный текст под заголовком."
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_features`:

```fenom
<section class="pb-section pb-section--features pb-features{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="features"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-features__inner">
    {if $title}
      <h2 class="pb-heading pb-features__title">{$title|escape}</h2>
    {/if}
    <div class="pb-features__grid pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-features__item">
          {if $item.icon}
            {include 'pagebuilder_partial_image' image=$item.icon alt=$item.title class='pb-features__icon'}
          {/if}
          <h3 class="pb-features__item-title">{$item.title|escape}</h3>
          {if $item.text}
            <p class="pb-features__item-text">{$item.text|escape}</p>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/features.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
