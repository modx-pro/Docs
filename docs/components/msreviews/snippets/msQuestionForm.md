---
title: msQuestionForm
description: Форма отправки вопроса о товаре msReviews Q&A
---

# Сниппет msQuestionForm

Выводит форму вопроса: текст, имя, email, уведомление об ответе, согласие, капча. Отправляет AJAX на connector.

## Назначение

Сбор вопросов покупателей на PDP. Ответ модератор добавляет в CMP; после публикации вопрос попадает в [msQuestions](msQuestions).

## Где вызывать

- Шаблон **msProduct**, в блоке Q&A (обычно **перед** списком вопросов).
- Якорь к форме: `#msr-qna-form-anchor` или свой `id` на обёртке.
- Перед вызовом — [msReviewsLexiconScript](msReviewsLexiconScript).

Не оборачивайте в карточку темы: обёртка сниппета — `.msreviews-qform-wrap`.

## Зависимости

- **MiniShop3**, **msReviews**
- **msReviewsLexiconScript**
- Капча: плагин на `msrOnCaptchaVerify`

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3. Обязателен |
| `tpl` | `tplQuestionForm` | Чанк формы |
| `formClass` | *(пусто)* | Доп. CSS-классы |
| `showHeading` | `1` | Заголовок внутри формы |
| `formHeading` | *(лексикон)* | Свой заголовок. Пусто — `msreviews_q_form_section_title` |
| `captchaHtml` | *(пусто)* | HTML капчи |
| `connectorUrl` | auto | URL connector |

## Базовый вызов

::: code-group

```fenom
{'!msQuestionForm' | snippet : ['product_id' => $_modx->resource.id]}
```

```modx
[[!msQuestionForm? &product_id=`[[*id]]`]]
```

:::

## Без внутреннего заголовка

::: code-group

```fenom
<h2>Вопросы о товаре</h2>
<div class="msreviews-qna-stack">
  {'!msQuestionForm' | snippet : [
    'product_id' => $_modx->resource.id,
    'showHeading' => 0
  ]}
  {'!msQuestions' | snippet : ['product_id' => $_modx->resource.id]}
</div>
```

```modx
<h2>Вопросы о товаре</h2>
<div class="msreviews-qna-stack">
[[!msQuestionForm? &product_id=`[[*id]]` &showHeading=`0`]]
[[!msQuestions? &product_id=`[[*id]]`]]
</div>
```

:::

## Капча

::: code-group

```fenom
{set $captcha = '@FILE chunks/captcha/recaptcha.tpl' | chunk}
{'!msQuestionForm' | snippet : [
  'product_id' => $_modx->resource.id,
  'captchaHtml' => $captcha
]}
```

```modx
[[!msQuestionForm?
  &product_id=`[[*id]]`
  &captchaHtml=`[[+captchaHtml]]`
]]
```

:::

## Альтернатива: msQnaBlock

Если нужен один вызов вместо двух сниппетов, см. [msQnaBlock](msQnaBlock) с `formPosition`.

## См. также

- [msQuestions](msQuestions)
- [msQnaBlock](msQnaBlock)
- [Чанки — tplQuestionForm](../chunks)
- [События — капча](../events)
