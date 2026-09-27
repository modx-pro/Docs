---
title: Менеджер
description: Вкладки Статус, Очередь, История и ручная отправка URL
---

# Менеджер

Меню: **Extras → IndexNow**.

Вверху вкладки **Статус** краткое введение (`indexnow_intro_msg`). Внизу той же вкладки предупреждение `indexnow_disclaimer`: IndexNow не гарантирует индексацию, только уведомляет поисковик ([Яндекс](https://yandex.ru/support/webmaster/ru/indexing-options/index-now)).

## Статус

![Вкладка Статус](/components/indexnow/screenshots/indexnow-status.png)

Сводка состояния:

- включён ли IndexNow
- endpoint
- ключ (без вывода секрета в лишние места UI)
- найден ли key file
- установлен ли Scheduler, есть ли задача очереди, интервал, **следующий запуск** (`next_run`), флаг **просрочено** (`overdue`), URL ручного запуска задачи (`run_url`)
- счётчики: pending, processing, failed, отправлено сегодня
- время последней отправки

Счётчик «отправлено сегодня» считает историю со статусом `success`. В запросе к БД также указан `accepted`, но worker пишет только `success` / `failed` / `retry`. Значение `accepted` в фильтре **Истории** это наследие UI, не отдельный статус отправки ([issue #3](https://github.com/Ibochkarev/IndexNow/issues/3)).

Кнопки:

- **Проверить подключение**: ключ, файл, доступность endpoint (при необходимости создаёт задачу Scheduler)
- **Обработать очередь**: один проход worker сразу, без ожидания tick
- **Обновить**: перечитать статус

## Очередь

![Вкладка Очередь](/components/indexnow/screenshots/indexnow-queue.png)

Таблица записей `pending` / `processing` / `failed` (и связанные статусы retry-потока).

Колонки: URL, контекст, действие (`update` / `delete`), статус, попытки, даты, ошибка.

Действия по строке:

- **Повторить**: снова ставит `failed` в `pending`, сбрасывает `available_at` и `last_error`. Счётчик **`attempts` не обнуляется** ([issue #1](https://github.com/Ibochkarev/IndexNow/issues/1)): после нескольких неудач повторная временная ошибка может сразу снова дать `failed`.
- **Удалить**: убрать запись из очереди без отправки

Фильтры: поиск по URL, статус. Фильтра по действию на этой вкладке нет (он есть только в **Истории**).

## История

![Вкладка История](/components/indexnow/screenshots/indexnow-history.png)

Журнал отправок: URL, HTTP-код, статус (`success` / `failed` / `retry`), время.

Старые записи удаляются по `indexnow_history_retention_days` во время работы worker.

## Отправка URL

![Вкладка Отправка URL](/components/indexnow/screenshots/indexnow-send.png)

Поле для абсолютных URL вашего сайта, по одному на строку.

Пример:

```text
https://example.com/page-1
https://example.com/page-2
```

Отклоняются:

- host вне ваших контекстов MODX (защита от SSRF);
- `localhost`, `metadata.google.internal`, private/reserved IP в host (та же проверка, что для URL ресурса).

Каждый принятый URL ставится в очередь с действием **`update`**. Поставить **`delete` вручную нельзя**.

Кнопка **Отправить** только ставит в очередь. Worker и queue tick **не вызываются** ([issue #2](https://github.com/Ibochkarev/IndexNow/issues/2)). Отправка на endpoint: следующий queue tick, задача Scheduler или **Обработать очередь**.
