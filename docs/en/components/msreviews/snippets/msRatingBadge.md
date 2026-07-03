---
title: msRatingBadge
description: Микро-бейдж рейтинга для каталога и листингов msReviews
---
<!-- TODO: translate from docs/components/msreviews/snippets/msRatingBadge.md -->


# Сниппет msRatingBadge

Компактный бейдж **★ avg (count)** без разбивки по звёздам. Узкая обёртка над агрегатом каталога, чанк `tplRatingBadge`.

## Назначение

Ещё компактнее, чем [msRatingSummary](msRatingSummary) с `tplRatingCatalog`. Подходит для плотных карточек, мобильного каталога, виджетов сравнения.

## Где вызывать

- Чанк карточки в **msProducts**, quick view, списки «похожие».
- CSS-класс: `.msreviews-rating--badge`.
- Стили: [Каталог — reviews.css](../frontend/catalog#подключение-reviewscss-в-каталоге). Сниппет подключает CSS сам при первом бейдже; параметра `registerCss` нет.

## Зависимости

- **MiniShop3**, **msReviews**

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара. В каталоге — `[[+id]]` / `$id` |
| `tpl` | `tplRatingBadge` | Чанк бейджа |
| `hideEmpty` | `1` | Не выводить при нуле отзывов |

## В чанке msProducts

::: code-group

```fenom
{'!msRatingBadge' | snippet : [
  'product_id' => $id,
  'hideEmpty' => 1
]}
```

```modx
[[!msRatingBadge? &product_id=`[[+id]]` &hideEmpty=`1`]]
```

:::

## Сравнение с msRatingSummary aggregate

| Сниппет | Чанк | Когда |
| --- | --- | --- |
| `msRatingBadge` | `tplRatingBadge` | Минимум места, одна строка |
| `msRatingSummary` + `aggregate` | `tplRatingCatalog` | Чуть больше деталей, те же данные |

::: code-group

```fenom
{'!msRatingSummary' | snippet : [
  'product_id' => $id,
  'tpl' => 'tplRatingCatalog',
  'summaryMode' => 'aggregate',
  'hideEmpty' => 1,
  'registerCss' => 0
]}
```

```modx
[[!msRatingSummary?
  &product_id=`[[+id]]`
  &tpl=`tplRatingCatalog`
  &summaryMode=`aggregate`
  &hideEmpty=`1`
  &registerCss=`0`
]]
```

:::

## Свой чанк бейджа

::: code-group

```fenom
{'!msRatingBadge' | snippet : [
  'product_id' => $id,
  'tpl' => 'myRatingBadge',
  'hideEmpty' => 1
]}
```

```modx
[[!msRatingBadge? &product_id=`[[+id]]` &tpl=`myRatingBadge` &hideEmpty=`1`]]
```

:::

Чанк по умолчанию: [Чанки — tplRatingBadge](../chunks). Каталог: [Каталог товаров](../frontend/catalog).

## См. также

- [msRatingSummary](msRatingSummary)
- [Интеграция — каталог](../integration)
- [FAQ](../faq)
