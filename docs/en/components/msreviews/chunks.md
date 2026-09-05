---
title: Чанки
description: Шаблоны msReviews — отзывы, формы, рейтинг, Q&A, email, готовые блоки
---

<!-- TODO: translate from docs/components/msreviews/chunks.md -->

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

Настройки запроса: **`msreviews_request_email_*_chunk`**. Письма модератору: ключи **`msreviews_moderator_email_*_chunk`**. Пустое имя: текст из лексикона. Имя задано, рендер пустой: ERROR в лог, письмо не уходит. См. [Уведомление модератора](settings#уведомление-модератора).

## Готовые блоки (Hub, вкладки, фильтры)

| Чанк | Назначение |
| --- | --- |
| `tplReviewsHub` / `tplReviewsHubNav` / `tplReviewsHubSection` / `tplReviewsHubNavItem` | `msReviewsHub` |
| `tplReviewPrompt` | `msReviewPrompt` |
| `tplReviewsFilters` / `tplReviewsFiltersItem` | `msReviewsFilters` |
| `tplReviewsTabbed` | `msReviewsTabbed` |
| `tplReviewMediaGallery` / `tplReviewMediaGalleryBody` / `tplReviewMediaGalleryItem` | `msReviewMediaGallery`. Разметка целиком из чанков (`bodyTpl`, `itemTpl`) |

## Fenom в чанках

С **1.2** все чанки пакета написаны на Fenom и рендерятся через **pdoTools** (`pdoTools::getChunk()` с принудительным Fenom). Системная **`pdotools_fenom_parser`** на msReviews не влияет.

Без pdoTools 3.0+ сниппеты вернут пустую строку. Обновление пакета перезаписывает чанки категории **msReviews**. Свою версию держите под другим именем и подключайте параметром сниппета (`&tpl=`, `&itemTpl=`).

| Было (MODX) | Стало (Fenom) |
| --- | --- |
| `[[+text]]` | `{$text}` |
| ``[[+author_name:default=`Гость`]]`` | `{$author_name?:'Гость'}` |
| ``[[+title:notempty=`<h4>[[+title]]</h4>`]]`` | `{if $title?}<h4>{$title}</h4>{/if}` |
| ``[[+pinned:is=`1`:then=` is-pinned`]]`` | `{if $pinned?} is-pinned{/if}` |
| `[[%msreviews_helpful]]` | `{$label_helpful}` |

Подписи UI приходят плейсхолдерами **`{$label_*}`**, не `[[%msreviews_*]]`. Необязательный ключ: `{if $var?}` или `{$var?:''}`. Голое `{$var}` на пустом ключе даст warning Fenom.

Свои чанки должны сохранить атрибуты **`data-msr-*`**, иначе штатный JS не подхватит форму, голос и список. См. [Интеграция — data-контракт](integration#кастомная-вёрстка-data-контракт) и [Обновление до 1.2](upgrade-1.2).

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
