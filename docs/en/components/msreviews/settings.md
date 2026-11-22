---
title: Системные настройки
description: Ключи msreviews_* — модерация, медиа, письма, антиспам, витрина, рейтинг, schema, engagement
---

# Системные настройки

Откройте **Система → Настройки**, фильтр namespace **`msreviews`**.

## Области (area)

| Area | Содержание |
| --- | --- |
| `msreviews_moderation` | Автопубликация, несколько отзывов, отмена заказа |
| `msreviews_media` | Загрузка фото, лимиты, ссылки на видео |
| `msreviews_email` | Очередь писем, статусы заказа, шаблоны |
| `msreviews_antispam` | Honeypot, CrawlerDetect, rate limit, чёрные списки |
| `msreviews_frontend` | Verified-first, JS/CSS, формат даты, порядок Q&A |
| `msreviews_ratings` | Алгоритм агрегата (average / wilson) |
| `msreviews_schema` | JSON-LD, FAQPage, источник рейтинга |
| `msreviews_engagement` | «Полезно», самоправка/самоудаление |
| `msreviews_service` | Cron-ключ, class_key товаров |

## Модерация

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_auto_publish_verified` | boolean | `0` | Автопубликовать отзывы с verified |
| `msreviews_auto_publish_guest` | boolean | `0` | Автопубликовать гостевые отзывы |
| `msreviews_allow_multiple_reviews_per_product` | boolean | `0` | Второй отзыв возможен. При `0` повтор по тому же заказу и товару не публикуется сразу, даже если `msreviews_auto_publish_verified` = `1` |
| `msreviews_reject_on_cancel` | boolean | `1` | Учитывать отмену заказа при verified |
| `msreviews_cancelled_order_status_ids` | text | *(пусто)* | ID статусов MS3 «отменён» через запятую |

## Медиа

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_media_enabled` | boolean | `1` | Загрузка фото к отзыву |
| `msreviews_media_max_files` | number | `5` | Макс. файлов на отзыв |
| `msreviews_media_max_size_mb` | number | `5` | Макс. размер файла (МБ) |
| `msreviews_video_links_enabled` | boolean | `1` | URL видеохостингов в тексте. При `1` хосты YouTube, Vimeo, Rutube, VK, TikTok и соседние не входят в `msreviews_max_links` |

## Письма (очередь запросов)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_request_enabled` | boolean | `1` | Письма с просьбой оставить отзыв |
| `msreviews_request_order_statuses` | text | *(пусто)* | ID статусов заказа: запуск очереди |
| `msreviews_request_delay_hours` | number | `72` | Задержка перед отправкой (ч) |
| `msreviews_request_token_ttl_days` | number | `30` | TTL ссылки в письме (дни) |
| `msreviews_request_email_subject_chunk` | text | `tplMsReviewsEmailSubject` | Чанк темы письма |
| `msreviews_request_email_body_chunk` | text | `tplMsReviewsEmailBody` | Чанк тела письма |
| `msreviews_moderator_notify_enabled` | boolean | `0` | Письмо модератору о новом отзыве или вопросе с витрины |
| `msreviews_moderator_notify_emails` | text | *(пусто)* | Адреса через запятую |
| `msreviews_moderator_notify_on` | text | `pending_only` | `pending_only` — только pending, `all` — любой новый с витрины |
| `msreviews_moderator_email_subject_chunk` | text | *(пусто)* | Чанк темы. Пустое имя — лексикон. Задано имя, пустой вывод — ERROR в лог, письмо не уходит |
| `msreviews_moderator_email_body_chunk` | text | *(пусто)* | Чанк тела. Как у темы |

**msReviews Order status** слушает **`msOnChangeOrderStatus`**. Очередь: CMP или cron, **`action=request/process`**, ключ **`msreviews_cron_key`**.

### Уведомление модератора

Включите **`msreviews_moderator_notify_enabled`**, укажите **`msreviews_moderator_notify_emails`**. На новый отзыв или вопрос с витрины — письмо со ссылкой в CMP.

С **1.2.2** письма пакета (модератор, invite, reply/answer) — `text/html`. Свой чанк может содержать вёрстку. Текст из лексикона: escape и `<br>`.

