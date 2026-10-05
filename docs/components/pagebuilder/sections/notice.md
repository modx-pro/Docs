---
title: "Уведомление"
description: "Короткое сообщение с тоном info, success, warning или danger. Слой Pro."
---

# Уведомление

Секция `notice` выводит короткое сообщение. Chunk: `pagebuilderpro_notice`. Требуется PageBuilder Pro.

![Уведомление](/components/pagebuilder/screenshots/sections/notice.jpg)

`tone`: `info`, `success`, `warning`, `danger`. Подложка тона сидит на блоке текста (`width: fit-content`), не на всю ширину секции.

## Где уместна

- Предупреждение на странице услуги
- Статус акции
- Служебная пометка над формой

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `tone` | select | нет | `info`, `success`, `warning`, `danger` |
| `title` | text | нет | Заголовок |
| `text` | textarea | да | Текст |

## Рендер

Корень `<aside role="note">`. Класс тона `pb-notice--info`, `pb-notice--success`, `pb-notice--warning` или `pb-notice--danger`. Пустой `tone` становится `info`. Тот же тон пишется в `data-pb-tone`. `text` обязателен. Заголовок печатается только если заполнен.

## Данные секции {#vyvod-v-section-data}

```json
{
  "tone": "warning",
  "title": "Склад",
  "text": "Отгрузка с 20 сентября"
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_notice`:

```fenom
{set $toneValue = $tone|default:'info'}
<aside class="pb-section pb-section--notice pb-notice pb-notice--{$toneValue|escape}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="notice" data-pb-tone="{$toneValue|escape}"{if $id} id="pb-{$id|escape}"{/if} role="note">
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading pb-notice__title">{$title|escape}</h2>{/if}
    <p class="pb-notice__text">{$text|escape}</p>
  </div>
</aside>
```

## Похожие секции

- [Призыв к действию](cta) для кнопки
- [Текстовый блок](richtext) для длинного текста

## Связанные страницы

- [Каталог секций](index)
