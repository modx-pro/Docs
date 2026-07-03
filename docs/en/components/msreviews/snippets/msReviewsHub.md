---
title: msReviewsHub
description: Готовый блок отзывов на карточке товара с якорной навигацией msReviews
---
<!-- TODO: translate from docs/components/msreviews/snippets/msReviewsHub.md -->


# Сниппет msReviewsHub

Собирает на карточке товара секции «сводка → список → форма → Q&A → schema» в одном контейнере. Якорная навигация включается параметром `anchorNav`. Внутри вызывает остальные сниппеты.

## Назначение

Один вызов вместо [ручной сборки по частям](../integration). Каждая секция оборачивается в `<section id="msreviews-…">`.

## Где вызывать

- Шаблон **msProduct**, если **весь** блок отзывов собираете только через `msReviewsHub`.
- **Не смешивайте** с отдельными [msReviews](msReviews), [msQuestions](msQuestions) или вторым [msReviewSchema](msReviewSchema) на той же странице.

Форму и JSON-LD включает сам. Внутренний `msReviews` вызывается с `showHeading=0`. [msReviewsLexiconScript](msReviewsLexiconScript) подключается через внутренние сниппеты.

## Зависимости

- **MiniShop3**, **msReviews**
- Внутренние вызовы: `msRatingSummary`, `msReviews`, `msReviewForm`, Q&A, `msReviewSchema`

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `sections` | `summary,reviews,form,qna,schema` | CSV порядка секций |
| `anchorNav` | `1` | Якорная навигация по секциям |
| `showStats` | `1` | Статистика в списке. На PDP часто `0` при секции summary |
| `formPosition` | *(настройка)* | Порядок Q&A внутри секции `qna` |
| `hideEmpty` | `0` | Скрыть пустые секции (кроме `schema`) |
| `applyRequestFilters` | `0` | `1` — inner `msReviews` читает GET `msr_*` (нужно для [msReviewsFilters](msReviewsFilters) рядом с Hub) |
| `tpl` | `tplReviewsHub` | Чанк-обёртка блока |
| `navTpl` | `tplReviewsHubNav` | Чанк якорной навигации |
| `product_name` | *(auto)* | Проксируется в `msReviewSchema` |
| `product_url` | *(auto)* | Проксируется в schema |
| `image_url` | *(пусто)* | Картинка для schema |

Допустимые значения `sections`: `summary`, `reviews`, `form`, `qna`, `schema`.

## Полный блок

::: code-group

```fenom
{'!msReviewsHub' | snippet : [
  'product_id' => $_modx->resource.id,
  'sections' => 'summary,reviews,form,qna,schema',
  'anchorNav' => 1,
  'showStats' => 0
]}
```

```modx
[[!msReviewsHub?
  &product_id=`[[*id]]`
  &sections=`summary,reviews,form,qna,schema`
  &anchorNav=`1`
  &showStats=`0`
]]
```

:::

## Без навигации, только отзывы и форма

::: code-group

```fenom
{'!msReviewsHub' | snippet : [
  'product_id' => $_modx->resource.id,
  'sections' => 'summary,reviews,form',
  'anchorNav' => 0,
  'showStats' => 0
]}
```

```modx
[[!msReviewsHub?
  &product_id=`[[*id]]`
  &sections=`summary,reviews,form`
  &anchorNav=`0`
  &showStats=`0`
]]
```

:::

## Schema meta для Rich Results

::: code-group

```fenom
{'!msReviewsHub' | snippet : [
  'product_id' => $_modx->resource.id,
  'product_name' => $_modx->resource.pagetitle,
  'product_url' => $_modx->makeUrl($_modx->resource.id, '', '', 'full'),
  'image_url' => $productImageUrl,
  'showStats' => 0
]}
```

```modx
[[!msReviewsHub?
  &product_id=`[[*id]]`
  &product_name=`[[*pagetitle]]`
  &product_url=`[[~[[*id]]? &scheme=`full`]]`
  &image_url=`[[+productImageUrl]]`
  &showStats=`0`
]]
```

:::

Чанки для `msReviewsHub`: [Чанки](../chunks). Альтернатива с вкладками: [msReviewsTabbed](msReviewsTabbed).

## См. также

- [msReviewsTabbed](msReviewsTabbed)
- [Интеграция — варианты сборки](../integration)
- [FAQ — дубли блоков](../faq)
