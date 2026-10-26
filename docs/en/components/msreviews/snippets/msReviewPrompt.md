---
title: msReviewPrompt
description: CTA «Будьте первым» при отсутствии отзывов msReviews
---

<!-- TODO: translate from docs/components/msreviews/snippets/msReviewPrompt.md -->

# Сниппет msReviewPrompt

Показывает призыв оставить первый отзыв, когда у товара **ноль** опубликованных отзывов. Ссылка-якорь ведёт на форму.

## Назначение

CTA, пока у товара нет опубликованных отзывов. После первого — пустая строка (как `hideEmpty`, параметра нет).

## Где вызывать

- Шаблон **msProduct**, между [msRatingSummary](msRatingSummary) и [msReviews](msReviews).
- Якорь `formAnchor` должен совпадать с `id` формы или секции [msReviewForm](msReviewForm) (по умолчанию `#msreviews-form`).

## Зависимости

- **MiniShop3**, **msReviews**
- Согласованный якорь с формой отзыва

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `formAnchor` | `#msreviews-form` | CSS-якорь формы отзыва для CTA |
| `tpl` | `tplReviewPrompt` | Чанк CTA |
| `registerCss` | `1` | Подключать `reviews.css` этим вызовом |
| `registerJs` | `1` | Не влияет на JS: регистрируется только CSS |

## Поведение hideEmpty

| Состояние товара | Вывод |
| --- | --- |
| 0 опубликованных отзывов | HTML CTA из `tplReviewPrompt` |
| ≥ 1 отзыва | Пустая строка (блок не выводится) |

## Базовый вызов

::: code-group

```fenom
{'!msReviewPrompt' | snippet : [
  'product_id' => $_modx->resource.id,
  'formAnchor' => '#msreviews-form'
]}
```

```modx
[[!msReviewPrompt? &product_id=`[[*id]]` &formAnchor=`#msreviews-form`]]
```

:::

## Свой якорь формы

::: code-group

```fenom
<h2 id="write-review">Написать отзыв</h2>
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id, 'showHeading' => 0]}
{'!msReviewPrompt' | snippet : [
  'product_id' => $_modx->resource.id,
  'formAnchor' => '#write-review'
]}
```

```modx
<h2 id="write-review">Написать отзыв</h2>
[[!msReviewForm? &product_id=`[[*id]]` &showHeading=`0`]]
[[!msReviewPrompt? &product_id=`[[*id]]` &formAnchor=`#write-review`]]
```

:::

## Порядок на странице товара

**До** списка: без отзывов виден CTA, после первой публикации prompt исчезает:

::: code-group

```fenom
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviewPrompt' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id, 'showStats' => 0]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
```

```modx
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviewPrompt? &product_id=`[[*id]]`]]
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
```

:::

Чанк: [Чанки — tplReviewPrompt](../chunks).

## См. также

- [msReviewForm](msReviewForm)
- [msRatingSummary](msRatingSummary)
- [Интеграция](../integration)
