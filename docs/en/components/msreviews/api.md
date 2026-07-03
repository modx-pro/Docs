---
title: AJAX API (connector)
description: Публичные и mgr action коннектора msReviews
---
<!-- TODO: translate from docs/components/msreviews/api.md -->


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

На витрине обычно хватает сниппетов. Коннектор нужен для кастомного JS, cron и интеграций с CMP.

Запрос: **POST** с полем **`action`**. Ответ JSON: `success`, `message`, `data`, `errors`.

## Публичные действия

| `action` | Назначение | Основные параметры |
| --- | --- | --- |
| `review/create` | Создание отзыва | `data[...]` |
| `review/list` | Список + `summary` | `product_id`, `offset`, `limit`, фильтры |
| `review/vote` | «Полезно» | `review_id` или `id` |
| `review/update_own` | Правка своего | `id`, `edit_token`, `data` |
| `review/delete_own` | Удаление своего | `id`, `edit_token` |
| `rating/get` | Агрегат по товару | `product_id` |
| `question/create` | Вопрос | `data[...]` |
| `qna/list` | Список Q&A | `product_id`, `offset`, `limit`, `faq_only` |
| `media/upload` | Загрузка фото | `file`, `review_id`, `edit_token` |
| `request/process` | Cron очереди писем | `key` или `k` = **`msreviews_cron_key`** |

### request/process

- Ключ в настройках **пустой** → **403**, `forbidden`.
- Успех: `data.sent` — число отправленных писем (батч до 20).

Пример cron:

```text
POST assets/components/msreviews/connector.php
action=request/process&key=ВАШ_КЛЮЧ
```

## Действия менеджера (mgr)

Требуются сессия менеджера и права компонента. Mutating `mgr/*` — **только POST** (иначе **405**).

| `action` | Назначение | Право |
| --- | --- | --- |
| `mgr/review/list` | Список для модерации | `review_view` |
| `mgr/review/get` | Превью одного отзыва | `review_view` |
| `mgr/review/update-status` | Статус | `review_moderate` |
| `mgr/review/set-reply` | Ответ магазина | `review_reply` |
| `mgr/review/set-pinned` | Закреп | `review_moderate` |
| `mgr/review/bulk` | Массовая смена | `review_moderate` |
| `mgr/review/moderation-log` | Журнал | `review_view` |
| `mgr/question/list` | Список вопросов | `question_moderate` |
| `mgr/question/update-status` | Статус вопроса | `question_moderate` |
| `mgr/answer/create` | Ответ на вопрос | `question_moderate` |
| `mgr/dashboard/summary` | Сводка дашборда | `review_analytics` |
| `mgr/analytics/summary` | Расширенная аналитика | `review_analytics` |
| `mgr/export/reviews` | CSV отзывов | `review_export` |
| `mgr/export/questions` | CSV вопросов | `review_export` |
| `mgr/import/reviews` | Импорт CSV | `review_import` |
| `mgr/media/list` | Список медиа | `review_view` |
| `mgr/media/delete` | Удалить медиа | `review_moderate` |
| `mgr/queue/process` | Очередь из mgr | `queue_process` |
| `mgr/catalog/search` | Поиск товаров/папок | `review_analytics` |
| `mgr/catalog/resolve` | Подписи по ID | `review_analytics` |

Полные параметры — в исходниках `ConnectorRegistryFactory` и [Права доступа](permissions).

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
| **403** | `msr_err_forbidden` | Нет прав |
| **403** | `forbidden` | Неверный cron key |
| **405** | `msr_err_method_not_allowed` | Mutating не через POST |
| **400** | `msr_err_*` | Невалидные параметры |

Коды сообщений: [События MODX](events#коды-msr_err).

## См. также

- [События MODX](events)
- [Интеграция](integration)
