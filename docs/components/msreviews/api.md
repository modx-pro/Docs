---
title: AJAX API (connector)
description: Публичные и mgr action коннектора msReviews
---

# AJAX API (connector)

Базовый URL:

::: code-group

```fenom
{$_modx->getOption('assets_url')}components/msreviews/connector.php
```

```modx
[[++assets_url]]components/msreviews/connector.php
```

:::

Сниппетов витрины достаточно. Коннектор — для своего JS, cron и CMP.

Запрос: **POST** с полем **`action`**. Ответ JSON: `success`, `message`, `data`, `errors`.

## Публичные действия

| `action` | Назначение | Основные параметры |
| --- | --- | --- |
| `review/create` | Создание отзыва | `data[...]` |
| `review/list` | Список + `summary` | `product_id`, `offset`, `limit`. Фильтры: `verified_only`, `with_media`, `with_reply`, `recommend_only`. Параметра сортировки нет |
| `review/vote` | «Полезно» | `review_id` или `id` |
| `review/update_own` | Правка своего | `id`, `edit_token`, `data` |
| `review/delete_own` | Свой отзыв в статус `archived` | `id`, `edit_token` |
| `rating/get` | Агрегат по товару | `product_id` |
| `question/create` | Вопрос | `data[...]` |
| `qna/list` | Список Q&A | `product_id`, `offset`, `limit`, `faq_only` |
| `media/upload` | Загрузка файла | `file`, `review_id`, `edit_token`, `type` (по умолчанию `image`) |
| `request/process` | Cron очереди писем | `key` или `k` = **`msreviews_cron_key`** |

## request/process

Ключ только в теле POST (`key` или `k`). Пустой ключ в настройке, неверный ключ и ключ только в URL дают **403** и `msr_err_forbidden`.

Успех: `data.sent` (батч до 20) и `data.rate_limit_purged`. Перед письмами удаляются строки rate limit старше `msreviews_rate_limit_retention_days`.

Пример cron:

```text
POST assets/components/msreviews/connector.php
action=request/process&key=ВАШ_КЛЮЧ
```

## review/create

В `data` обязательны `product_id`, `rating` (1–5), `author_name`, `author_email`, `text` (от 3 символов), `consent`. Ошибки: `msr_err_product`, `msr_err_rating`, `msr_err_author`, `msr_err_text`, `msr_err_consent`. Verified на витрине: `data[order_token]` или `data[token]`.

## question/create

Поля: `product_id`, `author_name`, `author_email`, `text` (от 3 символов), `consent`. Пустые имя, email или короткий текст дают `msr_err_question`. Нет согласия: `msr_err_consent`. Поле `notify` необязательно. В чанках согласие называется `data[consent]`.

## qna/list

С `faq_only` сначала берёт страницу без фильтра, затем оставляет строки с ответом. `limit` относится к полному списку, total не пересчитывается. Пагинацию FAQ делает сниппет `msQuestions`: там фильтр в SQL.

## review/vote

Повтор с того же fingerprint отвечает **200** и `already_voted: true`. Нет отзыва: **404** `msr_err_nf`.

## Действия менеджера (mgr)

Требуются сессия менеджера и права компонента. Mutating `mgr/*` — **только POST** (иначе **405**).

