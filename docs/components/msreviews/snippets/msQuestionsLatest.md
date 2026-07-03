---
title: msQuestionsLatest
description: Последние вопросы с ответами для главной и FAQ-блоков msReviews
---

# Сниппет msQuestionsLatest

Cross-product блок последних опубликованных вопросов с ответами. По умолчанию показывает только FAQ (`faqOnly=1`).

## Назначение

Блок «Частые вопросы» на главной, лендинге, блоге. JSON-LD **не** выводится.

## Где вызывать

- Шаблон **главной**, страницы с FAQ-виджетом.
- Scope через `parents` или `productIds`, как у [msReviewsLatest](msReviewsLatest).

## Зависимости

- **MiniShop3**, **msReviews**
- **pdoTools** — для пагинации через обёртку `pdoPage`

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `limit` | `10` | Записей (1–50) |
| `offset` | `0` | Пропуск. При вызове из `pdoPage` передаётся обёрткой автоматически |
| `totalVar` | `page.total` | Плейсхолдер total для `pdoPage` |
| `parents` | *(пусто)* | CSV id категорий |
| `productIds` | *(пусто)* | CSV id товаров |
| `faqOnly` | `1` | Только вопросы с опубликованным ответом |
| `showProduct` | `1` | Ссылка на товар в карточке |
| `dateFormat` | *(настройка)* | Формат даты |
| `hideEmpty` | `0` | Пустой вывод без вопросов |
| `viewAllUrl` | *(пусто)* | Ссылка «Смотреть все» в футере |
| `tpl` | `tplQuestionLatestItem` | Чанк карточки |
| `wrapper` | `tplQuestionsLatestList` | Чанк-обёртка |

## FAQ на главной

::: code-group

```fenom
{set $catalog_id = ('ms3_page_id_catalog' | option) ?: ('site_start' | option)}
{'!msQuestionsLatest' | snippet : [
  'limit' => 5,
  'parents' => $catalog_id,
  'faqOnly' => 1,
  'showProduct' => 1,
  'hideEmpty' => 1,
  'viewAllUrl' => ($catalog_id | url)
]}
```

```modx
[[!msQuestionsLatest?
  &limit=`5`
  &parents=`[[++ms3_page_id_catalog]]`
  &faqOnly=`1`
  &showProduct=`1`
  &hideEmpty=`1`
  &viewAllUrl=`[[~[[++ms3_page_id_catalog]]]]`
]]
```

:::

## Все опубликованные вопросы (без ответа)

::: code-group

```fenom
{'!msQuestionsLatest' | snippet : [
  'limit' => 8,
  'faqOnly' => 0,
  'hideEmpty' => 1
]}
```

```modx
[[!msQuestionsLatest? &limit=`8` &faqOnly=`0` &hideEmpty=`1`]]
```

:::

## Конкретные товары

::: code-group

```fenom
{'!msQuestionsLatest' | snippet : [
  'productIds' => '12,34,56',
  'limit' => 5,
  'faqOnly' => 1,
  'viewAllUrl' => '/catalog/'
]}
```

```modx
[[!msQuestionsLatest?
  &productIds=`12,34,56`
  &limit=`5`
  &faqOnly=`1`
  &viewAllUrl=`/catalog/`
]]
```

:::

Чанки: `tplQuestionsLatestList`, `tplQuestionLatestItem` — [Чанки](../chunks).

## Пагинация

Обёртка `pdoPage` с `element=msQuestionsLatest`. Параметр `pdoPage` у сниппета не нужен. См. [Интеграция — пагинация](../integration#пагинация-pdopage), [msQuestions](msQuestions#пагинация-q-a).

## См. также

- [msQuestions](msQuestions) — Q&A на PDP
- [msReviewsLatest](msReviewsLatest)
- [Интеграция — главная](../integration)
- [FAQ](../faq)
