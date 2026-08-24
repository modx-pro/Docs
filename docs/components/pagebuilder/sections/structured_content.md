---
title: "Структурированный контент"
description: "Текст через Editor.js — заголовки, списки, цитаты, медиа. Слой Pro."
---

# Структурированный контент

Альтернатива **Текстовому блоку** для лонгридов. Блочный редактор: заголовки H2–H4, списки, цитаты, встроенные изображения.

<!-- ![Структурированный контент](/components/pagebuilder/screenshots/sections/structured_content.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- Editor.js: заголовки, списки, цитаты без ручного HTML
- JSON в `section.data`, HTML на выводе chunk
- Удобнее richtext для длинных материалов

## Где применять

- **Статья блога** внутри page builder
- **Лонгрид** на лендинге
- **Новость** с богатой вёрсткой без ручного HTML

## Примеры страниц

- Блог-пост на page builder: [Hero](hero) → [Structured content](structured_content) → [CTA](cta)
- Новость: [Structured content](structured_content) → [Галерея](gallery)

## Что заполнить

Поле **editorjs** сохраняет JSON блоков. На выводе chunk превращает его в HTML внутри `.pb-richtext__content`.

## Похожие секции

- [Текстовый блок](richtext) для коротких HTML-фрагментов
- [Вкладки](tabs) для разделения тем, а не линейного лонгрида

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `structured_content` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilderpro_structured_content` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Содержимое (`body`)

Тип [editorjs](../fields/editorjs#vyvod-v-section-data). Обязательное. Блочный редактор. На сайте выводится HTML.

## Что видит посетитель

HTML из поля `editorjs` в обёртке `.pb-richtext__content`.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "body": {
    "json": {},
    "html": "<p>Структурированный контент Editor.js</p>"
  }
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_structured_content`:

```fenom
{var $bodyHtml = ''}
{if $body is array}
  {var $bodyHtml = $body.html|default:''}
{else}
  {var $bodyHtml = $body}
{/if}
<section class="pb-section pb-section--structured-content pb-structured-content pb-richtext{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="structured_content"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-structured-content__inner pb-richtext__inner">
    {if $title}
      <h2 class="pb-heading pb-structured-content__title">{$title|escape}</h2>
    {/if}
    {if $bodyHtml}
      <div class="pb-richtext__content pb-structured-content__body">
        {$bodyHtml}
      </div>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/structured_content.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
