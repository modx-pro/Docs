---
title: Чанки
description: Шаблоны msReviews — отзывы, формы, рейтинг, Q&A, email, готовые блоки
---

# Чанки

Чанки поставляются с пакетом в `core/components/msreviews/elements/chunks/`. Кастомизируйте копии в MODX или переопределяйте через параметр **`tpl`** / **`wrapper`** у сниппетов.

## Отзывы — список

| Чанк | Назначение |
| --- | --- |
| `tplReviewItem` | Строка отзыва в списке |
| `tplReviewsList` | Обёртка списка (`msReviews`) |

Плейсхолдеры в **`tplReviewItem`**: `rating`, `text`, `author_name`, `published_at_display`, `published_at_iso`, `helpful_count`, `is_verified`, `has_media`, `shop_reply`, `recommend`, structured-поля из meta.

## Форма отзыва

| Чанк | Назначение |
| --- | --- |
| `tplReviewForm` | Основная форма |
| `tplReviewFormDimensions` | Оценки по критериям |
| `tplReviewFormStructured` | Плюсы/минусы, сценарий |
| `tplReviewFormOptionalWrap` | Блок «Дополнительно» |
| `tplReviewFormTitleField` | Поле заголовка |
| `tplReviewFormMedia` | Загрузка фото |

## Рейтинг

| Чанк | Назначение |
| --- | --- |
| `tplRatingSummary` | Полная сводка на странице товара |
| `tplRatingCatalog` | Компактная строка в каталоге |
| `tplRatingBadge` | Микро-бейдж (`msRatingBadge`) |

## Виджеты

| Чанк | Назначение |
| --- | --- |
| `tplReviewLatestItem` / `tplReviewsLatestList` | `msReviewsLatest` |
| `tplTopRatedProduct` / `tplTopRatedProductsList` | `msTopRatedProducts` |
| `tplQuestionLatestItem` / `tplQuestionsLatestList` | `msQuestionsLatest` |

## Q&A

| Чанк | Назначение |
| --- | --- |
| `tplQuestionItem` / `tplQuestionsList` | `msQuestions` |
| `tplQuestionForm` | `msQuestionForm` |

## Email

| Чанк | Назначение |
| --- | --- |
| `tplMsReviewsEmailSubject` | Тема письма запроса отзыва |
| `tplMsReviewsEmailBody` | Тело письма |

Настройки: **`msreviews_request_email_*_chunk`**.

## Готовые блоки (Hub, вкладки, фильтры)

| Чанк | Назначение |
| --- | --- |
| `tplReviewsHub` / `tplReviewsHubNav` / `tplReviewsHubSection` / `tplReviewsHubNavItem` | `msReviewsHub` |
| `tplReviewPrompt` | `msReviewPrompt` |
| `tplReviewsFilters` / `tplReviewsFiltersItem` | `msReviewsFilters` |
| `tplReviewsTabbed` | `msReviewsTabbed` |
| `tplReviewMediaGallery` / `tplReviewMediaGalleryItem` | `msReviewMediaGallery`. Элемент по умолчанию собирается в PHP; кастомный itemTpl получает `[[+link_html]]` |

## Fenom в чанках

Сниппеты подмешивают строки лексикона в плейсхолдеры **`[[+label_*]]`**, не `[[%msreviews_*]]`.

## CSS-токены `--msr-*`

Файл `assets/components/msreviews/css/reviews.css`. Переопределение на `:root` или родителе карточки товара.

**Каталог:** подключение стилей в шаблоне страницы или автоподключение сниппетом — [Каталог — reviews.css](frontend/catalog#подключение-reviewscss-в-каталоге), [msRatingSummary](snippets/msRatingSummary#подключение-reviewscss).

| Переменная | По умолчанию | Назначение |
| --- | --- | --- |
| `--msr-radius` | `0.5rem` | Скругление формы / сводки |
| `--msr-fg` / `--msr-muted` | `#1a1a1a` / `rgba(0,0,0,0.55)` | Текст и meta |
| `--msr-rating-star` | `#d97706` | Заполненные звёзды |
| `--msr-accent` | `#0b5bd3` | Кнопка, фокус |
| `--msr-section-gap` | `1.5rem` | Между секциями на странице товара |
| `--msr-qna-stack-gap` | `1.25rem` | Между Q&A и формой |
| `--msr-msg-ok` / `--msr-msg-err` | `#0a7a0a` / `#a40000` | Сообщения формы |

Полный список — в `reviews.css`. Админка CMP использует отдельные **`--msrv-*`** в `css/mgr/main.css`.

### Кастомизация через formClass

::: code-group

```fenom
{'!msReviewForm' | snippet : [
  'product_id' => $_modx->resource.id,
  'formClass' => 'my-shop-reviews'
]}
```

```modx
[[!msReviewForm? &product_id=`[[*id]]` &formClass=`my-shop-reviews`]]
```

:::

```css
.my-shop-reviews {
  --msr-accent: #e11d48;
  --msr-radius: 0.75rem;
}
```

## См. также

- [Интеграция](integration)
- [Сниппеты](snippets/index)
