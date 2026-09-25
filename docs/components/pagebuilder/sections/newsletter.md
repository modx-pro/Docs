---
title: "Рассылка"
description: "HTML-форма подписки на внешний action_url. Не FetchIt. Слой Pro."
---

# Рассылка

Секция `newsletter` рисует HTML-форму. Отправка идёт на внешний `action_url`, не через FetchIt. Chunk: `pagebuilderpro_newsletter`. Требуется PageBuilder Pro.

`action_url` обязателен. `email_name` задаёт имя поля email в POST. `note` это текст про персональные данные.

![Рассылка](/components/pagebuilder/screenshots/sections/newsletter.jpg)

## Где уместна

- Подписка на Mailchimp, Unisender или свой endpoint
- Блок в подвале лендинга
- Сбор email без письма из MODX

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок |
| `text` | textarea | нет | Текст |
| `action_url` | url | да | URL обработчика формы |
| `email_name` | text | нет | Имя поля email |
| `placeholder` | text | нет | Placeholder |
| `submit_label` | text | нет | Подпись кнопки |
| `note` | textarea | нет | Примечание о данных |

## Рендер

Форма `method="post"` уходит на `action_url`. FetchIt не участвует. Пустые поля получают значения chunk: имя поля `email`, кнопка `Subscribe`, placeholder `you@example.com`. `note` и `text` печатаются только если заполнены. Отдельного empty state нет: без `action_url` публикация не проходит, поле обязательное.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Рассылка",
  "text": "Раз в месяц",
  "action_url": "https://example.com/subscribe",
  "email_name": "email",
  "placeholder": "you@example.com",
  "submit_label": "Subscribe",
  "note": "Можно отписаться в письме"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_newsletter`:

```fenom
{set $emailField = $email_name|default:'email'}
{set $submitText = $submit_label|default:'Subscribe'}
{set $ph = $placeholder|default:'you@example.com'}
<section class="pb-section pb-section--newsletter pb-newsletter{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="newsletter"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $text}<p class="pb-newsletter__text">{$text|escape}</p>{/if}
    <form class="pb-newsletter__form" method="post" action="{$action_url|escape}">
      <label class="pb-newsletter__label" for="pb-newsletter-{$id|escape}">
        <span class="pb-sr-only">Email</span>
        <input
          class="pb-newsletter__input"
          id="pb-newsletter-{$id|escape}"
          type="email"
          name="{$emailField|escape}"
          placeholder="{$ph|escape}"
          required
          autocomplete="email"
        />
      </label>
      <button class="pb-button" type="submit">{$submitText|escape}</button>
    </form>
    {if $note}<p class="pb-newsletter__note">{$note|escape}</p>{/if}
  </div>
</section>
```

## Похожие секции

- [Конструктор формы](form_builder) для письма и webhook через FetchIt
- [Форма обратной связи](contact_form) для заявки на `emailsender`

## Связанные страницы

- [Каталог секций](index)
