---
title: Системные настройки
description: Ключи indexnow_* - endpoint, очередь, batch, retry и история
---

# Системные настройки

Область **IndexNow** в **Система → Настройки системы**. Ключи с подчёркиванием: `indexnow_*`. Редактора настроек в менеджере IndexNow нет.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `indexnow_enabled` | Да/Нет | Да | Главный выключатель. При «Нет» ресурсы в очередь не ставятся. |
| `indexnow_endpoint` | текст | `https://yandex.com/indexnow` | URL API IndexNow. Только `http` / `https`. По умолчанию endpoint Яндекса, см. [документацию](https://yandex.ru/support/webmaster/ru/indexing-options/index-now). |
| `indexnow_queue_enabled` | Да/Нет | Да | Режим очереди. |
| `indexnow_batch_size` | число | `100` | Сколько due-URL worker забирает за один проход, затем группирует по `host`. Диапазон 1–1000. В queue tick лимит дополнительно обрезается до 25 URL. |
| `indexnow_max_attempts` | число | `3` | Число попыток при временных ошибках. Дальше статус `failed`. |
| `indexnow_retry_delay` | число | `300` | Пауза в секундах перед следующей попыткой. |
| `indexnow_history_retention_days` | число | `30` | Сколько дней хранить историю. Старое чистится во время работы worker. |
| `indexnow_key` | текст | генерируется | Ключ IndexNow (8–128 символов: латиница, цифры, `-`). Не публикуйте значение в открытых тикетах и логах. |

Пакет читает опциональные ключи `indexnow_core_path` и `indexnow_assets_url` через `getOption` с путями по умолчанию. На чистой установке transport их **не создаёт**. Они появляются только при миграции со старых ключей с точкой (`indexnow.core_path`, `indexnow.assets_url`).

## Что менять чаще всего

- Другой IndexNow-совместимый endpoint → `indexnow_endpoint`.
- Временно остановить уведомления → `indexnow_enabled = Нет`.
- Крупный сайт, много правок → `indexnow_batch_size` (не выше 1000).
- Частые 429 → увеличьте `indexnow_retry_delay`.

## Очередь включена и выключена

На рабочем сайте держите `indexnow_queue_enabled = Да`. Scheduler и **Обработать очередь** подбирают due-URL, если tick не успел.

| | `indexnow_queue_enabled = Да` | `indexnow_queue_enabled = Нет` |
| --- | --- | --- |
| После постановки URL | `kickQueue()` → queue tick в shutdown | Немедленный `worker->run()` в том же запросе |
| Лимит за проход | До **25** URL (tick); до `indexnow_batch_size` (**Обработать очередь**, Scheduler) | Полный `indexnow_batch_size` |
| Ответ клиенту | Не ждёт endpoint | Ждёт отправку на endpoint |
