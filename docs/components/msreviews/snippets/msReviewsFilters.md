---
title: msReviewsFilters
description: Chip-фильтры списка отзывов с GET-параметрами msr_* msReviews
---

# Сниппет msReviewsFilters

Выводит chip-ссылки для фильтрации [msReviews](msReviews): verified, с медиа, с ответом, рекомендуют, сортировка «сначала полезные». Активность берётся из `$_GET` (`msr_*`) или из параметра `activeFilters`.

## Назначение

UX-фильтры перед списком отзывов на странице товара. Те же фильтры `msReviews` читает из URL без дублирования параметров в вызове списка.

## Где вызывать

- Шаблон **msProduct**, **перед** [msReviews](msReviews) с `showHeading=1` (якорь `#msreviews-list-section`).
- Оборачивайте в `<div class="msreviews-list__filters">` или используйте класс `.msreviews-filters` из чанка.

<!-- ![Chip-фильтры отзывов на витрине](/components/msreviews/screenshots/storefront-filters.png) -->

## Зависимости

- **MiniShop3**, **msReviews**
- Парный вызов [msReviews](msReviews) на той же странице
- `reviews.css` — стили chip (`is-active`, `aria-current="true"`)

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `showCounts` | `0` | Счётчики в chip из summary (verified, медиа…) |
| `showSort` | `1` | Chip «Сначала полезные» |
| `activeFilters` | *(из GET)* | CSV активных фильтров, напр. `msr_verified,msr_media` |
| `baseQuery` | *(auto)* | Базовая query-строка для ссылок, напр. `?msr_product_id=5` |
| `tpl` | `tplReviewsFilters` | Чанк-обёртка |

## GET-параметры msr_*

| GET | Эффект в msReviews |
| --- | --- |
| `msr_verified=1` | `verifiedOnly` |
| `msr_media=1` | `withMedia` |
| `msr_reply=1` | `withReply` |
| `msr_recommend=1` | `recommendOnly` |
| `msr_sort=helpful` | `sortBy=helpful` |
| `msr_product_id` | контекст товара в query (при `<base href>`) |

## Фильтры со счётчиками

::: code-group

```fenom
{'!msReviewsFilters' | snippet : [
  'product_id' => $_modx->resource.id,
  'showCounts' => 1
]}
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'showStats' => 0
]}
```

```modx
[[!msReviewsFilters? &product_id=`[[*id]]` &showCounts=`1`]]
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
```

:::

## baseQuery при base href в layout

::: code-group

```fenom
{'!msReviewsFilters' | snippet : [
  'product_id' => $_modx->resource.id,
  'showCounts' => 1,
  'baseQuery' => ('?msr_product_id=' ~ $_modx->resource.id)
]}
```

```modx
[[!msReviewsFilters?
  &product_id=`[[*id]]`
  &showCounts=`1`
  &baseQuery=`?msr_product_id=[[*id]]`
]]
```

:::

## Без chip сортировки

::: code-group

```fenom
{'!msReviewsFilters' | snippet : [
  'product_id' => $_modx->resource.id,
  'showCounts' => 1,
  'showSort' => 0
]}
```

```modx
[[!msReviewsFilters?
  &product_id=`[[*id]]`
  &showCounts=`1`
  &showSort=`0`
]]
```

:::

## Явные activeFilters (без GET)

::: code-group

```fenom
{'!msReviewsFilters' | snippet : [
  'product_id' => $_modx->resource.id,
  'activeFilters' => 'msr_verified',
  'showCounts' => 1
]}
```

```modx
[[!msReviewsFilters?
  &product_id=`[[*id]]`
  &activeFilters=`msr_verified`
  &showCounts=`1`
]]
```

:::

Чанк: [Чанки — tplReviewsFilters](../chunks).

## См. также

- [msReviews](msReviews)
- [msRatingSummary](msRatingSummary)
- [Интеграция — фильтры](../integration)
- [FAQ](../faq)
