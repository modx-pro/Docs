---
title: msReviewsLexiconScript
description: Лексикон window.msrLexicon для JS витрины msReviews
---

<!-- TODO: translate from docs/components/msreviews/snippets/msReviewsLexiconScript.md -->

# Сниппет msReviewsLexiconScript

Выводит `<script>window.msrLexicon = {...}</script>` с переводами для JS витрины: ошибки AJAX, тексты форм, «полезно», правка и удаление отзыва.

## Назначение

Строки лексикона на языке сайта до загрузки `review-form.js`, `question-form.js` и `reviews.js`. Без этого блока JS покажет ключи вместо текста.

## Где вызывать

- **Один раз** в шаблоне карточки товара или layout витрины, **перед** `msReviewForm`, `msQuestionForm` и `msReviews`.
- На главной лексикон нужен, если на странице есть `msReviews` с кнопками «полезно». `msReviewsLatest` эти кнопки не подключает.

## Зависимости

- **MiniShop3** и установленный пакет **msReviews**
- Сниппет только читает лексикон `msreviews:default`

## Параметры

Параметров нет.

## Базовый вызов на странице товара

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
```

```modx
[[!msReviewsLexiconScript]]
```

:::

## Блок отзывов на карточке товара

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviews? &product_id=`[[*id]]`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
```

:::

## Что попадает в window.msrLexicon

Ключи: `msr_err_rating`, `msreviews_form_sent`, `msr_helpful`, `msr_edit_review`, `msreviews_media_lightbox_prev`, `msreviews_media_lightbox_next`, `msreviews_media_lightbox_counter`.

Плагин `msr_register_storefront_assets` с флагом `lexicon` может подключить тот же блок при вызове `msReviews` / форм / [msReviewMediaGallery](msReviewMediaGallery) (lightbox). При своей разметке вызывайте сниппет в шаблоне явно.

## См. также

- [msReviewForm](msReviewForm)
- [msReviews](msReviews)
- [Интеграция — карточка товара](../integration)
- [FAQ — JS не находит переводы](../faq)
