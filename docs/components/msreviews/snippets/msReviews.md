---
title: msReviews
description: Список опубликованных отзывов на карточке товара MiniShop3
---

# Сниппет msReviews

Выводит список опубликованных отзывов товара со статистикой в шапке (`showStats`), фильтрами из `$_GET` и поддержкой pdoPage. Подключает `reviews.css`, `review-form.js` и `reviews.js`.

## Назначение

Основной блок отзывов на странице товара: карточки отзывов, счётчики, кнопки «полезно», правка и удаление своего отзыва.

## Где вызывать

- Шаблон **msProduct**, под [msRatingSummary](msRatingSummary).
- Внутри **pdoPage** как `element` (пагинация).
- Не дублируйте вызов, если на странице уже есть [msReviewsHub](msReviewsHub) или вкладка [msReviewsTabbed](msReviewsTabbed).

## Зависимости

- **MiniShop3**, **msReviews**
- **[msReviewsLexiconScript](msReviewsLexiconScript)** — перед формой или автоматически через assets
- **pdoTools** — для пагинации через обёртку `pdoPage`
- Фильтры из URL синхронизируйте с [msReviewsFilters](msReviewsFilters)

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3. Обязателен |
| `limit` | `20` | Записей на страницу (1–100) |
| `offset` | `0` | Пропуск записей. При вызове из `pdoPage` передаётся обёрткой автоматически |
| `totalVar` | `page.total` | Плейсхолдер total для `pdoPage`. Режим «только карточки» включается при вызове из pdoPage |
| `tpl` | `tplReviewItem` | Чанк строки отзыва |
| `wrapper` | `tplReviewsList` | Чанк-обёртка списка |
| `showStats` | `1` | Строка статистики в шапке. На странице товара с `msRatingSummary` — `0` |
| `showHeading` | `1` | Заголовок `<h3>` и якорь `#msreviews-list-section` на `<section>` списка. В [msReviewsHub](msReviewsHub) / [msReviewsTabbed](msReviewsTabbed) внутренний вызов идёт с `0` |
| `sortBy` | `published` | `published` или `helpful` (из параметра или `msr_sort` в GET) |
| `verifiedOnly` | `0` | Только подтверждённые покупки |
| `withMedia` | `0` | Только с фото |
| `withReply` | `0` | Только с ответом магазина |
| `recommendOnly` | `0` | Только с рекомендацией |
| `useGravatar` | `0` | Аватар Gravatar в `tplReviewItem` |
| `gravatarSize` | `48` | Размер Gravatar (1–512) |
| `dateFormat` | *(из настройки)* | PHP `date()`. Пусто — `msreviews_storefront_date_format` |
| `connectorUrl` | auto | URL connector для engagement |

Фильтры читаются из `$_GET`: `msr_verified`, `msr_media`, `msr_reply`, `msr_recommend`, `msr_sort`. См. [msReviewsFilters](msReviewsFilters). При включённом `cache_resource` нужен плагин **msReviews Storefront cache** (см. [Интеграция — фильтры](../integration#фильтры-списка-отзывов)).

## Заголовок и якорь списка

При `showHeading=1` (по умолчанию при отдельном выводе на странице товара) у секции списка появляется `id="msreviews-list-section"`. Chip-фильтры [msReviewsFilters](msReviewsFilters) ведут на этот якорь.

Внешний `<h2>` темы + `showHeading=0`:

::: code-group

```fenom
<h2 id="reviews">Отзывы покупателей</h2>
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'showStats' => 0,
  'showHeading' => 0
]}
```

```modx
<h2 id="reviews">Отзывы покупателей</h2>
[[!msReviews? &product_id=`[[*id]]` &showStats=`0` &showHeading=`0`]]
```

:::

## Базовый вызов на странице товара

::: code-group

```fenom
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'showStats' => 0
]}
```

```modx
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
```

:::

## Фильтры и сортировка

Передайте параметры явно или через chip-фильтры [msReviewsFilters](msReviewsFilters):

::: code-group

```fenom
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'verifiedOnly' => 1,
  'sortBy' => 'helpful',
  'showStats' => 0
]}
```

```modx
[[!msReviews?
  &product_id=`[[*id]]`
  &verifiedOnly=`1`
  &sortBy=`helpful`
  &showStats=`0`
]]
```

:::

## Пагинация через pdoPage

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'msReviews',
  'product_id' => $_modx->resource.id,
  'limit' => 5,
  'showStats' => 0,
  'pageVarKey' => 'reviews_page',
  'pageNavVar' => 'reviews.page.nav',
  'totalVar' => 'reviews.page.total'
]}
<div class="msreviews-pdopage-nav">{'reviews.page.nav' | placeholder}</div>
```

```modx
[[!pdoPage?
  &element=`msReviews`
  &product_id=`[[*id]]`
  &limit=`5`
  &showStats=`0`
  &pageVarKey=`reviews_page`
  &pageNavVar=`reviews.page.nav`
  &totalVar=`reviews.page.total`
]]
<div class="msreviews-pdopage-nav">[[!+reviews.page.nav]]</div>
```

:::

Прямой вызов без `pdoPage` — полный список с шапкой:

::: code-group

```fenom
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id, 'limit' => 20]}
```

```modx
[[!msReviews? &product_id=`[[*id]]` &limit=`20`]]
```

:::

## Gravatar и дата

::: code-group

```fenom
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'useGravatar' => 1,
  'gravatarSize' => 48,
  'dateFormat' => 'd.m.Y'
]}
```

```modx
[[!msReviews?
  &product_id=`[[*id]]`
  &useGravatar=`1`
  &gravatarSize=`48`
  &dateFormat=`d.m.Y`
]]
```

:::

Плейсхолдеры в чанке: `published_at_display`, `published_at_iso`, `helpful_count`, `helpful_count_label`. Чанки: [Чанки](../chunks).

## См. также

- [msReviewsFilters](msReviewsFilters)
- [msRatingSummary](msRatingSummary)
- [Интеграция — пагинация](../integration)
- [FAQ](../faq)
