---
title: События MODX и капча
description: msrOn* события, msrOnCaptchaVerify, prefetch, коды ошибок
---

# События MODX и капча

Примеры витрины — [Интеграция](integration). Ниже события, капча и prefetch для расширений.

## События msrOn*

| Событие | Когда |
| --- | --- |
| `msrOnBeforeReviewCreate` | До создания отзыва |
| `msrOnReviewCreate` | После создания |
| `msrOnBeforeReviewPublish` | До публикации |
| `msrOnReviewPublish` | После публикации |
| `msrOnReviewReject` | При отклонении |
| `msrOnBeforeReviewUpdate` / `msrOnReviewUpdate` | Самоправка |
| `msrOnBeforeReviewDelete` / `msrOnReviewDelete` | Самоудаление |
| `msrOnReviewVote` | После «полезно» |
| `msrOnQuestionCreate` | Создание вопроса |
| `msrOnAnswerCreate` | Ответ из CMP |
| `msrOnReviewRequestSend` | Отправка письма из очереди |
| **`msrOnCaptchaVerify`** | Перед `review/create` и `question/create` |

Верните **`false`** из плагина на guard-событиях, чтобы заблокировать операцию (`msr_err_event_block`).

## Капча (msrOnCaptchaVerify)

Встроенного виджета нет.

1. Подключите провайдера капчи на сайте.
2. Передайте HTML в **`&captchaHtml=`** у `msReviewForm` / `msQuestionForm`.
3. Создайте **плагин** на **`msrOnCaptchaVerify`** (ранняя сортировка).
4. Проверьте токен через API провайдера.
5. При неуспехе установите результат события в **`false`** → JSON **`msr_err_captcha`**.

::: code-group

```modx
[[!msReviewForm?
  &product_id=`[[*id]]`
  &captchaHtml=`[[+captchaHtml]]`
]]
```

```fenom
{'!msReviewForm' | snippet : [
  'product_id' => $_modx->resource.id,
  'captchaHtml' => $captchaBlock
]}
```

:::

## Prefetch агрегатов

Функция **`msr_prefetch_aggregates(\MODX\Revolution\modX $modx, array $productIds)`** в `core/components/msreviews/include/helpers.php`.

Вызывайте в PHP **до** цикла карточек каталога, когда id товаров уже известны:

```php
require_once MODX_CORE_PATH . 'components/msreviews/include/helpers.php';
msr_prefetch_aggregates($modx, [101, 102, 103]);
```

После prefetch **`msRatingSummary`** и **`msRatingBadge`** читают агрегат из request-scoped кеша без N+1 запросов.

## Коды msr_err_*

| Ключ | Контекст |
| --- | --- |
| `msr_err_product` | Неверный `product_id` |
| `msr_err_rating` | Оценка не 1–5 |
| `msr_err_spam` | Honeypot / blacklist |
| `msr_err_crawler` | CrawlerDetect |
| `msr_err_rate` | Rate limit |
| `msr_err_captcha` | Капча не пройдена |
| `msr_err_token` | Неверный edit_token |
| `msr_err_self_edit_disabled` | Самоправка выключена |
| `msr_err_vote_disabled` | Голосование выключено |
| `msr_err_forbidden` | Нет прав mgr |
| `msr_err_unknown_action` | Неизвестный `action` |

Полный список — лексикон namespace `msreviews`, ключи `msr_err_*`. На витрине JS переводит через **`window.msrLexicon`**.

## CrawlerDetect

[Ru: CrawlerDetect](/components/crawlerdetect/) + **`msreviews_crawler_block_enabled=1`**: блок **`review/create`** и **`question/create`** для ботов → **`msr_err_crawler`**.

## Resource cache и фильтры

Плагин **msReviews Storefront cache** (`msreviews_storefront_cache`) поставляется с пакетом и включён по умолчанию.

События: `OnHandleRequest`, `OnLoadWebPageCache`, `OnBeforeSaveWebPageCache`, `OnWebPagePrerender`.

Зачем: при `cache_resource=1` MODX кэширует HTML карточки товара **без** query `?msr_verified=1` и других фильтров. Плагин сбрасывает resource cache при запросе с `msr_*`, не сохраняет отфильтрованный HTML в кэш и обходит HTML-кэш **imageoptimizer**, если он установлен.

Без плагина chip-фильтры [msReviewsFilters](snippets/msReviewsFilters) на проде могут не менять список. Подробнее: [Интеграция — фильтры](integration#фильтры-списка-отзывов).

## См. также

- [AJAX API](api)
- [Системные настройки](settings)
- [FAQ](faq)
