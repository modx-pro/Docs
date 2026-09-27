---
title: Системные настройки
description: Ключи indexnow_* - endpoint, очередь, batch, retry и история
---

# Системные настройки

Область **IndexNow** в **Система → Настройки системы**. Ключи с подчёркиванием: `indexnow_*`. Редактора настроек в CMP IndexNow нет.

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `indexnow_enabled` | Да/Нет | Да | Главный выключатель. При «Нет» ресурсы в очередь не ставятся. |
| `indexnow_endpoint` | текст | `https://yandex.com/indexnow` | URL API IndexNow. Только `http` / `https`. По умолчанию endpoint Яндекса, см. [документацию](https://yandex.ru/support/webmaster/ru/indexing-options/index-now). |
| `indexnow_queue_enabled` | Да/Нет | Да | Режим очереди. См. раздел ниже. |
| `indexnow_batch_size` | число | `100` | Сколько due-URL worker забирает за один проход, затем группирует по `host`. Диапазон 1–1000. В queue tick лимит дополнительно обрезается до 25 URL. |
| `indexnow_max_attempts` | число | `3` | Число попыток при временных ошибках. Дальше статус `failed`. |
| `indexnow_retry_delay` | число | `300` | Пауза в секундах перед следующей попыткой. |
| `indexnow_history_retention_days` | число | `30` | Сколько дней хранить историю. Старое чистится во время работы worker. |
| `indexnow_key` | текст | генерируется | Ключ IndexNow (8–128 символов: латиница, цифры, `-`). Не публикуйте значение в открытых тикетах и логах. |

Код читает опциональные ключи `indexnow_core_path` и `indexnow_assets_url` через `getOption` с путями по умолчанию. На чистой установке transport их **не создаёт**. Они появляются только при миграции со старых ключей с точкой (`indexnow.core_path`, `indexnow.assets_url`).

## Что менять чаще всего

- Другой IndexNow-совместимый endpoint → `indexnow_endpoint`.
- Временно остановить уведомления → `indexnow_enabled = Нет`.
- Крупный сайт, много правок → `indexnow_batch_size` (не выше 1000).
- Частые 429 → увеличьте `indexnow_retry_delay`.

## Очередь включена и выключена

**`indexnow_queue_enabled = Да` (рекомендуется на рабочем сайте).** URL попадают в таблицу очереди. После постановки (сохранение ресурса) планируется **queue tick** в `register_shutdown_function`: до 25 due-URL уходят в том же HTTP-запросе после ответа клиенту. Полный `indexnow_batch_size` при tick не используется. Плюс опциональный Scheduler и кнопка **Обработать очередь**.

**`indexnow_queue_enabled = Нет`.** Worker вызывается **сразу** в том же запросе, что и сохранение ресурса, на полный `indexnow_batch_size` (блокирующая отправка). Ответ менеджера дольше и сильнее зависит от сети до endpoint.
