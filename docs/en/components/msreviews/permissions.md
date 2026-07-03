---
title: Права доступа
description: MODX permissions msreviews_* для CMP и API менеджера
---
<!-- TODO: translate from docs/components/msreviews/permissions.md -->


# Права доступа

Права создаются при установке. Назначение: **Безопасность → Политики доступа** → политика роли → группа **msreviews**.

На клиенте кнопка или вкладка видна только если в конфиге пришло строгое **`true`**.

## MODX permissions (9)

| Permission | Назначение |
| --- | --- |
| `msreviews_review_view` | Просмотр отзывов, превью, вкладка «Медиа» |
| `msreviews_review_moderate` | Статус, bulk, закреп, удаление медиа |
| `msreviews_review_reply` | Ответ магазина на отзыв |
| `msreviews_review_export` | Экспорт CSV, список очереди писем |
| `msreviews_review_import` | Импорт отзывов из CSV |
| `msreviews_review_analytics` | Дашборд, аналитика, поиск товара |
| `msreviews_question_moderate` | Вопросы, ответы, закреп Q&A |
| `msreviews_queue_process` | Ручная обработка очереди писем |
| `msreviews_settings_manage` | Зарезервировано (настройки в **Система → Настройки**) |

## Fallback на права MODX

Если specific-право msReviews не выдано, часть действий допускает стандартные права MODX (`view`, `save`). Для production выдавайте **`msreviews_*`** явно.

| Логический ключ | Specific | Fallback MODX |
| --- | --- | --- |
| `review_view` | `msreviews_review_view` | `view` |
| `review_moderate` | `msreviews_review_moderate` | `save` |
| `review_reply` | `msreviews_review_reply` | `save` |
| `review_export` | `msreviews_review_export` | `view` |
| `review_import` | `msreviews_review_import` | `save` |
| `review_analytics` | `msreviews_review_analytics` | `view` |
| `question_moderate` | `msreviews_question_moderate` | `save` |
| `queue_process` | `msreviews_queue_process` | `save` |

## Примеры ролей

| Роль | Права |
| --- | --- |
| Модератор отзывов | `review_view`, `review_moderate`, `review_reply` |
| Модератор Q&A | + `question_moderate` |
| Маркетинг / аналитика | `review_analytics` |
| Операции | + `review_export`, при cron также `queue_process` |
| Импорт контента | `review_import` |
| Администратор пакета | все 9 permissions |

## Ошибки API админки

| Код | Когда |
| --- | --- |
| **401** | Нет сессии менеджера |
| **403** | Недостаточно прав |
| **405** | Mutating action не через POST |

Публичные действия витрины (`review/create`, …) не используют эти permissions; там антиспам и rate limit.

## См. также

- [Админка](manager)
- [AJAX API](api)
