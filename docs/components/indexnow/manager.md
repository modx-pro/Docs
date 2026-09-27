---
title: Менеджер
description: Вкладки Статус, Очередь, История и ручная отправка URL
---

# Менеджер

Меню: **Extras → IndexNow**.

Над вкладками текст `indexnow_intro_msg`. Внизу **Статуса** предупреждение `indexnow_disclaimer`: IndexNow не гарантирует индексацию, только уведомляет поисковик ([Яндекс](https://yandex.ru/support/webmaster/ru/indexing-options/index-now)).

## Статус

![Вкладка Статус](/components/indexnow/screenshots/indexnow-status.png)

- включён ли IndexNow
- endpoint
- ключ (секрет не выводится лишний раз)
- найден ли key file
- Scheduler: установлен ли, есть ли задача очереди, интервал
- **следующий запуск** (`next_run`), флаг **просрочено** (`overdue`), URL ручного запуска задачи (`run_url`)
- счётчики: pending, processing, failed, отправлено сегодня
- время последней отправки

«Отправлено сегодня» считает строки истории со статусом `success` за текущие сутки. Worker пишет в историю `success` / `failed` / `retry`.

Кнопки:

- **Проверить подключение**: ключ, файл, доступность endpoint. Задача Scheduler создаётся здесь и при загрузке **Статуса**, если Scheduler установлен, а задачи ещё нет.
- **Обработать очередь**: один проход worker сразу, без ожидания tick
- **Обновить**: перечитать статус

## Очередь

![Вкладка Очередь](/components/indexnow/screenshots/indexnow-queue.png)

Таблица строк `pending` / `processing` / `failed` и статусов retry.

Колонки: URL, контекст, действие (`update` / `delete`), статус, попытки, даты, ошибка.

Действия по строке:

- **Повторить**: ставит строку в `pending`, обнуляет `attempts`, сбрасывает `available_at` и `last_error`. Следующий проход worker даёт полную серию попыток.
- **Удалить**: убрать запись из очереди без отправки

Фильтры: поиск по URL, статус. Фильтра по действию нет (он есть только в **Истории**). В фильтре статуса есть пункт `success`, но успешная строка удаляется из таблицы: фильтр пустой.

## История

![Вкладка История](/components/indexnow/screenshots/indexnow-history.png)

Журнал отправок: URL, HTTP-код, статус (`success` / `failed` / `retry`), время.

Старые записи удаляются по [`indexnow_history_retention_days`](/components/indexnow/settings) во время работы worker.

## Отправка URL

![Вкладка Отправка URL](/components/indexnow/screenshots/indexnow-send.png)

Поле для абсолютных URL вашего сайта, по одному на строку.

Пример:

```text
https://example.com/page-1
https://example.com/page-2
```

Отклоняются:

- host вне ваших контекстов MODX (защита от SSRF)
- `localhost`, `metadata.google.internal`, private/reserved IP в host (та же проверка, что для URL ресурса)

Каждый принятый URL ставится в очередь с действием **`update`**. Поставить **`delete` вручную нельзя**.

**Отправить** ставит URL в очередь и вызывает `kickQueue()`. Если очередь включена, в том же запросе планируется queue tick (shutdown, до 25 URL). Если выключена, сразу идёт `worker->run()` на полный `indexnow_batch_size`.
