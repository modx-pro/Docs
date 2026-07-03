---
title: msReviewsLatest
description: Виджет последних отзывов для главной и лендингов msReviews
---
<!-- TODO: translate from docs/components/msreviews/snippets/msReviewsLatest.md -->


# Сниппет msReviewsLatest

Выводит cross-product блок последних опубликованных отзывов: карточки с рейтингом, текстом, ссылкой на товар.

## Назначение

Блок последних отзывов на главной и лендингах. Scope товаров задают `parents` или `productIds`. JSON-LD не выводится.

## Где вызывать

- Шаблон **главной**, лендинг, блог.
- Рядом часто ставят [msTopRatedProducts](msTopRatedProducts) и [msQuestionsLatest](msQuestionsLatest).

## Зависимости

- **MiniShop3**, **msReviews**
- **pdoTools** — для пагинации через обёртку `pdoPage`
- При `engagement=1` — [msReviewsLexiconScript](msReviewsLexiconScript) для кнопок «полезно»

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `limit` | `10` | Записей (1–50) |
| `offset` | `0` | Пропуск. При вызове из `pdoPage` передаётся обёрткой автоматически |
| `totalVar` | `page.total` | Плейсхолдер total для `pdoPage` |
| `tpl` | `tplReviewLatestItem` | Чанк карточки |
| `wrapper` | `tplReviewsLatestList` | Чанк-обёртка |
| `parents` | *(пусто)* | CSV id категорий. Пусто — весь магазин |
| `productIds` | *(пусто)* | CSV id товаров (приоритет над `parents`) |
| `verifiedOnly` | `0` | Только подтверждённые покупки |
| `minRating` | `0` | Минимальная оценка 1–5. `0` — без фильтра |
| `showProduct` | `1` | Ссылка на товар |
| `showRating` | `1` | Звёзды в карточке |
| `showMedia` | `0` | Одно превью фото |
| `dateFormat` | *(настройка)* | Формат даты |
| `hideEmpty` | `0` | Пустой вывод без отзывов |
| `engagement` | `0` | Подключить `reviews.js` для «полезно» |
| `viewAllUrl` | *(пусто)* | URL ссылки «Смотреть все» в футере блока |

## Блок на главной

::: code-group

```fenom
{'!msReviewsLatest' | snippet : [
  'limit' => 8,
  'showProduct' => 1,
  'hideEmpty' => 1
]}
```

```modx
[[!msReviewsLatest? &limit=`8` &showProduct=`1` &hideEmpty=`1`]]
```

:::

## Фильтр по категории и verified

::: code-group

```fenom
{set $catalog_id = ('ms3_page_id_catalog' | option) ?: ('site_start' | option)}
{'!msReviewsLatest' | snippet : [
  'limit' => 6,
  'parents' => $catalog_id,
  'verifiedOnly' => 1,
  'minRating' => 4,
  'hideEmpty' => 1,
  'viewAllUrl' => ($catalog_id | url)
]}
```

```modx
[[!msReviewsLatest?
  &limit=`6`
  &parents=`[[++ms3_page_id_catalog]]`
  &verifiedOnly=`1`
  &minRating=`4`
  &hideEmpty=`1`
  &viewAllUrl=`[[~[[++ms3_page_id_catalog]]]]`
]]
```

:::

## Engagement на лендинге

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msReviewsLatest' | snippet : [
  'limit' => 5,
  'engagement' => 1,
  'showProduct' => 1
]}
```

```modx
[[!msReviewsLexiconScript]]
[[!msReviewsLatest? &limit=`5` &engagement=`1` &showProduct=`1`]]
```

:::

## Пагинация

Обёртка `pdoPage` с `element=msReviewsLatest`. Параметр `pdoPage` у сниппета не нужен. См. [Интеграция — пагинация](../integration#пагинация-pdopage), [msReviews](msReviews#пагинация-через-pdopage).

Чанки: [Чанки — tplReviewLatestItem](../chunks).

## См. также

- [msTopRatedProducts](msTopRatedProducts)
- [msQuestionsLatest](msQuestionsLatest)
- [Интеграция — главная](../integration)
- [FAQ](../faq)
