---
title: FAQ
description: Типовые вопросы по msReviews — product_id, модерация, verified, schema, каталог
---

<!-- TODO: translate from docs/components/msreviews/faq.md -->

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

## Как добавить отзыв вручную из админки?

**Extras → msReviews → Отзывы** → **«Добавить отзыв»**. Нужно право **`review_moderate`** (с **1.1.0**).

В форме: товар, рейтинг, заголовок, текст, автор, статус, **Verified purchase**. Для существующего отзыва — **«Редактировать отзыв»** в строке таблицы. Подробнее: [Админка](manager#добавление-и-правка-вручную).

## Отзыв не появляется сразу

Новые отзывы при модерации получают статус **pending**. Опубликуйте во вкладке **Extras → msReviews → Отзывы**. Средний рейтинг пересчитывается после публикации.

## Ошибка VueTools в админке

Установите [VueTools](/components/vuetools/) **≥ 1.1.2-pl** и обновите страницу **Extras → msReviews**.

## Verified не сработал

На **витрине** (токен из письма) проверьте:

- товар был в составе **этого** заказа;
- ссылка из письма ведёт на страницу **того же** товара;
- при **`msreviews_reject_on_cancel`** статус заказа не в **`msreviews_cancelled_order_status_ids`**.

В **CMP** verified ставят галочкой **Verified purchase** в форме отзыва. Это не привязывает отзыв к заказу MS3.

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

С **1.1.0** во вкладке **Отзывы** появились **«Добавить отзыв»** и **«Редактировать отзыв»** (право **`review_moderate`**).

С **1.2**: нужен **pdoTools 3.0+**, чанки на Fenom, JS по `data-msr-*`. См. [Обновление до 1.2](upgrade-1.2).

## Пустые блоки на витрине после 1.2

1. Установлен **pdoTools 3.0+**?
2. **Отчёты → Журнал ошибок** — сообщения `[msReviews]` про Fenom / pdoTools.
3. Свои чанки переписаны на Fenom и содержат `data-msr-*`?
4. Кэш очищен.

## Письма модератору не приходят

Проверьте `msreviews_moderator_notify_enabled`, список `msreviews_moderator_notify_emails` и режим `msreviews_moderator_notify_on`. Письма только с витрины, не из CMP/CSV. Плагин на `msrOnModeratorNotify` не должен возвращать `false`. См. [Настройки](settings#уведомление-модератора).
