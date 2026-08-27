---
title: "Тарифы"
description: "Карточки тарифов с ценой, периодом и списком возможностей. Слой Pro."
---

# Тарифы

Таблица цен для подписок и пакетов услуг. У каждого плана название, цена, период оплаты и список фич текстом.

<!-- ![Тарифы](/components/pagebuilder/screenshots/sections/pricing_table.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем таблица тарифов

- Несколько тарифов в одной секции
- Список фич текстом, строка = пункт (без repeater на каждую фичу)
- Кнопка и цена на каждый план

## Типичные страницы

- На SaaS-сайте: три тарифа на странице цен
- Для услуг: пакеты «Старт / Бизнес / Enterprise»
- На лендинге: блок перед формой заявки

## Примеры страниц

- SaaS: [Features](features) → [Pricing](pricing_table) → [FAQ](faq) → [CTA](cta)
- Услуги: [Карточки](cards) → [Pricing](pricing_table) → [Форма](contact_form)

## Repeater тарифов

Repeater **Тарифы**. Поле **Список возможностей**: plain text, одна строка равна одному пункту. Кнопку тарифа задайте через поля кнопки в строке.

## Похожие секции

- [Карточки](cards), если цены и кнопки не нужны
- [Таблица данных](data_table) для прайса из таблицы панели управления

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `pricing_table` |
| Слой | Pro |
| Категория | конверсия (`conversion`) |
| Chunk | `pagebuilderpro_pricing_table` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Тарифы (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `name` | [text](../fields/text#vyvod-v-section-data) | Название тарифа | да |
| `price` | [currency](../fields/currency#vyvod-v-section-data) | Цена | да |
| `period` | [text](../fields/text#vyvod-v-section-data) | Период оплаты | нет |
| `description` | [textarea](../fields/textarea#vyvod-v-section-data) | Описание | нет |
| `features` | [textarea](../fields/textarea#vyvod-v-section-data) | Список возможностей (по одной на строку) | нет |
| `button_label` | [text](../fields/text#vyvod-v-section-data) | Текст кнопки | нет |
| `button_url` | [url](../fields/url#vyvod-v-section-data) | URL кнопки | нет |
| `highlighted` | [yesno](../fields/yesno#vyvod-v-section-data) | Highlighted plan | нет |
| `badge` | [text](../fields/text#vyvod-v-section-data) | Badge | нет |

## Что видит посетитель

Секция `pb-pricing` с карточками планов.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "Иван Петров",
      "price": 990,
      "period": "в месяц",
      "description": "Короткое описание блока для первого экрана.",
      "features": "Безлимитные проекты\nПриоритетная поддержка\nAPI-доступ",
      "button_label": "Подробнее",
      "button_url": "https://example.com/action",
      "highlighted": true,
      "badge": "Текст"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_pricing_table`:

```fenom
<section class="pb-section pb-section--pricing-table pb-pricing-table{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="pricing_table"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-pricing-table__inner">
    {if $title}
      <h2 class="pb-heading pb-pricing-table__title">{$title|escape}</h2>
    {/if}
    <div class="pb-pricing-table__grid pb-grid pb-grid--cards">
      {foreach $items as $item}
        <article class="pb-pricing-table__plan{if $item.highlighted} pb-pricing-table__plan--highlight{/if}">
          {if $item.badge}
            <span class="pb-pricing-table__badge">{$item.badge|escape}</span>
          {/if}
          <h3 class="pb-pricing-table__name">{$item.name|escape}</h3>
          {if $item.description}
            <p class="pb-pricing-table__description">{$item.description|escape}</p>
          {/if}
          <p class="pb-pricing-table__price">
            <span class="pb-pricing-table__amount">{$item.price|escape}</span>
            {if $item.period}
              <span class="pb-pricing-table__period">{$item.period|escape}</span>
            {/if}
          </p>
          {if $item.features_list}
            <ul class="pb-pricing-table__features">
              {foreach $item.features_list as $feature}
                <li>{$feature|escape}</li>
              {/foreach}
            </ul>
          {elseif $item.features}
            <ul class="pb-pricing-table__features">
              {foreach $item.features|split:"\n" as $feature}
                {if $feature|trim}
                  <li>{$feature|trim|escape}</li>
                {/if}
              {/foreach}
            </ul>
          {/if}
          {if $item.button_label && $item.button_url}
            <a class="pb-button pb-pricing-table__cta" href="{$item.button_url|escape:'url'}">{$item.button_label|escape}</a>
          {/if}
        </article>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/pricing_table.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
