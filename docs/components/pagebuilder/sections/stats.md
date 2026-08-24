---
title: "Цифры и факты"
description: "Ряд метрик — крупное число и подпись под ним."
---

# Цифры и факты

Несколько показателей в одну линию или сетку: «10 лет на рынке», «500+ клиентов». Цифра крупно, пояснение мелким текстом.

<!-- ![Цифры и факты](/components/pagebuilder/screenshots/sections/stats.png) -->

## Зачем эта секция

- Цифры читаются с первого взгляда, без таблицы
- KPI обновляет контент-менеджер, не верстальщик
- Пара value/label предсказуема в Fenom

## Где применять

- **Главная** — ключевые KPI компании
- **Лендинг B2B** — масштаб, география, SLA
- **Страница «О нас»** — факты вместо длинного текста

## Примеры страниц

- B2B: [Hero](hero) → [Stats](stats) → [Преимущества](features) → [CTA](cta)
- Агентство: [Stats](stats) → [Отзывы](testimonials) → [Логотипы](logos)

## Что заполнить

Repeater **Показатели**: **Значение** и **Подпись** в каждой строке. Обычно 3–4 пункта, не перегружайте.

## Похожие секции

- [Карточки](cards) для текстовых преимуществ без акцента на цифрах
- [Таблица характеристик](spec_table) для пар параметр/значение (Pro)

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `stats` |
| Слой | Free |
| Категория | доверие (`social`) |
| Chunk | `pagebuilder_stats` |
| Требования | — |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Показатели (`items`)

Тип [repeater](../fields/repeater#vyvod-v-section-data). Обязательное. Повторяющиеся строки. Кнопка «Добавить» в инспекторе.

В каждой строке:

| Поле | Тип | Подпись | Обязательно |
| --- | --- | --- | --- |
| `value` | [text](../fields/text#vyvod-v-section-data) | Значение | да |
| `label` | [text](../fields/text#vyvod-v-section-data) | Подпись | да |

## Что видит посетитель

Сетка `pb-stats` с парами value / label.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "value": "1200+",
      "label": "Довольных клиентов"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_stats`:

```fenom
<section class="pb-section pb-section--stats pb-stats{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="stats"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-stats__inner">
    {if $title}
      <h2 class="pb-heading pb-stats__title">{$title|escape}</h2>
    {/if}
    <div class="pb-stats__grid">
      {foreach $items as $item}
        <div class="pb-stats__item">
          <div class="pb-stats__value">{$item.value|escape}</div>
          <div class="pb-stats__label">{$item.label|escape}</div>
        </div>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON-определение

`core/components/pagebuilder/sections/stats.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
