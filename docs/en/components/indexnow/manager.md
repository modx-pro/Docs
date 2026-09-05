---
title: Менеджер
description: Вкладки Статус, Очередь, История и ручная отправка URL
---

# Менеджер

Меню: **Extras → IndexNow**.

Вверху страницы есть предупреждение: IndexNow не гарантирует индексацию, только уведомляет поисковик ([Яндекс](https://yandex.ru/support/webmaster/ru/indexing-options/index-now)).

## Статус

![Вкладка Статус](/components/indexnow/screenshots/indexnow-status.png)

Сводка состояния:

- включён ли IndexNow
- endpoint
- ключ (без вывода секрета в лишние места UI)
- найден ли key file
- установлен ли Scheduler и есть ли задача очереди
- счётчики: pending, processing, failed, отправлено сегодня
- время последней отправки

Кнопки:

- **Проверить подключение**: ключ, файл, доступность endpoint
- **Обработать очередь**: один проход worker
- **Обновить**: перечитать статус

## Очередь

![Вкладка Очередь](/components/indexnow/screenshots/indexnow-queue.png)

Таблица записей `pending` / `processing` / `failed` (и связанные статусы retry-потока).

Колонки: URL, контекст, действие (`update` / `delete`), статус, попытки, даты, ошибка.

Действия по строке:

- **Повторить**: снова поставить failed в pending
- **Удалить**: убрать запись из очереди без отправки

Фильтры: поиск по URL, статус, действие.

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

Внешние домены и host вне ваших контекстов MODX отклоняются (защита от SSRF).

Успешные URL попадают в очередь. Дальше их забирает worker или кнопка **Обработать очередь**.
