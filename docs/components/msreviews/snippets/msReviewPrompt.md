---
title: msReviewPrompt
description: CTA «Будьте первым» при отсутствии отзывов msReviews
---

# Сниппет msReviewPrompt

Показывает призыв оставить первый отзыв, когда у товара **ноль** опубликованных отзывов. Ссылка-якорь ведёт на форму.

## Назначение

Пустое состояние PDP: CTA вместо пустого блока отзывов. Когда отзывы появляются, сниппет возвращает **пустую строку** (поведение как `hideEmpty`, параметра `hideEmpty` нет).

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

## Поведение hideEmpty

| Состояние товара | Вывод |
| --- | --- |
| 0 опубликованных отзывов | HTML CTA из `tplReviewPrompt` |
| ≥ 1 отзыва | Пустая строка (блок не рендерится) |

Явного параметра `hideEmpty` нет: скрытие при наличии отзывов встроено в логику сниппета.

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

## Порядок на PDP

Prompt ставят **до** списка: пока отзывов нет, CTA виден; после первой публикации prompt исчезает, список заполняется:

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
