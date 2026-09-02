---
title: "Контакты"
description: "Телефон, email, текст и кнопка без карты."
---

# Контакты

Простой контактный блок: телефон и email кликабельны (`tel:` / `mailto:`), можно добавить короткий текст и кнопку.

<!-- ![Контакты](/components/pagebuilder/screenshots/sections/contact.png) -->

## Что даёт контактный блок

- Телефон и email сразу кликабельны на мобильном
- Не нужна форма, если достаточно прямого контакта
- Компактнее блока [Контакты с картой](contact_map)

## Куда ставить

- В подвале лендинга: как связаться
- На странице «Контакты»: если карта не нужна
- Рядом с формой: альтернативный канал связи

## Примеры страниц

- Лендинг: … → [CTA](cta) → [Контакты](contact)
- Одностраничник услуги: [FAQ](faq) → [Контакты](contact)

## Минимум для вывода

Заполните хотя бы **Телефон** или **Email**. Кнопка работает как в секции CTA.

## Похожие секции

- [Контакты с картой](contact_map), если нужен адрес на карте
- [Форма обратной связи](contact_form) для заявок с полями

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `contact` |
| Слой | Free |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilder_contact` |
| Требования | — |

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

### Текст кнопки (`button_label`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### URL кнопки (`button_url`)

Тип [url](../fields/url#vyvod-v-section-data). Необязательное.

## Что видит посетитель

Секция `pb-contact` со ссылками tel:/mailto: и опциональной CTA-кнопкой.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "text": "Дополнительный текст под заголовком.",
  "phone": "+7 (999) 123-45-67",
  "email": "hello@example.com",
  "button_label": "Подробнее",
  "button_url": "https://example.com/action"
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_contact`:

```fenom
<section class="pb-section pb-section--contact pb-contact{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact__inner">
    {if $title}
      <h2 class="pb-heading pb-contact__title">{$title|escape}</h2>
    {/if}
    {if $text}
      <p class="pb-contact__text">{$text|escape}</p>
    {/if}
    <div class="pb-contact__details">
      {if $phone}
        <a class="pb-contact__link pb-contact__phone" href="tel:{$phone|escape:'url'}">{$phone|escape}</a>
      {/if}
      {if $email}
        <a class="pb-contact__link pb-contact__email" href="mailto:{$email|escape:'url'}">{$email|escape}</a>
      {/if}
    </div>
    {if $button_label && $button_url}
      <div class="pb-contact__actions">
        <a class="pb-contact__button pb-button" href="{$button_url|escape}">{$button_label|escape}</a>
      </div>
    {/if}
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/contact.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
