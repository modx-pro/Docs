---
title: msReviewForm
description: Форма отправки отзыва на карточке товара msReviews
---

# Сниппет msReviewForm

Выводит форму отзыва: оценка 1–5★, текст, медиа, структурированные поля, капча. Отправляет AJAX на connector msReviews.

## Назначение

Сбор UGC на PDP: новый отзыв, verified-токен из письма, загрузка фото. После отправки показывает экран успеха (см. скриншот ниже).

## Где вызывать

- Шаблон **msProduct**, после [msReviews](msReviews) или внутри [msReviewsHub](msReviewsHub).
- Перед вызовом — [msReviewsLexiconScript](msReviewsLexiconScript).
- Не оборачивайте форму в `.card` темы: у сниппета своя обёртка `.msreviews-form-wrap`.

<!-- ![Экран успеха после отправки отзыва](/components/msreviews/screenshots/review-form-success.png) -->

## Зависимости

- **MiniShop3**, **msReviews**
- **msReviewsLexiconScript** — переводы для `review-form.js`
- Настройки: `msreviews_media_enabled`, `msreviews_moderation_enabled`
- Капча: плагин на `msrOnCaptchaVerify` — [События](../events)

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| `product_id` | id ресурса | ID товара MS3. Обязателен |
| `tpl` | `tplReviewForm` | Чанк формы |
| `formClass` | *(пусто)* | Доп. CSS-классы на `.msreviews-form-wrap` |
| `showHeading` | `1` | Заголовок внутри формы. `0` — один внешний `<h2>` на странице |
| `formHeading` | *(лексикон)* | Свой заголовок. Пусто — `msreviews_form_section_title` |
| `showMedia` | *(из настройки)* | Поле загрузки фото. Учитывает `msreviews_media_enabled` |
| `showStructuredFields` | `1` | Плюсы, минусы, сценарий, вариант, «рекомендую» |
| `showDimensionRatings` | `0` | Оценки по критериям (качество, доставка…). Включите явно |
| `captchaHtml` | *(пусто)* | HTML виджета капчи → плейсхолдер `[[+captcha_html]]` в чанке |
| `connectorUrl` | auto | URL connector |

## Базовый вызов

::: code-group

```fenom
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id]}
```

```modx
[[!msReviewForm? &product_id=`[[*id]]`]]
```

:::

## Внешний заголовок секции

Паттерн: заголовок в разметке темы, в форме `showHeading=0`:

::: code-group

```fenom
<h2 id="msreviews-form">Оставить отзыв</h2>
{'!msReviewForm' | snippet : [
  'product_id' => $_modx->resource.id,
  'showHeading' => 0,
  'showDimensionRatings' => 1,
  'showStructuredFields' => 1
]}
```

```modx
<h2 id="msreviews-form">Оставить отзыв</h2>
[[!msReviewForm?
  &product_id=`[[*id]]`
  &showHeading=`0`
  &showDimensionRatings=`1`
  &showStructuredFields=`1`
]]
```

:::

## Капча и темизация

::: code-group

```fenom
{set $captcha = '@FILE chunks/captcha/recaptcha.tpl' | chunk}
{'!msReviewForm' | snippet : [
  'product_id' => $_modx->resource.id,
  'captchaHtml' => $captcha,
  'formClass' => 'my-theme-reviews'
]}
```

```modx
[[!msReviewForm?
  &product_id=`[[*id]]`
  &captchaHtml=`[[+captchaHtml]]`
  &formClass=`my-theme-reviews`
]]
```

:::

## Полный блок PDP (фрагмент)

::: code-group

```fenom
{'!msReviewsLexiconScript' | snippet}
{'!msRatingSummary' | snippet : ['product_id' => $_modx->resource.id]}
{'!msReviews' | snippet : ['product_id' => $_modx->resource.id, 'showStats' => 0]}
{'!msReviewForm' | snippet : ['product_id' => $_modx->resource.id, 'showHeading' => 0]}
```

```modx
[[!msReviewsLexiconScript]]
[[!msRatingSummary? &product_id=`[[*id]]`]]
[[!msReviews? &product_id=`[[*id]]` &showStats=`0`]]
[[!msReviewForm? &product_id=`[[*id]]` &showHeading=`0`]]
```

:::

Чанк формы: [Чанки — tplReviewForm](../chunks).

## См. также

- [msReviewPrompt](msReviewPrompt) — якорь `#msreviews-form`
- [Интеграция](../integration)
- [FAQ — форма не отправляется](../faq)