- По умолчанию (`pending_only`) письмо уходит только для материалов со статусом `pending`. Значение `all` включает и автоматически опубликованные.
- CSV-импорт и создание отзыва в CMP письма не шлют.
- Плейсхолдеры чанков: `type` / `status` (подписи из лексикона), `type_key` / `status_key` (коды `review`, `pending`, …), `id`, `product_id`, `manager_url`.
- Лексикон подставляется только если имя чанка пустое. Если имя задано, а чанк вернул пустую строку, в лог пишется `[msReviews] moderator email … chunk empty`, письмо не уходит.
- Отмена отправки: плагин на **`msrOnModeratorNotify`** → `return false`. См. [События](events#msronmoderatornotify).

## Витрина

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_verified_first_enabled` | boolean | `1` | Verified выше обычных (после закреплённых) |
| `msreviews_frontend_js_enabled` | boolean | `1` | Подключать JS сниппетами |
| `msreviews_frontend_css_enabled` | boolean | `1` | Подключать CSS сниппетами |
| `msreviews_storefront_date_format` | text | `d.m.Y` | Формат даты в карточке (`PHP date()`). Пустой `dateFormat` у `msReviews`, `msReviewsLatest` и `msQuestionsLatest` берёт эту настройку |
| `msreviews_qna_form_position` | text | `after` | Q&A: `after` (список → форма) или `before` |

## Рейтинг

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_aggregate_algorithm` | text | `average` | `average` или `wilson` |
| `msreviews_wilson_positive_min` | number | `4` | Порог «позитивной» оценки для Wilson (1–5) |

## Schema.org

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_schema_enabled` | boolean | `1` | Вывод JSON-LD через `msReviewSchema` |
| `msreviews_schema_qna_enabled` | boolean | `1` | FAQPage в JSON-LD |
| `msreviews_schema_rating_source` | text | `mean` | `mean` или `display` в разметке |

## Антиспам

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_honeypot_enabled` | boolean | `1` | Скрытое поле в формах |
| `msreviews_honeypot_field` | text | `msr_hp` | Имя поля → POST `data[msr_hp]` |
| `msreviews_crawler_block_enabled` | boolean | `0` | Блок ботов ([CrawlerDetect](/components/crawlerdetect/)) |
| `msreviews_rate_limit_per_hour` | number | `3` | Лимит создания отзыва и вопроса. Fingerprint: SHA-256 от IP и укороченного User-Agent. `0` выключает лимит |
| `msreviews_rate_limit_retention_days` | number | `7` | Хранение записей rate limit |
| `msreviews_max_links` | number | `1` | Макс. не-видео URL в тексте. При `msreviews_video_links_enabled` = `1` видеохостинги в этот счётчик не входят |
| `msreviews_spam_action` | text | `pending` | `pending` или `spam`. Любое другое значение читается как `pending` |
| `msreviews_blacklist_emails` | textarea | *(пусто)* | Email через запятую |
| `msreviews_blacklist_domains` | textarea | *(пусто)* | Домены |
| `msreviews_blacklist_ips` | textarea | *(пусто)* | Полный IPv4 или IPv6, запятая или новая строка. Совпадение точное |
| `msreviews_blacklist_words` | textarea | *(пусто)* | Стоп-слова |
| `msreviews_trust_proxy_headers` | boolean | `0` | При `1` IP — первый адрес из `X-Forwarded-For`. Списка доверенных прокси нет. Включайте только при своём прокси перед сайтом |

## Engagement

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_helpful_voting_enabled` | boolean | `1` | Голос «полезно» |
| `msreviews_vote_rate_limit_per_hour` | number | `60` | Лимит голосов «полезно» с fingerprint IP и User-Agent. В коде порог `max(1, значение)`, поэтому `0` лимит не снимает |
| `msreviews_self_edit_enabled` | boolean | `1` | Редактирование своего отзыва |
| `msreviews_self_delete_enabled` | boolean | `1` | `review/delete_own` ставит статус `archived`. Строка остаётся |
| `msreviews_self_edit_window_minutes` | number | `15` | Минуты после создания для правки и `delete_own`. Значение меньше 1 становится 1. После ответа магазина оба действия отвечают `msr_err_shop_replied` |
| `msreviews_self_edit_to_pending` | boolean | `1` | После правки — снова на модерацию |

## Служебные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_cron_key` | text | *(пусто)* | Секрет для `action=request/process` |
| `msreviews_product_class_key` | text | `msProduct` | Несколько ключей через запятую. Без `\` сравнение `LIKE '%ключ'`, поэтому `msProduct` покрывает `MiniShop3\Model\msProduct`. С `\` нужно полное равенство. Используется в поиске CMP `type=product` и метрике `products_without_reviews`. С 1.2.5 не ограничивает вкладку «Отзывы» и `parents` |

## Verified purchase

Флаг **`is_verified`** можно выставить двумя способами:

1. **На витрине** — при `review/create` с валидным токеном заказа из письма или URL (`msr_token`).
2. **В CMP** — чекбокс **Verified purchase** в диалоге «Добавить/Редактировать отзыв» (право **`review_moderate`**, с **1.1.0**).

### Покупатель на сайте

1. Заказ переходит в статус из **`msreviews_request_order_statuses`** → запись в очередь.
2. Письмо со ссылкой **`?msr_token=…&msr_product_id=…`**.
3. **`msReviewForm`** на странице товара подхватывает токен.
4. При **`msreviews_auto_publish_verified=1`** verified-отзыв может опубликоваться сразу.
5. При **`msreviews_reject_on_cancel`** и списке **`msreviews_cancelled_order_status_ids`** отменённый заказ не даёт verified.

### Модератор в CMP

В форме создания или редактирования отзыва включите **Verified purchase**. Связь с заказом MS3 (`order_id`) при этом не создаётся: для ручных отзывов поле остаётся пустым.

## Порядок отзывов на витрине

**`pinned DESC`**. При **`msreviews_verified_first_enabled`** verified выше обычных. Далее дата публикации.

## Коннектор

Публичный URL:

::: code-group

```fenom
{$_modx->getOption('assets_url')}components/msreviews/connector.php
```

```modx
[[++assets_url]]components/msreviews/connector.php
```

:::

См. [AJAX API](api).
