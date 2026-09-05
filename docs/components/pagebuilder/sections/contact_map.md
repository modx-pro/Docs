---
title: "Контакты с картой"
description: "Телефон, email, текст, кнопка и карта в одном блоке. Слой Pro."
---

# Контакты с картой

Объединяет секции **Контакты** и **Карта**: слева (или сверху) контакты и CTA, рядом iframe карты.

<!-- ![Контакты с картой](/components/pagebuilder/screenshots/sections/contact_map.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем объединять контакты и карту

- Телефон, email и карта на одном экране
- Меньше секций в документе, чем Contact + Map по отдельности
- Один chunk для типовой страницы «Контакты»

## Куда ставить

- На странице «Контакты»: полный блок
- В футере лендинга с адресом
- На странице филиала

## Примеры страниц

- Контакты (одна страница): [Hero](hero) → [Contact map](contact_map) → [FAQ](faq)
- Лендинг: [CTA](cta) → [Contact map](contact_map)

## Контакты и точка на карте

Заполните контактные поля и **Точку на карте**. Один блок вместо двух отдельных секций.

## Похожие секции

- [Контакты](contact) + [Карта](map), если нужен другой порядок или вёрстка
- [Форма](contact_form) рядом для заявок

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `contact_map` |
| Слой | Pro |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilderpro_contact_map` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Текст (`text`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Телефон (`phone`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Email (`email`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Карта (`location`)

Тип [map](../fields/map#vyvod-v-section-data). Обязательное. Точка на карте. На сайте. iframe через MapEmbedResolver.

### Текст кнопки (`button_label`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### URL кнопки (`button_url`)

Тип [url](../fields/url#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Секция `pb-contact-map`: контакты + iframe карты.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "phone": "+7 (999) 123-45-67",
  "email": "hello@example.com",
  "location": {
    "lat": 55.751244,
    "lng": 37.618423,
    "embed_url": "https://yandex.ru/map-widget/v1/..."
  },
  "button_label": "Подробнее",
  "button_url": "https://example.com/action"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_contact_map`:

```fenom
<section class="pb-section pb-section--contact-map pb-contact-map{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact_map"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact-map__inner">
    {if $title}
      <h2 class="pb-heading pb-contact-map__title">{$title|escape}</h2>
    {/if}
    <div class="pb-contact-map__layout">
      <div class="pb-contact-map__details">
        {if $text}
          <p class="pb-contact-map__text">{$text|escape}</p>
        {/if}
        {if $phone}
          <p class="pb-contact-map__phone"><a href="tel:{$phone|escape:'url'}">{$phone|escape}</a></p>
        {/if}
        {if $email}
          <p class="pb-contact-map__email"><a href="mailto:{$email|escape:'url'}">{$email|escape}</a></p>
        {/if}
        {if $button_label && $button_url}
          <a class="pb-contact-map__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
        {/if}
      </div>
      {if $map_embed_url}
        <div class="pb-contact-map__map">
          <iframe
            class="pb-contact-map__frame"
            title="{$title|default:'Map'|escape}"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            src="{$map_embed_url|escape}"
          ></iframe>
        </div>
      {/if}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/contact_map.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
