---
title: Системные настройки
---

# Системные настройки mxDadata

Ключи в пространстве имён **`mxdadata`**. В БД префикс `mxdadata_` (пример: `mxdadata_api_token`).

Где менять: **Настройки → Системные настройки** (фильтр `mxdadata`) или **Extras → mxDadata → Настройки** (`system/settings&ns=mxdadata`). Во Vue-админке вкладок для этих полей нет, и кнопки сохранения тоже: процессор `Settings/Save` из админки не вызывается. Меняйте ключи в системных настройках.

::: warning
`mxdadata_api_secret` возвращается в браузер менеджера: процессор `Settings/Get` отдаёт все 18 ключей без маскирования. Ограничивайте доступ к разделу. Подробности: [Для разработчиков → Ключи в браузере](/components/mxdadata/developer#ключи-в-браузере).
:::

## API

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_api_token` | текст | — | API Token DaData. Обязателен для Suggest, Clean, Party |
| `mxdadata_api_secret` | текст | — | Secret. Для Clean, Party и баланса. На входе не проверяется: **`hasCredentials()` смотрит только Token** |
| `mxdadata_api_timeout` | число | `2` | Таймаут HTTP к DaData, сек. |
| `mxdadata_api_retry` | число | `1` | Число попыток HTTP в `DadataClient::exchange()`. По умолчанию `1` (без повтора). Повтор только при ошибке curl (сеть, таймаут), не при HTTP 4xx/5xx. Пауза между попытками: 100 мс × номер попытки |

## Кэш

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_cache_ttl` | число | `86400` | TTL ответов в таблице **`mxdadata_cache`**, сек. (86400 = 24 ч.). Считается от `created_at` |

Suggest, Clean, Party и Geolocate пишутся в **`mxdadata_cache`**. Кнопка **Очистить кеш** на вкладке **Обзор** делает `DELETE` только из этой таблицы. Кэш MODX и счётчик **`RateLimiter`** в `cacheManager` (ключ `mxdadata_throttle<YYYY-MM-DD-HH-mm>`, TTL 120 с) не сбрасываются.

## Основные

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_enabled` | да/нет | Да | Включить компонент. При «Нет» плагин и публичный коннектор не обрабатывают логику. Менеджерский `connector.php` проверку не делает |
| `mxdadata_throttle_rpm` | число | `60` | Лимит запросов в минуту (защита квоты DaData). Значение `0` или меньше отключает ограничение |
| `mxdadata_log_level` | список | `warning` | Режет INSERT в **`mxdadata_log`**. `debug` — все запросы. `warning` и `error` дают одинаковый результат: пишутся только записи со статусом ≠ 200. **`LoggerService::debug()`** в лог MODX пишется только при уровне `debug` |
| `mxdadata_debug_mode` | да/нет | Нет | Поднимает уровень логгера до `debug` целиком: в **`mxdadata_log`** начинают попадать успешные ответы, **`LoggerService::debug()`** пишет в лог MODX. На **витрине** `connector-web.php` всегда отвечает `'Processor error'` без текста исключения. В **менеджерском** `connector.php` при «Да» в ответ может попасть сообщение исключения |
| `mxdadata_log_retention_days` | число | `30` | Хранение записей логов (дней). Ротация: `Logs/Rotate`, задача Scheduler **`mxdadata_rotate_logs`** |

## MiniShop3 {#minishop3}

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_strict_validation` | да/нет | Нет | Строгая валидация: невалидный телефон или email — заказ не создаётся |
| `mxdadata_block_order_on_error` | да/нет | Да | Блокировать заказ при любой ошибке валидации |
| `mxdadata_validate_phone` | да/нет | Да | Нормализация телефона через Clean |
| `mxdadata_validate_email` | да/нет | Да | Проверка email через Clean |
| `mxdadata_auto_normalize_address` | да/нет | Да | Нормализация адреса через Clean Address при создании заказа |
| `mxdadata_required_fias` | да/нет | Нет | Требовать выбор адреса из подсказок (FIAS) |
| `mxdadata_required_index` | да/нет | Нет | Требовать почтовый индекс |
| `mxdadata_field_mapping` | многостр. текст | — | JSON: переопределение сопоставления полей **Clean Address** → поля адреса MS3. Формат `{"поле_ms3": "ключ_clean"}`. Дефолт: `address`, `city`, `region`, `index`, `street`, `building`, `room`, `lat`, `lon`, `fias_id`. Пример с переопределением: `{"house": "house", "address_full": "result"}` — поля `house` и `address_full` в дефолте нет и берутся напрямую из ответа Clean |

По умолчанию маппинг включает `address`, `city`, `region`, `index`, `street`, `building`, `room`, `lat`, `lon`, `fias_id` и другие поля. **`AddressMapper`** считает `lat`/`lon`. Плагин заказа в **`msOrder.Address`** координаты не сохраняет: их нет в карте полей плагина. Плагин пишет **`fias_id`**. При установке резолвер добавляет колонку `fias_id` (`VARCHAR(36)`) в `{prefix}ms3_order_addresses`, если её нет. Без MiniShop3 резолвер пишет WARN и продолжает установку.

## Получение в коде

```php
$modx->getOption('mxdadata_api_token', null, '');
$modx->getOption('mxdadata_cache_ttl', null, 86400);
```

## Связанные настройки MiniShop3

Имена полей формы заказа должны совпадать с тем, что ждут MS3 и сниппеты. См. [Подключение на сайте](/components/mxdadata/frontend) и [Интеграцию](/components/mxdadata/integration).
