---
title: msQnaBlock
description: Список Q&A и форма вопроса одним вызовом msReviews
---

# Сниппет msQnaBlock

Компонует [msQuestions](msQuestions) и [msQuestionForm](msQuestionForm) в одной обёртке `.msreviews-qna-stack` с настраиваемым порядком блоков.

## Назначение

Один вызов вместо двух сниппетов Q&A. Порядок «список → форма» или «форма → список» задаёт `formPosition` или настройка `msreviews_qna_form_position`.

## Где вызывать

- Шаблон **msProduct** вместо пары `msQuestionForm` + `msQuestions`.
- **Не оборачивайте в pdoPage**: пагинация только через отдельный `msQuestions` + `msQuestionForm` в `.msreviews-qna-stack`.

## Зависимости

- **MiniShop3**, **msReviews**
- Внутренние вызовы `msQuestions` и `msQuestionForm` (те же параметры проксируются)
- **msReviewsLexiconScript** — для формы

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3 |
| `formPosition` | *(настройка)* | `after` — список, затем форма; `before` / `first` / `top` — форма первой. Пусто — `msreviews_qna_form_position` |
| `limit` | `20` | Лимит вопросов (→ `msQuestions`) |
| `faqOnly` | `0` | Только с ответом |
| `formClass` | *(пусто)* | Классы формы |
| `showHeading` | `1` | Заголовок формы |
| `formHeading` | *(лексикон)* | Заголовок формы |
| `captchaHtml` | *(пусто)* | HTML капчи |

Параметры `msQuestions` (`tpl`, `wrapper`, `limit`, `offset`, `totalVar` и др.) проксируются во внутренний `runSnippet`. **`pdoPage`** через `msQnaBlock` не поддерживается.

## Форма после списка (по умолчанию)

::: code-group

```fenom
{'!msQnaBlock' | snippet : [
  'product_id' => $_modx->resource.id,
  'formPosition' => 'after'
]}
```

```modx
[[!msQnaBlock? &product_id=`[[*id]]` &formPosition=`after`]]
```

:::

## Форма перед списком

::: code-group

```fenom
{'!msQnaBlock' | snippet : [
  'product_id' => $_modx->resource.id,
  'formPosition' => 'before',
  'showHeading' => 0
]}
```

```modx
[[!msQnaBlock?
  &product_id=`[[*id]]`
  &formPosition=`before`
  &showHeading=`0`
]]
```

:::

## Сравнение с двумя сниппетами

| Способ | Когда |
| --- | --- |
| `.msreviews-qna-stack` + `msQuestionForm` + `msQuestions` | Нужна пагинация pdoPage на списке, полный контроль разметки |
| `msQnaBlock` | Один вызов, порядок из параметра или настройки |

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

## См. также

- [msQuestions](msQuestions)
- [msQuestionForm](msQuestionForm)
- [Интеграция — Q&A](../integration)
- [FAQ](../faq)
