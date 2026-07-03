---
title: Страница товара
description: Блок отзывов на карточке — сборка по частям, msReviewsHub, вкладки
---

# Страница товара

На странице товара **`product_id`** — id ресурса товара (часто `[[*id]]` / `$_modx->resource.id`).

<!-- ![Блок отзывов на странице товара](/components/msreviews/screenshots/storefront-pdp.png) -->

## Способ A — сборка по частям

Порядок вызовов:

1. `msReviewsLexiconScript`
2. `msRatingSummary`
3. по желанию: `msReviewPrompt`, `msReviewMediaGallery`, `msReviewsFilters`
4. `msReviews`
5. `msReviewForm`
6. Q&A: `msQuestionForm` + `msQuestions` или `msQnaBlock`
7. `msReviewSchema` — **один раз**

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewPrompt' | snippet : ['product_id' => $_modx->resource.id, 'formAnchor' => '#msreviews-form']}
{'!msReviewMediaGallery' | snippet : ['product_id' => $_modx->resource.id, 'limit' => 12, 'hideEmpty' => 1]}
{'!msReviewsFilters' | snippet : ['product_id' => $_modx->resource.id, 'showCounts' => 1]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id, 'showStats' => 0]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
<div class="msreviews-qna-stack">
  {'!msQuestionForm' | snippet : ['product_id' => $_modx->resource.id, 'showHeading' => 0]}
  {'!msQuestions' | snippet : ['product_id' => $_modx->resource.id]}
</div>
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviewPrompt? &product_id=`[[*id]]` &formAnchor=`#msreviews-form`]]
[[!msReviewMediaGallery? &product_id=`[[*id]]` &limit=`12` &hideEmpty=`1`]]
[[!msReviewsFilters? &product_id=`[[*id]]` &showCounts=`1`]]
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
<div class="msreviews-qna-stack">
[[!msQuestionForm? &product_id=`[[*id]]` &showHeading=`0`]]
[[!msQuestions? &product_id=`[[*id]]`]]
</div>
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

### Минимальный набор

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviews? &product_id=`[[*id]]`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## Способ B — msReviewsHub

Весь блок summary → reviews → form → qna → schema одним вызовом. См. [msReviewsHub](snippets/msReviewsHub).

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msReviewsHub' | snippet : [
  'product_id' => $_modx->resource.id,
  'sections' => 'summary,reviews,form,qna,schema',
  'anchorNav' => 1,
  'showStats' => 0
]}
```

```modx
[[!msReviewsLexiconScript]]
[[!msReviewsHub?
  &product_id=`[[*id]]`
  &sections=`summary,reviews,form,qna,schema`
  &anchorNav=`1`
  &showStats=`0`
]]
```

:::

## Способ C — вкладки (msReviewsTabbed)

Вкладки «Отзывы / Вопросы». Форму отзыва и **`msReviewSchema`** выводите **отдельно**. См. [msReviewsTabbed](snippets/msReviewsTabbed).

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewsTabbed' | snippet : ['product_id' => $_modx->resource.id, 'activeTab' => 'reviews']}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviewsTabbed? &product_id=`[[*id]]` &activeTab=`reviews`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## Разметка форм

Не оборачивайте `msReviewForm` / `msQuestionForm` в карточку темы (Bootstrap `.card` с padding): у форм своя обёртка `.msreviews-form-wrap`. Поставьте внешний `<h2>` секции и `showHeading=0`.

## Скрипты

`msReviews`, `msReviewForm`, `msQuestionForm` подключают JS как `<script type="module">` при **`msreviews_frontend_js_enabled=1`**. Достаточно вызова сниппетов.

## Пагинация списков

Для длинных списков отзывов и Q&A оберните `msReviews` / `msQuestions` в **`!pdoPage`**. Сводку `msRatingSummary` выводите над пагинацией. Примеры: [Интеграция — пагинация](../integration#пагинация-pdopage).

## См. также

- [Интеграция](integration)
- [msReviewForm](snippets/msReviewForm)
- [msReviewSchema](snippets/msReviewSchema)
