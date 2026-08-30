---
title: msReviewMediaGallery
description: UGC-галерея фото из отзывов на карточке товара msReviews
---

<!-- TODO: translate from docs/components/msreviews/snippets/msReviewMediaGallery.md -->

# Сниппет msReviewMediaGallery

Выводит горизонтальную галерею опубликованных фото из отзывов по товару. Разметка собирается из чанков, не из PHP.

## Назначение

UGC-блок на странице товара: миниатюры фото покупателей. По умолчанию клик открывает **lightbox** (`mediaLinkMode=lightbox`). Режим `anchor` ведёт к секции отзывов. Режим `raw` отдаёт плейсхолдеры без служебных атрибутов (свой Fancybox и т.п.).

## Где вызывать

- Шаблон **msProduct**, между [msRatingSummary](msRatingSummary) и [msReviews](msReviews).
- Передайте `hideEmpty=1`, чтобы скрыть блок без фото.

<!-- ![UGC-галерея фото отзывов на карточке товара](/components/msreviews/screenshots/media-gallery.png) -->

## Зависимости

- **MiniShop3**, **msReviews**, **pdoTools 3.0+**
- Настройка `msreviews_media_enabled`
- Lightbox: сниппет подключает `reviews.js` при наличии фото (если `registerJs=1`). Строки UI идут через [msReviewsLexiconScript](msReviewsLexiconScript)

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `limit` | `24` | Максимум фото (1–100) |
| `tpl` | `tplReviewMediaGallery` | Чанк-обёртка (плейсхолдер `gallery_body`) |
| `bodyTpl` | `tplReviewMediaGalleryBody` | Список фото или empty-state |
| `itemTpl` | `tplReviewMediaGalleryItem` | Чанк одного фото |
| `mediaLinkMode` | `lightbox` | `lightbox` / `anchor` / `raw` |
| `galleryGroup` | *(пусто)* | Значение для `data-fancybox` и аналогов |
| `thumbSize` | `160` | `width` и `height` превью |
| `hideEmpty` | `1` | Не выводить без фото |
| `showHeading` | `1` | Заголовок `<h3>` «Фото из отзывов» |
| `reviewAnchor` | *(пусто)* | Якорь секции отзывов (для `anchor` или вместе с режимом) |
| `registerCss` | `1` | Подключать `reviews.css` |
| `registerJs` | `1` | Подключать JS витрины |

Плейсхолдеры item: `url`, `href`, `link_class`, `img_class`, `link_attrs`, `img_width`, `img_height`, `author_name`, `review_id`, `media_id`, `rating`, `gallery_group`, `review_anchor`, `label_open`, `link_html`. Body: `items`, `gallery_group`, `list_empty`.

## Lightbox (по умолчанию)

`mediaLinkMode=lightbox` (и пустой `reviewAnchor` в типовом сценарии): миниатюры получают атрибуты lightbox. `reviews.js` открывает диалог с навигацией.

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

::: code-group

```fenom
{'!msReviewMediaGallery' | snippet : [
  'product_id' => $_modx->resource.id,
  'limit' => 24,
  'mediaLinkMode' => 'anchor',
  'reviewAnchor' => '#msreviews-reviews',
  'hideEmpty' => 1
]}
```

```modx
[[!msReviewMediaGallery?
  &product_id=`[[*id]]`
  &limit=`24`
  &mediaLinkMode=`anchor`
  &reviewAnchor=`#msreviews-reviews`
  &hideEmpty=`1`
]]
```

:::

## Свой lightbox (Fancybox 5)

Чанк `tplGalleryItemFancybox` (Fenom):

```fenom
<li class="product-gallery__item">
  <a href="{$href}" data-fancybox="{$gallery_group}" data-caption="{$author_name}">
    <img src="{$url}" alt="{$author_name}" loading="lazy" width="{$img_width}" height="{$img_height}" />
  </a>
</li>
```

::: code-group

```fenom
{'!msReviewMediaGallery' | snippet : [
  'product_id' => $_modx->resource.id,
  'limit' => 24,
  'itemTpl' => 'tplGalleryItemFancybox',
  'mediaLinkMode' => 'raw',
  'galleryGroup' => 'review-media',
  'registerJs' => 0
]}
```

```modx
[[!msReviewMediaGallery?
  &product_id=`[[*id]]`
  &limit=`24`
  &itemTpl=`tplGalleryItemFancybox`
  &mediaLinkMode=`raw`
  &galleryGroup=`review-media`
  &registerJs=`0`
]]
```

:::

Инициализация: `Fancybox.bind('[data-fancybox="review-media"]')`.

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

Чанки: [Чанки — галерея](../chunks). Миграция: [Обновление до 1.2](../upgrade-1.2).

## См. также

- [msReviews](msReviews)
- [msReviewForm](msReviewForm) — загрузка фото
- [msReviewsLexiconScript](msReviewsLexiconScript)
- [Интеграция](../integration)
- [FAQ](../faq)
