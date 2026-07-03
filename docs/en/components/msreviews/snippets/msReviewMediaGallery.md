---
title: msReviewMediaGallery
description: UGC-галерея фото из отзывов на карточке товара msReviews
---
<!-- TODO: translate from docs/components/msreviews/snippets/msReviewMediaGallery.md -->


# Сниппет msReviewMediaGallery

Выводит горизонтальную галерею опубликованных фото из отзывов по товару.

## Назначение

UGC-блок на странице товара: миниатюры фото покупателей. По умолчанию клик открывает **lightbox** (стрелки, счётчик, закрытие). С `reviewAnchor` ссылка ведёт к якорю отзыва на странице.

## Где вызывать

- Шаблон **msProduct**, между [msRatingSummary](msRatingSummary) и [msReviews](msReviews).
- Передайте `hideEmpty=1`, чтобы скрыть блок без фото.

<!-- ![UGC-галерея фото отзывов на карточке товара](/components/msreviews/screenshots/media-gallery.png) -->

## Зависимости

- **MiniShop3**, **msReviews**
- Настройка `msreviews_media_enabled`
- Lightbox: сниппет подключает `reviews.js` при наличии фото; строки UI — через [msReviewsLexiconScript](msReviewsLexiconScript) (`msreviews_media_lightbox_*`)

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `limit` | `24` | Максимум фото (1–100) |
| `tpl` | `tplReviewMediaGallery` | Чанк-обёртка (плейсхолдер `gallery_body`) |
| `itemTpl` | `tplReviewMediaGalleryItem` | Чанк элемента. По умолчанию HTML собирается в PHP |
| `hideEmpty` | `1` | Не выводить без фото |
| `showHeading` | `1` | Заголовок `<h3>` «Фото из отзывов» |
| `reviewAnchor` | *(пусто)* | Якорь отзыва, напр. `#msreviews-reviews`. Пусто — lightbox вместо перехода |

## Lightbox (по умолчанию)

Без `reviewAnchor` миниатюры получают `data-msr-media-lightbox="1"`. `reviews.js` открывает диалог с навигацией по всем фото блока.

Перед галереей вызовите **`msReviewsLexiconScript`**, иначе подписи кнопок lightbox возьмутся из fallback в JS.

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msReviewMediaGallery' | snippet : [
  'product_id' => $_modx->resource.id,
  'limit' => 12,
  'hideEmpty' => 1
]}
```

```modx
[[!msReviewsLexiconScript]]
[[!msReviewMediaGallery?
  &product_id=`[[*id]]`
  &limit=`12`
  &hideEmpty=`1`
]]
```

:::

## Переход к секции отзывов

С `reviewAnchor` lightbox отключается: ссылка ведёт на якорь (в Hub/Tabbed секция отзывов — `#msreviews-reviews`).

::: code-group

```fenom
{'!msReviewMediaGallery' | snippet : [
  'product_id' => $_modx->resource.id,
  'limit' => 24,
  'reviewAnchor' => '#msreviews-reviews',
  'hideEmpty' => 1
]}
```

```modx
[[!msReviewMediaGallery?
  &product_id=`[[*id]]`
  &limit=`24`
  &reviewAnchor=`#msreviews-reviews`
  &hideEmpty=`1`
]]
```

:::

## Кастомный itemTpl

При `itemTpl` ≠ `tplReviewMediaGalleryItem` сниппет передаёт в чанк готовый **`[[+link_html]]`** (ссылка + img). Разметку ссылки в PHP собирает `msr_storefront_media_link_html`.

## На странице товара

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewMediaGallery' | snippet : ['product_id' => $_modx->resource.id, 'limit' => 12, 'hideEmpty' => 1]}
{'!msReviewsFilters' | snippet : ['product_id' => $_modx->resource.id, 'showCounts' => 1]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id, 'showStats' => 0]}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviewMediaGallery? &product_id=`[[*id]]` &limit=`12` &hideEmpty=`1`]]
[[!msReviewsFilters? &product_id=`[[*id]]` &showCounts=`1`]]
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
```

:::

Чанки: [Чанки — галерея](../chunks).

## См. также

- [msReviews](msReviews)
- [msReviewForm](msReviewForm) — загрузка фото
- [msReviewsLexiconScript](msReviewsLexiconScript)
- [Интеграция](../integration)
- [FAQ](../faq)
