---
title: "Вкладки"
description: "Переключаемые панели с названием вкладки и HTML-контентом. Слой Pro."
---

# Вкладки

Длинный материал делится на вкладки: доставка, оплата, характеристики. Контент каждой вкладки. HTML из richtext.

<!-- ![Вкладки](/components/pagebuilder/screenshots/sections/tabs.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Вкладки вместо простыни

- Длинный контент не растягивает страницу вертикально
- Каждая вкладка со своим якорем для ссылок
- Richtext внутри панели

## Типичные страницы

- На карточке товара: описание / specs / отзывы
- На странице услуги: этапы, состав, FAQ
- В документации на одной странице

## Примеры страниц

- Товар: [Hero / spotlight](product_spotlight) → [Tabs](tabs): описание | характеристики | доставка
- Услуга: [Features](features) → [Tabs](tabs) → [FAQ](faq)

## Repeater вкладок

Repeater **Вкладки**: **Название вкладки**, **Якорь** (латиница для URL), **Содержимое**. На фронте переключение даёт `pagebuilder-sections.js`.

## Похожие секции

- [FAQ](faq) для коротких пар вопрос/ответ
- [Текстовый блок](richtext), если вкладки избыточны

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `tabs` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilderpro_tabs` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Вкладки (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `label` | [text](../fields/text#vyvod-v-section-data) | Название вкладки | да |
| `anchor` | [slug](../fields/slug#vyvod-v-section-data) | Якорь | нет |
| `content` | [richtext](../fields/richtext#vyvod-v-section-data) | Содержимое | да |

## Что видит посетитель

Секция `pb-tabs` с панелями. Подключите JS секций в шаблоне.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "label": "Довольных клиентов",
      "anchor": "tab-delivery",
      "content": "<p>Текст страницы с <strong>форматированием</strong>.</p>"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_tabs`:

```fenom
{var $tabCount = $items|count}
<section class="pb-section pb-section--tabs pb-tabs{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="tabs" data-pb-tabs{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-tabs__inner">
    {if $title}
      <h2 class="pb-heading pb-tabs__title">{$title|escape}</h2>
    {/if}
    {if $tabCount > 0}
      <div class="pb-tabs__nav" role="tablist" aria-label="{$title|default:'Tabs'|escape}">
        {foreach $items as $item}
          {var $anchor = $item.anchor|default:('tab-' ~ $item@index)}
          <button
            type="button"
            class="pb-tabs__tab{if $item@first} pb-tabs__tab--active{/if}"
            id="pb-tab-{$id|default:'section'}-{$item@index}"
            role="tab"
            aria-selected="{if $item@first}true{else}false{/if}"
            aria-controls="pb-panel-{$id|default:'section'}-{$item@index}"
            data-pb-tab="{$item@index}"
            data-pb-anchor="{$anchor|escape}"
          >
            {$item.label|escape}
          </button>
        {/foreach}
      </div>
      <div class="pb-tabs__panels">
        {foreach $items as $item}
          {var $anchor = $item.anchor|default:('tab-' ~ $item@index)}
          <div
            class="pb-tabs__panel{if $item@first} pb-tabs__panel--active{/if}"
            id="pb-panel-{$id|default:'section'}-{$item@index}"
            role="tabpanel"
            aria-labelledby="pb-tab-{$id|default:'section'}-{$item@index}"
            data-pb-panel="{$item@index}"
            data-pb-anchor="{$anchor|escape}"
            {if !$item@first}hidden{/if}
          >
            <details class="pb-tabs__accordion">
              <summary class="pb-tabs__accordion-summary">{$item.label|escape}</summary>
              <div class="pb-tabs__accordion-body pb-richtext__content">{$item.content}</div>
            </details>
            <div class="pb-tabs__desktop pb-richtext__content">{$item.content}</div>
          </div>
        {/foreach}
      </div>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/tabs.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
