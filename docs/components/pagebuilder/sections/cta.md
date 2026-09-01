---
title: "Призыв к действию"
description: "Компактный блок с заголовком, текстом и одной кнопкой."
---

# Призыв к действию

Короткий акцентный блок посередине или в конце страницы. Заголовок, поясняющий текст и одна кнопка с URL.

<!-- ![Призыв к действию](/components/pagebuilder/screenshots/sections/cta.png) -->

## Зачем отдельный CTA

- Минимум полей: заголовок, текст, одна кнопка
- Ставится в конец воронки без дублирования hero
- Класс `pb-cta` уже в теме пакета

## На каких страницах

- В конце лендинга перед футером
- Для подписки на рассылку или демо
- Для перехода в каталог или на страницу цен

## Примеры страниц

- Лендинг: … → [Отзывы](testimonials) → [CTA](cta) → [Контакты](contact)
- Блог: [Записи](blog_posts) → [CTA](cta) на подписку

## Обязательные поля

Кнопка без URL не выводится. Текст кнопки и ссылку задайте явно.

## Похожие секции

- [Hero](hero) для первого экрана с фоном
- [Форма обратной связи](contact_form), если нужен сбор полей, а не одна ссылка

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `cta` |
| Слой | Free |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilder_cta` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Обязательное.

### Текст (`text`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Текст кнопки (`button_label`)

Тип [text](../fields/text#vyvod-v-section-data). Обязательное.

### URL кнопки (`button_url`)

Тип [url](../fields/url#vyvod-v-section-data). Обязательное.

## Что видит посетитель

Секция `pb-cta` со ссылкой класса `pb-button`.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action"
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_cta`:

```fenom
<section class="pb-section pb-section--cta pb-cta{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="cta"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-cta__inner">
    <h2 class="pb-heading pb-cta__title">{$title|escape}</h2>
    {if $text}
      <p class="pb-cta__text">{$text|escape}</p>
    {/if}
    {if $button_label && $button_url}
      <div class="pb-cta__actions">
        <a class="pb-cta__button pb-button" href="{$button_url|escape:'url'}">{$button_label|escape}</a>
      </div>
    {/if}
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/cta.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
