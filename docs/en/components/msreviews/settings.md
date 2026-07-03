---
title: Системные настройки
description: 'Ключи msreviews_* — модерация, медиа, письма, антиспам, витрина, рейтинг, schema, engagement'
---
<!-- TODO: translate from docs/components/msreviews/settings.md -->


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
| `msreviews_allow_multiple_reviews_per_product` | boolean | `0` | Несколько отзывов на товар от одного заказа |
| `msreviews_reject_on_cancel` | boolean | `1` | Учитывать отмену заказа при verified |
| `msreviews_cancelled_order_status_ids` | text | *(пусто)* | ID статусов MS3 «отменён» через запятую |

## Медиа

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_media_enabled` | boolean | `1` | Загрузка фото к отзыву |
| `msreviews_media_max_files` | number | `5` | Макс. файлов на отзыв |
| `msreviews_media_max_size_mb` | number | `5` | Макс. размер файла (МБ) |
| `msreviews_video_links_enabled` | boolean | `1` | URL видеохостингов в тексте отзыва |

## Письма (очередь запросов)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_request_enabled` | boolean | `1` | Письма с просьбой оставить отзыв |
| `msreviews_request_order_statuses` | text | *(пусто)* | ID статусов заказа — триггер очереди |
| `msreviews_request_delay_hours` | number | `72` | Задержка перед отправкой (ч) |
| `msreviews_request_token_ttl_days` | number | `30` | TTL ссылки в письме (дни) |
| `msreviews_request_email_subject_chunk` | text | `tplMsReviewsEmailSubject` | Чанк темы письма |
| `msreviews_request_email_body_chunk` | text | `tplMsReviewsEmailBody` | Чанк тела письма |

Плагин **msReviews Order status** слушает **`msOnChangeOrderStatus`**. Обработка очереди: CMP или cron с **`action=request/process`** и **`msreviews_cron_key`**.

## Витрина

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_verified_first_enabled` | boolean | `1` | Verified выше обычных (после закреплённых) |
| `msreviews_frontend_js_enabled` | boolean | `1` | Подключать JS сниппетами |
| `msreviews_frontend_css_enabled` | boolean | `1` | Подключать CSS сниппетами |
| `msreviews_storefront_date_format` | text | `d.m.Y` | Формат даты в карточке (`PHP date()`). Override: `dateFormat` у `msReviews` |
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
| `msreviews_rate_limit_per_hour` | number | `3` | Лимит создания отзыва/вопроса с IP/час |
| `msreviews_vote_rate_limit_per_hour` | number | `60` | Лимит голосов «полезно» |
| `msreviews_rate_limit_retention_days` | number | `7` | Хранение записей rate limit |
| `msreviews_max_links` | number | `1` | Макс. ссылок в тексте |
| `msreviews_spam_action` | text | `pending` | Статус при срабатывании антиспама |
| `msreviews_blacklist_emails` | textarea | *(пусто)* | Email через запятую |
| `msreviews_blacklist_domains` | textarea | *(пусто)* | Домены |
| `msreviews_blacklist_ips` | textarea | *(пусто)* | IP / CIDR |
| `msreviews_blacklist_words` | textarea | *(пусто)* | Стоп-слова |
| `msreviews_trust_proxy_headers` | boolean | `0` | Доверять `X-Forwarded-For` (только за trusted proxy) |

## Engagement

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_helpful_voting_enabled` | boolean | `1` | Голос «полезно» |
| `msreviews_self_edit_enabled` | boolean | `1` | Редактирование своего отзыва |
| `msreviews_self_delete_enabled` | boolean | `1` | Удаление своего отзыва |
| `msreviews_self_edit_window_minutes` | number | `15` | Окно правки (мин) |
| `msreviews_self_edit_to_pending` | boolean | `1` | После правки — снова на модерацию |

## Служебные

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msreviews_cron_key` | text | *(пусто)* | Секрет для `action=request/process` |
| `msreviews_product_class_key` | text | `msProduct` | class_key товаров в фильтрах CMP |

## Verified purchase

Флаг **`is_verified`** выставляется **только при создании отзыва** (`review/create`). В CMP нет переключателя «сделать verified».

1. Заказ переходит в статус из **`msreviews_request_order_statuses`** → запись в очередь.
2. Письмо со ссылкой **`?msr_token=…&msr_product_id=…`**.
3. Покупатель открывает страницу товара, **`msReviewForm`** подхватывает токен.
4. При **`msreviews_auto_publish_verified=1`** verified может опубликоваться сразу.
5. При **`msreviews_reject_on_cancel`** и списке **`msreviews_cancelled_order_status_ids`** отменённый заказ не даёт verified.

## Порядок отзывов на витрине

**`pinned DESC`**, затем при **`msreviews_verified_first_enabled`** — verified выше обычных, далее дата публикации.

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
