---
title: msQuestions
description: Список опубликованных вопросов и ответов на карточке товара
---

# Сниппет msQuestions

Выводит список опубликованных вопросов по товару с ответами магазина (Q&A).

## Назначение

Блок «Вопросы и ответы» на странице товара. Поддерживает pdoPage и фильтр `faqOnly` (только вопросы с ответом).

## Где вызывать

- Шаблон **msProduct**, после [msQuestionForm](msQuestionForm) или перед ним (см. [msQnaBlock](msQnaBlock)).
- Параметр **`product_id`** обязателен. Имя **`product`** не поддерживается.
- Не дублируйте с [msReviewsTabbed](msReviewsTabbed) / [msReviewsHub](msReviewsHub).

Обёртка с отступом:

```html
<div class="msreviews-qna-stack">
  ...
</div>
```

## Зависимости

- **MiniShop3**, **msReviews**
- **pdoTools** — для пагинации через обёртку `pdoPage`

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3. Обязателен |
| `limit` | `20` | Записей (1–100) |
| `offset` | `0` | Пропуск. При вызове из `pdoPage` передаётся обёрткой автоматически |
| `totalVar` | `page.total` | Плейсхолдер total для `pdoPage`. Режим списка без шапки включается при вызове из pdoPage |
| `faqOnly` | `0` | Только вопросы с опубликованным ответом |
| `tpl` | `tplQuestionItem` | Чанк строки вопроса |
| `wrapper` | `tplQuestionsList` | Чанк-обёртка. Пусто — секция без заголовка из чанка |
| `connectorUrl` | auto | URL connector |

## Базовый вызов

::: code-group

```fenom
{'!msQuestions' | snippet : ['product_id' => $_modx->resource.id, 'limit' => 20]}
```

```modx
[[!msQuestions? &product_id=`[[*id]]` &limit=`20`]]
```

:::

## Стек форма + список

Форма перед списком, заголовок формы скрыт:

::: code-group

```fenom
<div class="msreviews-qna-stack">
  {'!msQuestionForm' | snippet : ['product_id' => $_modx->resource.id, 'showHeading' => 0]}
  {'!msQuestions' | snippet : ['product_id' => $_modx->resource.id]}
</div>
```

```modx
<div class="msreviews-qna-stack">
[[!msQuestionForm? &product_id=`[[*id]]` &showHeading=`0`]]
[[!msQuestions? &product_id=`[[*id]]`]]
</div>
```

:::

## Пагинация Q&A

Отдельный `pageVarKey`, не совпадающий с отзывами:

::: code-group

```fenom
{'!pdoPage' | snippet : [
  'element' => 'msQuestions',
  'product_id' => $_modx->resource.id,
  'limit' => 5,
  'pageVarKey' => 'qna_page',
  'pageNavVar' => 'qna.page.nav',
  'totalVar' => 'qna.page.total'
]}
<div class="msreviews-pdopage-nav">{'qna.page.nav' | placeholder}</div>
```

```modx
[[!pdoPage?
  &element=`msQuestions`
  &product_id=`[[*id]]`
  &limit=`5`
  &pageVarKey=`qna_page`
  &pageNavVar=`qna.page.nav`
  &totalVar=`qna.page.total`
]]
<div class="msreviews-pdopage-nav">[[!+qna.page.nav]]</div>
```

:::

## См. также

- [msQuestionForm](msQuestionForm)
- [msQnaBlock](msQnaBlock)
- [Чанки](../chunks)
- [Интеграция — Q&A](../integration)
