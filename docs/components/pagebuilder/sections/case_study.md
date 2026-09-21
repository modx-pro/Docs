---
title: "Кейс"
description: "История клиента с результатом, текстом и кнопкой. Слой Pro."
---

# Кейс

Секция `case_study` описывает один проект. Chunk: `pagebuilderpro_case_study`. Требуется PageBuilder Pro.

![Кейс](/components/pagebuilder/screenshots/sections/case_study.jpg)

## Где уместна

- Один клиентский пример на лендинге
- Результат в одной строке и история ниже
- Ссылка на полную страницу проекта

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | да | Заголовок |
| `client` | text | нет | Клиент |
| `result` | text | нет | Результат |
| `text` | textarea | нет | История |
| `image` | image | нет | Изображение |
| `button_label` | text | нет | Подпись кнопки |
| `button_url` | url | нет | URL кнопки |

## Рендер

Картинка слева, только если `image` задан, через `pagebuilder_partial_image`. `client` и `result` печатаются отдельно от текста. Кнопка появляется, если заданы оба поля `button_label` и `button_url`. URL проходит `pb_href`. `title` обязателен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Сеть магазинов",
  "client": "North",
  "result": "+18% к заказам",
  "text": "Собрали витрину из секций",
  "image": { "url": "assets/images/case.jpg" },
  "button_label": "Читать",
  "button_url": "/cases/north"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_case_study`:

```fenom
<section class="pb-section pb-section--case-study pb-case-study{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="case_study"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-case-study__inner">
    {if $image}
      <div class="pb-case-study__media">
        {include 'pagebuilder_partial_image' image=$image alt=$title class='pb-case-study__image'}
      </div>
    {/if}
    <div class="pb-case-study__body">
      {if $client}<p class="pb-case-study__client">{$client|escape}</p>{/if}
      <h2 class="pb-heading">{$title|escape}</h2>
      {if $result}<p class="pb-case-study__result"><strong>{$result|escape}</strong></p>{/if}
      {if $text}<p>{$text|escape}</p>{/if}
      {if $button_label && $button_url}
        <p><a class="pb-button" href="{$button_url|pb_href|escape}">{$button_label|escape}</a></p>
      {/if}
    </div>
  </div>
</section>
```

## Похожие секции

- [Портфолио](portfolio) для нескольких проектов
- [Отзывы клиентов](testimonials) для коротких цитат

## Связанные страницы

- [Каталог секций](index)
