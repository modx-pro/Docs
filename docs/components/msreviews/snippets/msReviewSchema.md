---
title: msReviewSchema
description: JSON-LD Product и Review для SEO на карточке товара msReviews
---

# Сниппет msReviewSchema

Выводит `<script type="application/ld+json">` с разметкой Product и Review для Rich Results Google.

## Назначение

SEO-разметка на URL товара: агрегированный рейтинг и выборка отзывов. HTML-рейтинг для пользователя — [msRatingSummary](msRatingSummary); JSON-LD — только этот сниппет.

## Где вызывать

- **Один раз** на странице карточки товара (`msProduct`).
- **Не вызывайте** в каталоге, главной или чанке `msProducts`.
- **Не дублируйте** с [msReviewsHub](msReviewsHub) (секция schema уже внутри сниппета).

Настройки: `msreviews_schema_*` в [Системные настройки](../settings).

## Зависимости

- **MiniShop3**, **msReviews**
- Опубликованные отзывы и агрегат в БД

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `product_name` | `pagetitle` ресурса | Название для schema |
| `product_url` | canonical URL ресурса | URL товара |
| `image_url` | *(пусто)* | Картинка товара для schema |

`msReviewsHub` и `msReviewsTabbed` проксируют `product_name`, `product_url`, `image_url` в schema.

## Вызов MODX

::: code-group

```fenom
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## Fenom и auto_escape

При включённом `auto_escape` в pdoTools оборачивайте вызов в **`{raw (...)}`**, иначе тег `<script>` экранируется и разметка не попадёт в HTML:

::: code-group

```fenom
{* Без {raw} script станет &lt;script&gt; — JSON-LD не сработает *}
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## С явными meta товара

::: code-group

```fenom
{raw ('!msReviewSchema' | snippet : [
  'product_id' => $_modx->resource.id,
  'product_name' => $_modx->resource.pagetitle,
  'product_url' => $_modx->makeUrl($_modx->resource.id, '', '', 'full'),
  'image_url' => $productImageUrl
])}
```

```modx
[[!msReviewSchema?
  &product_id=`[[*id]]`
  &product_name=`[[*pagetitle]]`
  &product_url=`[[~[[*id]]? &scheme=`full`]]`
  &image_url=`[[+productImageUrl]]`
]]
```

:::

## Полная страница товара (фрагмент)

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id, 'showStats' => 0]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
{raw ('!msReviewSchema' | snippet : ['product_id' => $_modx->resource.id])}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
[[!msReviewForm? &product_id=`[[*id]]`]]
[[!msReviewSchema? &product_id=`[[*id]]`]]
```

:::

## См. также

- [msRatingSummary](msRatingSummary)
- [msReviewsHub](msReviewsHub)
- [Интеграция — SEO](../integration)
- [FAQ — дубли JSON-LD](../faq)
