---
title: msTopRatedProducts
description: Топ товаров по рейтингу для главной msReviews
---

# Сниппет msTopRatedProducts

Выводит список товаров, отсортированных по агрегированному рейтингу магазина (алгоритм Wilson или среднее — настройка `msreviews_*_algorithm`).

## Назначение

Блок «Лучшие товары» / «Топ по отзывам» на главной. В чанке `tplTopRatedProduct`: `product_id`, `product_title`, `product_url`, `rating_html`. Цену и фото добавьте в чанке через Fenom или MS3.

## Где вызывать

- Шаблон **главной**, лендинг каталога.
- Часто в паре с [msReviewsLatest](msReviewsLatest).

## Зависимости

- **MiniShop3**, **msReviews**
- `minReviewCount` отсеивает товары с малым числом отзывов

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `limit` | `8` | Товаров в блоке (1–24) |
| `minReviewCount` | `3` | Минимум отзывов для попадания в топ |
| `parents` | *(пусто)* | CSV id категорий |
| `parent` | *(пусто)* | Alias для одной папки (альтернатива `parents`) |
| `productIds` | *(пусто)* | CSV id конкретных товаров |
| `tpl` | `tplTopRatedProduct` | Чанк строки товара |
| `wrapper` | `tplTopRatedProductsList` | Чанк-обёртка |
| `hideEmpty` | `1` | Не выводить блок без товаров |
| `heading` | *(лексикон)* | Свой заголовок блока |

## Базовый блок

::: code-group

```fenom
{'!msTopRatedProducts' | snippet : ['limit' => 8, 'minReviewCount' => 5]}
```

```modx
[[!msTopRatedProducts? &limit=`8` &minReviewCount=`5`]]
```

:::

## Scope каталога

::: code-group

```fenom
{set $catalog_id = ('ms3_page_id_catalog' | option) ?: ('site_start' | option)}
{'!msTopRatedProducts' | snippet : [
  'limit' => 8,
  'minReviewCount' => 3,
  'parents' => $catalog_id,
  'hideEmpty' => 1
]}
```

```modx
[[!msTopRatedProducts?
  &limit=`8`
  &minReviewCount=`3`
  &parents=`[[++ms3_page_id_catalog]]`
  &hideEmpty=`1`
]]
```

:::

## Строгий отбор по отзывам

::: code-group

```fenom
{'!msTopRatedProducts' | snippet : [
  'limit' => 6,
  'minReviewCount' => 10,
  'heading' => 'Хиты с отзывами'
]}
```

```modx
[[!msTopRatedProducts?
  &limit=`6`
  &minReviewCount=`10`
  &heading=`Хиты с отзывами`
]]
```

:::

## Главная: три виджета

::: code-group

```fenom
{set $catalog_id = ('ms3_page_id_catalog' | option) ?: ('site_start' | option)}
{'!msTopRatedProducts' | snippet : ['limit' => 8, 'minReviewCount' => 3, 'parents' => $catalog_id, 'hideEmpty' => 1]}
{'!msReviewsLatest' | snippet : ['limit' => 6, 'showProduct' => 1, 'hideEmpty' => 1, 'viewAllUrl' => ($catalog_id | url)]}
{'!msQuestionsLatest' | snippet : ['limit' => 5, 'parents' => $catalog_id, 'faqOnly' => 1, 'showProduct' => 1, 'hideEmpty' => 1]}
```

```modx
[[!msTopRatedProducts? &limit=`8` &minReviewCount=`3` &parents=`[[++ms3_page_id_catalog]]` &hideEmpty=`1`]]
[[!msReviewsLatest? &limit=`6` &showProduct=`1` &hideEmpty=`1` &viewAllUrl=`[[~[[++ms3_page_id_catalog]]]]`]]
[[!msQuestionsLatest? &limit=`5` &parents=`[[++ms3_page_id_catalog]]` &faqOnly=`1` &showProduct=`1` &hideEmpty=`1`]]
```

:::

Чанки: [Чанки — tplTopRatedProduct](../chunks).

## См. также

- [msReviewsLatest](msReviewsLatest)
- [msRatingSummary](msRatingSummary) — рейтинг в карточке каталога
- [Интеграция](../integration)
