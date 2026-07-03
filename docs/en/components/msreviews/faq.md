---
title: FAQ
description: Типовые вопросы по msReviews — product_id, модерация, verified, schema, каталог
---

# FAQ

## Откуда берётся product_id?

Передайте id товара MS3. На странице товара это обычно id ресурса.

::: code-group

```fenom
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id]}
```

```modx
[[!msReviews? &product_id=`[[*id]]`]]
```

:::

У **`msQuestions`** и **`msQuestionForm`** только **`product_id`**. Параметр **`product`** не поддерживается.

## Где модерировать отзывы с карточки товара?

На **Ресурсы → редактирование msProduct** вкладка **«Отзывы»** (право **`review_view`**) показывает сводку и кнопку в **Extras → msReviews** с фильтром по товару. Таблица модерации только в CMP.

## Отзыв не появляется сразу

Новые отзывы при модерации получают статус **pending**. Опубликуйте во вкладке **Extras → msReviews → Отзывы**. Средний рейтинг пересчитывается после публикации.

## Ошибка VueTools в админке

Установите [VueTools](/components/vuetools/) **≥ 1.1.2-pl** и обновите страницу **Extras → msReviews**.

## Verified не сработал

Проверьте:

- товар был в составе **этого** заказа;
- ссылка из письма ведёт на страницу **того же** товара;
- при **`msreviews_reject_on_cancel`** статус заказа не в **`msreviews_cancelled_order_status_ids`**.

См. [Verified в settings](settings#verified-purchase).

## Как закрепить отзыв?

**Extras → msReviews → Отзывы** → колонка **Закреп** у опубликованного отзыва. Закреплённые выводятся первыми.

## Формат даты в списке

1. Глобально: **`msreviews_storefront_date_format`**.
2. На вызове: **`dateFormat`** у `msReviews`.

::: code-group

```fenom
{'!msReviews' | snippet : [
  'product_id' => $_modx->resource.id,
  'dateFormat' => 'd.m.Y H:i'
]}
```

```modx
[[!msReviews? &product_id=`[[*id]]` &dateFormat=`d.m.Y H:i`]]
```

:::

## Порядок формы вопроса и списка Q&A

1. Поменяйте местами `msQuestions` и `msQuestionForm` в **`.msreviews-qna-stack`**.
2. Настройка **`msreviews_qna_form_position`** = `before` | `after`.
3. Или **`msQnaBlock`** с **`formPosition`**.

## Рейтинг в каталоге не показывается

Нужны опубликованные отзывы. В чанке карточки:

::: code-group

```fenom
{'!msRatingSummary' | snippet : [
  'product_id' => $id,
  'tpl' => 'tplRatingCatalog',
  'summaryMode' => 'aggregate',
  'hideEmpty' => 1
]}
```

```modx
[[!msRatingSummary?
  &product_id=`[[+id]]`
  &tpl=`tplRatingCatalog`
  &summaryMode=`aggregate`
  &hideEmpty=`1`
]]
```

:::

## Двойной JSON-LD

**`msReviewSchema`** вызывайте **один раз** на карточке. Не комбинируйте `msReviewsHub` с отдельным schema и не дублируйте `msReviewsHub` вместе со сборкой по частям.

## Fenom экранирует schema

Оборачивайте в **`{raw (...)}`**. См. [msReviewSchema](snippets/msReviewSchema).

## Не смешивать готовый блок и отдельные списки

На боевом сайте выберите один способ: сборка по частям, **`msReviewsHub`** или **`msReviewsTabbed`** + форма + schema. См. [Интеграция](integration).

## Фильтры отзывов не меняют список

1. Плагин **msReviews Storefront cache** включён (Extras → Плагины).
2. На странице товара стоит отдельный **`msReviews`** с `showHeading=1`, а не только Hub без `applyRequestFilters=1`.
3. **`msReviewsFilters`** вызван перед списком на той же странице.

См. [Интеграция — фильтры](integration#фильтры-списка-отзывов), [events — Resource cache](events#resource-cache-и-фильтры).

## Импорт и API

- Импорт CSV: **Операции** в CMP (**`review_import`**).
- HTTP API: [AJAX API](api).

## После обновления пакета

Очистите кэш MODX. Если админка устарела — переустановите transport через **Extras → Installer** (ModStore).