| `action` | Назначение | Право |
| --- | --- | --- |
| `mgr/review/list` | Список для модерации | `review_view` |
| `mgr/review/create` | Ручное создание отзыва | `review_moderate` |
| `mgr/review/update` | Ручное редактирование (можно сменить `product_id`) | `review_moderate` |
| `mgr/review/get` | Превью одного отзыва | `review_view` |
| `mgr/review/update-status` | Статус | `review_moderate` |
| `mgr/review/set-reply` | Ответ магазина | `review_reply` |
| `mgr/review/set-pinned` | Закреп | `review_moderate` |
| `mgr/review/bulk` | Массовая смена | `review_moderate` |
| `mgr/review/moderation-log` | Журнал | `review_view` или `review_moderate` |
| `mgr/question/list` | Список вопросов | `question_moderate` |
| `mgr/question/create` | Ручное создание вопроса в CMP | `question_moderate` |
| `mgr/question/update` | Редактирование вопроса в CMP | `question_moderate` |
| `mgr/question/get` | Один вопрос для формы CMP (с `answer_text`) | `question_moderate` |
| `mgr/question/update-status` | Статус вопроса | `question_moderate` |
| `mgr/question/set-pinned` | Закреп вопроса | `question_moderate` |
| `mgr/answer/create` | Ответ на вопрос | `question_moderate` |
| `mgr/dashboard/summary` | Сводка дашборда | `review_analytics` |
| `mgr/analytics/summary` | Расширенная аналитика | `review_analytics` |
| `mgr/export/reviews` | CSV отзывов | `review_export` |
| `mgr/export/questions` | CSV вопросов | `review_export` |
| `mgr/export/request_queue` | CSV очереди писем | `review_export` |
| `mgr/import/reviews` | Импорт отзывов CSV | `review_import` |
| `mgr/import/questions` | Импорт вопросов CSV (с **1.2.4**) | `review_import` |
| `mgr/media/list` | Список медиа | `review_view` |
| `mgr/media/upload` | Загрузка медиа в CMP | `review_moderate` |
| `mgr/media/delete` | Удалить медиа | `review_moderate` |
| `mgr/review/product-summary` | Сводка для вкладки «Отзывы» на ресурсе | `review_view` |
| `mgr/request_queue/list` | Список очереди писем | `review_export` |
| `mgr/queue/process` | Очередь из mgr | `queue_process` |
| `mgr/catalog/search` | Поиск папок, товаров или ресурсов | `review_analytics` или `question_moderate` |
| `mgr/catalog/resolve` | Подписи по ID | `review_analytics` или `question_moderate` |

Права: [Права доступа](permissions).

## mgr/review/create и update

| Поле | Условие |
| --- | --- |
| `product_id` | любой неудалённый `site_content`, не только `msProduct` |
| `rating` | 1–5 |
| `title`, `text`, `author_name`, `author_email`, `status` | |
| `is_verified` | 0/1 |
| `id` | обязателен у update |
| `shop_reply` | опционально, право `review_reply` |

Смена `product_id` пересчитывает агрегаты старого и нового ресурса.

## mgr/question

**`mgr/question/create`** / **`update`** (только POST).

| Поле | Условие |
| --- | --- |
| `product_id` | любой неудалённый `site_content` |
| `text`, `author_name`, `author_email` | |
| `status` | из поля формы перезаписывает автопубликацию ответа |
| `notify` | 0/1 |
| `answer_text` | опционально |
| `id` | обязателен у update |

Ответ пишет `AnswerService` (уведомление автора). `mgr/answer/create` остаётся в API и публикует вопрос. Из списка вопросов CMP его не вызывают с **1.2.4**. **`mgr/question/get`**: `id`.

## mgr/import/questions

Только POST, с **1.2.4**. CSV-колонки: `product_id`, `text`, `status` и `author_email` или `author_name`. Опционально `answer_text`, `notify`, `pinned`.

## mgr/catalog

**`mgr/catalog/search`** и **`mgr/catalog/resolve`** читают параметры только из тела POST. GET не даёт 405: ответ **200** и пустой `items`, потому что `type` пустой.

| Параметр | Правило |
| --- | --- |
| `type` | `parent`, `product` или `resource` |
| `q` | до 80 символов |
| `limit` | от 1 до 100, по умолчанию 50 |
| `ids` | у resolve, вместе с тем же `type` |

`product` ищет только `msreviews_product_class_key`. `resource` ищет любой неудалённый `site_content` (форма и фильтр отзывов и вопросов в CMP). Ответ `data.items`: `{ id, label }[]`. Право: `review_analytics` или `question_moderate`.

## Формат ответа

```json
{
  "success": true,
  "message": "...",
  "data": {},
  "errors": []
}
```

## HTTP-коды

| HTTP | Ключ `message` | Ситуация |
| --- | --- | --- |
| **401** | `msr_err_unauthorized` | `mgr/*` без входа |
| **403** | `msr_err_forbidden` | Нет прав mgr, либо ключ cron пустой, неверный или передан только в URL |
| **405** | `msr_err_method_not_allowed` | Mutating не через POST |
| **400** | `msr_err_*` | Обычная проверка полей |
| **404** | `msr_err_unknown_action` | Неизвестный `action` |
| **404** | `msr_err_nf` | Нет отзыва при голосе |
| **500** | `msr_err_db` | Ошибка БД |

Коды сообщений: [События MODX](events#коды-msr_err).

## См. также

- [События MODX](events)
- [Интеграция](integration)
