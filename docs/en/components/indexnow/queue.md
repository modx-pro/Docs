---
title: Очередь и отправка
description: События плагина, dedupe, worker, HTTP-коды и retry
---

# Очередь и отправка

## Поток

```text
Событие ресурса → постановка в очередь (dedupe)
  → Scheduler или «Обработать очередь»
  → QueueWorker (batch по host)
  → IndexNow API
  → История
```

Таблицы: `modx_indexnow_queue`, `modx_indexnow_history` (с учётом префикса таблиц сайта).

## Какие события ловит плагин

| Событие | Поведение |
| --- | --- |
| `OnDocFormSave` | Опубликованный ресурс → `update`. Снятый с публикации → `delete`. |
| `OnResourcePublish` | Как сохранение опубликованного → `update`. |
| `OnResourceUnPublish` | → `delete`. |
| `OnBeforeDocFormDelete` | Запоминает URL до удаления. |
| `OnDocFormDelete` | Ставит в очередь `delete` по запомненному URL. |

В очередь update попадают опубликованные, не удалённые ресурсы, для которых собран абсолютный URL.

Если `publishedon` в будущем, запись ждёт: `available_at = publishedon`.

## Deduplication

Открытые строки (`pending` / `processing`) уникальны по паре `host + url`.

Повторное сохранение той же страницы не плодит дубликаты. Обновляются `action`, `available_at` и служебные поля.

Правило: побеждает последнее событие. Пример: снятие с публикации дало `delete`, повторная публикация переписывает ту же строку на `update`.

## Worker

Один проход:

1. Вернуть «зависшие» `processing` старше 15 минут в `pending`.
2. Взять `pending`, у которых `available_at <= сейчас`.
3. Сгруппировать по `host`.
4. Отправить POST batch на endpoint. Размер batch задаёт `indexnow_batch_size`.
5. Записать историю и обновить очередь.

## HTTP-коды

| Код | Поведение |
| --- | --- |
| `200`, `202` | Успех. Строка уходит из очереди, в истории `success`. |
| `429`, `5xx`, сеть / timeout | Временная ошибка. Retry через `indexnow_retry_delay`, пока не кончатся `indexnow_max_attempts`. |
| `400`, `403`, `405`, `422` | Постоянная ошибка. Статус `failed`, автоматический retry не крутит бесконечно. |

Успешный ответ IndexNow значит «уведомление принято», не «страница уже в поиске». То же в [документации Яндекса](https://yandex.ru/support/webmaster/ru/indexing-options/index-now).

## Retry IndexNow и retry Scheduler

- `attempts` / `available_at` в очереди: про доставку URL на endpoint.
- Retry у задачи Scheduler: отдельно, только если упало выполнение самой задачи.

## Ручная обработка

Без Scheduler нажмите **Обработать очередь** на вкладке Статус или после наполнения очереди.
