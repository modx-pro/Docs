---
title: Системные настройки
---

# Системные настройки mxDadata

Все ключи в пространстве имён **`mxdadata`**. В БД префикс `mxdadata_` (например `mxdadata_api_token`).

Где менять: **Настройки → Системные настройки** (фильтр `mxdadata`) или **Extras → mxDadata → Настройки** (`system/settings&ns=mxdadata`). Во Vue-админке отдельных вкладок для этих полей нет.

## API

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_api_token` | текст | — | API Token DaData. Обязателен для Suggest, Clean, Party |
| `mxdadata_api_secret` | текст | — | Secret. Для Clean и Party |
| `mxdadata_api_timeout` | число | `2` | Таймаут HTTP к DaData, сек. |
| `mxdadata_api_retry` | число | `1` | Задумано как число повторов при ошибке. В текущем коде `DadataClient::exchange()` выполняет один запрос, настройка не применяется ([issue #1](https://github.com/Ibochkarev/mxDadata/issues/1)) |

## Кэш

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_cache_ttl` | число | `86400` | TTL кэша ответов в `cacheManager`, сек. (86400 = 24 ч.) |

Ответы DaData кэшируются через **`modX::cacheManager`** с префиксом **`mxdadata_`**, не в таблице БД. Таблица **`mxdadata_cache`** создаётся резолвером, сервисы в неё не пишут ([issue #3](https://github.com/Ibochkarev/mxDadata/issues/3)). Очистка с **Dashboard → Подключение** вызывает **`cacheManager->clean()`** для всего кэша MODX, не только ключей `mxdadata_*` ([issue #2](https://github.com/Ibochkarev/mxDadata/issues/2)).

## Основные

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_enabled` | да/нет | Да | Включить компонент. При «Нет» плагин и публичный коннектор не обрабатывают логику |
| `mxdadata_throttle_rpm` | число | `60` | Лимит запросов в минуту (защита квоты DaData) |
| `mxdadata_log_level` | список | `warning` | Влияет на **`LoggerService::debug()`** (лог MODX). Записи в **`mxdadata_log`** при Suggest/Clean/Party пишутся **без** фильтра по этому уровню ([issue #5](https://github.com/Ibochkarev/mxDadata/issues/5)) |
| `mxdadata_debug_mode` | да/нет | Нет | Форсирует уровень `debug` в `LoggerService::debug()`. На **витрине** `connector-web.php` всегда отвечает `'Processor error'` без текста исключения. В **менеджерском** `connector.php` при «Да» в ответ может попасть сообщение исключения |
| `mxdadata_log_retention_days` | число | `30` | Хранение записей логов (дней), используется при ротации (`Logs/Rotate`, Scheduler **`mxdadata_rotate_logs`**) |

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
| `mxdadata_field_mapping` | многостр. текст | — | JSON: переопределение сопоставления полей **Clean Address** → поля адреса MS3. Пример: `{"city": "city", "index": "postal_code"}` (ключи ответа Clean, не Suggest `city_with_type`) |

По умолчанию маппинг включает `address`, `city`, `region`, `index`, `street`, `building`, `room`, `lat`, `lon`, `fias_id` и др. **`AddressMapper`** считает `lat`/`lon`, но плагин заказа в **`msOrder.Address`** их **не сохраняет**: в карту полей плагина координаты не входят. См. исходник `AddressMapper` в пакете.

## Получение в коде

```php
$modx->getOption('mxdadata_api_token', null, '');
$modx->getOption('mxdadata_cache_ttl', null, 86400);
```

## Связанные настройки MiniShop3

Имена полей формы заказа должны совпадать с тем, что ждут MS3 и сниппеты. См. [Подключение на сайте](frontend) и [Интеграцию](integration).
